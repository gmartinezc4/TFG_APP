import { useState, useContext } from 'react'
import './App.css'
import ContenedorMaderas from './componentsMaderas/ContenedorMaderas'
import { Context } from "./context/Context";
import ContenedorResort from './componentResort/ContenedorResort';
import ContenedorPortal from './componentesPortal/ContenedorPortal';

function App() {
  const { viewResort, viewWebMaderas } = useContext(Context);

  return (
    <div className="bg-white h-screen">
      {viewWebMaderas == false || viewResort == false && 
        <ContenedorPortal />  
      }
      {viewResort && <ContenedorResort />}
      {viewWebMaderas && <ContenedorMaderas />}
      <ContenedorPortal />
    </div>
  );
}

export default App
