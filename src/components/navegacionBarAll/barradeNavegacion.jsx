import React, { useContext } from 'react'
import "./barradeNavegacion.css"
import { Link, useLocation } from 'react-router-dom'
import { BsListUl } from "react-icons/bs";
import Sinav from './sideNav';
import AppContext from '../../contexts/ServiceContext';
import { DATA_APP_CONTEXT } from '../../contexts/constantesVar';
function BarradeNavegacion() {
    const { dispatch, dataApp } = useContext(AppContext)

    const location = useLocation()

    const currentSegment = location.pathname;



    const LimpiarUrlPdf = () => {


    }
    const LogOut = () => {
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
    return (
        <>
            <Sinav />
            <nav className='horizontal-nav-bar'>
                <div className="nav-wrapper container horizontal-nav-bar-resp">
                    <div className='container-logo-username'>
                        <div className='logo-container'>
                            <Link to="/" onClick={() => { LimpiarUrlPdf() }} className="brand-logo left"><img src={"https://res.cloudinary.com/mumbex/image/upload/v1670000865/logo_fsuyxf.png"} alt="" /></Link>
                        </div>
                        <div className="user-name-container" >
                            <span style={{ color: '#212121', fontWeight: 'bold', }}>
                                {dataApp.USER_NAME ? `Hi!, ${dataApp.USER_NAME.slice(0, 7)}..` : ''}
                            </span>
                        </div>
                    </div>
                    <div className='nav-link-container'>
                        <div className='nav-container'>
                            <Link style={{ color: currentSegment === '/' ? '#dd2c00' : '#212121', textDecoration: currentSegment === '/' ? 'underline' : "none" }} to="/">Inicio</Link>
                            <Link style={{ color: currentSegment === '/upload' ? '#dd2c00' : '#212121', textDecoration: currentSegment === '/upload' ? 'underline' : "none" }} to="/upload">Subir</Link>
                            {dataApp.VALIDAR_USER &&
                                <>
                                    <Link style={{ color: currentSegment === '/deleteExammm' ? '#dd2c00' : '#212121', textDecoration: currentSegment === '/deleteExammm' ? 'underline' : "none" }} to="/deleteExammm">Tus  Examenes</Link>

                                </>
                            }
                            {dataApp?.VALIDAR_USER ?
                                <Link onClick={LogOut} style={{ marginLeft: "50px" }} to="#">Cerrar</Link>

                                :
                                <Link className='modal-trigger' data-target="modal1" style={{ marginLeft: "50px" }} to="#">Login</Link>

                            }
                        </div>
                        <div className="horizontal-nav-bar-icon-list">
                            <Link to="#!" data-target="slide-out-nav" className="sidenav-trigger">
                                <BsListUl size={40} color={"#000000"} style={{ backgroundColor: '#25CEF0', borderRadius: "5px", paddingInline: "3px" }} />
                            </Link>
                        </div>
                    </div>



                </div>
            </nav>
        </>
    )
}

export default BarradeNavegacion