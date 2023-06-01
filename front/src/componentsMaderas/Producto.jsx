import React, { useState, useContext, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Context } from "../context/Context";
import Cargando from "./Cargando";
import Swal from "sweetalert2";
import styled from "styled-components";


const ADD_PRODUCTO_CARRITO = gql`
  mutation Mutation($idProducto: String!, $cantidad: String!) {
    addProductCesta(id_producto: $idProducto, cantidad: $cantidad) {
      cantidad
      id_producto
      id_user
      img
      name
      precioTotal
      precioTotal_freeIVA
    }
  }
`;

const GET_PRODUCTO = gql`
  query Query($idProduct: String!) {
    getProducto(id_product: $idProduct) {
      _id
      name
      precio
      stock
      img
    }
  }
`;

const GET_PRODUCTO_CARRITO_USER = gql`
  query GetProductoCarritoUser($idProduct: String!) {
    getProductoCarritoUser(id_product: $idProduct) {
      _id
      cantidad
      id_producto
      id_user
      img
      name
      precioTotal
      precioTotal_freeIVA
    }
  }
`;

//
// * Componente Producto.
// * Muestra el producto selecionado por el usuario
//
function Producto(props) {
  // Variables del contexto usadas
  const {
    changeReload,
    token,
    changeViewProductos,
    changeViewProductSelect,
    reload,
    changeProductIdSelect,
    changeProductCantidadSelect,
    changeViewSession,
  } = useContext(Context);

  const [cantidad, setCantidad] = useState("");
  let cantidadProdCarrito = 0;

  //recarga la págin cada vez que cambia reload
  useEffect(() => {}), [reload];

  // Mutation para añadir un producto al carrito del user
  const [addProductoCarrito] = useMutation(ADD_PRODUCTO_CARRITO, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  // Query para traer un producto de la bbdd
  const {
    data: dataProd,
    loading: loadingProd,
    error: errorProd,
  } = useQuery(GET_PRODUCTO, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    variables: {
      idProduct: props.productId,
    },
  });

  // Query para traer los productos del carrito del user de la bbdd
  const {
    data: dataProductosCarrito,
    loading: loadingProductosCarrito,
    error: errorProductosCarrito,
  } = useQuery(GET_PRODUCTO_CARRITO_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    variables: {
      idProduct: props.productId,
    },
  });

  if (loadingProd)
    return (
      <div className="mb-96">
        <Cargando />
      </div>
    );
  if (errorProd)
    return console.log(errorProd);

  if (dataProductosCarrito) {
    cantidadProdCarrito = dataProductosCarrito.getProductoCarritoUser.cantidad;
  }

  //
  // * Función para actualizar el carrito del usuario.
  // * Realiza la Mutation addProductoCarrito.
  //
  function actualizarCarrito() {
    console.log("haciendo mutation");
    addProductoCarrito({
      variables: {
        idProducto: props.productId,
        cantidad: cantidad,
      },
    }).then(() => {
      changeReload(), console.log("despues de mutation");
    });
  }

  //modal de confirmación al añadir un producto al carrito
  function mostrarConfirmación() {
    Swal.fire({
      icon: "success",
      title: "Producto añadido a la cesta",
      text: cantidad + "kg",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <div>
      <div className="flex justify-center mb-72">
        {/* Boton de volver */}
        <div className="bg-no-repeat bg-contain -ml-96">
          <img className="h-80 w-100 border rounded" src={dataProd.getProducto.img}></img>
          <ButtonVolver
            className="text-white bg-black mt-10 p-2"
            onClick={() => {
              changeViewProductSelect();
            }}
          >
            Volver
          </ButtonVolver>
        </div>

        {/* Mostrar producto */}
        <div className="ml-20  flex flex-col">
          <div className="font-PTserif text-5xl mb-10 underline">
            {dataProd.getProducto.name}
          </div>

          <div className="font-PTserif text-2xl flex flex-row items-baseline">
            {dataProd.getProducto.precio} €/kg
            <div className="font-serif text-sm text-white ml-3">IVA incluido</div>
          </div>

          {cantidadProdCarrito == 0 && (
            <div>
              {dataProd.getProducto.stock <= 4 && (
                <div className="mt-5 font-PTserif">Sin Stock</div>
              )}

              {dataProd.getProducto.stock > 4 && (
                <div className="mt-10 font-PTserif">
                  Stock: {dataProd.getProducto.stock - cantidadProdCarrito} kg
                </div>
              )}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (cantidad != 0 && token) {
                    actualizarCarrito();
                    mostrarConfirmación();
                  } else {
                    changeViewSession(true);
                    changeViewProductSelect(false);
                    changeViewProductos(false);
                    changeProductIdSelect(props.productId);
                    changeProductCantidadSelect(cantidad);
                  }
                }}
              >
                <div className="flex flex-col">
                  {dataProd.getProducto.stock <= 4 && (
                    <input
                      className="w-64 border border-black mt-4 bg-red-200"
                      placeholder="Sin Stock"
                      disabled
                    ></input>
                  )}

                  {dataProd.getProducto.stock > 4 && (
                    <input
                      className="w-64 border border-black mt-4"
                      placeholder="Pedido mínimo 5kg"
                      type="number"
                      name="cantidad"
                      min="5"
                      max={dataProd.getProducto.stock - cantidadProdCarrito}
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      required
                      autoFocus
                    ></input>
                  )}

                  {dataProd.getProducto.stock <= 4 && (
                    <button
                      className="w-64 bg-black text-white p-2 mt-8 hover:bg-red-400"
                      type="submit"
                      disabled
                    >
                      Sin stock
                    </button>
                  )}

                  {dataProd.getProducto.stock > 4 && (
                    <Button
                      className="w-64 bg-black text-white p-2 mt-8 active:bg-green-600"
                      type="submit"
                    >
                      Añadir a la cesta
                    </Button>
                  )}
                </div>
              </form>
            </div>
          )}

          {cantidadProdCarrito != 0 && (
            <div>
              {(dataProd.getProducto.stock <= 4 ||
                dataProd.getProducto.stock - cantidadProdCarrito) < 4 && (
                <div className="mt-5 font-PTserif">Sin Stock</div>
              )}

              {dataProd.getProducto.stock > 4 &&
                dataProd.getProducto.stock - cantidadProdCarrito > 4 && (
                  <div className="mt-10 font-PTserif">
                    Stock: {dataProd.getProducto.stock - cantidadProdCarrito} kg
                  </div>
                )}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (cantidad != 0 && token) {
                    actualizarCarrito();
                    mostrarConfirmación();
                  } else {
                    changeViewSession(true);
                    changeViewProductSelect(false);
                    changeViewProductos(false);
                    changeProductIdSelect(props.productId);
                    changeProductCantidadSelect(cantidad);
                  }
                }}
              >
                <div>
                  {(dataProd.getProducto.stock <= 4 ||
                    dataProd.getProducto.stock - cantidadProdCarrito) <= 4 && (
                    <input
                      className="w-64 border border-black mt-4 bg-red-200"
                      placeholder="Sin Stock"
                      disabled
                    ></input>
                  )}

                  {dataProd.getProducto.stock > 4 &&
                    dataProd.getProducto.stock - cantidadProdCarrito > 4 && (
                      <input
                        className="w-64 border border-black mt-4"
                        placeholder="Pedido mínimo 5kg"
                        type="number"
                        name="cantidad"
                        min="5"
                        max={dataProd.getProducto.stock - cantidadProdCarrito}
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                        autoFocus
                      ></input>
                    )}

                  {(dataProd.getProducto.stock <= 4 ||
                    dataProd.getProducto.stock - cantidadProdCarrito) <= 4 && (
                    <button
                      className="w-64 bg-black text-white p-2 mt-8 hover:bg-red-400"
                      type="submit"
                      disabled
                    >
                      Sin stock
                    </button>
                  )}

                  {dataProd.getProducto.stock > 4 &&
                    dataProd.getProducto.stock - cantidadProdCarrito > 4 && (
                      <Button
                        className="w-64 bg-black text-white p-2 mt-8 hover:bg-slate-700 active:bg-green-600"
                        type="submit"
                      >
                        Añadir a la cesta
                      </Button>
                    )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Producto;

const Button = styled.button`
  text-aling: center;
  cursor: pointer;
  &:hover {
    background-color: #f5be0b;
    color: black;
  }
`
const ButtonVolver = styled.div`
  text-aling: center;
  cursor: pointer;
  width: 63px;
  &:hover {
    background-color: #f5be0b;
    color: black;
  }
`