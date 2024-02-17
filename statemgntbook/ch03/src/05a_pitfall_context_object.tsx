import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  memo,
} from "react";

const CountContext = createContext({ count1: 0, count2: 0 });

function useCountContext() {
  return useContext(CountContext);
}

function Counter1({ name }: { name: string }): JSX.Element {
  const { count1 } = useCountContext();
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <section>
      <h2>{`<${name} />`}</h2>
      <p>Count1: {count1}</p>
      <p>Rerenders: {renderCount.current}</p>
    </section>
  );
}

const Counter1Memoized = memo(Counter1);

function Counter2({ name }: { name: string }): JSX.Element {
  const { count2 } = useCountContext();
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <section>
      <h2>{`<${name} />`}</h2>
      <p>Count2: {count2}</p>
      <p>Rerenders: {renderCount.current}</p>
    </section>
  );
}

const Counter2Memoized = memo(Counter2);

//
// Even though each counter component uses only a slice of the store, of
// count1 changes, the counter 2 component rerenders and vice-versa.
//
// Ideally, each component should rerender only if its portion of the
// store changes, but that is not possible with default context.
//
// There are ways around this but then some extra code to implement
// selectors is necessary.
//

function Parent(): JSX.Element {
  return (
    <section>
      <Counter1Memoized name="Counter1" />
      <Counter2Memoized name="Counter2" />
    </section>
  );
}

function MyApp(): JSX.Element {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <CountContext.Provider value={{ count1, count2 }}>
      <button onClick={() => setCount1((c) => c + 1)}>{count1}</button>
      <button onClick={() => setCount2((c) => c + 1)}>{count2}</button>
      <Parent />
    </CountContext.Provider>
  );
}

export { MyApp };
