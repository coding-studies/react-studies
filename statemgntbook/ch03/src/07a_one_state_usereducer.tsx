//
// Multiple contexts for multiple pieces of state, but a single dispatch
// function.
//
// We use a single reducer, and it updates pieces of the state. When the
// state is passed down to the providers, it passes portion of the
// state, which means consumers only update (rerender) if their portion
// of the state changed.
//

import {
  createContext,
  useContext,
  useRef,
  useReducer,
  useEffect,
  type Dispatch,
  type ReactNode,
} from "react";

type Action = { type: "INC1" } | { type: "INC2" };

//
// One context for each count, but a single dispatch provider.
//
const Count1Context = createContext<number>(0);
Count1Context.displayName = "Count1Context";
const Count2Context = createContext<number>(0);
Count2Context.displayName = "Count2Context";
const DispatchContext = createContext<Dispatch<Action>>(() => {});
DispatchContext.displayName = "DispatchContext";

function Count1(): JSX.Element {
  const count1 = useContext(Count1Context);
  const dispatch = useContext(DispatchContext);
  const renders = useRef(1);

  useEffect(() => {
    renders.current += 1;
  });

  return (
    <section>
      <p>Count1: {count1}</p>
      <p>Renders: {renders.current}</p>
      <button onClick={() => dispatch({ type: "INC1" })}>+1</button>
    </section>
  );
}

function Count2(): JSX.Element {
  const count2 = useContext(Count2Context);
  const dispatch = useContext(DispatchContext);
  const renders = useRef(1);

  useEffect(() => {
    renders.current += 1;
  });

  return (
    <section>
      <p>Count2: {count2}</p>
      <p>Renders: {renders.current}</p>
      <button onClick={() => dispatch({ type: "INC2" })}>+1</button>
    </section>
  );
}

function Parent(): JSX.Element {
  return (
    <>
      <Count1 />
      <Count1 />
      <Count2 />
      <Count2 />
    </>
  );
}

function MyAppProvider({ children }: { children: ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(
    (prevState: { count1: number; count2: number }, action: Action) => {
      if (action.type === "INC1")
        return { ...prevState, count1: prevState.count1 + 1 };
      if (action.type === "INC2")
        return { ...prevState, count2: prevState.count2 + 1 };

      throw new Error("Provide a valid action type.");
    }, {
      count1: 0,
      count2: 0,
    }
  );

  //
  // Note how pieces of the state are passed to each provider.
  //
  return (
    <DispatchContext.Provider value={dispatch}>
      <Count1Context.Provider value={state.count1}>
        <Count2Context.Provider value={state.count2}>
          {children}
        </Count2Context.Provider>
      </Count1Context.Provider>
    </DispatchContext.Provider>
  );
}

function MyApp (): JSX.Element {
  return (
    <MyAppProvider>
      <Parent />
    </MyAppProvider>
  );
}

export { MyApp };
