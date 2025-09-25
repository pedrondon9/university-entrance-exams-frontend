import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaMobileAlt, FaCalendarAlt } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { AiFillInstagram, AiFillYoutube, AiFillLinkedin } from 'react-icons/ai'


const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-container-principal'>
                <div className='footer-container-principal-resp'>
                    <div className="mumbexMensaje">
                        <h2>Tu comentario nos importa</h2>
                        <form className='formularioMensaje' >
                            <div className='inputFormContainer'>
                                <input type="tex" className='inputComment nombre ' required name='nombre' placeholder='Nombre...' />
                                <input type="emai" className='inputComment correo' required name='correo' placeholder='Correo...' />
                            </div>
                            <textarea name="mensaje" required className='textArea' placeholder='Mensaje...' ></textarea>
                            <button type='submit' className='botonEnviar'>Enviar</button>
                        </form>
                    </div>
                    {
                        <div className="footer-redesSociales-contact">
                            <div className="mumbexInfo-info-contact ">
                                <div className="mumbexInfo ">
                                    <h2>Pedro Ndong Ondo Avomo</h2>
                                    <h3>Building by Pedro Ndong Ondo Avomo</h3>
                                </div>
                            </div>
                            <div className="redesSociales">
                                <a
                                    className="redes-items"
                                    href="https://www.youtube.com/@pedrondon9"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiFillYoutube />
                                </a>
                                <a
                                    className="redes-items"
                                    href="https://linkedin.com/in/pedro-ndong-ondo-avomo-115401354"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiFillLinkedin />
                                </a>
                            </div>
                        </div>
                    }

                </div>


            </div>
            {<div className="footerFinal">
                <div className="copiright">
                    mumbeX todos los derechos reservados © 2025 (Pedro Ndong Ondo Avomo)
                </div>
                <div className="menuFooter">
                    <Link className='items' to="/">Inicio</Link>
                    <Link className='items' to="/servicios">Servicios</Link>
                    <Link className='items' to="/productos">Productos</Link>
                    <Link className='items' to="/nosotros">Nosotros</Link>
                    <Link className='items' to="/blog">Blog</Link>
                </div>
            </div>}
        </div>
    )
}

export default Footer