import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import dataMaderaCards from "../data/MaderaCardsData";;
import { Context } from "../context/Context";
import Cargando from "./Cargando";

const GET_MADERAS = gql`
  query Query {
    getMaderas {
      _id
      img
      name
      description
    }
  }
`;

// 
// * Componente que muestra datos del archivo
// * MaderaCardsData y cada objeto madera de la bbdd.
// 
function MaderaCards() {
  // Variables del contexto usadas
  const { changeErrorTrue, changeCodigoError, changeMensajeError } = useContext(Context);

  // Query para traer las maderas de la bbdd
  const { data, loading, error } = useQuery(GET_MADERAS);

  if (loading)
    return (
      <div className="mb-96">
        <Cargando />
      </div>
    );
  if (error)
    return (
      <div>
        {changeErrorTrue()} {changeCodigoError(404)}
        {changeMensajeError("Not Found")}
      </div>
    );

  return (
    <div className=" bg-slate-200">
      {/* Datos del array de dataMaderaCards */}
      <div className="flex flex-col font-serif text-2xl p-10 border-b-2 border-black w-auto">
        {dataMaderaCards.map((d) => (
          <div key={d.id} className="flex flex-col mb-5">
            <h1 className="mb-8 text-4xl font-bold font-mono">{d.title}</h1>
            <p className="flex justify-center">{d.description}</p>
          </div>
        ))}
      </div>

      {/* Muestra las Maderas traidas desde la bbdd */}
      <div className="flex flex-row ml-36 flex-wrap p-5">
        {data?.getMaderas.map((e) => (
          <div key={e._id} className="flex justify-center flex-row m-1 p-5">
            <div className="bg-no-repeat bg-contain">
              <img className="h-60 w-80" src={e.img}></img>
            </div>
            <div className="flex flex-col ml-4">
              <div className="font-bold mb-1"> {e.name}</div>

              <div className="border-b-2 border-black mb-2"></div>
              <span className="w-96">{e.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MaderaCards;
