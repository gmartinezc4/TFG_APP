import React from "react";
import dataOrigen from "../data/OrigenData";

// 
// * Componente página Origen
// * Muestra los datos del archivo OrigenData.
// 
function Origen() {
  return (
    <div>
      {/* Datos del array de dataOrigen */}
      <div className="text-2xl flex flex-col p-10">
        {dataOrigen.map((d) => (
          <div key={d.id} className="flex flex-col ml-40 mr-40 text-justify">
            <h1 className="mb-16 text-4xl font-bold flex justify-center">
              {d.title}
            </h1>
            <p className="font-quicksand mb-10 ">{d.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Origen;
