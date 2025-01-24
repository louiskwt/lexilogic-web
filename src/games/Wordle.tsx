import GameNav from "../components/GameNav";
import Keyboard from "../components/Keyboard";
import Spinner from "../components/Spinner";
import Square from "../components/Square";
import {useLanguageContext} from "../contexts/LanguageContext";
import {useWordleContext} from "../contexts/WordleContext";

const Wordle = () => {
  const {t} = useLanguageContext();
  const {rows, handleKeyPress, handleBackspace, handleEnter, misplacedLetters, correctLetters, wrongLetters, wordHint, isFetchingWord} = useWordleContext();
  return (
    <>
      <GameNav
        wordHint={wordHint}
        rules={{
          title: t("wordWonder.rules.title"),
          message: (
            <>
              <ol className="list-decimal pl-6 space-y-2 font-semibold mb-4">
                <li>{t("phrasePuzzle.rules.message1")}</li>
                <li>
                  {t("wordWonder.rules.message2")}
                  <ul className="list-disc pl-6 space-y-2 my-2">
                    <li className="text-green-300">{t("wordWonder.rules.message3")}</li>
                    <li className="text-yellow-300">{t("wordWonder.rules.message4")}</li>
                    <li className="text-gray-300">{t("wordWonder.rules.message5")}</li>
                  </ul>
                </li>
                <li>{t("wordWonder.rules.message6")}</li>
                <li>{t("wordWonder.rules.message7")}</li>
              </ol>
            </>
          ),
          description: t("wordWonder.rules.description"),
        }}
      />
      {isFetchingWord ? (
        <Spinner size="lg" />
      ) : (
        <>
          <div className="flex-1 flex flex-col items-center justify-center space-y-2 md:space-y-6 mt-4">
            {rows.map((row, index: number) => (
              <div key={index} className="flex space-x-2">
                {row.map((square, index) => (
                  <Square key={index} char={square.character} misplaced={square.misplaced} correct={square.correct} size={8} />
                ))}
              </div>
            ))}
          </div>
          <Keyboard handleKeyPress={handleKeyPress} handleEnter={handleEnter} handleBackSpace={handleBackspace} correctLetters={correctLetters} misplacedLetters={misplacedLetters} wrongLetters={wrongLetters} />
        </>
      )}
    </>
  );
};

export default Wordle;
