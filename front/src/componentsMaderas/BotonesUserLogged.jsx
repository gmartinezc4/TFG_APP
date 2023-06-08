import React, { useContext, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Context } from "../context/Context";
import Swal from "sweetalert2";
import carrito from "../assets/carrito.png"
import fotoPerfil from '../assets/fotoPerfil.png'

const LOG_OUT = gql`
  mutation Mutation {
    logOut
  }
`;

const GET_PRODUCTOS_CARRITO_USER = gql`
  query GetProductosCarritoUser {
    getProductosCarritoUser {
      _id
      cantidad
      id_producto
      id_user
      name
      precioTotal
      precioTotal_freeIVA
      img
    }
  }
`;

// 
// * Componente botones del usuario loggeado.
// * Botones del perfil y el carrito
// 
function BotonesUserLogged() {
  // Variables del contexto usadas
  const {
    changeReload,
    token,
    changeViewShoppingCart,
    changeViewProductos,
    changeViewInicio,
    changeViewOrigen,
    changeViewMaderas,
    changeViewContacto,
    changeViewPedidosPerfil,
    changeViewDetallePedido,
    changeViewHacerPedido,
    changeViewSession,
    changeViewProductSelect,
    changeViewPerfil,
    changeErrorTrue,
    changeErrorFalse,
    changeCodigoError,
    changeMensajeError
  } = useContext(Context);
  const [OpenSubMenuPerfil, setOpenSubMenuPerfil] = useState(false);

  // Mutation para cerrar sesión
  const [logOut] = useMutation(LOG_OUT, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },

    onCompleted: () => {
      localStorage.removeItem("token");
      changeReload();
    },
    onError: (error) => {
      console.log(error);
      changeReload();
    },
  });

  // Query para traer los productos del carrito del user de la bbdd
  const { data, loading, error } = useQuery(GET_PRODUCTOS_CARRITO_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loading) return <div></div>;
  if (error)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError(error.message)}
      </div>
    );

    //modal de confirmación al cerrar sesión
    function mostrarConfirmación() {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Hasta pronto!',
        showConfirmButton: false,
        timer: 1500
      });
    }

  return (
    <div>
      {token && (
        <div className="flex justify-end -mt-10 text-white font-bold mr-8">
          {/* carrito */}
          <div className="flex flex-row">
            <img
              className="h-14 w-14 p-2 mr-3 mt-1 hover:opacity-80 hover:cursor-pointer"
              src={carrito}
              onClick={() => {
                changeViewShoppingCart(true),
                  changeViewProductos(false),
                  changeViewInicio(false),
                  changeViewOrigen(false),
                  changeViewMaderas(false),
                  changeViewContacto(false),
                  changeViewPedidosPerfil(false),
                  changeViewDetallePedido(false),
                  changeViewHacerPedido(false),
                  changeViewPerfil(false);
                changeErrorFalse(false);
              }}
            ></img>

            {data.getProductosCarritoUser.length != 0 && (
              <span className="rounded-full bg-yellow-500 w-8 h-8 content-center mt-9 -ml-5">
                <span className="flex justify-center mt-1">
                  {data.getProductosCarritoUser.length}
                </span>
              </span>
            )}
          </div>

          {/* perfil */}
          <div className="relative inline-block text-left">
            <div>
              <img
                className="h-16 w-20 p-2 mr-3 hover:opacity-80 hover:cursor-pointer "
                src={fotoPerfil}
                id="menu-button-perfil"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setOpenSubMenuPerfil(!OpenSubMenuPerfil)}
              ></img>
            </div>

            {OpenSubMenuPerfil && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:text-orange-600"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                    onClick={() => {
                      changeViewPerfil(true),
                        changeViewShoppingCart(false),
                        changeViewProductos(false),
                        changeViewInicio(false),
                        changeViewOrigen(false),
                        changeViewMaderas(false),
                        changeViewContacto(false),
                        changeViewPedidosPerfil(false),
                        changeViewDetallePedido(false),
                        changeViewHacerPedido(false);
                      changeErrorFalse(false);
                      setOpenSubMenuPerfil(false);
                    }}
                  >
                    Perfil
                  </a>
                </div>

                {/* pedidos */}
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:text-orange-600"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                    onClick={() => {
                      changeViewPedidosPerfil(true),
                        changeViewDetallePedido(false),
                        changeViewShoppingCart(false),
                        changeViewProductos(false),
                        changeViewProductSelect(false),
                        changeViewInicio(false),
                        changeViewOrigen(false),
                        changeViewMaderas(false),
                        changeViewContacto(false),
                        changeViewHacerPedido(false),
                        changeViewSession(false),
                        changeViewPerfil(false);
                      changeErrorFalse(false);
                      setOpenSubMenuPerfil(false);
                    }}
                  >
                    Pedidos
                  </a>
                </div>

                {/* cerrar sesión */}
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:text-orange-600"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-2 on"
                    onClick={() => {
                      logOut();
                      mostrarConfirmación(),
                        setOpenSubMenuPerfil(false),
                        changeViewPedidosPerfil(false),
                        changeViewDetallePedido(false),
                        changeViewShoppingCart(false),
                        changeViewProductos(false),
                        changeViewProductSelect(false),
                        changeViewInicio(true),
                        changeViewOrigen(false),
                        changeViewMaderas(false),
                        changeViewContacto(false),
                        changeViewHacerPedido(false),
                        changeViewSession(false),
                        changeViewPerfil(false);
                      changeErrorFalse(false);
                      setOpenSubMenuPerfil(false);
                      console.log(
                        "me desloggeo, token: " + localStorage.getItem("token")
                      );
                      localStorage.removeItem("token");
                      console.log(
                        "me he desloggeado, token: " + localStorage.getItem("token")
                      );
                    }}
                  >
                    Cerrar Sesión
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BotonesUserLogged;
