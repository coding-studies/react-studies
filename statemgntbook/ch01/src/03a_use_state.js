import { useState } from "react";

const log = console.log.bind(console);

function Counter() {
  const [count, setCount] = useState(0);

  log('re-render');

  return (
    <section>
      <pre>{JSON.stringify(count, null, 2)}</pre>
      <button onClick={() => setCount(1)}>
        Set count to 1
      </button>
    </section>
  );
}

export { Counter };

//
// What happens if the user clicks again? It will invoke setCount()
// again, but as the value is the same, it will BAIL OUT.
//
// BAILOUT is a technical term in react and it basically means avoid
// triggering rerenders.
//
// NOTE: With a reference type like setCount({ count: 1 }), the object
// is a new object in memory each time, so it will not be considered the
// same, even if it is still the same keys with the same values.
//
