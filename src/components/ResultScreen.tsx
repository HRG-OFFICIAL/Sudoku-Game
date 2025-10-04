import { motion } from 'framer-motion';
import { Trophy, Clock, Star, RotateCcw, Home, Share2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { DIFFICULTY_CONFIGS } from '../constants';

export function ResultScreen() {
  const {
    timeElapsed,
    difficulty,
    hintsUsed,
    mistakes,
    stats,
    startNewGame,
    resetGame,
  } = useGameStore();

  const config = DIFFICULTY_CONFIGS[difficulty];
  const isNewRecord = stats.bestTime[difficulty] === 0 || timeElapsed < stats.bestTime[difficulty];
  const isPerfect = mistakes === 0;
  const isFast = timeElapsed < 300; // 5 minutes

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = () => {
    if (isPerfect && isFast) {
      return "Incredible! Perfect and lightning fast! ⚡";
    } else if (isPerfect) {
      return "Perfect! No mistakes at all! ✨";
    } else if (isFast) {
      return "Lightning fast! Great speed! ⚡";
    } else {
      return "Well done! Great job! 🎉";
    }
  };

  const handleNewGame = () => {
    startNewGame(difficulty);
  };

  const handleShare = () => {
    const text = `I just completed a ${config.name} Sudoku puzzle in ${formatTime(timeElapsed)}! 🧩`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto"
    >
      <div className="card text-center space-y-8">
        {/* Celebration */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-6xl"
        >
          🎉
        </motion.div>

        {/* Title */}
        <div>
          <h2 className="text-3xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
            Congratulations!
          </h2>
          <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
            {getPerformanceMessage()}
          </p>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" style={{ color: '#000000' }} />
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Time</div>
                  <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {formatTime(timeElapsed)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" style={{ color: '#000000' }} />
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Difficulty</div>
                  <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {config.name}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" style={{ color: '#000000' }} />
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Hints</div>
                  <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {hintsUsed}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4" style={{ color: '#000000' }}>❌</div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Mistakes</div>
                  <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {mistakes}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          {(isNewRecord || isPerfect || isFast) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid #000000' }}
            >
              <div className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                🏆 Achievement Unlocked!
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {isNewRecord && "New Personal Best! "}
                {isPerfect && "Perfect Game! "}
                {isFast && "Speed Demon! "}
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewGame}
            className="btn btn-primary btn-lg w-full"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </motion.button>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="btn btn-secondary btn-md"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetGame}
              className="btn btn-secondary btn-md"
            >
              <Home className="w-4 h-4 mr-1" />
              Main Menu
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
