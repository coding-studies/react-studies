import { useState } from 'react';

function Child({ state, setState }) {
  const setFoo = () => setState(
    prev  => ({ ...prev, foo: 'Foo!' })
  );

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={setFoo}>Set Foo!</button>
    </div>
  );
}

function Parent() {
  const [state, setState] = useState();

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>

      <Child state={state} setState={setState} />
    </div>
  );
}

export { Parent };

//
// Still considered local state as the state is shared between a
// parent and a child. It is local to that small portion of the app.
//
