import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {describe, expect, it} from "vitest";
import App from "./App";
import {AuthProvider} from "./contexts/AuthContext";
import {LanguageProvider} from "./contexts/LanguageContext";

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
  });
});
