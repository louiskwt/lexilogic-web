import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import GameOverDisplay from "../components/GameOverDisplay";
import Modal from "../components/Modal";
import supabase from "../supabaseClient";
import {findVowels, getLocalProfileData, setLocalProfileData, updateXP} from "../utils";
import {useAuthContext} from "./AuthContext";

interface ISquare {
  character: string;
  correct: boolean;
  misplaced: boolean;
}

type GameState = 0 | 1 | null;

export type WordHint = {
  meaning: string;
  pos: string;
  vowels: string[];
};

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
      })
    )
  );
  const [word, setWord] = useState<string>("");
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState<boolean>(false);
  const [gameOverTitle, setGameOverTitle] = useState<string>("");
  const [gameOverMessage, setGameOverMessage] = useState<string>("");
  const [isFetchingWord, setIsFetchingWord] = useState<boolean>(true);
  const [gameState, setGameState] = useState<GameState>(null);
  const [wordHint, setWordHint] = useState<WordHint>({
    meaning: "",
    pos: "",
    vowels: [],
  });

  const {profile} = useAuthContext();

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
    [setRows, setCorrectLetters, setMisplacedLetters, currentRow, rows, word]
  );

  const handleNextGame = () => location.reload();

  const handleEnter = useCallback(() => {
    if (currentCol < 4) {
      alert("Not enough letters");
      return;
    }

    const guess = rows[currentRow].map((col) => col.character);
    const isCorrect = handleChecking(guess);

    if (!isCorrect && currentRow === 5) {
      setTimeout(() => {
        setGameOverTitle("Oh Noo : ( Game Over");
        setGameOverMessage(`答案是 ${word}! 下次加油啊～`);
        setIsGameOverModalOpen(true);
        setGameState(0);
      }, 1000);
    }

    if (isCorrect) {
      setTimeout(() => {
        setGameOverTitle("Yay! Correct!");
        setGameOverMessage(`你猜對了 好厲害啊👍～`);
        setIsGameOverModalOpen(true);
        setGameState(1);
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
    const fetchRandomWord = async () => {
      const {data, error} = await supabase.from("random_wordle_words").select("word, pos, meaning").limit(1).single();
      if (error) {
        console.error("Error fetching word: ", error);
      } else if (data) {
        setWord(data.word.toUpperCase());
        console.log(data);
        setWordHint({
          meaning: data.meaning,
          pos: data.pos,
          vowels: findVowels(data.word),
        });
        setIsFetchingWord(false);
      }
    };
    fetchRandomWord();
  }, []);

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

  useEffect(() => {
    const localProfileData = getLocalProfileData();
    const currentWeeklyXP = profile ? profile.weekly_xp : localProfileData ? localProfileData.weekly_xp : 0;
    const currentTotalXP = profile ? profile.weekly_xp : localProfileData ? localProfileData.total_xp : 0;
    const xp = gameState === 1 ? 3 : gameState === 0 ? 1 : 0;
    const multiplier = currentRow < 3 ? 2 : 1;

    if (gameState === 0) {
      if (profile) {
        updateXP(profile.id, currentWeeklyXP + xp, currentTotalXP + xp);
      } else {
        setLocalProfileData({weekly_xp: currentWeeklyXP + xp, total_xp: currentTotalXP + xp * multiplier, date: new Date()});
      }
    }

    if (gameState === 1) {
      if (profile) {
        updateXP(profile.id, currentWeeklyXP + xp * multiplier, currentTotalXP + xp * multiplier);
      } else {
        setLocalProfileData({weekly_xp: currentWeeklyXP + xp, total_xp: currentTotalXP + xp, date: new Date()});
      }
    }
  }, [gameState, profile]);

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
      <Modal isOpen={isGameOverModalOpen} onClose={() => setIsGameOverModalOpen(false)} children={<GameOverDisplay title={gameOverTitle} message={gameOverMessage} handleNewGame={handleNextGame} />} />
    </WordleContext.Provider>
  );
};
