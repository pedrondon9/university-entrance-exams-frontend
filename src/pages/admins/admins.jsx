import React, { useEffect, useState, useContext } from 'react'
import M from "materialize-css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import AppContext from '../../contexts/ServiceContext'
import { EXAMEN_ID, SPINNER_CARGAR_EXAMENES, URL_PDF, URL_SERVER } from '../../contexts/constantesVar'
import { ScaleLoader, MoonLoader, PulseLoader } from "react-spinners";
import "./admins.css"
import BarradeNavegacion from '../../components/navegacionBarAll/barradeNavegacion'

function Admins() {
    const { dispatch, AddComent, GetDataComent, spinnerCargarExamenes } = useContext(AppContext)
    const [addSpìnner, setAddSpìnner] = useState(false)
    const [changeExam, setChangeExam] = useState(false)
    const [examenList, setExamenList] = useState([])
    const [borrarSpìnner, setBorrarSpìnner] = useState(false)
    const [id, setId] = useState(false)
    const [año, setAño] = useState(false)
    const [pdfLink, setPdfLink] = useState(false)


    //funcion para cargar los array de los examenes

    const LoadListExam = async () => {
        try {
            const add = await axios.get(`${URL_SERVER}/getExamenList`)
            if (add.data) {
                console.log(add.data)
                setExamenList(add.data)
                //setAddSpìnner(false)
            } else {
                setExamenList([])
                //setAddSpìnner(false)
            }
        } catch (error) {
            setExamenList([])
            //setAddSpìnner(false)
        }

    }

    const DeleteExam = async (id,año,mes,estado,face) => {
        //console.log(id,año,mes,estado,face)
        const confirmar = window.confirm("Seguro que quieres borrar este examen")
        //console.log(confirmar)
        if (confirmar) {
            try {
                const borrar = await axios({
                    method: "post",
                    data: {"id":id,"año":año,"mes":mes,"estado":estado,"face":face},
                    url: `${URL_SERVER}/deleteExam`
                })
                //console.log(borrar.data,"wwwwwwwwwwwwwwwwwwwwwww")
                if (borrar.data === "borrado") {
                    LoadListExam()
                    var toastHTML = '<span className = "text-red">' + borrar.data + '</span>';
                    M.toast({ html: toastHTML });
                    //setBorrarSpìnner(false)
                } else {
                    var toastHTML = '<span className = "text-red">' + borrar.data + '</span>';
                    M.toast({ html: toastHTML });
                }
            } catch (error) {
                //console.log(error)
                var toastHTML = '<span className = "text-red">' + "hay un problema !" + '</span>';
                M.toast({ html: toastHTML });
            }
        } else {

        }
    }
    useEffect(() => {
        LoadListExam()
        // iniciar collapsable
        const collap = document.querySelector('.collection-delete')
        M.Collapsible.init(collap, {
            preventScrolling: false,
            inDuration: 150,
            // accordion: false,
            // expandable: true
        })



    }, [])
    return (
        <div>
            <BarradeNavegacion />
            <ul className="collapsible collection-delete">
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
                                                        <li className="collection-item verExamen">{x.mes + " " + x.face + " " + x.estado}
                                                            <button
                                                                className='btn-small boton-borrar'
                                                                onClick={() => { DeleteExam(i._id,a.año,x.mes,x.estado,x.face) }}
                                                            >Borrar examen</button>
                                                        </li>
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
        </div>
    )
}


export default Admins