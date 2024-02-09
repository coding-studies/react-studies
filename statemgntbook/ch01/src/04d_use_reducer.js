import { useReducer } from "react";

const log = console.log.bind(console);

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'SET_TEXT':
      return { ...state, text: action.text };
    default:
      throw new TypeError('A valid action type must be provided');
  }
}

function init({ count, text }) {
  log('init', { count, text });
  return { count: count || 0, text: text || 'default text' };
}

//
// Correct use of init() for useReducer() lazy initialization.
//

function Component() {
  //
  // Now, passing the state as the second parameter _and_ the
  // initializer function as the third parameter is the correct way to
  // achieve lazy initialization. With this approach, init() will indeed
  // be called only once during initialization.
  //
  const [state, dispatch] = useReducer(reducer, { count: 0 }, init);

  return (
    <section>
      <pre>{state.count}</pre>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment
      </button>

      <hr />

      <input
        type='text'
        value={state.text}
        onChange={
          evt => dispatch({
            type: 'SET_TEXT',
            text: evt.target.value,
         })
        }
      />
      <p>Input result text: {state.text}</p>
    </section>
  );
}

export { Component };
