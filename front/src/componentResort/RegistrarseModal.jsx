import React, { useContext } from "react";
import { Context } from "../context/Context";

function RegistrarseModal() {
  const { changeRegistrarseModal } = useContext(Context);

  return (
    <div className="flex justify-center">
      <div className="absolute w-96 h-50 bg-white border-2 border-black shadow-black shadow-2xl p-5">
        <h2 className="flex justify-center pb-4">Registrese</h2>
        <div>
          <input className="border-b-2 border-black p-1" placeholder="Nombre..."></input>
          <input className="border-b-2 border-black p-1" placeholder="Apellido..."></input>
          <input className="border-b-2 border-black p-1" placeholder="Contraseña..."></input>
          <input className="border-b-2 border-black p-1" placeholder="Repetir contraseña..."></input>
        </div>
        <br></br>
        <div className="flex justify-end">
          <button className="p-2">Submit</button>
          <button className="p-2" onClick={() => changeRegistrarseModal()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrarseModal;
