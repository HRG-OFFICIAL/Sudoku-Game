import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

/**
 * Example component demonstrating the app structure
 * This can be removed in production
 */
export function Example() {
  const { grid, selectedCell } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Example Component</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        This is an example component showing how to use the game store.
      </p>
      
      <div className="space-y-2">
        <p>Grid cells: {grid.cells.length}</p>
        <p>Selected cell: {selectedCell ? `${selectedCell.row}, ${selectedCell.col}` : 'None'}</p>
        <p>Game state loaded: {grid.cells.length > 0 ? 'Yes' : 'No'}</p>
      </div>
    </motion.div>
  );
}
