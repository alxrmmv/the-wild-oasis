/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // Initialize isDarkMode state from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  function toggleDarkMode() {
    setIsDarkMode((mode) => !mode);
  }

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) root.classList.add("dark-mode");
    else root.classList.remove("dark-mode");
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("useDarkMode must be used within a DarkModeProvider");

  return context;
}

export { DarkModeProvider, useDarkMode };
