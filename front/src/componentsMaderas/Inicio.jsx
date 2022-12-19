import React, { useContext } from "react";
import { Context } from "../context/Context";
import { dataInicio, dataInicio2 } from "../data/InicioData";

function Inicio() {
  const { viewInicio } = useContext(Context);

  if (viewInicio == true) {
    return (
      <div>
        <div className="container font-serif text-2xl flex flex-col p-10">
          {dataInicio.map((d) => (
            <div key={d.id} className="flex  flex-col ml-40">
              <h1 className="mb-8 text-4xl font-bold font-mono">{d.title}</h1>
              <p>{d.description}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-200 h-screen font-serif  text-2xl flex flex-col p-10">
          {dataInicio2.map((d) => (
            <div key={d.id} className="flex flex-col ml-40">
              <h1 className="flex justify-center mb-8 text-4xl font-bold font-mono">
                {d.title}
              </h1>
              <p>{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Inicio;
