import GameNav from "../components/GameNav";
import Keyboard from "../components/Keyboard";
import Spinner from "../components/Spinner";
import Square from "../components/Square";
import {useWordleContext} from "../contexts/WordleContext";

const Wordle = () => {
  const {rows, handleKeyPress, handleBackspace, handleEnter, misplacedLetters, correctLetters, wrongLetters, wordHint, isFetchingWord} = useWordleContext();
  return (
    <>
      <GameNav wordHint={wordHint} />
      {isFetchingWord ? (
        <Spinner size="lg" />
      ) : (
        <>
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 mt-12">
            {rows.map((row, index) => (
              <div key={index} className="flex space-x-2">
                {row.map((square, index) => (
                  <Square key={index} char={square.character} misplaced={square.misplaced} correct={square.correct} />
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
