interface SquareProps {
  char: string;
  correct: boolean;
  misplaced: boolean;
}

const Square = ({char, correct, misplaced}: SquareProps) => {
  return (
    <div className={"w-10 h-10 md:w-20 md:h-20 relative group"}>
      <div className={`absolute inset-0 bg-zinc-800 rounded-md border-zinc-500 border-2 shadow-md flex items-center justify-center text-white font-medium text-3xl transition-transform duration-1000 transform-style preserve-3d ${correct ? "rotate-y" : misplaced ? "rotate-y" : ""}`}>
        <div className={`absolute inset-0 backface-hidden flex items-center justify-center ${correct ? "bg-green-500 text-white" : misplaced ? "bg-yellow-500 text-white" : "bg-gray-700 text-white"}`}>{char}</div>
        <div className="absolute inset-0 flex items-center justify-center">{char}</div>
      </div>
    </div>
  );
};

export default Square;
