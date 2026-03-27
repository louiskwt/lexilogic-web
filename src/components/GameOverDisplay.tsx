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
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{message}</p>
      <p className="mb-4">{`${t("score")}: ${score}`}</p>
      <p className="mb-4">
        {t("correctAnswer", {
          ans: answer,
          pos,
          meaning,
          interpolation: {
            escapeValue: false,
          },
        })}
      </p>
      {isCorrect && <Confetti mode="boom" particleCount={120} effectCount={2} effectInterval={2000} colors={["#ff577f", "#ff884b"]} />}
      <div className="w-100">
        {!isCorrect && (
          <div className="center">
            {" "}
            <label className="block text-gray-400" htmlFor="avatar">
              {t("save")}
            </label>
            <input type="text" placeholder="Enter a name" value={name} onChange={(e) => setName(e.target.value)} className="bg-zinc-700 rounded-md border-2 border-zinc-600 py-2 px-4 mb-4 focus:outline-none focus:border-lime-600" />
            <button disabled={submitted} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 ml-4 rounded disabled:bg-slate-500" onClick={handleSaveScore}>
              {t("saveBtn")}
            </button>
          </div>
        )}
      </div>
      <div className="mt-8 flex flex-col">
        <button className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded" onClick={handleNewGame}>
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
