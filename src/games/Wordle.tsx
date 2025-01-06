import Navbar from "../components/GameNav";
import Keyboard from "../components/Keyboard";
import Square from "../components/Square";
import {useWordleContext} from "../contexts/wordleContext";

const Wordle = () => {
  const {rows, handleKeyPress, handleBackspace, handleEnter} = useWordleContext();
  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 mt-12">
        {rows.map((row, index) => (
          <div key={index} className="flex space-x-2">
            {row.map((letter, i) => (
              <Square key={i} char={letter} />
            ))}
          </div>
        ))}
      </div>
      <Keyboard handleKeyPress={handleKeyPress} handleEnter={handleEnter} handleBackSpace={handleBackspace} />
    </>
  );
};

export default Wordle;
