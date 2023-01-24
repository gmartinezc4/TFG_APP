import React, { useState, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import Product from "./Product";

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

function ShoppingCartProducts() {
  const [viewProductSelect, setViewProductSelect] = useState(false);
  const [product, setProduct] = useState(null);

  const { data, loading, error } = useQuery(GET_PRODUCTOS);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error...</div>;

    function changeViewProductSelect() {
        setViewProductSelect(false);
    }

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 mt-10">
        {!viewProductSelect &&
          data?.getProductos.map((p) => (
            <div
              key={p._id}
              className="flex justify-center flex-row p-4"
              onClick={() => {
                setViewProductSelect(true),
                setProduct(p);
              }}
            >
              <div className="bg-no-repeat bg-contain">
                <img className="h-30 w-40 border rounded" src={p.img}></img>
              </div>
              <div className="flex flex-col ml-4 h-30 w-40">
                <div className="font-bold mb-1"> {p.name}</div>

                <div className="border-b-2 border-black mb-2"></div>
                <span className="w-40">Precio: {p.precio} €/kg</span>
              </div>
            </div>
          ))}
      </div>

      {viewProductSelect && <Product product={product} changeViewProductSelect={changeViewProductSelect} />}
      
    </div>
  );
}

export default ShoppingCartProducts;
