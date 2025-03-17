import { useState, useEffect, useContext } from 'react'
import React from 'react'
import "./formUpload.css"
import AppContext from '../../contexts/ServiceContext'
import { PDF_VIEW_FORM, URL_SERVER } from '../../contexts/constantesVar'
import PdfForm from '../pdfForm/pdfForm'
import M from 'materialize-css'
import { ScaleLoader } from "react-spinners";
import axios from 'axios'
import Login from '../login/login'


//FORMULARIO PARA SUBIR UN NUEVO  EXAMEN


function FormUpload() {
    const { dispatch, userId, userName, userLinkPhoto, validarUser } = useContext(AppContext)
    const [pdf, setPdf] = useState("")
    const [año, setAño] = useState("")
    const [mes, setMes] = useState("")
    const [face, setFace] = useState("")
    const [estado, setEstado] = useState("")
    const [materia, setMateria] = useState("")
    const [addSpìnner, setAddSpìnner] = useState(false)

    //funcion para obtener el pdf y leerlo
    const PdfFile = (e) => {
        setPdf(e.target.files[0])//guardar el pdf en la variable pdf
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = (e) => {
            //insertar o cambiar el pdf que se muestra
            dispatch({
                type: PDF_VIEW_FORM,
                payload: e.target.result
            })
        }
    }


    //funcion para agregar un nuevo examen
    const EnviarDatos = async (e) => {
        e.preventDefault()

        if (materia && año && mes && face && pdf && estado) {
            //console.log(materia, año, mes, face, pdf ,estado)

            setAddSpìnner(true)//para mostrar una animacion durate se agrega el nueva examen


            try {
                const fs = new FormData()
                fs.append("userName", userName)
                fs.append("userId", userId)
                fs.append("userPhoto", userLinkPhoto)
                fs.append("mes", mes)
                fs.append("año", año)
                fs.append("estado", estado)
                fs.append("face", face)
                fs.append("materia", materia)
                fs.append("pdf", pdf)

                const add = await axios.post(`${URL_SERVER}/addExamen`, fs)
                if (add.data === "publicado") {

                    var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                    M.toast({ html: toastHTML });
                    setAddSpìnner(false)
                } else {
                    var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                    M.toast({ html: toastHTML });
                    setAddSpìnner(false)
                }
            } catch (error) {
                setAddSpìnner(false)
            }
        } else {
            var toastHTML = '<span className = "text-red">' + "todos los campos son requeridos" + '</span>';
            M.toast({ html: toastHTML });
        }
    }

    useEffect(() => {

    }, [pdf])
    return (
        <div className='form-conatainer'>
            <Login />
            <div className='form-conatainer-resp'>
                <form id='form-upload-pdf' onSubmit={(e) => { EnviarDatos(e) }}>


                    <div className="file-select btn foto-principal" id="src-file1" >
                        <input className="input-count aa" type="file" name="src-file1" aria-label="Archivo"
                            onChange={e => {
                                if (e.target.files) {
                                    PdfFile(e);//llamando a la funcion para agregar pdf
                                } else {

                                }
                            }
                            }
                        />
                    </div>


                    {pdf ?
                        <>
                            <div className='pdf-form-container-mobil'><PdfForm /></div>
                            <div className="input-field">
                                <select className="browser-default form-upload-select" id="materia"
                                    onChange={(e) => {

                                        if (e.target.value) {
                                            setMateria(e.target.value)
                                            document.getElementById("materia").style.borderColor = "#4AC958"
                                        } else {
                                            setMateria("")
                                            document.getElementById("materia").style.borderColor = "red"

                                        }
                                    }} >
                                    <option disabled selected>Elige la materia</option>
                                    <option value="lengua y literatura española" >lengua y literatura española</option>
                                    <option value="frances" >Frances</option>
                                    <option value="ingles" >Ingles</option>
                                    <option value="historia de africa y de G.E" >historia de Africa y de G.E</option>
                                    <option value="matematicas II" >Matematicas II</option>
                                    <option value="Electrotecnia" >Electrotecnia</option>
                                    <option value="Tecnología industrial" >Tecnología industrial</option>
                                    <option value="Química" >Química</option>
                                    <option value="Física" >Física</option>
                                    <option value="Geologia" >Geologia</option>
                                    <option value="Dibujo técnico II" >Dibujo técnico II</option>
                                    <option value="Economía de la Empresa" >Economía de la Empresa</option>
                                    <option value="Ciencias de la tierra y m.a" >Ciencias de la tierra y m.a</option>
                                    <option value="Biología" >Biología</option>
                                    <option value="Ciencias de la nat. y salud" >Ciencias de la nat. y salud</option>
                                    <option value="Historia del mundo actual" >Historia del mundo actual</option>
                                    <option value="Historia de la filosofía" >Historia de la filosofía</option>
                                    <option value="Griego" >Griego</option>
                                    <option value="Latín" >Latín</option>
                                    <option value="Historia del Arte" >Historia del Arte</option>
                                    <option value="Geografía de los grandes espacios" >Geografía de los grandes espacios</option>
                                    <option value="Matemáticas Aplicadas a las C.S II" >Matemáticas Aplicadas a las C.S II</option>
                                </select>
                            </div>

                            <div className="input-field">
                                <select className="browser-default form-upload-select" id="año"
                                    onChange={(e) => {

                                        if (e.target.value) {
                                            setAño(e.target.value)
                                            document.getElementById("año").style.borderColor = "#4AC958"
                                        } else {
                                            setAño("")
                                            document.getElementById("año").style.borderColor = "red"

                                        }
                                    }} >
                                    <option disabled selected>Elige el año</option>
                                    <option value="2022" >2022</option>
                                    <option value="2021" >2021</option>
                                    <option value="2020" >2020</option>
                                    <option value="2019" >2019</option>
                                    <option value="2018" >2018</option>
                                    <option value="2017" >2017</option>
                                    <option value="2016" >2016</option>
                                    <option value="2015" >2015</option>
                                    <option value="2014" >2014</option>
                                    <option value="2013" >2013</option>
                                    <option value="2012" >2012</option>
                                    <option value="2011" >2011</option>
                                    <option value="2010" >2010</option>
                                </select>
                            </div>

                            <div className="input-field">
                                <select className="browser-default form-upload-select" id="mes"
                                    onChange={(e) => {

                                        if (e.target.value) {
                                            setMes(e.target.value)
                                            document.getElementById("mes").style.borderColor = "#4AC958"
                                        } else {
                                            setMes("")
                                            document.getElementById("mes").style.borderColor = "red"

                                        }
                                    }} >
                                    <option disabled selected>Elige el mes</option>
                                    <option value="junio" >Junio</option>
                                    <option value="septiembre" >Septiembre</option>

                                </select>
                            </div>

                            <div className="input-field">
                                <select className="browser-default form-upload-select" id="estado"
                                    onChange={(e) => {

                                        if (e.target.value) {
                                            setEstado(e.target.value)
                                            document.getElementById("estado").style.borderColor = "#4AC958"
                                        } else {
                                            setEstado("")
                                            document.getElementById("estado").style.borderColor = "red"

                                        }
                                    }} >
                                    <option disabled selected>Estado</option>
                                    <option value="corregido" >corregido</option>
                                    <option value="no_corregido" >no corregido</option>

                                </select>
                            </div>

                            <div className="input-field">
                                <select className="browser-default form-upload-select" id="face"
                                    onChange={(e) => {

                                        if (e.target.value) {
                                            setFace(e.target.value)
                                            document.getElementById("face").style.borderColor = "#4AC958"
                                        } else {
                                            setFace("")
                                            document.getElementById("face").style.borderColor = "red"

                                        }
                                    }} >
                                    <option disabled selected>Elige la face</option>
                                    <option value="especifica" >Especifica</option>
                                    <option value="general" >General</option>

                                </select>
                            </div>
                        </>
                        :
                        <></>
                    }

                    <div className='boton-submit-container'>
                        {validarUser ?
                            <>
                                {true?
                                    <button className='btn-small' type='submit'>{addSpìnner ? <ScaleLoader size={20} /> : "compartir el examen"}</button>
                                    :
                                    <></>
                                }
                            </>
                            :
                            <button className='btn-small modal-trigger' data-target="modal1" >compartir el examen</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormUpload