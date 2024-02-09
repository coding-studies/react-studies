import { useReducer } from "react";

//
// This is a very typical use of useReducer().
//
// A reducer is a pure function, easy to test, and decoupled from
// the code of the hook (useReducer()) itself.
//
// Note every return statement returns a new object based off off the
// previous state. The object returned is always a new reference in
// memory.
//
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

function Component() {
  const [state, dispatch] = useReducer(reducer, { count: 0, text: '' });

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
