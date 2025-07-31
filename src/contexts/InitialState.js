
export const InitialState = {
    dataApp:JSON.parse(window.sessionStorage.getItem('userData'))?JSON.parse(window.sessionStorage.getItem('userData')):{
        URL_SERVER:false,
        DATA_RICHE_TEXT:"",
        PAGINA_SIGUIENTE :"",
        USER_ID :"",
        USER_NAME :"",
        USER_LINK_PHOTO :"",
        VALIDAR_USER :false,
        LOGIN_SPINNER :false,
        RESP_ERROR_LOGIN :"",
        ERROR_USER :false,
        PDF_VIEW_FORM :null,
        URL_PDF :null,
        EXAMEN_ID :"",
        CARGAR_COMMENT:false, 
        ADD_COMMENT_SPINNER :false,
        ADD_COMMENT_RESPONSE_SPINNER :false,
        CARGAR_RESPONSE_COMENT :false,
        ADD_RESPONSE_RESPONSE_SPINNER :false,
        CARGAR_RESPONSE_RESPONSE :false,
        SPINNER_CARGAR_EXAMENES:false,
        VERIFICAR_EMAIL:false,
        SEND_EMAIL:false,
        
    },

}