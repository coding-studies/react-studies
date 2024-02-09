import { useState, useEffect } from "react";

const log = console.log.bind(console);

function isEven(n) {
  return n % 2 === 0;
}

function Counter() {
  log('re-render 03f_use_state');

  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setCount(c => c + 1),
      3500
    );

    return function cleanUp() {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section>
      <pre>{count}</pre>
      <button onClick={() => setCount(c => isEven(c) ? c : c + 1)}>
        Increment count if it makes result even.
      </button>
    </section>
  );
}

export { Counter };

//
// Bail out with a function update.
//
// If c is even, clicking the button would make the sate odd. If the
// state is not even, then clicking the button will make increment
// by 1, which will make the state even.
//
