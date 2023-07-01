import { useState } from 'react';

import { AstonishedSmiley } from '@/components/AstonishedSmiley';
import { DigitalCounter } from '@/components/DigitalCounter';
import { Flag } from '@/components/Flag';
import { GameConfigForm } from '@/components/GameConfigForm';
import { KOSmiley } from '@/components/KOSmiley';
import { Modal } from '@/components/Modal';
import { Smiley } from '@/components/Smiley';
import { Timer } from '@/components/Timer';
import { Meta } from '@/layouts/Meta';
import { WebApp } from '@/templates/WebApp';

import { LEVEL_TO_GAME_CONFIG } from '../constants';
import type { GameConfig } from '../types';

type CellProps = {
  onDown: () => void;
  onUp: () => void;
  onRightClick: () => void;
};

function Cell({ onDown, onUp, onRightClick }: CellProps) {
  const [isFlagged, setIsFlagged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.button === 0) {
      console.log('Left mouse down', e.button);
      onDown();
    }
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.button === 0) {
      console.log('Left mouse up');
      onUp();
    }
  };
  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onRightClick();
    setIsFlagged(true);
  };

  return (
    <button
      type="button"
      className="cell-btn"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={handleRightClick}
    >
      {isFlagged && <Flag width={12} height={12} />}
      <span>Cell</span>
    </button>
  );
}

const Index = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [gameConfig, setGameConfig] = useState<GameConfig>(
    LEVEL_TO_GAME_CONFIG.beginner
  );
  const [numOfMines, setNumOfMines] = useState(gameConfig.mines);
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
    setIsStarted(false);
  };
  const handleCellDown = () => {
    console.log('Cell pressed');
    setIsPressed(true);
  };
  const handleCellUp = () => {
    console.log('Cell unpressed');
    setIsPressed(false);
    if (!isStarted) {
      setIsStarted(true);
    }
  };
  const handleCellRightClick = () => {
    console.log('Cell right clicked');
    setNumOfMines(numOfMines - 1);
  };

  const handleNewGame = (newGameConfig: GameConfig) => {
    console.log('New game', newGameConfig);
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

  const isTimerOn = !isOver && isStarted;

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
                <GameConfigForm onNewGame={handleNewGame} />
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
              <DigitalCounter value={numOfMines} />
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
              <Timer isOn={isTimerOn} />
            </div>
          </div>
          <div className="board-body">
            <div className="board-row">
              <Cell
                onDown={handleCellDown}
                onUp={handleCellUp}
                onRightClick={handleCellRightClick}
              />
            </div>
          </div>
        </div>
      </div>
    </WebApp>
  );
};

export default Index;
