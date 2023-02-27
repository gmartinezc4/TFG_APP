import React, { createContext, useState } from "react";

export const Context = createContext(); //contexto

export function ContextProvider(props) {
  const [viewInicio, setViewInicio] = useState(true);
  const [viewMaderas, setViewMaderas] = useState(false);
  const [viewContacto, setViewContacto] = useState(false);
  const [viewOrigen, setViewOrigen] = useState(false);
  const [viewProductos, setViewProductos] = useState(false);
  const [viewProductSelect, setViewProductSelect] = useState(false);
  const [viewShoppingCart, setViewShoppingCart] = useState(false);
  const [viewPedidosPerfil, setViewPedidosPerfil] = useState(false);
  const [viewHacerPedido, setViewHacerPedido] = useState(false);
  const [viewSession, setViewSession] = useState(false);
  const [reload, setReload] = useState(false);
  const [viewPerfil, setViewPerfil] = useState(false);

  const [productIdSelect, setProductIdSelect] = useState("");
  const [productCantidadSelect, setProductCantidadSelect] = useState("");
  const [modalIsOpenConfirmacion, setIsOpenConfirmacion] = useState(false);

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

  function changeViewProductos(setView) {
    setViewProductos(setView);
  }

  function changeViewProductSelect(setView){
    setViewProductSelect(setView);
  }

  function changeViewShoppingCart(setView) {
    setViewShoppingCart(setView);
  }

  function changeViewPedidosPerfil(setView) {
    setViewPedidosPerfil(setView);
  }

  function changeViewHacerPedido(setView) {
    setViewHacerPedido(setView);
  }

  function changeViewSession(setView) {
    setViewSession(setView);
  }

  function changeViewPerfil(setView){
    setViewPerfil(setView);
  }

  function changeProductIdSelect(setId){
    setProductIdSelect(setId)
  }

  function changeProductCantidadSelect(setCantidad){
    setProductCantidadSelect(setCantidad)
  }

  function changeReload() {
    setReload(!reload);
  }

  function openModalConfirmacion() {
    setIsOpenConfirmacion(true);
  }

  function closeModalConfirmacion() {
    setIsOpenConfirmacion(false);
  }

  return (
    <Context.Provider
      value={{
        viewInicio,
        viewContacto,
        viewOrigen,
        viewMaderas,
        viewProductos,
        viewProductSelect,
        viewShoppingCart,
        viewPedidosPerfil,
        viewHacerPedido,
        viewSession,
        viewPerfil,
        reload,
        token,
        productIdSelect,
        productCantidadSelect,
        modalIsOpenConfirmacion,

        changeViewInicio,
        changeViewContacto,
        changeViewOrigen,
        changeViewMaderas,
        changeViewProductos,
        changeViewProductSelect,
        changeViewShoppingCart,
        changeViewPedidosPerfil,
        changeViewHacerPedido,
        changeViewSession,
        changeViewPerfil,
        changeReload,
        changeProductIdSelect,
        changeProductCantidadSelect,
        openModalConfirmacion,
        closeModalConfirmacion,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
