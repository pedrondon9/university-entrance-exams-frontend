import React, { useContext, useEffect } from 'react'
import { LocalizationMap, Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';

//cambiar la lengua del pdf_view
import es_ES from '../../locales/lib/es_ES.json';

import "./pdfForm.css"
import AppContext from '../../contexts/ServiceContext';

// parametros del pdf
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { getFilePlugin } from '@react-pdf-viewer/get-file';

// Importar estilos del pdf
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

//PDF_VIEW QUE PERMITE VISUALIZAR EL PDF DEL EXAMEN ELEGIDO

function PdfForm() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({});

  const { formPdfView } = useContext(AppContext)


  const getFilePluginInstance = getFilePlugin();

  useEffect(() => {
  }, [])
  return (
    <div className='pdf-form-conatainer'>

      <div className='pdf-form-container-resp'>
        {formPdfView ?
        //el pdf_view
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
            <Viewer
              localization={es_ES}
              fileUrl={formPdfView}

            />
          </Worker>
          :
          //el componente que se va a visualizar si todavia no se a elegido un pdf o examen
          <div className='form-pdf-foto'>
            <img src={"https://res.cloudinary.com/mumbex/image/upload/v1669272888/f_bluove.jpg"} alt="" />

          </div>
        }
      </div>
    </div>
  )
}

export default PdfForm