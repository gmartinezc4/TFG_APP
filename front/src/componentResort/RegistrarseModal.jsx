import React, { useContext } from "react";
import { Context } from "../context/Context";
import Modal from "react-modal";

//<div className="absolute w-96 h-50 bg-white border-2 border-black shadow-black shadow-2xl p-5">

const customStyles = {
  content: {
    position: "absolute",
    width: 400,
    backgrounColor: "white",
    boxShadow: "10px 5px 5px black",
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
  },
};

function RegistrarseModal(props) {
  return (
    <div>
      {console.log("modal")}
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <h2 className="flex justify-center pb-4">Registrese</h2>

        <form className="p-3">
          <input
            className="border-b-2 border-black p-2"
            placeholder="Nombre..."
          ></input>
          <input
            className="border-b-2 border-black p-2"
            placeholder="Apellido..."
          ></input>
          <input
            className="border-b-2 border-black p-2"
            placeholder="Contraseña..."
          ></input>
          <input
            className="border-b-2 border-black p-2"
            placeholder="Repetir contraseña..."
          ></input>
        </form>
        <div className="flex justify-end pt-4 ">
          <button className="pr-3 border border-black bg-green-500">Submit</button>
          <button className="pl-3 border border-black bg-yellow-400" onClick={props.closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default RegistrarseModal;
