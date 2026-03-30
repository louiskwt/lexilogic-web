import {faCheck, faHeart, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Confetti from "react-confetti-boom";
import GameNav from "../components/GameNav";
import GameOverDisplay from "../components/GameOverDisplay";
import Spinner from "../components/Spinner";
import {useDictatorContext} from "../contexts/DictatorContext";
import {useLanguageContext} from "../contexts/LanguageContext";

const DictatorGame: React.FC = () => {
  const {currentWord, userInput, isCorrect, inputRefsArray, tries, isGameOver, wordHint, isFetchingWord, handleUserInput, setCurrentIndex, playAudio, startGame, checkAns, score} = useDictatorContext();
  const {t} = useLanguageContext();
  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden">
        <GameOverDisplay message={t("dictatorGame.gameOver.message")} title={t("dictatorGame.gameOver.title")} isCorrect={isCorrect} handleNewGame={startGame} answer={currentWord?.word || ""} pos={wordHint.pos} meaning={wordHint.meaning} score={score} />
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

  const pickRandomCorrectMessage = (): string => {
    const number = tries === 1 ? 5 : Math.floor(Math.random() * 4) + 1;
    return `dictatorGame.correct.${number.toString()}`;
  };

  return (
    <div className="h-dvh flex flex-col overflow-hidden shrink-0">
      <GameNav
        wordHint={wordHint}
        name="Dictator"
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
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 overflow-y-auto">
        {/* Correct ans feedback */}
        {isCorrect && (
          <>
            {" "}
            <div className="animate-drop-bounce text-green-400 font-bold text-xl md:text-2xl my-4 text-center">{t(pickRandomCorrectMessage())}</div>
            <Confetti mode="boom" particleCount={120} effectCount={2} effectInterval={2000} colors={["#ff577f", "#ff884b"]} />
          </>
        )}
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">{t("dictator")}</h1>
        {currentWord ? (
          <div className="flex flex-col items-center justify-center w-full max-w-lg">
            <div className="flex items-center gap-1.5 mb-8">
              {Array.from({length: tries}).map((_, index) => (
                <FontAwesomeIcon icon={faHeart} key={index} className={`text-2xl md:text-3xl transition-all duration-300 ${index < tries ? "text-lime-400 drop-shadow-[0_0_6px_rgba(132,204,22,0.5)] scale-100" : "text-zinc-700 scale-90"}`} />
              ))}
              <span className="ml-3 text-zinc-400 text-sm font-medium">{tries}/5</span>
            </div>
            {/* Letter input */}
            <div className="flex justify-center gap-1.5 md:gap-3 mb-8 w-full px-2">
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
                  className={`
                    min-w-0 flex-1 max-w-14 aspect-square
                    text-center text-xl md:text-3xl font-bold
                    rounded-xl
                    border-2 outline-none
                    transition-all duration-200
                    bg-zinc-800/60 backdrop-blur-sm
                    focus:ring-2 focus:ring-lime-500/50 focus:scale-105
                    ${correct ? "border-emerald-500 text-emerald-400 bg-emerald-500/10" : character === "" ? "border-zinc-600 text-white" : tries === 5 ? "border-zinc-600 text-white" : "border-red-500/70 text-red-400 bg-red-500/10 animate-[shake_0.3s_ease-in-out]"}
            `}
                />
              ))}
            </div>
            {/* Button Area */}
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              {!isCorrect && (
                <button
                  onClick={playAudio}
                  className="
                    group w-full
                    bg-gradient-to-r from-lime-600 to-emerald-600
                    hover:from-lime-500 hover:to-emerald-500
                    active:scale-95
                    rounded-2xl border border-lime-500/30
                    text-white font-bold py-4 px-6
                    flex items-center justify-center gap-3
                    transition-all duration-200
                    shadow-lg shadow-lime-600/20
                  ">
                  <FontAwesomeIcon icon={faVolumeUp} className="text-xl group-hover:animate-pulse" />
                  <span className="text-lg">{t("dictatorGame.playAudio.label")}</span>
                </button>
              )}
              {!isCorrect && userInput.every((i) => i.character !== "") && (
                <button
                  onClick={checkAns}
                  className="
                    w-full
                    bg-zinc-700 hover:bg-zinc-600
                    active:scale-95
                    rounded-2xl border border-zinc-600
                    text-white font-bold py-4 px-6
                    flex items-center justify-center gap-3
                    transition-all duration-200
                  ">
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  <span className="text-lg">{t("dictatorGame.checkAnswer.label")}</span>
                </button>
              )}
              {isCorrect && (
                <button
                  onClick={startGame}
                  className="
              w-full
              bg-gradient-to-r from-lime-600 to-emerald-600
              hover:from-lime-500 hover:to-emerald-500
              active:scale-95
              rounded-2xl border border-lime-500/30
              text-white font-bold py-4 px-6
              text-lg
              transition-all duration-200
              shadow-lg shadow-lime-600/20
              animate-pulse
            ">
                  {t("dictatorGame.nextChallenge")} →
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Start screen */
          <div className="flex flex-col items-center gap-6 mt-4">
            <p className="text-zinc-400 text-center text-lg max-w-sm">Listen carefully and spell the word correctly!</p>
            <button
              onClick={startGame}
              className="
              bg-gradient-to-r from-lime-600 to-emerald-600
              hover:from-lime-500 hover:to-emerald-500
              active:scale-95
              rounded-2xl border border-lime-500/30
              text-white font-bold py-4 px-10
              text-xl
              transition-all duration-200
              shadow-lg shadow-lime-600/20
            ">
              {t("dictatorGame.startGame")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DictatorGame;
