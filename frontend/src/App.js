import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import GamePage from './components/GamePage/GamePage';
import Modal from './components/Modal/Modal';
// import Modal from './components/Modal/Modal';
import Navbar from './components/Navbar/Navbar';
import { GameProvider } from './context/GameContext';
import { KeyProvider } from './context/KeyContext';
import { PopUpProvider } from './context/PopUpContext';
import { WordProvider } from './context/WordContext';


function App() {
  return (
    <WordProvider>
          <PopUpProvider>
            <Navbar />
            <GamePage />
            <GameProvider>
                <KeyProvider>
                  <GameBoard />
                </KeyProvider>
                <Modal />
            </GameProvider>
          </PopUpProvider>
    </WordProvider>
  );
}

export default App;
