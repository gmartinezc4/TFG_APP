import React, { FC, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import RegistrarseModal from "./RegistrarseModal";
import IniciarSesionModal from "./IniciarSesionModal";

const LOGIN = gql`
  mutation LogIn($user: String!, $password: String!) {
    logIn(user: $user, password: $password)
  }
`;

const REGISTER = gql`
  mutation Mutation($user: String!, $password: String!) {
    register(user: $user, password: $password) {
      _id
      user
      token
    }
  }
`;

function Session() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [modalIsOpenRegistro, setIsOpenRegistro] = useState(false);
  const [modalIsOpenInicioSesion, setIsOpenInicioSesion] = useState(false);

  function openModalRegistro() {
    setIsOpenRegistro(true);
  }

  function closeModalRegistro() {
    setIsOpenRegistro(false);
  }

  function openModalInicioSesion() {
    setIsOpenInicioSesion(true);
  }

  function closeModalInicioSesion() {
    setIsOpenInicioSesion(false);
  }

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.logIn); //cuando se complete la mutation guardar el token
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      localStorage.removeItem("token");
    },
  });

  const [register] = useMutation(REGISTER, {
    onCompleted: (data) => {
      login({
        variables: {
          user,
          password,
        },
      });
      localStorage.setItem("token", data.logIn);
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      localStorage.removeItem("token");
    },
  });

  return (
    <div>
      <div className="flex flex-col">
        <div className="grid font-serif text-4xl justify-center bg-slate-100 h-40 content-center">
          Para acceder a los productos registrate o inicia sesión
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="border border-black rounded p-5 mr-5 text-white bg-black h-16 w-36 hover:bg-transparent hover:text-black"
            onClick={() => openModalInicioSesion()}
          >
            Iniciar sesion
          </button>
          <button
            className="border border-black rounded p-5 ml-5 text-white bg-black h-16 w-36 hover:bg-transparent hover:text-black"
            onClick={() => openModalRegistro()}
          >
            Registrarse
          </button>
        </div>
      </div>

      {modalIsOpenRegistro && (
        <RegistrarseModal
          closeModalRegistro={closeModalRegistro}
          modalIsOpenRegistro={modalIsOpenRegistro}
        />
      )}

      {modalIsOpenInicioSesion && (
        <IniciarSesionModal
          closeModalInicioSesion={closeModalInicioSesion}
          modalIsOpenInicioSesion={modalIsOpenInicioSesion}
        />
      )}
    </div>
  );
}

export default Session;
