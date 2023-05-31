import React, { useState, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import Producto from "./Producto";
import { Context } from "../context/Context";
import { useEffect } from "react";
import Cargando from "./Cargando";

const GET_PRODUCTOS = gql`
  query Query {
    getProductos {
      _id
      img
      name
      stock
      precio
    }
  }
`;

// 
// * Componente página Productos.
// * Renderiza los componentes <Cargando /> y <Producto />
// 
function ProductosVenta() {
  // Variables del contexto usadas
  const {
    changeErrorTrue,
    changeCodigoError,
    changeMensajeError,
    viewProductSelect,
    changeViewProductSelect,
  } = useContext(Context);

  const [productId, setProductId] = useState(null);

  // Query para traer los productos de la bbdd
  const { data, loading, error } = useQuery(GET_PRODUCTOS, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loading)
    return (
      <div>
        <Cargando />
      </div>
    );
  if (error)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError("Not Found")}
      </div>
    );

  return (
    <div className="mb-20">
      {/* Si no se ha seleccionado ningun producto, mostrar todos los productos recogidos de la bbdd */}
      <div className="grid grid-cols-3 gap-1 mt-10">
        {!viewProductSelect &&
          data?.getProductos.map((p) => (
            <div
              key={p._id}
              className={
                p.stock <= 4
                  ? "flex justify-center flex-col p-4 mx-auto hover:opacity-70 bg-red-300 cursor-pointer"
                  : "flex justify-center flex-col p-4 mx-auto hover:opacity-70 cursor-pointer"
              }
              onClick={() => {
                changeViewProductSelect(true), setProductId(p._id);
              }}
            >
              <div className="bg-no-repeat bg-contain h-50 w-60">
                <img
                  className={
                    p.stock <= 0 ? " border rounded opacity-70" : "border rounded mb-5"
                  }
                  src={p.img}
                ></img>
              </div>
              {p.stock <= 4 && <div className="mb-3 text-red-700">Producto agotado</div>}
              <div className="font-bold mb-1"> {p.name}</div>
              <span className="w-40">{p.precio} € / kg</span>
            </div>
          ))}
      </div>
      
      {/* Si se ha seleccionado un producto, renderizar el componente <Producto /> */}
      {viewProductSelect && <Producto productId={productId} />}
    </div>
  );
}

export default ProductosVenta;
