import React, { useState, useContext } from "react";
import Registrarse from "./Registrarse";
import { Context } from "../context/Context";

function FormularioInicio() {
  const { registrarse, changeRegistrarse } = useContext(Context);

  return (
    <div>
      <div className=" bg-cyan-400 h-96 w-full">
        <h1 className="p-5 font-bold font-serif text-3xl">Inicia Sesion</h1>
        <form className="flex flex-col w-80 p-5">
          <label className="font-medium mb-1">Correo electrónico:</label>
          <input placeholder="Email..." className="rounded  mb-4"></input>
          <label className="font-medium mb-1">Contraseña:</label>
          <input placeholder="Password..." className="rounded mb-4"></input>
          <label className="font-medium mb-1">Repetir contraseña:</label>
          <input placeholder="Password..." className="rounded mb-4"></input>
        </form>
        <div className="flex flex-row">
          <button className="bg-slate-300 border-2 rounded ml-4">
            Iniciar Sesión{" "}
          </button>
          <p className="ml-2">o</p>

          {/* <p className="ml-2">o <a className="text-red-600" href="<Registrarse/>">registrese</a></p>  */}
          <button
            className="ml-2 text-red-600"
            onClick={() => changeRegistrarse(true)}
          >
            registrese
          </button>
        </div>
        {registrarse && <Registrarse />}
      </div>
    </div>
  );
}

export default FormularioInicio;


