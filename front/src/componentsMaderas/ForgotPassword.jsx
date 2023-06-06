import React, { useState, useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { Context } from "../context/Context";

const RECUPERAR_PASS = gql`
  mutation Mutation($email: String!) {
    forgotPassword(email: $email)
  }
`;

//
// * Componenete ForgotPassword. Primera página para recuperar la contraseña.
// * El usuario introduce su correo electrónico y recibe un código de recupración.
//
function ForgotPassword() {
  // Varables del contexto usadas
  const {
    changeReload,
    changeViewRecuperarPass1,
    changeViewRecuperarPass2,
    changeEmailUserRecuperaPass,
  } = useContext(Context);

  const [correo, setCorreo] = useState("");
  const [errorEmailNotExist, setErrorEmailNotExist] = useState(false);
  const [noHayCorreo, setNoHayCorreo] = useState(false);

  //
  // * Mutation para recuperar la contraseña del usuario.
  // * Envia correo con código de recuperación si el correo existe.
  //
  const [recuperarPassword] = useMutation(RECUPERAR_PASS, {
    onCompleted: (data) => {
      localStorage.setItem("codigoRecuperacion", data.forgotPassword); //cuando se complete la mutation guardar el código
      changeEmailUserRecuperaPass(correo);
      setCorreo("");
      changeViewRecuperarPass1(false);
      changeViewRecuperarPass2(true);
      changeReload();
    },
    onError: (error) => {
      //si hay un error, borrar el token
      console.log(error);
      localStorage.removeItem("codigoRecuperacion");
      changeEmailUserRecuperaPass("");
      setErrorEmailNotExist(true);
    },
  });

  //
  // * Función que comprueba el correo introducido por el usuario.
  //
  function comprobarUser() {
    if (correo == "") {
      setNoHayCorreo(true);
      setErrorEmailNotExist(false);
    } else {
      setNoHayCorreo(false);
      recuperarPassword({
        variables: {
          email: correo,
        },
      });
    }
  }

  return (
    <div className="mt-52 mb-96">
      {/* Form para introducir el correo */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          comprobarUser();
        }}
      >
        {errorEmailNotExist && (
          <p className="flex justify-center text-red-500 text-xs italic mb-3">
            El email no está registrado
          </p>
        )}

        <label className="text-gray-700 text-sm font-bold mb-2 flex justify-center">
          Email
        </label>
        <div className="flex justify-center">
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
          ></input>
        </div>

        {noHayCorreo && (
          <p className="text-red-500 text-xs italic mt-3 flex justify-center">
            Porfavor introduzca un correo electrónico
          </p>
        )}
        <div className="flex justify-center mt-5">
          <button
            className="bg-black hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-9"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
