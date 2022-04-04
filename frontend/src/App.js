import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import Navbar from './components/Navbar/Navbar';
import { GameProvider } from './context/GameContext';


function App() {
  return (
    <div id='game'>
      <GameProvider>
          <Navbar />
          <GameBoard />
      </GameProvider>
    </div>
  );
}

export default App;
