import React, { useState, useEffect, useContext } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { MoonLoader } from "react-spinners";
import "animate.css"
import axios from 'axios';
import AppContext from '../../contexts/ServiceContext';
import { DATA_APP_CONTEXT, URL_SERVER, USER_ID, USER_NAME, VALIDAR_USER } from '../../contexts/constantesVar';
import "./confirm.css"




function Confir() {
    const { user_id, dispatch ,validarUser} = useContext(AppContext)
    const { id } = useParams()
    let navigate = useNavigate();

    const Confirmar = async () => {
        try {
            const user = await axios({
                method: "post",
                data: { "token": id },
                url: `${URL_SERVER}/confirmar`
            })
            if (user.data.success) {
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: {
                        "VALIDAR_USER":true,
                        "USER_ID":user.data._id,
                        "USER_NAME":user.data.fullname,
                        'TOKEN': user.data.token,

                    }
                })
                
                
                window.localStorage.setItem("dataUser",JSON.stringify(
                    {
                        'token': user.data.token,
                        'SEND_EMAIL':true,
                        'VERIFICAR_EMAIL':false,
                        "VALIDAR_USER":true,
                        "USER_ID":user.data._id,
                        "USER_NAME":user.data.fullname,
                    }
                ))
                navigate("/")
            } else {
                
                console.log("wefhuf sdf sbnd fsbdff")
                dispatch({
                    type: DATA_APP_CONTEXT,
                    payload: {
                        "VALIDAR_USER":false,
                        "USER_ID":'',
                        "USER_NAME":'',

                    }
                })
            }
        } catch (error) {
            dispatch({
                type: DATA_APP_CONTEXT,
                payload: {
                    "VALIDAR_USER":false,
                    "USER_ID":'',
                    "USER_NAME":'',
                }
            })
        }

    }
    useEffect(() => {
        Confirmar()
    },[])
    return (
        <div className='confirmContainer'>
            <div className='confirmContainerResp'>

                {true ? <div className='confirmContainerLoader'>
                    <MoonLoader color={"blue"} loading={true} size={40} />
                    <p>Verificando...</p>
                </div> :
                    <div className='containerFormCodigo'>
                        <h1>Bienvenido a baconline donde podras resolver tus dudas y compartir tus examenes de selectividad</h1>
                        <form id="" className='formCodigo'>
                            <input
                                type="text"
                                className="codigo"
                                name="codigo" required
                                id="codigo"
                                placeholder=""
                            />

                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default Confir