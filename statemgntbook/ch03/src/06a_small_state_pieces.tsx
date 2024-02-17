import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";

const log: Console["log"] = console.log.bind(console);

type TCountContext = [number, Dispatch<SetStateAction<number>>];

const Count1Context = createContext<TCountContext>([0, () => {}]);

const Count2Context = createContext<TCountContext>([0, () => {}]);

function Counter1(): JSX.Element {
  const [count1, setCount1] = useContext(Count1Context);
  const renders = useRef(1);

  log("<Counter1 />");

  useEffect(() => {
    renders.current += 1;
  });

  return (
    <section>
      <p>Count1: {count1}</p>
      <p>Renders: {renders.current}</p>
      <button onClick={() => setCount1((c) => c + 1)}>+1</button>
    </section>
  );
}

function Counter2(): JSX.Element {
  const [count2, setCount2] = useContext(Count2Context);
  const renders = useRef(1);

  log("<Counter2 />");

  useEffect(() => {
    renders.current += 1;
  });

  return (
    <section>
      <p>Count2: {count2}</p>
      <p>hello</p>
      <p>Renders: {renders.current}</p>
      <button onClick={() => setCount2((c) => c + 1)}>+1</button>
    </section>
  );
}

function Parent(): JSX.Element {
  return (
    <>
      <Counter1 />
      <Counter1 />
      <Counter2 />
      <Counter2 />
    </>
  );
}

function Counter1Provider({ children }: { children: ReactNode }): JSX.Element {
  const [count1, setCount1] = useState(0);

  return (
    <Count1Context.Provider value={[count1, setCount1]}>
      {children}
    </Count1Context.Provider>
  );
}

function Counter2Provider({ children }: { children: ReactNode }): JSX.Element {
  const [count2, setCount2] = useState(0);

  return (
    <Count2Context.Provider value={[count2, setCount2]}>
      {children}
    </Count2Context.Provider>
  );
}

function MyApp(): JSX.Element {
  return (
    <Counter1Provider>
      <Counter2Provider>
        <Parent />
      </Counter2Provider>
    </Counter1Provider>
  );
}

export { MyApp };
