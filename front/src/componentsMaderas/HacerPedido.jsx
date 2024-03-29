import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Context } from "../context/Context";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import styled from "styled-components";

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
//
// * Componente HaceraPedido. Pagína donde se introducen los
// * datos de facturación, se confirma el pedido y permite
// * que se envie el correo de confirmación.
//
// * Props: productos
//
function HacerPedido(props) {
  // Varables del contexto usadas
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
    changeEnviarCorreoConfirmacion,
  } = useContext(Context);

  const [nombre, setNombre] = useState(localStorage.getItem("nombreUser"));
  const [apellido, setApellido] = useState(localStorage.getItem("apellidoUser"));
  const [correo, setCorreo] = useState(localStorage.getItem("emailUser"));
  const [numTelefono, setNumTelefono] = useState("");
  const [calle, setCalle] = useState("");
  const [masInformacion, setmasInformacion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");

  let importe = 0;
  let importeFreeIva = 0;
  const aserraderoMaps = () => {
    window.open(
      "https://www.google.com/maps/place/Casa+de+Moya,+16740+La+Almarcha,+Cuenca/@39.6835612,-2.4447486,17z/data=!3m1!4b1!4m6!3m5!1s0xd67e1c0d0129313:0x3118d5409dc9a973!8m2!3d39.6835612!4d-2.4425599!16s%2Fg%2F11_q_47nx",
      "_blank"
    );
  };

  //
  // * Mutation para realizar el pedido del usuario.
  //
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

      changeEnviarCorreoConfirmacion(true);
      changeReload();
    },
    onError: (error) => {
      console.log(error.toString());
    },
  });

  //
  // * Función que realiza la mutation confirmarPedido
  //
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
        <FondoGrande className="grid grid-cols-2 gap-20 mt-3 mb-10 p-5">
          <div>
            {/* Columna izquierda */}
            {props.productos.map((p) => (
              <FondoPeque key={p._id} className="grid grid-cols-3 p-4 mx-auto">
                <div className="bg-no-repeat bg-contain ">
                  <img className="h-30 w-40 border rounded mb-5 " src={p.img}></img>
                </div>

                <div className="flex flex-col mb-3 ml-5 ">
                  <span className="font-bold underline">{p.name}</span>
                  <span>Cantidad: {p.cantidad}kg</span>
                </div>

                <div className="flex justify-end self-end mb-5">
                  <span className="font-bold">{p.precioTotal}€</span>
                </div>

                <div className="border border-gray-100"></div>

                <div className="hidden">
                  {(importe = importe + parseFloat(p.precioTotal))}
                  {(importeFreeIva = importeFreeIva + parseFloat(p.precioTotal_freeIVA))}
                </div>
              </FondoPeque>
            ))}

            <FondoPeque className="mt-5 p-5">
              <h1 className="font-bold text-2xl mb-7">Total</h1>
              <p className="flex justify-between mb-5">
                <span>Subtotal</span>
                <span>{importeFreeIva.toString().substr(0, 5)}€</span>
              </p>
              <div className="border border-gray-100 mb-5"></div>
              <p className="flex justify-between mb-3 font-semibold">
                <span>Total (IVA incluido)</span>
                <span>{importe.toString().substr(0, 5)}€</span>
              </p>
            </FondoPeque>

            <ButtonVolver
            className="text-white bg-black mt-10 p-2"
            onClick={() => {
              changeViewHacerPedido(false);
              changeViewShoppingCart(true);
            }}
          >
            Volver
          </ButtonVolver>
          </div>

          {/* Columna derecha */}
          <div>
            <FondoPeque className="flex flex-col h-48 p-5 ">
              <span className="font-bold text-xl mb-7">Fecha de recogida prevista</span>
              <span>
                Aproximadamente cuatro días laborables.
                <br></br> <br></br>
                Después dispone de 7 días habiles para recoger el pedido
              </span>
            </FondoPeque>

            <FondoPeque className="flex flex-col bg-white mt-5 p-5 ">
              <span className="font-bold text-xl mb-7">Dirección de recogida</span>
              <span>
                <a onClick={aserraderoMaps} className="hover:cursor-pointer underline">
                  Casa de Moya, 16740 La Almarcha, Cuenca
                </a>
                <br></br> <br></br>
                <span className="flex flex-row justify-between">
                  <p>Lunes - Viernes</p>
                  <p>09:00 - 20:00</p>
                </span>
                <span className="flex flex-row justify-between">
                  <p>Sabados</p>
                  <p>09:00 - 14:00</p>
                </span>
                <span className="flex flex-row justify-between">
                  <p>Domingos</p>
                  <p>Cerrado</p>
                </span>
              </span>
            </FondoPeque>

            <FondoPeque className="flex flex-col mt-5 p-5">
              <div className="flex flex-row">
                <FaCcVisa className="w-9 h-9 mr-3" />
                <FaCcMastercard className="w-9 h-9 ml-3 mr-3" />
                <BsCashStack className="w-9 h-9 ml-3" />
              </div>
            </FondoPeque>
          </div>
        </FondoGrande>
      </div>

      {/* Formulario datos porsonales y dirección de facturación */}
      <div className="flex justify-center">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            tramitarDatos();
          }}
        >
          <FondoGrande className="grid grid-cols-3 gap-20  mt-3 mb-20  p-5 items-start">
            {/* Columna izquierda */}
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

            {/* Columna derecha */}
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
              className="w-64 bg-yellow-500 text-white p-2  hover:bg-yellow-400 mt-16"
              type="submit"
            >
              Confirmar pedido
            </button>
          </FondoGrande>
        </form>
      </div>
    </div>
  );
}

export default HacerPedido;

const FondoGrande = styled.div`
  background-color: #e0e2e5;
`;

const FondoPeque = styled.div`
  background-color: #f5f5f4;
`;

const ButtonVolver = styled.div`
  text-aling: center;
  cursor: pointer;
  width: 63px;
  &:hover {
    background-color: #f5be0b;
    color: black;
  }
`
