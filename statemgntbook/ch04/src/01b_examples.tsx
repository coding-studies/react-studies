import {
  useState,
} from "react";

const log: Console["log"] = console.log.bind(console);

let count = 0;

/**
 * Increments count but does not update the component.
 */
function CountNotWorking(): JSX.Element {
  function increment() {
    count += 1;
    log('count incremented to ', count);
  }

  return (
    <div>
      <h2>CountNotWorking</h2>
      <p>count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

//
// At the time of studying this book, only useState() and useReducer()
// cause rerenders. To have module state, we can use one of those to
// update a store and trigger component updates.
//

/**
 * Increments count and updates the component as the state value is
 * managed through useState().
 */
function Count1Working(): JSX.Element {
  //
  // Note the use of `count` here from the module scope.
  //
  const [state, setState] = useState(count);

  function increment() {
    count += 1;
    log('count incremented to ', count);
    setState(count);
  }

  return (
    <div>
      <h2>Count1Working</h2>
      <p>count: {state}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

/**
 * Increments count and updates the component as the state value is
 * managed through useState().
 *
 * Both Count1Working and Count2Working have isolated renders because
 * even though `count` is at the module scope, each internal component
 * `state` is local to that component. And when alternating the clicks
 * in the components, they will catch up with the latest value in the
 * module `count` variable.
 */
function Count2Working(): JSX.Element {
  //
  // Note the use of `count` here from the module scope.
  //
  const [state, setState] = useState(count);

  function increment() {
    count += 1;
    log('count incremented to ', count);
  }

  return (
    <div>
      <h2>Count2Working</h2>
      <p>count: {state}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

//
// So both Count1Working and Count2Working components share the same
// module level `count`, but clicking one component does not update
// the other and vice-versa. Only when clicking a component will it
// catch up with the latest, updated `count`.
//
// What if we want updating one component also cause the other to
// update? See example 01c.
//

function Parent(): JSX.Element {
  return (
    <>
      <CountNotWorking />
      <Count1Working />
      <Count2Working />
    </>
  );
}

function MyApp(): JSX.Element {
  return (
    <>
      <Parent />
    </>
  );
}

export { MyApp };
