import React, { useState, useEffect, useContext } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { MoonLoader } from "react-spinners";
import "animate.css"
import axios from 'axios';
import AppContext from '../../contexts/ServiceContext';
import { URL_SERVER, USER_ID, USER_NAME, VALIDAR_USER } from '../../contexts/constantesVar';
import "./confirm.css"




function Confir() {
    const { user_id, dispatch ,validarUser} = useContext(AppContext)
    const { id } = useParams()
    let navigate = useNavigate();

    const Confirmar = async () => {
        try {
            const datos = await axios({
                method: "post",
                data: { "tokenId": id },
                url: `${URL_SERVER}/confirmar`
            })
            console.log(datos)
            if (datos.data) {
                dispatch({
                    type: VALIDAR_USER,
                    payload: {"VALIDAR_USER":true}
                })
                dispatch({
                    type: USER_ID,
                    payload: {"USER_ID":datos.data.id}
                })
                dispatch({
                    type: USER_NAME,
                    payload: {"USER_NAME":datos.data.user}
                })
                
                window.localStorage.setItem("code",datos.data.code)
                navigate("/")
            } else {
                
                console.log("wefhuf sdf sbnd fsbdff")
                dispatch({
                    type: VALIDAR_USER,
                    payload: {"VALIDAR_USER":false}
                })
                dispatch({
                    type: USER_ID,
                    payload: {"USER_ID":""}
                })
                dispatch({
                    type: USER_NAME,
                    payload: {"USER_NAME":""}
                })
            }
        } catch (error) {
            dispatch({
                type: VALIDAR_USER,
                payload: {"VALIDAR_USER":false}
            })
            dispatch({
                type: USER_ID,
                payload: {"USER_ID":""}
            })
            dispatch({
                type: USER_NAME,
                payload: {"USER_NAME":""}
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