import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import supabase from "../supabaseClient";

interface ISquare {
  character: string;
  correct: boolean;
  misplaced: boolean;
}

export type WordleContextValue = {
  rows: ISquare[][];
  currentRow: number;
  currentCol: number;
  misplacedLetters: string[];
  correctLetters: string[];
  handleKeyPress: (key: string) => void;
  handleEnter: () => void;
  handleBackspace: () => void;
};

const WordleContext = createContext<WordleContextValue | undefined>(undefined);

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
      })
    )
  );
  const [word, setWord] = useState<string>("words");
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);

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
    [rows, currentCol, currentRow]
  );

  const handleChecking = useCallback(
    (guess: string[]) => {
      const misplaced: string[] = [];
      const correct: string[] = [];
      const newRows = [...rows];

      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === word[i]) {
          correct.push(guess[i]);
          newRows[currentRow][i].correct = true;
        } else if (word.includes(guess[i])) {
          misplaced.push(guess[i]);
          newRows[currentRow][i].misplaced = true;
        }
      }

      setMisplacedLetters(misplaced);
      setCorrectLetters(correct);
      setRows(newRows);

      return guess.join("") === word;
    },
    [setRows, setCorrectLetters, setMisplacedLetters, currentRow, rows, word]
  );

  const handleEnter = useCallback(() => {
    if (currentCol < 4) {
      alert("Not enough letters");
      return;
    }

    if (currentRow < 5) {
      const guess = rows[currentRow].map((col) => col.character);
      const isCorrect = handleChecking(guess);
      if (isCorrect) {
        alert("You win");
      } else {
        setCurrentRow(currentRow + 1);
        setCurrentCol(0);
      }
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
    const fetchRandomWord = async () => {
      const {data, error} = await supabase.from("words").select("word").order("id").limit(1);
      if (error) {
        console.error("Error fetching word: ", error);
      } else if (data) {
        console.log(data);
        setWord(data[0].word.toUpperCase());
      }
    };
    fetchRandomWord();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        handleBackspace();
      }
      if (e.key === "Enter") {
        handleEnter();
      }
      if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key);
      }
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
        handleKeyPress,
        handleEnter,
        handleBackspace,
      }}>
      {children}
    </WordleContext.Provider>
  );
};
