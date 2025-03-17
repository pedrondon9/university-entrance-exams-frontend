import React, { useReducer, useState } from "react"
import AppContext from "./ServiceContext";
import { InitialState } from './InitialState';
import AppReducer from "./AppReducer";
import axios from "axios";
import M from "materialize-css";

import { ADD_COMMENT_RESPONSE_SPINNER, ADD_COMMENT_SPINNER, ADD_RESPONSE_RESPONSE_SPINNER, CARGAR_COMMENT, CARGAR_RESPONSE_COMENT, CARGAR_RESPONSE_RESPONSE, ERROR_USER, LOGIN_SPINNER, PAGINA_SIGUIENTE, RESP_ERROR_LOGIN, SPINNER_CARGAR_EXAMENES, URL_SERVER, USER_ID, USER_NAME, VALIDAR_USER } from "./constantesVar";



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
                type: CARGAR_COMMENT,
                payload: true
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
                            type: PAGINA_SIGUIENTE,
                            payload: comments.data.nextPage
                        })
                        setPaginaNext(comments.data.nextPage)
                        setDataComentario(comments.data.docs)
                        dispatch({
                            type: CARGAR_COMMENT,
                            payload: false
                        })
                    } else {
                        dispatch({
                            type: CARGAR_COMMENT,
                            payload: false
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
                            type: PAGINA_SIGUIENTE,
                            payload: comments.data.nextPage
                        })
                        setPaginaNext(comments.data.nextPage)
                        setDataComentario(comments.data.docs)
                        dispatch({
                            type: CARGAR_COMMENT,
                            payload: false
                        })
                    } else {
                        dispatch({
                            type: CARGAR_COMMENT,
                            payload: false
                        })
                    }
                }



            } catch (error) {
                dispatch({
                    type: CARGAR_COMMENT,
                    payload: false
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
                        type: PAGINA_SIGUIENTE,
                        payload: comments.data.nextPage
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
                        type: PAGINA_SIGUIENTE,
                        payload: comments.data.nextPage
                    })
                    setPaginaNext(comments.data.nextPage)
                    setDataComentario(comments.data.docs)

                } else {

                }
            }



        } catch (error) {
            dispatch({
                type: CARGAR_COMMENT,
                payload: false
            })
        }
    }

    //funcion para obtener segundos comentrios o respuestas del primer comentario
    const GetDataComentResponse = async (comentId) => {
        console.log(comentId, "el id llega")
        dispatch({
            type: CARGAR_RESPONSE_COMENT,
            payload: true
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
                    type: CARGAR_RESPONSE_COMENT,
                    payload: false
                })
            } else {
                dispatch({
                    type: CARGAR_RESPONSE_COMENT,
                    payload: false
                })
            }
        } catch (error) {
            dispatch({
                type: CARGAR_RESPONSE_COMENT,
                payload: false
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
            type: CARGAR_RESPONSE_RESPONSE,
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
                    type: CARGAR_RESPONSE_RESPONSE,
                    payload: false
                })
            } else {
                dispatch({
                    type: CARGAR_RESPONSE_RESPONSE,
                    payload: false
                })
            }
        } catch (error) {
            dispatch({
                type: CARGAR_RESPONSE_RESPONSE,
                payload: false
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
    const AddComent = async (coment, userName, userPhoto, userId, comentCategory, examenId,imagen1,imagen2,imagen3,imagen4) => {
        dispatch({
            type: ADD_COMMENT_SPINNER,
            payload: true
        })
        
        const fs = new FormData()
        fs.append("userName",userName)
        fs.append("userPhoto",userPhoto)
        fs.append("coment",coment)
        fs.append("userId",userId)
        fs.append("comentCategory",comentCategory)
        fs.append("examenId",examenId )
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
                    type: ADD_COMMENT_SPINNER,
                    payload: false
                })
            } else {
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });
                dispatch({
                    type: ADD_COMMENT_SPINNER,
                    payload: false
                })
            }
        } catch (error) {
            dispatch({
                type: ADD_COMMENT_SPINNER,
                payload: false
            })
        }
    }

    //funcion para añadir  segundos comentrios o respuestas del primer comentario
    const AddComentResponse = async (coment, userName, userPhoto, userId, comentCategory, comentId,imagen1,imagen2,imagen3,imagen4) => {
        dispatch({
            type: ADD_COMMENT_RESPONSE_SPINNER,
            payload: true
        })
        const fs = new FormData()
        fs.append("userName",userName)
        fs.append("userPhoto",userPhoto)
        fs.append("coment",coment)
        fs.append("userId",userId)
        fs.append("comentCategory",comentCategory)
        fs.append("comentId",comentId )
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
                    type: ADD_COMMENT_RESPONSE_SPINNER,
                    payload: false
                })
            } else {
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });
                dispatch({
                    type: ADD_COMMENT_RESPONSE_SPINNER,
                    payload: false
                })
            }
        } catch (error) {
            dispatch({
                type: ADD_COMMENT_RESPONSE_SPINNER,
                payload: false
            })
        }
    }

    //funcion para añadir terceros comentrios o respuestas del segundo comentario
    const AddRespComentResponse = async (coment, userName, userPhoto, userId, comentCategory, comentId,imagen1,imagen2,imagen3,imagen4) => {
        dispatch({
            type: ADD_RESPONSE_RESPONSE_SPINNER,
            payload: true
        })
        const fs = new FormData()
        fs.append("userName",userName)
        fs.append("userPhoto",userPhoto)
        fs.append("coment",coment)
        fs.append("userId",userId)
        fs.append("comentCategory",comentCategory)
        fs.append("comentId",comentId )
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
                    type: ADD_RESPONSE_RESPONSE_SPINNER,
                    payload: false
                })
            } else {
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });
                dispatch({
                    type: ADD_RESPONSE_RESPONSE_SPINNER,
                    payload: false
                })
            }
        } catch (error) {
            dispatch({
                type: ADD_RESPONSE_RESPONSE_SPINNER,
                payload: false
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
                        type: PAGINA_SIGUIENTE,
                        payload: comments.data.nextPage
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
                type: LOGIN_SPINNER,
                payload: true
            })

            dispatch({
                type: ERROR_USER,
                payload: false
            })
            dispatch({
                type: RESP_ERROR_LOGIN,
                payload: ""
            })


            try {
                const user = await axios({
                    method: "post",
                    data: { "email": email, "contrasena": contrasena },
                    url: `${URL_SERVER}/login_post`
                })
                if (user.data.code) {
                    //window.sessionStorage.setItem("userInfo",user.data)
                    dispatch({
                        type: LOGIN_SPINNER,
                        payload: false
                    })
                    dispatch({
                        type: ERROR_USER,
                        payload: true
                    })
                    dispatch({
                        type: RESP_ERROR_LOGIN,
                        payload: user.data.mens
                    })
                    dispatch({
                        type: VALIDAR_USER,
                        payload: true
                    })
                    window.localStorage.setItem("code", user.data.code)
                    //const userData = await user.data.user
                    //const keys = await user.data.clave

                    dispatch({
                        type: USER_NAME,
                        payload: user.data.user
                    })
                    dispatch({
                        type: USER_ID,
                        payload: user.data.id
                    })
                    const elem = document.querySelector(".modal-form")
                    var instance = M.Modal.getInstance(elem);
                    instance.close()
                } else {
                    dispatch({
                        type: LOGIN_SPINNER,
                        payload: false
                    })
                    dispatch({
                        type: ERROR_USER,
                        payload: true
                    })
                    dispatch({
                        type: RESP_ERROR_LOGIN,
                        payload: user.data.mens
                    })

                    dispatch({
                        type: VALIDAR_USER,
                        payload: false
                    })
                    dispatch({
                        type: USER_NAME,
                        payload: ""
                    })
                    dispatch({
                        type: USER_ID,
                        payload: ""
                    })

                }

            } catch (error) {
                dispatch({
                    type: LOGIN_SPINNER,
                    payload: false
                })
                dispatch({
                    type: ERROR_USER,
                    payload: true
                })
                dispatch({
                    type: RESP_ERROR_LOGIN,
                    payload: "Comprueba tu coneccion a internet"
                })
            }
        } else {
            dispatch({
                type: ERROR_USER,
                payload: true
            })
            dispatch({
                type: RESP_ERROR_LOGIN,
                payload: "Todos los campos son importantes"
            })
        }

    }

    /****************************** FIN DEL LOGIN ************************************************** */



    /**** LOGIN PARA REGISTRO DE USUARIOS */
    const Registers = async (email, contrasena, nombre) => {
        if (email !== "" && contrasena !== "" && nombre !== "") {
            //console.log(email, contrasena, nombre, paiz, genero)

            dispatch({
                type: LOGIN_SPINNER,
                payload: true
            })
            dispatch({
                type: ERROR_USER,
                payload: false
            })
            dispatch({
                type: RESP_ERROR_LOGIN,
                payload: ""
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
                if (user.data) {
                    dispatch({
                        type: LOGIN_SPINNER,
                        payload: false
                    })
                    dispatch({
                        type: ERROR_USER,
                        payload: true
                    })
                    dispatch({
                        type: RESP_ERROR_LOGIN,
                        payload: user.data
                    })
                    dispatch({
                        type: VALIDAR_USER,
                        payload: false
                    })
                    //histo.push("/profil")
                } else {
                    dispatch({
                        type: LOGIN_SPINNER,
                        payload: false
                    })
                    dispatch({
                        type: ERROR_USER,
                        payload: true
                    })
                    dispatch({
                        type: RESP_ERROR_LOGIN,
                        payload: user.data
                    })
                }

            } catch (error) {
                dispatch({
                    type: LOGIN_SPINNER,
                    payload: false
                })
                dispatch({
                    type: ERROR_USER,
                    payload: true
                })
                dispatch({
                    type: RESP_ERROR_LOGIN,
                    payload: "Comprueba tu coneccion a internet"
                })
            }
        } else {
            dispatch({
                type: ERROR_USER,
                payload: true
            })
            dispatch({
                type: RESP_ERROR_LOGIN,
                payload: "Todos los campos deben ser rellenados"
            })
        }
    }
    /************************** */



    //funcion para cargar los array de los examenes
    const LoadListExam = async () => {
        dispatch({
            type: SPINNER_CARGAR_EXAMENES,
            payload: true

        })
        //setAddSpìnner(true)
        try {
            const add = await axios.get(`${URL_SERVER}/getExamenList`)
            if (add.data) {
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




    return (
        <AppContext.Provider value={{
            dispatch,
            dataRicheText: state.dataRicheText,
            dataComentario,
            paginaNext,
            GetDataComent,
            paginaSiguiente: state.paginaSiguiente,
            AddComent,
            userId: state.userId,
            userName: state.userName,
            userLinkPhoto: state.userLinkPhoto,
            AddComentResponse,
            GetDataComentResponse,
            dataComentarioResp,
            datosGetComentResponse,
            examId: state.examId,//el id del examen
            /**** variables de respuestas de las respuestas de los comentarios */
            GetDataRespComentResponse,
            AddRespComentResponse,
            dataRespComentarioResp,
            /******************************* */
            formPdfView: state.formPdfView,
            pdfUrl: state.pdfUrl,//para guardar el pdf
            /******************spinner********************** */
            spinnerComment: state.spinnerComment,// mostrar spinner durante la carga de  comentarios
            spinnerAddComment: state.spinnerAddComment,//añadir comentario
            spinnerAddCommentRespons: state.spinnerAddCommentRespons,//añadir respuesta al coment principal
            spinnerCargarCommentRespons: state.spinnerCargarCommentRespons,//cargar respuestas del comentario principal
            spinnerAddResponsRespons: state.spinnerAddResponsRespons,//añadir respuesta a la respueta del comentario principal
            spinnerCargarResponsRespons: state.spinnerCargarResponsRespons,//cargar respuestas de la respueta del comentario principal
            /************************************** */
            ScrollInfinito,//para traer los comentarios con infinity scroll
            more: more,//para activar el infinityScroll
            spinnerCargarExamenes: state.spinnerCargarExamenes,//spinner para cargar examenes,
            validarUser: state.validarUser,//validar si el usuario ya inicio sesion
            Logins,//funcion para login del usuario
            Registers,//funcion para resgistrarse
            loginSpinner: state.loginSpinner,//para activar el spinner durante el inicio de sesion
            errorResponseLogin: state.errorResponseLogin,//el error al inicio de sesion
            userError: state.userError,//login error boolean
            LoadListExam,//traer lista de examenes
            examenList:examenList,

        }}>
            {props.children}
        </AppContext.Provider>
    )
};

