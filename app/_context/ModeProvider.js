"use client";
import { createContext, useEffect, useState } from "react";

export let ModeContext = createContext();

const ModeProvider = ({ children }) => {
  let [mode, setMode] = useState(localStorage.getItem("mode"));

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark");
      setMode("dark");
    } else {
      document.body.classList.remove("dark");
      setMode("light");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("mode", mode);
    }
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
