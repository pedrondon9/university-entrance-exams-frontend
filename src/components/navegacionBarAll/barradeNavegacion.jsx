import React,{useContext} from 'react'
import "./barradeNavegacion.css"
import { Link } from 'react-router-dom'
import { BsListUl } from "react-icons/bs";
import Sinav from './sideNav';
import AppContext from '../../contexts/ServiceContext';
import { EXAMEN_ID, URL_PDF } from '../../contexts/constantesVar';
function BarradeNavegacion() {
    const {dispatch} = useContext(AppContext)

    const LimpiarUrlPdf = ()=>{


    }
    return (
        <>
            <Sinav />
            <nav className='horizontal-nav-bar'>
                <div className="nav-wrapper container horizontal-nav-bar-resp">
                    <div className='logo-container'>
                        <Link to="/" onClick={()=>{LimpiarUrlPdf()}} className="brand-logo left"><img src={"https://res.cloudinary.com/mumbex/image/upload/v1670000865/logo_fsuyxf.png"} alt="" /></Link>
                    </div>
                    <ul id="nav-mobile" className="right hide-on-med-and-down nav-link-container">
                        {/* <li><Link to="/upload">Subir examen</Link></li> */}
                        {/* <li><Link to="/deleteExammm">Borrar Examenes</Link></li> */}
                    </ul>
                    <div className="horizontal-nav-bar-icon-list">
                        <Link to="#!" data-target="slide-out-nav" className="sidenav-trigger">
                            <BsListUl size={40} color={"#000000"} />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default BarradeNavegacion