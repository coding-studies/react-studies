import {
  memo,
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";

const log = console.log.bind(console);

const ColorContext = createContext("black");

function useColorContext() {
  return useContext(ColorContext);
}

//
// This components uses the context.
//
function Color({ name }: { name: string}) {
  const color = useColorContext();
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div style={{ color }}>
      <h2>{name}</h2>
      <p>Color: {color}</p>
      <p>Renders: {renderCount.current}</p>
    </div>
  );
}

//
// Based on the base component that consumes the context. It doesn"t
// matter that it is memoized. If context changes, it will rerender.
//
const ColorMemoized = memo(Color);

//
// Not consuming the context. If a parent rerenders, it also rerenders.
//
function Dummy({ name }: { name: string }) {
  const renderCount = useRef(1);
  log(`<${name} />`);

  return (
    <div>
      <h2>{name}</h2>
      <p>Renders: {renderCount.current}</p>
    </div>
  );
}

//
// Memoized, and not consuming the context. Even if parent rerenders, it
// will NOT rerender (unless its own props change then) because it is
// memoized.
//
const DummyMemoized = memo(Dummy);

function Parent() {
  log("<Parent />");

  return (
    <ul>
      <li>
        <Color name="Color" />
      </li>
      <li>
        <ColorMemoized name="ColorMemoized" />
      </li>
      <li>
        <Dummy name="Dummy" />
      </li>
      <li>
        <DummyMemoized name="DummyMemoized" />
      </li>
    </ul>
  );
}

function MyApp() {
  const [color, setColor] = useState("orange");
  log("<MyApp />");

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
