import React, { createContext, useState } from "react";

export const Context = createContext(); //contexto

export function ContextProvider(props) {
  const [viewInicio, setViewInicio] = useState(false);
  const [viewMaderas, setViewMaderas] = useState(false);
  const [viewContacto, setViewContacto] = useState(false);
  const [viewOrigen, setViewOrigen] = useState(false);
  const [viewResort, setViewResort] = useState(false);
  const [viewPortal, setViewPortal] = useState(true);
  const [viewWebMaderas, setViewWebMaderas] = useState(false);

  const [registrarseModalHandler, setRegistrarseModal] = useState(false);

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
  
  function changeViewResort(setView) {
    setViewResort(setView);
  }

  function changeViewPortal(setView) {
    setViewPortal(setView);
  }

  function changeViewWebMaderas(setView){
    setViewWebMaderas(setView);
  }



  function changeRegistrarseModal(setView){
    setRegistrarseModal(setView);
  }

  return (
    <Context.Provider
      value={{
        viewMaderas,
        viewInicio,
        viewContacto,
        viewOrigen,
        viewResort,
        viewPortal,
        viewWebMaderas,

        registrarseModalHandler,

        changeViewMaderas,
        changeViewInicio,
        changeViewContacto,
        changeViewOrigen,
        changeViewResort,
        changeViewPortal,
        changeViewWebMaderas,

        changeRegistrarseModal,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
