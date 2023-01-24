import React, { useContext } from "react";
import { Context } from "../context/Context";
import Resort from "./Resort";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

function ContenedorResort() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });

  const {
    viewResort,
    changeViewResort,
    viewInicio,
    changeViewInicio,
    changeViewWebMaderas,
    changeViewPortal,
  } = useContext(Context);

  return (
    <ApolloProvider client={client}>
      {/* cabecera  */}
      <div className="bg-white h-20">
        <div className="flex justify-between text-black font-bold  ">
          <div className="bg-[url('/home/guillermo/App_TFG/front/src/assets/logo.png')] bg-no-repeat bg-cover h-36 w-36 -m-8  "></div>

          <div className="p-4">
            <button className="mr-14 ">Inicio</button>
            <button
              onClick={() => {
                changeViewResort(false),
                  changeViewWebMaderas(true),
                  changeViewInicio(true);
              }}
              className="mr-14 "
            >
              Venta de Madera
            </button>
            <button className="mr-14 "
              onClick={() => {
                changeViewPortal(true), changeViewResort(false);
              }}
            >
              Portal
            </button>
          </div>
        </div>
      </div>

      <Resort />

    </ApolloProvider>
  );
}

export default ContenedorResort;
