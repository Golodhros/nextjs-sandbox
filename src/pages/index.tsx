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

function getCellClassFor(adjacentMines: number) {
  switch (adjacentMines) {
    case 0:
      return 'cell-0';
    case 1:
      return 'cell-1';
    case 2:
      return 'cell-2';
    case 3:
      return 'cell-3';
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return 'cell-4';
    default:
      return '';
  }
}

function getBoardStateToRender(
  boardState: CellState[],
  gameConfig: GameConfig
) {
  const result: Record<string, CellState[]> = {};

  for (let i = 0; i < boardState.length; i += gameConfig.width) {
    result[`row-${Math.random() + i}`] = boardState.slice(
      i,
      i + gameConfig.width
    );
  }

  return result;
}

type CellProps = {
  onReveal: (id: string) => void;
  onFlag: (id: string) => void;
  onGameOver: () => void;
  onAdjacentReveal: (id: string) => void;
  state: CellState;
};

function Cell({
  onReveal,
  onFlag,
  onGameOver,
  onAdjacentReveal,
  state,
}: CellProps) {
  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.button === 0) {
      onReveal(state.id);

      if (state.isMine) {
        onGameOver();
      } else if (!state.isMine && state.adjacentMines === 0) {
        onAdjacentReveal(state.id);
      }
    }
  };
  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onFlag(state.id);
  };

  return (
    <span className="cell-wrapper">
      {!state.isRevealed && (
        <button
          type="button"
          className="cell-btn"
          onMouseUp={handleMouseUp}
          onContextMenu={handleRightClick}
        >
          {state.isFlagged && <Flag width={12} height={12} />}
          <span>Cell</span>
        </button>
      )}
      {/* TODO: get bomb SVG */}
      {state.isRevealed && state.isMine && 'M'}
      {state.isRevealed && !state.isMine && (
        <span className={getCellClassFor(state.adjacentMines)}>
          {state.adjacentMines}
        </span>
      )}
    </span>
  );
}

type CellState = {
  id: string;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

const initialBoardState: CellState[] = [
  {
    id: 'r0-c0',
    isMine: true,
    isRevealed: false,
    isFlagged: false,
    adjacentMines: 0,
  },
  {
    id: 'r0-c1',
    isMine: false,
    isRevealed: false,
    isFlagged: false,
    adjacentMines: 1,
  },
  {
    id: 'r0-c2',
    isMine: false,
    isRevealed: false,
    isFlagged: false,
    adjacentMines: 0,
  },
  {
    id: 'r1-c0',
    isMine: false,
    isRevealed: false,
    isFlagged: false,
    adjacentMines: 1,
  },
  {
    id: 'r1-c1',
    isMine: false,
    isRevealed: false,
    isFlagged: false,
    adjacentMines: 1,
  },
  {
    id: 'r1-c2',
    isMine: false,
    isRevealed: false,
    isFlagged: false,
    adjacentMines: 0,
  },
];

const Index = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [boardState, setBoardState] = useState<CellState[]>([
    ...initialBoardState,
  ]);
  const [gameConfig, setGameConfig] = useState<GameConfig>(
    LEVEL_TO_GAME_CONFIG.beginner
  );
  const [numOfMines, setNumOfMines] = useState(gameConfig.mines);

  // TODO: Extract controls into a separate component
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
    setIsOver(false);
    setIsStarted(false);
    setBoardState(initialBoardState);
    setNumOfMines(gameConfig.mines);
  };
  const handleGameOver = () => {
    setIsOver(true);
    setIsStarted(false);
  };
  const handleCellReveal = (cellId: string) => {
    if (!isOver) {
      setIsPressed(false);
      if (!isStarted) {
        setIsStarted(true);
      }
      const newBoardState = boardState.map((cell) => {
        if (cell.id === cellId) {
          return {
            ...cell,
            isRevealed: true,
          };
        }
        return cell;
      });
      setBoardState(newBoardState);
    }
  };
  const handleCellFlag = (cellId: string) => {
    console.log('Right click', cellId);
    setNumOfMines(numOfMines - 1);
    const newBoardState = boardState.map((cell) => {
      if (cell.id === cellId) {
        return {
          ...cell,
          isFlagged: true,
        };
      }
      return cell;
    });
    setBoardState(newBoardState);
  };
  const handleNewGame = (newGameConfig: GameConfig) => {
    setIsOver(false);
    setIsGameControlModalOpen(false);
    console.log('New game', newGameConfig);
    setGameConfig(newGameConfig);
    // TODO: Generate board state from config
  };
  const handleCellAdjacentReveal = (id: string) => {
    if (!isOver) {
      // Iterate through adjacent cells and reveal them if they are not mines
      const currentRow = Number(id.split('-')[0]?.slice(1));
      const currentColumn = Number(id.split('-')[1]?.slice(1));
      const adjacentCellIds = [
        `r${currentRow - 1}-c${currentColumn - 1}`,
        `r${currentRow - 1}-c${currentColumn}`,
        `r${currentRow - 1}-c${currentColumn + 1}`,
        `r${currentRow}-c${currentColumn - 1}`,
        `r${currentRow}-c${currentColumn + 1}`,
        `r${currentRow + 1}-c${currentColumn - 1}`,
        `r${currentRow + 1}-c${currentColumn}`,
        `r${currentRow + 1}-c${currentColumn + 1}`,
      ];
      const newBoardState = boardState.map((cell) => {
        if (
          cell.id === id ||
          adjacentCellIds.some((cellId) => cell.id === cellId)
        ) {
          return {
            ...cell,
            isRevealed: true,
          };
        }
        return cell;
      });
      setBoardState(newBoardState);
    }
  };

  let CurrentSmiley = Smiley;
  if (isPressed) {
    CurrentSmiley = AstonishedSmiley;
  }
  if (isOver) {
    CurrentSmiley = KOSmiley;
  }
  const isTimerOn = !isOver && isStarted;

  const stateToRender = getBoardStateToRender(boardState, gameConfig);
  console.log('stateToRender: ', stateToRender);
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
            {Object.keys(stateToRender).map((key: string) => {
              return (
                <div className="board-row" key={key}>
                  {stateToRender[key]?.map((cell: CellState) => {
                    return (
                      <Cell
                        key={cell.id}
                        state={{ ...cell }}
                        onReveal={handleCellReveal}
                        onAdjacentReveal={handleCellAdjacentReveal}
                        onFlag={handleCellFlag}
                        onGameOver={handleGameOver}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </WebApp>
  );
};

export default Index;
