import React, { useContext, useState } from 'react'
import {
    ADD_COMMENT_RESPONSE_SPINNER, ADD_COMMENT_SPINNER,
    ADD_RESPONSE_RESPONSE_SPINNER,
    CARGAR_COMMENT, CARGAR_RESPONSE_COMENT, CARGAR_RESPONSE_RESPONSE, DATA_RICHE_TEXT, ERROR_USER, EXAMEN_ID, LOGIN_SPINNER, PAGINA_SIGUIENTE, PDF_VIEW_FORM,
    RESP_ERROR_LOGIN,
    SPINNER_CARGAR_EXAMENES,
    URL_PDF, USER_ID, USER_LINK_PHOTO, USER_NAME, VALIDAR_USER,DATA_APP_CONTEXT
} from './constantesVar'




const AppReducer = (state, action) => {
    const { payload, type } = action;

    switch (type) {
        //VISUALISAR ERROR DEL LOGIN SI EXISTE
        case ERROR_USER:
            return {
                ...state ,
                userError:payload,
            };
        //RESPUESTA DEL SERVOR AL INICIAR SESION "MENSAGE ENVIADO"
        case RESP_ERROR_LOGIN:
            return {
                ...state ,
                errorResponseLogin:payload,
            };
        //ACTIVAR EL SPINNER CUANDO SE ENVAI DATOS DEL LOGIN
        case LOGIN_SPINNER:
            return {
                ...state ,
                loginSpinner:payload,
            };
        //VALIDAR USER CON VARIABLE BOLEANO
        case VALIDAR_USER:
            return {
                ...state ,
                validarUser:payload,
            };
        //ACTIVAR SPINNER PARA CARGAR EXAMENES
        case SPINNER_CARGAR_EXAMENES:
            return {
                ...state,
                spinnerCargarExamenes:payload,
            };
        //ACTIVAR SPINNER PARA CARGAR LA RESPUESTA DE LA RESPUESTA DEL COMENTARIO PRINCIPAL
        case CARGAR_RESPONSE_RESPONSE:
            return {
                ...state,
                spinnerCargarResponsRespons: payload,
            };
        //ACTIVAR SPINNER CUANDO SE AÑADE LA RESPUESTA DE LA RESPUESTA DEL  COMENTARIO PRINCIPAL
        case ADD_RESPONSE_RESPONSE_SPINNER:
            return {
                ...state,
                spinnerAddResponsRespons: payload,
            };
        //ACTIVAR SPINNER PARA CARGAR LA RESPUESTA DEL COMENTARIO PRINCIPAL
        case CARGAR_RESPONSE_COMENT:
            return {
                ...state,
                spinnerCargarCommentRespons: payload,
            };
        //ACTIVAR SPINNER CUANDO SE AÑADE LA RESPUESTA  COMENTARIO PRINCIPAL
        case ADD_COMMENT_RESPONSE_SPINNER:
            return {
                ...state,
                spinnerAddCommentRespons: payload,
            };
        //ACTIVAR SPINNER CUANDO SE AÑADE COMENTARIO
        case ADD_COMMENT_SPINNER:
            return {
                ...state,
                spinnerAddComment: payload,
            };
        //ACTIVER SPINNER DURANTE LA CARGA DE COMENTARIOS
        case CARGAR_COMMENT:
            return {
                ...state,
                spinnerComment: payload,
            };
        //CAMBIAR EL ID DEL EXAMEN

        case EXAMEN_ID:
            return {
                ...state,
                examId: payload,
            };
        //cambiar el url del pdf
        case URL_PDF:
            return {
                ...state,
                pdfUrl: payload,
            };
        case DATA_RICHE_TEXT:
            return {
                ...state,
                dataRicheText: payload,
            };
        case PDF_VIEW_FORM:
            return {
                ...state,
                formPdfView: payload,
            };
        case PAGINA_SIGUIENTE:
            return {
                ...state,
                paginaSiguiente: payload,
            };
        case USER_ID:
            return {
                ...state,
                userId: payload,
            };
        case USER_NAME:
            return {
                ...state,
                userName: payload,
            };
        case USER_LINK_PHOTO:
            return {
                ...state,
                userLinkPhoto: payload,
            };
        case DATA_APP_CONTEXT :
            return {
                ...state,
                dataApp:{
                    ...state.dataApp,
                    ...payload

                }
            }
        default:
            return state;
    }

}

export default AppReducer