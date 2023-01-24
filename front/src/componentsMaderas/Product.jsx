import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import ProcesoCompra from './ProcesoCompra'

const VENDER_PRODUCTO = gql`
  mutation VenderProducto($venderProductoId: String!, $cantidad: String!) {
    venderProducto(id: $venderProductoId, cantidad: $cantidad) {
      _id
      img
      name
      precio
      stock
    }
  }
`;

function Product(props) {
  const [cantidad, setCantidad] = useState("");
  const [continuarCompra, setContinuarCompra] = useState(false);
  const [venderProductoMutation, { error }] = useMutation(VENDER_PRODUCTO);

  function venderProducto() {
    console.log("dentro");
    venderProductoMutation({
      variables: {
        venderProductoId: props.product._id,
        cantidad,
      },
    });
    console.log(error);
  }

  return (
    <div>
      {!continuarCompra && (
        <div className="flex justify-center">
          
          <div className="bg-no-repeat bg-contain -ml-96">
            <img
              className="h-80 w-100 border rounded"
              src={props.product.img}
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
              {props.product.name}
            </div>

            <div className="font-serif text-2xl flex flex-row items-baseline">
              {props.product.precio} €/kg
              <div className="font-serif text-sm text-gray-400 ml-3">
                IVA incluido
              </div>
            </div>

            <div className="mt-10">Stock: {props.product.stock} kg</div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                if(cantidad != 0)
                setContinuarCompra(true);
              }}
            >
              <input
                className="w-64 border border-black mt-4"
                placeholder="Escriba una cantidad (kg)"
                type="number"
                name="cantidad"
                min="5"
                max={props.product.stock}
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              ></input>
              <button
                className="w-64 bg-black text-white p-2 mt-8"
                type="submit"
              >
                Añadir a la cesta
              </button>
            </form>
          </div>

        </div>
      )}

    {continuarCompra && (
        <ProcesoCompra producto={props.producto} cantidad={cantidad}/>
    )}

    </div>
  );
}

export default Product;
