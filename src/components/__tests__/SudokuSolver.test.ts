import { describe, it, expect } from 'vitest';
import { SudokuSolver } from '../../utils/sudoku';

describe('SudokuSolver', () => {
  const validGrid = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];

  it('should validate a complete and valid grid', () => {
    expect(SudokuSolver.isCompleteAndValid(validGrid)).toBe(true);
  });

  it('should check if a number is safe to place', () => {
    const grid = [
      [5, 3, 0, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];

    expect(SudokuSolver.isSafe(grid, 0, 2, 4)).toBe(true);
    expect(SudokuSolver.isSafe(grid, 0, 2, 5)).toBe(false); // Already in row
    expect(SudokuSolver.isSafe(grid, 0, 2, 2)).toBe(false); // Already in column
    expect(SudokuSolver.isSafe(grid, 0, 2, 1)).toBe(false); // Already in box
  });

  it('should find unassigned cells', () => {
    const gridWithEmpty = [
      [5, 3, 0, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];

    const unassigned = SudokuSolver.findUnassignedCell(gridWithEmpty);
    expect(unassigned).toEqual({ row: 0, col: 2 });

    const unassignedComplete = SudokuSolver.findUnassignedCell(validGrid);
    expect(unassignedComplete).toBeNull();
  });

  it('should get possible numbers for a cell', () => {
    const grid = [
      [5, 3, 0, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];

    const possibleNumbers = SudokuSolver.getPossibleNumbers(grid, 0, 2);
    expect(possibleNumbers).toContain(4);
    expect(possibleNumbers).not.toContain(5); // Already in row
    expect(possibleNumbers).not.toContain(2); // Already in column
    expect(possibleNumbers).not.toContain(1); // Already in box
  });
});
