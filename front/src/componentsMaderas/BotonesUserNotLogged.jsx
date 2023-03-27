import React, { useState, useContext, useEffect } from "react";
import IniciarSesionModal from "./IniciarSesionModal";
import RegistrarseModal from "./RegistrarseModal";
import { Context } from "../context/Context";
import ModalConfirmacion from "./ModalConfirmacion";

function BotonesUserNotLogged() {
  const [modalIsOpenRegistro, setIsOpenRegistro] = useState(false);
  const [modalIsOpenInicioSesion, setIsOpenInicioSesion] = useState(false);
  const { reload, closeModalConfirmacion, modalIsOpenConfirmacion } =
    useContext(Context);

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
    <div className="flex flex-row justify-end -mt-10 text-white font-bold mr-8">
      <button
        className="mr-5 bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          openModalInicioSesion();
        }}
      >
        Iniciar Sesión
      </button>
      <button
        className="ml-5 bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          openModalRegistro();
        }}
      >
        Registrarse
      </button>

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

      {console.log("en botones no looged: " + modalIsOpenConfirmacion)}
      {modalIsOpenConfirmacion && (
        <ModalConfirmacion
          closeModalConfirmacion={closeModalConfirmacion}
          modalIsOpenConfirmacion={modalIsOpenConfirmacion}
          mensaje={"Ha cerrado sesión"}
        />
      )}
    </div>
  );
}

export default BotonesUserNotLogged;