export interface Position {
  row: number;
  col: number;
}

export interface Cell {
  value: number;
  isOriginal: boolean;
  isError: boolean;
  isHint: boolean;
  notes: number[];
}

export interface SudokuGrid {
  cells: Cell[][];
  original: number[][];
  solution: number[][];
}

export interface GameState {
  grid: SudokuGrid;
  selectedCell: Position | null;
  difficulty: Difficulty;
  timeElapsed: number;
  isPaused: boolean;
  isCompleted: boolean;
  hintsUsed: number;
  mistakes: number;
  moves: Move[];
  moveIndex: number;
}

export interface Move {
  position: Position;
  oldValue: number;
  newValue: number;
  timestamp: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master' | 'legendary';

export interface DifficultyConfig {
  name: string;
  cellsToRemove: number;
  color: string;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  bestTime: Record<Difficulty, number>;
  averageTime: Record<Difficulty, number>;
  totalTime: number;
  hintsUsed: number;
  mistakes: number;
  streak: number;
  longestStreak: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  animationsEnabled: boolean;
  showTimer: boolean;
  showHints: boolean;
  autoSave: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}
