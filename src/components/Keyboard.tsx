import {faDeleteLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BaseSyntheticEvent} from "react";

interface IKeyboardProps {
  misplacedLetters: string[];
  correctLetters: string[];
  wrongLetters: string[];
  handleEnter: () => void;
  handleBackSpace: () => void;
  handleKeyPress: (key: string) => void;
}

const Keyboard = ({handleEnter, handleBackSpace, handleKeyPress, misplacedLetters, correctLetters, wrongLetters}: IKeyboardProps) => {
  const topRow: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow: string[] = ["Back", "X", "Z", "C", "V", "B", "N", "M", "Enter"];

  const getSquareColor = (character: string, correctLetters: string[], misplacedLetters: string[], wrongLetters: string[]): string => {
    switch (true) {
      case correctLetters.includes(character):
        return "bg-green-500 text-white";
      case misplacedLetters.includes(character):
        return "bg-yellow-500 text-white";
      case wrongLetters.includes(character):
        return "bg-zinc-800 text-white";
      default:
        return "bg-zinc-600 text-white";
    }
  };

  return (
    <div className="fixed bottom-0 w-full bg-zinc-800 py-4 px-6">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          {topRow.map((key, index) => (
            <button
              key={index}
              className={`hover:bg-gray-700 font-medium py-3 px-2 rounded-md flex-1 ${getSquareColor(key, correctLetters, misplacedLetters, wrongLetters)}`}
              onClick={(e: BaseSyntheticEvent) => {
                handleKeyPress(e.target.innerText);
              }}>
              {key}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          {middleRow.map((key, index) => (
            <button
              key={index}
              className={` hover:bg-gray-700  font-medium py-3 px-2 rounded-md flex-1 ${getSquareColor(key, correctLetters, misplacedLetters, wrongLetters)}`}
              onClick={(e: BaseSyntheticEvent) => {
                handleKeyPress(e.target.innerText);
              }}>
              {key}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          {bottomRow.map((key, index) => (
            <button
              key={index}
              className={` hover:bg-gray-700 font-medium py-3 px-2 rounded-md  ${key === "Back" || key === "Enter" ? "flex-1 flex-grow" : "flex-1"} ${getSquareColor(key, correctLetters, misplacedLetters, wrongLetters)}}`}
              onClick={(e: BaseSyntheticEvent) => {
                const innerText = e.target.innerText;
                if (key !== "Back" && key !== "Enter") return handleKeyPress(innerText);
                return key === "Back" ? handleBackSpace() : handleEnter();
              }}>
              {key === "Back" ? <FontAwesomeIcon icon={faDeleteLeft} /> : key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
