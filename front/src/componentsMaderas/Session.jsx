import React, { useState, useContext, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import RegistrarseModal from "./RegistrarseModal";
import IniciarSesionModal from "./IniciarSesionModal";
import { Context } from "../context/Context";

function Session(props) {
  const [modalIsOpenRegistro, setIsOpenRegistro] = useState(false);
  const [modalIsOpenInicioSesion, setIsOpenInicioSesion] = useState(false);
  const { reload } = useContext(Context);

  useEffect(() => {}), [reload];

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
  

  return (
    <div>
      <div className="flex flex-col mb-96">
        <div className="grid font-serif text-4xl justify-center bg-slate-100 h-40 content-center">
          Para añadir los productos a tu cesta registrate o inicia sesión
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
          productIdSelect={props.productIdSelect}
          productCantidadSelect={props.productCantidadSelect}
        />
      )}

      {modalIsOpenInicioSesion && (
        <IniciarSesionModal
          closeModalInicioSesion={closeModalInicioSesion}
          modalIsOpenInicioSesion={modalIsOpenInicioSesion}
          productIdSelect={props.productIdSelect}
          productCantidadSelect={props.productCantidadSelect}
        />
      )}
    </div>
  );
}

export default Session;
