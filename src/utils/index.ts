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
