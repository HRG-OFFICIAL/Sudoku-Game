import { Difficulty, DifficultyConfig, Achievement } from '../types';

export const GRID_SIZE = 9;
export const BOX_SIZE = 3;
export const UNASSIGNED = 0;
export const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    name: 'Easy',
    cellsToRemove: 29,
    color: 'text-green-600',
  },
  medium: {
    name: 'Medium',
    cellsToRemove: 38,
    color: 'text-yellow-600',
  },
  hard: {
    name: 'Hard',
    cellsToRemove: 47,
    color: 'text-orange-600',
  },
  expert: {
    name: 'Expert',
    cellsToRemove: 56,
    color: 'text-red-600',
  },
  master: {
    name: 'Master',
    cellsToRemove: 65,
    color: 'text-purple-600',
  },
  legendary: {
    name: 'Legendary',
    cellsToRemove: 74,
    color: 'text-pink-600',
  },
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_win',
    name: 'First Victory',
    description: 'Complete your first Sudoku puzzle',
    icon: '🏆',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a puzzle in under 5 minutes',
    icon: '⚡',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete a puzzle without any mistakes',
    icon: '✨',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Win 10 games in a row',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'hint_hater',
    name: 'Hint Hater',
    description: 'Complete 5 puzzles without using hints',
    icon: '🚫',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'legendary_player',
    name: 'Legendary Player',
    description: 'Complete a Legendary difficulty puzzle',
    icon: '👑',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
];

export const STORAGE_KEYS = {
  GAME_STATE: 'sudoku_game_state',
  USER_PREFERENCES: 'sudoku_user_preferences',
  GAME_STATS: 'sudoku_game_stats',
  ACHIEVEMENTS: 'sudoku_achievements',
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;
