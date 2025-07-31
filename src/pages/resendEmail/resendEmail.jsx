
/**
 * ResendEmail Component
 * 
 * This component renders a page that allows users to resend a confirmation email. 
 * It provides feedback messages and handles various error scenarios during the email resend process.
 * 
 * @component
 * @returns {JSX.Element} The rendered ResendEmail component.
 * 
 * @example
 * <ResendEmail />
 * 
 * @dependencies
 * - React: Core library for building user interfaces.
 * - react-spinners: For displaying a loading spinner.
 * - axios: For making HTTP requests.
 * - react-router-dom: For navigation and routing.
 * - AppContext: Custom context for accessing application-wide data.
 * - BarradeNavegacion: Navigation bar component.
 * - Login: Login and registration component.
 * 
 * @state
 * - spinner {boolean}: Indicates whether the loading spinner is active.
 * - error {string}: Stores error messages for display.
 * - message {string}: Stores feedback messages for the user.
 * - email {string}: Stores the user's email address.
 * 
 * @context
 * - dataApp {object}: Context data from AppContext, used to check if email resending is allowed.
 * 
 * @functions
 * - resendEmail: Asynchronous function to handle the email resend process. 
 *   It validates user data, sends a request to the server, and handles success or error responses.
 * 
 * @useEffect
 * - Checks if the `SEND_EMAIL` flag is available in the context data. If not, it updates the message state to prompt the user to log in or register.
 * 
 * @bestPractices
 * - Ensure proper error handling for all possible HTTP response statuses.
 * - Use CSS classes instead of inline styles for better maintainability.
 * - Abstract session storage access into a utility function for better testability.
 * - Replace hardcoded strings with constants or localization for scalability.
 */
import React, { useContext, useEffect, useState } from 'react';
import BarradeNavegacion from '../../components/navegacionBarAll/barradeNavegacion';
import Login from '../../components/login.register/login.regsiter';
import { ScaleLoader } from 'react-spinners';
import AppContext from '../../contexts/ServiceContext';
import axios from 'axios';
import { DATA_APP_CONTEXT, URL_SERVER } from '../../contexts/constantesVar';
import { Link } from 'react-router-dom';

const ResendEmail = () => {

    const { dataApp, dispatch } = useContext(AppContext)
    const [spinner, setSpinner] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("Hemos enviado un link de confirmacion a tu correo, por favor revisa tu bandeja de entrada o carpeta de spam para confirmar tu cuenta. Si no recibiste el correo, puedes reenviarlo haciendo clic en el botón a continuación.");
    const [email, setEmail] = useState("")

    const resendEmail = async () => {
        const userData = JSON.parse(window.sessionStorage.getItem('userData'));

        console.log("userData", userData)

        dispatch({
            type: DATA_APP_CONTEXT,
            payload: {
                'RESP_ERROR_LOGIN': '',
            }
        })

        if (!userData?.SEND_EMAIL) return;

        if (!userData) {
            setMessage("No se ha encontrado información de usuario. Por favor, inicia sesión o registrate nuevamente.");
            return;
        }
        const token = userData.token;

        setMessage("Reenviando ...");
        setSpinner(true);
        setError("");
        try {
            const response = await axios.post(`${URL_SERVER}/customer/resend-email`, { token });
            if (response.data.success) {


                setMessage(response.data.message);
            } else {
                setMessage(response.data.message);

            }
        } catch (error) {

            if (error.response?.status === 403) {

                setMessage(error.response.data.message || "Error al reenviar el correo. Por favor, intenta nuevamente.");
                return;

            }
            if (error.response?.status === 503) {

                setMessage(error.response.data.message || "Error del servidor.");
                return;

            }
            if (error.response?.status === 401) {
                window.sessionStorage.removeItem('userData');
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: {
                        'token': '',
                        'SEND_EMAIL': false,
                        'VERIFICAR_EMAIL': false,
                        "VALIDAR_USER": false,
                        "USER_ID": '',
                        "USER_NAME": '',
                    }
                })
                window.localStorage.setItem("dataUser", JSON.stringify(
                    {
                        'token': '',
                        'SEND_EMAIL': false,
                        'VERIFICAR_EMAIL': false,
                        "VALIDAR_USER": false,
                        "USER_ID": '',
                        "USER_NAME": '',
                    }
                ))

                setMessage(error.response.data.message || "Error de autenticación. Por favor, inicia sesión nuevamente.");
                return;

            }
        } finally {
            setSpinner(false);
        }

    }

    useEffect(() => {
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: {
                "LOGIN_SPINNER": false,
                "ERROR_USER": false,
                "RESP_ERROR_LOGIN": ""
            }
        })
    }
        , []);

    return (
        <>
            <div>
                <BarradeNavegacion />
                <Login />


                <div className='conatainer-home' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className='conatainer-home-resp' style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column' }} >
                        <div
                            style={{
                                backgroundColor: "#d4edda",
                                color: "#155724",
                                padding: "15px",
                                borderRadius: "5px",
                                border: "1px solid #c3e6cb",
                                marginBottom: "20px",
                                textAlign: "center",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <p>{
                            (dataApp?.SEND_EMAIL&&message !== 'Reenviando ...'&&dataApp?.RESP_ERROR_LOGIN)?dataApp?.RESP_ERROR_LOGIN:message}</p>
                        </div>
                        {dataApp?.SEND_EMAIL ?
                            <button
                                style={{
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    maxWidth: "300px",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    textAlign: "center",
                                    margin: "10px auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "rgb(241, 218, 3)",
                                    color: "#212121",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                className="btn-small"
                                onClick={

                                    resendEmail
                                }
                            >
                                {spinner ? <ScaleLoader size={10} /> : 'Volver a enviar el link de activacion'}
                            </button>

                            :

                            <Link
                                style={{
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    maxWidth: "200px",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    textAlign: "center",
                                    margin: "10px auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "rgb(241, 218, 3)",
                                    color: "#212121",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                to="#!" className='btn-small  modal-trigger' data-target="modal1">Iniciar o Registrarse</Link>

                        }
                    </div>
                </div>

            </div>
        </>

    )
}


export default ResendEmail