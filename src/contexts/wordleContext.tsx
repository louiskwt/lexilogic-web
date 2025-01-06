import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import supabase from "../supabaseClient";

export type WordleContextValue = {
  rows: string[][];
  currentRow: number;
  currentCol: number;
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
  const [rows, setRows] = useState<string[][]>(Array.from({length: 6}).map(() => Array(5).fill(" ")));
  const [word, setWord] = useState<string>("words");
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);

  useEffect(() => {
    const fetchRandomWord = async () => {
      const {data, error} = await supabase.from("words").select("word").order("id").limit(1);
      if (error) {
        console.error("Error fetching word: ", error);
      } else if (data) {
        console.log(data);
        setWord(data[0].word);
      }
    };
    fetchRandomWord();
  }, []);

  const handleKeyPress = (key: string) => {
    if (currentCol < 5) {
      const newRows = [...rows];
      newRows[currentRow][currentCol] = key;
      setRows(newRows);
      setCurrentCol(currentCol + 1);
    }
  };

  const handleChecking = (guess: string) => {
    return guess === word;
  };

  const handleEnter = () => {
    if (currentCol < 4) {
      alert("Not enough letters");
      return;
    }

    if (currentRow < 6) {
      const guess = rows[currentRow].join("");

      setCurrentRow(currentRow + 1);
      setCurrentCol(0);
    }
  };

  const handleBackspace = () => {
    if (currentCol > 0) {
      const newRows = [...rows];
      newRows[currentRow][currentCol - 1] = " ";
      setRows(newRows);
      setCurrentCol(currentCol - 1);
    }
  };

  return (
    <WordleContext.Provider
      value={{
        rows,
        currentRow,
        currentCol,
        handleKeyPress,
        handleEnter,
        handleBackspace,
      }}>
      {children}
    </WordleContext.Provider>
  );
};
