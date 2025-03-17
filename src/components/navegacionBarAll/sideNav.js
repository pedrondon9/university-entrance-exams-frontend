import React, { useContext, useEffect } from 'react'
import AppContext from '../../contexts/ServiceContext'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import "./sinav.css"


const Sinav = () => {
    const { } = useContext(AppContext)

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
                    <Link onClick={() => { Destruir() }} to="/" className="collection-item  ">Inicio</Link>
                    {/*<Link onClick={() => { Destruir() }} to="/upload" className="collection-item ">Agregar Examen</Link>*/}  
                </div>
            </li>
        </ul>
    )
}

export default Sinav

