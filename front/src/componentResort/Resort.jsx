import React, { useContext, useState } from "react";
import IniciarSesionModal from "./IniciarSesionModal";
import RegistrarseModal from "./RegistrarseModal";
import { Context } from "../context/Context";
import Buscador from "./Buscador";

function Resort() {
  const [modalIsOpenRegistro, setIsOpenRegistro] = useState(false);
  const [modalIsOpenInicioSesion, setIsOpenInicioSesion] = useState(false);
  const [userAutorizado, setUserAutorizado] = useState(false);

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
  console.log("userAtorizado " + userAutorizado)


  return (
    // página principa
    <div>
      <div className="bg-green-400 h-screen">
        
        {/* inicio de sesion o registro */}
        {!userAutorizado && (
          <div className="flex justify-end">
            <div className="p-5">
              <button
                className="border border-green-700 bg-white p-2 font-semibold text-green-400 w-32"
                onClick={() => {
                  openModalInicioSesion();
                }}
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="p-5 mr-16">
              <button
                className="border border-green-700 bg-white p-2 font-semibold text-green-400 w-32"
                onClick={() => {
                  openModalRegistro();
                }}
              >
                registrese
              </button>
            </div>
          </div>
        )}

        {userAutorizado && (
          <div>perfil</div>
        )}

        {modalIsOpenRegistro && (
          <RegistrarseModal
            closeModalRegistro={closeModalRegistro}
            modalIsOpenRegistro={modalIsOpenRegistro}
            setUserAutorizado={setUserAutorizado}
          />
        )}
        {modalIsOpenInicioSesion && (
          <IniciarSesionModal
            closeModalInicioSesion={closeModalInicioSesion}
            modalIsOpenInicioSesion={modalIsOpenInicioSesion}
            setUserAutorizado={setUserAutorizado}
          />
        )}
      
        <Buscador/>

      </div>
    </div>
  );
}



export default Resort;
