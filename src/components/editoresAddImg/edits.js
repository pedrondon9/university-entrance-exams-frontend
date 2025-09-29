import React, { useState, useContext, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import parse from 'html-react-parser';
import { DATA_APP_CONTEXT } from '../../contexts/constantesVar';
import AppContext from '../../contexts/ServiceContext';
import { ScaleLoader, PulseLoader } from "react-spinners";
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi'
import "./editAddImage.css"
import "./edit.css"




//import "react-quill/dist/quill.bubble.css"

function Editors() {

    const quillRef = useRef(null);

    const { dispatch, AddComent, dataApp, axiosConfigs, GetDataComent } = useContext(AppContext)
    const [value, setValue] = useState("");
    const [spinner, setSpinner] = useState(false)
    const [imagen2, setImagen2] = useState('')
    const [imagen3, setImagen3] = useState('')
    const [imagen4, setImagen4] = useState('')


    const imageHandler = () => {
        try {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {

                const file = await resizeImg(input.files[0]);

                console.log(file, 'file resize')

                console.log(`${(file.size / 1024).toFixed(2)} KB`);

                console.log(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);

                if (file) {

                    // Aquí puedes comprimir/redimensionar antes de subir
                    const formData = new FormData();

                    formData.append("imagen1", file)

                    const data = await axiosConfigs.post(`/customer/upload_imgs`, formData, { headers: { "Content-Type": "multipart/form-data" } })

                    if (data.data.success) {
                        console.log(data, 'data imagen subida')

                        const quill = quillRef.current.getEditor();
                        const range = quill.getSelection();

                        quill.insertEmbed(range.index, "image", data.data.url);

                    } else {

                    }
                }


            };

        } catch (error) {

            console.log(error)

        }
    };


    // Función de compresión con canvas

    const resizeImg = (file) => {
        const WIDTH = 600; // ancho 
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (event) => {
                const img_url = event.target.result;
                const image = new Image();

                image.src = img_url;

                image.onload = async (e) => {
                    try {
                        // Crear canvas
                        const canvas = document.createElement("canvas");
                        const ratio = WIDTH / e.target.width;

                        canvas.width = WIDTH;
                        canvas.height = e.target.height * ratio;

                        const context = canvas.getContext("2d");
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);

                        // Obtener base64 comprimido
                        const new_img_url = canvas.toDataURL("image/png", 0.9);

                        // Convertir a blob
                        const img_fetch = await fetch(new_img_url);
                        const blob = await img_fetch.blob();

                        resolve(blob); // devolver la imagen comprimida
                    } catch (err) {
                        reject(err);
                    }
                };

                image.onerror = reject;
            };

            reader.onerror = reject;
        });
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["image"],
            ],
            handlers: {
                image: imageHandler,
            },
        },
    }), []);


    const handleChange = () => {
        if (!quillRef.current) return;
        const quill = quillRef.current.getEditor(); // instancia real
        const html = quill.root.innerHTML;
        setValue(html);

    };

    const Add = async () => {
        if (dataApp.EXAMEN_ID) {
            if (value) {

                setSpinner(true)
                const fs = new FormData()
                fs.append("content", value)
                fs.append("userId", dataApp.USER_ID)
                fs.append("examenId", dataApp.EXAMEN_ID)
                fs.append("parentId", JSON.stringify(null))

                try {
                    const add = await axiosConfigs.post(`/customer/auth/add_coment_resp`, fs, { headers: { "Content-Type": "multipart/form-data" } })
                    if (add.data.success) {
                        GetDataComent(dataApp.EXAMEN_ID)//volver a cargar comentarios
                        var toastHTML = '<span className = "text-red">' + add.data.message + '</span>';
                        M.toast({ html: toastHTML });
                        setValue("")
                    } else {
                        var toastHTML = '<span className = "text-red">' + add.data.message + '</span>';
                        M.toast({ html: toastHTML });

                    }
                } catch (error) {

                } finally {

                    setSpinner(false)

                }

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
            type: DATA_APP_CONTEXT,
            payload: { 'ERROR_USER': false }
        })
    }


    return (
        <div className='card edit-container' style={{
            border: "2px solid #333",
        }}>
            <ReactQuill
                ref={quillRef}

                modules={modules}
                theme="snow"
                value={value}
                onChange={handleChange}
                placeholder="Escribe algo aquí..."
                style={{
                    borderRadius: "5px",
                }}
            />

            <div className='containerButtonAddComment'>
                {dataApp.VALIDAR_USER ?
                    <Link
                        to="#!"
                        onClick={() => {
                            Add();
                        }} className='btn-small addCommentseButton' >{!spinner ? "Comentar" : <PulseLoader size={9} color="#212121" />}
                    </Link>
                    :
                    <Link to="#!" onClick={() => { LimpiarError() }} className='btn-small boton-edit  modal-trigger' data-target="modal1">Publicar duda</Link>
                }

            </div>
        </div>
    );
}

export default Editors