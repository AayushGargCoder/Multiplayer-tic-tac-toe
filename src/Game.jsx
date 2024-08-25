import { useEffect } from "react";
import { useGameContext } from "./Context/gameContext";

const Game = () => {
  const {
    state: { board, boardSize, winner, currentPlayer, playMode },
    findBestMove,
    checkWinner,
    dispatch,
  } = useGameContext();

  useEffect(() => {
    if (!winner) {
      const win = checkWinner?.();
      if (win) {
        dispatch?.({ type: "setWinner", payload: win });
        return;
      }
    }
    // If it's the AI's turn, find the best move
    if (playMode === "ai" && currentPlayer === "O" && !winner) {
      findBestMove?.();
    }
  }, [currentPlayer, playMode]);

  const handleClick = (rowIndex, colIndex) => {
    // Prevent updating the cell if there is already a mark or if the game is won
    if (board[rowIndex][colIndex] || winner) return;

    dispatch({
      type: "makeMove",
      payload: { rowIndex, colIndex },
    });
  };

  const getGridCols = (size) => {
    switch (size) {
      case 3:
        return "grid-cols-3";
      case 7:
        return "grid-cols-7";
      case 5:
        return "grid-cols-5";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-200">
      <h1 className="text-3xl font-bold mb-8">Tic Tac Toe</h1>

      {winner && <div className="mt-4 text-xl font-bold">{winner} Wins!</div>}

      <div className={`grid ${getGridCols(boardSize)} gap-1`}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              className={`w-16 h-16 flex items-center justify-center border border-gray-400 cursor-pointer text-2xl
                ${cell === "X" ? "text-blue-500" : "text-red-500"}
              `}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Game;
