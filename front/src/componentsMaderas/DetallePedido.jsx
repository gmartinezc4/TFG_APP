import React, { useContext } from "react";
import { Context } from "../context/Context";

function DetallePedido(props) {
    const { changeViewDetallePedido, changeViewPedidosPerfil } =
    useContext(Context);

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Numero de pedido: {props.pedido._id}</h1>
        <div className="flex flex-col font-bold mt-5">
          Fecha del pedido{" "}
          <span className="font-extralight">{props.pedido.fechaPedido}</span>
        </div>

        <div className="border border-gray-200 mt-5"></div>

        {props.pedido.estado == "Cancelado" && (
          <div className="flex flex-col font-bold mt-5">
            Fecha de Cancelación
            <span className="font-extralight">{props.pedido.fechaRecogida}</span>
          </div>
        )}

        {props.pedido.estado != "Cancelado" && (
          <div className="flex flex-col font-bold mt-5">
            Fecha de recogida
            <span className="font-extralight">{props.pedido.fechaRecogida}</span>
          </div>
        )}

        <div className="border border-gray-200 mt-5"></div>

        <div className="mt-5">
          {props.pedido.productos.map((prod) => (
            <div key={prod._id} className="flex flex-row mb-5">
              <img className="h-24 w-32 border rounded mb-3" src={prod.img}></img>
              <div className="ml-3">
                <div className="font-bold">{prod.name}</div>
                <div className="font-extralight mt-2">{prod.cantidad} kg</div>
                <div className="font-extralight">{prod.precioTotal}€</div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200"></div>

        <div className="flex justify-between mt-5">
          <h1 className="font-bold text-2xl">Importe total</h1>
          <div className="mt-1">
            <p className="grid grid-cols-2 gap-10 mb-3">
              <span>Subtotal:</span>{" "}
              <span>{props.pedido.importeFreeIvaPedido.substr(0, 5)}€</span>
            </p>
            <p className="grid grid-cols-2 gap-10 font-bold">
              <span>Total:</span> <span>{props.pedido.importePedido}€</span>
            </p>
            <p>
              <span className="mr-10  text-gray-400 text-xs">
                (el Total Incluye el IVA)
              </span>
            </p>
          </div>
        </div>

        <div className="border border-gray-200 mt-5"></div>

        <div className="flex justify-between mt-5 mb-20">
          <h1 className="font-bold text-2xl">Dirección de facturación</h1>
          <div className="mt-1">
            <p>
              {props.pedido.nombre} {props.pedido.apellido}
            </p>
            <p>{props.pedido.direccion}</p>
            <p>
              <span>
                {props.pedido.codigoPostal}, {props.pedido.ciudad}, {props.pedido.pais}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-start mb-32">
          <button
            className="border border-black p-2 bg-black text-white hover:bg-slate-700"
            onClick={() => {
              changeViewDetallePedido(false), changeViewPedidosPerfil(true);
            }}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetallePedido;
