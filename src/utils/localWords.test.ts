import {LocalWords} from "@/types";
import {describe, expect, it} from "vitest";
import {getLocalWords} from ".";

describe("getLocalWord", () => {
  it("should return null if no local dictation words is found", () => {
    expect(getLocalWords("dictationWords")).toBeNull();
  });

  it("should return null if no local wordle words is found", () => {
    expect(getLocalWords("wordleWords")).toBeNull();
  });

  it("should return all the dictation words if the dictation words are stored", () => {
    const mockDictationWords: LocalWords = {
      words: [
        {word: "sky", pos: "noun", meaning: "lorem ipsum", audio: "lorem ipsum", en_meaning: "lorem ipsum"},
        {word: "sun", pos: "noun", audio: "loremipsum", meaning: "lorem ipsum", en_meaning: "lorem ipsum"},
        {word: "pizza", pos: "noun", audio: "loremipsum", meaning: "lorem ipsum", en_meaning: "lorem ipsum"},
      ],
      createdAt: `${new Date()}`,
    };
    localStorage.setItem("dictationWords", JSON.stringify(mockDictationWords));
    const localDicationWords = getLocalWords("dictationWords");
    expect(localDicationWords).toEqual(mockDictationWords);
  });

  it("should return all the wordle words if the wordle words are stored", () => {
    const mockWordleWords: LocalWords = {
      words: [
        {word: "lucky", pos: "adjective", meaning: "lorem ipsum", audio: "lorem ipsum", en_meaning: "lorem ipsum"},
        {word: "mired", pos: "adjective", audio: "loremipsum", meaning: "lorem ipsum", en_meaning: "lorem ipsum"},
        {word: "pizza", pos: "noun", audio: "loremipsum", meaning: "lorem ipsum", en_meaning: "lorem ipsum"},
      ],
      createdAt: `${new Date()}`,
    };
    localStorage.setItem("wordleWords", JSON.stringify(mockWordleWords));
    const localDicationWords = getLocalWords("wordleWords");
    expect(localDicationWords).toEqual(mockWordleWords);
  });
});
