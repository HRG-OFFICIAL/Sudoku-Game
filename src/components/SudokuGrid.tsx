import { motion } from 'framer-motion';
import { SudokuCell } from './SudokuCell';
import { useGameStore } from '../store/gameStore';
import { SudokuSolver } from '../utils/sudoku';

export function SudokuGrid() {
  const { grid, selectedCell, selectCell } = useGameStore();

  const handleCellClick = (row: number, col: number) => {
    selectCell({ row, col });
  };

  const getRelatedCells = (_row: number, _col: number) => {
    if (!selectedCell) return [];
    return SudokuSolver.getRelatedCells(selectedCell.row, selectedCell.col);
  };

  const isCellRelated = (row: number, col: number) => {
    if (!selectedCell) return false;
    const relatedCells = getRelatedCells(row, col);
    return relatedCells.some(cell => cell.row === row && cell.col === col);
  };

  const isInSameBox = (row: number, col: number) => {
    if (!selectedCell) return false;
    const selectedBox = SudokuSolver.getBoxCoordinates(selectedCell.row, selectedCell.col);
    const cellBox = SudokuSolver.getBoxCoordinates(row, col);
    return selectedBox.startRow === cellBox.startRow && selectedBox.startCol === cellBox.startCol;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="grid grid-cols-9 gap-1 max-w-fit mx-auto">
        {grid.cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const isRelated = selectedCell ? isCellRelated(rowIndex, colIndex) : false;
            const isInBox = selectedCell ? isInSameBox(rowIndex, colIndex) : false;
            
            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: (rowIndex * 9 + colIndex) * 0.01,
                  type: 'spring',
                  stiffness: 200
                }}
                className={`
                  relative
                  ${(rowIndex + 1) % 3 === 0 ? 'mb-2' : ''}
                  ${(colIndex + 1) % 3 === 0 ? 'mr-2' : ''}
                `}
              >
                <SudokuCell
                  cell={cell}
                  isSelected={isSelected}
                  isHighlighted={isRelated}
                  isInBox={isInBox}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                />
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
