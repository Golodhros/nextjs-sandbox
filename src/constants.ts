import type { GameConfig, StandardLevels } from './types';

export const MIN_WIDTH = 8;

export const DEFAULT_CUSTOM_CONFIG: GameConfig = {
  height: 20,
  width: 30,
  mines: 145,
};

export const LEVEL_TO_GAME_CONFIG: Record<StandardLevels, GameConfig> = {
  beginner: { height: 2, width: 3, mines: 1 },
  intermediate: { height: 16, width: 16, mines: 40 },
  expert: { height: 16, width: 30, mines: 99 },
};
