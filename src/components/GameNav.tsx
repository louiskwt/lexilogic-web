import {faChartSimple, faCircleQuestion, faLightbulb} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactNode, useState} from "react";
import {WordHint} from "../contexts/WordleContext";
import HintModalContent from "./HintModalContent";
import LanguageModalContent from "./LanguageModalContent";
import Modal from "./Modal";
import RankingModalContent from "./RankingModalContent";
import RulesModalContent from "./RulesModalContent";

interface IRules {
  title: string;
  message: ReactNode;
  description: string;
}

interface INavbarProps {
  wordHint: WordHint;
  rules: IRules;
}

const GameNav = ({wordHint, rules}: INavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en-US" | "en-UK">("en-US");
  const [modalType, setModalType] = useState<"language" | "rules" | "rankings" | "hints">("rules");
  const handleLanguageChange = (newLanguage: "en-US" | "en-UK") => {
    setLanguage(newLanguage);
    // Implement any additional logic to update the app's language
  };

  const modalContent = {
    rules: <RulesModalContent title={rules.title} description={rules.description} message={rules.message} />,
    language: <LanguageModalContent language={language} handleLanguageChange={handleLanguageChange} />,
    hints: <HintModalContent meaning={wordHint.meaning} pos={wordHint.pos} vowels={wordHint.vowels} />,
    rankings: <RankingModalContent />,
  };

  return (
    <>
      <nav className="bg-zinc-800 text-white py-4 px-6 flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setIsModalOpen(true);
            setModalType("language");
          }}>
          <span className={`mr-4 text-xl `}>{language === "en-US" ? "🇺🇸" : "🇬🇧"}</span>
          <span className="text-lg font-medium">{language === "en-US" ? "EN-US" : "EN-GB"}</span>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <button
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded"
              onClick={() => {
                setIsModalOpen(true);
                setModalType("hints");
              }}>
              <FontAwesomeIcon icon={faLightbulb} size="lg" />
            </button>
          </div>
          <div className="mr-4">
            <button
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded"
              onClick={() => {
                setIsModalOpen(true);
                setModalType("rankings");
              }}>
              <FontAwesomeIcon icon={faChartSimple} size="lg" />
            </button>
          </div>
          <div>
            <button
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded"
              onClick={() => {
                setIsModalOpen(true);
                setModalType("rules");
              }}>
              <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
            </button>
          </div>
        </div>
      </nav>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* Modal content */}
        {modalContent[modalType]}
      </Modal>
    </>
  );
};

export default GameNav;
