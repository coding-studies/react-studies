import { useReducer } from 'react';

//
// It is said that React, at least up to version 18, uses useReduce()
// internally to implement useState().
//
function useState(initialState) {
  const [state, dispatch] = useReducer(
    function reducer(previousState, action) {
      return typeof action === 'function'
        ? action(previousState)
        : previousState;
    },
    initialState
  );

  return [state, dispatch];
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <pre>{count}</pre>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </section>
  );
}

export { Counter };
