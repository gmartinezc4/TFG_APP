import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { Context } from "../context/Context";

const GET_HISTORIAL_PEDIDOS_USER = gql`
  query Query {
    getHistorialPedidosUser {
      _id
      apellido
      ciudad
      codigoPostal
      direccion
      estado
      fechaPedido
      fechaRecogida
      id_user
      importeFreeIvaPedido
      importePedido
      masInformacion
      nombre
      pais
      telefono
      productos {
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
  }
`;

function PedidosPerfil() {
  const {
    changeViewDetallePedido,
    changeViewPedidosPerfil,
    changePedidoDetallado,
    changeViewProductos,
  } = useContext(Context);

  let PedidosActivos = [];
  let PedidosPendientes = [];
  let PedidosHistoricos = [];

  const { data, loading, error } = useQuery(GET_HISTORIAL_PEDIDOS_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loading) return <div></div>;
  if (error)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError("Not Found")}
      </div>
    );

  data?.getHistorialPedidosUser.map((pedido) => {
    if (pedido.estado == "Activo") {
      PedidosActivos.push(pedido);
    } else if (pedido.estado == "Pendiente") {
      PedidosPendientes.push(pedido);
    } else {
      PedidosHistoricos.push(pedido);
    }
  });

  return (
    <div>
      <div className="flex justify-center mt-20">
        {PedidosActivos.length==0 && PedidosPendientes.length==0 && PedidosHistoricos.length==0 && (
          <div className="flex flex-col justify-center mb-3">
            <h1 className="text-4xl font-semibold">Todavia no ha realizado ningun pedido </h1>
            <div className="flex justify-center mt-10">
              <button
                className="w-64 bg-orange-600 text-white p-2 mt-8 hover:bg-orange-500"
                onClick={() => {
                  changeViewProductos(true), changeViewPedidosPerfil(false);
                }}
              >
                Ver Productos
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col mb-96">
        <div className="flex justify-center">
          <div className="flex flex-col">
            {PedidosActivos.length != 0 && (
              <div>
                <h1 className="font-bold text-3xl mb-10 underline">Pedidos Activos</h1>
                {PedidosActivos.map((pedido) => (
                  <div className="flex flex-col mb-20">
                    <div>
                      <div className="flex justify-between mb-5">
                        <h1 className="text-2xl font-bold">Numero de pedido: {pedido._id}</h1>
                        <button
                          className="mb-3 text-orange-500 font-bold hover:text-orange-300"
                          onClick={() => {
                            changeViewDetallePedido(true),
                              changeViewPedidosPerfil(false),
                              changePedidoDetallado(pedido);
                          }}
                        >
                          Ver pedido
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-10">
                        <div className="flex flex-col font-bold">
                          Fecha del pedido{" "}
                          <span className="font-extralight">{pedido.fechaPedido}</span>
                        </div>
                        <div className="flex flex-col font-bold">
                          Total <span className="font-extralight">{pedido.importePedido} €</span>
                        </div>
                        <div className="flex flex-col font-bold -ml-16">
                          Estado del pedido <span className="font-extralight">{pedido.estado}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-10 mt-10">
                        {pedido.productos.map((prod) => (
                          <div key={prod._id}>
                            <img className="h-32 w-44 border rounded mb-3" src={prod.img}></img>
                            <div>{prod.name}</div>
                            <div className="font-extralight">Cantidad: {prod.cantidad} kg</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {PedidosPendientes.length != 0 && (
              <div>
                <h1 className="font-bold text-3xl mb-10 underline">Pedidos Pendientes de recoger</h1>
                {PedidosPendientes.map((pedido) => (
                  <div className="flex flex-col mb-20">
                    <div>
                      <div className="flex justify-between mb-5">
                        <h1 className="text-2xl font-bold">Numero de pedido: {pedido._id}</h1>
                        <button
                          className="mb-3 text-orange-500 font-bold hover:text-orange-300"
                          onClick={() => {
                            changeViewDetallePedido(true),
                              changeViewPedidosPerfil(false),
                              changePedidoDetallado(pedido);
                          }}
                        >
                          Ver pedido
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-10">
                        <div className="flex flex-col font-bold">
                          Fecha del pedido{" "}
                          <span className="font-extralight">{pedido.fechaPedido}</span>
                        </div>
                        <div className="flex flex-col font-bold">
                          Total <span className="font-extralight">{pedido.importePedido} €</span>
                        </div>
                        <div className="flex flex-col font-bold -ml-16">
                          Estado del pedido <span className="font-extralight">{pedido.estado}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-10 mt-10">
                        {pedido.productos.map((prod) => (
                          <div key={prod._id}>
                            <img className="h-32 w-44 border rounded mb-3" src={prod.img}></img>
                            <div>{prod.name}</div>
                            <div className="font-extralight">Cantidad: {prod.cantidad} kg</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {PedidosHistoricos.length != 0 && (
              <div>
                <h1 className="font-bold text-3xl mb-10 underline">Pedidos Anteriores</h1>
                {PedidosHistoricos.map((pedido) => (
                  <div className="flex flex-col mb-20">
                    <div>
                      <div className="flex justify-between mb-5">
                        <h1 className="text-2xl font-bold">Numero de pedido: {pedido._id}</h1>
                        <button
                          className="mb-3 text-orange-500 font-bold hover:text-orange-300"
                          onClick={() => {
                            changeViewDetallePedido(true),
                              changeViewPedidosPerfil(false),
                              changePedidoDetallado(pedido);
                          }}
                        >
                          Ver pedido
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-10">
                        <div className="flex flex-col font-bold">
                          Fecha del pedido{" "}
                          <span className="font-extralight">{pedido.fechaPedido}</span>
                        </div>
                        <div className="flex flex-col font-bold">
                          Total <span className="font-extralight">{pedido.importePedido} €</span>
                        </div>
                        <div className="flex flex-col font-bold -ml-16">
                          Estado del pedido <span className="font-extralight">{pedido.estado}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-10 mt-10">
                        {pedido.productos.map((prod) => (
                          <div key={prod._id}>
                            <img className="h-32 w-44 border rounded mb-3" src={prod.img}></img>
                            <div>{prod.name}</div>
                            <div className="font-extralight">Cantidad: {prod.cantidad} kg</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PedidosPerfil;
