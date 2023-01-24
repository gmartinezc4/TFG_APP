import React, { useState, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { Context } from "../context/Context";
import ShoppingCartProducts from "./ShoppingCartProducts";

const GET_PRODUCTOS = gql`
  query Query {
    getProductos {
      _id
      img
      name
      stock
    }
  }
`;

function ShoppingCart() {
  const { viewShoppingCart } = useContext(Context);

  if (viewShoppingCart == true) {
    return (
      <div>
        <ShoppingCartProducts/>
      </div>
    );
  }
}

export default ShoppingCart;
