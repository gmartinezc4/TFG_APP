import React from "react";
import Modal from "react-modal";

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

function ModalConfirmacion(props) {
  return (
    <div>
      <Modal
        isOpen={props.modalIsOpenConfirmacion}
        onRequestClose={props.closeModalConfirmacion}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1 className="flex justify-center font-bold text-2xl">{props.mensaje}</h1>
        <div className="flex justify-center">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10"
            onClick={props.closeModalConfirmacion}
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalConfirmacion;
