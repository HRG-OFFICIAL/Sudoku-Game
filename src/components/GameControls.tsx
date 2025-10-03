import { motion } from 'framer-motion';
import { Play, RotateCcw, Settings, Home } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export function GameControls() {
  const {
    isPaused,
    resumeGame,
    resetGame,
    startNewGame,
    difficulty,
  } = useGameStore();

  const handleNewGame = () => {
    startNewGame(difficulty);
  };

  const handleReset = () => {
    resetGame();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Game Controls
      </h3>
      
      <div className="space-y-2">
        {isPaused ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resumeGame}
            className="btn btn-success btn-md w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            Resume Game
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewGame}
            className="btn btn-primary btn-md w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            New Game
          </motion.button>
        )}

        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-secondary btn-sm"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn btn-secondary btn-sm w-full"
        >
          <Home className="w-4 h-4 mr-1" />
          Main Menu
        </motion.button>
      </div>
    </div>
  );
}
