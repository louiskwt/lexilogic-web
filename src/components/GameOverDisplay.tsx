interface IGameOverDisplayProps {
  title: string;
  message: string;
  handleNewGame: () => void;
}

const GameOverDisplay = ({handleNewGame, title, message}: IGameOverDisplayProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{message}</p>
      <button className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded" onClick={handleNewGame}>
        Start New Game
      </button>
    </>
  );
};

export default GameOverDisplay;
