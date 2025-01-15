import {createContext, createRef, FC, ReactNode, useContext, useEffect, useState} from "react";
import supabase from "../supabaseClient";

interface IWord {
  word: string;
  audio: string;
}

interface IUserInput {
  character: string;
  correct: boolean;
}

export type DictatorContextValue = {
  currentWord: IWord | null;
  userInput: IUserInput[];
  isCorrect: boolean;
  currentIndex: number;
  inputRefsArray: React.RefObject<HTMLInputElement>[];
  tries: number;
  isGameOver: boolean;
  startGame: () => void;
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  playAudio: () => void;
  setCurrentIndex: (n: number) => void;
  checkAns: () => void;
};

const DictatorContext = createContext<DictatorContextValue | undefined>(undefined);

export const useDictatorContext = () => {
  const context = useContext(DictatorContext);
  if (context === undefined) throw new Error("useWordleContext must be used withint a WordlerProvder");
  return context;
};

export const DictatorProvider: FC<{children: ReactNode}> = ({children}) => {
  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [userInput, setUserInput] = useState<IUserInput[]>([
    {
      character: "",
      correct: false,
    },
  ]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [tries, setTries] = useState<number>(5);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  // create a array of refs
  const [inputRefsArray, setInputRefsArray] = useState<React.RefObject<HTMLInputElement>[]>([]);

  // state for current input index
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchDictationWord = async (): IWord => {
    try {
      const {data, error} = await supabase.from("random_dictation_words").select("word, pos, meaning, audio").limit(1).single();

      if (error) throw error;

      console.log(data);
      return data;
    } catch (err) {
      const word = {word: "serious", audio: "/serious.mp3"};
      console.error(err);
      return word;
    }
  };

  const startGame = async () => {
    const wordData = await fetchDictationWord();

    setCurrentWord({
      word: wordData.word,
      audio: wordData.audio,
    });

    if (wordData) {
      const inputs = wordData.word.split("").map((_) => {
        return {
          character: "",
          correct: false,
        };
      });
      setUserInput(inputs);
    }
    setIsCorrect(false);
    setIsGameOver(false);
    setTries(5);
  };

  useEffect(() => {
    // Initialize the inputRefsArray with empty ref objects
    setInputRefsArray(Array.from({length: currentWord?.word.length || 0}, () => createRef<HTMLInputElement>()));
  }, [currentWord]);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = event.target.value;
    const updatedInput = [...userInput];
    if (updatedInput[index].character === "" && currentIndex + 1 !== currentWord?.word.length) {
      inputRefsArray[currentIndex + 1].current?.focus();
      setCurrentIndex(currentIndex + 1);
    }

    updatedInput[index].character = inputValue;
    setUserInput(updatedInput);
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

  const checkAns = () => {
    if (
      userInput
        .map(({character}) => character)
        .join("")
        .toLowerCase() === currentWord?.word.toLowerCase()
    ) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      if (tries - 1 === 0) {
        setIsGameOver(true);
        return;
      }

      setTries(tries - 1);
      const checkedInput = [...userInput].map((input, index) => {
        const {character} = input;
        return {
          character,
          correct: currentWord?.word[index].toLowerCase() === character.toLowerCase(),
        };
      });
      setUserInput(checkedInput);
      const firstMissIndex = checkedInput.findIndex(({correct}) => {
        return !correct;
      });
      inputRefsArray[firstMissIndex]?.current?.focus();
      setCurrentIndex(firstMissIndex);
    }
  };

  return <DictatorContext.Provider value={{currentWord, userInput, isCorrect, currentIndex, tries, isGameOver, startGame, handleUserInput, setCurrentIndex, inputRefsArray, checkAns, playAudio}}>{children}</DictatorContext.Provider>;
};
