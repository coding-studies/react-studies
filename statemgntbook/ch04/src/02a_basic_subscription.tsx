import {
  useState,
  useEffect,
  useRef,
} from "react";

const log: Console["log"] = console.log.bind(console);

type Store<State> = {
  getState: () => State;
  setState: (action: State | ((prev: State) => State)) => void;
  subscribe: (callback: () => void) => () => void;
};

function createStore<State extends unknown>(
  initialState: State
): Store<State> {
  let state: State = initialState;
  const subscribers = new Set<() => void>();

  function getState(): State {
    return state;
  }

  function setState(nextState: State | ((prevState: State) => State)): void {
    state = typeof nextState === "function"
      ? (nextState as (prev: State) => State)(state)
      : nextState;

    ////
    // Notify each subscriber.
    //
    subscribers.forEach(subscriber => subscriber());
  }

  function subscribe(subscriber: () => void): () => void {
    subscribers.add(subscriber);

    return function unsubscribe(): void {
      subscribers.delete(subscriber);
    };
  }

  return { getState, setState, subscribe };
}

function useStore<State extends unknown>(
  store: Store<State>
): readonly [State, (action: State | ((prev: State) => State)) => void] {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(function update() {
      setState(store.getState());
    });

    ////
    // Handles edge case. It invokes the setState() function once inside
    // this useEffect(). This is due to the fact that useEffect() is
    // delayed and there's a chance that store already has a new state.
    //
    setState(store.getState());

    ////
    // The clean-up function is actually unsubscribe so we don't have
    // dangling subscribers in the store if a component is no longer
    // mounted and there would be no point in trying to notify it.
    //
    return unsubscribe;
  }, [store]);

  return [state, store.setState] as const;
}

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

  return <p><hr />COUNT: {state.count}<hr /></p>;
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
