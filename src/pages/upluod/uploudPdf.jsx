import React from 'react'
import "./uploudPdf.css"
import BarradeNavegacion from '../../components/navegacionBarAll/barradeNavegacion'
import FormUpload from '../../components/uploadForm/formUpload'
import FromPdf from '../../components/uploadForm/fromPdf'

const UploadPdf = () => {
  return (
    <div>
        <BarradeNavegacion/>
        <FromPdf/>
    </div>
  )
}

export default UploadPdf
