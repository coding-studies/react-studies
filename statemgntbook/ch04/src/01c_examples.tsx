import {
  useState,
  useEffect,
} from "react";

const log: Console["log"] = console.log.bind(console);

let count = 0;

//
// Let's have set state functions at the module (not component) level.
//
// Components will add their setState() function to this set. When each
// component sets a new count, we'll iterate over this set and call
// each function with the new value of count, so each component will
// update with the new value of count.
//
// It is not strictly a pub/sub pattern, but it looks a lot like one.
//
const setStateFns = new Set<(count: number) => void>;

function Count1(): JSX.Element {
  const [state, setState] = useState<number>(count);

  useEffect(() => {
    setStateFns.add(setState);

    return function cleanUp() {
      setStateFns.delete(setState);
    }
  }, []);

  function increment() {
    count += 1;
    log('count incremented to ', count);

    setStateFns.forEach(setStateFn => setStateFn(count));
  }

  return (
    <div>
      <h2>Count1</h2>
      <p>count: {state}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

function Count2(): JSX.Element {
  const [state, setState] = useState<number>(count);

  useEffect(() => {
    setStateFns.add(setState);

    return function cleanUp() {
      setStateFns.delete(setState);
    }
  }, []);

  function increment() {
    count += 1;
    log('count incremented to ', count);

    setStateFns.forEach(setStateFn => setStateFn(count));
  }

  return (
    <div>
      <h2>Count2</h2>
      <p>count: {state}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

//
// This approach of iterating over the set state functions is kinda
// similar to a pub/sub approach (not strictly pub/sub, but resembles
// it a little bit).
//
// It works, but it is not the most practical solution ever. We also
// have some duplicate (non DRY) code at multiple components.
//

function Parent(): JSX.Element {
  return (
    <>
      <Count1/>
      <Count2 />
    </>
  );
}

function MyApp(): JSX.Element {
  return (
    <>
      <Parent />
    </>
  );
}

export { MyApp };

