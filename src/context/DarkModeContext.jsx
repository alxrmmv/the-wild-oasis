/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const darkByDefault =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? true
      : false;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    darkByDefault,
    "isDarkMode"
  );

  console.log("darkByDefault: ", darkByDefault);

  function toggleDarkMode() {
    setIsDarkMode((mode) => !mode);
  }

  useEffect(
    function () {
      //   const root = document.documentElemtnt("html");

      if (isDarkMode) document.documentElement.classList.add("dark-mode");
      else document.documentElement.classList.remove("dark-mode");
    },
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside DarkModeProvider");

  return context;
}

export { DarkModeProvider, useDarkMode };
