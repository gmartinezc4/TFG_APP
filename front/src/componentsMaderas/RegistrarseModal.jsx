import React, { useContext, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useMutation,
  useQuery,
} from "@apollo/client";
import { Context } from "../context/Context";
import Modal from "react-modal";

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
 mutation Mutation($nombre: String!, $apellido: String!, $correo: String!, $password: String!) {
  RegistrarUser(nombre: $nombre, apellido: $apellido, correo: $correo, password: $password)
}
`;

// const GET_USUARIOS = gql`
//   query GET_USUARIOS($correo: String!) {
//     getUsuario(correo: $correo) {
//       nombre
//       apellido
//       correo
//       password
//     }
//   }
// `;

//falta la comprobación del email

function RegistrarseModal(props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const { changeReload } = useContext(Context);

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [errorCampos, setErrorCampos] = useState(false);

  const [register] = useMutation(REGISTRAR_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.RegistrarUser); //cuando se complete la mutation guardar el token
      console.log("me loggeo, token: " + localStorage.getItem("token")); 
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      localStorage.removeItem("token");
      changeReload();
    },
  });

  // function getUsuarios({correo}){
  //   const { data, loading, error } = useQuery(GET_USUARIOS, {variables: { correo },});

  //   if (loading) return <div>Cargando...</div>;
  //   if (error) return <div>Error...</div>;
  // }

  function guardarUser() {
    register({
      variables: {
        nombre,
        apellido,
        correo,
        password,
      },
    }).then(() => {
      changeReload();
    })

    props.closeModalRegistro();
  }

  function comprobarErrores() {
    if (
      nombre == "" ||
      apellido == "" ||
      correo == "" ||
      password == "" ||
      repPassword == ""
    ) {
      setErrorCampos(true);
      setErrorPassword(false);
      setErrorCorreo(false);
    } else if (password != repPassword) {
      setErrorPassword(true);
      setErrorCorreo(false);
      setErrorCampos(false);
      // } else if(getUsuarios(correo).correo == correo.toLowerCase()){
      //   setErrorCorreo(true);
      //   setErrorCampos(false);
      //   setErrorPassword(false);
    } else {
      guardarUser();
    }
  }

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpenRegistro}
        onRequestClose={props.closeModalRegistro}
        style={customStyles}
        ariaHideApp={false}
      >
        {errorCampos && (
          <div className="flex justify-center p-3 bg-red-400">
            Faltan campos por rellenar
          </div>
        )}

        {errorCorreo && (
          <div className="flex justify-center p-3 bg-red-400">
            El email ya esta registrado
          </div>
        )}

        {errorPassword && (
          <div className="flex justify-center p-3 bg-red-400">
            Las contraseñas no coinciden
          </div>
        )}

        <h2 className="flex justify-center pb-4 font-bold">Registrese</h2>

        <form
          className="p-3 flex flex-col justify-center"
          onSubmit={(event) => {
            event.preventDefault();
            comprobarErrores();
          }}
        >
          <input
            className="border-b-2 border-black p-2"
            placeholder="Nombre..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type={"text"}
            name="nombre"
          ></input>
          <input
            className="border-b-2 border-black p-2"
            placeholder="Apellido..."
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            type="text"
            name="apellido"
          ></input>
          <input
            className="border-b-2 border-black p-2"
            placeholder="Correo electrónico..."
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            type="text"
            name="correo"
          ></input>
          <input
            className="border-b-2 border-black p-2"
            placeholder="Contraseña..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            name="password"
            autoComplete="off"
          ></input>
          <input
            className="border-b-2 border-black p-2"
            placeholder="Repetir contraseña..."
            value={repPassword}
            onChange={(e) => setRepPassword(e.target.value)}
            type="text"
            name="repPassdword"
            autoComplete="off"
          ></input>

          <div className="flex justify-center mt-5">
            <div className="p-4">
              <button
                className="p-1 border border-black bg-green-500"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div className="p-4">
              <button
                className="p-1 border border-black bg-yellow-400"
                onClick={props.closeModalRegistro}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default RegistrarseModal;
