import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, Position, Move, Difficulty, UserPreferences, GameStats, Achievement } from '../types';
import { SudokuGenerator, SudokuSolver } from '../utils/sudoku';
import { DIFFICULTY_CONFIGS, STORAGE_KEYS, ACHIEVEMENTS } from '../constants';

interface GameStore extends GameState {
  // Actions
  startNewGame: (difficulty: Difficulty) => void;
  selectCell: (position: Position) => void;
  setCellValue: (value: number) => void;
  clearCell: () => void;
  toggleNote: (value: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  undo: () => void;
  redo: () => void;
  getHint: () => void;
  checkSolution: () => boolean;
  updateTimer: () => void;
  clearAllErrors: () => void;
  highlightConflicts: (position: Position) => void;
  hasConflict: (row: number, col: number, value: number, grid: number[][]) => boolean;
  // Preferences
  preferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  // Stats
  stats: GameStats;
  updateStats: (gameCompleted: boolean, timeElapsed: number) => void;
  // Achievements
  achievements: Achievement[];
  checkAchievements: () => void;
}

const initialGameState: Omit<GameState, 'grid'> = {
  selectedCell: null,
  difficulty: 'easy',
  timeElapsed: 0,
  isPaused: false,
  isCompleted: false,
  hintsUsed: 0,
  mistakes: 0,
  moves: [],
  moveIndex: -1,
};

const initialPreferences: UserPreferences = {
  theme: 'system',
  soundEnabled: true,
  animationsEnabled: true,
  showTimer: true,
  showHints: true,
  autoSave: true,
};

const initialStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  bestTime: {
    easy: 0,
    medium: 0,
    hard: 0,
    expert: 0,
    master: 0,
    legendary: 0,
  },
  averageTime: {
    easy: 0,
    medium: 0,
    hard: 0,
    expert: 0,
    master: 0,
    legendary: 0,
  },
  totalTime: 0,
  hintsUsed: 0,
  mistakes: 0,
  streak: 0,
  longestStreak: 0,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialGameState,
      grid: {
        cells: [],
        original: [],
        solution: [],
      },
      preferences: initialPreferences,
      stats: initialStats,
      achievements: ACHIEVEMENTS,

      startNewGame: (difficulty: Difficulty) => {
        console.log('Store: startNewGame called with difficulty:', difficulty);
        try {
          const config = DIFFICULTY_CONFIGS[difficulty];
          console.log('Store: config:', config);
          
          const grid = SudokuGenerator.generatePuzzle(difficulty, config.cellsToRemove);
          console.log('Store: grid generated:', grid);
          
          set({
            ...initialGameState,
            grid,
            difficulty,
          });
          
          console.log('Store: game state updated');
        } catch (error) {
          console.error('Store: Error in startNewGame:', error);
        }
      },

      selectCell: (position: Position) => {
        const { grid, selectedCell } = get();
        if (selectedCell && grid.cells[selectedCell.row][selectedCell.col].isOriginal) {
          return; // Don't select original cells
        }
        
        set({ selectedCell: position });
      },

      setCellValue: (value: number) => {
        const { grid, selectedCell, moves, moveIndex } = get();
        if (!selectedCell) return;

        const { row, col } = selectedCell;
        const cell = grid.cells[row][col];
        
        if (cell.isOriginal) return;

        const oldValue = cell.value;
        const newMove: Move = {
          position: { row, col },
          oldValue,
          newValue: value,
          timestamp: Date.now(),
        };

        // Update cell and clear all error states
        const newCells = grid.cells.map((gridRow, r) =>
          gridRow.map((cell, c) => {
            if (r === row && c === col) {
              return { ...cell, value, isError: false, isHint: false };
            }
            // Clear error state for all cells when making a new move
            return { ...cell, isError: false };
          })
        );

        // Update moves
        const newMoves = moves.slice(0, moveIndex + 1);
        newMoves.push(newMove);

        set({
          grid: { ...grid, cells: newCells },
          moves: newMoves,
          moveIndex: newMoves.length - 1,
        });

        // Immediately check for conflicts with the new value
        const currentGrid = newCells.map(row => row.map(cell => cell.value));
        const hasConflict = get().hasConflict(row, col, value, currentGrid);
        
        if (hasConflict) {
          // Mark this cell as error immediately
          const errorCells = newCells.map((gridRow, r) =>
            gridRow.map((cell, c) => {
              if (r === row && c === col) {
                return { ...cell, isError: true };
              }
              return cell;
            })
          );
          
          set({
            grid: { ...grid, cells: errorCells },
          });
        }

        // Check for all errors after a short delay
        setTimeout(() => {
          get().checkSolution();
        }, 100);
      },

