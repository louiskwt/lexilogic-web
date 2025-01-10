import {faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

interface IWord {
  word: string;
  audio: string;
}

const Dictator = () => {
  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const words: IWord[] = [
    {word: "apple", audio: "/apple.mp3"},
    {word: "banana", audio: "/banana.mp3"},
    {word: "cherry", audio: "/cherry.mp3"},
    // add more words here
  ];

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setUserInput("");
    setIsCorrect(false);
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.toLowerCase();
    setUserInput(input);

    if (input === currentWord?.word.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const playAudio = () => {
    if (currentWord) {
      const audio = new Audio(currentWord.audio);
      audio.play();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Dictator</h1>
      {currentWord ? (
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold mb-4">{currentWord.word.split("").map((letter, index) => (userInput.length > index && userInput[index] === letter.toLowerCase() ? letter : "_"))}</div>
          <input type="text" value={userInput} onChange={handleUserInput} className="bg-zinc-700 rounded-md border-2 border-zinc-600 py-2 px-4 focus:outline-none focus:border-lime-600 mb-4 text-2xl" />
          <button onClick={playAudio} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4 flex items-center">
            <FontAwesomeIcon icon={faVolumeUp} className="mr-2" />
            Play Audio
          </button>
          {isCorrect && <div className="text-green-500 font-bold mt-4">Correct!</div>}
        </div>
      ) : (
        <button onClick={startGame} className="bg-lime-600 hover:bg-lime-50 hover:text-gray-800 rounded-md border-2 text-white font-bold py-2 px-4">
          Start Game
        </button>
      )}
    </div>
  );
};

export default Dictator;
