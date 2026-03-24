import {ISquare, WordHint} from "@/types";
import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import GameOverDisplay from "../components/GameOverDisplay";
import Modal from "../components/Modal";
import {findVowels, getWord} from "../utils";
import {useLanguageContext} from "./LanguageContext";

export type PhraserContextValue = {
  rows: ISquare[][];
  currentRow: number;
  currentCol: number;
  misplacedLetters: string[];
  correctLetters: string[];
  wrongLetters: string[];
  wordHint: WordHint;
  isFetchingWord: boolean;
  handleKeyPress: (key: string) => void;
  handleEnter: () => void;
  handleBackspace: () => void;
};

const PhraserContext = createContext<PhraserContextValue | undefined>(undefined);

export const usePhraserContext = () => {
  const context = useContext(PhraserContext);
  if (context === undefined) throw new Error("usePhraseContext must be used withint a PhraseProvder");
  return context;
};

export const PhraserProvider: FC<{children: ReactNode}> = ({children}) => {
  const [rows, setRows] = useState<ISquare[][]>(
    Array.from({length: 6}).map(() =>
      Array(5).fill({
        character: " ",
        correct: false,
        misplaced: false,
      }),
    ),
  );
  const [word, setWord] = useState<string>("");
  const [currentFrequency, setCurrentFrequency] = useState<number>(Infinity);
  const [usedWords, setUsedWords] = useState<Set<string | unknown>>(new Set());
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState<boolean>(false);
  const [gameOverTitle, setGameOverTitle] = useState<string>("");
  const [gameOverMessage, setGameOverMessage] = useState<string>("");
  const [isFetchingWord, setIsFetchingWord] = useState<boolean>(true);
  // const [gameState, setGameState] = useState<GameState>(null);
  const [wordHint, setWordHint] = useState<WordHint>({
    meaning: "",
    pos: "",
    vowels: [],
  });
  const {t} = useLanguageContext();

  const handleKeyPress = useCallback(
    (key: string) => {
      if (currentCol < word.length) {
        const newRows = [...rows];
        newRows[currentRow][currentCol] = {
          character: key.toUpperCase(),
          correct: false,
          misplaced: false,
        };
        setRows(newRows);
        const nextStep = currentCol + 1 < word.length && newRows[currentRow][currentCol + 1].character === "-" ? 2 : 1;
        setCurrentCol(currentCol + nextStep);
      }
    },
    [rows, currentCol, currentRow],
  );

  const handleChecking = useCallback(
    (guess: string[]) => {
      const misplaced: string[] = [...misplacedLetters];
      const correct: string[] = [...correctLetters];
      const wrong: string[] = [...wrongLetters];
      const newRows = [...rows];

      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === word[i]) {
          correct.push(guess[i]);
          newRows[currentRow][i].correct = true;
        } else if (word.includes(guess[i])) {
          misplaced.push(guess[i]);
          newRows[currentRow][i].misplaced = true;
        } else {
          wrong.push(guess[i]);
        }
      }
      setMisplacedLetters(misplaced);
      setCorrectLetters(correct);
      setWrongLetters(wrong);
      setRows(newRows);

      return guess.join("") === word;
    },
    [setRows, setCorrectLetters, setMisplacedLetters, currentRow, rows, word],
  );

  const handleNextGame = () => location.reload();

  const handleEnter = useCallback(() => {
    if (currentCol < word.length) {
      alert(t("warning.notEnoughLetter"));
      return;
    }

    const guess = rows[currentRow].map((col) => col.character);
    const isCorrect = handleChecking(guess);

    if (!isCorrect && currentRow === 5) {
      setTimeout(() => {
        setGameOverTitle(t("phrasePuzzle.gameOver.title"));
        setGameOverMessage(t("phrasePuzzle.gameOver.message"));
        setIsGameOverModalOpen(true);
      }, 1000);
    }

    if (isCorrect) {
      setTimeout(() => {
        setGameOverTitle(t("phrasePuzzle.correct"));
        setGameOverMessage(t("phrasePuzzle.winningMessage"));
        setIsGameOverModalOpen(true);
      }, 1000);
    } else {
      setCurrentRow(currentRow + 1);
      setCurrentCol(0);
    }
  }, [currentRow, currentCol, rows, handleChecking]);

  const handleBackspace = useCallback(() => {
    if (currentCol > 0) {
      const newRows = [...rows];
      const prevCharacter = newRows[currentRow][currentCol - 1].character;
      const next = prevCharacter === "-" ? 2 : 1;
      newRows[currentRow][currentCol - next].character = " ";
      setRows(newRows);
      setCurrentCol(currentCol - next);
    }
  }, [currentCol, rows, currentRow]);

  useEffect(() => {
    if (!isFetchingWord) return;
    let cancelled = false;

    const fetchRandomWord = async () => {
      try {
        const wordData = await getWord(Infinity, currentFrequency, usedWords);
        if (cancelled) return;
        if (wordData?.picked) {
          setWord(wordData.picked.word.toUpperCase());
          setWordHint({
            meaning: wordData.picked.meaning,
            pos: wordData.picked.pos,
            vowels: findVowels(wordData.picked.word),
          });
          setCurrentFrequency(wordData.nextFrequency);
          setUsedWords(new Set(wordData.usedWords));
          setRows(
            Array.from({length: 6}).map(() =>
              Array(wordData.picked?.word.length).fill({
                character: " ",
                correct: false,
                misplaced: false,
              }),
            ),
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (!cancelled) setIsFetchingWord(false);
      }
    };
    fetchRandomWord();
    return () => {
      cancelled = true;
    };
  }, [isFetchingWord]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Backspace") handleBackspace();
      if (e.key === "Enter") handleEnter();
      if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) handleKeyPress(e.key);
    };
    window.addEventListener("keydown", handler, false);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [handleBackspace, handleEnter, handleKeyPress]);

  // useEffect(() => {
  //   const localProfileData = getLocalProfileData();
  //   const currentWeeklyXP = profile ? profile.weekly_xp : localProfileData ? localProfileData.weekly_xp : 0;
  //   const currentTotalXP = profile ? profile.total_xp : localProfileData ? localProfileData.total_xp : 0;
  //   const xp = gameState === 1 ? 3 : gameState === 0 ? 1 : 0;
  //   const multiplier = currentRow < 3 ? 2 : 1;

  //   if (!profile) setLocalProfileData({weekly_xp: currentWeeklyXP + xp * multiplier, total_xp: currentTotalXP + xp * multiplier, date: new Date(), meaning_lang: "en"});
  // }, [gameState, profile]);

  return (
    <PhraserContext.Provider
      value={{
        rows,
        currentRow,
        currentCol,
        correctLetters,
        misplacedLetters,
        wrongLetters,
        wordHint,
        isFetchingWord,
        handleKeyPress,
        handleEnter,
        handleBackspace,
      }}>
      {children}
      <Modal isOpen={isGameOverModalOpen} onClose={() => setIsGameOverModalOpen(false)} children={<GameOverDisplay title={gameOverTitle} message={gameOverMessage} answer={word.toLowerCase()} meaning={wordHint.meaning} pos="exp" handleNewGame={handleNextGame} />} />
    </PhraserContext.Provider>
  );
};
