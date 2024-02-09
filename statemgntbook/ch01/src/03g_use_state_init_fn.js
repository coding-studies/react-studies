import { useState } from "react";

const log = console.log.bind(console);

function init() {
  return 0;
}

function increment(n) {
  log(`Incrementing ${n} to ${n + 1}`);

  return n + 1;
}

function Counter() {
  log('re-render 03g_use_state');

  //
  // useState() can take an initializer function for lazy
  // initialization.
  //
  const [count, setCount] = useState(init);

  return (
    <section>
      <pre>{count}</pre>
      <button onClick={() => setCount(increment)}>
        Increment count
      </button>
    </section>
  );
}

export { Counter };

//
// useState() can take an initializer function that is evaluated lazily.
// The initializer function is run only once, when the component is
// mounted and useState() is run for the first time. Because of these,
// an initializer function is suited for performing heavy computations
// to to initialize state.
//
