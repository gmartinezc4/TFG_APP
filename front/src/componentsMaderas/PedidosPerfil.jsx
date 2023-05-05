import React, { useContext } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Context } from "../context/Context";
import Swal from "sweetalert2";

const GET_PEDIDOS_RECOGIDOS_USER = gql`
  query Query {
    getPedidosRecogidos {
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

const GET_PEDIDOS_ACTIVOS_USER = gql`
  query Query {
    getPedidosActivosUser {
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

const GET_PEDIDOS_PENDIENTES_USER = gql`
  query Query {
    getPedidosPendientesUser {
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

const GET_PEDIDOS_CANCELADOS_USER = gql`
  query Query {
    getPedidosCanceladosUser {
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

const CANCELAR_PEDIDO = gql`
  mutation Mutation($idPedido: ID!) {
    cancelarPedido(id_pedido: $idPedido) {
      _id
      apellido
      ciudad
      codigoPostal
      direccion
      email
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
    changeReload
  } = useContext(Context);
  

  const [cancelarPedido] = useMutation(CANCELAR_PEDIDO, {
    onCompleted: () => {
      console.log("Se ha cancelado el pedido");
      changeReload();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se ha cancelado el pedido",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha ocurrido un error",
        text: "Por favor, intentelo de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const {
    data: dataRecogidos,
    loading: loadingRecogidos,
    error: errorRecogidos,
  } = useQuery(GET_PEDIDOS_RECOGIDOS_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  const {
    data: dataActivos,
    loading: loadingActivos,
    error: errorActivos,
  } = useQuery(GET_PEDIDOS_ACTIVOS_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  const {
    data: dataPendientes,
    loading: loadingPendientes,
    error: errorPendientes,
  } = useQuery(GET_PEDIDOS_PENDIENTES_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  const {
    data: dataCancelados,
    loading: loadingCancelados,
    error: errorCancelados,
  } = useQuery(GET_PEDIDOS_CANCELADOS_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loadingRecogidos) return <div></div>;
  if (errorRecogidos) return console.log(errorRecogidos);

  if (loadingActivos) return <div></div>;
  if (errorActivos) return console.log(errorActivos);

  if (loadingPendientes) return <div></div>;
  if (errorPendientes) return console.log(errorPendientes);

  if (loadingCancelados) return <div></div>;
  if (errorCancelados) return console.log(errorCancelados);

  function modalCancelarPedido(idPedido) {
    Swal.fire({
      icon: "warning",
      title: "¿Confirmar cambios?",
      showCancelButton: true,
      confirmButtonText: "Cancelar pedido",
      cancelButtonText: "Atras",
      confirmButtonColor: "#DF0000",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelarPedido({
          context: {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          },
          variables: {
            idPedido: idPedido,
          },
        });
      }
    });
  }

  return (
    <div>
      <div className="flex justify-center mt-20">
        {dataActivos.getPedidosActivosUser.length == 0 &&
          dataPendientes.getPedidosPendientesUser.length == 0 &&
          dataCancelados.getPedidosCanceladosUser.length == 0 &&
          dataRecogidos.getPedidosRecogidos.length == 0 && (
            <div className="flex flex-col justify-center mb-3">
              <h1 className="text-4xl font-semibold">
                Todavia no ha realizado ningun pedido
              </h1>
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

      <div className="flex justify-center flex-col px-96">
        <div className="flex flex-col bg-slate-200 p-20 mb-5">
          {dataActivos.getPedidosActivosUser.length != 0 && (
            <div>
              <h1 className="font-bold text-3xl mb-10 -mt-14 underline">
                Pedidos activos
              </h1>
              {dataActivos.getPedidosActivosUser.map((pedido) => (
                <div className="flex flex-col mb-20" key={pedido._id}>
                  <div>
                    <div className="flex justify-between mb-5">
                      <h1 className="text-2xl font-bold">
                        Numero de pedido: {pedido._id}
                      </h1>
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
                        Fecha del pedido
                        <span className="font-extralight">{pedido.fechaPedido}</span>
                      </div>
                      <div className="flex flex-col font-bold">
                        Total
                        <span className="font-extralight">{pedido.importePedido} €</span>
                      </div>
                      <div className="flex flex-col font-bold -ml-16">
                        Estado del pedido
                        <span className="font-extralight">{pedido.estado}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-10 mt-10">
                      {pedido.productos.map((prod) => (
                        <div key={prod._id}>
                          <img
                            className="h-32 w-44 border rounded mb-3"
                            src={prod.img}
                          ></img>
                          <div>{prod.name}</div>
                          <div className="font-extralight">
                            Cantidad: {prod.cantidad} kg
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="border rounded text-black bg-red-600 hover:bg-red-500 mt-10 p-2"
                      onClick={() => {
                        modalCancelarPedido(pedido._id);
                      }}
                    >
                      Cancelar pedido
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col bg-slate-200 p-20 mb-5">
          {dataPendientes.getPedidosPendientesUser.length != 0 && (
            <div>
              <h1 className="font-bold text-3xl mb-10 -mt-14 underline">
                Pedidos pendientes de recogida
              </h1>
              {dataPendientes.getPedidosPendientesUser.map((pedido) => (
                <div className="flex flex-col mb-20" key={pedido._id}>
                  <div>
                    <div className="flex justify-between mb-5">
                      <h1 className="text-2xl font-bold">
                        Numero de pedido: {pedido._id}
                      </h1>
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
                        Total
                        <span className="font-extralight">{pedido.importePedido} €</span>
                      </div>
                      <div className="flex flex-col font-bold -ml-16">
                        Estado del pedido
                        <span className="font-extralight">{pedido.estado}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-10 mt-10">
                      {pedido.productos.map((prod) => (
                        <div key={prod._id}>
                          <img
                            className="h-32 w-44 border rounded mb-3"
                            src={prod.img}
                          ></img>
                          <div>{prod.name}</div>
                          <div className="font-extralight">
                            Cantidad: {prod.cantidad} kg
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col bg-slate-200 p-20 mb-5">
          {dataCancelados.getPedidosCanceladosUser.length != 0 && (
            <div>
              <h1 className="font-bold text-3xl mb-10 -mt-14 underline">
                Pedidos cancelados
              </h1>
              {dataCancelados.getPedidosCanceladosUser.map((pedido) => (
                <div className="flex flex-col mb-20" key={pedido._id}>
                  <div>
                    <div className="flex justify-between mb-5">
                      <h1 className="text-2xl font-bold">
                        Numero de pedido: {pedido._id}
                      </h1>
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
                        Total
                        <span className="font-extralight">{pedido.importePedido} €</span>
                      </div>
                      <div className="flex flex-col font-bold -ml-16">
                        Estado del pedido
                        <span className="font-extralight">{pedido.estado}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-10 mt-10">
                      {pedido.productos.map((prod) => (
                        <div key={prod._id}>
                          <img
                            className="h-32 w-44 border rounded mb-3"
                            src={prod.img}
                          ></img>
                          <div>{prod.name}</div>
                          <div className="font-extralight">
                            Cantidad: {prod.cantidad} kg
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col bg-slate-200 p-20 mb-5">
          {dataRecogidos.getPedidosRecogidos.length != 0 && (
            <div>
              <h1 className="font-bold text-3xl mb-10 -mt-14 underline">
                Pedidos anteriores
              </h1>
              {dataRecogidos.getPedidosRecogidos.map((pedido) => (
                <div className="flex flex-col mb-20" key={pedido._id}>
                  <div>
                    <div className="flex justify-between mb-5">
                      <h1 className="text-2xl font-bold">
                        Numero de pedido: {pedido._id}
                      </h1>
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
                        Total
                        <span className="font-extralight">{pedido.importePedido} €</span>
                      </div>
                      <div className="flex flex-col font-bold -ml-16">
                        Estado del pedido
                        <span className="font-extralight">{pedido.estado}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-10 mt-10">
                      {pedido.productos.map((prod) => (
                        <div key={prod._id}>
                          <img
                            className="h-32 w-44 border rounded mb-3"
                            src={prod.img}
                          ></img>
                          <div>{prod.name}</div>
                          <div className="font-extralight">
                            Cantidad: {prod.cantidad} kg
                          </div>
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
  );
}

export default PedidosPerfil;
