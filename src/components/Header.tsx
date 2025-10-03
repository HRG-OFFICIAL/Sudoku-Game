import { motion } from 'framer-motion';
import { Moon, Sun, Settings, Trophy, Keyboard, HelpCircle } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useGameStore } from '../store/gameStore';
import { KeyboardHelp } from './KeyboardHelp';
import { InstructionsPage } from './InstructionsPage';
import { useState } from 'react';

export function Header() {
  const { setTheme, actualTheme } = useTheme();
  const { stats } = useGameStore();
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleTheme = () => {
    setTheme(actualTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex items-center space-x-3"
            >
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                Sudoku
              </h1>
            </motion.div>

            <div className="flex items-center space-x-4">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden sm:flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4" />
                  <span>{stats.gamesWon}</span>
                </div>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{stats.streak}</span>
                  <span>streak</span>
                </div>
              </motion.div>

              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {actualTheme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>

              {/* Instructions */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInstructions(true)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Instructions"
              >
                <HelpCircle className="w-5 h-5" />
              </motion.button>

              {/* Keyboard Help */}
              <KeyboardHelp />

              {/* Settings */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Instructions Modal */}
      {showInstructions && (
        <InstructionsPage onClose={() => setShowInstructions(false)} />
      )}
    </>
  );
}
