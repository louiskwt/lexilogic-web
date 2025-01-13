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
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleDelete: (event: React.KeyboardEvent, index: number) => void;
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
    setCurrentWord({word: "serious", audio: "/serious.mp3"});
    setUserInput("");
    setIsCorrect(false);
  };

  const handleDelete = (event: KeyboardEvent, index: number) => {
    if (event.key === "Backspace") {
      const updatedInput = [...userInput];
      setUserInput(updatedInput.slice(index, 0).join(""));
    }
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedWordArr = [...userInput];
    const input = event.target.value.toLowerCase();
    if (updatedWordArr[index]) {
      updatedWordArr[index] = input;
    } else {
      updatedWordArr.push(input);
    }

    const updatedWord = updatedWordArr.join("");
    setUserInput(updatedWord);

    if (updatedWord === currentWord?.word.toLowerCase()) {
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

  return <DictatorContext.Provider value={{currentWord, userInput, isCorrect, startGame, handleUserInput, handleDelete, playAudio}}>{children}</DictatorContext.Provider>;
};
