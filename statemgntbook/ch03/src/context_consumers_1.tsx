//
// Not from the book, but some stuff I want to try, debug and understand.
//

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

function Counter1() {
  const { theme, count, setState } = useAppContext();
  log("=== state", theme, count, setState);

  return (
    <section>
      <div>
        <p>Count1: {count}</p>
        <button onClick={() => setState(incrementCount)}>+1</button>
      </div>
      <div>
        <p>Theme: {theme}</p>
        <button onClick={() => setState(switchTheme)}>
          Switch to {theme === "light" ? "dark" : "light"} theme
        </button>
      </div>
    </section>
  );
}

function Wrapper() {
  const [state, setState] = useState(initialAppState);

  log("<Wrapper /> state", state);

  return (
    <AppContext.Provider value={{ ...state, setState }}>
      <Counter1 />
    </AppContext.Provider>
  );
}

export { Wrapper };
