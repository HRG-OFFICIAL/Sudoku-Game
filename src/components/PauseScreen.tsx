import { motion } from 'framer-motion';
import { Play, RotateCcw, Home, Settings } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export function PauseScreen() {
  const { resumeGame, resetGame, startNewGame, difficulty } = useGameStore();

  const handleNewGame = () => {
    startNewGame(difficulty);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto"
    >
      <div className="card text-center space-y-8">
        {/* Pause Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-br from-warning-500 to-warning-700 rounded-2xl flex items-center justify-center mx-auto"
        >
          <Play className="w-10 h-10 text-white" />
        </motion.div>

        {/* Title */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
            Game Paused
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Take a break or continue playing
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resumeGame}
            className="btn btn-primary btn-lg w-full"
          >
            <Play className="w-5 h-5 mr-2" />
            Resume Game
          </motion.button>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNewGame}
              className="btn btn-secondary btn-md"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              New Game
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetGame}
              className="btn btn-secondary btn-md"
            >
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-secondary btn-md w-full"
          >
            <Home className="w-4 h-4 mr-1" />
            Main Menu
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
