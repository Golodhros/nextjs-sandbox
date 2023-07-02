import { useEffect, useState } from 'react';

import { AstonishedSmiley } from '@/components/AstonishedSmiley';
import { DigitalCounter } from '@/components/DigitalCounter';
import { Flag } from '@/components/Flag';
import { GameConfigForm } from '@/components/GameConfigForm';
import { KOSmiley } from '@/components/KOSmiley';
import { Modal } from '@/components/Modal';
import { Smiley } from '@/components/Smiley';
import { StartStruckSmiley } from '@/components/StartStruckSmiley';
import { Timer } from '@/components/Timer';
import { Meta } from '@/layouts/Meta';
import { WebApp } from '@/templates/WebApp';

import { FLAG_SIZE, LEVEL_TO_GAME_CONFIG } from '../constants';
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

function getAdjancentIds(row: number, column: number): string[] {
  return [
    `r${row - 1}-c${column - 1}`,
    `r${row - 1}-c${column}`,
    `r${row - 1}-c${column + 1}`,
    `r${row}-c${column - 1}`,
    `r${row}-c${column + 1}`,
    `r${row + 1}-c${column - 1}`,
    `r${row + 1}-c${column}`,
    `r${row + 1}-c${column + 1}`,
  ];
}

function getBoardStateToRender(
  boardState: CellState[],
  gameConfig: GameConfig
) {
  const result: Record<string, CellState[]> = {};

  for (let i = 0; i < boardState.length; i += gameConfig.width) {
    result[`row-${i}`] = boardState.slice(i, i + gameConfig.width);
  }

  return result;
}

function checkVictory(boardState: CellState[], gameConfig: GameConfig) {
  const numOfRevealedCells = boardState.filter(
    (cell) => cell.isRevealed
  ).length;
  const numOfCells = boardState.length;
  const numOfMines = gameConfig.mines;

  return numOfRevealedCells === numOfCells - numOfMines;
}

function generateBoardGame(gameConfig: GameConfig): CellState[] {
  const { width, height, mines } = gameConfig;
  const numOfCells = width * height;

  // Generate mines by randomly selecting cells by index
  const mineIdx = new Set<number>();
  while (mineIdx.size < mines) {
    mineIdx.add(Math.floor(Math.random() * numOfCells));
  }

  // Generate initial board state with mines state
  const boardState: CellState[] = [];
  for (let i = 0; i < numOfCells; i += 1) {
    const currentRow = Math.floor(i / width);
    const currentColumn = i % width;
    const isMine = mineIdx.has(i);
    const id = `r${currentRow}-c${currentColumn}`;

    boardState.push({
      id,
      isMine,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    });
  }

  // Generate adjacent mines count
  for (let i = 0; i < numOfCells; i += 1) {
    const currentCell = boardState[i];
    const currentRow = Math.floor(i / width);
    const currentColumn = i % width;
    const adjacentCellIds = getAdjancentIds(currentRow, currentColumn);
    const adjacentMinesCount = adjacentCellIds.filter((cellId) => {
      const cell = boardState.find((c) => c.id === cellId);

      return cell?.isMine;
    }).length;

    if (currentCell) {
      currentCell.adjacentMines = adjacentMinesCount;
    }
  }

  console.log('generateBoardGame: ', boardState);

  return boardState;
}

type CellProps = {
  onButtonDown: () => void;
  onReveal: (id: string) => void;
  onFlag: (id: string) => void;
  onGameOver: () => void;
  onAdjacentReveal: (id: string) => void;
  state: CellState;
};

