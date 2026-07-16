import { createContext, useEffect, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";
import { STORAGE_KEYS } from "../constants";

const readStoredDarkMode = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.darkMode) === "true";
  } catch {
    return false;
  }
};

const INITIAL_STATE = {
  darkMode: readStoredDarkMode(),
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.darkMode, String(state.darkMode));
    } catch {
      // Ignore quota / private mode write failures.
    }
  }, [state.darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};
