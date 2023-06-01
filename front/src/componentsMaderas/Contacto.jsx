import React, { useState, useContext } from "react";
import Maps from "./Maps";
import FormularioContacto from "./FormularioContacto";
import Swal from "sweetalert2";


//
// * Componente página Contacto
// * Renderiza los componentes <Maps /> y <<FormularioContacto />
//
function Contacto() {
  const [openConfirmacion, setOpenConfirmacion] = useState(false);
  const [openError, setOpenError] = useState(false);

  //
  // * Mostrar confirmación al enviar correo de contacto si no hay error
  //
  function mostrarConfirmación() {
    Swal.fire({
      icon: "info",
      title: "!Gracias por contactarnos!",
      text: "Nos pondremos en contacto contigo lo antes posible",
      showConfirmButton: false,
      timer: 2000,
    });
    setOpenConfirmacion(false);
  }

  //
  // * Mostrar error al enviar correo de contacto si hay error.
  //
  function mostrarError() {
    Swal.fire({
      icon: "error",
      title: "Ha ocurrido un error",
      text: "Intentelo de nuevo",
      showConfirmButton: false,
      timer: 1000,
    });
    setOpenError(false);
  }

  return (
    <div>
      {/* Invocación de las funciones para mostrar confirmación o error si se cumplen las condiciones */}
      {openConfirmacion && <div>{mostrarConfirmación()}</div>}
      {openError && <div>{mostrarError()}</div>}

      <div className="flex justify-center p-10">
        <div className="flex flex-col">
          <div>
            <Maps />
            <FormularioContacto
              setOpenConfirmacion={setOpenConfirmacion}
              setOpenError={setOpenError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
