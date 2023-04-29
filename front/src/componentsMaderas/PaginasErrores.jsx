import React from 'react'

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