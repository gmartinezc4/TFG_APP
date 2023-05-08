import React, { useContext } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Context } from "../context/Context";
import { FaTrashAlt, FaShopify, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import CorreoConfirmacionPedido from "./CorreoConfirmacionPedido";

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

function ShoppingCart() {
  const {
    changeReload,
    changeViewShoppingCart,
    changeViewProductos,
    changeViewInicio,
    changeViewOrigen,
    changeViewMaderas,
    changeViewContacto,
    changeViewHacerPedido,
    modalIsOpenConfirmacionCorreo,
    closeModalConfirmacionCorreo,
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

  const [deleteProductoCarrito] = useMutation(DELETE_PRODUCTO_CARRITO, {
    onCompleted: () => {
      console.log("despues de mutation");
      changeReload();
    },
    onError: (error) => {
      console.log(error.toString());
    },
  });

  const { data: dataGetProductos, loading: loadingGetProductos, error: errorGetPoductos } = useQuery(GET_PRODUCTOS_CARRITO_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  const { data: dataGetUser, loading: loadingGetUser, error: errorGetUser } = useQuery(GET_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loadingGetProductos) return <div></div>;
  if (errorGetPoductos)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError("Not Found")}
      </div>
    );

    if (loadingGetUser) return <div></div>;
    if (errorGetUser) return console.log(error);
  
    localStorage.setItem("nombreUser", dataGetUser.getUser.nombre);
    localStorage.setItem("apellidoUser", dataGetUser.getUser.apellido);
    localStorage.setItem("emailUser", dataGetUser.getUser.correo);

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
          <div className="flex justify-center mb-96">
            <div className="flex flex-col mt-3 mb-7 bg-slate-200 p-5 container">
              <div className="bg-white">
                <span className="flex justify-center p-5">
                  <FaShopify className="w-32 h-32 mb-5" />
                </span>
                <span className="flex justify-center text-3xl">Tu cesta está vacia</span>
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
                      changeViewProductSelect(false);
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
        {dataGetProductos?.getProductosCarritoUser.length != 0 && (
          <div className="flex justify-center mb-96">
            <div className="grid grid-cols-2 gap-20 mt-3 mb-10 bg-slate-100 p-5">
              {/* columna izquierda */}
              <div>
                {dataGetProductos?.getProductosCarritoUser.map((p) => (
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
                  </div>
                ))}

                <div className="flex flex-col bg-white mt-5 p-5 ">
                  <span className="font-bold text-xl mb-7">
                    Fecha de recogida prevista
                  </span>
                  <span>
                    Aproximadamente cuatro días laborables.
                    <br></br> <br></br>
                    Después dispone de 7 días habiles para recoger el pedido
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
                  <span>{importeFreeIva.toString().substr(0, 5)}€</span>
                </p>
                <div className="border border-gray-100 mb-5"></div>
                <p className="flex justify-between mb-3 font-semibold">
                  <span>Total (IVA incluido)</span>
                  <span>{importe.toString().substr(0, 5)}€</span>
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
                      changeProductosShoppingCart(
                        dataGetProductos.getProductosCarritoUser
                      );
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

      {enviarCorreoConfirmacion && (
        <CorreoConfirmacionPedido
          closeModalConfirmacionCorreo={closeModalConfirmacionCorreo}
          modalIsOpenConfirmacionCorreo={modalIsOpenConfirmacionCorreo}
          mensaje={"Pedido confirmadoooo"}
        />
      )}
    </div>
  );
}

export default ShoppingCart;
