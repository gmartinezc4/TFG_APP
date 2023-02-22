import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Context } from "../context/Context";
import Modal from "react-modal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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

function ModalesPerfil(props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [noHayNombre, setNoHayNombre] = useState(false);
  const [noHayApellido, setNoHayApellido] = useState(false);

  const [correo, setCorreo] = useState("");
  const [correoRep, setCorreoRep] = useState("");
  const [noHayCorreo, setNoHayCorreo] = useState(false);
  const [noHayCorreoRep, setNoHayCorreoRep] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [errorCorreoIncompleto, setErrorCorreoIncompleto] = useState(false);
  const [noCoincidenCorreos, setNoCoincidenCorreos] = useState(false);

  const [password, setPassword] = useState("");
  const [noHayPassword, setNoHayPassword] = useState(false);

  const [passView, setPassView] = useState(false);

  function comprobarUserNombreApellido() {
    if (nombre == "") {
      setNoHayNombre(true);
      setNoHayApellido(false);
    } else if (apellido == "") {
      setNoHayApellido(true);
      setNoHayNombre(false);
    } else {
      setNoHayApellido(false);
      setNoHayNombre(false);
      props.closeModalNombreApellido();
    }
  }
console.log(password)
  //falta el caso de cuando el correo existe y el de cuando la contraseña no es correcta
  function comprobarUserCorreo() {
    if (correo == "") {
      setNoHayCorreo(true);
      setNoHayCorreoRep(false);
      setErrorCorreoIncompleto(false);
      setErrorCorreo(false);
      setNoCoincidenCorreos(false);
      setNoHayPassword(false);
    } else if (correoRep == "") {
      setNoHayCorreoRep(true);
      setNoHayCorreo(false);
      setErrorCorreoIncompleto(false);
      setErrorCorreo(false);
      setNoCoincidenCorreos(false);
      setNoHayPassword(false);
    } else if (correo != correoRep) {
      setNoCoincidenCorreos(true);
      setNoHayCorreo(false);
      setNoHayCorreoRep(false);
      setErrorCorreoIncompleto(false);
      setErrorCorreo(false);
      setNoHayPassword(false);
    } else if (password == "") {
      setNoHayPassword(true);
      setNoCoincidenCorreos(false);
      setNoHayCorreo(false);
      setNoHayCorreoRep(false);
      setErrorCorreoIncompleto(false);
      setErrorCorreo(false);
    } else {
      setNoHayCorreo(false);
      setNoHayCorreoRep(false);
      setErrorCorreoIncompleto(false);
      setErrorCorreo(false);
      setNoCoincidenCorreos(false);
      setNoHayPassword(false);
      props.closeModalCorreo();
    }
  }

  return (
    <div>
      {/* Modal Nombre y Apellido */}
      <Modal
        isOpen={props.modalIsOpenNombreApellido}
        onRequestClose={props.closeModalNombreApellido}
        style={customStyles}
        ariaHideApp={false}
      >
        <form
          className="p-3 flex flex-col justify-center"
          onSubmit={(event) => {
            event.preventDefault();
            comprobarUserNombreApellido();
          }}
        >
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input
            className={
              noHayNombre
                ? "shadow appearance-none border rounded p-2 border-red-500"
                : "shadow appearance-none border rounded p-2"
            }
            placeholder="Nombre..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            name="nombre"
          ></input>
          {noHayNombre && (
            <p className="text-red-500 text-xs italic mt-3">Porfavor introduzca el nuevo nombre</p>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">apellido</label>
          <input
            className={
              noHayApellido
                ? "shadow appearance-none border rounded p-2 border-red-500"
                : "shadow appearance-none border rounded p-2"
            }
            placeholder="Apellido..."
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            type="text"
            name="apellido"
          ></input>

          {noHayApellido && (
            <p className="text-red-500 text-xs italic mt-3">
              Porfavor introduzca el nuevo apellido
            </p>
          )}

          <div className="flex justify-between items-center mt-5">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Correo */}
      <Modal
        isOpen={props.modalIsOpenCorreo}
        onRequestClose={props.closeModalCorreo}
        style={customStyles}
        ariaHideApp={false}
      >
        {noCoincidenCorreos && (
          <p className="text-red-500 text-xs italic mt-3 flex justify-center">
            Los Emails tienen que coincidir
          </p>
        )}

        <form
          className="p-3 flex flex-col justify-center"
          onSubmit={(event) => {
            event.preventDefault();
            comprobarUserCorreo();
          }}
        >
          <label className="block text-gray-700 text-sm font-bold mb-2">Correo</label>
          <input
            className={
              noHayCorreo
                ? "shadow appearance-none border rounded p-2 border-red-500"
                : "shadow appearance-none border rounded p-2"
            }
            placeholder="Correo electrónico..."
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            type="text"
            name="correo"
            pattern="[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?"
            onInvalid={() => {
              {
                setErrorCorreoIncompleto(true), setNoHayCorreo(false);
              }
            }}
          ></input>
          {noHayCorreo && (
            <p className="text-red-500 text-xs italic mt-3">Porfavor introduzca el nuevo email</p>
          )}
          {errorCorreoIncompleto && (
            <p className="text-red-500 text-xs italic mt-3">
              Porfavor introduzca un correo electrónico valido
            </p>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">Repetir Correo</label>
          <input
            className={
              noHayCorreoRep
                ? "shadow appearance-none border rounded p-2 border-red-500"
                : "shadow appearance-none border rounded p-2"
            }
            placeholder="Correo electrónico..."
            value={correoRep}
            onChange={(e) => setCorreoRep(e.target.value)}
            type="text"
            name="correoRep"
          ></input>
          {noHayCorreoRep && (
            <p className="text-red-500 text-xs italic mt-3">
              Porfavor introduzca de nuevo el email
            </p>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">Password</label>
          <div className="flex flex-row items-center">
            <input
              className={
                noHayPassword
                  ? "shadow appearance-none border rounded p-2 border-red-500"
                  : "shadow appearance-none border rounded p-2"
              }
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={passView ? "text" : "password"}
              name="password"
              autoComplete="off"
            ></input>
            <div
              className="shadow appearance-none border rounded p-3 bg-green-300 hover:bg-green-500"
              onClick={() => {
                setPassView(!passView);
              }}
            >
              {passView && <AiFillEye />}
              {!passView && <AiFillEyeInvisible />}
            </div>
          </div>

          {noHayPassword && (
            <p className="text-red-500 text-xs italic mt-3">Porfavor introduzca una contraseña</p>
          )}

          <div className="flex justify-between items-center mt-5">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ModalesPerfil;
