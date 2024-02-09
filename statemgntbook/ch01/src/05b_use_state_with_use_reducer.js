import { useReducer } from 'react';

//
// Another way to implement useState() with useReducer().
//

function reducer(previousState, action) {
  return typeof action === 'function'
    ? action(previousState)
    : previousState;
}

function useState(initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
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
