import {faDeleteLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IKeyboardProps {
  misplacedLetters: string[];
  correctLetters: string[];
  wrongLetters: string[];
  handleEnter: () => void;
  handleBackSpace: () => void;
  handleKeyPress: (key: string) => void;
}

// Keyboard.tsx
const Keyboard = ({handleEnter, handleBackSpace, handleKeyPress, misplacedLetters, correctLetters, wrongLetters}: IKeyboardProps) => {
  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["Back", "Z", "X", "C", "V", "B", "N", "M", "Enter"];

  const getKeyColor = (character: string): string => {
    if (correctLetters.includes(character)) return "bg-emerald-600 text-white border-emerald-500";
    if (misplacedLetters.includes(character)) return "bg-amber-500 text-white border-amber-400";
    if (wrongLetters.includes(character)) return "bg-zinc-800 text-zinc-500 border-zinc-700";
    return "bg-zinc-600 text-white border-zinc-500 hover:bg-zinc-500";
  };

  const handleClick = (key: string) => {
    if (key === "Back") return handleBackSpace();
    if (key === "Enter") return handleEnter();
    return handleKeyPress(key);
  };

  const renderKey = (key: string, index: number) => {
    const isAction = key === "Back" || key === "Enter";

    return (
      <button
        key={index}
        onClick={() => handleClick(key)}
        className={`
          ${isAction ? "flex-[1.5]" : "flex-1"}
          ${isAction ? "bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600" : getKeyColor(key)}
          h-[48px] sm:h-[56px]
          flex items-center justify-center
          rounded-lg border-b-2
          text-sm sm:text-base font-bold
          select-none
          active:scale-95 active:border-b-0 active:translate-y-[2px]
          transition-all duration-100 ease-out
        `}>
        {key === "Back" ? (
          <FontAwesomeIcon icon={faDeleteLeft} className="text-base sm:text-lg" />
        ) : key === "Enter" ? (
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          key
        )}
      </button>
    );
  };

  return (
    <div className="shrink-0 w-full bg-zinc-900/80 backdrop-blur-sm border-t border-zinc-800 px-1.5 sm:px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="max-w-lg mx-auto flex flex-col gap-[6px]">
        {/* Top row */}
        <div className="flex gap-[5px]">{topRow.map((key, i) => renderKey(key, i))}</div>

        {/* Middle row — centered with half-key offset */}
        <div className="flex gap-[5px] px-[5%]">{middleRow.map((key, i) => renderKey(key, i))}</div>

        {/* Bottom row */}
        <div className="flex gap-[5px]">{bottomRow.map((key, i) => renderKey(key, i))}</div>
      </div>
    </div>
  );
};

export default Keyboard;
