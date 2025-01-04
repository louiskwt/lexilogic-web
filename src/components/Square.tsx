interface SquareProps {
  char: string;
}

const Square = ({char}: SquareProps) => {
  return <div className="w-20 h-20 bg-zinc-800 rounded-md border-zinc-500  border-2 shadow-md flex items-center justify-center text-white font-medium text-2xl">{char}</div>;
};

export default Square;
