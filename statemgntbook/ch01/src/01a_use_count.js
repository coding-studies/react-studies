import { useState } from "react";

const log = console.log.bind(console);

function Counter() {
  const [count, setCount] = useState(0);

  log('==== rendering 01a_use_count');

  return (
    <div className="counter">
      {count}
      <button onClick={() => setCount(c => c + 1)}>
        +1
      </button>
    </div>
  );
}

export { Counter };
