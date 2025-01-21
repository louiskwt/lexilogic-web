import EmptySquare from "../components/EmptySquare";
import GameNav from "../components/GameNav";
import Keyboard from "../components/Keyboard";
import Spinner from "../components/Spinner";
import Square from "../components/Square";
import {useLanguageContext} from "../contexts/LanguageContext";
import {usePhraserContext} from "../contexts/PhraserContext";

const Phraser = () => {
  const {rows, handleKeyPress, handleBackspace, handleEnter, misplacedLetters, correctLetters, wrongLetters, wordHint, isFetchingWord} = usePhraserContext();
  const {t} = useLanguageContext();
  return (
    <>
      <GameNav
        wordHint={wordHint}
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
        <Spinner size="lg" />
      ) : (
        <>
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 mt-12">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex space-x-2">
                {row.map((square, index) => {
                  if (square.character === "-") {
                    return <EmptySquare key={index} size={6} />;
                  } else {
                    return <Square key={index} size={8} char={square.character} misplaced={square.misplaced} correct={square.correct} />;
                  }
                })}
              </div>
            ))}
          </div>
          <Keyboard handleKeyPress={handleKeyPress} handleEnter={handleEnter} handleBackSpace={handleBackspace} correctLetters={correctLetters} misplacedLetters={misplacedLetters} wrongLetters={wrongLetters} />
        </>
      )}
    </>
  );
};

export default Phraser;
