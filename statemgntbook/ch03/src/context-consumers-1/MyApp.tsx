import { useState } from "react";
import { AppContext, initialAppState } from "./AppContext";
import { Counter1 } from "./Counter1";
import { ThemeSwitcher } from "./ThemeSwitcher";

const log = console.log.bind(console);

function MyApp() {
  const [state, setState] = useState(initialAppState);

  log("<MyApp /> state", state);

  return (
    <AppContext.Provider value={{ ...state, setState }}>
      <Counter1 />
      <ThemeSwitcher />
    </AppContext.Provider>
  );
}

export { MyApp };

