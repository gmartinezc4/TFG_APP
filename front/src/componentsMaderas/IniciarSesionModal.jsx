import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Context } from "../context/Context";
import Modal from "react-modal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

// Estilo customizado para componente <Modal />
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

//
// * Componente modal IniciarSesionModal.
//
function IniciarSesionModal(props) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errorUserOrPasswordIncorrect, setErrorUserOrPasswordIncorrect] = useState(false);
  const [noHayCorreo, setNoHayCorreo] = useState(false);
  const [noHayPassword, setNoHayPassword] = useState(false);
  const [passView, setPassView] = useState(false);

  // Varables del contexto usadas
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

  //
  // * Mutation que loggea al usuario y le concede
  // * un token para iniciar su sesión.
  // * Llama a la función addToCarrito() si el usuario se está
  // * loggeando tras añadir un producto al carrito.
  //
  const [login] = useMutation(LOG_IN, {
    onCompleted: (data) => {
      if (props.productIdSelect && props.productCantidadSelect) {
        addToCarrito(data.logIn);
      } else {
        localStorage.setItem("token", data.logIn); //cuando se complete la mutation guardar el token
        console.log("me loggeo, token: " + localStorage.getItem("token"));
        props.closeModalInicioSesion();
        changeReload();
        mostrarConfirmación();
      }
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      localStorage.removeItem("token");
      setErrorUserOrPasswordIncorrect(true);
    },
  });

  //
  // * Mutation para añadir un producto al carrito del usuario.
  //
  const [addProductoCarrito] = useMutation(ADD_PRODUCTO_CARRITO);

  //
  // * función que llama a la mutation addProductoCarrito para añadir
  // * un producto al carrito del usuario.
  //
  function addToCarrito(token) {
    addProductoCarrito({
      context: {
        headers: {
          authorization: token,
        },
      },
      variables: {
        idProducto: props.productIdSelect,
        cantidad: props.productCantidadSelect,
      },
    }).then(() => {
      localStorage.setItem("token", token);
      console.log("me loggeo, token: " + token);
      changeViewSession(false);
      changeViewProductos(true);
      changeReload();
      console.log("despues de mutation");
    });
  }

  //
  // * Función que comprueba los datos de loggeo
  // * introducidos por el usuario.
  //
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

  //
  // * Función que muestra la confirmación del loggeo.
  //
  function mostrarConfirmación() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Sesión iniciada!",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <div>
      {/* Modal utilizado para loggearse */}
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
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
