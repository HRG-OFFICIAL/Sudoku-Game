import { motion } from 'framer-motion';
import { Moon, Sun, Settings, Trophy, HelpCircle } from 'lucide-react';
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
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ 
          backgroundColor: 'var(--bg-primary)', 
          borderBottom: '2px solid #000000',
          opacity: 0.9
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex items-center space-x-3"
            >
              <h1 className="text-2xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                Sudoku
              </h1>
            </motion.div>

            <div className="flex items-center space-x-4">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden sm:flex items-center space-x-4 text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4" />
                  <span>{stats.gamesWon}</span>
                </div>
                <div className="w-px h-4" style={{ backgroundColor: 'var(--border-color)' }} />
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
                className="theme-toggle"
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
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: 'var(--bg-tertiary)', 
                  color: 'var(--text-primary)',
                  border: '1px solid #000000'
                }}
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
                onClick={() => {
                  // For now, just show an alert - can be expanded later
                  alert('Settings feature coming soon!');
                }}
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: 'var(--bg-tertiary)', 
                  color: 'var(--text-primary)',
                  border: '1px solid #000000'
                }}
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
