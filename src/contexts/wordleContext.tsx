import {createContext, FC, ReactNode, useContext, useState} from "react";

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
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);

  const handleKeyPress = (key: string) => {
    if (currentCol < 5) {
      const newRows = [...rows];
      newRows[currentRow][currentCol] = key;
      setRows(newRows);
      setCurrentCol(currentCol + 1);
    }
  };

  const handleEnter = () => {
    if (currentRow < 6) {
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
