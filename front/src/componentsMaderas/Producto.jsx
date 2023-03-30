import React, { useState, useContext, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Context } from "../context/Context";
import Cargando from "./Cargando";
import Session from "./Session";

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

function Producto(props) {
  const {
    changeReload,
    token,
    changeViewProductos,
    changeViewProductSelect,
    reload,
    changeProductIdSelect,
    changeProductCantidadSelect,
    changeViewSession
  } = useContext(Context);
  const [cantidad, setCantidad] = useState("");

  useEffect(() => {}), [reload];

  const [addProductoCarrito] = useMutation(ADD_PRODUCTO_CARRITO, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  const { data, loading, error } = useQuery(GET_PRODUCTO, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    variables: {
      idProduct: props.productId,
    },
  });

  if (loading)
    return (
      <div>
        <Cargando />
      </div>
    );
  if (error) return <div>Error...</div>;

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

  return (
    <div>
      <div className="flex justify-center">
        <div className="bg-no-repeat bg-contain -ml-96">
          <img className="h-80 w-100 border rounded" src={data.getProducto.img}></img>
          <button
            className="border rounded text-white bg-black mt-10 p-2"
            onClick={() => {
              changeViewProductSelect();
            }}
          >
            volver
          </button>
        </div>

        <div className="ml-20 w-60 flex flex-col">
          <div className="font-serif text-5xl mb-10 underline">{data.getProducto.name}</div>

          <div className="font-serif text-2xl flex flex-row items-baseline">
            {data.getProducto.precio} €/kg
            <div className="font-serif text-sm text-gray-400 ml-3">IVA incluido</div>
          </div>

          {data.getProducto.stock <= 0 && <div className="mt-10">Sin Stock</div>}

          {data.getProducto.stock > 0 && (
            <div className="mt-10">Stock: {data.getProducto.stock} kg</div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (cantidad != 0 && token) {
                actualizarCarrito();
              } else {
                changeViewSession(true)
                changeViewProductSelect(false);
                changeViewProductos(false);
                changeProductIdSelect(props.productId)
                changeProductCantidadSelect(cantidad)
              }
            }}
          >
            {data.getProducto.stock <= 0 && (
              <input
                className="w-64 border border-black mt-4 bg-red-200"
                placeholder="Sin Stock"
                disabled
              ></input>
            )}

            {data.getProducto.stock > 0 && (
              <input
                className="w-64 border border-black mt-4"
                placeholder="Pedido mínimo 5kg"
                type="number"
                name="cantidad"
                min="5"
                max={data.getProducto.stock}
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
                autoFocus
              ></input>
            )}

            {data.getProducto.stock <= 0 && (
              <button
                className="w-64 bg-black text-white p-2 mt-8 hover:bg-red-400"
                type="submit"
                disabled
              >
                Sin stock
              </button>
            )}

            {data.getProducto.stock > 0 && (
              <button
                className="w-64 bg-black text-white p-2 mt-8 hover:bg-slate-700 active:bg-green-600"
                type="submit"
              >
                Añadir a la cesta
              </button>
            )}
          </form>
        </div>
      </div>
      
      
      
    </div>
  );
}

export default Producto;
