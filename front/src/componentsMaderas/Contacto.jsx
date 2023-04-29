import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import Maps from "./Maps";
import FormularioContacto from "./FormularioContacto";
import ModalConfirmacion from "./ModalConfirmacion";
import Swal from "sweetalert2";

function Contacto() {
  const { viewContacto, modalIsOpenConfirmacion, closeModalConfirmacion, changeReload, changeViewContacto } = useContext(Context);

  const [error, setError] = useState(false);
  const [openConfirmacion, setOpenConfirmacion] = useState(false);
  const [openError, setOpenError] = useState(false);

  function mostrarConfirmación() {
    Swal.fire({
      icon: "info",
      title: "!Gracias por contactarnos!",
      text: "Nos pondremos en contacto contigo lo antes posible",
    });
  }

  function mostrarError() {
    Swal.fire({
      icon: "error",
      title: "Ha ocurrido un error",
      text: "Intentelo de nuevo",
    });
  }

  if (viewContacto == true) {
    return (
      <div>
        {!error && openConfirmacion && <div>{mostrarConfirmación()}</div>}

        {error && openError && <div>{mostrarError()}</div>}

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
                <FormularioContacto
                  setError={setError}
                  setOpenConfirmacion={setOpenConfirmacion}
                  setOpenError={setOpenError}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Contacto;
