import React, { useState, useContext } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Context } from "../context/Context";
import { CgProfile } from "react-icons/cg";
import { TfiEmail } from "react-icons/tfi";
import { BsPencil } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import ModalesPerfil from "./ModalesPerfil";
import Swal from "sweetalert2";
import Cargando from "./Cargando";

const GET_USER = gql`
  query Query {
    getUser {
      _id
      nombre
      apellido
      correo
      password
    }
  }
`;

const GET_PEDIDOS_ACTIVOS_USER = gql`
  query GetPedidosActivosUser {
    getPedidosActivosUser {
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

const GET_PEDIDOS_PENDIENTES_USER = gql`
  query GetPedidosPendientesUser {
    getPedidosPendientesUser {
      _id
      id_user
      estado
      nombre
      apellido
      email
      telefono
      direccion
      masInformacion
      codigoPostal
      ciudad
      pais
      fechaPedido
      fechaRecogida
      importePedido
      importeFreeIvaPedido
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

const BORRAR_USER = gql`
  mutation Mutation {
    borraUser {
      _id
      apellido
      nombre
      password
      token
      correo
    }
  }
`;
//
// * Componente Perfi. Página del perfil del usuario.
// * El usuario puede modificar sus datos y darse de baja
// * si no tiene pedidos Activos o Pendientes.
// * Renderiza el componente <ModalesPerfil />
//
function Perfil() {
  // Varables del contexto usadas
  const {
    changeErrorTrue,
    changeCodigoError,
    changeMensajeError,
    changeReload,
    changeViewInicio,
    changeViewPerfil,
  } = useContext(Context);

  const [modalIsOpenNombreApellido, setIsOpenNombreApellido] = useState(false);
  const [modalIsOpenCorreo, setIsOpenCorreo] = useState(false);
  const [modalIsOpenPassword, setIsOpenPassword] = useState(false);

  //
  // * Funciones encargadas de abrir y cerrar los
  // * modales de inicio de sesión y registro.
  //
  function openModalNombreApellido() {
    setIsOpenNombreApellido(true);
  }

  function closeModalNombreApellido() {
    setIsOpenNombreApellido(false);
  }

  function openModalCorreo() {
    setIsOpenCorreo(true);
  }

  function closeModalCorreo() {
    setIsOpenCorreo(false);
  }

  function openModalPassword() {
    setIsOpenPassword(true);
  }

  function closeModalPassword() {
    setIsOpenPassword(false);
  }

  //
  // * Mutation para borrar la cuenta del usuario.
  // * Solo se puede sin pedidos Activos o Pendientes.
  //
  const [borrarUser] = useMutation(BORRAR_USER, {
    onCompleted: () => {
      console.log("Se ha borrado su usuario");
      localStorage.removeItem("token");

      changeViewPerfil(false);
      changeViewInicio(true);
      changeReload();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se ha borrado su usuario",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
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
  // * Query para traer los datos del usuario.
  //
  const {
    data: dataGetUser,
    loading: loadingGetUser,
    error: errorGetUser,
  } = useQuery(GET_USER, {
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
    data: dataGetPedidosActivos,
    loading: loadingGetPedidosActivos,
    error: errorGetPedidosActivos,
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
    data: dataGetPedidosPendientes,
    loading: loadingGetPedidosPendientes,
    error: errorGetPedidosPendientes,
  } = useQuery(GET_PEDIDOS_PENDIENTES_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loadingGetUser || loadingGetPedidosActivos || loadingGetPedidosPendientes)
    return (
      <div className="mb-96">
        <Cargando />
      </div>
    );
  if (errorGetUser || errorGetPedidosActivos || errorGetPedidosPendientes)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError("Not Found")}
      </div>
    );

  //
  // * Función que muestra la confirmación de elimnar el perfil.
  // * Caompreueba que el usuario no tenga pedidos Activos o pendientes
  // * y si es así realiza la mutation borrarUser.
  //
  //
  function modalDarBajaUser() {
    Swal.fire({
      icon: "warning",
      title: "¿Quieres borrar tu perfil?",
      text: "Los cambios serán irreversibles",
      showCancelButton: true,
      confirmButtonText: "Si, borrar",
      confirmButtonColor: "#DF0000",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          dataGetPedidosActivos.getPedidosActivosUser.length == 0 &&
          dataGetPedidosPendientes.getPedidosPendientesUser.length == 0
        ) {
          borrarUser({
            context: {
              headers: {
                authorization: localStorage.getItem("token"),
              },
            },
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "No se puede borrar el perfil",
            text: "Tienes pedidos Activos o Pendientes de recoger",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3BD630",
          });
        }
      }
    });
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col mt-10">
          <h1 className="font-bold text-4xl mb-3 text-white">Tus datos</h1>
          <span className="mb-5">
            Aquí puedes revisar y actualizar tus datos de usuario y gestionar tu email y
            contraseña
          </span>

          <div className="grid grid-rows-1 grid-flow-col text-white">
            {/* Columna izquierda, datos */}
            <div>
              <div className="mt-10 flex flex-row">
                <CgProfile className="w-10 h-10 mr-16 " />
                <div className="grid grid-cols-3 gap-32">
                  <p className="flex flex-col">
                    <span className="font-bold mb-1">Nombre</span>
                    <span className="text-black">{dataGetUser.getUser.nombre}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="font-bold mb-1">Apellido</span>
                    <span className="text-black">{dataGetUser.getUser.apellido}</span>
                  </p>
                </div>
              </div>

              <div className="border border-gray-200  mt-10"></div>

              <div className="flex flex-row mt-10">
                <TfiEmail className="w-10 h-10 mr-16" />
                <div className="grid grid-cols-2 gap-96">
                  <p className="flex flex-col">
                    <span className="font-bold mb-1">Email</span>
                    <span className="text-black">{dataGetUser.getUser.correo}</span>
                  </p>
                </div>
              </div>

              <div className="border border-gray-200  mt-10"></div>

              <div className="flex flex-row mt-10">
                <RiLockPasswordLine className="w-10 h-10 mr-16" />
                <div className="grid grid-cols-2 gap-96">
                  <p className="flex flex-col">
                    <span className="font-bold mb-1">Contraseña</span>
                    <span className="text-black">*************</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Columna derecha, botones */}
            <div>
              <button
                className="border border-black h-14 w-40 hover:bg-black -ml-20 mt-9"
                onClick={() => openModalNombreApellido()}
              >
                <div className="flex flex-row justify-center font-semibold">
                  <BsPencil className="mr-3 h-6 w-6" />
                  Modificar
                </div>
              </button>

              <div className="border border-gray-200  mt-10 -ml-96"></div>

              <button
                className="border border-black h-14 w-40 hover:bg-black -ml-20 mt-9"
                onClick={() => openModalCorreo()}
              >
                <div className="flex flex-row justify-center font-semibold">
                  <BsPencil className="mr-3 h-6 w-6" /> Modificar
                </div>
              </button>

              <div className="border border-gray-200  mt-10 -ml-96"></div>

              <button
                className="border border-black h-14 w-40 hover:bg-black -ml-20 mt-9"
                onClick={() => openModalPassword()}
              >
                <div className="flex flex-row justify-center font-semibold">
                  <BsPencil className="mr-3 h-6 w-6" /> Modificar
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Boton darse de baja */}
      <div className="flex justify-center mt-32 mb-12">
        <button
          className="rounded border-2 border-red-800 bg-red-600 p-5 font-bold hover:bg-red-800 hover:border-red-400"
          onClick={() => {
            modalDarBajaUser(dataGetUser.getUser._id);
          }}
        >
          Darse de baja
        </button>
      </div>

      {/* Si se cumple la condición renderiza el componente <ModalesPerfil /> */}
      {modalIsOpenNombreApellido && (
        <ModalesPerfil
          closeModalNombreApellido={closeModalNombreApellido}
          modalIsOpenNombreApellido={modalIsOpenNombreApellido}
        />
      )}

      {/* Si se cumple la condición renderiza el componente <ModalesPerfil /> */}
      {modalIsOpenCorreo && (
        <ModalesPerfil
          closeModalCorreo={closeModalCorreo}
          modalIsOpenCorreo={modalIsOpenCorreo}
        />
      )}

      {/* Si se cumple la condición renderiza el componente <ModalesPerfil /> */}
      {modalIsOpenPassword && (
        <ModalesPerfil
          closeModalPassword={closeModalPassword}
          modalIsOpenPassword={modalIsOpenPassword}
        />
      )}
    </div>
  );
}

export default Perfil;
