import React, { useEffect, useState, useContext } from 'react'
import M from "materialize-css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./menuLateral.css"
import AppContext from '../../contexts/ServiceContext'
import { DATA_APP_CONTEXT } from '../../contexts/constantesVar'
import { ScaleLoader, MoonLoader, PulseLoader } from "react-spinners";


function MenuLaterals() {
    const { dispatch, AddComent, GetDataComent, spinnerCargarExamenes, examenList } = useContext(AppContext)

    const [addSpìnner, setAddSpìnner] = useState(false)
    const [changeExam, setChangeExam] = useState(false)
    const [id, setId] = useState(false)
    const [año, setAño] = useState(false)
    const [pdfLink, setPdfLink] = useState(false)



    /********* cambiar pdf ***************** */
    const CambiarPdf = (pdf, id) => {

        console.log(id, 'y id')
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: {
                URL_PDF: pdf,
                EXAMEN_ID: id
            }
        })

        //ejecutar la funcion que trae los cpmentarios del nuevo examen
        GetDataComent(id)


    }

    useEffect(() => {
        const all = document.querySelector(".sidenav")
        M.Sidenav.init(all, {})

        // iniciar collapsable
        const collap = document.querySelector('.menu-lateral-pg')
        M.Collapsible.init(collap, {
            preventScrolling: false,
            inDuration: 150,
            // accordion: false,
            // expandable: true
        })


        const collaps = document.querySelector('.menu-lateral-pgs')
        M.Collapsible.init(collaps, {
            preventScrolling: false,
            inDuration: 150,
        })
    }, [])
    return (


        <ul className="collapsible menu-lateral-pg">
            {examenList?.map((i, x) =>//recorrer el array de materia y dentro de este se encuaentra el array de los años de convocatoria
                <li key={i._id}>
                    <div className="collapsible-header menu-lateral-pg-cat"><span>{i.name} ({i.cantitie})</span></div>
                    <div className='collapsible-body menu-lateral-colapsible-body' >
                        <ul className="collection">
                            {i.examenUploadId?.map((a, b) =>//recorrer el array de años y dentro de este se encuentra los examenes segun su face , mes , estado"corregido o no" etc
                                <div key={a.year}>
                                    <li className="collection-item" onClick={() => { setAño(a.year); setId(i._id) }}>{a.year} ({i.cantitie})</li>
                                    {a.exams.map((x, y) =>//recorrer los examenes
                                        <div key={y.toString()}>
                                            {a.year === año && i._id === id ?
                                                <ul className="collection">
                                                    <li onClick={() => { CambiarPdf(x.pdfLink, x._id) }} className="collection-item verExamen">{x.mes + " " + x.face + " " + x.estado}</li>
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


        </ul>

    )
}

export default MenuLaterals