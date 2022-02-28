import { createContext } from 'react';
import './App.css';
import Game from './components/game/Game';

export const GameContext = createContext()
const gameContext = {
  ctx: null
}

function App() {
  return (
    <div className="App">
      <h1>Crypto Miners</h1>
      <GameContext.Provider value={gameContext}>
        <Game />
      </GameContext.Provider>
    </div>
  );
}

export default App;
