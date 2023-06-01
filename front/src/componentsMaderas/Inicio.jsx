import React from "react";
import { dataInicio, dataInicio2 } from "../data/InicioData";

// 
// * Componente página Inicio.
// * Muestra los datos del archivo InicioData.
//
function Inicio() {
  return (
    <div>
      {/* Datos del array de dataInicio */}
      <div className="text-2xl flex flex-col p-10">
        {dataInicio.map((d) => (
          <div key={d.id} className="flex flex-col ml-40 mr-40">
            <h1 className="font-PTserif mb-8 text-4xl font-semibold flex justify-center">{d.title}</h1>
            <p className="font-quicksand">{d.description}</p>
          </div>
        ))}
      </div>

      {/* Datos del array de dataInicio2 */}
      <div className="text-2xl flex flex-col p-10 mb-28">
        {dataInicio2.map((d) => (
          <div key={d.id} className="flex flex-col ">
            <h1 className="flex justify-center mb-8 text-4xl font-bold font-PTserif">
              {d.title}
            </h1>
            <p className="font-quicksand  ml-40 mr-40">{d.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inicio;
