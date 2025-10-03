import { GRID_SIZE, BOX_SIZE, UNASSIGNED, NUMBERS } from '../constants';
import { Position, Cell, SudokuGrid, Difficulty } from '../types';

export class SudokuSolver {
  /**
   * Check if a number is safe to place in a specific position
   */
  static isSafe(grid: number[][], row: number, col: number, num: number): boolean {
    return (
      this.isRowSafe(grid, row, num) &&
      this.isColSafe(grid, col, num) &&
      this.isBoxSafe(grid, row - (row % BOX_SIZE), col - (col % BOX_SIZE), num)
    );
  }

  /**
   * Check if a number is safe in the row
   */
  private static isRowSafe(grid: number[][], row: number, num: number): boolean {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === num) return false;
    }
    return true;
  }

  /**
   * Check if a number is safe in the column
   */
  private static isColSafe(grid: number[][], col: number, num: number): boolean {
    for (let row = 0; row < GRID_SIZE; row++) {
      if (grid[row][col] === num) return true;
    }
    return true;
  }

  /**
   * Check if a number is safe in the 3x3 box
   */
  private static isBoxSafe(grid: number[][], boxRow: number, boxCol: number, num: number): boolean {
    for (let row = 0; row < BOX_SIZE; row++) {
      for (let col = 0; col < BOX_SIZE; col++) {
        if (grid[row + boxRow][col + boxCol] === num) return false;
      }
    }
    return true;
  }

  /**
   * Find the next unassigned cell
   */
  static findUnassignedCell(grid: number[][]): Position | null {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid[row][col] === UNASSIGNED) {
          return { row, col };
        }
      }
    }
    return null;
  }

  /**
   * Shuffle an array using Fisher-Yates algorithm
   */
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Generate a complete Sudoku grid
   */
  static generateCompleteGrid(): number[][] {
    // Use a pre-made valid Sudoku grid for now to avoid infinite loops
    // In a production app, you'd want a more sophisticated generator
    const validGrids = [
      [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
      ],
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
      ],
      [
        [9, 8, 7, 6, 5, 4, 3, 2, 1],
        [6, 5, 4, 3, 2, 1, 9, 8, 7],
        [3, 2, 1, 9, 8, 7, 6, 5, 4],
        [8, 7, 6, 5, 4, 3, 2, 1, 9],
        [5, 4, 3, 2, 1, 9, 8, 7, 6],
        [2, 1, 9, 8, 7, 6, 5, 4, 3],
        [7, 6, 5, 4, 3, 2, 1, 9, 8],
        [4, 3, 2, 1, 9, 8, 7, 6, 5],
        [1, 9, 8, 7, 6, 5, 4, 3, 2],
      ]
    ];
    
    // Return a random valid grid
    return validGrids[Math.floor(Math.random() * validGrids.length)];
  }

  /**
   * Solve a Sudoku grid using backtracking
   */
  static solveGrid(grid: number[][]): boolean {
    const unassignedCell = this.findUnassignedCell(grid);
    
    if (!unassignedCell) {
      return true; // Grid is complete
    }

    const { row, col } = unassignedCell;
    const numbers = this.shuffleArray(NUMBERS);

    for (const num of numbers) {
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (this.solveGrid(grid)) {
          return true;
        }

        grid[row][col] = UNASSIGNED; // Backtrack
      }
    }

    return false;
  }

  /**
   * Check if a grid is valid (no conflicts)
   */
  static isValidGrid(grid: number[][]): boolean {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const num = grid[row][col];
        if (num !== UNASSIGNED) {
          // Temporarily remove the number to check if it's safe
          grid[row][col] = UNASSIGNED;
          const isSafe = this.isSafe(grid, row, col, num);
          grid[row][col] = num;
          
          if (!isSafe) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * Check if a grid is complete and valid
   */
  static isCompleteAndValid(grid: number[][]): boolean {
    // Check if all cells are filled
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid[row][col] === UNASSIGNED) {
          return false;
        }
      }
    }
    
    return this.isValidGrid(grid);
  }

  /**
   * Get all possible numbers for a cell
   */
  static getPossibleNumbers(grid: number[][], row: number, col: number): number[] {
    if (grid[row][col] !== UNASSIGNED) {
      return [];
    }

    return NUMBERS.filter(num => this.isSafe(grid, row, col, num));
  }

  /**
   * Get the 3x3 box coordinates for a given position
   */
  static getBoxCoordinates(row: number, col: number): { startRow: number; startCol: number } {
    return {
      startRow: row - (row % BOX_SIZE),
      startCol: col - (col % BOX_SIZE),
    };
  }

  /**
   * Get all cells in the same row, column, or box as the given position
   */
  static getRelatedCells(row: number, col: number): Position[] {
    const cells: Position[] = [];
    
    // Add all cells in the same row
    for (let c = 0; c < GRID_SIZE; c++) {
      if (c !== col) {
        cells.push({ row, col: c });
      }
    }
    
    // Add all cells in the same column
    for (let r = 0; r < GRID_SIZE; r++) {
      if (r !== row) {
        cells.push({ row: r, col });
      }
    }
    
    // Add all cells in the same 3x3 box
    const { startRow, startCol } = this.getBoxCoordinates(row, col);
    for (let r = startRow; r < startRow + BOX_SIZE; r++) {
      for (let c = startCol; c < startCol + BOX_SIZE; c++) {
        if (r !== row || c !== col) {
          cells.push({ row: r, col: c });
        }
      }
    }
    
    return cells;
  }
}

