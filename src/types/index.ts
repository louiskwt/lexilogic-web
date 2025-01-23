type CreatedAt = {
  createdAt: Date;
};

export type WordData = {
  word: string;
  pos: string;
  audio?: string;
  meaning: string;
};

export type LocalWords = WordData & CreatedAt;

export type PhraseData = {
  phrase: string;
  meaning: string;
  audio?: string;
};

export type LocalPhrases = PhraseData & CreatedAt;
