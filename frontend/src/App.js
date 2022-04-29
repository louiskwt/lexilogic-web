import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import GamePage from './components/GamePage/GamePage';
import Modal from './components/Modal/Modal';
import Navbar from './components/Navbar/Navbar';
import { PopUpProvider } from './context/PopUpContext';
import { WordProvider } from './context/WordContext';


function App() {
  return (
    <WordProvider>
          <PopUpProvider>
            <Navbar />
            <GamePage />
          </PopUpProvider>
          {/* <GameBoard />
          <Modal /> */}
          
    </WordProvider>
  );
}

export default App;
