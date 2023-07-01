/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import {
  DEFAULT_CUSTOM_CONFIG,
  DEFAULT_LEVEL,
  LEVEL_TO_GAME_CONFIG,
  MIN_WIDTH,
} from '../../constants';
import type { AllLevels, GameConfig, StandardLevels } from '../../types';

const isValidLevel = (level: string): level is AllLevels => {
  return (
    level === 'beginner' ||
    level === 'intermediate' ||
    level === 'expert' ||
    level === 'custom'
  );
};

const getStandardGameConfig = (level: StandardLevels): GameConfig => {
  if (LEVEL_TO_GAME_CONFIG[level] !== undefined) {
    return LEVEL_TO_GAME_CONFIG[level];
  }

  return LEVEL_TO_GAME_CONFIG.beginner;
};

type GameConfigFormProps = {
  onNewGame: (config: GameConfig) => void;
};

const GameConfigForm = ({ onNewGame }: GameConfigFormProps) => {
  const [customHeight, setCustomHeight] = useState(
    DEFAULT_CUSTOM_CONFIG.height
  );
  const handleCustomHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setCustomHeight(Number(value));
  };

  const [customWidth, setCustomWidth] = useState(DEFAULT_CUSTOM_CONFIG.width);
  const handleCustomWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setCustomWidth(Number(value) < MIN_WIDTH ? MIN_WIDTH : Number(value));
  };

  const [customMines, setCustomMines] = useState(DEFAULT_CUSTOM_CONFIG.mines);
  const handleCustomMinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setCustomMines(Number(value));
  };

  const [gameLevel, setGameLevel] = useLocalStorage('level', DEFAULT_LEVEL);
  const handleGameLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (isValidLevel(value)) {
      setGameLevel(value);
    }
  };

  const handleNewGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Validate custom game config (not negative, not more mines than spaces, etc.)
    const newGameConfig: GameConfig =
      gameLevel === 'custom'
        ? {
            height: customHeight,
            width: customWidth,
            mines: customMines,
          }
        : getStandardGameConfig(gameLevel);
    onNewGame(newGameConfig);
  };

  return (
    <form action="" onSubmit={handleNewGame} className="controls-form">
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>Height</th>
            <th>Width</th>
            <th>Mines</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label>
                <input
                  type="radio"
                  name="game-level"
                  value="beginner"
                  checked={gameLevel === 'beginner'}
                  onChange={handleGameLevelChange}
                />
                Beginner
              </label>
            </td>
            <td>{LEVEL_TO_GAME_CONFIG.beginner.height}</td>
            <td>{LEVEL_TO_GAME_CONFIG.beginner.width}</td>
            <td>{LEVEL_TO_GAME_CONFIG.beginner.mines}</td>
          </tr>
          <tr>
            <td>
              <label>
                <input
                  type="radio"
                  name="game-level"
                  value="intermediate"
                  checked={gameLevel === 'intermediate'}
                  onChange={handleGameLevelChange}
                />
                Intermediate
              </label>
            </td>
            <td>{LEVEL_TO_GAME_CONFIG.intermediate.height}</td>
            <td>{LEVEL_TO_GAME_CONFIG.intermediate.width}</td>
            <td>{LEVEL_TO_GAME_CONFIG.intermediate.mines}</td>
          </tr>
          <tr>
            <td>
              <label>
                <input
                  type="radio"
                  name="game-level"
                  value="expert"
                  checked={gameLevel === 'expert'}
                  onChange={handleGameLevelChange}
                />
                Expert
              </label>
            </td>
            <td>{LEVEL_TO_GAME_CONFIG.expert.height}</td>
            <td>{LEVEL_TO_GAME_CONFIG.expert.width}</td>
            <td>{LEVEL_TO_GAME_CONFIG.expert.mines}</td>
          </tr>
          <tr>
            <td>
              <label>
                <input
                  type="radio"
                  name="game-level"
                  value="custom"
                  checked={gameLevel === 'custom'}
                  onChange={handleGameLevelChange}
                />
                Custom
              </label>
            </td>
            <td>
              <input
                className="custom-field"
                type="text"
                value={customHeight}
                onChange={handleCustomHeightChange}
                name="custom-height"
              />
            </td>
            <td>
              <input
                className="custom-field"
                type="text"
                value={customWidth}
                onChange={handleCustomWidthChange}
                name="custom-width"
              />
            </td>
            <td>
              <input
                className="custom-field"
                type="text"
                value={customMines}
                onChange={handleCustomMinesChange}
                name="custom-mines"
              />
            </td>
          </tr>
          <tr className="controls-form-actions">
            <td colSpan={4}>
              <button type="submit">New Game</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export { GameConfigForm };
