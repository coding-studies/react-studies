import "./App.css";
// import React from 'react';
// import { Wrapper } from './02a_context_static_value';
// import { Wrapper } from './03a_use_context';
// import { MyApp } from "./context-consumers-1/MyApp";
// import { MyApp } from "./04a_context_propagation";
// import { MyApp } from "./05a_pitfall_context_object";
// import { MyApp } from "./06a_small_state_pieces";
import { MyApp } from "./07a_one_state_usereducer";

function App(): JSX.Element {
  return (
    <div className="App">
      <MyApp />
    </div>
  );
}

export default App;
