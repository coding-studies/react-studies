import { useState } from "react";

const log = console.log.bind(console);

function Counter() {
  const [count, setCount] = useState({ count: 0 });

  log('re-render');

  return (
    <section>
      <pre>{JSON.stringify(count, null, 2)}</pre>
      <button onClick={() => setCount({ count: 1 })}>
        Set count to 1
      </button>
    </section>
  );
}

export { Counter };

//
// What happens if the user clicks again? It will call setCount() again,
// but this time it WILL re-render as we are creating a new object each
// time.
//
