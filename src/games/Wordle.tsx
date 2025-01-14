import GameNav from "../components/GameNav";
import Keyboard from "../components/Keyboard";
import Spinner from "../components/Spinner";
import Square from "../components/Square";
import {useWordleContext} from "../contexts/WordleContext";

const Wordle = () => {
  const {rows, handleKeyPress, handleBackspace, handleEnter, misplacedLetters, correctLetters, wrongLetters, wordHint, isFetchingWord} = useWordleContext();
  return (
    <>
      <GameNav
        wordHint={wordHint}
        rules={{
          title: "Wordle 玩法",
          message: (
            <>
              {" "}
              你要喺六次機會之內猜出隱藏嘅英文字。
              <br /> <br />
              每次輸入一個字後,系統會顯示唔同嘅顏色提示你點樣修正。綠色代表字母位置正確,黃色代表字母無錯但位置唔對,灰色就代表呢個字母完全唔係隱藏字。加油!
            </>
          ),
          description: "快啲同朋友一齊玩啦!考考你嘅英文水平。既好玩又可以提升你嘅英文能力,仲唔快啲嚟試吓?",
        }}
      />
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
