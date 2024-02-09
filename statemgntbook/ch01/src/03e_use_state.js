import { useState } from "react";

const log = console.log.bind(console);

function Counter() {
  const [count, setCount] = useState(0);

  log('re-render 03e_use_state');

  return (
    <section>
      <pre>{count}</pre>
      <button onClick={() => setCount(c => c + 1)}>
        Increment count
      </button>
    </section>
  );
}

export { Counter };

//
// Counts how many times the button was actually clicked because
// c => c + 1 is invoked sequentially.
//
// Function updates of the form setCount(c => c + 1) work better if the
// new state is computed from the previous state.
//
// { count + 1 } means it doesn't depend on the previous value, but it
// depends on the current _displayed_ value.
//
