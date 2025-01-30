import {render, screen} from "@testing-library/react";
import {describe, it} from "vitest";
import App from "./App";
import {AuthProvider} from "./contexts/AuthContext";
import {LanguageProvider} from "./contexts/LanguageContext";

describe("App Rendering", () => {
  it("renders the App component", () => {
    render(
      <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LanguageProvider>
    );

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
