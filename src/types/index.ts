export type WordData = {
  id?: number | null;
  word: string;
  pos: string;
  audio?: string;
  meaning: string;
  en_meaning: string;
};

export type LocalWords = {
  words: WordData[];
  createdAt: Date | string;
};

export type PhraseData = {
  phrase: string;
  meaning: string;
  audio?: string;
  en_meaning: string;
};

export type LocalPhrases = {
  phrases: PhraseData[];
  createdAt: Date;
};

export interface ISquare {
  character: string;
  correct: boolean;
  misplaced: boolean;
}

export type GameState = 0 | 1 | null;

export type WordHint = {
  meaning: string;
  pos: string;
  vowels: string[];
};

export interface IWord {
  word: string;
  audio: string;
}

export interface IUserInput {
  character: string;
  correct: boolean;
}

export type LearnedWordPayload = {
  word_id: number | null;
  profile_id: string;
  latest_correct: boolean;
};

export type LangaugeOptions = "zh" | "en";

export interface ProfileData {
  weekly_xp: number;
  total_xp: number;
  date?: Date;
  meaning_lang: LangaugeOptions;
}
