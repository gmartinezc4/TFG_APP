import React, { useContext } from "react";
import { Context } from "../context/Context";
import Resort from "./Resort";

function ContenedorResort() {
  const {
    viewResort,
    changeViewResort,
    viewInicio,
    changeViewInicio,
    changeViewWebMaderas,
    changeViewPortal,
  } = useContext(Context);

  return (
    <div>
      <div className="bg-white p-5 h-24">
        <div className="flex justify-between text-black font-bold  ">
          <div className="bg-[url('/home/guillermo/App_TFG/front/src/assets/logo.png')] bg-no-repeat bg-cover h-36 w-36 -m-10"></div>

          <div className="p-5">
            <button className="mr-14 ">Inicio</button>
            <button className="mr-14 ">Habitaciones</button>
            <button className="mr-14 ">Detalles del Hotel</button>
            <button
              onClick={() => {
                changeViewResort(false),
                  changeViewWebMaderas(true),
                  changeViewInicio(true);
              }}
              className="mr-14 "
            >
              Venta de Madera
            </button>
            <button
              onClick={() => {
                changeViewPortal(true), changeViewResort(false);
              }}
              className="mr-14 "
            >
              Portal
            </button>
          </div>

        </div>
      </div>

      <Resort />

    </div>
  );
}

export default ContenedorResort;
