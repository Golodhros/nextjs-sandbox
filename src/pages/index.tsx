import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

import { useState, useEffect } from "react";

const emptyCellState: "p1" | "p2" | "" = "";

const initialBoardState = [
  [emptyCellState, emptyCellState, emptyCellState],
  [emptyCellState, emptyCellState, emptyCellState],
  [emptyCellState, emptyCellState, emptyCellState],
];

const playerToMarker = {
  p1: "X",
  p2: "O",
  "": "",
};

const computeWinner = (boardState) => {
  let winnerPlayer = "";

  // Horizontal
  for (let i = 0; i < 3; i++) {
    const p1Winner = boardState[i].every((mark) => mark === "p1");
    const p2Winner = boardState[i].every((mark) => mark === "p2");

    if (p1Winner || p2Winner) {
      winnerPlayer = p1Winner ? "p1" : "p2";

      return;
    }
  }

  for (let j = 0; j < 3; j++) {
    const column = boardState.map((row) => row[j]);
    const p1Winner = column.every((mark) => mark === "p1");
    const p2Winner = column.every((mark) => mark === "p2");

    if (p1Winner || p2Winner) {
      winnerPlayer = p1Winner ? "p1" : "p2";
      return;
    }
  }

  const diagonalDown = [boardState[0][0], boardState[1][1], boardState[2][2]];
  const diagonalUp = [boardState[2][0], boardState[1][1], boardState[0][2]];
  const p1Winner =
    diagonalDown.every((mark) => mark === "p1") ||
    diagonalUp.every((mark) => mark === "p1");
  const p2Winner =
    diagonalDown.every((mark) => mark === "p2") ||
    diagonalUp.every((mark) => mark === "p2");

  if (p1Winner || p2Winner) {
    winnerPlayer = p1Winner ? "p1" : "p2";
  }

  return winnerPlayer;
};

const isThereGame = (boardState) => {
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      if (boardState[row][column] === "") {
        return false;
      }
    }
  }

  return true;
};

const Index = () => {
  const [boardState, setBoardState] = useState(initialBoardState);
  // TODO: randomize
  const [nextPlayer, setNextPlayer] = useState("p1");
  const [isFinished, setIsFinished] = useState(false);
  const [winner, setWinner] = useState("");
  // const [gameMessage, setGameMessage] = useState();

  useEffect(() => {
    console.log("we have a winner!", winner);
  }, [winner]);

  useEffect(() => {
    console.log("Game is finished!");
  }, [isFinished]);

  const handleCellClick = (rowIdx, columnIdx, currentPlayer) => {
    if (winner !== "") {
      return;
    }
    // Update the board state
    const newBoardState = [
      [...boardState[0]],
      [...boardState[1]],
      [...boardState[2]],
    ];
    newBoardState[rowIdx][columnIdx] = currentPlayer;
    setBoardState(newBoardState);

    console.log("newBoardState", newBoardState);

    // Check for victory
    setWinner(computeWinner(newBoardState));

    // Check for game end
    setIsFinished(isThereGame(newBoardState));

    // Update the next player
    setNextPlayer(currentPlayer === "p1" ? "p2" : "p1");
  };

  return (
    <Main
      meta={
        <Meta
          title="Next.js Sandbox"
          description="Next.js Sandbox page description"
        />
      }
    >
      <div className="board">
        <table>
          <tbody>
            {boardState.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((cell, columnIdx) => {
                    return (
                      <td key={columnIdx}>
                        {cell ? (
                          playerToMarker[cell]
                        ) : (
                          <button
                            className="cell-button"
                            type="button"
                            onClick={() => {
                              handleCellClick(rowIdx, columnIdx, nextPlayer);
                            }}
                          ></button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Main>
  );
};

export default Index;
