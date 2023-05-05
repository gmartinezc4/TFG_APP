import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Context } from "../context/Context";
import { dataInicio, dataInicio2 } from "../data/InicioData";

const GET_USER = gql`
  query Query {
    getUser {
      _id
      nombre
      apellido
      correo
      password
    }
  }
`;

function Inicio() {
  const { viewInicio, token } = useContext(Context);

  if(token && viewInicio){
    const { data, loading, error } = useQuery(GET_USER, {
      context: {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      },
    });
  
    if (loading) return <div></div>;
    if (error) return console.log(error);

    localStorage.setItem("nombreUser", data.getUser.nombre);
    localStorage.setItem("apellidoUser", data.getUser.apellido);
    localStorage.setItem("emailUser", data.getUser.correo);
  }
  

  if (viewInicio == true) {
    return (
      <div>
        <div className="font-serif text-2xl flex flex-col p-10">
          {dataInicio.map((d) => (
            <div key={d.id} className="flex  flex-col ml-40 mr-40">
              <h1 className="mb-8 text-4xl font-bold font-mono">{d.title}</h1>
              <p>{d.description}</p>
            </div>
          ))}
        </div>
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
}

export default Inicio;
