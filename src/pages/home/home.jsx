import { useEffect, useRef, useMemo, useState, useContext, useCallback } from 'react';
import "./home.css"
import { IoChatboxOutline } from "react-icons/io5"
import { Link } from 'react-router-dom';
import { AiOutlineLike } from "react-icons/ai"
import parse from 'html-react-parser';
import AppContext from '../../contexts/ServiceContext';
import Editor2s from '../../components/edit2';
import Editor3s from '../../components/edit3';
import VerPdf from '../../components/pdf/verPdf';
import MenuLaterals from '../../components/menuLateral/menuLaterals';
import BarradeNavegacion from '../../components/navegacionBarAll/barradeNavegacion';
import ImageViewer from 'react-simple-image-viewer';
import Sinav from '../../components/navegacionBarAll/sideNav';
import Elegir from '../../components/elegirTipo/elegir';
import { ScaleLoader, MoonLoader, PulseLoader } from "react-spinners";
import InfiniteScroll from 'react-infinite-scroll-component';
import { DATA_APP_CONTEXT, URL_SERVER } from '../../contexts/constantesVar';
import SinavMat from '../../components/sinavMaterias/sinavMat';
import Login from '../../components/login.register/login.regsiter';
import axios from 'axios';
import Editors from '../../components/editoresAddImg/edits';
import ImageView from '../../components/viewImagesComments/imageView';
import Footer from '../../components/footer/footer';
import Comentario from './comment';
import Comentarios from './commentt';







export default function Home() {
  const { dataRicheText, GetDataComent, dataComentario, GetDataComentResponse, ScrollInfinito, dispatch, LoadListExam,
    datosGetComentResponse, dataComentarioResp, GetDataRespComentResponse, examId, more, spinnerCargarExamenes,
    dataRespComentarioResp, spinnerComment, spinnerCargarCommentRespons, spinnerCargarResponsRespons, pdfUrl, dataApp } = useContext(AppContext)
  const [text, setText] = useState("")
  const code = window.localStorage.getItem("code")
  const [verResp1, setverResp1] = useState("")
  const [imageArray, setImageArray] = useState([])
  const [verResp2, setverResp2] = useState("")
  const [datos, setDatos] = useState("")
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);


  const openImageViewer = useCallback((index) => {
    console.log(index)
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };






  const VerResp1 = (id) => {
    if (id) {
      GetDataComentResponse(id)
      setverResp1(id)
      setverResp2("")
    } else {
      setverResp1(id)
      setverResp2("")
    }

  }

  const VerResp2 = (id) => {
    if (id) {
      GetDataRespComentResponse(id)
      setverResp2(id)
    } else {
      setverResp2("")
    }

  }

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
                  <div>
                    <h3>Publica tu duda</h3>
                    <h6>Para recibir ayuda de los demas !</h6>
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
