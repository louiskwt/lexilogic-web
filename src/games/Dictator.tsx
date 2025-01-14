// DictatorGame.tsx
import {faCheck, faHeart, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GameNav from "../components/GameNav";
import {useDictatorContext} from "../contexts/DictatorContext";

const DictatorGame: React.FC = () => {
  const {currentWord, userInput, isCorrect, inputRefsArray, tries, handleUserInput, setCurrentIndex, playAudio, startGame, checkAns} = useDictatorContext();

  return (
    <>
      <GameNav wordHint={{meaning: "", pos: "Noun", vowels: ["a"]}} />
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
        <h1 className="text-4xl font-bold mb-8">Dictator</h1>
        {currentWord ? (
          <div className="flex flex-col items-center justify-center">
            <div className="border-b-2 flex justify-items-center space-x-2">
              {Array.from({length: tries}).map((_, index) => (
                <FontAwesomeIcon icon={faHeart} key={index} size="lg" color="lime" />
              ))}
            </div>
            <div className="text-4xl font-bold mb-4 flex justify-center mt-6">
              {userInput.map(({character, correct}, index) => (
                <input
                  key={index}
                  ref={inputRefsArray[index]}
                  type="text"
                  value={character}
                  maxLength={1}
                  onClick={() => setCurrentIndex(index)}
                  onChange={(e) => {
                    handleUserInput(e, index);
                  }}
                  className={`bg-transparent border-b-2 mr-2 md:mr-5 border-gray-400 focus:border-lime-600 focus:outline-none w-8 md:w-12 md:h-12 text-center text-4xl ${correct ? "text-green-500" : tries === 5 || character === "" ? "text-white" : "text-red-500"}`}
                />
              ))}
            </div>
            {!isCorrect && (
              <button onClick={playAudio} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 flex items-center mt-8">
                <FontAwesomeIcon icon={faVolumeUp} className="mr-2" />
                Play Audio
              </button>
            )}

            {!isCorrect && userInput.every((i) => i.character !== "") && (
              <button onClick={checkAns} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 flex items-center mt-8">
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                Check Answer
              </button>
            )}

            {isCorrect && (
              <>
                {" "}
                <div className="text-green-500 font-bold mt-4">Correct!</div>{" "}
                <button onClick={startGame} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4">
                  Next Challenge
                </button>
              </>
            )}
          </div>
        ) : (
          <button onClick={startGame} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4">
            Start Game
          </button>
        )}
      </div>
    </>
  );
};

export default DictatorGame;
