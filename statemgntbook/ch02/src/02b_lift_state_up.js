//
// If multiple components must share the same state, one option is to
// lift the state up to some parent component, and pass the state and
// the function to set new state down as props.
//
// But what if a child component doesn't depend on state we are lifting
// up? In this example, <AdditionalInfo /> doesn't need count and
// setCount(), but it rerenders because the parent rerenders.
//
// In this case, <AdditionalInfo /> rerender is unnecessary and should
// be avoided if possible and if performance is a concern.
//
// When a parent rerenders, its entire subtree rerenders.
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

function AdditionalInfo() {
  console.log("==== <AdditionalInfo /> render and rerender");
  return <p>Additional Info</p>;
}

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div className="counters-parent">
      <AdditionalInfo />
      <Counter1 count={count} setCount={setCount} />
      <Counter2 count={count} setCount={setCount} />
    </div>
  );
}

export { Parent };
