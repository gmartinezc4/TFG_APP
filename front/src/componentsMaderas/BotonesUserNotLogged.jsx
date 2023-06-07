import React, { useState, useContext, useEffect } from "react";
import IniciarSesionModal from "./IniciarSesionModal";
import RegistrarseModal from "./RegistrarseModal";
import styled from "styled-components";


// 
// * Componente botones del usuario no loggeado.
// * Botones del iniciar sesión y registrarse
// * Renderiza los componentes <IniciarSesionModal /> y <RegistrarseModal />
// 
function BotonesUserNotLogged() {
  const [modalIsOpenRegistro, setIsOpenRegistro] = useState(false);
  const [modalIsOpenInicioSesion, setIsOpenInicioSesion] = useState(false);
  
  //
  // * Funciones encargadas de abrir y cerrar los
  // * modales de inicio de sesión y registro.
  //
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
      {/* Boton iniciar sesión */}
      <Button
        className="mr-5 bg-black text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          openModalInicioSesion();
        }}
      >
        Iniciar Sesión
      </Button>

      {/* Boton registrarse */}
      <Button
        className="ml-5 bg-black text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          openModalRegistro();
        }}
      >
        Registrarse
      </Button>

      {/* Renderización del componente <RegistrarseModal /> si se cumple la condición */}
      {modalIsOpenRegistro && (
        <RegistrarseModal
          closeModalRegistro={closeModalRegistro}
          modalIsOpenRegistro={modalIsOpenRegistro}
          openModalInicioSesion={openModalInicioSesion}
        />
      )}

      {/* Renderización del componente <IniciarSesionModal /> si se cumple la condición */}
      {modalIsOpenInicioSesion && (
        <IniciarSesionModal
          closeModalInicioSesion={closeModalInicioSesion}
          modalIsOpenInicioSesion={modalIsOpenInicioSesion}
        />
      )}
    </div>
  );
}

export default BotonesUserNotLogged;

const Button = styled.button`
  text-aling: center;
  cursor: pointer;
  &:hover {
    background-color: #f5be0b;
    color: black;
  }
`