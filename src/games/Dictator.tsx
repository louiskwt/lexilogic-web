import {faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDictatorContext} from "../contexts/DictatorContext";

const DictatorGame: React.FC = () => {
  const {currentWord, userInput, isCorrect, handleUserInput, handleDelete, playAudio, startGame} = useDictatorContext();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Dictator</h1>
      {currentWord ? (
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold mb-4">
            {currentWord.word.split("").map((_, index) => (
              <input key={index} type="text" value={userInput[index] || ""} onChange={(e) => handleUserInput(e, index)} onKeyDown={(e) => handleDelete(e, index)} className={`bg-transparent border-b-2 mr-5 border-gray-400 focus:border-lime-600 focus:outline-none w-16 h-16 text-center text-4xl ${userInput[index] === currentWord.word[index].toLowerCase() ? "text-green-500" : "text-white"}`} />
            ))}
          </div>
          <button onClick={playAudio} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 flex items-center">
            <FontAwesomeIcon icon={faVolumeUp} className="mr-2" />
            Play Audio
          </button>
          {isCorrect && <div className="text-green-500 font-bold mt-4">Correct!</div>}
        </div>
      ) : (
        <button onClick={startGame} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4">
          Start Game
        </button>
      )}
    </div>
  );
};

export default DictatorGame;
