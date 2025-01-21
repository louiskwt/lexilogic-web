import {createContext, createRef, FC, ReactNode, useContext, useEffect, useState} from "react";
import supabase from "../supabaseClient";
import {findVowels, getLocalProfileData, setLocalProfileData, updateXP} from "../utils";
import {useAuthContext} from "./AuthContext";
import {useLanguageContext} from "./LanguageContext";
import {WordHint} from "./WordleContext";

interface IWord {
  word: string;
  audio: string;
}

type WordData = IWord & {pos: string; meaning: string};

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
  wordHint: WordHint;
  isFetchingWord: boolean;
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
  const [inputRefsArray, setInputRefsArray] = useState<React.RefObject<HTMLInputElement>[]>([]);
  const [isFetchingWord, setIsFetchingWord] = useState<boolean>(false);
  // state for current input index
  const [currentIndex, setCurrentIndex] = useState(0);
  const {profile} = useAuthContext();
  const {t} = useLanguageContext();

  const fetchDictationWord = async (): Promise<WordData | null> => {
    try {
      const {data, error} = await supabase.from("random_dictation_words").select("word, pos, meaning, audio").limit(1).single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const startGame = async () => {
    setIsFetchingWord(true);
    const wordData = await fetchDictationWord();

    if (wordData) {
      setCurrentWord({
        word: wordData.word,
        audio: wordData.audio,
      });

      const inputs = wordData.word.split("").map(() => {
        return {
          character: "",
          correct: false,
        };
      });
      setUserInput(inputs);
      setWordHint({
        meaning: wordData.meaning,
        pos: wordData.pos,
        vowels: findVowels(wordData.word),
      });
    } else {
      alert(t("warning.errorTryAgain"));
    }

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

  useEffect(() => {
    const localProfileData = getLocalProfileData();
    const currentWeeklyXP = profile ? profile.weekly_xp : localProfileData ? localProfileData.weekly_xp : 0;
    const currentTotalXP = profile ? profile.weekly_xp : localProfileData ? localProfileData.total_xp : 0;
    const xp = isCorrect ? 3 : isGameOver ? 1 : 0;

    if (isCorrect) {
      if (profile) {
        updateXP(profile.id, currentWeeklyXP + xp, currentTotalXP + xp);
      } else {
        setLocalProfileData({weekly_xp: currentWeeklyXP + xp, total_xp: currentTotalXP + xp, date: new Date()});
      }
    }

    if (isGameOver) {
      if (profile) {
        updateXP(profile.id, currentTotalXP + xp, currentTotalXP + xp);
      } else {
        setLocalProfileData({weekly_xp: currentWeeklyXP + 3, total_xp: currentTotalXP + xp, date: new Date()});
      }
    }
  }, [profile, isGameOver, isCorrect]);

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
      const audio = new Audio(currentWord.audio);
      audio
        .play()
        .catch(() => {
          let retryAttempts = 0;
          const maxRetryAttempts = 3;
          const retryDelay = 500; // half second

          const retryAudio = () => {
            if (retryAttempts < maxRetryAttempts) {
              retryAttempts++;
              console.log("retrying");
              audio.src = currentWord.audio;
              audio.play();
            } else {
              alert(t("warning.audioError"));
              startGame();
            }
          };
          setTimeout(retryAudio, retryDelay);
        })
        .then(() => {
          inputRefsArray[currentIndex].current?.focus();
        });
    }

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
