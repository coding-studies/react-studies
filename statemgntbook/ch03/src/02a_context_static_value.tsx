import React, { createContext, useContext } from "react";

const ColorContext = createContext("black");

function Color() {
  const color = useContext(ColorContext);

  return <div style={{ color }}>Hello {color}!</div>;
}

function Wrapper() {
  return (
    <>
      <Color />

      <ColorContext.Provider value="red">
        <Color />
      </ColorContext.Provider>

      <ColorContext.Provider value="green">
        <Color />
      </ColorContext.Provider>

      <ColorContext.Provider value="blue">
        <Color />

        <ColorContext.Provider value="skyblue">
          <Color />
        </ColorContext.Provider>
      </ColorContext.Provider>
    </>
  );
}

export { Wrapper };
