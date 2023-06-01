import React, { useContext, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Context } from "../context/Context";
import Swal from "sweetalert2";
import styled from "styled-components";
import Cargando from "./Cargando";


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
  mutation Mutation($idPedido: ID!, $bbdd: String!) {
    cancelarPedido(id_pedido: $idPedido, bbdd: $bbdd) {
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

//
// * Componente Pedidos perfil. Página donde se ven los pedidos
// * realizados por el usuario, pedidos Activos, Pendientes de recoger,
// * Canceldos o Recogidos.
// * Permite ver los pedidos en detalle y cancelar productos Activos y Pendientes.
//
function PedidosPerfil() {
  // Varables del contexto usadas
  const {
    changeViewDetallePedido,
    changeViewPedidosPerfil,
    changePedidoDetallado,
    changeViewProductos,
    changeReload,
  } = useContext(Context);

  //
  // * Mutation para cancelar un pedido del usuario.
  // * Solo se puede sin pedidos Activos o Pendientes.
  //
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

  //
  // * Query para traer los pedidos Recogidos del usuario.
  //
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

  //
  // * Query para traer los pedidos Activos del usuario.
  //
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

  //
  // * Query para traer los pedidos Pendientes del usuario.
  //
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

  //
  // * Query para traer los pedidos Cancelados del usuario.
  //
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

  if (loadingRecogidos)
    return (
      <div className="mb-96">
        <Cargando />
      </div>
    );
  if (errorRecogidos) return console.log(errorRecogidos);

  if (loadingActivos) return <div></div>;
  if (errorActivos) return console.log(errorActivos);

  if (loadingPendientes) return <div></div>;
  if (errorPendientes) return console.log(errorPendientes);

  if (loadingCancelados) return <div></div>;
  if (errorCancelados) return console.log(errorCancelados);

  //
  // * Función que muestra la confirmación de elimnar el pedido.
  // * Realiza la mutation cancelarPedido.
  //
  // * Parametros: idPedido, bbddCancelación
  //
  function modalCancelarPedido(idPedido, bbddCancelacion) {
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
            bbdd: bbddCancelacion,
          },
        });
      }
    });
  }

  return (
    <div>
      {/* Si el usuario no tiene ningún pedido */}
      {dataActivos.getPedidosActivosUser.length == 0 &&
        dataPendientes.getPedidosPendientesUser.length == 0 &&
        dataCancelados.getPedidosCanceladosUser.length == 0 &&
        dataRecogidos.getPedidosRecogidos.length == 0 && (
          <div className="flex justify-center mt-20 mb-96">
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
          </div>
        )}

<div >


      {/* Si el usuario tiene pedido Activos */}
      <div className="flex justify-center flex-col px-96 mt-20">
        {dataActivos.getPedidosActivosUser.length != 0 && (
          <Fondo className="flex flex-col p-20 mb-5">
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
                        modalCancelarPedido(pedido._id, "Pedidos_Activos");
                      }}
                    >
                      Cancelar pedido
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Fondo>
        )}

        {/* Si el usuario tiene pedido Pendientes */}
        {dataPendientes.getPedidosPendientesUser.length != 0 && (
          <Fondo className="flex flex-col p-20 mb-5">
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
                        <span className="font-extralight">
                          {pedido.estado} de recoger
                        </span>
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
                        setBbddCancelacion("Pedidos_Pendientes");
                        modalCancelarPedido(pedido._id, "Pedidos_Pendientes");
                      }}
                    >
                      Cancelar pedido
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Fondo>
        )}

        {/* Si el usuario tiene pedido Cancelados */}
        {dataCancelados.getPedidosCanceladosUser.length != 0 && (
          <Fondo className="flex flex-col p-20 mb-5">
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
          </Fondo>
        )}

        {/* Si el usuario tiene pedido Recogidos */}
        {dataRecogidos.getPedidosRecogidos.length != 0 && (
          <Fondo className="flex flex-col p-20 mb-5">
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
                  </div>
                </div>
              ))}
            </div>
          </Fondo>
        )}
      </div>
      </div>
    </div>
  );
}

export default PedidosPerfil;

const Fondo = styled.div`
  background-color: #e0e2e5;
`;
