import React, { createContext, useState } from "react";

export const Context = createContext(); //contexto

export function ContextProvider(props) {
  const [viewInicio, setViewInicio] = useState(true);
  const [viewMaderas, setViewMaderas] = useState(false);
  const [viewContacto, setViewContacto] = useState(false);
  const [viewOrigen, setViewOrigen] = useState(false);
  const [viewProductos, setViewProductos] = useState(false);
  const [viewShoppingCart, setViewShoppingCart] = useState(false);
  const [viewPedidosPerfil, setViewPedidosPerfil] = useState(false);
  const [viewHacerPedido, setViewHacerPedido] = useState(false);
  const [reload, setReload] = useState(false);
  
  const token = localStorage.getItem("token");


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

  function changeViewProductos(setView){
    setViewProductos(setView);
  }

  function changeViewShoppingCart(setView){
    setViewShoppingCart(setView)
  }

  function changeViewPedidosPerfil(setView){
    setViewPedidosPerfil(setView);
  }

  function changeViewHacerPedido(setView){
    setViewHacerPedido(setView);
  }

  function changeReload(){
    setReload(!reload);
  }

  return (
    <Context.Provider
      value={{
        viewInicio,
        viewContacto,
        viewOrigen,
        viewMaderas,
        viewProductos,
        viewShoppingCart,
        viewPedidosPerfil,
        viewHacerPedido,
        reload,
        token,

        changeViewInicio,
        changeViewContacto,
        changeViewOrigen,
        changeViewMaderas,
        changeViewProductos,
        changeViewShoppingCart,
        changeViewPedidosPerfil,
        changeViewHacerPedido,
        changeReload,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}