import React, { useEffect, useState, useContext } from 'react'
import M from "materialize-css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./menuLateral.css"
import AppContext from '../../contexts/ServiceContext'
import { EXAMEN_ID, SPINNER_CARGAR_EXAMENES, URL_PDF, URL_SERVER } from '../../contexts/constantesVar'
import { ScaleLoader, MoonLoader, PulseLoader } from "react-spinners";


function MenuLaterals() {
    const { dispatch, AddComent, GetDataComent, spinnerCargarExamenes ,examenList} = useContext(AppContext)
    const [addSpìnner, setAddSpìnner] = useState(false)
    const [changeExam, setChangeExam] = useState(false)
    const [id, setId] = useState(false)
    const [año, setAño] = useState(false)
    const [pdfLink, setPdfLink] = useState(false)


    //funcion para cargar los array de los examenes
    /*
    const LoadListExam = async () => {
        dispatch({
            type: SPINNER_CARGAR_EXAMENES,
            payload: true

        })
        //setAddSpìnner(true)
        try {
            const add = await axios.get(`${URL_SERVER}/getExamenList`)
            if (add.data) {
                console.log(add.data)
                setExamenList(add.data)
                //setAddSpìnner(false)
                dispatch({
                    type: SPINNER_CARGAR_EXAMENES,
                    payload: false
    
                })
            } else {
                setExamenList([])
                //setAddSpìnner(false)
                dispatch({
                    type: SPINNER_CARGAR_EXAMENES,
                    payload: false
    
                })
            }
        } catch (error) {
            setExamenList([])
            //setAddSpìnner(false)
            dispatch({
                type: SPINNER_CARGAR_EXAMENES,
                payload: false

            })
        }

    }
*/
    /********* cambiar pdf ***************** */
    const CambiarPdf = (pdf, id) => {
        dispatch({
            type: URL_PDF,
            payload: pdf
        })

        dispatch({
            type: EXAMEN_ID,
            payload: id
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
            {examenList.map((i, x) =>//recorrer el array de materia y dentro de este se encuaentra el array de los años de convocatoria
                <li key={i._id}>
                    <div className="collapsible-header menu-lateral-pg-cat"><span>{i.materia}</span></div>
                    <div className='collapsible-body menu-lateral-colapsible-body' >
                        <ul className="collection">
                            {i.info.map((a, b) =>//recorrer el array de años y dentro de este se encuentra los examenes segun su face , mes , estado"corregido o no" etc
                                <div key={a.año}>
                                    <li className="collection-item" onClick={() => { setAño(a.año); setId(i._id) }}>{a.año}</li>
                                    {a.info_año.map((x, y) =>//recorrer los examenes
                                        <div key={y.toString()}>
                                            {a.año === año && i._id === id ?
                                                <ul className="collection">
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


        </ul>

    )
}

export default MenuLaterals