import React, { useContext } from "react";
import { Context } from "../context/Context";
import Maps from "./Maps";

function Contacto() {
  const { viewContacto } = useContext(Context);

  if (viewContacto == true) {
    return (
      <div>
        <Maps/>
     </div>
    );
  }
}

export default Contacto;
