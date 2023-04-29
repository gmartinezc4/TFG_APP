import React, { useContext, useState, useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Context } from "../context/Context";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";

const VENDER_PRODUCTOS = gql`
  mutation Mutation(
    $nombre: String!
    $apellido: String!
    $correo: String!
    $telefono: String!
    $direccion: String!
    $masInformacion: String!
    $codigoPostal: String!
    $ciudad: String!
    $pais: String!
  ) {
    venderProductos(
      nombre: $nombre
      apellido: $apellido
      correo: $correo
      telefono: $telefono
      direccion: $direccion
      masInformacion: $masInformacion
      codigoPostal: $codigoPostal
      ciudad: $ciudad
      pais: $pais
    ) {
      apellido
      ciudad
      codigoPostal
      direccion
      email
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
    }
  }
`;

function HacerPedido(props) {
  const {
    changeReload,
    changeViewMaderas,
    changeViewInicio,
    changeViewContacto,
    changeViewOrigen,
    changeViewShoppingCart,
    changeViewProductos,
    changeViewPedidosPerfil,
    changeViewHacerPedido,
    openModalConfirmacionCorreo,
    changeEnviarCorreoConfirmacion,
  } = useContext(Context);

  const [nombre, setNombre] = useState("hola");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [numTelefono, setNumTelefono] = useState("");
  const [calle, setCalle] = useState("");
  const [masInformacion, setmasInformacion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");

  const [confirmarPedido] = useMutation(VENDER_PRODUCTOS, {
    onCompleted: () => {
      console.log("despues de mutation");
      changeViewShoppingCart(true);
      changeViewProductos(false),
        changeViewInicio(false),
        changeViewOrigen(false),
        changeViewMaderas(false),
        changeViewContacto(false);
      changeViewPedidosPerfil(false);
      changeViewHacerPedido(false);
      
      openModalConfirmacionCorreo();
      changeEnviarCorreoConfirmacion(true);
      
      changeReload();
    },
    onError: (error) => {
      console.log(error.toString());
    },
  });

  let importe = 0;
  let importeFreeIva = 0;
  const fechaRecogida = new Date();

  function tramitarDatos() {
    console.log("antes de mutation vender productos");
    confirmarPedido({
      context: {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      },
      variables: {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        telefono: numTelefono,
        direccion: calle,
        masInformacion: masInformacion,
        codigoPostal: codigoPostal,
        ciudad: ciudad,
        pais: pais,
      },
    });
  }

  return (
    <div>
      <div className="flex justify-center ">
        <div className="grid grid-cols-2 gap-20 mt-3 mb-10 bg-slate-100 p-5">
          {/* columna izquierda */}
          <div>
            {props.productos.map((p) => (
              <div key={p._id} className="grid grid-cols-3 p-4 mx-auto bg-white ">
                <div className="bg-no-repeat bg-contain ">
                  <img className="h-30 w-40 border rounded mb-5 " src={p.img}></img>
                </div>

                <div className="flex flex-col mb-3 ml-5 ">
                  <span>{p.name}</span>
                  <span>Cantidad: {p.cantidad}kg</span>
                </div>

                <div className="flex justify-end self-end mb-5">
                  <span className="font-bold">{p.precioTotal}€</span>
                </div>

                <div className="border border-gray-100"></div>

                <div className="hidden">
                  {(importe = importe + parseInt(p.precioTotal))}
                  {(importeFreeIva = importeFreeIva + parseInt(p.precioTotal_freeIVA))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex flex-col bg-white h-48 p-5 ">
              <span className="font-bold text-xl mb-7">Fecha de recogida prevista</span>
              <span>
                {fechaRecogida.getDate() +
                  2 +
                  "/" +
                  (fechaRecogida.getMonth() + 1) +
                  " - " +
                  (fechaRecogida.getDate() + 4) +
                  "/" +
                  (fechaRecogida.getMonth() + 1)}
                <br></br> <br></br>
                Dispone de 7 días habiles para recoger el pedido
              </span>
            </div>

            <div className="flex flex-col bg-white mt-5 p-5">
              <div className="flex flex-row">
                <FaCcVisa className="w-9 h-9 mr-3" />
                <FaCcMastercard className="w-9 h-9 ml-3 mr-3" />
                <BsCashStack className="w-9 h-9 ml-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <form
          className="grid grid-cols-3 gap-20  mt-3 mb-20 bg-slate-100 p-5 items-start"
          onSubmit={(event) => {
            event.preventDefault();
            tramitarDatos();
          }}
        >
          <div className="flex justify-center flex-col">
            <h1 className="text-2xl mb-5 font-bold">Datos personales</h1>

            <label>Nombre*</label>
            <input
              type="text"
              className="border border-black rounded-md mb-4"
              placeholder="Pedro..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              minLength={2}
              required
            ></input>
            <label>Apellido*</label>
            <input
              type="text"
              className="border border-black rounded-md mb-4"
              placeholder="Rodriguez..."
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              minLength={2}
              required
            ></input>
            <label>Email*</label>
            <input
              type="text"
              className="border border-black rounded-md mb-4"
              placeholder="Rodriguez..."
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              minLength={2}
              required
            ></input>
            <label>Numero de telefono*</label>
            <input
              type="tel"
              className="border border-black rounded-md mb-4"
              placeholder="626146783..."
              value={numTelefono}
              onChange={(e) => setNumTelefono(e.target.value)}
              minLength={9}
              maxLength={9}
              required
            ></input>
          </div>

          <div className="flex justify-center flex-col">
            <h1 className="text-2xl mb-5 font-bold">Dirección de facturación</h1>
            <label>Calle*</label>
            <input
              type="text"
              className="border border-black rounded-md mb-4"
              placeholder="C/ Gran Via..."
              value={calle}
              onChange={(e) => setCalle(e.target.value)}
              minLength={4}
              required
            ></input>
            <label>Mas información</label>
            <input
              className="border border-black rounded-md mb-4"
              placeholder="Piso, bloque edificio, escalera..."
              value={masInformacion}
              onChange={(e) => setmasInformacion(e.target.value)}
            ></input>
            <label>Codigo postal*</label>
            <input
              type="tel"
              className="border border-black rounded-md mb-4"
              placeholder="28013..."
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
              minLength={5}
              maxLength={5}
              required
            ></input>
            <label>Ciudad*</label>
            <input
              type="text"
              className="border border-black rounded-md mb-4"
              placeholder="Madrid..."
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              minLength={4}
              required
            ></input>
            <label>Pais*</label>
            <input
              type="text"
              className="border border-black rounded-md mb-4"
              placeholder="España..."
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              minLength={4}
              required
            ></input>
          </div>
          <button
            className="w-64 bg-orange-600 text-white p-2  hover:bg-orange-500 mt-16"
            type="submit"
          >
            Confirmar pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default HacerPedido;
