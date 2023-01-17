import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import Modal from "react-modal";
import RegistrarseModal from "./RegistrarseModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    border: "2px",
    borderColor: "black",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function PaginaInicio() {
  const {registrarseModalHandler, changeRegistrarseModal} = useContext(Context);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className=" bg-cyan-400 h-96 w-full">
        <h1 className="p-5 font-bold font-serif text-3xl">Inicia Sesion</h1>
        <form className="flex flex-col w-80 p-5">
          <label className="font-medium mb-1">Correo electrónico:</label>
          <input placeholder="Email..." className="rounded  mb-4"></input>
          <label className="font-medium mb-1">Contraseña:</label>
          <input placeholder="Password..." className="rounded mb-4"></input>
        </form>
        <div className="flex flex-row">
          <button className="bg-slate-300 border-2 rounded ml-4">
            Iniciar Sesión
          </button>
          <p className="ml-2">o</p>

          {/* <p className="ml-2">o <a className="text-red-600" href="<Registrarse/>">registrese</a></p>  */}
          <button
            className="ml-2 text-red-600"
            onClick={() => {openModal()}}
          >
            registrese
          </button>
        </div>    
      </div>
      {modalIsOpen && console.log("hola")}

      {modalIsOpen && <RegistrarseModal closeModal={closeModal} modalIsOpen={modalIsOpen} />}

    </div>
  );
}

export default PaginaInicio;


