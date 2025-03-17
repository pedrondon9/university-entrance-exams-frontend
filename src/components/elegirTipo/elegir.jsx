import React from 'react'
import "./elegir.css"

function Elegir() {
  return (
    <div className='elegir-conatainer'>
      <div className='elegir-conatainer-resp'>
        <button className='btn-small uno'>corregido-junio-general</button>
        <button className='btn-small dos'>corregido-junio-especifica</button>
        <button className='btn-small tres'>no-corregido-junio-general</button>
        <button className='btn-small cuatro'>no-corregido-junio-general</button>
        <button className='btn-small cinco'>corregido-septiem-general</button>
        <button className='btn-small seis'>corregido-septiem-especifica</button>
        <button className='btn-small siete'>no-corregido-septiem-general</button>
        <button className='btn-small ocho'>no-corregido-septiem-general</button>
      </div>
    </div>
  )
}

export default Elegir

