import React, { useContext } from "react";
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
import PieDePagina from "./PieDePagina";
import ForgotPassword from "./ForgotPassword";
import ForgotPassword2 from "./ForgotPassword2";
import PaginasErrores from "./PaginasErrores";
import styled from "styled-components";



//
// * Componente contenedor de todos los demás componentes.
// * Dede aqui se renderiazan los demás componentes de la web.
//
function ContenedorMaderas() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });

  // Variables del contexto usadas
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
    viewRecuperarPass1,
    changeViewRecuperarPass1,
    viewRecuperarPass2,
    changeViewRecuperarPass2,
    viewError,
    changeErrorFalse,
    codigoError,
    mensajeError,
  } = useContext(Context);


  return (
    <ApolloProvider client={client}>
      {/* Mostrar los errores */}
      {viewError && <PaginasErrores codigo={codigoError} mensaje={mensajeError} />}

      {/* Si no hay errores */}
      {!viewError && (
        <Fondo>
          {/* Cabecera con logo y botones */}
          <div>
            <div className="flex justify-between text-white font-bold border-b-2 border-white p-5 mb-20">
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
                  changeViewRecuperarPass1(false);
                  changeViewRecuperarPass2(false);
                  changeErrorFalse(false);
                }}
                className="bg-[url('/home/guillermo/APP_TFG/front/src/assets/logo.png')] bg-no-repeat bg-cover h-36 w-36 -m-10"
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
                    changeViewRecuperarPass1(false);
                    changeViewRecuperarPass2(false);
                    changeErrorFalse(false);
                  }}
                  className={
                    viewInicio
                      ? "text-yellow-500 rounded m-3 p-1 underline"
                      : "hover:text-yellow-300 m-3 p-1"
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
                    changeViewRecuperarPass1(false);
                    changeViewRecuperarPass2(false);
                    changeErrorFalse(false);
                  }}
                  className={
                    viewOrigen
                      ? "text-yellow-500 rounded m-3 p-1 underline"
                      : "hover:text-yellow-300 m-3 p-1"
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
                    changeViewRecuperarPass1(false);
                    changeViewRecuperarPass2(false);
                    changeErrorFalse(false);
                  }}
                  className={
                    viewMaderas
                      ? "text-yellow-500 rounded m-3 p-1 underline"
                      : "hover:text-yellow-300 m-3 p-1"
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
                    changeViewRecuperarPass1(false);
                    changeViewRecuperarPass2(false);
                    changeErrorFalse(false);
                  }}
                  className={
                    viewContacto
                      ? "text-yellow-500 rounded m-3 p-1 underline"
                      : "hover:text-yellow-300 m-3 p-1"
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
                    changeViewRecuperarPass1(false);
                    changeViewRecuperarPass2(false);
                    changeErrorFalse(false);
                  }}
                  className={
                    viewProductos
                      ? "text-yellow-500 rounded m-3 p-1 underline"
                      : "hover:text-yellow-300 m-3 p-1"
                  }
                >
                  Productos
                </button>
              </div>
            </div>

            {token && <BotonesUserLogged />}
            {!token && !viewRecuperarPass1 && !viewRecuperarPass2 && !viewSession && (
              <BotonesUserNotLogged />
            )}
          </div>

          {/* Componente a renderizar dependiendo de la condición*/}
          {viewInicio && <Inicio />}
          {viewMaderas && <Maderas />}
          {viewContacto && <Contacto />}
          {viewOrigen && <Origen />}
          {viewProductos && <ProductosVenta />}
          {viewSession && (
            <Session
              productIdSelect={productIdSelect}
              productCantidadSelect={productCantidadSelect}
            />
          )}
          {token && viewShoppingCart && <ShoppingCart />}
          {token && viewHacerPedido && <HacerPedido productos={productosShoppingCart} />}
          {token && viewPedidosPerfil && <PedidosPerfil />}
          {token && viewDetallePedido && <DetallePedido pedido={pedidoDetallado} />}
          {token && viewPerfil && <Perfil />}
          {viewRecuperarPass1 && <ForgotPassword />}
          {viewRecuperarPass2 && <ForgotPassword2 />}

          <PieDePagina />
        </Fondo>
      )}
    </ApolloProvider>
  );
}

export default ContenedorMaderas;

const Fondo = styled.div`
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1684%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1685)'%3e%3c/rect%3e%3cpath d='M1440 0L814.2 0L1440 77.57z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M814.2 0L1440 77.57L1440 200.70999999999998L580.3000000000001 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M580.3000000000001 0L1440 200.70999999999998L1440 242.61999999999998L508.6600000000001 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M508.6600000000001 0L1440 242.61999999999998L1440 402.45L180.0700000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L212.69 560L0 333.15999999999997z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 333.15999999999997L212.69 560L344.75 560L0 176.64999999999998z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 176.64999999999998L344.75 560L432.79 560L0 171.92z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 171.91999999999996L432.79 560L979.01 560L0 166.05999999999995z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1684'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='50%25' y1='100%25' x2='50%25' y2='0%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1685'%3e%3cstop stop-color='rgba(134%2c 239%2c 172%2c 1)' offset='0.02'%3e%3c/stop%3e%3cstop stop-color='rgba(25%2c 114%2c 93%2c 1)' offset='0.99'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
background-size: cover;
`
