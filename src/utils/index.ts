import {LangaugeOptions, LearnedWordPayload, LocalPhrases, LocalWords, PhraseData, ProfileData, WordData} from "@/types";
import supabase from "../supabaseClient";

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

export async function updateXP(profileId: string, weeklyXP: number, totalXP: number) {
  const {error} = await supabase.from("profiles").update({weekly_xp: weeklyXP, total_xp: totalXP}).eq("id", profileId);

  if (error) {
    setLocalProfileData({
      weekly_xp: weeklyXP,
      total_xp: totalXP,
      date: new Date(),
      meaning_lang: "zh",
    });
  }
}

export function getLocalWords(format: "dictationWords" | "wordleWords"): LocalWords | null {
  const words = localStorage.getItem(format);
  if (!words) return null;
  return JSON.parse(words);
}

export function storeLocalWords(words: WordData[], format: string, date: Date = new Date()) {
  localStorage.setItem(format, JSON.stringify({words, createdAt: date}));
}

export function getLocalPhrases(): LocalPhrases | null {
  const phrases = localStorage.getItem("phrases");
  if (!phrases) return null;
  return JSON.parse(phrases);
}

export function storeLocalPhrases(phrases: PhraseData[], date: Date = new Date()) {
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

export async function upsertLearnedWords(payload: LearnedWordPayload) {
  try {
    if (payload.word_id) {
      const {error} = await supabase.from("learned_words").upsert(payload).select();
      if (error) throw error;
    }
  } catch (error) {
    console.log(error);
  }
}
