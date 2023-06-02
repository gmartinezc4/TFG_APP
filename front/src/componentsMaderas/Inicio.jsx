import React from "react";
import { dataInicio, dataInicio2 } from "../data/InicioData";
import fotoInicio1 from '../assets/fotoInicio1.jpg'
import fotoInicio2 from '../assets/fotoInicio2.png'


// 
// * Componente página Inicio.
// * Muestra los datos del archivo InicioData.
//
function Inicio() {
  return (
    <div className="">
      {/* Datos del array de dataInicio */}
      <div className="grid grid-cols-2 mt-20 ml-40 mr-40">
        <div className="text-2xl flex flex-col p-10">
          {dataInicio.map((d) => (
            <div key={d.id} className="flex flex-col text-justify">
              <h1 className="mb-8 text-4xl font-semibold flex justify-center">
                {d.title}
              </h1>
              <p className="font-quicksand">{d.description}</p>
            </div>
          ))}
        </div>
        <img
          className="self-center mt-10"
          src={fotoInicio1}
        ></img>
      </div>

      {/* Datos del array de dataInicio2 */}
      <div className="grid grid-cols-2 mb-20 mr-40 ml-40">
        <img
          className="self-center mt-20"
          src={fotoInicio2}
        ></img>
        <div className="text-2xl flex flex-col p-10">
          {dataInicio2.map((d) => (
            <div key={d.id} className="flex flex-col text-justify">
              <h1 className="mb-8 text-4xl font-semibold flex justify-center">
                {d.title}
              </h1>
              <p className="font-quicksand">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inicio;
