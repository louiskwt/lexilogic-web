import Confetti from "react-confetti-boom";
import {useLanguageContext} from "../contexts/LanguageContext";

interface IGameOverDisplayProps {
  title: string;
  message: string;
  answer: string;
  pos: string;
  meaning: string;
  isCorrect: boolean;
  handleNewGame: () => void;
}

const GameOverDisplay = ({handleNewGame, title, message, answer = "", pos = "", meaning = "", isCorrect}: IGameOverDisplayProps) => {
  const {t} = useLanguageContext();
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{message}</p>
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
      <div className="mt-8 flex flex-col">
        <button className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded" onClick={handleNewGame}>
          {t("tryAgain")}
        </button>
      </div>
    </>
  );
};

export default GameOverDisplay;
