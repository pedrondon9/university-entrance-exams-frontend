import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import AppContext from '../contexts/ServiceContext';
import { PulseLoader } from 'react-spinners';
import { ERROR_USER } from '../contexts/constantesVar';
import { Link } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi'
import M from 'materialize-css';



function Editor2s({ comentId }) {
    const { validarUser, dispatch, GetDataComentResponse, AddComentResponse, userId, userName, userLinkPhoto, examId, spinnerAddCommentRespons,dataApp } = useContext(AppContext)
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

    const ObtenerImagenesInput = (e) => {
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

    }
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
        'link',
        "color",
        "background",
        'image',
        "video"
    ]

    const GetComResp = () => {
        if (value||imagen1) {
            AddComentResponse(value, dataApp.USER_NAME, dataApp.USER_LINK_PHOTO, dataApp.USER_ID, "2", comentId,imagen1,imagen2,imagen3,imagen4)
            LimpiarImagenes2()
            setValue("")
        } else {
            var toastHTML = '<span >' + "No se permite campos vacios" + '</span>';
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
    const LimpiarImagenes2 = () => {
        setImagen1(null)
        setPreview1(null)
        setImagen2(null)
        setPreview2(null)
        setImagen3(null)
        setPreview3(null)
        setImagen4(null)
        setPreview4(null)
    }
    useEffect(() => {

    }, [])
    return (
        <div>
            <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={setValue} />
            <div>
                <div className='subir-imagenes-agencia-lista-2'>
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
                <div className='selecionar-imagenes-agencia-2'>
                    <Link to="#" id='seleccionar' onClick={() => document.getElementById("input-imagenes-agencia1").click()}>
                        <FiCamera color='darkgray' size={40} />
                        <p>click para añadir imagenes</p>
                    </Link>
                </div>
                <input type="file" multiple style={{ display: "none" }} id='input-imagenes-agencia1' onChange={(e) => { ObtenerImagenesInput(e.target.files) }} />
            </div>
            <div className='containerButtonAddRespons'>
                {dataApp.VALIDAR_USER ?
                    <Link 
                    to={"#!"}
                    onClick={() => {
                        GetComResp();
                        // dispatch({
                        //     type: DATA_RICHE_TEXT,
                        //     payload: value
                        // })
                        // console.log(value)
                    }} className='btn-small addCommentseButton' >{!dataApp.ADD_COMMENT_RESPONSE_SPINNER ? "Publicar" : <PulseLoader size={9} color="#212121" />}
                    </Link>
                    :
                    <Link to={"#!"} onClick={() => { LimpiarError() }} className='btn-small addCommentseButton modal-trigger' data-target="modal1">Publicar</Link>
                }
                {/* <button onClick={() => { GetComResp() }} className='btn-small addResponseButton'>{!spinnerAddCommentRespons ? "Publicar tu respuesta" : <PulseLoader size={9} color="#212121" />}</button> */}
            </div>
        </div>
    );
}

export default Editor2s