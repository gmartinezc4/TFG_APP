import React, { useContext, useRef, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import emailjs from "@emailjs/browser";
import { Context } from "../context/Context";
import Swal from "sweetalert2";

const GET_PEDIDOS_ACTIVOS_USER = gql`
  query Query {
    getPedidosActivosUser {
      _id
      apellido
      ciudad
      codigoPostal
      direccion
      estado
      fechaPedido
      fechaRecogida
      id_user
      importeFreeIvaPedido
      importePedido
      masInformacion
      nombre
      pais
      telefono
      email
      productos {
        _id
        cantidad
        id_producto
        id_user
        img
        name
        precioTotal
        precioTotal_freeIVA
      }
    }
  }
`;

//
// * Componente que se encarga de enviar un corro de
// * confirmación tras realizar un pedido exitosamente.
//
function CorreoConfirmacionPedido() {
  const form = useRef();

  // Variables del contexto usadas
  const { changeEnviarCorreoConfirmacion } = useContext(Context);

  //
  // * Query para traer los pedidos activos del usuario.
  //
  const { data, loading, error } = useQuery(GET_PEDIDOS_ACTIVOS_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loading) return <div></div>;
  if (error) return (
    <div>
      {changeErrorTrue()} {changeCodigoError(404)}
      {changeMensajeError(error.message)}
    </div>
  );

  //
  // * Función que envia el email de confirmación al gmail de la empresa.
  //
  const sendEmail = () => {
    emailjs
      .sendForm(
        "Maderas_Cobo_Gmail",
        "template_a9o7nvu",
        form.current,
        "ePa31yfxHKL_zHYnH"
      )
      .then(
        (result) => {
          console.log(result.text);
          changeEnviarCorreoConfirmacion(false);
        },
        (error) => {
          console.log(error.text);
          changeEnviarCorreoConfirmacion(false);
        }
      );
  };

  // index = último pedido activo del usuario (pedido que acaba de realizar)
  const index = data.getPedidosActivosUser.length - 1;
  let importeFreeIva_string =
    data.getPedidosActivosUser[index].importeFreeIvaPedido.toString();

  //
  // * Función que enviar el correo y muestra la confirmación.
  //
  function mostrarModal() {
    Swal.fire({
      title: "¡Pedido confirmado!",
      text: "Le hemos enviado la confirmación al correo electrónico",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    }).then(() => {
      sendEmail();
    });
  }

  return (
    <div>
      {/* form que utiliza EmailJs para recoger los datos y enviarlos en el correo */}
      <form
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          sendEmail();
        }}
        className="flex flex-col mt-8 w-96"
      >
        <input
          type="text"
          name="user_email"
          defaultValue={data.getPedidosActivosUser[index].email}
          hidden
        />
        <input
          type="text"
          name="fecha_recogida"
          defaultValue={data.getPedidosActivosUser[index].fechaRecogida}
          hidden
        />
        <input
          type="text"
          name="user_name"
          defaultValue={
            data.getPedidosActivosUser[index].nombre +
            " " +
            data.getPedidosActivosUser[index].apellido
          }
          hidden
        />
        <input
          type="text"
          name="direccion"
          defaultValue={data.getPedidosActivosUser[index].direccion}
          hidden
        />
        {data.getPedidosActivosUser[index].masInformacion != "" && (
          <input
            type="text"
            name="d_adicional"
            defaultValue={", " + data.getPedidosActivosUser[index].masInformacion}
            hidden
          />
        )}

        <input
          type="text"
          name="codigoPostal_Ciudad"
          defaultValue={data.getPedidosActivosUser[index].codigoPostal}
          hidden
        />
        <input
          type="text"
          name="pais"
          defaultValue={data.getPedidosActivosUser[index].pais}
          hidden
        />
        <input
          type="text"
          name="fecha_compra"
          defaultValue={data.getPedidosActivosUser[index].fechaPedido}
          hidden
        />
        <input
          type="text"
          name="num_pedido"
          defaultValue={data.getPedidosActivosUser[index]._id}
          hidden
        />
        <input
          type="text"
          name="subtotal"
          defaultValue={importeFreeIva_string.substring(0, 5)}
          hidden
        />
        <input
          type="text"
          name="total"
          defaultValue={data.getPedidosActivosUser[index].importePedido}
          hidden
        />
      </form>

      {mostrarModal()}
    </div>
  );
}

export default CorreoConfirmacionPedido;
