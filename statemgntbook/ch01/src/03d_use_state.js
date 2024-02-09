import { useState } from "react";

const log = console.log.bind(console);

function Counter() {
  const [count, setCount] = useState(0);

  log('re-render 03d_use_state');

  return (
    <section>
      <pre>{count}</pre>
      <button onClick={() => setCount(count + 1)}>
        Set count to {count + 1}
      </button>
    </section>
  );
}

export { Counter };

//
// If the user clicks twice fast enough, it will increment by just one
// number. In this example, it the {count} would show a value like 3
// but “Set count to {count + 1}” would cause that {count + 1} to be 4.
//
// That is because the current new value of count is displayed on the
// next render. Imagine count is 1, {count + 1} will show as 2, but
// {count} on the <pre> tag is still showing the count 1 from the
// previous render.
//
// To avoid such situation, make sure to use a callback function of the
// form setCount(c => c + 1) like in many of the previous examples.
//
