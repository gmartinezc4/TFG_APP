import React, { useState, useContext, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Context } from "../context/Context";

const ADD_PRODUCTO_CARRITO = gql`
  mutation addProductCesta($idProducto: String!, $name: String!, $cantidad: String!, $tokenUser: String!) {
    addProductCesta(id_producto: $idProducto, name: $name, cantidad: $cantidad, tokenUser: $tokenUser) {
      id_producto
      name
      cantidad
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
  const { changeReload, token, reload } = useContext(Context);
  const [cantidad, setCantidad] = useState("");

  const [addProductoCarrito] = useMutation(ADD_PRODUCTO_CARRITO);

  const { data, loading, error } = useQuery(GET_PRODUCTO, {
    variables: {
      idProduct: props.productId,
    }
  });
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error...</div>;
  
  function actualizarCarrito() {
    console.log("haciendo mutation");
    addProductoCarrito({
      variables: {
        idProducto: props.productId,
        name: data.getProducto.name,
        cantidad: cantidad,
        tokenUser: token,
      },
    }).then(() => { changeReload(), console.log("despues de mutation")});
    
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="bg-no-repeat bg-contain -ml-96">
          <img
            className="h-80 w-100 border rounded"
            src={data.getProducto.img}
          ></img>
          <button
            className="border rounded text-white bg-black mt-10 p-2"
            onClick={() => {
              props.changeViewProductSelect();
            }}
          >
            volver
          </button>
        </div>

        <div className="ml-20 w-60 flex flex-col">
          <div className="font-serif text-5xl mb-10 underline">
            {data.getProducto.name}
          </div>

          <div className="font-serif text-2xl flex flex-row items-baseline">
            {data.getProducto.precio} €/kg
            <div className="font-serif text-sm text-gray-400 ml-3">
              IVA incluido
            </div>
          </div>

          {data.getProducto.stock <= 0 && <div className="mt-10">Sin Stock</div>}

          {data.getProducto.stock > 0 && (
            <div className="mt-10">Stock: {data.getProducto.stock} kg</div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (cantidad != 0) actualizarCarrito();
            }}
          >
            {data.getProducto.stock <= 0 && (
              <input
                className="w-64 border border-black mt-4 bg-red-200"
                placeholder="Sin Stcok"
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

      {/* {continuarCompra && (
        <ProcesoCompra producto={props.producto} cantidad={cantidad}/>
    )} */}
    </div>
  );
}

export default Producto;
