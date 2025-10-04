import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { PauseScreen } from './components/PauseScreen';
import { ResultScreen } from './components/ResultScreen';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/Toaster';
import { Position } from './types';

function App() {
  const { 
    isPaused, 
    isCompleted, 
    updateTimer, 
    grid, 
    selectedCell, 
    selectCell, 
    setCellValue, 
    clearCell, 
    undo, 
    redo, 
    getHint,
    pauseGame,
    resumeGame
  } = useGameStore();

  // Timer effect
  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [updateTimer]);

  // Keyboard input handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't handle keyboard input if game is paused or completed
      if (isPaused || isCompleted) return;
      
      // Don't handle if no game is active
      if (!grid.cells.length) return;

      const { key } = event;
      
      // Prevent default behavior for number keys and arrow keys
      if (/^[1-9]$/.test(key) || ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Delete', 'Backspace', 'u', 'r', 'h'].includes(key)) {
        event.preventDefault();
      }

      // Number input (1-9)
      if (/^[1-9]$/.test(key)) {
        const number = parseInt(key);
        if (selectedCell) {
          setCellValue(number);
        }
        return;
      }

      // Clear cell
      if (key === 'Delete' || key === 'Backspace') {
        if (selectedCell) {
          clearCell();
        }
        return;
      }

      // Navigation with arrow keys
      if (selectedCell) {
        let newRow = selectedCell.row;
        let newCol = selectedCell.col;

        switch (key) {
          case 'ArrowUp':
            newRow = Math.max(0, selectedCell.row - 1);
            break;
          case 'ArrowDown':
            newRow = Math.min(8, selectedCell.row + 1);
            break;
          case 'ArrowLeft':
            newCol = Math.max(0, selectedCell.col - 1);
            break;
          case 'ArrowRight':
            newCol = Math.min(8, selectedCell.col + 1);
            break;
        }

        if (newRow !== selectedCell.row || newCol !== selectedCell.col) {
          selectCell({ row: newRow, col: newCol });
        }
        return;
      }

      // Keyboard shortcuts
      switch (key.toLowerCase()) {
        case 'u':
          undo();
          break;
        case 'r':
          redo();
          break;
        case 'h':
          getHint();
          break;
        case ' ':
          if (isPaused) {
            resumeGame();
          } else {
            pauseGame();
          }
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedCell, isPaused, isCompleted, grid.cells.length, selectCell, setCellValue, clearCell, undo, redo, getHint, pauseGame, resumeGame]);

  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'var(--transition)' }}>
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {!isPaused && !isCompleted && !grid.cells.length && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <StartScreen />
              </motion.div>
            )}
            
            {!isPaused && !isCompleted && grid.cells.length > 0 && (
              <motion.div
                key="game"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <GameScreen />
              </motion.div>
            )}
            
            {isPaused && (
              <motion.div
                key="pause"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <PauseScreen />
              </motion.div>
            )}
            
            {isCompleted && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ResultScreen />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
