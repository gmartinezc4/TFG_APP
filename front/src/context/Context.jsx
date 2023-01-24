import React, { createContext, useState } from "react";

export const Context = createContext(); //contexto

export function ContextProvider(props) {
  const [viewInicio, setViewInicio] = useState(true);
  const [viewMaderas, setViewMaderas] = useState(false);
  const [viewContacto, setViewContacto] = useState(false);
  const [viewOrigen, setViewOrigen] = useState(false);
  const [viewShoppingCart, setViewShoppingCart] = useState(false)


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

  function changeViewShoppingCart(setView){
    setViewShoppingCart(setView)
  }

  return (
    <Context.Provider
      value={{
        viewInicio,
        viewContacto,
        viewOrigen,
        viewMaderas,
        viewShoppingCart,

        changeViewInicio,
        changeViewContacto,
        changeViewOrigen,
        changeViewMaderas,
        changeViewShoppingCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
