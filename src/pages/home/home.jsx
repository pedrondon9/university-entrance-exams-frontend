import { useEffect, useState, useContext, useCallback } from 'react';
import "./home.css"
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/ServiceContext';

import VerPdf from '../../components/pdf/verPdf';
import MenuLaterals from '../../components/menuLateral/menuLaterals';
import BarradeNavegacion from '../../components/navegacionBarAll/barradeNavegacion';

import { MoonLoader, PulseLoader } from "react-spinners";
import InfiniteScroll from 'react-infinite-scroll-component';
import { DATA_APP_CONTEXT } from '../../contexts/constantesVar';
import SinavMat from '../../components/sinavMaterias/sinavMat';
import Login from '../../components/login.register/login.regsiter';
import Editors from '../../components/editoresAddImg/edits';
import Footer from '../../components/footer/footer';
import Comentarios from './commentt';







export default function Home() {
  const { dataComentario, ScrollInfinito, dispatch, LoadListExam,
    examId, more,
    dataApp } = useContext(AppContext)










  const PaginationInfiniScroll = async () => {
    ScrollInfinito(examId)
  }





  useEffect(() => {
    LoadListExam()
    //confirmacion automatica del inicio de sesion
    //UserConfirm()
    //GetDataComent()

    //borrar la ruta del pdf actual
    dispatch({
      type: DATA_APP_CONTEXT,
      payload: { "EXAMEN_ID": null, "URL_PDF": null }
    })


  }, [])
  return (
    <>

      <BarradeNavegacion />
      <SinavMat />
      <Login />
      <>
        <div className='conatainer-home'>
          <div className='conatainer-home-resp'>
            <div className='conatainer-home-menu-lateral'>
              {/* menu lateral para elegir examen segun la convocatoria */}
              <div>
                {!dataApp.SPINNER_CARGAR_EXAMENES ?
                  <MenuLaterals />
                  :
                  <div className='cargar-examenes-spinner-container'>
                    <div className='cargar-examenes-spinner'>
                      <PulseLoader size={15} color={"#212121"} />
                    </div>

                    <p>cargando examenes...</p>
                  </div>
                }
              </div>
            </div>



            <div className='conatainer-home-pdf-edit-chat'>
              {/* <Elegir /> */}
              {/* el pdf del examen */}
              <VerPdf />

              <div className='texto-home' style={{ display: "none" }}>
                <img src={"https://res.cloudinary.com/mumbex/image/upload/v1669741148/imgf_jykhwy.png"} alt="" />
                {/* <h4 className=''><span>a continuacion puedes publicar la duda que tienes sobre el examen o responder a las dudas publicadas</span></h4> */}
              </div>


              <div className='block-chat-container'>

                <div className='block-chat-container-resp'>
                  <div className='titulo-chat-home'>
                    <h4 className='titulo-3'>Publica tu duda</h4>
                    <p className='parafo'>Para recibir ayuda de los demas !</p>
                  </div>

                  {/* editor del comentrio principal */}
                  <Editors />

                  {/* infinity scroll de comentarios */}
                  {!dataApp?.SPINNER_CARGAR_EXAMENES ?
                    <>
                      {dataApp?.URL_PDF ?
                        <InfiniteScroll
                          dataLength={dataComentario?.length}
                          loader={<h1></h1>}
                          hasMore={more}
                          next={() => {

                            PaginationInfiniScroll()

                          }}>


                          <div>

                            {dataComentario.map((i, x) =>

                              <Comentarios comentario={i} key={i._id} />

                            )}
                          </div>
                          {/* fin de infinity scroll de comentarios */}
                        </InfiniteScroll>
                        :
                        <></>
                      }
                    </>
                    :

                    <div className='spinner-container-home'>
                      {/* spinner de carga de comentarios */}
                      <MoonLoader size={35} color={"#212121"} />
                    </div>
                  }


                </div>

              </div>
              :
              <></>


            </div>




          </div>
          <Link to="#!" className='btn btn-small boton-flotante sidenav-trigger' data-target="slide-out-nav-mat">Examenes</Link>
        </div>
      </>
      <Footer />
    </>

  )
}
