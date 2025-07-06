
import React, { useContext } from 'react'
import { LocalizationMap, Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';

//cambiar la lengua del pdf_view
import es_ES from '../../locales/lib/es_ES.json';

import "./verPdf.css"
import AppContext from '../../contexts/ServiceContext';

// parametros del pdf
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { getFilePlugin } from '@react-pdf-viewer/get-file';

// Importar estilos del pdf
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';



function VerPdf() {
  const { dataApp } = useContext(AppContext)
  const defaultLayoutPluginInstance = defaultLayoutPlugin({});

  return (
    <>
      {
        dataApp.URL_PDF ?
          <div className='pdf-conatainer'>

            < div className='pdf-container-resp' >
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js'>
                <Viewer
                  localization={es_ES}
                  fileUrl={dataApp.URL_PDF}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div >
          </div >
          :
          <>
          </>
      }
    </>
  )
}

export default VerPdf
