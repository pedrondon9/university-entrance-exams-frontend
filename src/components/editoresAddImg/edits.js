import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import { DATA_RICHE_TEXT, ERROR_USER } from '../../contexts/constantesVar';
import AppContext from '../../contexts/ServiceContext';
import { ScaleLoader, PulseLoader } from "react-spinners";
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi'
import "./editAddImage.css"




//import "react-quill/dist/quill.bubble.css"

function Editors() {
    const { dispatch, AddComent, userId, userName, userLinkPhoto, examId, spinnerAddComment, validarUser } = useContext(AppContext)
    const [value, setValue] = useState('');
    const [imagen1, setImagen1] = useState('')
    const [imagen2, setImagen2] = useState('')
    const [imagen3, setImagen3] = useState('')
    const [imagen4, setImagen4] = useState('')
    const [preview1, setPreview1] = useState("");
    const [preview2, setPreview2] = useState("");
    const [preview3, setPreview3] = useState("");
    const [preview4, setPreview4] = useState("");
    const WIDTH = 600
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }/*, { font: [] }*/],
            /*[{ size: [] }],*/
            [/*'bold', */'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [
                { list: 'ordered' },
                { list: 'bullet' }
                /*{ indent: '-1' },
                { indent: '+1' },*/
            ],

            [/*'link', 'image', 'video'*/]
            /*['clean'],*/
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }

    const Add = () => {
        if (examId) {
            console.log(examId)
            if (value || imagen1) {
                AddComent(value, userName, userLinkPhoto, userId, "1", examId, imagen1, imagen2, imagen3, imagen4)
                setValue("")
                LimpiarImagenes1()
            } else {
                var toastHTML = '<span >' + "No se permite campos vacios" + '</span>';
                M.toast({ html: toastHTML });
            }

        } else {
            var toastHTML = '<span >' + "por favor selecciona una materia" + '</span>';
            M.toast({ html: toastHTML });
        }

    }
    const LimpiarError = () => {
        //limpiar el error anterior
        dispatch({
            type: ERROR_USER,
            payload: false
        })
    }
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        /*'link',*/
        "color",
        "background",
        /*'image',
        "video"*/
    ]
    const ObtenerImagenesInput = (e) => {
        //console.log(e.target.files[0])


        for (let i = 0; i < e.length; i++) {
            if (e[i]) {
                const jpG = e[i].name.split(".")[e[i].name.split(".").length - 1] == "jpg"
                const pnG = e[i].name.split(".")[e[i].name.split(".").length - 1] == "png"
                const jpeG = e[i].name.split(".")[e[i].name.split(".").length - 1] == "jpeg"

                if (jpG || pnG || jpeG) {
                    const reader = new FileReader()
                    reader.readAsDataURL(e[i])
                    reader.onload = (event) => {
                        let img_url = event.target.result
                        //console.log(img_url)
                        let image = document.createElement("img")
                        image.src = img_url
                        image.onload = async (e) => {
                            //COMENZANDO CON LA REDUCCION DEL TAMAÑO DEL IMAGEN
                            let canvas = document.createElement("canvas")
                            let ratio = WIDTH / e.target.width
                            canvas.width = WIDTH
                            canvas.height = e.target.height * ratio
                            //crear objeto canvas 
                            const context = canvas.getContext("2d")
                            context.drawImage(image, 0, 0, canvas.width, canvas.height)
                            let new_img_url = context.canvas.toDataURL("image/png", 100)//obtencion del imagen en base64
                            //console.log(new_img_url)


                            //VOLVER A CONVERTIR LA IMAGEN EN FORMATO BLOB ES DECIR PASMOS DE "base64 ----> blob" 
                            const img_fetch = await fetch(`data:image/png;base64,${new_img_url.split(",")[1]}`)
                            const img_convert_to_blob = await img_fetch.blob("image/png")

                            if (i === 0) {
                                setImagen1(img_convert_to_blob)
                                setPreview1(new_img_url)
                            }
                            if (i === 1) {
                                setImagen2(img_convert_to_blob)
                                setPreview2(new_img_url)
                            }
                            if (i === 2) {
                                setImagen3(img_convert_to_blob)
                                setPreview3(new_img_url)
                            }
                            if (i === 3) {
                                setImagen4(img_convert_to_blob)
                                setPreview4(new_img_url)
                            }

                        }
                    }
                } else {
                    if (i === 0) {
                        setImagen1(null)
                        setPreview1(null)
                    }
                    if (i === 1) {
                        setImagen2(null)
                        setPreview2(null)
                    }
                    if (i === 2) {
                        setImagen3(null)
                        setPreview3(null)
                    }
                    if (i === 3) {
                        setImagen4(null)
                        setPreview4(null)
                    }
                }
            } else {
            }
        }
        if (e.length < 2) {
            setImagen2(null)
            setPreview2(null)
            setImagen3(null)
            setPreview3(null)
            setImagen4(null)
            setPreview4(null)
        }
        if (e.length < 3) {
            setImagen3(null)
            setPreview3(null)
            setImagen4(null)
            setPreview4(null)
        }
        if (e.length < 4) {
            setImagen4(null)
            setPreview4(null)
        }
        /*
        if (e[0]) {
            const jpG = e[0].name.split(".")[e[0].name.split(".").length - 1] == "jpg"
            const pnG = e[0].name.split(".")[e[0].name.split(".").length - 1] == "png"
            const jpeG = e[0].name.split(".")[e[0].name.split(".").length - 1] == "jpeg"

            if (jpG || pnG || jpeG) {
                const reader = new FileReader()
                reader.readAsDataURL(e[0])
                reader.onload = (event) => {
                    let img_url = event.target.result
                    //console.log(img_url)
                    let image = document.createElement("img")
                    image.src = img_url
                    image.onload = async (e) => {
                        //COMENZANDO CON LA REDUCCION DEL TAMAÑO DEL IMAGEN
                        let canvas = document.createElement("canvas")
                        let ratio = WIDTH / e.target.width
                        canvas.width = WIDTH
                        canvas.height = e.target.height * ratio
                        //crear objeto canvas 
                        const context = canvas.getContext("2d")
                        context.drawImage(image, 0, 0, canvas.width, canvas.height)
                        let new_img_url = context.canvas.toDataURL("image/png", 100)//obtencion del imagen en base64
                        //console.log(new_img_url)


                        //VOLVER A CONVERTIR LA IMAGEN EN FORMATO BLOB ES DECIR PASMOS DE "base64 ----> blob" 
                        const img_fetch = await fetch(`data:image/png;base64,${new_img_url.split(",")[1]}`)
                        const img_convert_to_blob = await img_fetch.blob("image/png")

                        setImagen1(img_convert_to_blob)
                        //console.log(img_convert_to_blob)

                    }
                }
            } else {
                setImagen1(null)
            }
        } else {
            setImagen1(null)
        }
        if (e[1]) {
            setImagen2(e[1])
            //PrevisualizarImage2(e.target.files[1])
        } else {
            setImagen2(null)
        }
        if (e[2]) {
            setImagen3(e[2])
            //PrevisualizarImage3(e.target.files[2])
        } else {
            setImagen3(null)
        }
        if (e[3]) {
            setImagen4(e[3])
            //PrevisualizarImage4(e.target.files[3])
        } else {
            setImagen4(null)
        }
        */
    }

    const LimpiarImagenes1 = () => {
        setImagen1(null)
        setPreview1(null)
        setImagen2(null)
        setPreview2(null)
        setImagen3(null)
        setPreview3(null)
        setImagen4(null)
        setPreview4(null)
    }
    return (
        <div>
            <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={setValue} />
            <div>
                <div className='subir-imagenes-agencia-lista-1'>
                    {imagen1 ?
                        <img src={preview1} />
                        :
                        <></>
                    }
                    {imagen2 ?
                        <img src={preview2} />
                        :
                        <></>
                    }
                    {imagen3 ?
                        <img src={preview3} />
                        :
                        <></>
                    }
                    {imagen4 ?
                        <img src={preview4} />
                        :
                        <></>
                    }
                </div>
            </div>
            <div className='conatainer-seleccionar-imagenes-input'>
                <div className='selecionar-imagenes-agencia-1'>
                    <Link to="#" id='seleccionar' onClick={() => document.getElementById("input-imagenes-agencia").click()}>
                        <FiCamera color='darkgray' size={40} />
                        <p>click para añadir imagenes</p>
                    </Link>
                </div>
                <input type="file" multiple style={{ display: "none" }} id='input-imagenes-agencia' onChange={(e) => { ObtenerImagenesInput(e.target.files) }} />
            </div>
            <div className='containerButtonAddComment'>
                {validarUser ?
                    <Link
                        to="#!"
                        onClick={() => {
                            Add();
                            // dispatch({
                            //     type: DATA_RICHE_TEXT,
                            //     payload: value
                            // })
                            // console.log(value)
                        }} className='btn-small addCommentseButton' >{!spinnerAddComment ? "Publicar" : <PulseLoader size={9} color="#212121" />}
                    </Link>
                    :
                    <Link to="#!" onClick={() => { LimpiarError() }} className='btn-small addCommentseButton modal-trigger' data-target="modal1">Publicar</Link>
                }

            </div>
        </div>
    );
}

export default Editors