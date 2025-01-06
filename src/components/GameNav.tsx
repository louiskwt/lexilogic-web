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
        <p className="mb-4">{/* Add your game rules content here */}</p>
        <h3 className="text-xl font-bold mb-2">Language</h3>
        <div className="flex space-x-4">{/* Language selection buttons */}</div>
      </Modal>
    </>
  );
};

export default Navbar;