// TRY: React.memo
// TRY: useCallback
// TRY: useMemo
// TRY: useReducer
// TRY: useImperativeHandle
// TRY: useLayoutEffect
// TRY: only necessary props
function Cell({
  onButtonDown,
  onReveal,
  onFlag,
  onGameOver,
  onAdjacentReveal,
  state,
}: CellProps) {
  const { isRevealed, isFlagged, id, isMine, adjacentMines } = state;

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.button === 0) {
      onButtonDown();
    }
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.button === 0) {
      onReveal(id);

      // TODO: Combine onReveal and onAdjacentReveal
      if (isMine) {
        onGameOver();
      } else if (!isMine && adjacentMines === 0) {
        onAdjacentReveal(id);
      }
    }
  };
  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onFlag(id);
  };

  return (
    <span className="cell-wrapper">
      {!isRevealed && (
        <button
          type="button"
          className="cell-btn"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onContextMenu={handleRightClick}
        >
          {isFlagged && <Flag width={FLAG_SIZE} height={FLAG_SIZE} />}
          <span>Cell</span>
        </button>
      )}
      {/* TODO: get bomb SVG */}
      {isRevealed && isMine && <span className="cell-mine">M</span>}
      {isRevealed && !isMine && (
        <span className={getCellClassFor(adjacentMines)}>{adjacentMines}</span>
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

const Index = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isTimerReset, setIsTimerReset] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [gameConfig, setGameConfig] = useState<GameConfig>(
    LEVEL_TO_GAME_CONFIG.beginner
  );
  const [boardState, setBoardState] = useState<CellState[]>([]);
  const [numOfMines, setNumOfMines] = useState(gameConfig.mines);

  // After every change in the board state, check if the game is won
  useEffect(() => {
    setIsWon(checkVictory(boardState, gameConfig));
  }, [boardState]);

  // Initial board state creation when loading the page
  useEffect(() => {
    setBoardState(generateBoardGame(gameConfig));
  }, []);

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
    setIsWon(false);
    setIsPressed(false);
    setIsTimerReset(true);
    setNumOfMines(gameConfig.mines);
    setBoardState(generateBoardGame(gameConfig));
  };
  const handleGameOver = () => {
    setIsOver(true);
    setIsStarted(false);
  };
  const handleNewGame = (newGameConfig: GameConfig) => {
    setIsOver(false);
    setIsWon(false);
    setIsStarted(false);
    setIsTimerReset(true);
    setIsGameControlModalOpen(false);
    setGameConfig(newGameConfig);
    console.log('New game', newGameConfig);
    setBoardState(generateBoardGame(newGameConfig));
  };

  const handleCellReveal = (cellId: string) => {
    if (!isOver) {
      setIsPressed(false);
      if (!isStarted) {
        setIsStarted(true);
        setIsTimerReset(false);
      }
      const updatedBoardState = boardState.map((cell) => {
        if (cell.id === cellId) {
          return {
            ...cell,
            isRevealed: true,
          };
        }
        return cell;
      });
      setBoardState(updatedBoardState);
    }
  };
  const handleCellDown = () => {
    setIsPressed(true);
  };
  const handleCellFlag = (cellId: string) => {
    setNumOfMines(numOfMines - 1);
    const updatedBoardState = boardState.map((cell) => {
      if (cell.id === cellId) {
        return {
          ...cell,
          isFlagged: true,
        };
      }
      return cell;
    });
    setBoardState(updatedBoardState);
  };

  // TODO: Improve the releal logic so it matches closely the original game
  // Right now, it stops at the adjacent of the clicked cells, without revealing the adjacent of the adjacent
  const handleCellAdjacentReveal = (id: string) => {
    if (!isOver) {
      const currentRow = Number(id.split('-')[0]?.slice(1));
      const currentColumn = Number(id.split('-')[1]?.slice(1));
      const adjacentCellIds = getAdjancentIds(currentRow, currentColumn);

      // Iterate through adjacent cells and reveal them if they are not mines
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
  if (isWon) {
    CurrentSmiley = StartStruckSmiley;
    console.log('You won!');
  }
  const isTimerOn = !isOver && isStarted && !isWon;

  const stateToRender = getBoardStateToRender(boardState, gameConfig);
  // console.log('stateToRender: ', stateToRender);

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
              <Timer isOn={isTimerOn} isReset={isTimerReset} />
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
                        state={cell}
                        onButtonDown={handleCellDown}
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
            {/* {Array.from({ length: gameConfig.height }, (_, i) => {
              return (
                <div className="board-row" key={i}>
                  {boardState
                    .slice(i * gameConfig.width, (i + 1) * gameConfig.width)
                    .map((cell) => (
                      <Cell
                        key={cell.id}
                        state={{ ...cell }}
                        onReveal={handleCellReveal}
                        onAdjacentReveal={handleCellAdjacentReveal}
                        onFlag={handleCellFlag}
                        onButtonDown={handleCellDown}
                        onGameOver={handleGameOver}
                      />
                    ))}
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </WebApp>
  );
};

export default Index;
