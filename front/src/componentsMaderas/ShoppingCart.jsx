import React, { useContext, useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Context } from "../context/Context";
import { FaTrashAlt, FaShopify, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import HacerPedido from "./HacerPedido";
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

const DELETE_PRODUCTO_CARRITO = gql`
  mutation Mutation($deleteProductCestaId: ID!) {
    deleteProductCesta(id: $deleteProductCestaId)
  }
`;

function ShoppingCart() {
  const {
    changeReload,
    token,
    viewShoppingCart,
    viewHacerPedido,
    changeViewShoppingCart,
    changeViewProductos,
    changeViewInicio,
    changeViewOrigen,
    changeViewMaderas,
    changeViewContacto,
    changeViewHacerPedido,
  } = useContext(Context);

  
  const [idProd, setIdProd] = useState("");
  
  let importe = 0;
  let importeFreeIva = 0;
  const fechaRecogida = new Date();

  const [deleteProductoCarrito] = useMutation(DELETE_PRODUCTO_CARRITO, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  const { data, loading, error } = useQuery(GET_PRODUCTOS_CARRITO_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loading) return <div></div>;
  if (error) return <div>Error...</div>;

  function actualizarCarrito() {
    console.log("haciendo mutation");
    console.log(idProd)
    deleteProductoCarrito({
      variables: {
        deleteProductCestaId: idProd,
      },
    }).then(() => {
      changeReload(), console.log("despues de mutation");
    });
  }

  return (
    <div>
      {viewShoppingCart && (
        <div>
          {/* si no hay productos */}
          {data?.getProductosCarritoUser.length == 0 && (
            <div className="flex justify-center ">
              <div className="flex flex-col mt-3 mb-7 bg-slate-200 p-5 container">
                <div className="bg-white">
                  <span className="flex justify-center p-5">
                    <FaShopify className="w-32 h-32 mb-5" />
                  </span>
                  <span className="flex justify-center text-3xl">Tu cesta est?? vacia</span>
                  <div className="flex justify-center p-5">
                    <button
                      className="w-64 bg-orange-600 text-white p-2 mt-8 hover:bg-orange-500"
                      onClick={() => {
                        changeViewProductos(true),
                          changeViewShoppingCart(false),
                          changeViewInicio(false),
                          changeViewOrigen(false),
                          changeViewMaderas(false),
                          changeViewContacto(false);
                      }}
                    >
                      Volver a la tienda
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* si hay productos */}
          {data?.getProductosCarritoUser.length != 0 && (
            <div className="flex justify-center ">
              <div className="grid grid-cols-2 gap-20 mt-3 mb-10 bg-slate-100 p-5">
                {/* columna izquierda */}
                <div>
                  {data?.getProductosCarritoUser.map((p) => (
                    <div key={p._id} className="grid grid-cols-3 p-4 mx-auto bg-white ">
                      <div className="bg-no-repeat bg-contain ">
                        <img className="h-30 w-40 border rounded mb-5 " src={p.img}></img>
                      </div>

                      <div className="flex flex-col mb-3 ml-5 ">
                        <span>{p.name}</span>
                        <span>Cantidad: {p.cantidad}kg</span>
                        <button
                          className="flex self-start mt-12 text-gray-400"
                          onClick={() => {
                            setIdProd(p._id),changeReload() ,actualizarCarrito();
                          }}
                        >
                          <div className="flex items-center">
                            <FaTrashAlt className="mr-2" />
                            eliminar
                          </div>
                        </button>
                      </div>

                      <div className="flex justify-end self-end mb-5">
                        <span className="font-bold">{p.precioTotal}???</span>
                      </div>

                      <div className="border border-gray-100"></div>

                      <div className="hidden">
                        {(importe = importe + parseInt(p.precioTotal))}
                        {(importeFreeIva = importeFreeIva + parseInt(p.precioTotal_freeIVA))}
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col bg-white mt-5 p-5 ">
                    <span className="font-bold text-xl mb-7">Fecha de recogida prevista</span>
                    <span>
                      {fechaRecogida.getDate() +
                        2 +
                        "/" +
                        (fechaRecogida.getMonth() + 1) +
                        " - " +
                        (fechaRecogida.getDate() + 4) +
                        "/" +
                        (fechaRecogida.getMonth() + 1)}
                      <br></br> <br></br>
                      Dispone de 7 d??as habiles para recoger el pedido
                    </span>
                  </div>

                  <div className="flex flex-col bg-white mt-5 p-5">
                    <span className="font-bold text-xl mb-7">Aceptamos</span>
                    <div className="flex flex-row">
                      <FaCcVisa className="w-9 h-9 mr-3" />
                      <FaCcMastercard className="w-9 h-9 ml-3 mr-3" />
                      <BsCashStack className="w-9 h-9 ml-3" />
                    </div>
                  </div>
                </div>

                {/* columna derecha */}
                <div className="flex flex-col bg-white h-48 p-5 ">
                  <h1 className="font-bold text-2xl mb-7">Total</h1>
                  <p className="flex justify-between mb-5">
                    <span>Subtotal</span>
                    <span>{importeFreeIva}???</span>
                  </p>
                  <div className="border border-gray-100 mb-5"></div>
                  <p className="flex justify-between mb-3 font-semibold">
                    <span>Total (IVA incluido)</span>
                    <span>{importe}???</span>
                  </p>
                  <div className="flex justify-center">
                    <button
                      className="w-64 bg-orange-600 text-white p-2 mt-8 hover:bg-orange-500"
                      onClick={() => {
                        changeViewHacerPedido(true),
                          changeViewProductos(false),
                          changeViewShoppingCart(false),
                          changeViewInicio(false),
                          changeViewOrigen(false),
                          changeViewMaderas(false),
                          changeViewContacto(false);
                      }}
                    >
                      Comenzar pedido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {viewHacerPedido && <HacerPedido productos={data.getProductosCarritoUser} />}
    </div>
  );
}

export default ShoppingCart;
