import React, { useContext } from "react";
import { Context } from "../context/Context";
import dataOrigen from "../data/OrigenData";
import Maderas from "./Maderas";

function Origen() {
  const { viewOrigen } = useContext(Context);

  if (viewOrigen) {
    return (
      <div>
        <div className="container font-serif text-2xl flex flex-col p-10">
          {dataOrigen.map((d) => (
            <div key={d.id} className="flex  flex-col ml-40">
              <h1 className="mb-8 text-4xl font-bold font-mono">{d.title}</h1>
              <p>{d.description}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-200 h-screen flex justify-center">


        </div>
      </div>
    );
  }
}

export default Origen;