export class SudokuGenerator {
  /**
   * Generate a Sudoku puzzle with the specified difficulty
   */
  static generatePuzzle(_difficulty: Difficulty, cellsToRemove: number): SudokuGrid {
    const completeGrid = SudokuSolver.generateCompleteGrid();
    const puzzle = this.removeCells(completeGrid, cellsToRemove);
    
    return {
      cells: this.createCellGrid(puzzle),
      original: puzzle,
      solution: completeGrid,
    };
  }

  /**
   * Remove cells from a complete grid to create a puzzle
   */
  private static removeCells(grid: number[][], cellsToRemove: number): number[][] {
    const puzzle = grid.map(row => [...row]);
    let removed = 0;
    let attempts = 0;
    const maxAttempts = cellsToRemove * 3; // Prevent infinite loops
    
    while (removed < cellsToRemove && attempts < maxAttempts) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      
      if (puzzle[row][col] !== UNASSIGNED) {
        const originalValue = puzzle[row][col];
        puzzle[row][col] = UNASSIGNED;
        removed++;
      }
      attempts++;
    }
    
    return puzzle;
  }

  /**
   * Check if a puzzle has a unique solution
   */
  private static hasUniqueSolution(grid: number[][]): boolean {
    const solutions: number[][][] = [];
    this.countSolutions(grid, solutions, 0);
    return solutions.length === 1;
  }

  /**
   * Count the number of solutions for a puzzle
   */
  private static countSolutions(grid: number[][], solutions: number[][][], maxSolutions: number): void {
    if (solutions.length >= maxSolutions) return;
    
    const unassignedCell = SudokuSolver.findUnassignedCell(grid);
    if (!unassignedCell) {
      solutions.push(grid.map(row => [...row]));
      return;
    }

    const { row, col } = unassignedCell;
    for (const num of NUMBERS) {
      if (SudokuSolver.isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        this.countSolutions(grid, solutions, maxSolutions);
        grid[row][col] = UNASSIGNED;
      }
    }
  }

  /**
   * Create a cell grid from a number grid
   */
  private static createCellGrid(grid: number[][]): Cell[][] {
    return grid.map(row =>
      row.map(value => ({
        value,
        isOriginal: value !== UNASSIGNED,
        isError: false,
        isHint: false,
        notes: [],
      }))
    );
  }
}
