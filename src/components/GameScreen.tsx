import { motion } from 'framer-motion';
import { SudokuGrid } from './SudokuGrid';
import { NumberPad } from './NumberPad';
import { GameInfo } from './GameInfo';
import { GameControls } from './GameControls';
import { useGameStore } from '../store/gameStore';

export function GameScreen() {
  const { grid, isCompleted } = useGameStore();

  // Don't render if no game is started
  if (!grid.cells.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Game Info */}
      <GameInfo />

      {/* Main Game Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sudoku Grid */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1"
        >
          <SudokuGrid />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-80 space-y-4"
        >
          <GameControls />
          <NumberPad />
        </motion.div>
      </div>

      {/* Completion Message */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Congratulations!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You've completed the puzzle!
            </p>
            <button className="btn btn-primary btn-lg">
              New Game
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
