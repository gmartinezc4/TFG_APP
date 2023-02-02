import React, { useContext, useState } from "react";
import { Context } from "../context/Context";

function ShoppingCart() {
  const { changeReload, token, viewShoppingCart } = useContext(Context);
  
  if(viewShoppingCart){
    return <div>ShoppingCart</div>;
  }
  
}

export default ShoppingCart;
