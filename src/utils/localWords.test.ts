import {LocalWords, WordData} from "@/types";
import {describe, expect, it, vi} from "vitest";
import {getLocalWords, storeLocalWords} from ".";

const mockWords: WordData[] = [
  {word: "sky", pos: "noun", meaning: "lorem ipsum", audio: "lorem ipsum", en_meaning: "lorem ipsum"},
  {word: "sun", pos: "noun", audio: "loremipsum", meaning: "lorem ipsum", en_meaning: "lorem ipsum"},
  {word: "pizza", pos: "noun", audio: "loremipsum", meaning: "lorem ipsum", en_meaning: "lorem ipsum"},
];

describe("getLocalWord", () => {
  it("should return null if no local dictation words is found", () => {
    expect(getLocalWords("dictationWords")).toBeNull();
  });

  it("should return null if no local wordle words is found", () => {
    expect(getLocalWords("wordleWords")).toBeNull();
  });

  it("should return all the dictation words if the dictation words are stored", () => {
    const mockDictationWords: LocalWords = {
      words: mockWords,
      createdAt: `${new Date()}`,
    };
    localStorage.setItem("dictationWords", JSON.stringify(mockDictationWords));
    const localDicationWords = getLocalWords("dictationWords");
    expect(localDicationWords).toEqual(mockDictationWords);
  });

  it("should return all the wordle words if the wordle words are stored", () => {
    const mockWordleWords: LocalWords = {
      words: mockWords,
      createdAt: `${new Date()}`,
    };
    localStorage.setItem("wordleWords", JSON.stringify(mockWordleWords));
    const localDicationWords = getLocalWords("wordleWords");
    expect(localDicationWords).toEqual(mockWordleWords);
  });
});

describe("storeLocalWords", () => {
  it("should store the words in localStorge with the specified format", () => {
    const format = "wordleWords";
    const mockDate = new Date("2024-01-28");

    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    storeLocalWords(mockWords, format, mockDate);

    expect(setItemSpy).toHaveBeenCalledWith(format, JSON.stringify({words: mockWords, createdAt: mockDate.toISOString()}));
    setItemSpy.mockRestore();
  });

  it("should use the current date if no date is provided and store words properly", () => {
    const format = "dictationWords";
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    storeLocalWords(mockWords, format);

    expect(setItemSpy).toHaveBeenCalledWith(format, JSON.stringify({words: mockWords, createdAt: new Date().toISOString()}));
    setItemSpy.mockRestore();
  });
});
