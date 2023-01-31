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

const LOG_IN = gql`
  mutation Mutation($correo: String!, $password: String!) {
    logIn(correo: $correo, password: $password)
  }
`;

//falta poner el error si no se encuentra usuario al iniciar sesión
// y que userAutorizado cambio con el primer submit

function IniciarSesionModal(props) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errorInicioSesion, setErrorInicioSesion] = useState(false);
  const { changeReload } = useContext(Context);

  const [login] = useMutation(LOG_IN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.logIn); //cuando se complete la mutation guardar el token
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      localStorage.removeItem("token");
      changeReload();
    },
  });

  function comprobarUser() {
    
      login({
        variables: {
          correo,
          password,
        },
      }).then(() => {
        changeReload();
      })
      props.closeModalInicioSesion();

  }

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpenInicioSesion}
        onRequestClose={props.closeModalInicioSesion}
        style={customStyles}
        ariaHideApp={false}
      >
        {errorInicioSesion && (
          <div className="flex justify-center p-3 bg-red-400">
            Correo o contraseña no validos
          </div>
        )}

        <form
          className="p-3 flex flex-col justify-center"
          onSubmit={(event) => {
            event.preventDefault();
            comprobarUser();
          }}
        >
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
                onClick={props.closeModalInicioSesion}
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

export default IniciarSesionModal;
