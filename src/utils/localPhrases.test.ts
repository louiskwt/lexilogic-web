import {LocalPhrases} from "@/types";
import {describe, expect, it} from "vitest";
import {getLocalPhrases} from ".";

describe("getLocalPhrases", () => {
  it("should return null if no local phrase is found", () => {
    expect(getLocalPhrases()).toBeNull();
  });

  it("should return all the phrases if the phrases are stored", () => {
    const mockPhrases: LocalPhrases = {
      phrases: [
        {phrase: "sky", meaning: "lorem ipsum", audio: "lorem ipsum", en_meaning: "lorem ipsum"},
        {phrase: "sun", audio: "loremipsum", meaning: "lorem ipsum", en_meaning: "lorem ipsum"},
        {phrase: "pizza", audio: "loremipsum", meaning: "lorem ipsum", en_meaning: "lorem ipsum"},
      ],
      createdAt: `${new Date("2025-02-03T09:36:20.749Z")}`,
    };
    localStorage.setItem("phrases", JSON.stringify(mockPhrases));
    const localDicationWords = getLocalPhrases();
    expect(localDicationWords).toEqual(mockPhrases);
  });
});
