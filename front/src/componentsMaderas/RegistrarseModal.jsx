import React, { useContext, useState, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { Context } from "../context/Context";
import Modal from "react-modal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";


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

const REGISTRAR_USER = gql`
  mutation Mutation(
    $nombre: String!
    $apellido: String!
    $correo: String!
    $password: String!
  ) {
    RegistrarUser(
      nombre: $nombre
      apellido: $apellido
      correo: $correo
      password: $password
    )
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
// * Componente modal RegistrarseModal.
//
function RegistrarseModal(props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [noHayNombre, setNoHayNombre] = useState(false);
  const [noHayApellido, setnoHayApellido] = useState(false);
  const [noHayCorreo, setNoHayCorreo] = useState(false);
  const [noHayPassword, setNoHayPassword] = useState(false);
  const [errorPasswordNoCoinciden, setErrorPasswordNoCoinciden] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [errorCorreoIncompleto, setErrorCorreoIncompleto] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [passView, setPassView] = useState(false);
  const [repPassView, setRepPassView] = useState(false);
  const [errorCaptcha, setErrorCaptcha] = useState(false);

  // Varables del contexto usadas
  const { changeReload, changeViewSession, changeViewProductos } = useContext(Context);

  const captchaRef = useRef(null);
  let tokenCaptcha;

  //
  // * Mutation que registra al usuario en la bbdd y le concede
  // * un token para que se inicie su sesión.
  // * Llama a la función addToCarrito() si el usuario se está
  // * registrando tras añadir un producto al carrito.
  //
  const [register] = useMutation(REGISTRAR_USER, {
    onCompleted: (data) => {
      if (props.productIdSelect && props.productCantidadSelect) {
        addToCarrito(data.RegistrarUser);
      } else {
        localStorage.setItem("token", data.RegistrarUser); //cuando se complete la mutation guardar el token
        console.log("me loggeo, token: " + localStorage.getItem("token"));
        props.closeModalRegistro();
        changeReload();
        mostrarConfirmación();
      }
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      localStorage.removeItem("token");
      setErrorCorreo(true);
    },
  });

  //
  // * Mutation para añadir un producto al carrito del nuevo usuario.
  //
  const [addProductoCarrito] = useMutation(ADD_PRODUCTO_CARRITO);

  //
  // * función que llama a la mutation addProductoCarrito para añadir
  // * un producto al carrito del nuevo usuario.
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
  // * Función que comprueba los datos de registro
  // * introducidos por el usuario.
  //
  function comprobarUser() {
    if (nombre == "") {
      setNoHayNombre(true);
      setnoHayApellido(false);
      setNoHayCorreo(false);
      setNoHayPassword(false);
      setErrorPassword(false);
      setErrorPasswordNoCoinciden(false);
      setErrorCorreoIncompleto(false);
      setErrorCaptcha(false);
    } else if (apellido == "") {
      setnoHayApellido(true);
      setNoHayNombre(false);
      setNoHayCorreo(false);
      setNoHayPassword(false);
      setErrorPassword(false);
      setErrorPasswordNoCoinciden(false);
      setErrorCorreoIncompleto(false);
      setErrorCaptcha(false);
    } else if (correo == "") {
      setNoHayCorreo(true);
      setNoHayNombre(false);
      setnoHayApellido(false);
      setNoHayPassword(false);
      setErrorPassword(false);
      setErrorPasswordNoCoinciden(false);
      setErrorCorreoIncompleto(false);
      setErrorCaptcha(false);
    } else if (password == "") {
      setNoHayPassword(true);
      setNoHayNombre(false);
      setnoHayApellido(false);
      setNoHayCorreo(false);
      setErrorPassword(false);
      setErrorPasswordNoCoinciden(false);
      setErrorCorreoIncompleto(false);
      setErrorCaptcha(false);
    } else if (password != repPassword) {
      setErrorPasswordNoCoinciden(true);
      setNoHayNombre(false);
      setnoHayApellido(false);
      setErrorCorreo(false);
      setNoHayPassword(false);
      setErrorPassword(false);
      setErrorCorreoIncompleto(false);
      setErrorCaptcha(false);
    } else if (tokenCaptcha == ""){
      setErrorCaptcha(true);
      setNoHayNombre(false);
      setnoHayApellido(false);
      setNoHayCorreo(false);
      setNoHayPassword(false);
      setErrorPassword(false);
      setErrorPasswordNoCoinciden(false);
      setErrorCorreoIncompleto(false);
    } else if (errorPassword == false) {
      setNoHayNombre(false);
      setnoHayApellido(false);
      setNoHayCorreo(false);
      setNoHayPassword(false);
      setErrorPassword(false);
      setErrorPasswordNoCoinciden(false);
      setErrorCorreoIncompleto(false);
      setErrorCaptcha(false);
      register({
        variables: {
          nombre,
          apellido,
          correo,
          password,
        },
      });
    }
  }

  //
  // * Función que muestra la confirmación del registro.
  //
  function mostrarConfirmación() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Se ha registrado correctamente!",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <div>
      {/* Modal utilizado para registrarse */}
      <Modal
        isOpen={props.modalIsOpenRegistro}
        onRequestClose={props.closeModalRegistro}
        style={customStyles}
        ariaHideApp={false}
      >
        {errorCorreo && (
          <p className="flex justify-center text-red-500 text-xs italic mb-3">
            El email ya esta registrado
          </p>
        )}

        <form
          className="p-3 flex flex-col justify-center"
          onSubmit={(event) => {
            event.preventDefault();
            tokenCaptcha = captchaRef.current.getValue();
            comprobarUser();
          }}
        >
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input
            className={
              noHayNombre
                ? "shadow appearance-none border rounded p-2 border-red-500"
                : "shadow appearance-none border rounded p-2"
            }
            placeholder="Nombre..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type={"text"}
            name="nombre"
          ></input>
          {noHayNombre && (
            <p className="text-red-500 text-xs italic mt-3">
              por favor introduzca su nombre
            </p>
          )}

          <label className="block text-gray-700 text-sm font-bold mt-5 mb-2">
            Apellido
          </label>
          <input
            className={
              noHayApellido
                ? "shadow appearance-none border rounded p-2 border-red-500"
                : "shadow appearance-none border rounded p-2"
            }
            placeholder="Apellido..."
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            type="text"
            name="apellido"
          ></input>
          {noHayApellido && (
            <p className="text-red-500 text-xs italic mt-3">
              por favor introduzca su apellido
            </p>
          )}

          <label className="block text-gray-700 text-sm font-bold mt-5 mb-2">Email</label>
          <input
            className={
              noHayCorreo || errorCorreoIncompleto
                ? "shadow appearance-none border rounded p-2 border-red-500"
                : "shadow appearance-none border rounded p-2"
            }
            placeholder="Correo electrónico..."
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            type="text"
            name="correo"
            pattern="^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,4}(\.[a-zA-Z]{2})?$"
            onInvalid={() => {
              setErrorCorreoIncompleto(true);
            }}
          ></input>
          {noHayCorreo && (
            <p className="text-red-500 text-xs italic mt-3">
              por favor introduzca su correo electrónico
            </p>
          )}
          {errorCorreoIncompleto && (
            <p className="text-red-500 text-xs italic mt-3">
              por favor introduzca un correo electrónico valido
            </p>
          )}

          <label className="block text-gray-700 text-sm font-bold mt-5 mb-2">
            Contraseña
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
              pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{7,16}$"
              onInvalid={() => {
                setErrorPassword(true),
                comprobarUser()
              }}
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
              por favor elija una contraseña
            </p>
          )}
          {errorPassword && (
            <p className="text-red-500 text-xs italic mt-3">
              Mínimo 8 caracteres y al menos una letra mayúscula, una minúscula y un
              número
            </p>
          )}

          <label className="block text-gray-700 text-sm font-bold mt-5 mb-2">
            Repetir Contraseña
          </label>
          <div className="flex flex-row items-center">
            <input
              className={
                errorPasswordNoCoinciden
                  ? "shadow appearance-none border rounded p-2 border-red-500"
                  : "shadow appearance-none border rounded p-2"
              }
              placeholder="******************"
              value={repPassword}
              onChange={(e) => setRepPassword(e.target.value)}
              type={repPassView ? "text" : "password"}
              name="repPassword"
              autoComplete="off"
            ></input>
            <div
              className="shadow appearance-none border rounded p-3 bg-green-300 hover:bg-green-500"
              onClick={() => {
                setRepPassView(!repPassView);
              }}
            >
              {repPassView && <AiFillEye />}
              {!repPassView && <AiFillEyeInvisible />}
            </div>
          </div>

          {errorPasswordNoCoinciden && (
            <p className="text-red-500 text-xs italic mt-3">
              Las contraseñas no coinciden
            </p>
          )}

          <div className="flex justify-center mt-6">
            <ReCAPTCHA
              sitekey={"6LdjHoElAAAAAOgUQ_f2lvuGG52lSZCEDdcXUqgT"}
              ref={captchaRef}
            />
          </div>

          {errorCaptcha && (
            <p className="text-red-500 text-xs italic mt-3 flex justify-center">
              por favor, marque la casilla
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
                props.closeModalRegistro(), props.openModalInicioSesion();
              }}
            >
              Esta registrado? Inicie sesión
            </a>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default RegistrarseModal;
