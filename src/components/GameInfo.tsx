import { motion } from 'framer-motion';
import { Clock, User, Trophy, Pause } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { DIFFICULTY_CONFIGS } from '../constants';

export function GameInfo() {
  const {
    difficulty,
    timeElapsed,
    isPaused,
    pauseGame,
  } = useGameStore();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const config = DIFFICULTY_CONFIGS[difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {/* Player Info */}
      <div className="card flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Player</div>
          <div className="font-semibold text-gray-900 dark:text-white">
            Sudoku Master
          </div>
        </div>
      </div>

      {/* Difficulty & Time */}
      <div className="card flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-warning-500 to-warning-700 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Difficulty</div>
            <div className={`font-semibold ${config.color}`}>
              {config.name}
            </div>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="card flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-success-500 to-success-700 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Time</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {formatTime(timeElapsed)}
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={pauseGame}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label={isPaused ? 'Resume game' : 'Pause game'}
        >
          <Pause className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
