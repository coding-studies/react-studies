import { memo } from "react";
const log = console.log.bind(console);

//
// https://react.dev/reference/react/memo#skipping-re-rendering-when-props-are-unchanged
//
// “Even with memo, your component will re-render if its own state
// changes or if a context that it’s using changes.”
//
// React dev tools highlight as if this memoized component is being
// rendered, but the log does not show up. So maybe it is not really
// being rerendered.
//
const MemoizedMessage = memo(function MemoizedMessage() {
  log("<MemoizedMessage />");

  return <p>Memoized Message!</p>;
});

function _MemoizedMessage(): JSX.Element {
  log("<MemoizedMessage />");

  return <p>Memoized message!</p>;
}

function Message() {
  log("<Message />");

  return <p>Message!</p>;
}

export { MemoizedMessage, Message };
