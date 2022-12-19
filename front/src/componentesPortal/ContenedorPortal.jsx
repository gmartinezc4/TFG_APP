import React, { useContext } from "react";
import { Context } from "../context/Context";

function ContenedorPortal() {
  const { changeViewResort, changeViewInicio, changeViewWebMaderas, viewPortal, changeViewPortal } =
    useContext(Context);

  if (viewPortal == true) {
    return (
      <div>
        <div className="bg-[url('/home/guillermo/App_TFG/front/src/assets/fondoContacto.jpg')] bg-no-repeat bg-cover h-56"></div>
        <div className="flex justify-center p-5">
          
          <button
            className="border-2 rounded-2xl border-zinc-400 bg-blue-400 p-3 m-5"
            onClick={() => {
              changeViewInicio(true), changeViewWebMaderas(true), changeViewPortal(false);
            }}
          >
            Web Maderas
          </button>
          <button
            className="border-2 rounded-2xl border-zinc-400 bg-blue-400 p-3 m-5" 
            onClick={() => {
              changeViewResort(true), changeViewPortal(false);
            }}
          >
            Web Resort
          </button>
        
        </div>
      </div>
    );
  }
}

export default ContenedorPortal;
