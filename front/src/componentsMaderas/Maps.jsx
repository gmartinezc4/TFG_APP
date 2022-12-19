import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function Maps() {
  return ( //className="bg-[url('/home/guillermo/App_TFG/front/src/assets/header.jpg')] bg-no-repeat bg-cover h-80"
    <div className="bg-[url('/home/guillermo/App_TFG/front/src/assets/fondoContacto.jpg')] bg-no-repeat bg-cover h-screen flex flex-row justify-center p-10">
      
      <div className="m-10 text-white">
        <div className="flex flex-col font-mono ">
          <h1 className="flex justify-center m-3 text-xl">A S E R A D E R O</h1>
          <p className="flex justify-center m-3 text-2xl">+34 626105849</p>
          <p className="flex justify-center m-3 text-2xl">
            info@maderascobo.com
          </p>
          <p className="flex justify-center m-3 text-xs mb-10">
            Casa de Moya, 16740 La Almarcha, Cuenca
          </p>
        </div>
        <MapContainer
          className="h-96 w-96 flex"
          center={[39.683553, -2.442342]}
          zoom={14}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[39.683553, -2.442342]}>
            <Popup>Aserradero</Popup>
          </Marker>
        </MapContainer>

      </div>

      <div className="m-10 text-white">
        <div className="flex flex-col font-mono ">
          <h1 className="flex justify-center m-3 text-xl">O F I C I N A</h1>
          <p className="flex justify-center m-3 text-2xl">+34 969214585</p>
          <p className="flex justify-center m-3 text-2xl">
            info@maderascobo.com
          </p>
          <p className="flex justify-center m-3 text-xs mb-10">
            C. de Colón, 47, 1, 16002 Cuenca
          </p>
        </div>
        <MapContainer
          className="h-96 w-96"
          center={[40.072147885092456, -2.137103240531428]}
          zoom={17}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[40.072147885092456, -2.137103240531428]}>
            <Popup> Oficina </Popup>
          </Marker>
        </MapContainer>
      </div>
      
    </div>
  );
}

export default Maps;
