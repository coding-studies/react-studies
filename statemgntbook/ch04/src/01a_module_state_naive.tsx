import React from "react";

const log: Console["log"] = console.log.bind(console);

type State = {
  count: number;
};

let state: State = {
  count: 0,
};

function getState(): State {
  return state;
}

function setState(nextState: (nextState: State) => State | State): void {
  state = typeof nextState === "function"
    ? nextState(state)
    : nextState;
}

function incrementCount(state: State): State {
  log("incrementCount()");

  return {
    ...state,
    count: state.count + 1,
  };
}

//
// Renders twice and ends up incrementing count to 1 and then 2 due to
// React's StrictMode thing.
// 

function MyApp(): JSX.Element {
  log("<MyApp />");
  log(getState());
  setState(incrementCount);
  log(getState());

  return (
    <p>My App</p>
  );
}

export { MyApp };
