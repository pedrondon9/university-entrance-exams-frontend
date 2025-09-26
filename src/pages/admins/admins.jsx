import React, { useEffect, useState, useContext } from 'react'
import M from "materialize-css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import AppContext from '../../contexts/ServiceContext'
import { EXAMEN_ID, SPINNER_CARGAR_EXAMENES, URL_PDF, URL_SERVER } from '../../contexts/constantesVar'
import { ScaleLoader, MoonLoader, PulseLoader } from "react-spinners";
import "./admins.css"
import BarradeNavegacion from '../../components/navegacionBarAll/barradeNavegacion'
import Login from '../../components/login.register/login.regsiter'

function Admins() {
    const { dispatch, AddComent, GetDataComent, spinnerCargarExamenes, dataApp, axiosConfigs } = useContext(AppContext)
    const [spìnner, setSpìnner] = useState(false)
    const [changeExam, setChangeExam] = useState(false)
    const [examenList, setExamenList] = useState([])
    const [borrarSpìnner, setBorrarSpìnner] = useState(false)
    const [id, setId] = useState(false)
    const [año, setAño] = useState(false)
    const [pdfLink, setPdfLink] = useState(false)


    //funcion para cargar los array de los examenes

    const LoadListExam = async () => {

        try {
            setSpìnner(true)
            const add = await axiosConfigs.get(`/customer/auth/get_exams_upload_iduser/${dataApp.USER_ID}`)
            //const add = await axiosConfigs.get(`/customer/getExamenList`)
            if (add.data.success) {
                setExamenList(add.data.response)
                //setAddSpìnner(false)
            } else {
                setExamenList([])
                //setAddSpìnner(false)
            }
        } catch (error) {
            setExamenList([])
            //setAddSpìnner(false)
        } finally {
            setSpìnner(false)
        }

    }

    const DeleteExam = async (id, año, mes, estado, face) => {
        //console.log(id,año,mes,estado,face)
        const confirmar = window.confirm("Seguro que quieres borrar este examen")
        //console.log(confirmar)
        if (confirmar) {
            try {
                const borrar = await axios({
                    method: "post",
                    data: { "id": id, "año": año, "mes": mes, "estado": estado, "face": face },
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
            <Login />

            <div className='conatainer-admin' style={{ display: "flex", justifyContent: "center" }}>
                <div className='conatainer-admin-resp' style={{ maxWidth: "1000px", width: "100%" }}>
                    <div style={{ marginTop: "90px" }}>
                        <h3 >Tus examnes subidos </h3>
                    </div>
                    <ul className="collapsible collection-delete">

                        {!spìnner ?
                            <>
                                {examenList.map((i, x) =>//recorrer el array de materia y dentro de este se encuaentra el array de los años de convocatoria
                                    <li key={i._id}>
                                        <div className="collapsible-header menu-lateral-pg-cat"><span>{i.name} ({i.cantitie})</span></div>
                                        <div className='collapsible-body menu-lateral-colapsible-body' >
                                            <ul className="collection">
                                                {i.examenUploadId.map((a, b) =>//recorrer el array de años y dentro de este se encuentra los examenes segun su face , mes , estado"corregido o no" etc
                                                    <div key={a.year}>
                                                        <li className="collection-item" onClick={() => { setAño(a.year); setId(i._id) }}>{a.year} ({a.cantitie})</li>
                                                        {a.exams.map((x, y) =>//recorrer los examenes
                                                            <div key={y.toString()}>
                                                                {a.year === año && i._id === id ?
                                                                    <ul className="collection">
                                                                        <li className="collection-item verExamen">{x.mes + " " + x.face + " " + x.estado}
                                                                            <button
                                                                                className='btn-small boton-borrar'
                                                                                onClick={() => { DeleteExam(i._id, a.year, x.mes, x.estado, x.face) }}
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

                            </>

                            :

                            <div style={{ marginTop: "50px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                <MoonLoader size={35} color={"#212121"} />
                                <p>Cargando archivos ...</p>
                            </div>

                        }
                    </ul>


                </div>
            </div>


        </div>
    )
}


export default Admins