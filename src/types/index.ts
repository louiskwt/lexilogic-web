export type WordData = {
  word: string;
  pos: string;
  audio?: string;
  meaning: string;
  en_meaning: string;
};

export type LocalWords = {
  words: WordData[];
  createdAt: Date;
};

export type PhraseData = {
  phrase: string;
  meaning: string;
  audio?: string;
};

export type LocalPhrases = {
  phrases: PhraseData[];
  createdAt: Date;
};
