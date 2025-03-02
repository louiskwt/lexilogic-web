import {GameState, ISquare, WordData, WordHint} from "@/types";
import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import GameOverDisplay from "../components/GameOverDisplay";
import Modal from "../components/Modal";
import supabase from "../supabaseClient";
import {findVowels, generateRandomIndex, getLocalProfileData, getLocalWords, getMeaningLangPreference, isDateOneDayBefore, setLocalProfileData, storeLocalWords, updateXP, upsertLearnedWords} from "../utils";
import {useAuthContext} from "./AuthContext";
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
      })
    )
  );
  const [word, setWord] = useState<string>("");
  const [wordId, setWordId] = useState<number | null>(null);
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
        setGameState(0);
      }, 1000);
    }

    if (isCorrect) {
      setTimeout(() => {
        setGameOverTitle(t("wordWonder.correct"));
        setGameOverMessage(t("wordWonder.winningMessage"));
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
      const localWords = getLocalWords("wordleWords");
      const hasEnMeaning = localWords?.words.every((w) => "en_meaning" in w) || false; // temporary measure; can remove after a while
      const oneDayBefore = localWords ? isDateOneDayBefore(new Date(), new Date(localWords.createdAt)) : false;
      let randomWordData: WordData = {id: null, meaning: "", pos: "", word: "", en_meaning: ""};

      if (localWords && localWords.words.length > 10 && !oneDayBefore && hasEnMeaning) {
        const randomIndex = generateRandomIndex(localWords.words.length);
        randomWordData = localWords.words[randomIndex];
        storeLocalWords(
          localWords.words.filter((w) => w.word !== randomWordData.word),
          "wordleWords",
          localWords.createdAt
        );
      } else {
        const {data, error} = await supabase.from("random_wordle_words").select("id, word, pos, meaning, en_meaning").limit(100);
        if (error) {
          console.error("Error fetching word: ", error);
        } else if (data) {
          const randomIndex = generateRandomIndex(data.length);
          randomWordData = data[randomIndex];
          storeLocalWords(data, "wordleWords");
        }
      }
      const meaningLangPreference = getMeaningLangPreference();
      const randomWordId = "id" in randomWordData && typeof randomWordData.id === "number" ? randomWordData.id : null;
      setWord(randomWordData.word.toUpperCase());
      setWordId(randomWordId);
      setWordHint({
        meaning: meaningLangPreference === "en" ? randomWordData.en_meaning : randomWordData.meaning,
        pos: randomWordData.pos,
        vowels: findVowels(randomWordData.word),
      });
      setIsFetchingWord(false);
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
    const currentTotalXP = profile ? profile.total_xp : localProfileData ? localProfileData.total_xp : 0;
    const xp = gameState === 1 ? 3 : gameState === 0 ? 1 : 0;
    const multiplier = currentRow < 3 ? 2 : 1;

    if (gameState === 0) {
      if (profile) updateXP(profile.id, currentWeeklyXP + xp, currentTotalXP + xp);
    }

    if (gameState === 1) {
      if (profile) updateXP(profile.id, currentWeeklyXP + xp * multiplier, currentTotalXP + xp * multiplier);
    }
    if (!profile) setLocalProfileData({weekly_xp: currentWeeklyXP + xp * multiplier, total_xp: currentTotalXP + xp * multiplier, date: new Date(), meaning_lang: "en"});

    if (gameState !== null && profile) {
      // upsert learned word
      const learnedWordPayload = {
        profile_id: profile.id,
        word_id: wordId,
        latest_correct: gameState === 1 ? true : false,
      };
      upsertLearnedWords(learnedWordPayload);
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
      <Modal isOpen={isGameOverModalOpen} onClose={() => setIsGameOverModalOpen(false)} children={<GameOverDisplay title={gameOverTitle} message={gameOverMessage} answer={word.toLowerCase()} pos={wordHint.pos} meaning={wordHint.meaning} handleNewGame={handleNextGame} />} />
    </WordleContext.Provider>
  );
};
