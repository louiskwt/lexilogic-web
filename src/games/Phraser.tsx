import EmptySquare from "../components/EmptySquare";
import GameNav from "../components/GameNav";
import Keyboard from "../components/Keyboard";
import ResponsiveSquare from "../components/ResponsiveSquare";
import Spinner from "../components/Spinner";
import {useLanguageContext} from "../contexts/LanguageContext";
import {usePhraserContext} from "../contexts/PhraserContext";

const Phraser = () => {
  const {rows, handleKeyPress, handleBackspace, handleEnter, misplacedLetters, correctLetters, wrongLetters, wordHint, isFetchingWord} = usePhraserContext();
  const {t} = useLanguageContext();
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <GameNav
        wordHint={wordHint}
        name="Phraser"
        rules={{
          title: t("phrasePuzzle.rules.title"),
          message: (
            <>
              <ol className="list-decimal pl-6 space-y-2 font-semibold mb-4">
                <li>{t("phrasePuzzle.rules.message1")}</li>
                <li>
                  {t("phrasePuzzle.rules.message2")}
                  <ul className="list-disc pl-6 text-lg space-y-2 my-2">
                    <li className="text-green-300">{t("phrasePuzzle.rules.message3")}</li>
                    <li className="text-yellow-300">{t("phrasePuzzle.rules.message4")}</li>
                    <li className="text-gray-300">{t("phrasePuzzle.rules.message5")}</li>
                  </ul>
                </li>
                <li>{t("phrasePuzzle.rules.message6")}</li>
                <li>{t("phrasePuzzle.rules.message7")}</li>
              </ol>
            </>
          ),
          description: t("phrasePuzzle.rules.description"),
        }}
      />
      {isFetchingWord ? (
        <div className="flex-1 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {/* Grid Area */}
          <div className="flex-1 flex flex-col items-center justify-center gap-[6px] sm:gap-2 px-2 py-3 min-h-0">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-[5px] sm:gap-2">
                {row.map((square, index) => {
                  if (square.character === "-") {
                    return <EmptySquare key={index} size={4} />;
                  }
                  return <ResponsiveSquare key={index} size={8} char={square.character} misplaced={square.misplaced} correct={square.correct} />;
                })}
              </div>
            ))}
          </div>
          <Keyboard handleKeyPress={handleKeyPress} handleEnter={handleEnter} handleBackSpace={handleBackspace} correctLetters={correctLetters} misplacedLetters={misplacedLetters} wrongLetters={wrongLetters} />
        </>
      )}
    </div>
  );
};

export default Phraser;
