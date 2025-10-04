import { motion } from 'framer-motion';
import { ArrowLeft, Keyboard, Mouse, Target, Lightbulb, RotateCcw, XCircle, Trash2 } from 'lucide-react';

interface InstructionsPageProps {
  onClose: () => void;
}

export function InstructionsPage({ onClose }: InstructionsPageProps) {
  const sections = [
    {
      title: "How to Play Sudoku (Beginner Guide)",
      icon: <Target className="w-6 h-6" style={{ color: '#000000' }} />,
      content: [
        "🎯 GOAL: Fill the 9×9 grid with numbers 1-9 so that every row, column, and 3×3 box contains each number exactly once.",
        "📋 RULES:",
        "   Each ROW must have numbers 1-9 (no repeats)",
        "   Each COLUMN must have numbers 1-9 (no repeats)",  
        "   Each 3×3 BOX must have numbers 1-9 (no repeats)",
        "⚫ Gray cells contain given numbers - you cannot change them",
        "⚪ White/Light cells are empty - you fill these with 1-9",
        "🔴 Red cells have conflicts - same number appears twice in row/column/box",
        "🟢 Green cells are selected or highlighted for reference"
      ]
    },
    {
      title: "Mouse Controls",
      icon: <Mouse className="w-6 h-6" style={{ color: '#000000' }} />,
      content: [
        "Click on any empty cell to select it",
        "Use the number pad on the right to enter numbers 1-9",
        "Click the 🔴 Clear button (red) to remove a number from the selected cell",
        "Click the 🟠 Hint button (orange) to get help with a random empty cell",
        "Click the 🔵 Clear Errors button (blue) to remove all error highlights",
        "Use the ⚫ Undo/Redo buttons (black) to reverse or repeat your moves"
      ]
    },
    {
      title: "Keyboard Shortcuts",
      icon: <Keyboard className="w-6 h-6" style={{ color: '#000000' }} />,
      content: [
        "Press 1-9 to enter numbers directly",
        "Use Arrow Keys (↑↓←→) to navigate between cells",
        "Press Delete or Backspace to clear the selected cell",
        "Press U to undo your last move",
        "Press R to redo a move",
        "Press H to get a hint",
        "Press Space to pause/resume the game"
      ]
    },
    {
      title: "Game Features",
      icon: <Lightbulb className="w-6 h-6" style={{ color: '#000000' }} />,
      content: [
        "6 Difficulty Levels: Easy, Medium, Hard, Expert, Master, Legendary",
        "Real-time validation shows errors in red",
        "Auto-save your progress automatically",
        "Statistics tracking for your performance",
        "Professional black and white theme with vivid action buttons",
        "Dark/Light theme support with smooth transitions",
        "Mobile-responsive design for all screen sizes",
        "Theme-aware grid design with subtle borders in dark mode"
      ]
    },
    {
      title: "Tips for Success",
      icon: <Target className="w-6 h-6" style={{ color: '#000000' }} />,
      content: [
        "Start with the easiest difficulty and work your way up",
        "Look for cells that can only have one possible number",
        "Use the highlighting feature to see related cells (green highlight)",
        "Don't be afraid to use hints when you're stuck",
        "Take breaks if you get frustrated - Sudoku is meant to be relaxing!",
        "Practice regularly to improve your solving speed"
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="modal-content max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            How to Play Sudoku
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'var(--bg-tertiary)', 
              color: 'var(--text-primary)',
              border: '1px solid #000000'
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {section.title}
                  </h2>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#000000' }} />
                      <span className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Visual Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 card"
            style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid #000000' }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Visual Example - Why Cells Turn Red
            </h3>
            <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'var(--bg-card)' }}>
              <div className="grid grid-cols-9 gap-1 max-w-fit mx-auto" style={{ border: '2px solid #000000' }}>
                {/* Example grid showing conflicts */}
                {[
                  [1, 2, 3, 4, 5, 6, 7, 8, 9],
                  [4, 5, 6, 7, 8, 9, 1, 2, 3],
                  [7, 8, 9, 1, 2, 3, 4, 5, 6],
                  [2, 3, 4, 5, 6, 7, 8, 9, 1],
                  [5, 6, 7, 8, 9, 1, 2, 3, 4],
                  [8, 9, 1, 2, 3, 4, 5, 6, 7],
                  [3, 4, 5, 6, 7, 8, 9, 1, 2],
                  [6, 7, 8, 9, 1, 2, 3, 4, 5],
                  [9, 1, 2, 3, 4, 5, 6, 7, 8]
                ].map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="w-8 h-8 flex items-center justify-center text-sm font-bold border"
                      style={{
                        backgroundColor: rowIndex < 3 && colIndex < 3 ? '#ff4444' : '#ffffff',
                        color: rowIndex < 3 && colIndex < 3 ? '#ffffff' : '#000000',
                        borderColor: '#e5e5e5'
                      }}
                    >
                      {cell}
                    </div>
                  ))
                )}
              </div>
              <p className="text-sm mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
                Example: If you put "1" in the top-left corner, the other "1"s in the same 3×3 box turn red
              </p>
            </div>
          </motion.div>

          {/* Quick Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 card"
            style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid #000000' }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Quick Reference
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Mouse Actions</h4>
                <div className="space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center space-x-2">
                    <Mouse className="w-4 h-4" style={{ color: '#000000' }} />
                    <span>Click cell to select</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trash2 className="w-4 h-4" style={{ color: '#ff4444' }} />
                    <span>🔴 Clear button to delete</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4" style={{ color: '#ffaa00' }} />
                    <span>🟠 Hint button for help</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Keyboard Shortcuts</h4>
                <div className="space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center space-x-2">
                    <Keyboard className="w-4 h-4" style={{ color: '#000000' }} />
                    <span>1-9: Enter numbers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-4 h-4" style={{ color: '#10b981' }} />
                    <span>U: Undo, R: Redo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4" style={{ color: '#3b82f6' }} />
                    <span>Del: Clear cell</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
