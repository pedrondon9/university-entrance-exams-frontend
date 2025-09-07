import React, { useEffect, useState, useContext } from 'react'
import "./login.css"
import M from 'materialize-css'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../../contexts/ServiceContext'
import { DATA_APP_CONTEXT, DATA_APP_REGISTER_CONTEXT, ERROR_USER, RESP_ERROR_LOGIN } from '../../contexts/constantesVar'
import { PulseLoader } from "react-spinners"
import 'animate.css';



function Login() {

    const navigate = useNavigate()
    const { Logins, dispatch, dataAppRegister, errorResponseLogin, userError, Registers, dataApp, resendEmail, changePasswordContext } = useContext(AppContext)

    const [email, setEmail] = useState("")
    const [textBottonSutmit, setTextBottonSubmit] = useState("Iniciar")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [cambiarFormulario, setCambiarFormulario] = useState("signIn")
    const [errors, setErrors] = useState("")


    const MensageForm = () => {
        return (
            <>
                <p className='animate__shakeX animate__animated animate__repeat-1'>{dataAppRegister.ERROR_USER && errors === "" ? dataAppRegister.RESP_ERROR_LOGIN : ""}</p>
                <p className='animate__shakeX animate__animated animate__repeat-1'>{dataAppRegister.ERROR_USER === false && errors ? errors : ""}</p>
            </>
        )
    }



    const Enviar = async (e) => {
        console.log(dataAppRegister, "dataAppRegister")
        e.preventDefault();
        setErrors("")
        if (dataAppRegister?.SEND_EMAIL) {
            await resendEmail();
            return;
        }
        if (cambiarFormulario === "signUp") {
            const password2 = e.target.password.value.trim()
            const password = e.target.password2.value.trim()

            if (password2 !== password) {
                setErrors("las contraseñas no coinciden")
                return;
                
            }

            //Registrarse
            const nombre = e.target.fullname.value.trim()
            const email2 = e.target.email.value.trim()


            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (email2.match(mailformat)) {
                if (email2 && password2 && nombre) {
                    Registers(email2, password2, nombre, navigate)
                    setErrors("")
                } else {
                    setErrors("todos los campos son obligatorios")
                }
            } else {
                setErrors("introduce un email valido")
            }

            return;
        }
        if (cambiarFormulario === "signIn") {
            //Iniciar sesion
            const password2 = e.target.password.value.trim()
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
        if (cambiarFormulario === "forgotPassword") {

            //Cambiar contraseña

            const password2 = e.target.password.value.trim()
            const passwordRepeat = e.target.passwordRepeat.value.trim()
            const email = e.target.email.value.trim()
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!email.match(mailformat)) {
                setErrors("introduce un email valido")

            }
            if (!(email && password2 && passwordRepeat)) {

                setErrors("todos los campos son obligatorios")

            }
            if (!(password2 === passwordRepeat)) {

                setErrors("las contraseñas no coinciden")

            }

            await changePasswordContext({
                email: email,
                password: password2,
                passwordRepeat: passwordRepeat
            })
            setErrors("")

            return;
        }

    }

    useEffect(() => {
        const alls = document.querySelector(".modal-form")
        M.Modal.init(alls, {
            preventScrolling: false,
            inDuration: 100,
            outDuration: 100,
            dismissible: false

        })
    }, [])

    return (
        <div id="modal1" className="modal modal-form">
            <button
                type="button"
                className="modal-close btn-flat close-modal-btn"
                style={{
                    textAlign: "center !important",
                    fontSize: "35px",
                    border: "none",
                    cursor: "pointer",
                    color: "#212121",
                    fontWeight: "bold",
                }}
                aria-label="Cerrar"
                onClick={() => {
                    // If you want to reset form state on close, do it here
                    setCambiarFormulario(cambiarFormulario);

                    // Materialize will close modal automatically with .modal-close
                }}
            >
                &times; {/* This is the close icon */}
            </button>
            <div className="formulario-login-container-global">

                <div className='formulario-login-container'>
                    {/* Close Button */}
                    <form onSubmit={(e) => { Enviar(e) }}>

                        {dataAppRegister?.SEND_EMAIL ?
                            <></>
                            :
                            <>
                                {
                                    cambiarFormulario === "signUp" ?
                                        <>
                                        <h4 style={{textAlign:"center",marginBlock:"20px"}}>Registrarse</h4>
                                            <div className="input-field contenedor-input  col s12">
                                                < input
                                                    type="text"
                                                    className="input-text"
                                                    name="fullname" required
                                                    id="nombre"
                                                    placeholder="tu nombre"
                                                />
                                            </div>

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
                                                    name="password"
                                                    placeholder="tu contraseña"

                                                />
                                            </div>
                                            <div className="input-field contenedor-input  col s12" >
                                                <input
                                                    type="password"
                                                    className="input-text"
                                                    name="password2"
                                                    placeholder="Repite la contraseña"

                                                />
                                            </div>
                                        </>
                                        :
                                        <></>
                                }

                                {
                                    cambiarFormulario === "signIn" ?
                                        <>
                                        <h4 style={{textAlign:"center",marginBlock:"20px"}}>Iniciar sesion</h4>

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
                                                    name="password"
                                                    placeholder="tu contraseña"

                                                />
                                            </div>
                                        </>
                                        :
                                        <></>
                                }

                                {
                                    cambiarFormulario === "forgotPassword" ?
                                        <>
                                        <h4 style={{textAlign:"center",marginBlock:"20px"}}>Modificar la contraseña</h4>

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
                                                    name="password"
                                                    placeholder="Nueva contraseña"

                                                />
                                            </div>

                                            <div className="input-field contenedor-input  col s12" >
                                                <input
                                                    type="password"
                                                    className="input-text"
                                                    name="passwordRepeat"
                                                    placeholder="Repite la contraseña"

                                                />
                                            </div>
                                        </>
                                        :
                                        <></>
                                }

                            </>
                        }
                        <div className="formulario-login-error-respuesta" style={dataAppRegister.SEND_EMAIL ? { minHeight: "120px" } : { minHeight: "auto" }}>
                            {<MensageForm />}
                        </div>
                        {dataAppRegister?.SEND_EMAIL ?
                            <></>
                            :
                            <>
                                {cambiarFormulario === "signIn" ?
                                    <div className="formulario-login-container-cambi">
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", insetInline: "0px" }}>
                                            <p style={{ marginBlock: "3px", fontSize: "15px", fontWeight: "bold" }}>Si no tienes una cuenta
                                                <Link style={{ marginLeft: 6 }} onClick={() => {
                                                    dispatch({
                                                        type: DATA_APP_REGISTER_CONTEXT,
                                                        payload: {
                                                            RESP_ERROR_LOGIN: "",
                                                            ERROR_USER: false,
                                                        }
                                                    })
                                                    setCambiarFormulario(true)
                                                    setTextBottonSubmit("Registrate")
                                                    setCambiarFormulario("signUp")
                                                }} to="#!">Registrate !</Link>
                                            </p >
                                            <p style={{ marginBlock: "3px", fontSize: "15px", fontWeight: "bold", marginBottom: 18 }}>No recuerdas tu contraseña?
                                                <Link style={{ marginLeft: 6 }} onClick={() => {
                                                    dispatch({
                                                        type: DATA_APP_REGISTER_CONTEXT,
                                                        payload: {
                                                            RESP_ERROR_LOGIN: "",
                                                            ERROR_USER: false,
                                                        }
                                                    })
                                                    setCambiarFormulario(true)
                                                    setTextBottonSubmit("Cambiar contraseña")
                                                    setCambiarFormulario("forgotPassword")
                                                }} to="#!">Cambia tu password aqui  !</Link>
                                            </p>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }

                                {cambiarFormulario === "signUp" ?
                                    <div className="formulario-login-container-cambi">
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", insetInline: "0px" }}>
                                            <p style={{ marginBlock: "3px", fontSize: "15px", fontWeight: "bold", marginBottom: 18 }}>Si no tienes una cuenta
                                                <Link style={{ marginLeft: 6 }} onClick={() => {
                                                    dispatch({
                                                        type: DATA_APP_REGISTER_CONTEXT,
                                                        payload: {
                                                            RESP_ERROR_LOGIN: "",
                                                            ERROR_USER: false,
                                                        }
                                                    })
                                                    setCambiarFormulario("signIn")
                                                    setTextBottonSubmit("Iniciar")
                                                }} to="#!">Iniciar sesion !</Link>
                                            </p >

                                        </div>
                                    </div>

                                    :
                                    <></>
                                }


                                {cambiarFormulario === "forgotPassword" ?
                                    <div className="formulario-login-container-cambi">
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", insetInline: "0px" }}>
                                            <p style={{ marginBlock: "3px", fontSize: "15px", fontWeight: "bold" }}>Si no tienes una cuenta
                                                <Link style={{ marginLeft: 6 }} onClick={() => {
                                                    dispatch({
                                                        type: DATA_APP_REGISTER_CONTEXT,
                                                        payload: {
                                                            RESP_ERROR_LOGIN: "",
                                                            ERROR_USER: false,
                                                        }
                                                    })
                                                    setCambiarFormulario(true)
                                                    setTextBottonSubmit("Registrate")
                                                    setCambiarFormulario("signUp")
                                                }} to="#!">Registrate !</Link>
                                            </p >
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", insetInline: "0px" }}>
                                                <p style={{ marginBlock: "3px", fontSize: "15px", fontWeight: "bold", marginBottom: 18 }}>Si no tienes una cuenta
                                                    <Link style={{ marginLeft: 6 }} onClick={() => {
                                                        dispatch({
                                                            type: DATA_APP_REGISTER_CONTEXT,
                                                            payload: {
                                                                RESP_ERROR_LOGIN: "",
                                                                ERROR_USER: false,
                                                            }
                                                        })
                                                        setCambiarFormulario("signIn")
                                                        setTextBottonSubmit("Iniciar")
                                                    }} to="#!">Iniciar sesion !</Link>
                                                </p >

                                            </div>
                                        </div>
                                    </div>

                                    :
                                    <></>
                                }


                            </>
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
                                        type: DATA_APP_REGISTER_CONTEXT,
                                        payload: {
                                            RESP_ERROR_LOGIN: "",
                                            ERROR_USER: false
                                        }
                                    })

                                }
                            }
                        >
                            {dataAppRegister.LOGIN_SPINNER ? <PulseLoader size={15} color="#212121" /> : <>{dataAppRegister.SEND_EMAIL ? "Volver a enviar el link" : <>{textBottonSutmit}</>}</>}
                        </button>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Login
