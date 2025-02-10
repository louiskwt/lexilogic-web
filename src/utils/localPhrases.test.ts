import {LocalPhrases, PhraseData} from "@/types";
import {describe, expect, it, vi} from "vitest";
import {getLocalPhrases, storeLocalPhrases} from ".";

const mockPhrases: PhraseData[] = [
  {phrase: "sky", meaning: "lorem ipsum", audio: "lorem ipsum", en_meaning: "lorem ipsum"},
  {phrase: "sun", audio: "loremipsum", meaning: "lorem ipsum", en_meaning: "lorem ipsum"},
  {phrase: "pizza", audio: "loremipsum", meaning: "lorem ipsum", en_meaning: "lorem ipsum"},
];

describe("getLocalPhrases", () => {
  it("should return null if no local phrase is found", () => {
    expect(getLocalPhrases()).toBeNull();
  });

  it("should return all the phrases if the phrases are stored", () => {
    const mockData: LocalPhrases = {
      phrases: mockPhrases,
      createdAt: `${new Date("2025-02-03T09:36:20.749Z")}`,
    };
    localStorage.setItem("phrases", JSON.stringify(mockData));
    const localDicationWords = getLocalPhrases();
    expect(localDicationWords).toEqual(mockData);
  });
});

describe("storeLocalPhrases", () => {
  it("should store the phrases in localStorge with the specified format", () => {
    const mockDate = new Date("2024-01-28");
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    storeLocalPhrases(mockPhrases, mockDate);

    expect(setItemSpy).toHaveBeenCalledWith("phrases", JSON.stringify({phrases: mockPhrases, createdAt: mockDate.toISOString()}));
    setItemSpy.mockRestore();
  });

  // this can fail due to some nanosecond diff
  it("should use the current date if no date is provided and store words properly", () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    storeLocalPhrases(mockPhrases);
    expect(setItemSpy).toHaveBeenCalledWith("phrases", JSON.stringify({phrases: mockPhrases, createdAt: new Date().toISOString()}));
    setItemSpy.mockRestore();
  });
});
