import EmptySquare from "../components/EmptySquare";
import GameNav from "../components/GameNav";
import Keyboard from "../components/Keyboard";
import Spinner from "../components/Spinner";
import Square from "../components/Square";
import {usePhraserContext} from "../contexts/PhraserContext";

const Phraser = () => {
  const {rows, handleKeyPress, handleBackspace, handleEnter, misplacedLetters, correctLetters, wrongLetters, wordHint, isFetchingWord} = usePhraserContext();
  return (
    <>
      <GameNav
        wordHint={wordHint}
        rules={{
          title: "Phraserr 玩法",
          message: (
            <>
              <ol className="list-decimal pl-6 text-xl font-semibold mb-4">
                <li>
                  <strong>輸入猜測</strong>：你有六次機會來猜這個單字。一次輸入一個完整的英文單字。
                </li>
                <li>
                  <strong>獲得提示</strong>：每次輸入後，系統會以不同顏色標示每個字母的狀態:
                  <ul className="list-disc pl-6 text-lg mb-2">
                    <li>綠色：字母位置正確。</li>
                    <li>黃色：字母在單字中，但位置不對。</li>
                    <li>灰色：字母不在單字中。</li>
                  </ul>
                </li>
                <li>
                  <strong>修正答案</strong>：根據系統提供的提示，你可以修正你的下一個猜測。
                </li>
                <li>
                  <strong>猜對單字</strong>：如果你在六次機會內猜出正確的單字，你就獲勝了。
                </li>
                <li>
                  <strong>再次遊玩</strong>：當你猜對單字後，你可以點擊「下一個挑戰」開始新的一輪遊戲。
                </li>
              </ol>
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
                {row.map((square, index) => {
                  if (square.character === "-") {
                    return <EmptySquare size={8} />;
                  } else {
                    return <Square key={index} char={square.character} misplaced={square.misplaced} correct={square.correct} />;
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
