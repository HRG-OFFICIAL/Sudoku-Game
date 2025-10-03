import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, User, Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { DIFFICULTY_CONFIGS } from '../constants';
import { Difficulty } from '../types';

export function StartScreen() {
  const { startNewGame, stats, grid } = useGameStore();
  const [playerName, setPlayerName] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [showContinue] = useState(false);

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert', 'master', 'legendary'];

  const handleStartGame = () => {
    console.log('Start game clicked');
    console.log('Current grid cells length:', grid.cells.length);
    if (playerName.trim()) {
      console.log('Starting game with difficulty:', selectedDifficulty);
      startNewGame(selectedDifficulty);
      console.log('After startNewGame call, grid cells length:', grid.cells.length);
    } else {
      console.log('Player name is empty');
    }
  };

  const handleContinue = () => {
    // Load saved game logic would go here
    console.log('Continue game');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      <div className="card space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto"
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
              Welcome to Sudoku
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Challenge your mind with beautiful puzzles
            </p>
          </div>
        </div>

        {/* Player Name Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Player Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="input pl-10"
              maxLength={20}
            />
          </div>
        </motion.div>

        {/* Difficulty Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Difficulty
          </label>
          <div className="grid grid-cols-2 gap-2">
            {difficulties.map((difficulty) => {
              const config = DIFFICULTY_CONFIGS[difficulty];
              const isSelected = selectedDifficulty === difficulty;
              
              return (
                <motion.button
                  key={difficulty}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className={`font-medium ${isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    {config.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {config.cellsToRemove} empty
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartGame}
            disabled={!playerName.trim()}
            className="btn btn-primary btn-lg w-full"
          >
            <Play className="w-5 h-5 mr-2" />
            New Game
          </motion.button>

          {showContinue && (
            <motion.button
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="btn btn-secondary btn-lg w-full"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Continue Game
            </motion.button>
          )}
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {stats.gamesWon}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Games Won
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success-600 dark:text-success-400">
                {stats.streak}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Current Streak
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">
                {Math.floor(stats.totalTime / 60)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Minutes Played
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
