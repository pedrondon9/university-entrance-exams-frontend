
/**
 * Auth context provider component for managing authentication, comments, and exam data.
 * 
 * Provides context values and functions for:
 * - User authentication (login, registration, resend email, change password)
 * - Fetching, adding, and paginating comments and their responses (nested up to 3 levels)
 * - Loading exam lists
 * - Managing UI state (spinners, error messages, infinite scroll)
 * 
 * @param {object} props - React component props.
 * @param {React.ReactNode} props.children - Child components to be rendered within the provider.
 * @returns {JSX.Element} AppContext.Provider with authentication and comment management functions.
 * 
 * @context
 * @property {Function} dispatch - Reducer dispatch function for state management.
 * @property {Function} GetDataComent - Fetches main comments for a given exam.
 * @property {Function} AddComent - Adds a new main comment to an exam.
 * @property {Function} AddComentResponse - Adds a response to a main comment.
 * @property {Function} GetDataComentResponse - Fetches responses for a main comment.
 * @property {Function} GetDataRespComentResponse - Fetches responses to a comment response (third-level).
 * @property {Function} AddRespComentResponse - Adds a response to a comment response (third-level).
 * @property {Function} ScrollInfinito - Loads more comments for infinite scroll.
 * @property {boolean} more - Indicates if more comments can be loaded (infinite scroll).
 * @property {Function} Logins - Handles user login.
 * @property {Function} Registers - Handles user registration.
 * @property {Function} LoadListExam - Loads the list of available exams.
 * @property {Array} examenList - List of exams.
 * @property {object} dataApp - Application state data.
 * @property {Function} resendEmail - Resends verification email to the user.
 * @property {Function} changePasswordContext - Handles password change requests.
 */

import React, { useReducer, useState } from "react"
import AppContext from "./ServiceContext";
import { InitialState } from './InitialState';
import AppReducer from "./AppReducer";
import axios from "axios";
import M from "materialize-css";

import { DATA_APP_CONTEXT, DATA_APP_REGISTER_CONTEXT, URL_SERVER } from "./constantesVar";
import { ErrorG } from "../components/errorGestion";



