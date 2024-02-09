import { useState, useEffect } from "react";

const log = console.log.bind(console);

function useCount() {
  const [count, setCount] = useState(0);

  const inc = () => setCount(c => c + 1);

  useEffect(function performLog() {
    log('count changed to:', count);
  }, [count]);

  return [count, inc];
}

function Counter() {
  const [count, setCount] = useCount();

  log('==== rendering 01d_use_count');

  return (
    <div className="counter">
      {count}
      <button onClick={() => setCount(c => c + -3)}>
        +1
      </button>
    </div>
  );
}

export { Counter };

//
// Now inc() is returned in place of setCount(), and it hard-codes an
// implementation that always increments by one, even if the client code
// passes a callback like setCount(c => c - 3) as above. It will always
// increment by one no mater what.
//
