import { useState } from 'react';

const log = console.log.bind(console);

//
// This is not technically pure (really? It is using state defined
// only inside itself, which can only be changed from inside itself).
//
// <AddBase /> is idempotent like createContainer() from previous
// example. useState() is conceptually similar to createContainer().
//
// If we assume the useState behavior, meaning it returns base unless
// changed, the AddBase function is idempotent, as we saw with
// createContainer.
//
function AddBase({ num }) {
  const [base, _changeBase] = useState(1);
  return <p>{base + num}</p>;
}

// This AddBase function with useState is contained because changeBase
// is only available within the scope of the function declaration. It's
// impossible to change base outside the function. This usage of
// useState is a local state, and because it's contained and doesn't
// affect anything outside the component, it ensures locality; this
// usage is preferred whenever appropriate.

export { AddBase };
