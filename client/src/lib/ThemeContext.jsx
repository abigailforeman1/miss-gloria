"use client";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeColor, setThemeColor] = useState("#F670C7");

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
