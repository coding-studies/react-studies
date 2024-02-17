import "./App.css";
// import React from 'react';
// import { Wrapper } from './02a_context_static_value';
// import { Wrapper } from './03a_use_context';
// import { MyApp } from "./context-consumers-1/MyApp";
// import { MyApp } from "./04a_context_propagation";
import { MyApp } from "./05a_pitfall_context_object";

function App() {
  return (
    <div className="App">
      <MyApp />
    </div>
  );
}

export default App;
