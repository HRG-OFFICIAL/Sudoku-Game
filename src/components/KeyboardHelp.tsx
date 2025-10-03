import { motion } from 'framer-motion';
import { Keyboard, HelpCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function KeyboardHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const shortcuts = [
    { key: '1-9', description: 'Enter numbers' },
    { key: 'Arrow Keys', description: 'Navigate cells' },
    { key: 'Delete/Backspace', description: 'Clear cell' },
    { key: 'U', description: 'Undo' },
    { key: 'R', description: 'Redo' },
    { key: 'H', description: 'Get hint' },
    { key: 'Space', description: 'Pause/Resume' },
  ];

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={tooltipRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Keyboard shortcuts"
      >
        <Keyboard className="w-5 h-5" />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50"
        >
          <div className="flex items-center space-x-2 mb-3">
            <HelpCircle className="w-4 h-4 text-primary-500" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Keyboard Shortcuts
            </h3>
          </div>
          
          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {shortcut.description}
                </span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
