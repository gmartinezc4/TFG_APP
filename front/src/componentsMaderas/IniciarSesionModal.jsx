import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Context } from "../context/Context";
import Modal from "react-modal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

const customStyles = {
  content: {
    position: "absolute",
    width: 400,
    backgrounColor: "white",
    boxShadow: "10px 5px 5px black",
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
  },
};

const LOG_IN = gql`
  mutation Mutation($correo: String!, $password: String!) {
    logIn(correo: $correo, password: $password)
  }
`;

const ADD_PRODUCTO_CARRITO = gql`
  mutation Mutation($idProducto: String!, $cantidad: String!) {
    addProductCesta(id_producto: $idProducto, cantidad: $cantidad) {
      cantidad
      id_producto
      id_user
      img
      name
      precioTotal
      precioTotal_freeIVA
    }
  }
`;

function IniciarSesionModal(props) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errorUserOrPasswordIncorrect, setErrorUserOrPasswordIncorrect] = useState(false);
  const [noHayCorreo, setNoHayCorreo] = useState(false);
  const [noHayPassword, setNoHayPassword] = useState(false);
  const [passView, setPassView] = useState(false);

  const {
    changeReload,
    changeViewSession,
    changeViewProductos,
    changeViewMaderas,
    changeViewInicio,
    changeViewContacto,
    changeViewOrigen,
    changeViewShoppingCart,
    changeViewPedidosPerfil,
    changeViewDetallePedido,
    changeViewHacerPedido,
    changeViewProductSelect,
    changeViewPerfil,
    changeViewRecuperarPass1,
  } = useContext(Context);

  const [login] = useMutation(LOG_IN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.logIn); //cuando se complete la mutation guardar el token
      console.log("me loggeo, token: " + localStorage.getItem("token"));

      if (props.productIdSelect && props.productCantidadSelect) {
        addToCarrito();
        changeViewSession(false);
        changeViewProductos(true);
      }

      props.closeModalInicioSesion();
      changeReload();
      mostrarConfirmación();
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      localStorage.removeItem("token");
      setErrorUserOrPasswordIncorrect(true);
    },
  });

  const [addProductoCarrito] = useMutation(ADD_PRODUCTO_CARRITO);

  function addToCarrito() {
    addProductoCarrito({
      context: {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      },
      variables: {
        idProducto: props.productIdSelect,
        cantidad: props.productCantidadSelect,
      },
    }).then(() => {
      changeReload(), console.log("despues de mutation");
    });
  }

  function comprobarUser() {
    if (correo == "") {
      setNoHayCorreo(true);
      setNoHayPassword(false);
      setErrorUserOrPasswordIncorrect(false);
    } else if (password == "") {
      setNoHayPassword(true);
      setNoHayCorreo(false);
      setErrorUserOrPasswordIncorrect(false);
    } else {
      setNoHayPassword(false);
      setNoHayCorreo(false);
      login({
        variables: {
          correo,
          password,
        },
      });
    }
  }

  function mostrarConfirmación() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Sesión iniciada!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpenInicioSesion}
        onRequestClose={props.closeModalInicioSesion}
        style={customStyles}
        ariaHideApp={false}
      >
        {errorUserOrPasswordIncorrect && (
          <p className="flex justify-center text-red-500 text-xs italic mb-3">
            Correo o contraseña no validos
          </p>
        )}

        <form
          className="p-3 flex flex-col justify-center"
          onSubmit={(event) => {
            event.preventDefault();
            comprobarUser();
          }}
        >
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className={
              noHayCorreo
                ? "shadow appearance-none border rounded p-2 border-red-500"
                : "shadow appearance-none border rounded p-2"
            }
            placeholder="Correo electrónico..."
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            type="text"
            name="correo"
          ></input>
          {noHayCorreo && (
            <p className="text-red-500 text-xs italic mt-3">
              Porfavor introduzca un correo electrónico
            </p>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
            Password
          </label>
          <div className="flex flex-row items-center">
            <input
              className={
                noHayPassword
                  ? "shadow appearance-none border rounded p-2 border-red-500"
                  : "shadow appearance-none border rounded p-2"
              }
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={passView ? "text" : "password"}
              name="password"
              autoComplete="off"
            ></input>
            <div
              className="shadow appearance-none border rounded p-3 bg-green-300 hover:bg-green-500"
              onClick={() => {
                setPassView(!passView);
              }}
            >
              {passView && <AiFillEye />}
              {!passView && <AiFillEyeInvisible />}
            </div>
          </div>

          {noHayPassword && (
            <p className="text-red-500 text-xs italic mt-3">
              Porfavor introduzca una contraseña
            </p>
          )}

          <div className="flex justify-between items-center mt-5">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
              onClick={() => {
                changeViewRecuperarPass1(true);
                changeViewMaderas(false),
                  changeViewInicio(false),
                  changeViewOrigen(false),
                  changeViewContacto(false),
                  changeViewProductos(false);
                changeViewShoppingCart(false);
                changeViewPedidosPerfil(false);
                changeViewDetallePedido(false);
                changeViewHacerPedido(false);
                changeViewSession(false);
                changeViewProductSelect(false);
                changeViewPerfil(false);
              }}
            >
              Ha olvidado su contraseña?
            </a>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default IniciarSesionModal;
