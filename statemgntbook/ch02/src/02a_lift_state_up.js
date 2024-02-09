//
// If multiple components must share the same state, one option is to
// lift the state up to some parent component, and pass the state and
// the function to set new state down as props.
//

import { useState } from 'react';

function Counter1({ count, setCount }) {
  return (
    <div className="counter-1">
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

function Counter2({ count, setCount }) {
  return (
    <div className="counter-2">
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div className="counters-parent">
      <Counter1 count={count} setCount={setCount} />
      <Counter2 count={count} setCount={setCount} />
    </div>
  );
}

export { Parent };

//
// Now the two child counters rerender and share the same state, but the
// parent rerenders too as the state is now in the parent.
//
