
/**
 * Represents the initial state of the application.
 * 
 * @typedef {Object} InitialState
 * @property {Object} dataApp - The main application data, either loaded from sessionStorage ('userData') or default values.
 * @property {string} dataApp.DATA_RICHE_TEXT - Stores rich text data.
 * @property {string} dataApp.token - Authentication token for the user.
 * @property {string} dataApp.USER_ID - The unique identifier for the user.
 * @property {string} dataApp.USER_NAME - The name of the user.
 * @property {string} dataApp.USER_LINK_PHOTO - URL to the user's profile photo.
 * @property {boolean} dataApp.VALIDAR_USER - Indicates if the user has been validated.
 * @property {boolean} dataApp.VERIFICAR_EMAIL - Indicates if the user's email needs to be verified.
 * @property {boolean} dataApp.SEND_EMAIL - Indicates if an email is being sent.
 * @property {boolean} dataApp.LOGIN_SPINNER - Shows the login loading spinner.
 * @property {string} dataApp.RESP_ERROR_LOGIN - Stores the login error response message.
 * @property {boolean} dataApp.ERROR_USER - Indicates if there was a user error.
 * @property {?any} dataApp.PDF_VIEW_FORM - Stores the PDF view form data, or null if not set.
 * @property {?string} dataApp.URL_PDF - URL to the PDF, or null if not set.
 * @property {string} dataApp.EXAMEN_ID - The current exam ID.
 * @property {boolean} dataApp.CARGAR_COMMENT - Indicates if comments are being loaded.
 * @property {boolean} dataApp.ADD_COMMENT_SPINNER - Shows the add comment loading spinner.
 * @property {boolean} dataApp.ADD_COMMENT_RESPONSE_SPINNER - Shows the add comment response loading spinner.
 * @property {boolean} dataApp.CARGAR_RESPONSE_COMENT - Indicates if comment responses are being loaded.
 * @property {boolean} dataApp.ADD_RESPONSE_RESPONSE_SPINNER - Shows the add response to response loading spinner.
 * @property {boolean} dataApp.CARGAR_RESPONSE_RESPONSE - Indicates if responses to responses are being loaded.
 * @property {boolean} dataApp.SPINNER_CARGAR_EXAMENES - Shows the loading spinner for exams.
 * @property {string} dataApp.PAGINA_SIGUIENTE - The next page to navigate to.
 */
export const InitialState = {
    dataApp: JSON.parse(window.sessionStorage.getItem('userData')) ? JSON.parse(window.sessionStorage.getItem('userData')) : {
        DATA_RICHE_TEXT: "",

        token: "",
        USER_ID: "",
        USER_NAME: "",
        USER_LINK_PHOTO: "",
        VALIDAR_USER: false,

        VERIFICAR_EMAIL: false,
        SEND_EMAIL: false,
        LOGIN_SPINNER: false,
        RESP_ERROR_LOGIN: "",
        ERROR_USER: false,

        PDF_VIEW_FORM: null,
        URL_PDF: null,
        EXAMEN_ID: "",
        CARGAR_COMMENT: false,
        ADD_COMMENT_SPINNER: false,
        ADD_COMMENT_RESPONSE_SPINNER: false,
        CARGAR_RESPONSE_COMENT: false,
        ADD_RESPONSE_RESPONSE_SPINNER: false,
        CARGAR_RESPONSE_RESPONSE: false,
        SPINNER_CARGAR_EXAMENES: false,


        PAGINA_SIGUIENTE: "",



    },

}