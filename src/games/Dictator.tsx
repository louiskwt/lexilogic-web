// DictatorGame.tsx
import {faCheck, faHeart, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GameNav from "../components/GameNav";
import GameOverDisplay from "../components/GameOverDisplay";
import Spinner from "../components/Spinner";
import {useDictatorContext} from "../contexts/DictatorContext";

const DictatorGame: React.FC = () => {
  const {currentWord, userInput, isCorrect, inputRefsArray, tries, isGameOver, wordHint, isFetchingWord, handleUserInput, setCurrentIndex, playAudio, startGame, checkAns} = useDictatorContext();

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden">
        <GameOverDisplay message="Try again" title="Oh No" handleNewGame={startGame} />
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
          title: "Dictator 遊戲玩法",
          description: "Dictator 遊戲是一個有趣且充滿挑戰的方式,可以測試和提升你的英文拼寫技能。快邀請你的朋友一起玩,看看誰能成為終極「Dictator」!",
          message: (
            <>
              <ol className="list-decimal pl-6 text-xl font-semibold mb-4">
                <li>按 Start Game 展開遊戲</li>
                <li>
                  <strong>聆聽單字發音</strong>:遊戲開始時,你可以點擊「播放音訊」按鈕來聽隱藏單字的發音。
                </li>
                <li>
                  <strong>猜測單字</strong>:你有 5 次機會來猜這個單字。一次輸入一個字母到提供的輸入欄位中。
                </li>
                <li>
                  <strong>獲得視覺提示</strong>:每次猜測後,字母會以不同顏色高亮顯示,以指示它們的狀態:
                  <ul className="list-disc pl-6 text-lg mb-2">
                    <li>綠色:字母位置正確。</li>
                    <li>紅色:字母位置不正確</li>
                  </ul>
                </li>
                <li>
                  <strong>檢查你的答案</strong>:一旦你填完整個單字,點擊「檢查答案」按鈕來查看是否猜對。
                </li>
                <li>
                  <strong>繼續嘗試</strong>:如果你的猜測不正確,你將失去一顆心。繼續嘗試,直到你猜對單字或用完所有機會。
                </li>
                <li>
                  <strong>再次遊玩</strong>:如果你成功猜出單字,你會看到「正確!」的訊息。點擊「下一個挑戰」按鈕開始新一輪遊戲。
                </li>
              </ol>
            </>
          ),
        }}
      />
      <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden">
        {isCorrect && (
          <>
            {" "}
            <div className="animate-drop-bounce text-green-500 font-bold text-4xl my-6">🎉 Correct! 🎉</div>{" "}
          </>
        )}
        <h1 className="text-4xl font-bold mb-8">Dictator</h1>
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
              <div className="mt-6">
                {" "}
                <button onClick={startGame} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4">
                  Next Challenge
                </button>
              </div>
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
