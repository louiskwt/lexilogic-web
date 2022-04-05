import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import Navbar from './components/Navbar/Navbar';
import { GameProvider } from './context/GameContext';


function App() {
  return (
    <GameProvider>
      <div id='game'>
          <Navbar />
          <GameBoard />
      </div>
    </GameProvider>
  );
}

export default App;
