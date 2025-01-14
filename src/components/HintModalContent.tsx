interface IHingModalContentProps {
  meaning: string;
  pos: string;
  vowels: string[];
}

const HintModalContent = ({meaning, pos, vowels}: IHingModalContentProps) => {
  return (
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
};

export default HintModalContent;
