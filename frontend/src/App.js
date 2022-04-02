import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div id='game'>
      <Navbar />
      <GameBoard />
    </div>
  );
}

export default App;
