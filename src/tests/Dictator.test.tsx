import {IUserInput, IWord, WordHint} from "@/types/index.ts";
import "@testing-library/jest-dom/vitest";
import {cleanup, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {AuthProvider} from "../contexts/AuthContext.tsx";
import {DictatorContext, DictatorProvider} from "../contexts/DictatorContext";
import {LanguageProvider} from "../contexts/LanguageContext";
import Dictator from "../games/Dictator";
import "../i18n.ts";

describe("DictatorGame", () => {
  const mockCurrentWord: IWord = {word: "cat", audio: "cat"};
  const mockUserInput: IUserInput[] = Array.from({length: 3}).map(() => {
    return {character: "", correct: false};
  });
  const mockWordHint: WordHint = {pos: "noun", meaning: "a fluffy animal", vowels: ["a"]};
  const DictatorCtxValues = {
    currentWord: mockCurrentWord,
    userInput: mockUserInput,
    isCorrect: false,
    currentIndex: 0,
    inputRefsArray: [],
    tries: 5,
    isGameOver: false,
    wordHint: mockWordHint,
    isFetchingWord: false,
    startGame: () => {},
    handleUserInput: () => {},
    playAudio: () => {},
    setCurrentIndex: () => {},
    checkAns: () => {},
  };

  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("should render the start game page when not fetching word and not game over", async () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <AuthProvider>
            <DictatorProvider>
              <Dictator />
            </DictatorProvider>
          </AuthProvider>
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText("Start Game")).toBeInTheDocument();
  });

  it("should render the game over page when game is over", async () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <AuthProvider>
            <DictatorContext.Provider value={{...DictatorCtxValues, isGameOver: true}}>
              <Dictator />
            </DictatorContext.Provider>
          </AuthProvider>
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText("Oops!")).toBeInTheDocument();
    expect(await screen.findByText("Try Again")).toBeInTheDocument();
  });
});
