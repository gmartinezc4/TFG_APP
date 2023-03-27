import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import Maps from "./Maps";
import FormularioContacto from "./FormularioContacto";
import ModalConfirmacion from "./ModalConfirmacion";

function Contacto() {
  const { viewContacto, modalIsOpenConfirmacion, closeModalConfirmacion } = useContext(Context);

  const [error, setError] = useState(false);

  if (viewContacto == true) {
    return (
      <div>
        {!error && (
          <ModalConfirmacion
            closeModalConfirmacion={closeModalConfirmacion}
            modalIsOpenConfirmacion={modalIsOpenConfirmacion}
            mensaje={"Gracias por contactar con nosotros"}
          />
        )}

        {error && (
          <ModalConfirmacion
            closeModalConfirmacion={closeModalConfirmacion}
            modalIsOpenConfirmacion={modalIsOpenConfirmacion}
            mensaje={"Ha ocurrido un error"}
          />
        )}

        <div
          className={
            !modalIsOpenConfirmacion
              ? "bg-[url('/home/guillermo/App_TFG/front/src/assets/fondoContacto.jpg')]  bg-repeat-y  flex justify-center p-10"
              : "bg-[url('/home/guillermo/App_TFG/front/src/assets/fondoContacto.jpg')]  h-screen flex justify-center p-10"
          }
        >
          <div className="flex flex-col">
            {!modalIsOpenConfirmacion && (
              <div>
                <Maps />
                <FormularioContacto setError={setError} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Contacto;
