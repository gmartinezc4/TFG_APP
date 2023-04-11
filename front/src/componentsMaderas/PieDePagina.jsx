import React, { useContext } from "react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { Context } from "../context/Context";

function PieDePagina() {
  const {
    changeViewMaderas,
    changeViewInicio,
    changeViewContacto,
    changeViewOrigen,
    changeViewShoppingCart,
    changeViewProductos,
    changeViewPedidosPerfil,
    changeViewDetallePedido,
    changeViewHacerPedido,
    changeViewSession,
    changeViewProductSelect,
    changeViewPerfil,
  } = useContext(Context);

  return (
    <div className="max-w-full h-32 bg-green-500 text-white">
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col">
          <div className="flex flex-row mb-3 mt-3">
            <AiOutlineQuestionCircle className=" mr-3 w-6 h-6" />
            <h1>Ayuda y contacto</h1>
          </div>
          <h1
            className="hover:underline mb-2"
            onClick={() => {
              changeViewOrigen(true),
                changeViewInicio(false),
                changeViewMaderas(false),
                changeViewContacto(false),
                changeViewProductos(false);
              changeViewShoppingCart(false);
              changeViewPedidosPerfil(false);
              changeViewDetallePedido(false);
              changeViewHacerPedido(false);
              changeViewSession(false);
              changeViewProductSelect(false);
              changeViewPerfil(false);
            }}
          >
            Conocenos
          </h1>
          <h1
            className="hover:underline"
            onClick={() => {
              changeViewContacto(true),
                changeViewInicio(false),
                changeViewOrigen(false),
                changeViewMaderas(false),
                changeViewProductos(false);
              changeViewShoppingCart(false);
              changeViewPedidosPerfil(false);
              changeViewDetallePedido(false);
              changeViewHacerPedido(false);
              changeViewSession(false);
              changeViewProductSelect(false);
              changeViewPerfil(false);
            }}
          >
            Contacto
          </h1>
        </div>

        <div>
          <div className="flex flex-col">
            <div className="flex flex-row mb-3 mt-3">
              <BsCreditCard className=" mr-3 w-6 h-6" />
              <h1>Nuestros modos de pago</h1>
            </div>
            <div className="flex flex-row">
              <FaCcMastercard className=" mr-6 w-14 h-14" />
              <FaCcVisa className="mr-6 w-14 h-14" />
              <BsCashStack className="w-14 h-14"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieDePagina;
