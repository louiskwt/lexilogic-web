import {useState} from "react";
import Confetti from "react-confetti-boom";
import {useLanguageContext} from "../contexts/LanguageContext";
import {submitScore} from "../utils";
import Modal from "./Modal";
import RankingModalContent from "./RankingModalContent";

interface IGameOverDisplayProps {
  title: string;
  message: string;
  answer: string;
  pos: string;
  score: number;
  meaning: string;
  isCorrect: boolean;
  handleNewGame: () => void;
}

const GameOverDisplay = ({handleNewGame, title, message, answer = "", pos = "", meaning = "", isCorrect, score}: IGameOverDisplayProps) => {
  const {t} = useLanguageContext();
  const [name, setName] = useState<string>("");
  const [showRanking, setShowRanking] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleSaveScore = async () => {
    setSubmitted(true);
    const success = await submitScore(name, score.toString());
    if (success) {
      alert(t("saved"));
      setShowRanking(true);
    } else {
      alert(t("warning.errorTryAgain"));
      setSubmitted(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center text-center w-full max-w-md mx-auto px-4">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-1">{title}</h2>
        <p className="text-gray-400 text-sm sm:text-base mb-6">{message}</p>

        {/* Score Card */}
        <div className="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-5 w-full mb-6 space-y-2">
          <p className="text-2xl font-bold tabular-nums">{`${t("score")}: ${score}`}</p>
          <hr className="border-zinc-700" />
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {t("correctAnswer", {
              ans: answer,
              pos,
              meaning,
              interpolation: {escapeValue: false},
            })}
          </p>
        </div>

        {isCorrect && <Confetti mode="boom" particleCount={120} effectCount={2} effectInterval={2000} colors={["#ff577f", "#ff884b"]} />}

        {/* Save Score */}
        {!isCorrect && (
          <div className="w-full mb-6">
            <label className="block text-gray-400 text-sm mb-2 text-left" htmlFor="name">
              {t("save")}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input id="name" type="text" placeholder="Enter a name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 bg-zinc-700 rounded-xl border-2 border-zinc-600 py-2.5 px-4 text-sm focus:outline-none focus:border-lime-500 transition-colors" />
              <button disabled={submitted} className="bg-lime-600 hover:bg-lime-700 active:scale-95 text-white font-semibold py-2.5 px-6 rounded-xl whitespace-nowrap transition-all disabled:bg-zinc-600 disabled:text-zinc-400 disabled:cursor-not-allowed" onClick={handleSaveScore}>
                {t("saveBtn")}
              </button>
            </div>
          </div>
        )}

        {/* Restart Button */}
        <button className="w-full bg-lime-600 hover:bg-lime-700 active:scale-[0.98] text-white font-bold py-3 px-6 rounded-xl transition-all text-base" onClick={handleNewGame}>
          {t("tryAgain")}
        </button>
      </div>

      <Modal isOpen={showRanking} onClose={() => setShowRanking(false)}>
        {/* Modal content */}
        <RankingModalContent />
      </Modal>
    </>
  );
};

export default GameOverDisplay;
