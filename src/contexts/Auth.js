import React, { useReducer, useState } from "react"
import AppContext from "./ServiceContext";
import { InitialState } from './InitialState';
import AppReducer from "./AppReducer";
import axios from "axios";
import M from "materialize-css";

import { DATA_APP_CONTEXT, ADD_COMMENT_RESPONSE_SPINNER, ADD_COMMENT_SPINNER, ADD_RESPONSE_RESPONSE_SPINNER, CARGAR_COMMENT, CARGAR_RESPONSE_COMENT, CARGAR_RESPONSE_RESPONSE, ERROR_USER, LOGIN_SPINNER, PAGINA_SIGUIENTE, RESP_ERROR_LOGIN, SPINNER_CARGAR_EXAMENES, URL_SERVER, USER_ID, USER_NAME, VALIDAR_USER } from "./constantesVar";



export default (props) => {


    const [state, dispatch] = useReducer(AppReducer, InitialState);
    const [dataComentario, setDataComentario] = useState([])
    const [dataComentarioResps, setDataComentarioResps] = useState([])
    const [dataComentarioResp, setDataComentarioResp] = useState([])
    const [dataRespComentarioResp, setDataRespComentarioResp] = useState([])
    const [paginaNext, setPaginaNext] = useState("")
    const [comentRespId, setComentRespId] = useState("")
    const [idExamen, setIdExamen] = useState("")
    const [respComentRespId, setRespComentRespId] = useState("")
    const [more, setMore] = useState(false)
    const [examenList, setExamenList] = useState([])



    var datosGetComentResponse = []

    //funcion para obtener primeros comentrios o comentarios principales
    const GetDataComent = async (examenId) => {
        if (examenId) {
            setMore(true)
            //activar spinner de carga de comentarios
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "CARGAR_COMMENT": true }
            })
            try {

                if (paginaNext === "") {
                    const comments = await axios({
                        method: "GET",
                        data: { "examenId": examenId },
                        url: `${URL_SERVER}/getComent/${examenId}`
                    })
                    if (comments.data.docs) {
                        dispatch({
                            type: DATA_APP_CONTEXT,
                            payload: { "PAGINA_SIGUIENTE": comments.data.nextPage }
                        })
                        setPaginaNext(comments.data.nextPage)
                        setDataComentario(comments.data.docs)
                        dispatch({
                            type: DATA_APP_CONTEXT,
                            payload: { "CARGAR_COMMENT": false }
                        })
                    } else {
                        dispatch({
                            type: DATA_APP_CONTEXT,
                            payload: { "CARGAR_COMMENT": false }
                        })
                    }
                } else {
                    const comments = await axios({
                        method: "GET",
                        data: { "paginaNext": paginaNext, "examenId": "examenId" },
                        url: `${URL_SERVER}/getComent/${examenId}`
                    })
                    if (comments.data.docs) {
                        dispatch({
                            type: DATA_APP_CONTEXT,
                            payload: { "PAGINA_SIGUIENTE": comments.data.nextPage }
                        })
                        setPaginaNext(comments.data.nextPage)
                        setDataComentario(comments.data.docs)
                        dispatch({
                            type: DATA_APP_CONTEXT,
                            payload: { "CARGAR_COMMENT": false }
                        })
                    } else {
                        dispatch({
                            type: DATA_APP_CONTEXT,
                            payload: { "CARGAR_COMMENT": false }
                        })
                    }
                }



            } catch (error) {
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "CARGAR_COMMENT": false }
                })
            }
        } else {
            setDataComentario([])
        }

    }

    const GetDataComentAdd = async (examenId) => {
        setMore(true)
        console.log("WWWWWWWWWWWWWW", examenId)
        //activar spinner de carga de comentarios
        try {

            if (paginaNext == "") {
                const comments = await axios({
                    method: "GET",
                    data: { "examenId": examenId },
                    url: `${URL_SERVER}/getComent/${examenId}`
                })
                if (comments.data.docs) {
                    console.log(comments.data.docs)
                    dispatch({
                        type: DATA_APP_CONTEXT,
                        payload: { "PAGINA_SIGUIENTE": comments.data.nextPage }
                    })
                    setPaginaNext(comments.data.nextPage)
                    setDataComentario(comments.data.docs)

                } else {

                }
            } else {
                const comments = await axios({
                    method: "GET",
                    data: { "paginaNext": paginaNext, "examenId": "examenId" },
                    url: `${URL_SERVER}/getComent/${examenId}`
                })
                if (comments.data.docs) {
                    console.log(comments.data.docs)
                    dispatch({
                        type: DATA_APP_CONTEXT,
                        payload: { "PAGINA_SIGUIENTE": comments.data.nextPage }
                    })
                    setPaginaNext(comments.data.nextPage)
                    setDataComentario(comments.data.docs)

                } else {

                }
            }



        } catch (error) {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "CARGAR_COMMENT": false }
            })
        }
    }

    //funcion para obtener segundos comentrios o respuestas del primer comentario
    const GetDataComentResponse = async (comentId) => {
        console.log(comentId, "el id llega")
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { "CARGAR_RESPONSE_COMENT": true }
        })
        try {
            const comments = await axios({
                method: "GET",
                data: { "id": comentId },
                url: `${URL_SERVER}/getComentResp/${comentId}`
            })

            console.log(comments)



            if (comments.data.docs) {
                setComentRespId(comentId)
                console.log(comments.data.docs)
                setDataComentarioResp(comments.data.docs)
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "CARGAR_RESPONSE_COMENT": false }
                })
            } else {
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "CARGAR_RESPONSE_COMENT": false }

                })
            }
        } catch (error) {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "CARGAR_RESPONSE_COMENT": false }

            })
        }
    }

    const GetDataComentResponseAdd = async (comentId) => {
        console.log(comentId, "el id llega")

        try {
            const comments = await axios({
                method: "GET",
                data: { "id": comentId },
                url: `${URL_SERVER}/getComentResp/${comentId}`
            })

            console.log(comments)



            if (comments.data.docs) {
                setComentRespId(comentId)
                console.log(comments.data.docs)
                setDataComentarioResp(comments.data.docs)

            } else {

            }
        } catch (error) {

        }
    }

    //funcion para obtener terceros comentrios o respuestas del segundo comentario
    const GetDataRespComentResponse = async (comentId) => {
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: true
        })
        try {
            const comments = await axios({
                method: "GET",
                data: { "id": comentId },
                url: `${URL_SERVER}/getRespComentResp/${comentId}`
            })




            if (comments.data.docs) {
                setRespComentRespId(comentId)
                setDataRespComentarioResp(comments.data.docs)
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "CARGAR_RESPONSE_RESPONSE": false }

                })
            } else {
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "CARGAR_RESPONSE_RESPONSE": false }

                })
            }
        } catch (error) {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "CARGAR_RESPONSE_RESPONSE": false }

            })
        }
    }
    const GetDataRespComentResponseAdd = async (comentId) => {
        try {
            const comments = await axios({
                method: "GET",
                data: { "id": comentId },
                url: `${URL_SERVER}/getRespComentResp/${comentId}`
            })




            if (comments.data.docs) {
                setRespComentRespId(comentId)
                setDataRespComentarioResp(comments.data.docs)
            } else {

            }
        } catch (error) {

        }
    }


    //funcion para añadir primeros comentrios o comentarios principales
    const AddComent = async (coment, userName, userPhoto, userId, comentCategory, examenId, imagen1, imagen2, imagen3, imagen4) => {
        dispatch({
            type: ADD_COMMENT_SPINNER,
            payload: true
        })

        const fs = new FormData()
        fs.append("userName", userName)
        fs.append("userPhoto", userPhoto)
        fs.append("coment", coment)
        fs.append("userId", userId)
        fs.append("comentCategory", comentCategory)
        fs.append("examenId", examenId)
        fs.append("imagen1", imagen1)
        fs.append("imagen2", imagen2)
        fs.append("imagen3", imagen3)
        fs.append("imagen4", imagen4)
        try {
            const add = await axios.post(`${URL_SERVER}/addComent`, fs, { headers: { "Content-Type": "multipart/form-data" } })
            if (add.data == "publicado") {
                GetDataComentAdd(examenId)//volver a cargar comentarios
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "ADD_COMMENT_SPINNER": false }

                })
            } else {
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "ADD_COMMENT_SPINNER": false }

                })
            }
        } catch (error) {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "ADD_COMMENT_SPINNER": false }

            })
        }
    }

    //funcion para añadir  segundos comentrios o respuestas del primer comentario
    const AddComentResponse = async (coment, userName, userPhoto, userId, comentCategory, comentId, imagen1, imagen2, imagen3, imagen4) => {
        dispatch({
            type: ADD_COMMENT_RESPONSE_SPINNER,
            payload: true
        })
        const fs = new FormData()
        fs.append("userName", userName)
        fs.append("userPhoto", userPhoto)
        fs.append("coment", coment)
        fs.append("userId", userId)
        fs.append("comentCategory", comentCategory)
        fs.append("comentId", comentId)
        fs.append("imagen1", imagen1)
        fs.append("imagen2", imagen2)
        fs.append("imagen3", imagen3)
        fs.append("imagen4", imagen4)
        try {
            const add = await axios.post(`${URL_SERVER}/addComentResp`, fs, { headers: { "Content-Type": "multipart/form-data" } })
            if (add.data == "publicado") {
                GetDataComentResponseAdd(comentRespId)
                //comentRespId(comentRespId)
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "ADD_COMMENT_RESPONSE_SPINNER": false }

                })
            } else {
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "ADD_COMMENT_RESPONSE_SPINNER": false }

                })
            }
        } catch (error) {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "ADD_COMMENT_RESPONSE_SPINNER": false }

            })
        }
    }

    //funcion para añadir terceros comentrios o respuestas del segundo comentario
    const AddRespComentResponse = async (coment, userName, userPhoto, userId, comentCategory, comentId, imagen1, imagen2, imagen3, imagen4) => {
        dispatch({
            type: ADD_RESPONSE_RESPONSE_SPINNER,
            payload: true
        })
        const fs = new FormData()
        fs.append("userName", userName)
        fs.append("userPhoto", userPhoto)
        fs.append("coment", coment)
        fs.append("userId", userId)
        fs.append("comentCategory", comentCategory)
        fs.append("comentId", comentId)
        fs.append("imagen1", imagen1)
        fs.append("imagen2", imagen2)
        fs.append("imagen3", imagen3)
        fs.append("imagen4", imagen4)
        try {
            const add = await axios.post(`${URL_SERVER}/addRespComentResp`, fs, { headers: { "Content-Type": "multipart/form-data" } })
            if (add.data == "publicado") {
                GetDataRespComentResponseAdd(respComentRespId)
                //comentRespId(comentRespId)
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "ADD_RESPONSE_RESPONSE_SPINNER": false }

                })
            } else {
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "ADD_RESPONSE_RESPONSE_SPINNER": false }

                })
            }
        } catch (error) {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "ADD_RESPONSE_RESPONSE_SPINNER": false }

            })
        }
    }



    //funcion la paginacion de comentarios de tipo infinity scroll
    const ScrollInfinito = async (examenId) => {
        setMore(true)
        //activar spinner de carga de comentarios
        // dispatch({
        //     type: CARGAR_COMMENT,
        //     payload: true
        // })
        try {
            const comments = await axios({
                method: "POST",
                data: { "examenId": examenId, "paginaNext": paginaNext },
                url: `${URL_SERVER}/getComentInfinityScroll/${examenId}`
            })
            if (comments.data.docs) {

                if (paginaNext !== null) {
                    //console.log(comments.data.docs)
                    dispatch({
                        type: DATA_APP_CONTEXT,
                        payload: { "PAGINA_SIGUIENTE": comments.data.nextPage }

                    })
                    setDataComentario([...dataComentario, ...comments.data.docs])
                    setPaginaNext(comments.data.nextPage)

                    //console.log(comments.data.docs,"ffffffffffffffffffffffffff")
                    // dispatch({
                    //     type: CARGAR_COMMENT,
                    //     payload: false
                    // })
                    setMore(true)
                } else {
                    // dispatch({
                    //     type: CARGAR_COMMENT,
                    //     payload: false
                    // })
                    setMore(false)
                }
            } else {

            }


        } catch (error) {
            // dispatch({
            //     type: CARGAR_COMMENT,
            //     payload: false
            // })
            setMore(false)
        }
    }





    /***************** LOGIN PARA INICIO DE SESION *******************************/
    const Logins = async (email, contrasena) => {
        if (email !== "" && contrasena !== "") {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: {
                    "LOGIN_SPINNER": true,
                    "ERROR_USER": false,
                    "RESP_ERROR_LOGIN": "",

                }
            })

            try {
                const user = await axios({
                    method: "post",
                    data: { "email": email, "contrasena": contrasena },
                    url: `${URL_SERVER}/login_post`
                })
                if (user.data.code) {
                    console.log(user.data)
                    //window.sessionStorage.setItem("userInfo",user.data)
                    dispatch({
                        type: DATA_APP_CONTEXT,
                        payload: {
                            "LOGIN_SPINNER": false,
                            "ERROR_USER": true,
                            "RESP_ERROR_LOGIN": user.data.mens,
                            "VALIDAR_USER": true,
                            "USER_NAME": user.data.user,
                            "USER_ID": user.data.id


                        }
                    })

                    window.localStorage.setItem("code", user.data.code)

                    const elem = document.querySelector(".modal-form")
                    var instance = M.Modal.getInstance(elem);
                    instance.close()
                } else {
                    dispatch({
                        type: DATA_APP_CONTEXT,
                        payload: {
                            "LOGIN_SPINNER": false,
                            "ERROR_USER": true,
                            "RESP_ERROR_LOGIN": user.data.mens,
                            "VALIDAR_USER": false,
                            "USER_NAME": "",
                            "USER_ID": ""


                        }
                    })

                }

            } catch (error) {
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: {
                        "LOGIN_SPINNER": false,
                        "ERROR_USER": true,
                        "RESP_ERROR_LOGIN": error.response.data,

                    }
                })

            }
        } else {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: {
                    "ERROR_USER": true,
                    "RESP_ERROR_LOGIN": "Todos los campos son importantes"


                }
            })
        }

    }

    /****************************** FIN DEL LOGIN ************************************************** */



    /**** LOGIN PARA REGISTRO DE USUARIOS */
    const Registers = async (email, contrasena, nombre) => {
        if (email !== "" && contrasena !== "" && nombre !== "") {
            //console.log(email, contrasena, nombre, paiz, genero)

            dispatch({
                type: DATA_APP_CONTEXT,
                payload: {
                    "LOGIN_SPINNER": true,
                    "ERROR_USER": false,
                    "RESP_ERROR_LOGIN": ""
                }
            })

            try {
                const user = await axios({
                    method: "post",
                    data: {
                        "email": email,
                        "contrasena": contrasena,
                        "nombre": nombre,
                    },
                    url: `${URL_SERVER}/registro_post`
                })
                console.log(user.data)
                if (user.data) {
                    dispatch({
                        type: DATA_APP_CONTEXT,
                        payload: {
                            "LOGIN_SPINNER": false,
                            "ERROR_USER": true,
                            "RESP_ERROR_LOGIN": user.data,
                            "VALIDAR_USER": false,

                        }
                    })

                    //histo.push("/profil")
                } else {

                    dispatch({
                        type: DATA_APP_CONTEXT,
                        payload: {
                            "LOGIN_SPINNER": false,
                            "ERROR_USER": true,
                            "RESP_ERROR_LOGIN": user.data,
                            "VALIDAR_USER": false,
                        }
                    })

                }

            } catch (error) {
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: {
                        "LOGIN_SPINNER": false,
                        "ERROR_USER": true,
                        "RESP_ERROR_LOGIN": error.response.data,
                        "VALIDAR_USER": false,
                    }
                })

            }
        } else {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: {
                    "ERROR_USER": true,
                    "RESP_ERROR_LOGIN": "Todos los campos deben ser rellenados",
                }
            })

        }
    }
    /************************** */



    //funcion para cargar los array de los examenes
    const LoadListExam = async () => {
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { "SPINNER_CARGAR_EXAMENES": true }

        })
        //setAddSpìnner(true)
        try {
            const add = await axios.get(`${URL_SERVER}/getExamenList`)
            if (add.data) {
                setExamenList(add.data)
                //setAddSpìnner(false)
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "SPINNER_CARGAR_EXAMENES": false }

                })
            } else {
                setExamenList([])
                //setAddSpìnner(false)
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: { "SPINNER_CARGAR_EXAMENES": false }
                })
            }
        } catch (error) {
            setExamenList([])
            //setAddSpìnner(false)
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "SPINNER_CARGAR_EXAMENES": false }

            })
        }

    }




    return (
        <AppContext.Provider value={{
            dispatch,
            dataComentario,
            paginaNext,
            GetDataComent,
            AddComent,
            AddComentResponse,
            GetDataComentResponse,
            dataComentarioResp,
            datosGetComentResponse,
            
            /**** variables de respuestas de las respuestas de los comentarios */
            GetDataRespComentResponse,
            AddRespComentResponse,
            dataRespComentarioResp,
            /******************************* */
            ScrollInfinito,//para traer los comentarios con infinity scroll
            more: more,//para activar el infinityScroll
            Logins,//funcion para login del usuario
            Registers,//funcion para resgistrarse
            LoadListExam,//traer lista de examenes
            examenList: examenList,
            dataApp: state.dataApp

        }}>
            {props.children}
        </AppContext.Provider>
    )
};

