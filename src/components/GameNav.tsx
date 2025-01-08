import {faChartSimple, faCircleQuestion, faLightbulb} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactNode, useState} from "react";
import {WordHint} from "../contexts/WordleContext";
import Modal from "./Modal";

interface INavbarProps {
  wordHint: WordHint;
}

const Navbar = ({wordHint}: INavbarProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en-US" | "en-UK">("en-US");
  const [modalType, setModalType] = useState<"language" | "rules" | "hints">("rules");
  const handleLanguageChange = (newLanguage: "en-US" | "en-UK") => {
    setLanguage(newLanguage);
    // Implement any additional logic to update the app's language
  };

  const {meaning, pos, vowels} = wordHint;

  const renderRules = (): ReactNode => (
    <>
      <h2 className="text-2xl font-bold mb-4">Game Rules</h2>
      <p className="text-xl mb-4 font-semibold">
        你要喺六次機會之內猜出隱藏嘅英文字。
        <br /> <br />
        每次輸入一個字後,系統會顯示唔同嘅顏色提示你點樣修正。綠色代表字母位置正確,黃色代表字母無錯但位置唔對,灰色就代表呢個字母完全唔係隱藏字。加油!
      </p>
      <p className="text-xl mb-4 font-semibold">快啲同朋友一齊玩啦!考考你嘅英文水平。既好玩又可以提升你嘅英文能力,仲唔快啲嚟試吓?</p>
    </>
  );

  const renderLanguage = (): ReactNode => (
    <>
      <h3 className="text-xl font-bold mb-2">Language</h3>
      <p className="text-xl mb-4 font-semibold">
        你可以選擇英式或者美式嘅串法
        <br />
      </p>
      <div className="flex space-x-4 mt-8 ">
        <button className={`px-4 py-2 rounded-md ${language === "en-US" ? "bg-lime-600 text-white" : "bg-gray-200"}`} onClick={() => handleLanguageChange("en-US")}>
          English (US)
        </button>
        <button className={`px-4 py-2 rounded-md ${language === "en-UK" ? "bg-lime-600 text-white" : "bg-gray-200 text-gray-600"}`} onClick={() => handleLanguageChange("en-UK")}>
          English (UK)
        </button>
      </div>
    </>
  );

  const renderHints = (): ReactNode => (
    <>
      <h2 className="text-2xl font-bold mb-4">Hints</h2>
      <div className="flex flex-col justify-between mb-4">
        <p className="text-xl font-semibold">意思:</p>
        <br />
        <p className="text-xl">
          <span className="text-white">{meaning}</span> ({pos})
        </p>
      </div>
      <div className="border-t border-white pt-4">
        <h3 className="text-xl font-bold mb-2">Vowels (A, E, I, O, U)</h3>
        <p className="text-white text-lg font-bold">
          {vowels.map((v, key) => (
            <span key={key}>
              {v.toUpperCase()}
              {key < vowels.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
    </>
  );

  const modalContent = {
    rules: renderRules(),
    language: renderLanguage(),
    hints: renderHints(),
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
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded">
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

export default Navbar;
