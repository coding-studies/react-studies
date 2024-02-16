import {
  memo,
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";

const ColorContext = createContext("black");

function useColorContext() {
  const ctx = useContext(ColorContext);
  return ctx;
}

//
// This components uses the context.
//
function Color() {
  const color = useColorContext();
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div style={{ color }}>
      <p>Color: {color}</p>
      <p>Renders: {renderCount.current}</p>
    </div>
  );
}

//
// Based on the base component that consumes the context. It doesn't
// matter that it is memoized. If context changes, it will rerender.
//
const ColorMemoized = memo(Color);

//
// Not consuming the context.
//
function Dummy() {
  const renderCount = useRef(1);

  return (
    <div>
      <p>Renders: {renderCount.current}</p>
    </div>
  );
}

//
// Memoized, and not consuming the context.
//
const DummyMemoized = memo(Dummy);

function Parent() {
  return (
    <ul>
      <li>
        <Color />
      </li>
      <li>
        <ColorMemoized />
      </li>
      <li>
        <Dummy />
      </li>
      <li>
        <DummyMemoized />
      </li>
    </ul>
  );
}

function MyApp() {
  const [color, setColor] = useState("red");

  return (
    <ColorContext.Provider value={color}>
      <input
        value={color}
        onChange={(evt) => setColor(evt.target.value)}
      />
      <Parent />
    </ColorContext.Provider>
  );
}

export { MyApp };
