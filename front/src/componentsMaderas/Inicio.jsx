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
      <div className="font-serif text-2xl flex flex-col p-10">
        {dataInicio.map((d) => (
          <div key={d.id} className="flex  flex-col ml-40 mr-40">
            <h1 className="mb-8 text-4xl font-bold font-mono">{d.title}</h1>
            <p>{d.description}</p>
          </div>
        ))}
      </div>

      {/* Datos del array de dataInicio2 */}
      <div className="bg-slate-200 font-serif  text-2xl flex flex-col p-10">
        {dataInicio2.map((d) => (
          <div key={d.id} className="flex flex-col mb-60">
            <h1 className="flex justify-center mb-8 text-4xl font-bold font-mono">
              {d.title}
            </h1>
            <p className=" ml-40 mr-40">{d.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inicio;
