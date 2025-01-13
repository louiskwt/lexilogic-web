import {createContext, createRef, FC, ReactNode, useContext, useEffect, useState} from "react";

interface IWord {
  word: string;
  audio: string;
}

export type DictatorContextValue = {
  currentWord: IWord | null;
  userInput: string;
  isCorrect: boolean;
  currentIndex: number;
  inputRefsArray: React.RefObject<HTMLInputElement>[];
  startGame: () => void;
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleDelete: (event: React.KeyboardEvent, index: number) => void;
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
  const [userInput, setUserInput] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  // create a array of refs
  const [inputRefsArray, setInputRefsArray] = useState<React.RefObject<HTMLInputElement>[]>([]);

  // state for current input index
  const [currentIndex, setCurrentIndex] = useState(0);

  const startGame = () => {
    setCurrentWord({word: "serious", audio: "/serious.mp3"});
    setUserInput(Array.from(currentWord?.word.length).map(() => ""));
    setIsCorrect(false);
  };

  useEffect(() => {
    // Initialize the inputRefsArray with empty ref objects
    setInputRefsArray(Array.from({length: currentWord?.word.length || 0}, () => createRef<HTMLInputElement>()));
  }, [currentWord]);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedInput = userInput;
    const input = event.target.value.toLowerCase();
    updatedInput[index] = input;

    setUserInput(updatedInput);
    setCurrentIndex(currentIndex + 1);

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
  };

  return <DictatorContext.Provider value={{currentWord, userInput, isCorrect, currentIndex, startGame, handleUserInput, setCurrentIndex, inputRefsArray, playAudio}}>{children}</DictatorContext.Provider>;
};
