import { createContext, useReducer, useContext } from "react";
let score = {
  X: 0,
  O: 1,
};
const GameContext = createContext();
const initialState = {
  boardSize: 3,
  playMode: "",
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  currentPlayer: "X",
  winner: "",
};

function gameReducer(state, action) {
  switch (action.type) {
    case "setBoard":
      return {
        ...state,
        boardSize: action.payload.boardSize,
        playMode: action.payload.playMode,
        board: Array.from({ length: action.payload.boardSize }, () =>
          Array(action.payload.boardSize).fill("")
        ),
        winner: "",
        currentPlayer: "X",
      };
    case "makeMove":
      state.board[action.payload.rowIndex][action.payload.colIndex] =
        state.currentPlayer === "X" ? "X" : "O";
      return {
        ...state,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        board: JSON.parse(JSON.stringify(state.board)),
      };
    case "setWinner":
      return { ...state, winner: action.payload };
    default:
      return state;
  }
}
/* eslint-disable */
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  function checkWinner(deepCopyBoard) {
    const board = deepCopyBoard || state.board;
    const boardSize = board.length;

    // Check rows
    for (let i = 0; i < boardSize; i++) {
      if (board[i][0] && board[i].every((cell) => cell === board[i][0])) {
        return board[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < boardSize; i++) {
      let columnMatch = true;
      for (let j = 0; j < boardSize; j++) {
        if (board[0][i] !== board[j][i]) {
          columnMatch = false;
          break;
        }
      }
      if (columnMatch && board[0][i]) {
        return board[0][i];
      }
    }

    // Check main diagonal
    if (
      board[0][0] &&
      board.every((row, index) => row[index] === board[0][0])
    ) {
      return board[0][0];
    }

    // Check anti-diagonal
    if (
      board[0][boardSize - 1] &&
      board.every(
        (row, index) => row[boardSize - 1 - index] === board[0][boardSize - 1]
      )
    ) {
      return board[0][boardSize - 1];
    }

    return null;
  }

  function miniMax(deepBoard, isMaximizing) {
    let result = checkWinner(deepBoard);
    if (result !== null) {
      return score[result];
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < deepBoard.length; i++) {
        for (let j = 0; j < deepBoard.length; j++) {
          if (deepBoard[i][j] === "") {
            deepBoard[i][j] = "O";
            let score = miniMax(deepBoard, false);
            deepBoard[i][j] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < deepBoard.length; i++) {
        for (let j = 0; j < deepBoard.length; j++) {
          if (deepBoard[i][j] === "") {
            deepBoard[i][j] = "X";
            let score = miniMax(deepBoard, true);
            deepBoard[i][j] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  function findBestMove() {
    const { board, boardSize } = state;
    const deepCopyBoard = JSON.parse(JSON.stringify(board));
    let bestScore = -Infinity,
      bestMove;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (deepCopyBoard[i][j] === "") {
          deepCopyBoard[i][j] = "O";
          console.log(i, j, board, deepCopyBoard);
          let score = miniMax(deepCopyBoard, 0, false);
          deepCopyBoard[i][j] = "";
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
          }
        }
      }
    }
    dispatch({
      type: "makeMove",
      payload: { rowIndex: bestMove.i, colIndex: bestMove.j },
    });
  }

  return (
    <GameContext.Provider
      value={{ state, dispatch, findBestMove, checkWinner }}
    >
      {children}
    </GameContext.Provider>
  );
};
export function useGameContext() {
  const value = useContext(GameContext);
  if (!value) return new Error("Use Context Out of Boundary");
  return value;
}
