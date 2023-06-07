import React, { useContext } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Context } from "../context/Context";
import { FaTrashAlt, FaShopify, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import CorreoConfirmacionPedido from "./CorreoConfirmacionPedido";
import styled from "styled-components";
import Cargando from "./Cargando";

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

const GET_USER = gql`
  query Query {
    getUser {
      _id
      nombre
      apellido
      correo
      password
    }
  }
`;

const DELETE_PRODUCTO_CARRITO = gql`
  mutation Mutation($deleteProductCestaId: ID!) {
    deleteProductCesta(id: $deleteProductCestaId)
  }
`;

//
// * Componente página ShoppingCart.
// * Renderiza el componente <CorreoConfirmacionPedido />
//
function ShoppingCart() {
  // Varables del contexto usadas
  const {
    changeReload,
    changeViewShoppingCart,
    changeViewProductos,
    changeViewInicio,
    changeViewOrigen,
    changeViewMaderas,
    changeViewContacto,
    changeViewHacerPedido,
    changeProductosShoppingCart,
    changeViewProductSelect,
    enviarCorreoConfirmacion,
    changeErrorTrue,
    changeCodigoError,
    changeMensajeError,
  } = useContext(Context);

  let idProd = "";
  let importe = 0;
  let importeFreeIva = 0;
  const aserraderoMaps = () => {
    window.open(
      "https://www.google.com/maps/place/Casa+de+Moya,+16740+La+Almarcha,+Cuenca/@39.6835612,-2.4447486,17z/data=!3m1!4b1!4m6!3m5!1s0xd67e1c0d0129313:0x3118d5409dc9a973!8m2!3d39.6835612!4d-2.4425599!16s%2Fg%2F11_q_47nx",
      "_blank"
    );
  };

  //
  // * Mutation para eliminar un producto al carrito del usuario.
  //
  const [deleteProductoCarrito] = useMutation(DELETE_PRODUCTO_CARRITO, {
    onCompleted: () => {
      console.log("despues de mutation");
      changeReload();
    },
    onError: (error) => {
      console.log(error.toString());
    },
  });

  //
  // * Query para traer los productos del carrito del usuario.
  //
  const {
    data: dataGetProductos,
    loading: loadingGetProductos,
    error: errorGetPoductos,
  } = useQuery(GET_PRODUCTOS_CARRITO_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  //
  // * Query para traer el usuario que está con la sesión iniciada.
  //
  const {
    data: dataGetUser,
    loading: loadingGetUser,
    error: errorGetUser,
  } = useQuery(GET_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loadingGetProductos || loadingGetUser)
    return (
      <div className="mb-96">
        <Cargando />
      </div>
    );
  if (errorGetPoductos)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError(error.message)}
      </div>
    );

  if (errorGetUser)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError(errorGetUser.message)}
      </div>
    );

  //
  // * Añadir al localStorage estas variables, usadas en el
  // * componente <HacerPedido />
  //
  localStorage.setItem("nombreUser", dataGetUser.getUser.nombre);
  localStorage.setItem("apellidoUser", dataGetUser.getUser.apellido);
  localStorage.setItem("emailUser", dataGetUser.getUser.correo);

  //
  // * Función que realiza la mutation deleteProductoCarrito para
  // * borrar un producto del carrito del usuario.
  //
  function actualizarCarrito() {
    console.log("haciendo mutation");
    console.log("prodId " + idProd);
    deleteProductoCarrito({
      context: {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      },
      variables: {
        deleteProductCestaId: idProd,
      },
    });
  }

  return (
    <div>
      <div>
        {/* si no hay productos */}
        {dataGetProductos?.getProductosCarritoUser.length == 0 && (
          <div className="flex justify-center mb-80 mt-10">
            <FondoGrandeNoCarrito className="flex flex-col mt-3 mb-7  p-5 container">
              <FondoPequeNoCarrito>
                <span className="flex justify-center p-5">
                  <FaShopify className="w-32 h-32 mb-5" />
                </span>
                <span className="flex justify-center text-3xl">Tu cesta está vacia</span>
                <div className="flex justify-center p-5">
                  <Button
                    className="w-64 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      changeViewProductos(true),
                        changeViewShoppingCart(false),
                        changeViewInicio(false),
                        changeViewOrigen(false),
                        changeViewMaderas(false),
                        changeViewContacto(false);
                      changeViewProductSelect(false);
                    }}
                  >
                    Volver a la tienda
                  </Button>
                </div>
              </FondoPequeNoCarrito>
            </FondoGrandeNoCarrito>
          </div>
        )}

        {/* si hay productos */}
        {dataGetProductos?.getProductosCarritoUser.length != 0 && (
          <div className="flex justify-center mb-44">
            <FondoGrande className="grid grid-cols-2 gap-20 mt-3 mb-10 p-5">
              {/* columna izquierda */}
              <div>
                {dataGetProductos?.getProductosCarritoUser.map((p) => (
                  <FondoPeque
                    key={p._id}
                    className="grid grid-cols-3 p-4 mx-auto bg-white "
                  >
                    <div className="bg-no-repeat bg-contain ">
                      <img className="h-30 w-40 border rounded mb-5 " src={p.img}></img>
                    </div>

                    <div className="flex flex-col mb-3 ml-5 ">
                      <span className="font-bold underline">{p.name}</span>
                      <span>Cantidad: {p.cantidad}kg</span>
                      <button
                        className="flex self-start mt-10 text-gray-400"
                        onClick={() => {
                          (idProd = p._id), actualizarCarrito();
                        }}
                      >
                        <div className="flex items-center">
                          <FaTrashAlt className="mr-2" />
                          eliminar
                        </div>
                      </button>
                    </div>

                    <div className="flex justify-end self-end mb-5">
                      <span className="font-bold">{p.precioTotal}€</span>
                    </div>

                    <div className="border border-gray-100"></div>

                    <div className="hidden">
                      {(importe = importe + parseFloat(p.precioTotal))}
                      {
                        (importeFreeIva =
                          importeFreeIva + parseFloat(p.precioTotal_freeIVA))
                      }
                    </div>
                  </FondoPeque>
                ))}

                <FondoPeque className="flex flex-col bg-white mt-5 p-5 ">
                  <span className="font-bold text-xl mb-7">
                    Fecha de recogida prevista
                  </span>
                  <span>
                    Aproximadamente cuatro días laborables.
                    <br></br> <br></br>
                    Después dispone de 7 días laborables para recoger el pedido.
                  </span>
                </FondoPeque>

                <FondoPeque className="flex flex-col bg-white mt-5 p-5 ">
                  <span className="font-bold text-xl mb-7">Dirección de recogida</span>
                  <span>
                    <a
                      onClick={aserraderoMaps}
                      className="hover:cursor-pointer underline"
                    >
                      Casa de Moya, 16740 La Almarcha, Cuenca
                    </a>
                    <br></br> <br></br>
                    <span className="flex flex-row justify-between">
                      <p>Lunes - Viernes</p>
                      <p>09:00 - 20:00</p>
                    </span>
                    <span className="flex flex-row justify-between">
                      <p>Sabados</p>
                      <p>09:00 - 14:00</p>
                    </span>
                    <span className="flex flex-row justify-between">
                      <p>Domingos</p>
                      <p>Cerrado</p>
                    </span>
                  </span>
                </FondoPeque>

                <FondoPeque className="flex flex-col bg-white mt-5 p-5">
                  <span className="font-bold text-xl mb-7">Aceptamos</span>
                  <div className="flex flex-row">
                    <FaCcVisa className="w-9 h-9 mr-3" />
                    <FaCcMastercard className="w-9 h-9 ml-3 mr-3" />
                    <BsCashStack className="w-9 h-9 ml-3" />
                  </div>
                </FondoPeque>
              </div>

              {/* columna derecha */}
              <FondoPeque className="flex flex-col bg-white h-48 p-5 ">
                <h1 className="font-bold text-2xl mb-7">Total</h1>
                <p className="flex justify-between mb-5">
                  <span>Subtotal</span>
                  <span>{importeFreeIva.toString().substr(0, 5)}€</span>
                </p>
                <div className="border border-gray-100 mb-5"></div>
                <p className="flex justify-between mb-3 font-semibold">
                  <span>Total (IVA incluido)</span>
                  <span>{importe.toString().substr(0, 5)}€</span>
                </p>
                <div className="flex justify-center">
                  <button
                    className="w-64 bg-yellow-500 text-white p-2 mt-8 hover:bg-yellow-400"
                    onClick={() => {
                      changeViewHacerPedido(true),
                        changeViewProductos(false),
                        changeViewShoppingCart(false),
                        changeViewInicio(false),
                        changeViewOrigen(false),
                        changeViewMaderas(false),
                        changeViewContacto(false);
                      changeProductosShoppingCart(
                        dataGetProductos.getProductosCarritoUser
                      );
                    }}
                  >
                    Comenzar pedido
                  </button>
                </div>
              </FondoPeque>
            </FondoGrande>
          </div>
        )}
      </div>

      {/* Si se cumple la condición renderizar el componente <CorreoConfirmaciónPedido.
      Ocurre tras confirmar el pedido en el componente <HacerPeido /> */}
      {enviarCorreoConfirmacion && <CorreoConfirmacionPedido />}
    </div>
  );
}

export default ShoppingCart;

const FondoPequeNoCarrito = styled.div`
  background-color: #fef1c7;
`;

const FondoGrandeNoCarrito = styled.div`
  background-color: #f5be0b;
`;

const FondoGrande = styled.div`
  background-color: #e0e2e5;
`;

const FondoPeque = styled.div`
  background-color: #f5f5f4;
`;

const Button = styled.button`
  background: #f5be0b;
  text-aling: center;
  &:hover {
    background-color: #fef1c7;
    color: black;
    border-color: black;
    border-width: 1px;
    border-style: solid;
  }
`;
