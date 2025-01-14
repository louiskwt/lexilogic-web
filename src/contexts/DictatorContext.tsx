import {createContext, createRef, FC, ReactNode, useContext, useEffect, useState} from "react";

interface IWord {
  word: string;
  audio: string;
}

export type DictatorContextValue = {
  currentWord: IWord | null;
  userInput: string[];
  isCorrect: boolean;
  currentIndex: number;
  inputRefsArray: React.RefObject<HTMLInputElement>[];
  tries: number;
  startGame: () => void;
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  playAudio: () => void;
  setCurrentIndex: (n: number) => void;
};

const DictatorContext = createContext<DictatorContextValue | undefined>(undefined);

export const useDictatorContext = () => {
  const context = useContext(DictatorContext);
  if (context === undefined) throw new Error("useWordleContext must be used withint a WordlerProvder");
  return context;
};

export const DictatorProvider: FC<{children: ReactNode}> = ({children}) => {
  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [userInput, setUserInput] = useState<string[]>([""]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [tries, setTries] = useState<number>(5);
  // create a array of refs
  const [inputRefsArray, setInputRefsArray] = useState<React.RefObject<HTMLInputElement>[]>([]);

  // state for current input index
  const [currentIndex, setCurrentIndex] = useState(0);

  const startGame = () => {
    const word = {word: "serious", audio: "/serious.mp3"};
    setCurrentWord(word);
    if (word) {
      const inputs = word.word.split("").map((c) => "");
      setUserInput(inputs);
    }
    setIsCorrect(false);
  };

  useEffect(() => {
    // Initialize the inputRefsArray with empty ref objects
    setInputRefsArray(Array.from({length: currentWord?.word.length || 0}, () => createRef<HTMLInputElement>()));
  }, [currentWord]);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = event.target.value;
    const updatedInput = [...userInput];
    if (updatedInput[index] === "" && currentIndex + 1 !== currentWord?.word.length) {
      inputRefsArray[currentIndex + 1].current?.focus();
      setCurrentIndex(currentIndex + 1);
    }

    updatedInput[index] = inputValue;
    setUserInput(updatedInput);

    if (updatedInput.join("") === currentWord?.word.toLowerCase()) {
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
    if (inputRefsArray[0]) {
      inputRefsArray[currentIndex].current?.focus();
    }
    return;
  };

  return <DictatorContext.Provider value={{currentWord, userInput, isCorrect, currentIndex, tries, startGame, handleUserInput, setCurrentIndex, inputRefsArray, playAudio}}>{children}</DictatorContext.Provider>;
};
