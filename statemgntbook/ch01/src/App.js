// import { Counter } from './01a_use_count.js';
// import { Counter } from './01b_use_count.js';
// import { Counter } from './01c_use_count.js';
// import { Counter } from './01d_use_count.js';
// import { Parent } from './02a_global_state';
// import { Parent } from './02b_global_state';
// import { Counter } from './03a_use_state';
// import { Counter } from './03b_use_state';
// import { Counter } from './03c_use_state';
// import { Counter } from './03e_use_state';
// import { Counter } from './03f_use_state';
// import { Counter } from './03g_use_state';
// import { Component } from './04a_use_reducer';
// import { Component } from './04b_use_reducer';
// import { Component } from './04c_use_reducer';
// import { Component } from './04d_use_reducer';
// import { Counter } from './05a_use_state_with_use_reducer';
// import { Counter } from './05b_use_state_with_use_reducer';
// import { Counter } from './06a_use_reducer_with_use_state';
import {
  CounterWithUseState,
  CounterWithUseReducer,
} from './07a_use_reducer_init';

import './App.css';

function App() {
  return (
    <main>
      <CounterWithUseState />
      <CounterWithUseReducer />
    </main>
  )
}

export default App;
