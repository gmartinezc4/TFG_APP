import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function Maps() {
  const oficinaMaps = () => {
    window.open(
      "https://www.google.com/maps/place/Asconta+sl/@40.0721204,-2.1392739,17z/data=!4m15!1m8!3m7!1s0xd5d67650610af09:0xe4c3a668f9b931f9!2sC.+de+Col%C3%B3n,+47,+1,+16002+Cuenca!3b1!8m2!3d40.0721204!4d-2.1370852!16s%2Fg%2F11qplq1jmc!3m5!1s0xd5d67651beacb51:0xbf0dbe59ae83c3ed!8m2!3d40.0721204!4d-2.1370852!16s%2Fg%2F1td_jlc0",
      "_blank"
    );
  };

  const aserraderoMaps = () => {
    window.open(
      "https://www.google.com/maps/place/Casa+de+Moya,+16740+La+Almarcha,+Cuenca/@39.6835612,-2.4447486,17z/data=!3m1!4b1!4m6!3m5!1s0xd67e1c0d0129313:0x3118d5409dc9a973!8m2!3d39.6835612!4d-2.4425599!16s%2Fg%2F11_q_47nx",
      "_blank"
    );
  };

  return (
    <div className="flex flex-row p-10">
      <div className="mr-10 -mt-16 text-white">
        <div className="flex flex-col font-mono ">
          <h1 className="flex justify-center m-3 text-xl">A S E R A D E R O</h1>
          <p className="flex justify-center m-3 text-2xl">+34 626105849</p>
          <p className="flex justify-center m-3 text-2xl">maderas.cobo.cuenca@gmail.com</p>
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
            <Popup>
              <button
                className="border-2 border-blue-600 p-1 bg-blue-400 text-white font-bold hover:bg-blue-600 hover:border-blue-400"
                onClick={aserraderoMaps}
              >
                como llegar
              </button>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="ml-10 -mt-16 text-white">
        <div className="flex flex-col font-mono ">
          <h1 className="flex justify-center m-3 text-xl">O F I C I N A</h1>
          <p className="flex justify-center m-3 text-2xl">+34 969214585</p>
          <p className="flex justify-center m-3 text-2xl">maderas.cobo.cuenca@gmail.com</p>
          <p className="flex justify-center m-3 text-xs mb-10">C. de Colón, 47, 1, 16002 Cuenca</p>
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
            <Popup>
              <button
                className="border-2 border-blue-600 p-1 bg-blue-400 text-white font-bold hover:bg-blue-600 hover:border-blue-400"
                onClick={oficinaMaps}
              >
                como llegar
              </button>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Maps;
