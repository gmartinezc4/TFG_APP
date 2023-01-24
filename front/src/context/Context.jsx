import React, { createContext, useState } from "react";

export const Context = createContext(); //contexto

export function ContextProvider(props) {
  const [viewInicio, setViewInicio] = useState(true);
  const [viewMaderas, setViewMaderas] = useState(false);
  const [viewContacto, setViewContacto] = useState(false);
  const [viewOrigen, setViewOrigen] = useState(false);


  function changeViewMaderas(setView) {
    setViewMaderas(setView);
  }

  function changeViewInicio(setView) {
    setViewInicio(setView);
  }

  function changeViewContacto(setView) {
    setViewContacto(setView);
  }

  function changeViewOrigen(setView) {
    setViewOrigen(setView);
  }

  return (
    <Context.Provider
      value={{
        viewInicio,
        viewContacto,
        viewOrigen,
        viewMaderas,

        changeViewInicio,
        changeViewContacto,
        changeViewOrigen,
        changeViewMaderas
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
