import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import App from "./App.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {DictatorProvider} from "./contexts/DictatorContext.tsx";
import {LanguageProvider} from "./contexts/LanguageContext.tsx";
import {PhraserProvider} from "./contexts/PhraserContext.tsx";
import {WordleProvider} from "./contexts/WordleContext.tsx";
import Dictator from "./games/Dictator.tsx";
import Phraser from "./games/Phraser.tsx";
import Wordle from "./games/Wordle.tsx";
import "./i18n.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/word-wonder"
              element={
                <WordleProvider>
                  <Wordle />
                </WordleProvider>
              }
            />
            <Route
              path="/spell-genius"
              element={
                <DictatorProvider>
                  <Dictator />
                </DictatorProvider>
              }
            />
            <Route
              path="/phrase-puzzle"
              element={
                <PhraserProvider>
                  <Phraser />
                </PhraserProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>
);
