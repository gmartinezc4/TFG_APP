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
  const [viewDetallePedido, setViewDetallePedido] = useState(false);
  const [viewHacerPedido, setViewHacerPedido] = useState(false);
  const [viewSession, setViewSession] = useState(false);
  const [reload, setReload] = useState(false);
  const [viewPerfil, setViewPerfil] = useState(false);
  const [viewRecuperarPass1, setViewRecuperarPass1] = useState(false);
  const [viewRecuperarPass2, setViewRecuperarPass2] = useState(false);
  const [viewError, setViewError] = useState(false);
  const [codigoError, setCodigoError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const [productIdSelect, setProductIdSelect] = useState("");
  const [productCantidadSelect, setProductCantidadSelect] = useState("");
  const [pedidoDetallado, setPedidoDetallado] = useState();
  const [productosShoppingCart, setProductosShoppingCart] = useState(false);
  const [enviarCorreoConfirmacion, setEnviarCorreoConfirmacion] = useState(false);
  const [modalIsOpenConfirmacionCorreo, setIsOpenConfirmacionCorreo] = useState(false);
  const [emailUserRecuperaPass, setEmailUserRecuperaPass] = useState("");

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

  function changeViewDetallePedido(setView) {
    setViewDetallePedido(setView);
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

  function changeViewRecuperarPass1(setView){
    setViewRecuperarPass1(setView);
  }

  function changeViewRecuperarPass2(setView){
    setViewRecuperarPass2(setView);
  }

  function changeErrorTrue(){
    setViewInicio(false);
    setViewMaderas(false);
    setViewContacto(false);
    setViewOrigen(false);
    setViewProductos(false);
    setViewProductSelect(false);
    setViewShoppingCart(false);
    setViewPedidosPerfil(false);
    setViewDetallePedido(false);
    setViewHacerPedido(false);
    setViewSession(false);
    setReload(false);
    setViewPerfil(false);
    setViewRecuperarPass1(false);
    setViewRecuperarPass2(false);
    setViewError(true);
  }

  function changeErrorFalse(){
    setViewError(false);
  }

  function changeCodigoError(codigo){
    setCodigoError(codigo);
  }

  function changeMensajeError(mensaje){
    setMensajeError(mensaje);
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

  function changePedidoDetallado(pedido) {
    setPedidoDetallado(pedido);
  }

  function changeProductosShoppingCart(productoShoppingCart) {
    setProductosShoppingCart(productoShoppingCart)
  }
  
  function changeEnviarCorreoConfirmacion(setCorreo){
    setEnviarCorreoConfirmacion(setCorreo);
  }

  function openModalConfirmacionCorreo() {
    setIsOpenConfirmacionCorreo(true);
  }

  function closeModalConfirmacionCorreo() {
    setIsOpenConfirmacionCorreo(false);
  }

  function changeEmailUserRecuperaPass(setEmail){
    setEmailUserRecuperaPass(setEmail);
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
        viewDetallePedido,
        viewHacerPedido,
        viewSession,
        viewPerfil,
        viewRecuperarPass1,
        viewRecuperarPass2,
        viewError,
        codigoError,
        mensajeError,
        reload,
        token,
        productIdSelect,
        productCantidadSelect,
        pedidoDetallado,
        productosShoppingCart,
        enviarCorreoConfirmacion,
        modalIsOpenConfirmacionCorreo,
        emailUserRecuperaPass,

        changeViewInicio,
        changeViewContacto,
        changeViewOrigen,
        changeViewMaderas,
        changeViewProductos,
        changeViewProductSelect,
        changeViewShoppingCart,
        changeViewPedidosPerfil,
        changeViewDetallePedido,
        changeViewHacerPedido,
        changeViewSession,
        changeViewPerfil,
        changeViewRecuperarPass1,
        changeViewRecuperarPass2,
        changeErrorTrue,
        changeErrorFalse,
        changeCodigoError,
        changeMensajeError,
        changeReload,
        changeProductIdSelect,
        changeProductCantidadSelect,
        changePedidoDetallado,
        changeProductosShoppingCart,
        changeEnviarCorreoConfirmacion,
        openModalConfirmacionCorreo,
        closeModalConfirmacionCorreo,
        changeEmailUserRecuperaPass,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
