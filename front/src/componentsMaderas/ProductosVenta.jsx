import React, { useState, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import Producto from "./Producto";
import { Context } from "../context/Context";
import Session from "./Session";
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

function ProductosVenta() {
  const { viewProductos, token, reload } = useContext(Context);
  const [viewProductSelect, setViewProductSelect] = useState(false);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
  }), [reload];

  const { data, loading, error } = useQuery(GET_PRODUCTOS);


  if (loading) return <div><Cargando /></div>;
  if (error) return <div>Error...</div>;

  function changeViewProductSelect() {
    setViewProductSelect(false);
  }
  
  if (viewProductos == true && token) {
    return (
      <div>
        <div className="grid grid-cols-4 gap-1 mt-10">
          {!viewProductSelect &&
            data?.getProductos.map((p) => (
              <div
                key={p._id}
                className={p.stock <= 0 ? "flex justify-center flex-col p-4 mx-auto hover:opacity-70 bg-red-300" : "flex justify-center flex-col p-4 mx-auto hover:opacity-70"}
                onClick={() => {
                  setViewProductSelect(true), setProductId(p._id);
                }}
              >
                <div className="bg-no-repeat bg-contain h-50 w-60">
                  <img className={p.stock <= 0 ? " border rounded opacity-70" : "border rounded mb-5"} src={p.img}></img>
                </div>
                {p.stock <= 0 && (<div className="mb-3 text-red-700">Producto agotado</div>)}
                <div className="font-bold mb-1"> {p.name}</div>
                <span className="w-40">{p.precio} € / kg</span>
              </div>
            ))}
        </div>

        {viewProductSelect && (
          <Producto
            productId={productId}
            changeViewProductSelect={changeViewProductSelect}
          />
        )}
      </div>
    );
  } else if (viewProductos == true) {
    return (
      <div>
        <Session />
      </div>
    );
  }
}

export default ProductosVenta;
