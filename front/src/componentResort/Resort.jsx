import React, { useContext } from "react";
import PaginaInicio from "./PaginaInicio";
import RegistrarseModal from "./RegistrarseModal";
import { Context } from "../context/Context";

function Resort() {
  const {registrarseModalHandler, changeRegistrarseModal} = useContext(Context);
  
  return (
    <div>
      <div className="flex flex-row">
        <img className="bg-[url('/home/guillermo/App_TFG/front/src/assets/fotoResort.jpeg')] bg-no-repeat bg-cover h-96 w-4/5"></img>
        <PaginaInicio />
      </div>
      
    </div>
  );
}

export default Resort;
