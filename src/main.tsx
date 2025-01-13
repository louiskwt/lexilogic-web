import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import App from "./App.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {DictatorProvider} from "./contexts/DictatorContext.tsx";
import {WordleProvider} from "./contexts/WordleContext.tsx";
import Dictator from "./games/Dictator.tsx";
import Wordle from "./games/Wordle.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
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
          <Route
            path="/dictator"
            element={
              <DictatorProvider>
                <Dictator />
              </DictatorProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
