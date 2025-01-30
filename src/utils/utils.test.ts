import {describe, expect, it} from "vitest";
import {findVowels} from ".";

describe("findVowels", () => {
  it("should return an empty array for an empty string", () => {
    const result = findVowels("");
    expect(result).toEqual([]);
  });

  it("should return a sorted array of unique vowels", () => {
    const result = findVowels("hEllO");
    expect(result).toEqual(["e", "o"]);
  });

  it("should return a sorted array of unique vowels in the correct order", () => {
    const result = findVowels("aeiou");
    expect(result).toEqual(["a", "e", "i", "o", "u"]);
  });

  it("should handle a word with repeated vowels", () => {
    const result = findVowels("computer");
    expect(result).toEqual(["e", "o", "u"]);
  });

  it("should handle a word with uppercase and lowercase vowels", () => {
    const result = findVowels("aBcEiOu");
    expect(result).toEqual(["a", "e", "i", "o", "u"]);
  });
});
