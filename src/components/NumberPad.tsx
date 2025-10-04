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
      <div className="card">
        <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
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
      <div className="card">
        <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
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
              className="btn btn-info btn-sm w-full"
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
              className="btn btn-undo-redo btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Undo
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={redo}
              disabled={!canRedo}
              className="btn btn-undo-redo btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCw className="w-4 h-4 mr-1" />
              Redo
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="card">
        <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
          Game Stats
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-muted)' }}>Hints Used:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {hintsUsed}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-muted)' }}>Moves:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {moves.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
