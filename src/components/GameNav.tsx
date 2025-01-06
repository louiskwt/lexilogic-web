import {faChartSimple, faCircleQuestion, faGear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import Modal from "./Modal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en-US" | "en-GB">("en-US");

  const handleLanguageChange = (newLanguage: "en-US" | "en-GB") => {
    setLanguage(newLanguage);
    // Implement any additional logic to update the app's language
  };
  return (
    <>
      <nav className="bg-zinc-800 text-white py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className={`mr-4 text-xl ${language === "en-US" ? "🇺🇸" : "🇬🇧"}`} />
          <span className="text-lg font-medium">{language === "en-US" ? "EN-US" : "EN-GB"}</span>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded">
              <FontAwesomeIcon icon={faChartSimple} size="lg" />
            </button>
          </div>
          <div className="mr-4">
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded">
              <FontAwesomeIcon icon={faGear} size="lg" />
            </button>
          </div>
          <div>
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>
              <FontAwesomeIcon icon={faCircleQuestion} size="lg" />
            </button>
          </div>
        </div>
      </nav>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* Modal content */}
        <h2 className="text-2xl font-bold mb-4">Game Rules</h2>
        <p className="text-xl mb-4 font-semibold">
          你要喺六次機會之內猜出隱藏嘅英文字。
          <br /> <br />
          每次輸入一個字後,系統會顯示唔同嘅顏色提示你點樣修正。綠色代表字母位置正確,黃色代表字母無錯但位置唔對,灰色就代表呢個字母完全唔係隱藏字。加油!
        </p>
        <p className="text-xl mb-4 font-semibold">快啲同朋友一齊玩啦!字謎遊戲每日都會推出一個新謎題,考考你嘅中文水平。既好玩又可以提升你嘅中文能力,仲唔快啲嚟試吓?</p>
      </Modal>
    </>
  );
};

export default Navbar;
