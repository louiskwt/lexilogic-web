import {AuthProvider} from "@contexts/AuthContext.tsx";
import {DictatorProvider} from "@contexts/DictatorContext.tsx";
import {PhraserProvider} from "@contexts/PhraserContext.tsx";
import {WordleProvider} from "@contexts/WordleContext.tsx";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import App from "./App.tsx";
import Dictator from "./games/Dictator.tsx";
import Phraser from "./games/Phraser.tsx";
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
          <Route
            path="/phraser"
            element={
              <PhraserProvider>
                <Phraser />
              </PhraserProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
