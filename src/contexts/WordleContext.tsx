import {ISquare, WordHint} from "@/types";
import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import GameOverDisplay from "../components/GameOverDisplay";
import Modal from "../components/Modal";
import {findVowels, getWord} from "../utils";
import {useLanguageContext} from "./LanguageContext";

export type WordleContextValue = {
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

export const WordleContext = createContext<WordleContextValue | undefined>(undefined);

export const useWordleContext = () => {
  const context = useContext(WordleContext);
  if (context === undefined) throw new Error("useWordleContext must be used withint a WordlerProvder");
  return context;
};

export const WordleProvider: FC<{children: ReactNode}> = ({children}) => {
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
  const [currenFrequency, setCurrentFrequency] = useState<number>(Infinity);
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
  const [wordHint, setWordHint] = useState<WordHint>({
    meaning: "",
    pos: "",
    vowels: [],
  });

  const {t} = useLanguageContext();

  const handleKeyPress = useCallback(
    (key: string) => {
      if (currentCol < 5) {
        const newRows = [...rows];
        newRows[currentRow][currentCol] = {
          character: key.toUpperCase(),
          correct: false,
          misplaced: false,
        };
        setRows(newRows);
        setCurrentCol(currentCol + 1);
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
    if (currentCol < 5) {
      alert(t("warning.notEnoughLetter"));
      return;
    }

    const guess = rows[currentRow].map((col) => col.character);
    const isCorrect = handleChecking(guess);

    if (!isCorrect && currentRow === 5) {
      setTimeout(() => {
        setGameOverTitle(t("wordWonder.gameOver.title"));
        setGameOverMessage(t("wordWonder.gameOver.message"));
        setIsGameOverModalOpen(true);
      }, 1000);
    }

    if (isCorrect) {
      setTimeout(() => {
        setGameOverTitle(t("wordWonder.correct"));
        setGameOverMessage(t("wordWonder.winningMessage"));
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
      newRows[currentRow][currentCol - 1].character = " ";
      setRows(newRows);
      setCurrentCol(currentCol - 1);
    }
  }, [currentCol, rows, currentRow]);

  useEffect(() => {
    if (!isFetchingWord) return;
    let cancelled = false;
    if (isFetchingWord) {
      const fetchRandomWord = async () => {
        try {
          const wordData = await getWord(5, currenFrequency, usedWords);
          if (cancelled) return;
          if (wordData?.picked) {
            setWordHint({
              meaning: wordData.picked.meaning,
              pos: wordData.picked.pos,
              vowels: findVowels(wordData.picked.word),
            });
            console.log(wordData.picked.word);
            setWord(wordData.picked.word.toUpperCase());
            setCurrentFrequency(wordData.nextFrequency);
            setUsedWords(usedWords.add(wordData.picked.word));
          }
        } catch (error) {
          console.error(error);
        } finally {
          if (!cancelled) setIsFetchingWord(false);
        }

        setIsFetchingWord(false);
      };
      fetchRandomWord();
    }
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

  return (
    <WordleContext.Provider
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
      <Modal isOpen={isGameOverModalOpen} onClose={() => setIsGameOverModalOpen(false)} children={<GameOverDisplay title={gameOverTitle} message={gameOverMessage} answer={word.toLowerCase()} pos={wordHint.pos} meaning={wordHint.meaning} handleNewGame={handleNextGame} />} />
    </WordleContext.Provider>
  );
};
