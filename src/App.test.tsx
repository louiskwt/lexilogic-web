import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {describe, expect, it} from "vitest";
import App from "./App";
import {AuthProvider} from "./contexts/AuthContext";
import {LanguageProvider} from "./contexts/LanguageContext";
import "./i18n.ts";

describe("App", () => {
  it("should render the App component correctly", () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LanguageProvider>
      </MemoryRouter>
    );

    // Assert that the expected elements are rendered
    expect(screen.getByRole("img", {name: "Logo"})).toBeDefined();
    expect(screen.getByText("Lexigram")).toBeDefined();
    expect(screen.getAllByRole("link")).toBeDefined();
    expect(screen.getAllByText("Word Wonders")).toBeDefined();
    expect(screen.getAllByText("Phrase Puzzle")).toBeDefined();
    expect(screen.getAllByText("Spell Genius")).toBeDefined();
  });
});
