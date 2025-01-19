interface EmptySquareProps {
  size: number;
}

const EmptySquare = ({size}: EmptySquareProps) => {
  return <div className={`w-${size} h-${size} md:w-${size * 2} md:h-${size * 2} relative group`}></div>;
};

export default EmptySquare;
