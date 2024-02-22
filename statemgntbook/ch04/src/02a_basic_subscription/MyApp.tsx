import { createStore, useStore, type Store } from "./createStore";

const log: Console["log"] = console.log.bind(console);

type CountState = {
  count: number;
};

const store: Store<CountState> = createStore({ count: 0 });

function Count1(): JSX.Element {
  const [state, setState] = useStore(store);

  function increment() {
    setState((prev) => ({
      ...prev,
      count: prev.count + 1,
    }));
  }

  return (
    <section>
      <h2>Count1</h2>
      <p>Count: {state.count}</p>
      <button onClick={increment}>+1</button>
    </section>
  );
}

function DisplayCount(): JSX.Element {
  const [state] = useStore(store);

  return <p><hr />DISPLAY COUNT: {state.count}<hr /></p>;
}

function MyApp(): JSX.Element {
  return (
    <>
      <Count1 />
      <DisplayCount />
    </>
  );
}

export { MyApp };

