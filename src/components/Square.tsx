interface SquareProps {
  char: string;
  correct: boolean;
  misplaced: boolean;
}

const Square = ({char, correct, misplaced}: SquareProps) => {
  return <div className={`w-20 h-20 bg-zinc-800 rounded-md border-zinc-500  border-2 shadow-md flex items-center justify-center text-white font-medium text-2xl ${correct ? "bg-green-500 text-white" : misplaced ? "bg-yellow-500 text-white" : "bg-gray-700 text-white"}`}>{char}</div>;
};

export default Square;
