import { useState } from 'react';

//
// TODO: Make the state be the same for both <Foo /> and <Bar />.
//

function useGlobalState() {
  const [state, setState] = useState();
  return [state, setState];
}

function Foo() {
  const [state, setState] = useGlobalState();

  return (
    <section>
      <h2>Foo Component</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({ value: 'Foo!!!' })}>Click!</button>
    </section>
  );
}

function Bar() {
  const [state, setState] = useGlobalState();

  return (
    <section>
      <h2>Bar Component</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({ value: 'Bar!!!' })}>Click!</button>
    </section>
  );
}

function Parent() {
  return (
    <div>
      <Foo />
      <Bar />
    </div>
  );
}

export { Parent };
