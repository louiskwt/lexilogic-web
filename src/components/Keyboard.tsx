import {faDeleteLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BaseSyntheticEvent} from "react";

interface IKeyboardProps {
  handleEnter: () => void;
  handleBackSpace: () => void;
  handleKeyPress: (key: string) => void;
}

const Keyboard = ({handleEnter, handleBackSpace, handleKeyPress}: IKeyboardProps) => {
  const topRow: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow: string[] = ["Back", "X", "Z", "C", "V", "B", "N", "M", "Enter"];
  return (
    <div className="fixed bottom-0 w-full bg-zinc-800 py-4 px-6">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          {topRow.map((key, index) => (
            <button
              key={index}
              className={`bg-zinc-600 hover:bg-gray-700 text-white font-medium py-3 px-2 rounded-md flex-1`}
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
              className={`bg-zinc-600 hover:bg-gray-700 text-white font-medium py-3 px-2 rounded-md flex-1`}
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
              className={`bg-zinc-600 hover:bg-gray-700 text-white font-medium py-3 px-2 rounded-md  ${key === "Back" || key === "Enter" ? "flex-1 flex-grow" : "flex-1"}`}
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
