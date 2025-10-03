import { motion } from 'framer-motion';
import { Trash2, RotateCcw, RotateCw, Lightbulb, XCircle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export function NumberPad() {
  const {
    selectedCell,
    setCellValue,
    clearCell,
    getHint,
    undo,
    redo,
    moves,
    moveIndex,
    hintsUsed,
    clearAllErrors,
  } = useGameStore();

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const canUndo = moveIndex >= 0;
  const canRedo = moveIndex < moves.length - 1;

  const handleNumberClick = (number: number) => {
    if (selectedCell) {
      setCellValue(number);
    }
  };

  const handleClear = () => {
    if (selectedCell) {
      clearCell();
    }
  };

  const handleHint = () => {
    getHint();
  };

  return (
    <div className="space-y-4">
      {/* Number Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Numbers
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {numbers.map((number) => (
            <motion.button
              key={number}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNumberClick(number)}
              disabled={!selectedCell}
              className="btn btn-secondary btn-lg aspect-square disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {number}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Actions
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClear}
              disabled={!selectedCell}
              className="btn btn-error btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleHint}
              className="btn btn-warning btn-sm"
            >
              <Lightbulb className="w-4 h-4 mr-1" />
              Hint
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearAllErrors}
            className="btn btn-secondary btn-sm w-full"
          >
            <XCircle className="w-4 h-4 mr-1" />
            Clear Errors
          </motion.button>

          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={undo}
              disabled={!canUndo}
              className="btn btn-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Undo
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={redo}
              disabled={!canRedo}
              className="btn btn-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCw className="w-4 h-4 mr-1" />
              Redo
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Game Stats
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Hints Used:</span>
            <span className="font-medium text-warning-600 dark:text-warning-400">
              {hintsUsed}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Moves:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {moves.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
