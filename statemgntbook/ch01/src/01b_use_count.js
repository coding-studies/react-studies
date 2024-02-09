import { useState } from "react";

const log = console.log.bind(console);

//
// Custom hook for the count feature.
//
function useCount() {
  const [count, setCount] = useState(0);
  return [count, setCount];
}

function Counter() {
  const [count, setCount] = useCount();

  log('==== rendering 01b_use_count');

  return (
    <div className="counter">
      {count}
      <button onClick={() => setCount(c => c + 1)}>
        +1
      </button>
    </div>
  );
}

export { Counter };

//
// It may seem we unnecessarily added more complexity for a very simple
// problem. But useCount() is more self-documenting with clearer and
// meaningful name. It does use useState internally, though.  Also,
// <Counter /> is independent of the implementation of useCount().
//
// Note useCount() does not take an initial count.
//
