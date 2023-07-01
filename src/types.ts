export type GameConfig = {
  height: number;
  width: number;
  mines: number;
};
export type StandardLevels = 'beginner' | 'intermediate' | 'expert';
export type AllLevels = StandardLevels | 'custom';
