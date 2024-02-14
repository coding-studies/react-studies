import {
  useAppContext,
  incrementCount,
} from "./AppContext";

const log = console.log.bind(console);

function Counter1() {
  const { theme, count, setState } = useAppContext();
  log("=== <Counter1 />", theme, count, setState);

  return (
    <section className="counter1">
      <div>
        <p>Count1: {count}</p>
        <button onClick={() => setState(incrementCount)}>+1</button>
      </div>
    </section>
  );
}

export { Counter1 };
