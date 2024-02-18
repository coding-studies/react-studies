//
// Creates two contexts and two providers, one for each count (count1
// and count2).
//
// Also implements two simple custom hooks to extract each count context
// value.
//

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

//
// A tuple for the count state and its dispatcher updater function.
//
type TCountContext = [number, Dispatch<SetStateAction<number>>];

const Count1Context = createContext<TCountContext | null>(null);
Count1Context.displayName = "Count1Context";

function useCount1() {
  const value = useContext(Count1Context);

  if (value === null)
    throw new Error("Component must be wrapped in Count1Context.");

  return value;
}

function Count1Provider({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Count1Context.Provider value={useState(0)}>
      {children}
    </Count1Context.Provider>
  );
}

const Count2Context = createContext<TCountContext | null>(null);
Count2Context.displayName = "Count2Context";

function useCount2() {
  const value = useContext(Count2Context);

  if (value === null)
    throw new Error("Component must be wrapped in Count2Context.");

  return value;
}

function Count2Provider({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Count2Context.Provider value={useState(0)}>
      {children}
    </Count2Context.Provider>
  );
}

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