      clearCell: () => {
        const { grid, selectedCell, moves, moveIndex } = get();
        if (!selectedCell) return;

        const { row, col } = selectedCell;
        const cell = grid.cells[row][col];
        
        if (cell.isOriginal) return;

        const oldValue = cell.value;
        const newMove: Move = {
          position: { row, col },
          oldValue,
          newValue: 0,
          timestamp: Date.now(),
        };

        // Update cell and clear all error states
        const newCells = grid.cells.map((gridRow, r) =>
          gridRow.map((cell, c) => {
            if (r === row && c === col) {
              return { ...cell, value: 0, isError: false, isHint: false };
            }
            // Clear error state for all cells when clearing
            return { ...cell, isError: false };
          })
        );

        // Update moves
        const newMoves = moves.slice(0, moveIndex + 1);
        newMoves.push(newMove);

        set({
          grid: { ...grid, cells: newCells },
          moves: newMoves,
          moveIndex: newMoves.length - 1,
        });

        // Immediately re-evaluate all errors since we cleared a cell
        setTimeout(() => {
          get().checkSolution();
        }, 50);
      },

      toggleNote: (value: number) => {
        const { grid, selectedCell } = get();
        if (!selectedCell) return;

        const { row, col } = selectedCell;
        const cell = grid.cells[row][col];
        
        if (cell.isOriginal || cell.value !== 0) return;

        const newNotes = cell.notes.includes(value)
          ? cell.notes.filter(note => note !== value)
          : [...cell.notes, value].sort();

        const newCells = grid.cells.map((gridRow, r) =>
          gridRow.map((cell, c) => {
            if (r === row && c === col) {
              return { ...cell, notes: newNotes };
            }
            return cell;
          })
        );

        set({
          grid: { ...grid, cells: newCells },
        });
      },

      pauseGame: () => {
        set({ isPaused: true });
      },

      resumeGame: () => {
        set({ isPaused: false });
      },

      resetGame: () => {
        set(initialGameState);
      },

      undo: () => {
        const { moves, moveIndex } = get();
        if (moveIndex < 0) return;

        const move = moves[moveIndex];
        const { grid } = get();
        const { row, col } = move.position;

        // Clear all error states and update the specific cell
        const newCells = grid.cells.map((gridRow, r) =>
          gridRow.map((cell, c) => {
            if (r === row && c === col) {
              return { ...cell, value: move.oldValue, isError: false, isHint: false };
            }
            // Clear error state for all cells when undoing
            return { ...cell, isError: false };
          })
        );

        set({
          grid: { ...grid, cells: newCells },
          moveIndex: moveIndex - 1,
        });

        // Check for errors after undo
        setTimeout(() => {
          get().checkSolution();
        }, 100);
      },

      redo: () => {
        const { moves, moveIndex } = get();
        if (moveIndex >= moves.length - 1) return;

        const move = moves[moveIndex + 1];
        const { grid } = get();
        const { row, col } = move.position;

        // Clear all error states and update the specific cell
        const newCells = grid.cells.map((gridRow, r) =>
          gridRow.map((cell, c) => {
            if (r === row && c === col) {
              return { ...cell, value: move.newValue, isError: false, isHint: false };
            }
            // Clear error state for all cells when redoing
            return { ...cell, isError: false };
          })
        );

        set({
          grid: { ...grid, cells: newCells },
          moveIndex: moveIndex + 1,
        });

        // Check for errors after redo
        setTimeout(() => {
          get().checkSolution();
        }, 100);
      },

