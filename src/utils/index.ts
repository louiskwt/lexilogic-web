import supabase from "../supabaseClient";

export interface ProfileData {
  weekly_xp: number;
  total_xp: number;
  date: Date;
}

export function findVowels(word: string): string[] {
  const vowels = ["a", "e", "i", "o", "u"];
  const foundVowels = [];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      foundVowels.push(word[i]);
    }
  }
  return foundVowels;
}

export function getLocalProfileData(): ProfileData | null {
  const storedData = localStorage.getItem("profileData");
  if (storedData) {
    return JSON.parse(storedData) as ProfileData;
  }
  return null;
}

export function setProfileData(data: ProfileData): void {
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
    setProfileData({
      weekly_xp: weeklyXP,
      total_xp: totalXP,
      date: new Date(),
    });
  }
}
