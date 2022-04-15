import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import GamePage from './components/GamePage/GamePage';
import Modal from './components/Modal/Modal';
import Navbar from './components/Navbar/Navbar';
import { GameProvider } from './context/GameContext';


function App() {
  return (
    <GameProvider>
      <div id='game'>
          <Navbar />
          <GameBoard />
          <Modal />
          <GamePage />
      </div>
    </GameProvider>
  );
}

export default App;
