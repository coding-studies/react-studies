import { useState, useReducer } from 'react';

const log = console.log.bind(console);

function initializeState(count) {
  return count || 0;
}

function reducer(previousState, delta) {
  return previousState + delta;
}

function CounterWithUseReducer({ initialCount = 0 }) {
  const [state, dispatch] = useReducer(reducer, initialCount, initializeState);
  log('<CounterWithUseReducer />', state);

  return (
    <section>
      <pre>{state}</pre>
      <button onClick={() => dispatch(1)}>+1</button>
    </section>
  );
}

function CounterWithUseState({ initialCount = 0 }) {
  const [count, setState] = useState(() => initializeState(initialCount));

  const dispatch = function dispatcher(delta) {
    setState(previousState => reducer(previousState, delta))
  }

  return (
    <section>
      <pre>{count}</pre>
      <button onClick={() => dispatch(1)}>+1</button>
    </section>
  );
}

export {
  CounterWithUseState,
  CounterWithUseReducer,
};

//
// As you can see in ComponentWithUseState, useState() requires two
// inline functions, whereas ComponentWithUseReducer has no inline
// functions.  This is a trivial thing, but some interpreters or
// compilers can optimize better without inline functions.
//
