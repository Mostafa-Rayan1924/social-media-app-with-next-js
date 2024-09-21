"use client";
import { createContext, useEffect, useState } from "react";

export let ModeContext = createContext();

const ModeProvider = ({ children }) => {
  let [mode, setMode] = useState(null);

  useEffect(() => {
    // Ensure localStorage is accessed on the client-side
    const savedMode = localStorage.getItem("mode") || "light";
    setMode(savedMode);

    if (savedMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (mode) {
      localStorage.setItem("mode", mode);
      if (mode === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
