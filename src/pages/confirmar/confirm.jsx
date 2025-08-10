import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import "animate.css"
import axios from 'axios';
import AppContext from '../../contexts/ServiceContext';
import { DATA_APP_CONTEXT, URL_SERVER, USER_ID, USER_NAME, VALIDAR_USER } from '../../contexts/constantesVar';
import "./confirm.css"
import axiosConfigs from '../../components/axiosConfig';


function Confir() {
    const { user_id, dispatch, validarUser } = useContext(AppContext)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [spinner, setSpinner] = useState(true)
    const { id } = useParams()
    let navigate = useNavigate();

    console.log(id, "id de confirmacion")

    const Confirmar = async () => {
        setErrorMessage("")
        setSpinner(true)
        try {
            const user = await axiosConfigs({
                method: "post",
                data: { "token": id },
                url: `${URL_SERVER}/customer/active-count`
            })

            console.log(user)
            if (user.data.success) {
                const dataUser = {
                    'token': "",
                    'SEND_EMAIL': false,
                    "VALIDAR_USER": false,
                    "USER_ID": "",
                    "USER_NAME": "",
                }
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload:dataUser
                })


                window.localStorage.setItem("dataUser", JSON.stringify(dataUser))
                window.sessionStorage.setItem("logUp", JSON.stringify(
                    {

                    }
                ))
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
                    "token": '',
                    "USER_ID": '',
                    "USER_NAME": '',
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