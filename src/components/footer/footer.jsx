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
                        <h2>Mensaje</h2>
                        <form className='formularioMensaje' >
                            <div className='inputFormContainer'>
                                <input type="text" className='inputComment nombre' required name='nombre' placeholder='Nombre...' />
                                <input type="mail" className='inputComment correo' required name='correo' placeholder='Correo...' />
                            </div>
                            <textarea name="mensaje" required className='textArea' placeholder='Mensaje...' ></textarea>
                            <button type='submit' className='botonEnviar'>Enviar</button>
                        </form>
                    </div>
                    {
                    <div className="footer-redesSociales-contact">
                        <div className="mumbexInfo-info-contact ">
                            <div className="mumbexInfo ">
                                <h2>mumbeX</h2>
                                <h3>Empresa de tecnología</h3>
                                <h3>Especializada en software</h3>
                                <h3>Asistencia técnica en TI</h3>
                                <h3>Somos tu mejor opción</h3>

                            </div>
                            <div className="mumbexContacto ">
                                <h2>Contacto</h2>
                                <h3><span><FaMapMarkerAlt /></span> Guinea Ecuatoria, Malabo</h3>
                                <h3><span><FaMobileAlt /></span> +240 222 058 540 /+240 222 122 832</h3>
                                <h3><span><HiMail /></span> mumbex2022@outlook.com</h3>
                                <h3><span><FaCalendarAlt /></span> Siempre disponibles</h3>
                            </div>
                        </div>
                        <div className="redesSociales">
                            <Link className="redes-items" to="/"><AiFillYoutube /></Link>
                            <Link className="redes-items" to="/"><AiFillInstagram /></Link>
                            <Link className="redes-items" to="/"><AiFillLinkedin /></Link>
                        </div>
                    </div> 
                    }

                </div>


            </div>
            { <div className="footerFinal">
                <div className="copiright">
                    mumbeX todos los derechos reservados © 2022
                </div>
                <div className="menuFooter">
                    <Link className='items' to="/">Inicio</Link>
                    <Link className='items' to="/servicios">Servicios</Link>
                    <Link className='items' to="/productos">Productos</Link>
                    <Link className='items' to="/nosotros">Nosotros</Link>
                    <Link className='items' to="/blog">Blog</Link>
                </div>
            </div> }
        </div>
    )
}

export default Footer