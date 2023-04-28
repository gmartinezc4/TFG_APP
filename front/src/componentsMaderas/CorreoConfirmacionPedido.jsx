import React, { useContext, useRef, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import emailjs from "@emailjs/browser";
import { Context } from "../context/Context";

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

function CorreoConfirmacionPedido() {
  const form = useRef();

  const { changeEnviarCorreoConfirmacion } = useContext(Context);

  const { data, loading, error } = useQuery(GET_PEDIDOS_ACTIVOS_USER, {
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  });

  if (loading) return <div></div>;
  if (error) return <div>Error...</div>;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("Maderas_Cobo_Gmail", "template_a9o7nvu", form.current, "ePa31yfxHKL_zHYnH")
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

  const index = data.getPedidosActivosUser.length - 1;
  let importeFreeIva_redonded = data.getPedidosActivosUser[index].importeFreeIvaPedido.toString();

  
  return (
    <div>
      <form ref={form} onSubmit={sendEmail} className="flex flex-col mt-8 w-96">
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
          defaultValue={importeFreeIva_redonded.substring(0, 5)}
          hidden
        />
        <input
          type="text"
          name="total"
          defaultValue={data.getPedidosActivosUser[index].importePedido}
          hidden
        />

        <input
          type="submit"
          value="Send"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  mb-16"
        />
      </form>
    </div>
  );
}

export default CorreoConfirmacionPedido;
