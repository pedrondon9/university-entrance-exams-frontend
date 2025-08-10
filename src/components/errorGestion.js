const { LOGIN_SPINNER, ERROR_USER, RESP_ERROR_LOGIN, DATA_APP_CONTEXT } = require("../contexts/constantesVar")

const ErrorG = (dispatch, error) => {

    console.log("ErrorG", error)

    if (error.response?.status === 401) {

        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { 
                "LOGIN_SPINNER": false ,
                "ERROR_USER": true,
                "RESP_ERROR_LOGIN": error.response.data.message || "Error de autenticacion"},
                "token": '',
                "SEND_EMAIL": false,
                "VALIDAR_USER": false,
                "USER_ID": '',
                "USER_NAME": '',

        })
      
        return

    }
    if (error.response?.status === 403) {

        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { 
                "LOGIN_SPINNER": false ,
                "ERROR_USER": true,
                "RESP_ERROR_LOGIN": error.response.data.message || "Error de autenticacion"}

        })
      
        return

    }

    if (error.request) {
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { 
                "LOGIN_SPINNER": false ,
                "ERROR_USER": true,
                "RESP_ERROR_LOGIN": "Comprueba tu coneccion a internet"}

        })

        return

    } else {
        dispatch({
            type: DATA_APP_CONTEXT,
            payload: { 
                "LOGIN_SPINNER": false ,
                "ERROR_USER": true,
                "RESP_ERROR_LOGIN": "Comprueba tu coneccion a internet"}

        })
        return

    }
}

module.exports = {
    ErrorG
}