/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import { AstonishedSmiley } from '@/components/AstonishedSmiley';
import { DigitalCounter } from '@/components/DigitalCounter';
import { KOSmiley } from '@/components/KOSmiley';
import { Modal } from '@/components/Modal';
import { Smiley } from '@/components/Smiley';
import { Meta } from '@/layouts/Meta';
import { WebApp } from '@/templates/WebApp';

type CellProps = {
  onDown: () => void;
  onUp: () => void;
};

function Cell({ onDown, onUp }: CellProps) {
  const handleClick = () => {};
  const handleMouseDown = () => {
    onDown();
  };
  const handleMouseUp = () => {
    onUp();
  };

  return (
    <button
      type="button"
      className="cell-btn"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <span>Cell</span>
    </button>
  );
}

type GameConfig = {
  height: number;
  width: number;
  mines: number;
};
type StandardLevels = 'beginner' | 'intermediate' | 'expert';
type AllLevels = StandardLevels | 'custom';

const isValidLevel = (level: string): level is AllLevels => {
  return (
    level === 'beginner' ||
    level === 'intermediate' ||
    level === 'expert' ||
    level === 'custom'
  );
};

const DEFAULT_CUSTOM_CONFIG: GameConfig = {
  height: 20,
  width: 30,
  mines: 145,
};
const LEVEL_TO_GAME_CONFIG: Record<StandardLevels, GameConfig> = {
  beginner: { height: 9, width: 9, mines: 10 },
  intermediate: { height: 16, width: 16, mines: 40 },
  expert: { height: 16, width: 30, mines: 99 },
};

const getStandardGameConfig = (level: StandardLevels): GameConfig => {
  if (LEVEL_TO_GAME_CONFIG[level] !== undefined) {
    return LEVEL_TO_GAME_CONFIG[level];
  }

  return LEVEL_TO_GAME_CONFIG.beginner;
};

const Index = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [gameConfig, setGameConfig] = useState<GameConfig>(
    LEVEL_TO_GAME_CONFIG.beginner
  );
  const [isGameControlModalOpen, setIsGameControlModalOpen] = useState(false);
  const [isControlModalOpen, setIsControlModalOpen] = useState(false);

  const handleGameControlClick = () => {
    setIsGameControlModalOpen(true);
    setIsControlModalOpen(false);
  };
  const handleGameControlClose = () => {
    setIsGameControlModalOpen(false);
  };
  const handleControlClick = () => {
    setIsGameControlModalOpen(false);
    setIsControlModalOpen(true);
  };
  const handleControlClose = () => {
    setIsControlModalOpen(false);
  };

  const handleReset = () => {
    console.log('Reset');
    setIsOver(true);
  };
  const handleCellDown = () => {
    console.log('Cell pressed');
    setIsPressed(true);
  };
  const handleCellUp = () => {
    console.log('Cell unpressed');
    setIsPressed(false);
  };

  // Form stuff
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

    setCustomWidth(Number(value));
  };
  const [customMines, setCustomMines] = useState(DEFAULT_CUSTOM_CONFIG.mines);
  const handleCustomMinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setCustomMines(Number(value));
  };
  const [gameLevel, setGameLevel] = useState<AllLevels>('beginner');
  const handleGameLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (isValidLevel(value)) {
      setGameLevel(value);
    }
  };
  const handleNewGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newGameConfig: GameConfig =
      gameLevel === 'custom'
        ? {
            height: customHeight,
            width: customWidth,
            mines: customMines,
          }
        : getStandardGameConfig(gameLevel);
    setGameConfig(newGameConfig);
    setIsOver(false);
    setIsGameControlModalOpen(false);
  };

  let CurrentSmiley = Smiley;
  if (isPressed) {
    CurrentSmiley = AstonishedSmiley;
  }
  if (isOver) {
    CurrentSmiley = KOSmiley;
  }

  console.log('gameConfig', gameConfig);

  return (
    <WebApp
      meta={<Meta title="Collimator" description="Minesweeper" />}
      title="Minesweeper"
    >
      <div className="game-controls">
        <ul className="game-controls-list">
          <li>
            <button
              className="link-btn"
              type="button"
              onClick={handleGameControlClick}
            >
              Game
            </button>
            {isGameControlModalOpen && (
              <Modal title="Game" onClose={handleGameControlClose}>
                <form
                  action=""
                  onSubmit={handleNewGame}
                  className="controls-form"
                >
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
                        <td>9</td>
                        <td>9</td>
                        <td>10</td>
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
                        <td>16</td>
                        <td>16</td>
                        <td>40</td>
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
                        <td>16</td>
                        <td>30</td>
                        <td>99</td>
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
              </Modal>
            )}
          </li>
          <li>
            <button
              className="link-btn"
              type="button"
              onClick={handleControlClick}
            >
              Controls
            </button>
            {isControlModalOpen && (
              <Modal title="Controls" onClose={handleControlClose}>
                <ul className="controls-list">
                  <li>
                    <strong>Left-click</strong> an empty square to reveal it.{' '}
                  </li>
                  <li>
                    <strong>Right-click</strong> (or <strong>Ctrl+click</strong>
                    ) an empty square to flag it.{' '}
                  </li>
                  <li>
                    Midde-click (or left+right click) a number to reveal its
                    adjacent squares.
                  </li>
                  <li>
                    Press <strong>space</strong> bar while hovering over a
                    square to flag it or
                  </li>
                  <li>reveal its adjacent squares. </li>
                  <li>
                    Press <strong>F2</strong> or click the smiley face to start
                    a new game.
                  </li>
                </ul>
              </Modal>
            )}
          </li>
        </ul>
      </div>
      <div className="board-wrapper">
        <div className="board">
          <div className="board-head">
            <div className="board-count">
              <DigitalCounter value={99} />
            </div>
            <button
              className="board-reset-btn"
              type="button"
              onClick={handleReset}
            >
              <CurrentSmiley />
              <span>Reset</span>
            </button>
            <div className="board-timer">
              <DigitalCounter value={112} />
            </div>
          </div>
          <div className="board-body">
            <div className="board-row">
              <Cell onDown={handleCellDown} onUp={handleCellUp} />
            </div>
          </div>
        </div>
      </div>
    </WebApp>
  );
};

export default Index;
