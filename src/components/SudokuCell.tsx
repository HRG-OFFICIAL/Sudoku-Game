import { motion } from 'framer-motion';
import { Cell } from '../types';

interface SudokuCellProps {
  cell: Cell;
  isSelected: boolean;
  isHighlighted: boolean;
  isInBox: boolean;
  onClick: () => void;
}

export function SudokuCell({
  cell,
  isSelected,
  isHighlighted,
  onClick,
}: SudokuCellProps) {
  const getCellClasses = () => {
    let classes = 'sudoku-cell';
    
    if (cell.isOriginal) {
      classes += ' filled';
    }
    
    if (isSelected) {
      classes += ' selected';
    } else if (isHighlighted) {
      classes += ' highlighted';
    }
    
    if (cell.isError) {
      classes += ' error';
    }
    
    if (cell.isHint) {
      classes += ' hint';
    }
    
    return classes;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={cell.isOriginal}
      className={getCellClasses()}
      animate={{
        scale: cell.isError ? [1, 1.1, 1] : 1,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      {cell.value !== 0 ? (
        <motion.span
          key={cell.value}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="font-semibold"
        >
          {cell.value}
        </motion.span>
      ) : cell.notes.length > 0 ? (
        <div className="grid grid-cols-3 gap-0.5 text-xs">
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className={`text-center ${
                cell.notes.includes(i + 1)
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-transparent'
              }`}
            >
              {i + 1}
            </span>
          ))}
        </div>
      ) : null}
    </motion.button>
  );
}
