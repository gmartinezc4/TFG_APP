import React, { useState, useContext } from "react";
import Maderas from "./Maderas";
import Inicio from "./Inicio";
import { Context } from "../context/Context";
import Contacto from "./Contacto";
import Origen from "./Origen";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import ProductosVenta from "./ProductosVenta";
import BotonesUserLogged from "./BotonesUserLogged";
import ShoppingCart from "./ShoppingCart";
import PedidosPerfil from "./PedidosPerfil";
import HacerPedido from "./HacerPedido";
import Session from "./Session";
import BotonesUserNotLogged from "./BotonesUserNotLogged";
import Perfil from "./Perfil";
import DetallePedido from "./DetallePedido";
import CorreoConfirmacionPedido from "./CorreoConfirmacionPedido";

function ContenedorMaderas() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });
  //localStorage.removeItem("token");

  const {
    viewMaderas,
    changeViewMaderas,
    viewInicio,
    changeViewInicio,
    viewContacto,
    changeViewContacto,
    viewOrigen,
    changeViewOrigen,
    viewShoppingCart,
    changeViewShoppingCart,
    viewProductos,
    changeViewProductos,
    viewPedidosPerfil,
    changeViewPedidosPerfil,
    viewDetallePedido,
    changeViewDetallePedido,
    viewHacerPedido,
    changeViewHacerPedido,
    viewSession,
    changeViewSession,
    token,
    changeViewProductSelect,
    viewPerfil,
    changeViewPerfil,
    productIdSelect,
    productCantidadSelect,
    pedidoDetallado,
    productosShoppingCart,
    enviarCorreoConfirmacion,
    modalIsOpenConfirmacion
  } = useContext(Context);

  return (
    <ApolloProvider client={client}>
      <div className="bg-[url('/home/guillermo/App_TFG/front/src/assets/fondoContacto.jpg')] bg-no-repeat bg-cover h-56">
        <div className="flex justify-between text-white font-bold border-b-2 border-white p-5">
          <button
            onClick={() => {
              changeViewInicio(true),
                changeViewOrigen(false),
                changeViewMaderas(false),
                changeViewContacto(false),
                changeViewProductos(false);
              changeViewShoppingCart(false);
              changeViewPedidosPerfil(false);
              changeViewDetallePedido(false);
              changeViewHacerPedido(false);
              changeViewSession(false);
              changeViewProductSelect(false);
              changeViewPerfil(false);
            }}
            className="bg-[url('/home/guillermo/App_TFG/front/src/assets/logo.png')] bg-no-repeat bg-cover h-36 w-36 -m-10"
          ></button>

          <div>
            <button
              onClick={() => {
                changeViewInicio(true),
                  changeViewOrigen(false),
                  changeViewMaderas(false),
                  changeViewContacto(false),
                  changeViewProductos(false);
                changeViewShoppingCart(false);
                changeViewPedidosPerfil(false);
                changeViewDetallePedido(false);
                changeViewHacerPedido(false);
                changeViewSession(false);
                changeViewProductSelect(false);
                changeViewPerfil(false);
              }}
              className={
                viewInicio ? "text-orange-600  rounded m-3 p-1" : "hover:text-orange-600 m-3 p-1"
              }
            >
              Inicio
            </button>

            <button
              onClick={() => {
                changeViewOrigen(true),
                  changeViewInicio(false),
                  changeViewMaderas(false),
                  changeViewContacto(false),
                  changeViewProductos(false);
                changeViewShoppingCart(false);
                changeViewPedidosPerfil(false);
                changeViewDetallePedido(false);
                changeViewHacerPedido(false);
                changeViewSession(false);
                changeViewProductSelect(false);
                changeViewPerfil(false);
              }}
              className={
                viewOrigen ? "text-orange-600  rounded m-3 p-1" : "hover:text-orange-600 m-3 p-1"
              }
            >
              Origen
            </button>

            <button
              onClick={() => {
                changeViewMaderas(true),
                  changeViewInicio(false),
                  changeViewOrigen(false),
                  changeViewContacto(false),
                  changeViewProductos(false);
                changeViewShoppingCart(false);
                changeViewPedidosPerfil(false);
                changeViewDetallePedido(false);
                changeViewHacerPedido(false);
                changeViewSession(false);
                changeViewProductSelect(false);
                changeViewPerfil(false);
              }}
              className={
                viewMaderas ? "text-orange-600  rounded m-3 p-1" : "hover:text-orange-600 m-3 p-1"
              }
            >
              Nuestra Madera
            </button>

            <button
              onClick={() => {
                changeViewContacto(true),
                  changeViewInicio(false),
                  changeViewOrigen(false),
                  changeViewMaderas(false),
                  changeViewProductos(false);
                changeViewShoppingCart(false);
                changeViewPedidosPerfil(false);
                changeViewDetallePedido(false);
                changeViewHacerPedido(false);
                changeViewSession(false);
                changeViewProductSelect(false);
                changeViewPerfil(false);
              }}
              className={
                viewContacto ? "text-orange-600  rounded m-3 p-1" : "hover:text-orange-600 m-3 p-1"
              }
            >
              Contacto
            </button>

            <button
              onClick={() => {
                changeViewProductos(true),
                  changeViewInicio(false),
                  changeViewOrigen(false),
                  changeViewMaderas(false),
                  changeViewContacto(false);
                changeViewShoppingCart(false);
                changeViewPedidosPerfil(false);
                changeViewDetallePedido(false);
                changeViewHacerPedido(false);
                changeViewSession(false);
                changeViewProductSelect(false);
                changeViewPerfil(false);
              }}
              className={
                viewProductos ? "text-orange-600  rounded m-3 p-1" : "hover:text-orange-600 m-3 p-1"
              }
            >
              Productos
            </button>
          </div>
        </div>

        {viewInicio && (
          <div className="">
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">Conocenos</h1>
            {token && <BotonesUserLogged />}
            {!token && <BotonesUserNotLogged />}
          </div>
        )}
        {viewMaderas && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">Maderas</h1>
            {token && <BotonesUserLogged />}
            {!token && <BotonesUserNotLogged />}
          </div>
        )}

        {viewContacto && (
          <div>
            <h1 className="flex justify-center font-serif text-white font-blond text-7xl mt-8 ml-5">
              Contacto
            </h1>
            {token && <BotonesUserLogged />}
            {!token && <BotonesUserNotLogged />}
          </div>
        )}

        {viewOrigen && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">Origen</h1>
            {token && <BotonesUserLogged />}
            {!token && <BotonesUserNotLogged />}
          </div>
        )}

        {viewProductos && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">Productos</h1>
            {token && <BotonesUserLogged />}
            {!token && <BotonesUserNotLogged />}
          </div>
        )}

        {viewShoppingCart && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">Carrito</h1>
            {token && <BotonesUserLogged />}
            {!token && <BotonesUserNotLogged />}
          </div>
        )}

        {viewPedidosPerfil && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">Pedidos</h1>
            {token && <BotonesUserLogged />}
            {!token && <BotonesUserNotLogged />}
          </div>
        )}

        {viewHacerPedido && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">
              Proceso de Compra
            </h1>
            {token && <BotonesUserLogged />}
            {!token && <BotonesUserNotLogged />}
          </div>
        )}

        {viewDetallePedido && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">
              Pedido
            </h1>
            {token && <BotonesUserLogged />}
            {!token && <BotonesUserNotLogged />}
          </div>
        )}

        {viewPerfil && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">Perfil</h1>
            {token && <BotonesUserLogged />}
            {!token && <BotonesUserNotLogged />}
          </div>
        )}
      </div>

      <Inicio />
      <Maderas />
      <Contacto />
      <Origen />
      <ProductosVenta />
      {viewSession && (
        <Session productIdSelect={productIdSelect} productCantidadSelect={productCantidadSelect} />
      )}
      {token && viewShoppingCart && <ShoppingCart />}
      {token && viewHacerPedido && <HacerPedido productos={productosShoppingCart} />}
      {token && viewPedidosPerfil && <PedidosPerfil />}
      {token && viewDetallePedido && <DetallePedido pedido={pedidoDetallado}/>}
      {token && viewPerfil && <Perfil />}
      {/* {token && enviarCorreoConfirmacion && <CorreoConfirmacionPedido/>} */}
      
    </ApolloProvider>
  );
}

export default ContenedorMaderas;
