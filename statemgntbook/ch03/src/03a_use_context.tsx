import React, {
  useContext,
  createContext,
  useState,
  type SetStateAction,
} from "react";

//
// The state is created with some default value, which serves as
// documentation and also helps with the types.
//
const CountStateContext = createContext({
  count: 0,
  setCount: (_: SetStateAction<number>) => {},
});

//
// Both <Count1 /> and <Count2 /> can access the the state without prop
// drilling, but by making use of useContext(CountStateContext) instead.
//

function Count1() {
  const { count, setCount } = useContext(CountStateContext);

  return (
    <div className="count-1">
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

function Count2() {
  const { count, setCount } = useContext(CountStateContext);

  return (
    <div className="count-2">
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 2)}>+2</button>
    </div>
  );
}

function Parent() {
  return (
    <>
      <Count1 />
      <Count2 />
    </>
  );
}

function Wrapper() {
  const [count, setCount] = useState(0);

  //
  // The shape we pass to value is the same as the initial default
  // context used in createContext().
  //
  return (
    <CountStateContext.Provider value={{count, setCount }}>
      <Parent />
    </CountStateContext.Provider>
  );
}

export { Wrapper };
