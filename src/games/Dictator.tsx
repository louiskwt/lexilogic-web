// DictatorGame.tsx
import {faCheck, faHeart, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GameNav from "../components/GameNav";
import GameOverDisplay from "../components/GameOverDisplay";
import Spinner from "../components/Spinner";
import {useDictatorContext} from "../contexts/DictatorContext";
import {useLanguageContext} from "../contexts/LanguageContext";

const DictatorGame: React.FC = () => {
  const {currentWord, userInput, isCorrect, inputRefsArray, tries, isGameOver, wordHint, isFetchingWord, handleUserInput, setCurrentIndex, playAudio, startGame, checkAns} = useDictatorContext();
  const {t} = useLanguageContext();
  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden">
        <GameOverDisplay message={t("dictatorGame.gameOver.message")} title={t("dictatorGame.gameOver.title")} handleNewGame={startGame} answer={currentWord?.word || ""} pos={wordHint.pos} meaning={wordHint.meaning} />
      </div>
    );
  }

  if (isFetchingWord) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <GameNav
        wordHint={wordHint}
        rules={{
          title: t("dictatorGame.rules.title"),
          description: t("dictatorGame.rules.description"),
          message: (
            <>
              <ol className="list-decimal pl-6 space-y-2 font-semibold mb-4">
                <li>{t("dictatorGame.rules.message1")}</li>
                <li>{t("dictatorGame.rules.message2")}</li>
                <li>{t("dictatorGame.rules.message3")}</li>
                <li>{t("dictatorGame.rules.message4")}</li>
                <ul className="list-disc pl-6 text-lg mb-2">
                  <li className="text-green-300">{t("dictatorGame.rules.message5")}</li>
                  <li className="text-red-300">{t("dictatorGame.rules.message6")}</li>
                </ul>
                <li>{t("dictatorGame.rules.message7")}</li>
              </ol>
            </>
          ),
        }}
      />
      <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden">
        {isCorrect && (
          <>
            {" "}
            <div className="animate-drop-bounce text-green-500 font-bold text-4xl my-6 text-center">{t("dictatorGame.correct")}</div>{" "}
          </>
        )}
        <h1 className="text-4xl font-bold mb-8">{t("dictator")}</h1>
        {currentWord ? (
          <div className="flex flex-col items-center justify-center">
            <div className="border-b-2 flex justify-items-center space-x-2">
              {Array.from({length: tries}).map((_, index) => (
                <FontAwesomeIcon icon={faHeart} key={index} size="2x" color="lime" />
              ))}
            </div>
            <div className="text-4xl font-bold mb-4 flex justify-center mt-6 space-x-3">
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
                  className={`bg-transparent border-b-2 border-gray-400 outline-none focus:border-lime-600 focus:outline-none w-8 md:w-12 md:h-12 text-center text-4xl ${correct ? "text-green-500" : tries === 5 || character === "" ? "text-white" : "text-red-500"}`}
                />
              ))}
            </div>
            {!isCorrect && (
              <button onClick={playAudio} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 flex items-center mt-8">
                <FontAwesomeIcon icon={faVolumeUp} className="mr-2" />
                {t("dictatorGame.playAudio.label")}
              </button>
            )}

            {!isCorrect && userInput.every((i) => i.character !== "") && (
              <button onClick={checkAns} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 flex items-center mt-8">
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                {t("dictatorGame.checkAnswer.label")}
              </button>
            )}

            {isCorrect && (
              <div className="mt-6">
                {" "}
                <button onClick={startGame} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4">
                  {t(`dictatorGame.nextChallenge`)}
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={startGame} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4">
            {t("dictatorGame.startGame")}
          </button>
        )}
      </div>
    </>
  );
};

export default DictatorGame;
