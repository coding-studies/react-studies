import { useReducer } from "react";

//
// It is possible to BAIL OUT and avoid re-renders with useReducer()
// as well.
//

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'SET_TEXT':
      //
      // If there is no text, simply return the same state reference,
      // which causes React to understand the state was not changed,
      // and therefore avoid unnecessary re-render.
      //
      // This example will cause the application to prevent the user
      // from removing the last char in the input 😅. Contrived but
      // serves to exemplify the bailing out from useReducer().
      //
      if (!action.text) return state;

      //
      // Otherwise, return a new state object reference.
      //
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
