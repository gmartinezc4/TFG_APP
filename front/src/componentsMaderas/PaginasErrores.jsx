import React from 'react'

// 
// * Componente para mostrar pñagina de errores.
// 
function PaginasErrores(props) {
  return (
    <div className='text-6xl'>
        Error {props.codigo} <br></br>
        <div>
            {props.mensaje}
        </div>
    </div>
  )
}

export default PaginasErrores