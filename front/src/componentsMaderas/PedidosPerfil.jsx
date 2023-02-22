import React, { useContext } from "react";
import { Context } from "../context/Context";

function PedidosPerfil() {
  const { changeReload, token, viewShoppingCart, viewPedidosPerfil, changeViewPedidosPerfil } =
    useContext(Context);

  if (viewPedidosPerfil) {
    return <div>PedidosPerfil</div>;
  }
}

export default PedidosPerfil;
