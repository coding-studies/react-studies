const log = console.log.bind(console);

//
// This is a pure function too. Just that it return JavaScript Syntax
// Extension element (which internally is a data structure) that
// represents the number on the screen.
//
// And by the way, this <AddOne /> component (function, really!) is a
// pure function because it only uses passed state and no state from
// outside.
//
function AddOne({ num }) {
  return <p>{num + 1}</p>;
}

export { AddOne };
