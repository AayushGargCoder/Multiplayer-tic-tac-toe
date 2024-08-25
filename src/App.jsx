import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import GameOptions from "./GameOptions";
import Game from "./Game";
import { GameProvider } from "./Context/gameContext";

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/options" element={<GameOptions />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
