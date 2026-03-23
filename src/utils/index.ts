import {LangaugeOptions, LocalPhrases, PhraseData, PickedWord, ProfileData, WordData} from "@/types";
import PublicGoogleSheetsParser from "public-google-sheets-parser";

export function findVowels(word: string): string[] {
  if (!word) return [];
  const vowels = ["a", "e", "i", "o", "u"];
  const foundVowels = [];
  for (let i = 0; i < word.length; i++) {
    const letter = word[i].toLowerCase();
    if (vowels.includes(letter)) {
      foundVowels.push(letter);
    }
  }
  return Array.from(new Set(foundVowels)).sort((a, b) => vowels.indexOf(a) - vowels.indexOf(b));
}

export function getLocalProfileData(): ProfileData | null {
  const storedData = localStorage.getItem("profileData");
  if (storedData) {
    return JSON.parse(storedData) as ProfileData;
  }
  return null;
}

export function setLocalProfileData(data: ProfileData): void {
  localStorage.setItem("profileData", JSON.stringify(data));
}

export function isDateOneWeekBefore(currentDate: Date, referenceDate: Date) {
  // Calculate the difference in milliseconds between the two dates
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
  const timeDiffInMilliseconds = currentDate.getTime() - referenceDate.getTime();

  // Check if the time difference is within one week
  return timeDiffInMilliseconds >= oneWeekInMilliseconds;
}

export function isDateOneDayBefore(currentDate: Date, referenceDate: Date) {
  // Calculate the difference in milliseconds between the two dates
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const timeDiffInMilliseconds = currentDate.getTime() - referenceDate.getTime();
  return timeDiffInMilliseconds >= oneDayInMilliseconds;
}

// export async function updateXP(profileId: string, weeklyXP: number, totalXP: number) {
//   const {error} = await supabase.from("profiles").update({weekly_xp: weeklyXP, total_xp: totalXP}).eq("id", profileId);

//   if (error) {
//     setLocalProfileData({
//       weekly_xp: weeklyXP,
//       total_xp: totalXP,
//       date: new Date(),
//       meaning_lang: "zh",
//     });
//   }
// }

const LEXI_WORDS = "LEXI_WORDS";

export function getWord(length = 5, currentFrequency = Infinity, usedWords = new Set()): Promise<PickedWord> | null {
  try {
    const parser = new PublicGoogleSheetsParser("16FdDn6cew8nIrl70IQl-GyLfYMFsL1AOpAjMr1nf3rE");
    const word = parser
      .parse()
      .then((data: WordData[]) => {
        const wordData = pickWord(data, length, currentFrequency, usedWords);
        return wordData;
      })
      .catch((error) => {
        console.log(error);
        return {picked: null, nextFrequency: Infinity, usedWords: new Set()};
      });

    return word;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function pickWord(words: WordData[], length: number = 5, currentFrequency: number = Infinity, usedWords = new Set(), poolRatio = 0.2): PickedWord {
  const candidates = words.filter((w) => (length === 5 ? w.word.length === length : true) && w.frequency <= currentFrequency && !usedWords.has(w)).sort((a, b) => b.frequency - a.frequency);

  if (candidates.length === 0) return {picked: null, nextFrequency: 1, usedWords};

  const poolSize = Math.max(1, Math.ceil(candidates.length * poolRatio));
  const pool = candidates.slice(0, poolSize);
  const picked = pool[Math.floor(Math.random() * pool.length)];
  usedWords.add(picked.word);

  return {
    picked,
    nextFrequency: picked.frequency, // feed this back in on the next call
    usedWords,
  };
}

export function getLocalWords(): WordData[] | null {
  const words = localStorage.getItem(LEXI_WORDS);
  if (!words) return null;
  return JSON.parse(words);
}

export function storeLocalWords(words: WordData[]) {
  localStorage.setItem(LEXI_WORDS, JSON.stringify(words));
}

export function getLocalPhrases(): LocalPhrases | null {
  const phrases = localStorage.getItem("phrases");
  if (!phrases) return null;
  return JSON.parse(phrases);
}

export function storeLocalPhrases(phrases: PhraseData[], date: Date | string = new Date()) {
  localStorage.setItem("phrases", JSON.stringify({phrases, createdAt: date}));
}

export function generateRandomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

export function storeMeaningLangPreference(pref: LangaugeOptions) {
  const storedPref = localStorage.getItem("meaning_lang");
  if (!storedPref || storedPref !== pref) {
    localStorage.setItem("meaning_lang", pref);
  }
}

export function getDefaultLangPreference(): LangaugeOptions {
  return (localStorage.getItem("i18nextLng") as LangaugeOptions) === "zh" ? "zh" : "en";
}

export function getMeaningLangPreference(): LangaugeOptions {
  return (localStorage.getItem("meaning_lang") as LangaugeOptions) || getDefaultLangPreference();
}

// export async function upsertLearnedWords(payload: LearnedWordPayload) {
//   try {
//     if (payload.word_id) {
//       const {error} = await supabase.from("learned_words").upsert(payload).select();
//       if (error) throw error;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

export function truncateString(s: string, max: number | null = null): string {
  if (!max) return s;
  if (s.length > max) {
    return s.slice(0, max) + "...";
  } else {
    return s;
  }
}

export function hasPlayedBefore(game: "Dictator" | "Wordle" | "Phraser"): boolean {
  const playedBefore = localStorage.getItem(`played${game}Before`) === "true";
  if (!playedBefore) {
    localStorage.setItem(`played${game}Before`, "true");
    return playedBefore;
  }
  return playedBefore;
}
