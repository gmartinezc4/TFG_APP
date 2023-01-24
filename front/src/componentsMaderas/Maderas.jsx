import React, { useContext } from "react";
import { Context } from "../context/Context";
import MaderaCards from "./MaderaCards";

function Maderas() {
  const { viewMaderas } = useContext(Context);

  if (viewMaderas == true) {
    return (
      <div>
        <MaderaCards />
      </div>
    );
  }
}

export default Maderas;
