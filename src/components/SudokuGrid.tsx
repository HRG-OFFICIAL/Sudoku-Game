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
    <div className="sudoku-grid-container">
      <div className="grid grid-cols-9 gap-0 max-w-fit mx-auto border-2 border-black dark:border-gray-500">
        {grid.cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const isRelated = selectedCell ? isCellRelated(rowIndex, colIndex) : false;
            const isInBox = selectedCell ? isInSameBox(rowIndex, colIndex) : false;
            
            // Determine border classes for 3x3 grid separation
            const getBorderClasses = () => {
              let classes = 'border';
              classes += ' border-gray-400 dark:border-gray-700';
              
              // Add thicker borders for 3x3 grid separation
              if ((rowIndex + 1) % 3 === 0) {
                classes += ' border-b-2';
                classes += ' border-b-black dark:border-b-gray-500';
              }
              if ((colIndex + 1) % 3 === 0) {
                classes += ' border-r-2';
                classes += ' border-r-black dark:border-r-gray-500';
              }
              
              return classes;
            };
            
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
                className={getBorderClasses()}
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