export default (props) => {


    const [state, dispatch] = useReducer(AppReducer, InitialState);
    const [dataComentario, setDataComentario] = useState([])
    const [dataRespComentarioResp, setDataRespComentarioResp] = useState([])
    const [dataComentarioResp, setDataComentarioResp] = useState([])
    const [paginaNext, setPaginaNext] = useState(null)
    const [comentRespId, setComentRespId] = useState("")
    const [respComentRespId, setRespComentRespId] = useState("")
    const [more, setMore] = useState(false)
    const [examenList, setExamenList] = useState([])

    const axiosConfigs = axios.create({
        baseURL: URL_SERVER,
    });

    axiosConfigs.interceptors.request.use((config) => {
        config.headers['x-access-token'] = state.dataApp.token;
        config.headers['x-user-id'] = state.dataApp.USER_ID;
        return config;
    });


    const GetDataComent = async (examenId) => {
        if (examenId) {
            setMore(true)
            //activar spinner de carga de comentarios
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "CARGAR_COMMENT": true }
            })
            try {

                if (paginaNext === null) {
                    const comments = await axiosConfigs({
                        method: "GET",
                        data: { "examenId": examenId },
                        url: `/customer/get_comment/${examenId}`
                    })
                    if (comments.data.success) {
                        console.log(comments.data.response)
                        dispatch({
                            type: DATA_APP_CONTEXT,
                            payload: {
                                "PAGINA_SIGUIENTE": comments.data.nextPage,
                                "CARGAR_COMMENT": false,

                            }
                        })
                        setPaginaNext(comments.data.nextPage)
                        setDataComentario(comments.data.response)

                    } else {

                    }
                } else {
                    const comments = await axiosConfigs({
                        method: "GET",
                        data: { "paginaNext": paginaNext, "examenId": "examenId" },
                        url: `/customer/getComent/${examenId}`
                    })
                    if (comments.data.success) {
                        dispatch({
                            type: DATA_APP_CONTEXT,
                            payload: {
                                "PAGINA_SIGUIENTE": comments.data.response.nextPage,
                                "CARGAR_COMMENT": false
                            }
                        })
                        setPaginaNext(comments.data.response.nextPage)
                        setDataComentario(comments.response.data.docs)

                    } else {

                    }
                }



            } catch (error) {

            } finally {
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
        //console.log("WWWWWWWWWWWWWW", examenId)
        //activar spinner de carga de comentarios
        try {

            if (paginaNext == "") {
                const comments = await axiosConfigs({
                    method: "GET",
                    data: { "examenId": examenId },
                    url: `/customer/getComent/${examenId}`
                })
                if (comments.data.docs) {
                    console.log(comments.data.docs)
                    dispatch({
                        type: DATA_APP_CONTEXT,
                        payload: {
                            "PAGINA_SIGUIENTE": comments.data.nextPage,

                        }
                    })
                    setPaginaNext(comments.data.nextPage)
                    setDataComentario(comments.data.docs)

                } else {

                }
            } else {
                const comments = await axiosConfigs({
                    method: "GET",
                    data: { "paginaNext": paginaNext, "examenId": "examenId" },
                    url: `/customer/getComent/${examenId}`
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
        } finally {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "CARGAR_COMMENT": false }
            })

        }
    }

    const GetDataComentResponse = async (comentId) => {
        console.log(comentId, "el id llega")
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { "CARGAR_RESPONSE_COMENT": true }
        })
        try {
            const comments = await axiosConfigs({
                method: "GET",
                data: { "id": comentId },
                url: `/customer/getComentResp/${comentId}`
            })

            console.log(comments)



            if (comments.data.docs) {
                setComentRespId(comentId)
                console.log(comments.data.docs)
                setDataComentarioResp(comments.data.docs)

            } else {

            }
        } catch (error) {

        } finally {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "CARGAR_RESPONSE_COMENT": false }

            })
        }
    }

    const GetDataComentResponseAdd = async (comentId) => {
        console.log(comentId, "el id llega")

        try {
            const comments = await axiosConfigs({
                method: "GET",
                data: { "id": comentId },
                url: `/customer/getComentResp/${comentId}`
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

    const GetDataRespComentResponse = async (comentId) => {
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { "CARGAR_RESPONSE_RESPONSE": true }
        })
        try {
            const comments = await axiosConfigs({
                method: "GET",
                data: { "id": comentId },
                url: `/customer/getRespComentResp/${comentId}`
            })




            if (comments.data.docs) {
                setRespComentRespId(comentId)
                setDataRespComentarioResp(comments.data.docs)

            } else {

            }
        } catch (error) {

        } finally {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "CARGAR_RESPONSE_RESPONSE": false }

            })
        }
    }
    const GetDataRespComentResponseAdd = async (comentId) => {
        try {
            const comments = await axiosConfigs({
                method: "GET",
                data: { "id": comentId },
                url: `/customer/getRespComentResp/${comentId}`
            })




            if (comments.data.docs) {
                setRespComentRespId(comentId)
                setDataRespComentarioResp(comments.data.docs)
            } else {

            }
        } catch (error) {

        }
    }


    const AddComent = async (coment, userId, examenId,parentId ) => {
        console.log(coment, userId, examenId)
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { "ADD_COMMENT_SPINNER": true }
        })

        const fs = new FormData()
        fs.append("content", coment)
        fs.append("userId", userId)
        fs.append("examenId", examenId)
        fs.append("parentId", JSON.stringify(parentId))
        try {
            const add = await axiosConfigs.post(`/customer/auth/add_coment_resp`, fs, { headers: { "Content-Type": "multipart/form-data" } })
            if (add.data.success) {
                GetDataComent(examenId)//volver a cargar comentarios
                var toastHTML = '<span className = "text-red">' + add.data.message + '</span>';
                M.toast({ html: toastHTML });
            } else {
                var toastHTML = '<span className = "text-red">' + add.data.message + '</span>';
                M.toast({ html: toastHTML });

            }
        } catch (error) {

        } finally {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "ADD_COMMENT_SPINNER": false }

            })
        }
    }

    const AddComentResponse = async (coment, userName, userPhoto, userId, comentCategory, comentId, imagen1, imagen2, imagen3, imagen4) => {
        dispatch({
            type: DATA_APP_CONTEXT,
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
            const add = await axiosConfigs.post(`/customer/auth/addComentResp`, fs, { headers: { "Content-Type": "multipart/form-data" } })
            if (add.data == "publicado") {
                GetDataComentResponseAdd(comentRespId)
                comentRespId(comentRespId)
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });

            } else {
                var toastHTML = '<span className = "text-red">' + add.data + '</span>';
                M.toast({ html: toastHTML });

            }
        } catch (error) {

        } finally {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: { "ADD_COMMENT_RESPONSE_SPINNER": false }

            })
        }
    }

    const AddRespComentResponse = async (coment, userName, userPhoto, userId, comentCategory, comentId, imagen1, imagen2, imagen3, imagen4) => {
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { "ADD_RESPONSE_RESPONSE_SPINNER": true }
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
            const add = await axiosConfigs.post(`/customer/auth/addRespComentResp`, fs, { headers: { "Content-Type": "multipart/form-data" } })
            if (add.data == "publicado") {
                GetDataRespComentResponseAdd(respComentRespId)
                comentRespId(comentRespId)
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



    const ScrollInfinito = async (examenId) => {
        setMore(true)
        //activar spinner de carga de comentarios
        // dispatch({
        //     type: CARGAR_COMMENT,
        //     payload: true
        // })
        try {
            const comments = await axiosConfigs({
                method: "POST",
                data: { "examenId": examenId, "paginaNext": paginaNext },
                url: `/customer/getComentInfinityScroll/${examenId}`
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
    const Logins = async (email, password) => {

        if (email !== "" && password !== "") {
            dispatch({
                type: DATA_APP_REGISTER_CONTEXT,
                payload: { "LOGIN_SPINNER": true, "ERROR_USER": false, "RESP_ERROR_LOGIN": "" }
            })

            try {
                const user = await axiosConfigs({
                    method: "post",
                    data: { email, password },
                    url: `/customer/login_post`
                })
                if (user.data.success) {

                    dispatch({
                        type: DATA_APP_CONTEXT,
                        payload: {
                            "VALIDAR_USER": true,
                            "USER_ID": user.data.userData._id,
                            "USER_NAME": user.data.userData.fullname,
                            'token': user.data.token,

                        }
                    })

                    dispatch({
                        type: DATA_APP_REGISTER_CONTEXT,
                        payload: {
                            'token': '',
                            'SEND_EMAIL': false,
                            "LOGIN_SPINNER": false,
                            "RESP_ERROR_LOGIN": "",
                            "ERROR_USER": false,

                        }
                    })

                    window.localStorage.setItem("dataUser", JSON.stringify(
                        {
                            'token': user.data.token,
                            "VALIDAR_USER": true,
                            "USER_ID": user.data.userData._id,
                            "USER_NAME": user.data.userData.fullname,

                        }
                    ))
                    window.sessionStorage.setItem("logUp", JSON.stringify(
                        {
                            'token': '',
                            'SEND_EMAIL': false,
                            "LOGIN_SPINNER": false,
                            "RESP_ERROR_LOGIN": "",
                            "ERROR_USER": false,

                        }
                    ))

                    const elem = document.querySelector(".modal-form")
                    var instance = M.Modal.getInstance(elem);
                    instance.close()

                } else {
                    dispatch({
                        type: DATA_APP_REGISTER_CONTEXT,
                        payload: {
                            "LOGIN_SPINNER": false,
                            "ERROR_USER": true,
                            "RESP_ERROR_LOGIN": user.data.message || "Error de autenticacion",
                            "VALIDAR_USER": false
                        }

                    })

                }

            } catch (error) {
                ErrorG(dispatch, error)
            }
        } else {
            dispatch({
                type: DATA_APP_REGISTER_CONTEXT,
                payload: {
                    "RESP_ERROR_LOGIN": "Todos los campos son importantes",
                    "ERROR_USER": true
                }
            })
        }

    }

    /****************************** FIN DEL LOGIN ************************************************** */



    /**** LOGIN PARA REGISTRO DE USUARIOS */
    const Registers = async (email, contrasena, nombre, navigate) => {
        if (email !== "" && contrasena !== "" && nombre !== "") {
            //console.log(email, contrasena, nombre, paiz, genero)

            dispatch({
                type: DATA_APP_REGISTER_CONTEXT,
                payload: { "LOGIN_SPINNER": true, "ERROR_USER": false, "RESP_ERROR_LOGIN": "" }
            })


            try {
                const user = await axiosConfigs({
                    method: "post",
                    data: {
                        "email": email,
                        "password": contrasena,
                        "fullname": nombre,
                    },
                    url: `/customer/registro_post`
                })

                console.log(user)
                if (user.data.success) {
                    const dataLogUp = {
                        "LOGIN_SPINNER": false,
                        "ERROR_USER": true,
                        "RESP_ERROR_LOGIN": user.data.message || "Error de autenticacion",
                        "SEND_EMAIL": true,
                        "token": user.data.token,
                    }
                    dispatch({
                        type: DATA_APP_REGISTER_CONTEXT,
                        payload: dataLogUp

                    })

                    window.sessionStorage.setItem("logUp", JSON.stringify(dataLogUp))

                    //navigate("/resendEmail")

                    //const elem = document.querySelector(".modal-form")
                    //var instance = M.Modal.getInstance(elem);
                    //instance.close()


                } else {

                    dispatch({
                        type: DATA_APP_REGISTER_CONTEXT,
                        payload: {
                            "LOGIN_SPINNER": false,
                            "ERROR_USER": true,
                            "RESP_ERROR_LOGIN": user.data.message || "Error de autenticacion",
                            "SEND_EMAIL": false,
                            "token": '',
                        }

                    })
                }

            } catch (error) {
                console.log("error", error)
                ErrorG(dispatch, error)

            }
        } else {

            dispatch({
                type: DATA_APP_REGISTER_CONTEXT,
                payload: {
                    "ERROR_USER": true,
                    "RESP_ERROR_LOGIN": "Todos los campos deben ser rellenados",
                    "LOGIN_SPINNER": false,
                    "SEND_EMAIL": false,
                    "token": '',
                }

            })
        }
    }
    /************************** */


    const resendEmail = async () => {
        const userData = JSON.parse(window.sessionStorage.getItem('logUp'));

        console.log("userData", userData)

        dispatch({
            type: DATA_APP_REGISTER_CONTEXT,
            payload: { "LOGIN_SPINNER": true, "ERROR_USER": false, "RESP_ERROR_LOGIN": "" }
        })


        if (!userData?.SEND_EMAIL) {
            dispatch({
                type: DATA_APP_REGISTER_CONTEXT,
                payload: {
                    "RESP_ERROR_LOGIN": "No se ha encontrado información de usuario. Por favor, inicia sesión o registrate nuevamente.",
                }
            })

            return
        };

        const token = userData.token;

        try {
            const response = await axiosConfigs.post(`/customer/resend-email`, { token });
            if (response.data.success) {
                dispatch({
                    type: DATA_APP_REGISTER_CONTEXT,
                    payload: { "RESP_ERROR_LOGIN": response.data.message }
                })

            } else {
                dispatch({
                    type: DATA_APP_REGISTER_CONTEXT,
                    payload: { "RESP_ERROR_LOGIN": response.data.message }
                })
            }
        } catch (error) {

            ErrorG(dispatch, error)

        } finally {
            const dataLogUp = {
                "LOGIN_SPINNER": false,
                "ERROR_USER": true,
            }
            dispatch({
                type: DATA_APP_REGISTER_CONTEXT,
                payload: dataLogUp
            })
        }

    }
    const changePasswordContext = async (data) => {

        console.log("userData", data)

        dispatch({
            type: DATA_APP_REGISTER_CONTEXT,
            payload: { "LOGIN_SPINNER": true, "ERROR_USER": false, "RESP_ERROR_LOGIN": "" }
        })


        try {

            const response = await axiosConfigs.post(`/customer/change-pasword`, data);

            if (response.data.success) {
                const dataLogUp = {
                    "LOGIN_SPINNER": false,
                    "ERROR_USER": true,
                    "RESP_ERROR_LOGIN": response.data.message || "Error de autenticacion",
                    "SEND_EMAIL": true,
                    "token": response.data.token,
                }
                dispatch({
                    type: DATA_APP_REGISTER_CONTEXT,
                    payload: dataLogUp

                })

                window.sessionStorage.setItem("logUp", JSON.stringify(dataLogUp))

            } else {

                dispatch({
                    type: DATA_APP_REGISTER_CONTEXT,
                    payload: {
                        "LOGIN_SPINNER": false,
                        "ERROR_USER": true,
                        "RESP_ERROR_LOGIN": response.data.message || "Error de autenticacion",
                        "SEND_EMAIL": false,
                        "token": '',
                    }

                })
            }
        } catch (error) {
            ErrorG(dispatch, error)
        } finally {
            dispatch({
                type: DATA_APP_REGISTER_CONTEXT,
                payload: {
                    "LOGIN_SPINNER": false,
                    "ERROR_USER": true,
                    "RESP_ERROR_LOGIN": "Comprueba tu coneccion a internet",
                    "SEND_EMAIL": false,
                    "token": '',
                }
            })
        }

    }


    //funcion para cargar los array de los examenes
    const LoadListExam = async () => {
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { "SPINNER_CARGAR_EXAMENES": true }

        })
        //setAddSpìnner(true)
        try {
            const add = await axiosConfigs.get(`/customer/getExamen`)
            if (add.data.success) {
                setExamenList(add.data.response)
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
            GetDataComent,
            AddComent,
            AddComentResponse,
            GetDataComentResponse,
            dataComentario,
            dataComentarioResp,
            dataRespComentarioResp,
            respComentRespId,
            comentRespId,
            respComentRespId,
            GetDataRespComentResponse,
            AddRespComentResponse,
            /******************************* */
            ScrollInfinito,
            more: more,//para activar el infinityScroll
            Logins,
            Registers,
            LoadListExam,
            examenList: examenList,
            dataApp: state.dataApp,
            dataAppRegister: state.dataAppRegister,
            resendEmail,
            changePasswordContext,
            axiosConfigs

        }}>
            {props.children}
        </AppContext.Provider>
    )
};

