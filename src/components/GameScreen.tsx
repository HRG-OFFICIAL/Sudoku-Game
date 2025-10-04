import { motion } from 'framer-motion';
import { Trash2, RotateCcw, RotateCw, Lightbulb, XCircle } from 'lucide-react';
import { SudokuGrid } from './SudokuGrid';
import { GameInfo } from './GameInfo';
import { GameControls } from './GameControls';
import { useGameStore } from '../store/gameStore';

export function GameScreen() {
  const { 
    grid, 
    isCompleted, 
    selectedCell, 
    setCellValue, 
    clearCell, 
    getHint, 
    undo, 
    redo, 
    moves, 
    moveIndex, 
    hintsUsed, 
    clearAllErrors 
  } = useGameStore();

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
        {/* Left Column - Grid and Actions */}
        <div className="flex-1 space-y-6">
          {/* Sudoku Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SudokuGrid />
          </motion.div>

          {/* Actions and Game Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col lg:flex-row gap-4"
          >
            {/* Actions Section */}
            <div className="flex-1">
              <div className="card">
                <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                  Actions
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (selectedCell) clearCell();
                      }}
                      disabled={!selectedCell}
                      className="btn btn-error btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={getHint}
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
                      disabled={moveIndex < 0}
                      className="btn btn-undo-redo btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Undo
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={redo}
                      disabled={moveIndex >= moves.length - 1}
                      className="btn btn-undo-redo btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RotateCw className="w-4 h-4 mr-1" />
                      Redo
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Stats Section */}
            <div className="lg:w-64">
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
          </motion.div>
        </div>

        {/* Right Column - Controls and Numbers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-80 space-y-4"
        >
          <GameControls />
          {/* Numbers Section Only */}
          <div className="card">
            <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Numbers
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <motion.button
                  key={number}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (selectedCell) setCellValue(number);
                  }}
                  disabled={!selectedCell}
                  className="btn btn-secondary btn-lg aspect-square disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {number}
                </motion.button>
              ))}
            </div>
          </div>
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
          <div className="modal-content p-8 max-w-md mx-4 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Congratulations!
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
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
