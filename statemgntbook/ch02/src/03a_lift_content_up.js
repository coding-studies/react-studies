
import { useState } from 'react';

const log = console.log.bind(console);

/**
 * Note the `info` prop. That is supposed to be a JSX element, similar
 * to `children`.
 */
function Counter1({ count, setCount, info }) {
  return (
    <div className="counter-1">
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>

      {/* Doesn't rerender with this syntax! */}
      {info}
    </div>
  );
}

//
// Counter1 is rendering info, but it doesn't rerender when the state
// changes or the parents higher up rerender.
//

function Counter2({ count, setCount, InfoComponent }) {
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
function Parent({ info }) {
  const [count, setCount] = useState(0);

  return (
    <div className="counters-parent">
      <Counter1 count={count} setCount={setCount} info={info} />
      <Counter2 count={count} setCount={setCount} />
    </div>
  );
}

function GrandParent() {
  //
  // Note the syntax {<Info />}, not {Info}.
  //
  return <Parent info={<Info />} />;
}

export { GrandParent };
