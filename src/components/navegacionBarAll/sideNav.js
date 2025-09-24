import React, { useContext, useEffect } from 'react'
import AppContext from '../../contexts/ServiceContext'
import { Link, useLocation } from 'react-router-dom'
import M from 'materialize-css'
import "./sinav.css"


const Sinav = () => {
    
    const { dataApp } = useContext(AppContext)

    const location = useLocation()


    const currentSegment = location.pathname;


    const BuscarConLink = (linkId) => {

    }
    const Destruir = () => {
        const elem = document.querySelector(".sideNavAll")
        var instance = M.Sidenav.getInstance(elem);
        instance.close()
    }

    useEffect(() => {
        const alls = document.querySelector(".sideNavAll")
        M.Sidenav.init(alls, {
            preventScrolling: false,
            inDuration: 150,
        })


        const collap = document.querySelector('.side-collap')

        M.Collapsible.init(collap, {
            preventScrolling: false,
            inDuration: 150,
            accordion: false,
            expandable: true
        })

    }, [])

    return (
        <ul id="slide-out-nav" className="collapsible side-collap  sidenav sideNavAll">
            <li>
                <div className="collection">
                    <Link style={{ color: currentSegment === '/' ? '#dd2c00' : '#212121', textDecoration: currentSegment === '/' ? 'underline' : "none" }} onClick={() => { Destruir() }} to="/" className="collection-item ">Inicio</Link>
                    <Link style={{ color: currentSegment === '/upload' ? '#dd2c00' : '#212121', textDecoration: currentSegment === '/upload' ? 'underline' : "none" }} onClick={() => { Destruir() }} to="/upload" className="collection-item ">Agregar Examen</Link>
                    <Link style={{ color: currentSegment === '/deleteExammm' ? '#dd2c00' : '#212121', textDecoration: currentSegment === '/deleteExammm' ? 'underline' : "none" }} onClick={() => { Destruir() }} to="/deleteExammm" className="collection-item ">Tus  Examenes</Link>
                    {dataApp?.VALIDAR_USER ?
                        <Link className="collection-item " onClick={() => { Destruir() }} style={{ marginTop: "50px" }} to="/deleteExammm">Cerrar</Link>

                        :
                        <Link className="collection-item " onClick={() => { Destruir() }} style={{ marginTop: "50px" }} to="/deleteExammm">Login</Link>

                    }
                </div>
            </li>
        </ul>
    )
}

export default Sinav

