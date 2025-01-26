import {LocalPhrases, LocalWords, PhraseData, WordData} from "@/types";
import supabase from "../supabaseClient";

export interface ProfileData {
  weekly_xp: number;
  total_xp: number;
  date?: Date;
  meaning_lang: "zh" | "en";
}

export function findVowels(word: string): string[] {
  const vowels = ["a", "e", "i", "o", "u"];
  const foundVowels = [];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      foundVowels.push(word[i]);
    }
  }
  return Array.from(new Set(foundVowels));
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
  return timeDiffInMilliseconds >= oneWeekInMilliseconds && timeDiffInMilliseconds < 2 * oneWeekInMilliseconds;
}

export async function updateXP(profileId: string, weeklyXP: number, totalXP: number) {
  const {error} = await supabase.from("profiles").update({weekly_xp: weeklyXP, total_xp: totalXP}).eq("id", profileId);

  if (error) {
    setLocalProfileData({
      weekly_xp: weeklyXP,
      total_xp: totalXP,
      date: new Date(),
    });
  }
}

export function getLocalWords(format: string): LocalWords | null {
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
