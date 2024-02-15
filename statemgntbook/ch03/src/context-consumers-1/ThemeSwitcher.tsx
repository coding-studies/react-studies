import { useAppContext, switchTheme } from "./AppContext";

const log = console.log.bind(console);

function ThemeSwitcher() {
  const { theme, count, setState } = useAppContext();
  log("=== <ThemeSwitcher />", theme, count, setState, "hey");

  return (
    <section className="theme-switcher">
      <div>
        <p>Theme: {theme}</p>
        <button onClick={() => setState(switchTheme)}>
          Switch to {theme === "light" ? "dark" : "light"} theme
        </button>
      </div>
    </section>
  );
}

export { ThemeSwitcher };
