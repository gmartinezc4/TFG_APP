import React, { useState, useContext } from "react";
import Maderas from "./Maderas";
import Inicio from "./Inicio";
import { Context } from "../context/Context";
import Contacto from "./Contacto";
import Origen from "./Origen";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import ProductosVenta from "./ProductosVenta";
import BotonesUser from "./BotonesUser";
import ShoppingCart from "./ShoppingCart";

function ContenedorMaderas() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });

  const {
    viewMaderas,
    changeViewMaderas,
    viewInicio,
    changeViewInicio,
    viewContacto,
    changeViewContacto,
    viewOrigen,
    changeViewOrigen,
    viewShoppingCart,
    changeViewShoppingCart,
    viewProductos,
    changeViewProductos,
  } = useContext(Context);

  return (
    <ApolloProvider client={client}>
      <div className="bg-[url('/home/guillermo/App_TFG/front/src/assets/fondoContacto.jpg')] bg-no-repeat bg-cover h-56">
        <div className="flex justify-between text-white font-bold border-b-2 border-white p-5">
          <button
            onClick={() => {
              changeViewInicio(true),
                changeViewOrigen(false),
                changeViewMaderas(false),
                changeViewContacto(false),
                changeViewProductos(false);
                changeViewShoppingCart(false);
            }}
            className="bg-[url('/home/guillermo/App_TFG/front/src/assets/logo.png')] bg-no-repeat bg-cover h-36 w-36 -m-10"
          ></button>

          <div>
            <button
              onClick={() => {
                changeViewInicio(true),
                  changeViewOrigen(false),
                  changeViewMaderas(false),
                  changeViewContacto(false),
                  changeViewProductos(false);
                  changeViewShoppingCart(false);
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
                  changeViewInicio(false),
                  changeViewMaderas(false),
                  changeViewContacto(false),
                  changeViewProductos(false);
                  changeViewShoppingCart(false);
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
                  changeViewOrigen(false),
                  changeViewContacto(false),
                  changeViewProductos(false);
                  changeViewShoppingCart(false);
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
                  changeViewOrigen(false),
                  changeViewMaderas(false),
                  changeViewProductos(false);
                  changeViewShoppingCart(false);
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
                changeViewProductos(true),
                  changeViewInicio(false),
                  changeViewOrigen(false),
                  changeViewMaderas(false),
                  changeViewContacto(false);
                  changeViewShoppingCart(false);
              }}
              className={
                viewProductos
                  ? "text-orange-600  rounded m-3 p-1"
                  : "hover:text-orange-600 m-3 p-1"
              }
            >
              Productos
            </button>
          </div>
        </div>

        {viewInicio && (
          <div className="">
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">
              Conocenos
            </h1>
            <BotonesUser />
          </div>
        )}
        {viewMaderas && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">
              Maderas
            </h1>
            <BotonesUser />
          </div>
        )}

        {viewContacto && (
          <div>
            <h1 className="flex justify-center font-serif text-white font-blond text-7xl mt-8 ml-5">
              Contacto
            </h1>
            <BotonesUser />
          </div>
        )}

        {viewOrigen && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">
              Origen
            </h1>
            <BotonesUser />
          </div>
        )}

        {viewProductos && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">
              Productos
            </h1>
            <BotonesUser />
          </div>
        )}

        {viewShoppingCart && (
          <div>
            <h1 className="text-white font-serif font-blond text-5xl mt-8 ml-5">
              Carrito
            </h1>
            <BotonesUser />
          </div>
        )}
      </div>

      <Inicio />
      <Maderas />
      <Contacto />
      <Origen />
      <ProductosVenta />
      <ShoppingCart />
    </ApolloProvider>
  );
}

export default ContenedorMaderas;
