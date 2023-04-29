import React, { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Context } from "../context/Context";

function FormularioContacto(props) {
  const form = useRef();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [texto, setTexto] = useState("")

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("Maderas_Cobo_Gmail", "template_346r2t8", form.current, "ePa31yfxHKL_zHYnH")
      .then(
        (result) => {
          console.log(result.text);
          setNombre("");
          setEmail("");
          setTexto("");
          props.setOpenConfirmacion(true);
        },
        (error) => {
          console.log(error.text);
          props.setError(true);
          props.setOpenError(true);
        }
      );
  };


  return (
    <div className="flex justify-center">
      <form ref={form} onSubmit={sendEmail} className="flex flex-col mt-8 w-96">
        <label className="flex justify-center text-white  font-bold mb-2 font-mono">Nombre</label>
        <input
          type="text"
          name="user_name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="shadow appearance-none border rounded p-2 mb-10"
        />
        <label className="flex justify-center text-white  font-bold mb-2 font-mono">Email</label>
        <input
          type="email"
          name="user_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded p-2 mb-10"
        />
        <label className="flex justify-center text-white  font-bold mb-2 font-mono">Mensaje</label>
        <textarea name="message" className="shadow appearance-none border rounded p-2 mb-10" value={texto} onChange={(e) => setTexto(e.target.value)}/>
        <input type="submit" value="Send" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  mb-12" />
      </form>
    </div>
  );
}

export default FormularioContacto;
