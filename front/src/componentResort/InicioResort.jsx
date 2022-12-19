import React from "react";
import FormularioInicio from "./FormularioInicio";

function InicioResort() {
  return (
    <div>
      <div className="flex flex-row">
        <img className="bg-[url('/home/guillermo/App_TFG/front/src/assets/fotoResort.jpeg')] bg-no-repeat bg-cover h-96 w-4/5"></img>
        <FormularioInicio />
      </div>
    </div>
  );
}

export default InicioResort;
