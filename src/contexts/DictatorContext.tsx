import {IUserInput, IWord, WordHint} from "@/types";
import {createContext, createRef, FC, ReactNode, useContext, useEffect, useState} from "react";
import {findVowels, getWord} from "../utils";

export type DictatorContextValue = {
  currentWord: IWord | null;
  userInput: IUserInput[];
  isCorrect: boolean;
  currentIndex: number;
  inputRefsArray: React.RefObject<HTMLInputElement | null>[];
  tries: number;
  isGameOver: boolean;
  wordHint: WordHint;
  isFetchingWord: boolean;
  startGame: () => void;
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  playAudio: () => void;
  setCurrentIndex: (n: number) => void;
  checkAns: () => void;
};

export const DictatorContext = createContext<DictatorContextValue | undefined>(undefined);

export const useDictatorContext = () => {
  const context = useContext(DictatorContext);
  if (context === undefined) throw new Error("useWordleContext must be used withint a WordlerProvder");
  return context;
};

export const DictatorProvider: FC<{children: ReactNode}> = ({children}) => {
  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [currentFrequency, setCurrentFrequency] = useState<number>(Infinity);
  const [usedWords, setUsedWords] = useState<Set<string | unknown>>(new Set());
  const [wordHint, setWordHint] = useState<WordHint>({
    meaning: "",
    pos: "",
    vowels: [],
  });
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
  const [inputRefsArray, setInputRefsArray] = useState<React.RefObject<HTMLInputElement | null>[]>([]);
  const [isFetchingWord, setIsFetchingWord] = useState<boolean>(false);
  // state for current input index
  const [currentIndex, setCurrentIndex] = useState(0);
  // const profile = null;
  // const {t} = useLanguageContext();

  const startGame = async () => {
    setIsFetchingWord(true);
    let inputs: IUserInput[] = [{character: "", correct: false}];

    const wordData = await getWord(Infinity, currentFrequency, usedWords);
    if (wordData?.picked) {
      setCurrentWord({
        word: wordData.picked.word,
        audio: "",
      });
      inputs = wordData.picked.word.split("").map(() => {
        return {
          character: "",
          correct: false,
        };
      });
      setWordHint({
        meaning: wordData.picked.meaning,
        pos: wordData.picked.pos,
        vowels: findVowels(wordData.picked.word),
      });
      setCurrentFrequency(wordData.nextFrequency);
      setUsedWords(usedWords.add(wordData.picked.word));
    }

    setUserInput(inputs);

    setIsCorrect(false);
    setIsGameOver(false);
    setTries(5);
    setCurrentIndex(0);
    setIsFetchingWord(false);
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

  // useEffect(() => {
  //   const localProfileData = getLocalProfileData();
  //   const currentWeeklyXP = profile ? profile.weekly_xp : localProfileData ? localProfileData.weekly_xp : 0;
  //   const currentTotalXP = profile ? profile.total_xp : localProfileData ? localProfileData.total_xp : 0;
  //   const xp = isCorrect ? 3 : isGameOver ? 1 : 0;
  // }, [isGameOver, isCorrect]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && userInput[currentIndex].character === "") {
        const nextStep = currentIndex === 0 ? 0 : 1;
        inputRefsArray[currentIndex - nextStep].current?.focus();
        setCurrentIndex(currentIndex - nextStep);
      }
    };
    window.addEventListener("keydown", handler, false);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [currentIndex, userInput, inputRefsArray]);

  const playAudio = () => {
    if (currentWord) {
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(currentWord.word);
      synth.speak(utterThis);
    }
    inputRefsArray[currentIndex].current?.focus();
    return;
  };

  const checkAns = () => {
    const hasCorrectAns =
      userInput
        .map(({character}) => character)
        .join("")
        .toLowerCase() === currentWord?.word.toLowerCase();

    if (hasCorrectAns) {
      const updatedInput = [...userInput].map((value) => {
        return {
          character: value.character,
          correct: true,
        };
      });
      setUserInput(updatedInput);
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

  return <DictatorContext.Provider value={{currentWord, userInput, isCorrect, currentIndex, tries, wordHint, isGameOver, isFetchingWord, startGame, handleUserInput, setCurrentIndex, inputRefsArray, checkAns, playAudio}}>{children}</DictatorContext.Provider>;
};
