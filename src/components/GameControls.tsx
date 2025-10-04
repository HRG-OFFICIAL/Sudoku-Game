import { motion } from 'framer-motion';
import { Play, RotateCcw, Home } from 'lucide-react';
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

  const handleMainMenu = () => {
    // Clear the grid to go back to start screen
    useGameStore.setState({
      grid: { cells: [], original: [], solution: [] },
      selectedCell: null,
      isPaused: false,
      isCompleted: false,
      timeElapsed: 0,
      hintsUsed: 0,
      mistakes: 0,
      moves: [],
      moveIndex: -1,
    });
  };

  return (
    <div className="card">
      <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
        Game Controls
      </h3>
      
      <div className="space-y-2">
        {isPaused ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resumeGame}
            className="btn btn-secondary btn-md w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            Resume Game
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewGame}
            className="btn btn-secondary btn-md w-full"
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
            onClick={handleMainMenu}
            className="btn btn-outline btn-sm"
          >
            <Home className="w-4 h-4 mr-1" />
            Main Menu
          </motion.button>
        </div>
      </div>
    </div>
  );
}
