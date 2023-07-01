import type { AllLevels, GameConfig, StandardLevels } from './types';

export const MIN_WIDTH = 8;
export const FLAG_SIZE = 12;

export const DEFAULT_LEVEL: AllLevels = 'beginner';

export const DEFAULT_CUSTOM_CONFIG: GameConfig = {
  height: 20,
  width: 30,
  mines: 145,
};

export const LEVEL_TO_GAME_CONFIG: Record<StandardLevels, GameConfig> = {
  beginner: { height: 3, width: 8, mines: 1 },
  // beginner: { height: 9, width: 9, mines: 10 },
  intermediate: { height: 16, width: 16, mines: 40 },
  expert: { height: 16, width: 30, mines: 99 },
};