      getHint: () => {
        const { grid, hintsUsed } = get();
        const emptyCells: Position[] = [];

        // Find all empty cells
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (grid.cells[row][col].value === 0) {
              emptyCells.push({ row, col });
            }
          }
        }

        if (emptyCells.length === 0) return;

        // Pick a random empty cell
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const { row, col } = randomCell;
        const solutionValue = grid.solution[row][col];

        // Clear all error states and update the cell with hint
        const newCells = grid.cells.map((gridRow, r) =>
          gridRow.map((cell, c) => {
            if (r === row && c === col) {
              return { ...cell, value: solutionValue, isHint: true, isError: false };
            }
            // Clear error state for all cells when getting hint
            return { ...cell, isError: false };
          })
        );

        set({
          grid: { ...grid, cells: newCells },
          hintsUsed: hintsUsed + 1,
        });

        // Check for errors after hint
        setTimeout(() => {
          get().checkSolution();
        }, 100);
      },

      checkSolution: () => {
        const { grid } = get();
        const currentGrid = grid.cells.map(row => row.map(cell => cell.value));
        
        // Check if grid is complete
        if (SudokuSolver.isCompleteAndValid(currentGrid)) {
          set({ isCompleted: true });
          get().updateStats(true, get().timeElapsed);
          get().checkAchievements();
          return true;
        }

        // Check for errors in current state and clear previous errors
        const newCells = grid.cells.map((gridRow, r) =>
          gridRow.map((cell, c) => {
            if (cell.value === 0) {
              // Clear error state for empty cells
              return { ...cell, isError: false };
            }
            
            // Check if this cell's value conflicts with any other cell in same row, column, or box
            const isError = get().hasConflict(r, c, cell.value, currentGrid);
            return { ...cell, isError };
          })
        );

        set({
          grid: { ...grid, cells: newCells },
        });

        return false;
      },

      hasConflict: (row: number, col: number, value: number, grid: number[][]) => {
        // Don't check for conflicts if the value is 0 (empty)
        if (value === 0) {
          return false;
        }

        // Check row for conflicts
        for (let c = 0; c < 9; c++) {
          if (c !== col && grid[row][c] === value) {
            return true;
          }
        }

        // Check column for conflicts
        for (let r = 0; r < 9; r++) {
          if (r !== row && grid[r][col] === value) {
            return true;
          }
        }

        // Check 3x3 box for conflicts
        const boxStartRow = Math.floor(row / 3) * 3;
        const boxStartCol = Math.floor(col / 3) * 3;
        for (let r = boxStartRow; r < boxStartRow + 3; r++) {
          for (let c = boxStartCol; c < boxStartCol + 3; c++) {
            if ((r !== row || c !== col) && grid[r][c] === value) {
              return true;
            }
          }
        }

        return false;
      },

      updateTimer: () => {
        const { isPaused, isCompleted } = get();
        if (!isPaused && !isCompleted) {
          set(state => ({ timeElapsed: state.timeElapsed + 1 }));
        }
      },

      updatePreferences: (newPreferences) => {
        set(state => ({
          preferences: { ...state.preferences, ...newPreferences },
        }));
      },

      updateStats: (gameCompleted, timeElapsed) => {
        const { stats, difficulty } = get();
        const newStats = { ...stats };
        
        newStats.gamesPlayed++;
        newStats.totalTime += timeElapsed;
        
        if (gameCompleted) {
          newStats.gamesWon++;
          newStats.streak++;
          newStats.longestStreak = Math.max(newStats.longestStreak, newStats.streak);
          
          // Update best time
          if (newStats.bestTime[difficulty] === 0 || timeElapsed < newStats.bestTime[difficulty]) {
            newStats.bestTime[difficulty] = timeElapsed;
          }
          
          // Update average time
          const totalGames = newStats.gamesWon;
          newStats.averageTime[difficulty] = Math.round(
            (newStats.averageTime[difficulty] * (totalGames - 1) + timeElapsed) / totalGames
          );
        } else {
          newStats.streak = 0;
        }

        set({ stats: newStats });
      },

      checkAchievements: () => {
        const { stats, achievements, timeElapsed, mistakes } = get();
        const newAchievements = achievements.map(achievement => {
          if (achievement.unlocked) return achievement;

          let progress = achievement.progress;
          let unlocked = false;

          switch (achievement.id) {
            case 'first_win':
              if (stats.gamesWon > 0) {
                progress = 1;
                unlocked = true;
              }
              break;
            case 'speed_demon':
              if (timeElapsed < 300) { // 5 minutes
                progress = 1;
                unlocked = true;
              }
              break;
            case 'perfectionist':
              if (mistakes === 0) {
                progress = 1;
                unlocked = true;
              }
              break;
            case 'streak_master':
              progress = Math.min(stats.streak, 10);
              unlocked = progress >= 10;
              break;
            case 'hint_hater':
              // This would need to be tracked across multiple games
              break;
            case 'legendary_player':
              if (get().difficulty === 'legendary') {
                progress = 1;
                unlocked = true;
              }
              break;
          }

          return {
            ...achievement,
            progress,
            unlocked,
            unlockedAt: unlocked ? new Date() : undefined,
          };
        });

        set({ achievements: newAchievements });
      },

      clearAllErrors: () => {
        const { grid } = get();
        const newCells = grid.cells.map((gridRow) =>
          gridRow.map((cell) => ({
            ...cell,
            isError: false,
          }))
        );

        set({
          grid: { ...grid, cells: newCells },
        });
      },

      highlightConflicts: (position: Position) => {
        const { grid } = get();
        const { row, col } = position;
        const cell = grid.cells[row][col];
        
        if (cell.value === 0) return;

        // Find all conflicting cells
        const conflictingCells: Position[] = [];
        const currentValue = cell.value;

        // Check row
        for (let c = 0; c < 9; c++) {
          if (c !== col && grid.cells[row][c].value === currentValue) {
            conflictingCells.push({ row, col: c });
          }
        }

        // Check column
        for (let r = 0; r < 9; r++) {
          if (r !== row && grid.cells[r][col].value === currentValue) {
            conflictingCells.push({ row: r, col });
          }
        }

        // Check 3x3 box
        const boxStartRow = Math.floor(row / 3) * 3;
        const boxStartCol = Math.floor(col / 3) * 3;
        for (let r = boxStartRow; r < boxStartRow + 3; r++) {
          for (let c = boxStartCol; c < boxStartCol + 3; c++) {
            if ((r !== row || c !== col) && grid.cells[r][c].value === currentValue) {
              conflictingCells.push({ row: r, col: c });
            }
          }
        }

        // Highlight conflicting cells
        const newCells = grid.cells.map((gridRow, r) =>
          gridRow.map((cell, c) => {
            const isConflicting = conflictingCells.some(conflict => 
              conflict.row === r && conflict.col === c
            );
            return {
              ...cell,
              isError: isConflicting,
            };
          })
        );

        set({
          grid: { ...grid, cells: newCells },
        });
      },
    }),
    {
      name: STORAGE_KEYS.GAME_STATE,
      partialize: (state) => ({
        grid: state.grid,
        difficulty: state.difficulty,
        timeElapsed: state.timeElapsed,
        isPaused: state.isPaused,
        isCompleted: state.isCompleted,
        hintsUsed: state.hintsUsed,
        mistakes: state.mistakes,
        moves: state.moves,
        moveIndex: state.moveIndex,
      }),
    }
  )
);
