import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import "animate.css"
import axios from 'axios';
import AppContext from '../../contexts/ServiceContext';
import { DATA_APP_CONTEXT, URL_SERVER, USER_ID, USER_NAME, VALIDAR_USER } from '../../contexts/constantesVar';
import "./confirm.css"


function Confir() {
    const { user_id, dispatch, validarUser } = useContext(AppContext)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [spinner, setSpinner] = useState(true)
    const { id } = useParams()
    let navigate = useNavigate();

    const Confirmar = async () => {
        setErrorMessage("")
        setSpinner(true)
        try {
            const user = await axios({
                method: "post",
                data: { "token": id },
                url: `${URL_SERVER}/customer/active-count`
            })

            console.log(user)
            if (user.data.success) {
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: {
                        "VALIDAR_USER": true,
                        "USER_ID": user.data.userData._id,
                        "USER_NAME": user.data.userData.fullname,
                        'token': user.data.token,
                        'SEND_EMAIL': false,
                    }
                })


                window.localStorage.setItem("dataUser", JSON.stringify(
                    {
                        'token': user.data.token,
                        'SEND_EMAIL': false,
                        "VALIDAR_USER": true,
                        "USER_ID": user.data.userData._id,
                        "USER_NAME": user.data.userData.fullname,
                    }
                ))
                navigate("/")
            } else {
                setErrorMessage(user.data.message || "Error de autenticacion")
                console.log("wefhuf sdf sbnd fsbdff")
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: {
                        "VALIDAR_USER": false,
                        "USER_ID": '',
                        "USER_NAME": '',

                    }
                })
            }
        } catch (error) {
            setSpinner(false)

            console.log(error)
            setErrorMessage(error.response?.data.message || "Error de autenticacion")
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: {
                    "VALIDAR_USER": false,
                    "USER_ID": '',
                    "USER_NAME": '',
                    "SEND_EMAIL": false,
                }
            })


        } finally {
            setSpinner(false)
        }

    }
    useEffect(() => {
        Confirmar()
    }, [])
    return (
        <div className='confirmContainer'>
            <div className='confirmContainerResp'>

                {
                    <div className='confirmContainerLoader'>
                        {spinner ?
                            <>
                                <MoonLoader color={"blue"} loading={true} size={40} />
                                <p>Verificando...</p>
                            </>
                            :
                            <>
                                <p>{errorMessage}</p>

                            </>
                        }
                    </div>

                }
            </div>
        </div>
    )
}

export default Confir