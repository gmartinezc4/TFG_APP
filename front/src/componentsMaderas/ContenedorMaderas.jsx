import React, { useState, useContext } from "react";
import Maderas from "./Maderas";
import Inicio from "./Inicio";
import { Context } from "../context/Context";
import Contacto from "./Contacto";
import Origen from "./Origen";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

function ContenedorMaderas() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });

  const {
    changeViewWebMaderas,
    changeViewMaderas,
    viewMaderas,
    viewInicio,
    changeViewInicio,
    viewContacto,
    changeViewContacto,
    viewOrigen,
    changeViewOrigen,
    changeViewResort,
    changeViewPortal,
  } = useContext(Context);

  return (
    <ApolloProvider client={client}>
      <div className="bg-[url('/home/guillermo/App_TFG/front/src/assets/fondoContacto.jpg')] bg-no-repeat bg-cover h-56">
        <div className="flex justify-between text-white font-bold border-b-2 border-white p-5">
          <button
            onClick={() => {
              changeViewInicio(true),
                changeViewMaderas(false),
                changeViewContacto(false),
                changeViewOrigen(false);
            }}
            className="bg-[url('/home/guillermo/App_TFG/front/src/assets/logo.png')] bg-no-repeat bg-cover h-36 w-36 -m-10"
          ></button>

          <div>
            <button
              onClick={() => {
                changeViewInicio(true),
                  changeViewMaderas(false),
                  changeViewContacto(false),
                  changeViewOrigen(false);
              }}
              className={
                viewInicio
                  ? "text-orange-600  rounded m-3 p-1"
                  : "hover:text-orange-600 m-3 p-1"
              }
            >
              Inicio
            </button>

            <button
              onClick={() => {
                changeViewOrigen(true),
                  changeViewMaderas(false),
                  changeViewInicio(false),
                  changeViewContacto(false);
              }}
              className={
                viewOrigen
                  ? "text-orange-600  rounded m-3 p-1"
                  : "hover:text-orange-600 m-3 p-1"
              }
            >
              Origen
            </button>

            <button
              onClick={() => {
                changeViewMaderas(true),
                  changeViewInicio(false),
                  changeViewContacto(false),
                  changeViewOrigen(false);
              }}
              className={
                viewMaderas
                  ? "text-orange-600  rounded m-3 p-1"
                  : "hover:text-orange-600 m-3 p-1"
              }
            >
              Nuestra Madera
            </button>

            <button
              onClick={() => {
                changeViewContacto(true),
                  changeViewInicio(false),
                  changeViewMaderas(false),
                  changeViewOrigen(false);
              }}
              className={
                viewContacto
                  ? "text-orange-600  rounded m-3 p-1"
                  : "hover:text-orange-600 m-3 p-1"
              }
            >
              Contacto
            </button>

            <button
              onClick={() => {
                changeViewResort(true),
                  changeViewWebMaderas(false),
                  changeViewInicio(false),
                  changeViewContacto(false),
                  changeViewMaderas(false),
                  changeViewOrigen(false);
              }}
              className="rounded m-3 p-1"
            >
              Nuestro Eco Resort
            </button>

            <button
              onClick={() => {
                changeViewPortal(true),
                  changeViewResort(false),
                  changeViewInicio(false),
                  changeViewContacto(false),
                  changeViewMaderas(false),
                  changeViewWebMaderas(false);
              }}
              className="rounded m-3 p-1"
            >
              Portal
            </button>
          </div>
        </div>

        {viewInicio ? (
          <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">
            Conocenos
          </h1>
        ) : (
          ""
        )}
        {viewMaderas ? (
          <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">
            Productos
          </h1>
        ) : (
          ""
        )}
        {viewContacto ? (
          <h1 className="flex justify-center font-serif text-white font-blond text-7xl mt-8 ml-5">
            Contacto
          </h1>
        ) : (
          ""
        )}
        {viewOrigen ? (
          <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">
            Origen
          </h1>
        ) : (
          ""
        )}
      </div>

      <Inicio />
      <Maderas />
      <Contacto />
      <Origen />
    </ApolloProvider>
  );
}

export default ContenedorMaderas;
