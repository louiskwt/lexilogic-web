import {createContext, FC, ReactNode, useContext, useState} from "react";

interface IWord {
  word: string;
  audio: string;
}

export type DictatorContextValue = {
  currentWord: IWord | null;
  userInput: string;
  isCorrect: boolean;
  startGame: () => void;
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  playAudio: () => void;
};

const DictatorContext = createContext<DictatorContextValue | undefined>(undefined);

export const useDictatorContext = () => {
  const context = useContext(DictatorContext);
  if (context === undefined) throw new Error("useWordleContext must be used withint a WordlerProvder");
  return context;
};

export const DictatorProvider: FC<{children: ReactNode}> = ({children}) => {
  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const startGame = () => {
    setCurrentWord(null);
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

  return <DictatorContext.Provider value={{currentWord, userInput, isCorrect, startGame, handleUserInput, playAudio}}>{children}</DictatorContext.Provider>;
};
