import { STORAGE_KEYS } from '../constants';

/**
 * Safe localStorage operations with error handling
 */
export class Storage {
  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error);
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Failed to set item in localStorage: ${key}`, error);
      return false;
    }
  }

  static remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  }

  static clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Failed to clear localStorage', error);
      return false;
    }
  }

  static has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  static size(): number {
    return localStorage.length;
  }

  static keys(): string[] {
    return Object.keys(localStorage);
  }
}

/**
 * Game-specific storage helpers
 */
export const gameStorage = {
  getGameState: () => Storage.get(STORAGE_KEYS.GAME_STATE, null),
  setGameState: (state: any) => Storage.set(STORAGE_KEYS.GAME_STATE, state),
  clearGameState: () => Storage.remove(STORAGE_KEYS.GAME_STATE),

  getPreferences: () => Storage.get(STORAGE_KEYS.USER_PREFERENCES, {}),
  setPreferences: (preferences: any) => Storage.set(STORAGE_KEYS.USER_PREFERENCES, preferences),

  getStats: () => Storage.get(STORAGE_KEYS.GAME_STATS, {}),
  setStats: (stats: any) => Storage.set(STORAGE_KEYS.GAME_STATS, stats),

  getAchievements: () => Storage.get(STORAGE_KEYS.ACHIEVEMENTS, []),
  setAchievements: (achievements: any) => Storage.set(STORAGE_KEYS.ACHIEVEMENTS, achievements),
};
