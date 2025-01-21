import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import GameOverDisplay from "../components/GameOverDisplay";
import Modal from "../components/Modal";
import supabase from "../supabaseClient";
import {findVowels, getLocalProfileData, setLocalProfileData, updateXP} from "../utils";
import {useAuthContext} from "./AuthContext";
import {useLanguageContext} from "./LanguageContext";
import {WordHint} from "./WordleContext";

interface ISquare {
  character: string;
  correct: boolean;
  misplaced: boolean;
}

type GameState = 0 | 1 | null;

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
      })
    )
  );
  const [phrase, setPhrase] = useState<string>("");
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
  const {t} = useLanguageContext();

  const {profile} = useAuthContext();

  const handleKeyPress = useCallback(
    (key: string) => {
      if (currentCol < phrase.length) {
        const newRows = [...rows];
        newRows[currentRow][currentCol] = {
          character: key.toUpperCase(),
          correct: false,
          misplaced: false,
        };
        setRows(newRows);
        const nextStep = currentCol + 1 < phrase.length && newRows[currentRow][currentCol + 1].character === "-" ? 2 : 1;
        setCurrentCol(currentCol + nextStep);
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
        if (guess[i] === phrase[i]) {
          correct.push(guess[i]);
          newRows[currentRow][i].correct = true;
        } else if (phrase.includes(guess[i])) {
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

      return guess.join("") === phrase;
    },
    [setRows, setCorrectLetters, setMisplacedLetters, currentRow, rows, phrase]
  );

  const handleNextGame = () => location.reload();

  const handleEnter = useCallback(() => {
    if (currentCol < phrase.length) {
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
        setGameState(0);
      }, 1000);
    }

    if (isCorrect) {
      setTimeout(() => {
        setGameOverTitle(t("phrasePuzzle.correct"));
        setGameOverMessage(t("phrasePuzzle.winningMessage"));
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
      const next = newRows[currentRow][currentCol - 2].character === "-" ? 2 : 1;
      setCurrentCol(currentCol - next);
    }
  }, [currentCol, rows, currentRow]);

  useEffect(() => {
    const fetchRandomWord = async () => {
      const {data, error} = await supabase.from("random_phrases").select("phrase, en_meaning, meaning").limit(1).single();
      if (error) {
        console.error("Error fetching phrase: ", error);
      } else if (data) {
        setPhrase(data.phrase.toUpperCase());
        setRows(
          Array.from({length: 6}).map(() => {
            const array = data.phrase.split("").map((c: string) => {
              if (c === "-") {
                return {
                  character: c,
                  correct: false,
                  misplaced: false,
                };
              } else {
                return {
                  character: "",
                  correct: false,
                  misplaced: false,
                };
              }
            });
            return array;
          })
        );
        setWordHint({
          meaning: data.meaning,
          pos: "",
          vowels: findVowels(data.phrase),
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
      <Modal isOpen={isGameOverModalOpen} onClose={() => setIsGameOverModalOpen(false)} children={<GameOverDisplay title={gameOverTitle} message={gameOverMessage} answer={phrase} handleNewGame={handleNextGame} />} />
    </PhraserContext.Provider>
  );
};
