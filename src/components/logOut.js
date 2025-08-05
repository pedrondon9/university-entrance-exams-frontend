import React, { useContext } from 'react';
import AppContext from '../contexts/ServiceContext';
import { DATA_APP_CONTEXT } from '../contexts/constantesVar';

const LogOut = (dispatch) => {
    const data = {
        "VALIDAR_USER": false,
        "USER_ID": "",
        "USER_NAME": "",
        'token': "",
        'SEND_EMAIL': false,
        "LOGIN_SPINNER": false,
        "RESP_ERROR_LOGIN": "",
        "ERROR_USER": false,

    }
    dispatch({
        type: DATA_APP_CONTEXT,
        payload: data
    })

    window.localStorage.setItem("dataUser", JSON.stringify(data))
}

export default LogOut;