

//side nav de materiales (para seleccionar el examen)

import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../contexts/ServiceContext'
import M from 'materialize-css'
import "./sinavMat.css"
import { DATA_APP_CONTEXT } from '../../contexts/constantesVar'
import { PulseLoader } from 'react-spinners'


const SinavMat = () => {
    const { dispatch, AddComent, GetDataComent, spinnerCargarExamenes, examenList,dataApp } = useContext(AppContext)
    const [id, setId] = useState(false)
    const [año, setAño] = useState(false)
    



    /********* cambiar pdf ***************** */
    const CambiarPdf = (pdf, id) => {
        const elem = document.querySelector(".sideNavMat")
        var instance = M.Sidenav.getInstance(elem);
        instance.close()
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: {
                "URL_PDF":pdf,
                "EXAMEN_ID":id
            }
        })

       
        //ejecutar la funcion que trae los cpmentarios del nuevo examen
        GetDataComent(id)


    }


    useEffect(() => {
        const alls = document.querySelector(".sideNavMat")
        M.Sidenav.init(alls, {
            preventScrolling: false,
            inDuration: 150,
            edge: "right",
        })


        const collap = document.querySelector('.sideNavMat')

        M.Collapsible.init(collap, {
            preventScrolling: false,
            inDuration: 100,

        })

    }, [])

    return (
        <ul className="collapsible sidenav sideNavMat side-nav-materias" id="slide-out-nav-mat">
            {!dataApp.SPINNER_CARGAR_EXAMENES ?
                <>
                    {examenList.map((i, x) =>//recorrer el array de materia y dentro de este se encuaentra el array de los años de convocatoria

                        <li className='item-materia' key={i._id}>
                            <div className="collapsible-header menu-lateral-pg-cat side-nav-lat"><span>{i.materia}</span></div>
                            <div className='collapsible-body menu-lateral-colapsible-body' >
                                <ul className="collection">
                                    {i.info.map((a, b) =>//recorrer el array de años y dentro de este se encuentra los examenes segun su face , mes , estado"corregido o no" etc
                                        <div key={a.año}>
                                            <li className="collection-item item-anos" onClick={() => { setAño(a.año); setId(i._id) }}>{a.año}</li>
                                            {a.info_año.map((x, y) =>//recorrer los examenes
                                                <div key={y.toString()}>
                                                    {a.año === año && i._id === id ?
                                                        <ul className="collection" >
                                                            <li onClick={() => {
                                                                CambiarPdf(x.pdfLink, x.examenId)
                                                                window.scroll({
                                                                    left: 0,
                                                                    top: 0,
                                                                    behavior: 'smooth'
                                                                });
                                                            }} className="collection-item verExamen">{x.mes + " " + x.face + " " + x.estado}</li>
                                                        </ul>
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                            )}


                                        </div>


                                    )}
                                </ul>
                            </div>
                        </li>

                    )}
                </>
                :
                <div className='cargar-examenes-spinner-side-container'>
                    <div className='cargar-examenes-side-spinner'>
                        <PulseLoader size={15} color={"#212121"} />
                    </div>

                    <p>cargando examenes...</p>
                </div>
            }
        </ul>
    )
}

export default SinavMat

/*
        <ul className="collapsible sidenav sideNavMat side-nav-materias" id="slide-out-nav-mat">
            {!spinnerCargarExamenes ?
                <>
                    {examenList.map((i, x) =>//recorrer el array de materia y dentro de este se encuaentra el array de los años de convocatoria

                        <li className='item-materia' key={i._id}>
                            <div className="collapsible-header menu-lateral-pg-cat"><span>{i.materia}</span></div>
                            <div className='collapsible-body menu-lateral-colapsible-body' >
                                <ul className="collection">
                                    {i.info.map((a, b) =>//recorrer el array de años y dentro de este se encuentra los examenes segun su face , mes , estado"corregido o no" etc
                                        <div key={a.año}>
                                            <li className="collection-item" onClick={() => { setAño(a.año); setId(i._id) }}>{a.año}</li>
                                            {a.info_año.map((x, y) =>//recorrer los examenes
                                                <div key={y.toString()}>
                                                    {a.año === año && i._id === id ?
                                                        <ul className="collection" >
                                                            <li onClick={() => { CambiarPdf(x.pdfLink, x.examenId) }} className="collection-item verExamen">{x.mes + " " + x.face + " " + x.estado}</li>
                                                        </ul>
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                            )}


                                        </div>


                                    )}
                                </ul>
                            </div> 
                            </li>

                            )}
                        </>
                        :
                        <div className='cargar-examenes-spinner-side-container'>
                            <div className='cargar-examenes-side-spinner'>
                                <PulseLoader size={15} color={"#212121"} />
                            </div>
        
                            <p>cargando examenes...</p>
                        </div>
                    }
                </ul>



                */

