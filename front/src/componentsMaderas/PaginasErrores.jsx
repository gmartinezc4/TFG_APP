import React from 'react'

// 
// * Componente para mostrar pñagina de errores.
// 
function PaginasErrores(props) {
  return (
    <div className='text-6xl bg-white h-screen'>
        Error {props.codigo} <br></br>
        <div>
            {props.mensaje}
        </div>
    </div>
  )
}

export default PaginasErrores