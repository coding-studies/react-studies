import { useState } from "react";

const log = console.log.bind(console);

function Counter() {
  const [state, setState] = useState({ count: 0 });

  log('re-render 03c_use_state');

  return (
    <section>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => {
        state.count += 1;
        setState(state);
      }}>
        Set count to 1
      </button>
    </section>
  );
}

export { Counter };

//
// Developer tries to cheat to avoid re-render because of creating a new
// object in memory each time by re-using the same state instance, and
// then setting state.count += 1.
//
// But it won't trigger re-renders because the object reference is
// always the same, and React doesn't perform a deep inspection of the
// object's properties to decide if it should re-render or not (for
// performance reasons).
//
// In short, it also bails out.
//
