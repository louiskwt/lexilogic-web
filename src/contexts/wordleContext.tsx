import {createContext, FC, ReactNode, useState} from "react";

export interface IWordleState {
  word: string;
  rows: string[][];
  over: boolean;
}

export type WordleContextType = {
  gameState: IWordleState;
  rowIndex: number;
  checkRow: (row: string[], word: string) => void;
};

export const WordleContext = createContext<WordleContextType | null>(null);

const WordleProvider: FC<{children: ReactNode}> = ({children}) => {
  const [gameState, setGameState] = useState<IWordleState>({word: "words", rows: Array.from({length: 6}).map(() => Array(5).fill(" ")), over: false});
  const [rowIndex, setRowIndex] = useState<number>(0);

  const checkRow = (row: string[], word: string) => {
    if (row.join("") === word) {
      return;
    }
  };

  return (
    <WordleContext.Provider
      value={{
        gameState,
        rowIndex,
        checkRow,
      }}>
      {children}
    </WordleContext.Provider>
  );
};

export default WordleProvider;
