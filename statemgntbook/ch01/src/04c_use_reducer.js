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

//
// The useReducer() initializer function return value is used just
// once when initialing the state for the first time, but the function
// itself is run again on every render when passed as the second
// parameter of useReducer().
//
function init({ count, text }) {
  log('init', { count, text });
  return { count: count || 0, text: text || 'default text' };
}

function Component() {
  //
  // This is not a good way to use the initializer function, as
  // explained above.
  //
  const [state, dispatch] = useReducer(reducer, init({ count: 0 }));

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
