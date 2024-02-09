
import { useState } from 'react';

const log = console.log.bind(console);

/**
 * Note the `info` prop. That is supposed to be a JSX element, similar
 * to `children`.
 */
function Counter1({ count, setCount, children }) {
  return (
    <div className="counter-1">
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>

      {/* Doesn't rerender with this syntax! */}
      {children}
    </div>
  );
}

//
// Counter1 is rendering info, but it doesn't rerender when the state
// changes or the parents higher up rerender.
//

function Counter2({ count, setCount }) {
  return (
    <div className="counter-2">
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

function Info() {
  log('<Info /> render');
  return <p>Info</p>;
}

/**
 * Note how `info` is used here too.
 */
function Parent({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div className="counters-parent">
      <Counter1 count={count} setCount={setCount}>
        {children}
      </Counter1>
      <Counter2 count={count} setCount={setCount} />
    </div>
  );
}

//
// Note <Info /> is rendered from this point.
//
function GrandParent() {
  return <Parent><Info /></Parent>
}

export { GrandParent };
