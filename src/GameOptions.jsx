import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiFastForwardBold } from "react-icons/pi";
import { useGameContext } from "./Context/gameContext";
const GameOptions = () => {
  const [playMode, setPlayMode] = useState("ai"); // Default mode
  const [gridSize, setGridSize] = useState(3); // Default grid size
  const { dispatch } = useGameContext();
  const navigate = useNavigate();

  const startGame = () => {
    dispatch({
      type: "setBoard",
      payload: { boardSize: gridSize, playMode },
    });
    navigate("/game");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Game Options</h1>

      <div className="mb-8">
        <label className="mr-2">Grid Size:</label>
        <select
          value={gridSize}
          onChange={(e) => setGridSize(parseInt(e.target.value))}
          className="p-2 border rounded"
        >
          <option value={3}>3x3</option>
          <option value={5}>5x5</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Play Mode:</label>
        <div>
          <button
            className="px-6 py-3 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setPlayMode("ai")}
          >
            CPU
          </button>
          <button
            className="px-6 py-3 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setPlayMode("friend")}
          >
            2 Players
          </button>
        </div>
      </div>

      <button
        onClick={startGame}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <PiFastForwardBold />
      </button>
    </div>
  );
};

export default GameOptions;
