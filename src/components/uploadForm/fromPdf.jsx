import React from 'react'
import FormUpload from './formUpload'
import "./fromPdf.css"
import PdfForm from '../pdfForm/pdfForm'

//COMPONENTE QUE CONTIENE EL FORMULARIO QUE PERMITE SUBIR UN NUEVO EXAMEN Y TAMBIEN EL PDF_VIEW QUE PREVISUALIZA EL PDF DEL EXAMEN ELEGIDO
function FromPdf() {
  return (
    <div className='form-upload-pdf-view-cpntainer'>
        <div className='form-upload-pdf-view-cpntainer-resp'>
            <div className='form-pload-container'>¨
                {/* formulario */}
                <FormUpload/>
            </div>
            <div className='pdf-view-form'>
              <div className='pdf-view-form-resp'>
                {/* previsualizacion del pdf del examen */}
                <PdfForm/>
              </div>
              
            </div>
        </div>
    </div>
  )
}

export default FromPdf