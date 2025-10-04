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
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Player</div>
          <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Sudoku Master
          </div>
        </div>
      </div>

      {/* Difficulty & Time */}
      <div className="card flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Difficulty</div>
            <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {config.name}
            </div>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="card flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Time</div>
            <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {formatTime(timeElapsed)}
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={pauseGame}
          className="p-2 rounded-lg transition-colors"
          style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            color: 'var(--text-primary)',
            border: '1px solid #000000'
          }}
          aria-label={isPaused ? 'Resume game' : 'Pause game'}
        >
          <Pause className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
