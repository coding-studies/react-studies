import React, {
  createContext,
  useContext,
  useState,
  type SetStateAction,
} from "react";

const log: Console["log"] = console.log.bind(console);

type AppProviderProps = {
  theme: "light" | "dark";
  count: number;
  setState: (_: SetStateAction<AppProviderProps>) => void;
};

const initialAppState: AppProviderProps = {
  theme: "light",
  count: 0,
  setState: (state) => ({ ...state }),
};

const AppContext = createContext(initialAppState);

function useAppContext() {
  const appContext = useContext(AppContext);
  return appContext;
}

function incrementCount(state: AppProviderProps): AppProviderProps {
  return {
    ...state,
    count: state.count + 1,
  };
}

function switchTheme(state: AppProviderProps): AppProviderProps {
  return {
    ...state,
    theme: state.theme === "light" ? "dark" : "light",
  };
}

export {
  AppContext,
  initialAppState,
  useAppContext,
  incrementCount,
  switchTheme,
};
