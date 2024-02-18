import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

function createStateContext<Value, State>(
  useValue: (init?: Value) => State,
) {
  const StateContext = createContext<State | null>(null);

  function StateProvider({
    initialValue,
    children,
  }: { initialValue?: Value, children: ReactNode }) {
    return (
      <StateContext.Provider value={useValue(initialValue)}>
        {children}
      </StateContext.Provider>
    );
  }

  function useContextState() {
    const value = useContext(StateContext);

    if (value === null)
      throw new Error("Wrap component inside a provider.");

    return value;
  }

  return [StateProvider, useContextState] as const;
}

function useNumberState(init: number | undefined) {
  return useState(init || 0);
}

const [Count1Provider, useCount1] = createStateContext(useNumberState);
const [Count2Provider, useCount2] = createStateContext(useNumberState);

function Count1(): JSX.Element {
  const [count1, setCount1] = useCount1();
  const renders = useRef(1);

  useEffect(() => {
    renders.current += 1;
  });

  return (
    <section>
      <p>Count1: {count1}</p>
      <p>Renders: {renders.current}</p>
      <button onClick={() => setCount1(c => c + 1)}>+1</button>
    </section>
  );
}

function Count2(): JSX.Element {
  const [count2, setCount2] = useCount2();
  const renders = useRef(1);

  useEffect(() => {
    renders.current += 1;
  });

  return (
    <section>
      <p>Count2: {count2}</p>
      <p>Renders: {renders.current}</p>
      <button onClick={() => setCount2(c => c + 1)}>+1</button>
    </section>
  );
}

function Parent(): JSX.Element {
  return (
    <>
      <Count1 />
      <Count1 />
      <hr />
      <Count2 />
      <Count2 />
    </>
  );
}

function MyApp(): JSX.Element {
  return (
    <Count1Provider>
      <Count2Provider>
        <Parent />
      </Count2Provider>
    </Count1Provider>
  );
}

export { MyApp };
