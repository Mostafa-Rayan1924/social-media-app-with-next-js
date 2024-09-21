"use client";
import { createContext, useEffect, useState } from "react";

// إنشاء السياق
export let ModeContext = createContext();

const ModeProvider = ({ children }) => {
  let [mode, setMode] = useState(localStorage.getItem("mode")); // تعيين الوضع الافتراضي

  // تحديث الكلاس الخاص بالوضع في body عند تغيير الوضع
  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark");
      setMode("dark");
    } else {
      document.body.classList.remove("dark");
      setMode("light");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("mode", mode); // تخزين الوضع في localStorage
    }
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
