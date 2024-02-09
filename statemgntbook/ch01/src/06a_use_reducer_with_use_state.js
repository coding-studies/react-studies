import { useState } from 'react';

const log = console.log.bind(console);

//
// Implement useReducer() in terms of useState().
//

function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  const dispatch = function dispatcher(action) {
    return setState(previousState => reducer(previousState, action));
  };

  return [state, dispatch];
}

function reducer(state, action) {
  log({ state, action });
  switch(action.type) {
    case 'INCREMENT': return state + 1;
    default: return state;
  }
};

function Counter({ initialCount = 0 }) {
  const [count, dispatch] = useReducer(reducer, initialCount);

  return (
    <section>
      <pre>{count}</pre>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
    </section>
  );
}

export { Counter };
