import React, { useEffect, useState, useContext } from 'react'
import "./login.css"
import M from 'materialize-css'
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/ServiceContext'
import { ERROR_USER, RESP_ERROR_LOGIN } from '../../contexts/constantesVar'
import { PulseLoader } from "react-spinners"
import 'animate.css';



function Login() {
    const { Logins, dispatch, loginSpinner, errorResponseLogin, userError, Registers,dataApp } = useContext(AppContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [cambiarFormulario, setCambiarFormulario] = useState(false)
    const [errors, setErrors] = useState("")


    const MensageForm = () => {
        return (
            <>
                <p className='animate__shakeX animate__animated animate__repeat-1'>{dataApp.ERROR_USER&& errors===""? dataApp.RESP_ERROR_LOGIN : ""}</p>
                <p className='animate__shakeX animate__animated animate__repeat-1'>{dataApp.ERROR_USER===false&& errors? errors :""}</p>
            </>
        )
    }



    const Enviar = async (e) => {
        e.preventDefault();
        setErrors("")
        if (cambiarFormulario) {
            //Registrarse
            const nombre = e.target.nombre.value.trim()
            const password2 = e.target.contrasena.value.trim()
            const email2 = e.target.email.value.trim()


            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (email2.match(mailformat)) {
                if (email2 && password2 && nombre) {
                    Registers(email2, password2, nombre)
                    setErrors("")
                } else {
                    setErrors("todos los campos son obligatorios")
                }
            } else {
                setErrors("introduce un email valido")
            }

        } else {
            //Iniciar sesion
            const password2 = e.target.contrasena.value.trim()
            const email2 = e.target.email.value.trim()


            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (email2.match(mailformat)) {
                if (email2 && password2) {
                    Logins(email2, password2)
                    setErrors("")
                } else {
                    setErrors("todos los campos son obligatorios")
                }
            } else {
                setErrors("introduce un email valido")
            }

        }

    }

    useEffect(() => {
        const alls = document.querySelector(".modal-form")
        M.Modal.init(alls, {
            preventScrolling: false,
            inDuration: 100,
            outDuration: 100,
        })
    }, [])

    return (
        <div id="modal1" className="modal modal-form">
            <div className="formulario-login-container-global">
                <div className='formulario-login-container'>
                    <form onSubmit={(e) => { Enviar(e) }}>
                        {cambiarFormulario ?
                            <div className="input-field contenedor-input  col s12">

                                <input
                                    type="text"
                                    className="input-text"
                                    name="nombre" required
                                    id="nombre"
                                    placeholder="tu nombre"
                                />
                            </div>
                            :
                            <></>
                        }
                        <div className="input-field contenedor-input  col s12">

                            <input
                                type="email"
                                className="input-text"
                                name="email" required
                                id="email"
                                placeholder="tu email"
                            />
                        </div>
                        <div className="input-field contenedor-input  col s12" >
                            <input
                                type="password"
                                className="input-text"
                                name="contrasena"
                                placeholder="tu contraseña"

                            />
                        </div>
                        <div className="formulario-login-error-respuesta">
                            {<MensageForm />}
                        </div>
                        {!cambiarFormulario ?
                            <div className="formulario-login-container-cambio">
                                <p>Si no tienes una cuenta  </p><Link onClick={() => {
                                    dispatch({
                                        type: RESP_ERROR_LOGIN,
                                        payload: ""
                                    })
                                    setCambiarFormulario(true)
                                }} to="#!">Registrate !</Link>
                            </div>
                            :
                            <div className="formulario-login-container-cambio">
                                <p>Si ya tienes una cuenta  </p><Link onClick={() => {
                                    dispatch({
                                        type: RESP_ERROR_LOGIN,
                                        payload: ""
                                    })
                                    dispatch({
                                        type: ERROR_USER,
                                        payload: false
                                    })
                                    setCambiarFormulario(false)
                                }} to="#!">Inicia sesion !</Link>
                            </div>
                        }

                        {/* {loginSpinner ?
                            <div className="spinner-login">
                                <PulseLoader color={"blue"} loading={true} size={30} />
                            </div>
                            : ""} */}

                        <button
                            className="formulario-login-container-btn  btn-small"
                            type="submit"
                            onClick={

                                () => {
                                    dispatch({
                                        type: RESP_ERROR_LOGIN,
                                        payload: {"RESP_ERROR_LOGIN":""}
                                    })
                                    dispatch({
                                        type: ERROR_USER,
                                        payload: {"ERROR_USER":false}
                                    })
                                }
                            }
                        >
                            {dataApp.LOGIN_SPINNER ? <PulseLoader size={15} color="#212121" /> : <>{cambiarFormulario ? "Registrarse" : "Iniciar"}</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
