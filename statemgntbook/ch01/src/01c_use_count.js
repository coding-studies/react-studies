import { useState, useEffect } from "react";

const log = console.log.bind(console);

//
// We change the implementation of the custom hook without touching the
// component code.
//
function useCount() {
  const [count, setCount] = useState(0);

  //
  // New feature added to useCount().
  //
  useEffect(function performLog() {
    log('count changed to:', count);
  }, [count]);

  return [count, setCount];
}

function Counter() {
  const [count, setCount] = useCount();

  log('==== rendering 01c_use_count');

  return (
    <div className="counter">
      {count}
      <button onClick={() => setCount(c => c + -3)}>
        -3
      </button>
    </div>
  );
}

export { Counter };

//
// We could increment by any amount other than by one. Even decrement!
//
//   <button onClick={() => setCount(c => c + 5)}>
//     +5
//   </button>
//
//   <button onClick={() => setCount(c => c - 3)}>
//     -3
//   </button>
//
// Can client code be prevented to change count by arbitrary
// amounts?  Check 01d.
//
