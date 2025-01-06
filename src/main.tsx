import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import App from "./App.tsx";
import {WordleProvider} from "./contexts/wordleContext.tsx";
import Wordle from "./games/Wordle.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/wordle"
          element={
            <WordleProvider>
              <Wordle />
            </WordleProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
