import {useAuthContext} from "../contexts/AuthContext";
import {useLanguageContext} from "../contexts/LanguageContext";

interface IGameOverDisplayProps {
  title: string;
  message: string;
  answer: string;
  pos: string;
  meaning: string;
  handleNewGame: () => void;
}

const GameOverDisplay = ({handleNewGame, title, message, answer = "", pos = "", meaning = ""}: IGameOverDisplayProps) => {
  const {t} = useLanguageContext();
  const {user, openSignUpModal} = useAuthContext();
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
      <div className="mt-8 flex flex-col">
        <button className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded" onClick={handleNewGame}>
          {t("tryAgain")}
        </button>
        {!user && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={openSignUpModal}>
            {t("callToRegister")}
          </button>
        )}
      </div>
    </>
  );
};

export default GameOverDisplay;
