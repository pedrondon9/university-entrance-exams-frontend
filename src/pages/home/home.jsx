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
import { EXAMEN_ID, URL_PDF, URL_SERVER, USER_ID, USER_NAME, VALIDAR_USER } from '../../contexts/constantesVar';
import SinavMat from '../../components/sinavMaterias/sinavMat';
import Login from '../../components/login/login';
import axios from 'axios';
import Editors from '../../components/editoresAddImg/edits';
import ImageView from '../../components/viewImagesComments/imageView';







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


  //verificacion automatico de sesion
  const UserConfirm = async () => {


    try {
      const datos = await axios({
        method: 'post',
        data: {
          'id': code,
        },
        url: `${URL_SERVER}/user_confirm_init`
      })
      if (datos.data) {
        dispatch({
          type: VALIDAR_USER,
          payload: { "VALIDAR_USER": true }
        })
        dispatch({
          type: USER_ID,
          payload: { "USER_ID": datos.data.id }
        })
        dispatch({
          type: USER_NAME,
          payload: { "USER_NAME": datos.data.user }
        })
        window.localStorage.setItem("code", datos.data.code)
      } else {
        dispatch({
          type: VALIDAR_USER,
          payload: { "VALIDAR_USER": false }
        })
        dispatch({
          type: USER_ID,
          payload: { "USER_ID": "" }
        })
        dispatch({
          type: USER_NAME,
          payload: { "USER_NAME": "" }
        })
      }
    } catch (error) {

      console.log(error)

    }

  }




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
    UserConfirm()
    //GetDataComent()

    //borrar la ruta del pdf actual
    dispatch({
      type: EXAMEN_ID,
      payload: { "EXAMEN_ID": null }
    })
    dispatch({
      type: URL_PDF,
      payload: { "URL_PDF": null }
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


                  {/* editor del comentrio principal */}
                  <Editors />
                  {/* infinity scroll de comentarios */}
                  {!dataApp?.SPINNER_CARGAR_EXAMENES ?
                    <>
                      {dataApp?.URL_PDF ?
                        <InfiniteScroll
                          dataLength={dataComentario.length}
                          loader={<h1></h1>}
                          hasMore={more}
                          next={() => {

                            PaginationInfiniScroll()

                          }}>


                          <div>

                            {dataComentario.map((i, x) =>

                              <div className='chat-container' key={x}>
                                {/* primer comentario el principal */}
                                <div className='chat-user-container'>

                                  <div className='chat-user-anounce'>
                                    <div className='chat-user-anounce-foto-perfil'><p>{i.userName[0]}</p></div>
                                    <div className='chat-user-anounce-perfilName-descripAnounce'>
                                      <div className='anounce-user-perfilName-date'><p className='user-name'>{i.userName}</p><p className='anounce-date'>{i.comentTime}</p></div>
                                    </div>
                                    <div className='anounce-description'>

                                      {i.coment == "" ? <></> : parse(i.coment)}
                                      {i.imagenes[0] ?
                                        <div className='anounce-description-img'>
                                          {i.imagenes[1] ?
                                            <>
                                              {i.imagenes.map((src, index) => (
                                                <img
                                                  className='imagenes-view'
                                                  src={src}
                                                  onClick={() => {
                                                    openImageViewer(index);
                                                    setImageArray(i.imagenes)
                                                  }}

                                                  key={index}
                                                  style={{ margin: '2px' }}
                                                  alt=""
                                                />
                                              ))}
                                            </>
                                            :
                                            <>
                                              {i.imagenes.map((src, index) => (
                                                <img
                                                  className='imagenes-view-big'
                                                  src={src}
                                                  onClick={() => {
                                                    openImageViewer(index);
                                                    setImageArray(i.imagenes)
                                                  }}

                                                  key={index}
                                                  style={{ margin: '2px' }}
                                                  alt=""
                                                />
                                              ))}
                                            </>
                                          }


                                          {isViewerOpen && (
                                            <ImageViewer
                                              src={imageArray}
                                              currentIndex={currentImage}
                                              disableScroll={true}
                                              closeOnClickOutside={true}
                                              onClose={closeImageViewer}
                                            />
                                          )}
                                        </div>
                                        :
                                        <></>
                                      }

                                      {/* {i.imagen1 ?
                                    <div className='anounce-description-img'>
                                      <Link to={"#"}>
                                        {i.imagen1 ?
                                          <img src={i.imagen1} />
                                          :
                                          <></>
                                        }
                                        {i.imagen2 ?
                                          <img src={i.imagen2} />
                                          :
                                          <></>
                                        }
                                        {i.imagen3 ?
                                          <img src={i.imagen3} />
                                          :
                                          <></>
                                        }
                                        {i.imagen4 ?
                                          <img src={i.imagen4} />
                                          :
                                          <></>
                                        }
                                      </Link>
                                    </div>
                                    :
                                    <></>
                                  } */}


                                    </div>
                                    <div className='anounce-icono'>

                                      <Link style={{ display: "none" }} to='#' onClick={() => console.log("+1")} className='anounce-respuestas-like'><span className='anounce-respuestas-like-num'>{i.comentLike}</span><AiOutlineLike className='anounce-respuestas-like-icon' size={20} color={"#000000"} /></Link>
                                      {verResp1 == i._id ?
                                        <Link to="#!" onClick={() => VerResp1("")} className='anounce-respuestas-num-conatainer'><span className='anounce-respuestas-num'>{/*i.comentRepons*/}</span><IoChatboxOutline className='anounce-icono-respuestas' size={18} color={"blue"} /><span className='anounce-responder-text'>ocultar respuestas</span></Link>

                                        :
                                        <Link to="#!" onClick={() => VerResp1(i._id)} className='anounce-respuestas-num-conatainer'><span className='anounce-respuestas-num'>{/*i.comentRepons*/}</span><IoChatboxOutline className='anounce-icono-respuestas' size={18} color={"blue"} /><span className='anounce-responder-text'>respuestas</span></Link>
                                      }
                                    </div>


                                    {verResp1 == i._id ?
                                      <>


                                        {dataApp?.CARGAR_RESPONSE_COMENT ?
                                          <div className='spinner-cargar-response-coment-principal-container'>
                                            <MoonLoader size={25} color={"#212121"} />
                                          </div>
                                          :
                                          <>
                                            {dataComentarioResp.map((e, q) =>

                                              <div className='chat-user-response'>
                                                {/* segundo comentario respuesta del comentario principal */}
                                                <div className='chat-user-response-foto-perfil'><p>{e.userName[0]}</p><div className='i'></div></div>
                                                <div className='chat-user-response-perfilName-descripAnounce'>
                                                  <div className='response-user-perfilName-date'><p className='user-name-response'>{e.userName}</p><p className='anounce-date-response'>{e.comentTime}</p></div>
                                                </div>
                                                <div className='response-description'>
                                                  <p>{e.coment == "" ? <></> : parse(e.coment)}</p>
                                                  {e.imagenes[0] ?
                                                    <div className='anounce-description-img'>
                                                      {e.imagenes[1] ?
                                                        <>
                                                          {e.imagenes.map((src, index) => (
                                                            <img
                                                              className='imagenes-view'
                                                              src={src}
                                                              onClick={() => {
                                                                openImageViewer(index);
                                                                setImageArray(e.imagenes)
                                                              }}

                                                              key={index}
                                                              style={{ margin: '2px' }}
                                                              alt=""
                                                            />
                                                          ))}
                                                        </>
                                                        :
                                                        <>
                                                          {e.imagenes.map((src, index) => (
                                                            <img
                                                              className='imagenes-view-big'
                                                              src={src}
                                                              onClick={() => {
                                                                openImageViewer(index);
                                                                setImageArray(e.imagenes)
                                                              }}

                                                              key={index}
                                                              style={{ margin: '2px' }}
                                                              alt=""
                                                            />
                                                          ))}
                                                        </>
                                                      }


                                                      {isViewerOpen && (
                                                        <ImageViewer
                                                          src={imageArray}
                                                          currentIndex={currentImage}
                                                          disableScroll={true}
                                                          closeOnClickOutside={true}
                                                          onClose={closeImageViewer}
                                                        />
                                                      )}
                                                    </div>
                                                    : <></>}

                                                  {/* <div className='anounce-description-img'>
                                                <Link to={"#"}>
                                                  {e.imagen1 ?
                                                    <img src={e.imagen1} />
                                                    :
                                                    <></>
                                                  }
                                                  {e.imagen2 ?
                                                    <img src={e.imagen2} />
                                                    :
                                                    <></>
                                                  }
                                                  {e.imagen3 ?
                                                    <img src={e.imagen3} />
                                                    :
                                                    <></>
                                                  }
                                                  {e.imagen4 ?
                                                    <img src={e.imagen4} />
                                                    :
                                                    <></>
                                                  }
                                                </Link> 
                                              </div> */}
                                                </div>
                                                <div className='response-icono'>
                                                  <a style={{ display: "none" }} href='' className='response-respuestas-like'><span className='response-respuestas-like-num'>{e.comentLike}</span><AiOutlineLike className='response-respuestas-like-icon' size={20} color={"#000000"} /></a>
                                                  {verResp2 == e._id ?
                                                    <Link className='response-respuestas-num-conatainer' to='#!' onClick={() => VerResp2("")}><span className='response-respuestas-num'>{/*e.comentRepons*/}</span><IoChatboxOutline className='response-icono-respuestas' size={18} color={"blue"} /><span className='response-responder-text'>ocultar respuestas</span></Link>

                                                    :
                                                    <Link className='response-respuestas-num-conatainer' to='#!' onClick={() => VerResp2(e._id)}><span className='response-respuestas-num'>{/*e.comentRepons*/}</span><IoChatboxOutline className='response-icono-respuestas' size={18} color={"blue"} /><span className='response-responder-text'>respuestas</span></Link>
                                                  }

                                                </div>

                                                {verResp2 == e._id ?
                                                  <>
                                                    {/* editor del tercer comentario */}
                                                    {/* <div className='editor-container'>
                                                      <Editor3s comentId={e._id} />
                                                    </div> 
                                                    */}

                                                    {dataApp?.CARGAR_RESPONSE_RESPONSE ?
                                                      <div className='spinner-cargar-response-coment-principal-container'>
                                                        <MoonLoader size={25} color={"#212121"} />
                                                      </div>
                                                      :
                                                      <>
                                                        {dataRespComentarioResp.map((y, z) =>
                                                          <>
                                                            <div className='chat-user-response'>
                                                              {/* tercer comentario respuesta del segundo comentario */}
                                                              <div className='chat-user-response-foto-perfil'><p>{y.userName[0]}</p><div className='i'></div></div>
                                                              <div className='chat-user-response-perfilName-descripAnounce'>
                                                                <div className='response-user-perfilName-date'><p className='user-name-response'>{y.userName}</p><p className='anounce-date-response'>{y.comentTime}</p></div>
                                                              </div>
                                                              <div className='response-description'>
                                                                {y.coment == "" ? <></> : parse(y.coment)}
                                                                {y.imagenes[0] ?
                                                                  <div className='anounce-description-img'>
                                                                    {y.imagenes[1] ?
                                                                      <>
                                                                        {y.imagenes.map((src, index) => (
                                                                          <img
                                                                            className='imagenes-view'
                                                                            src={src}
                                                                            onClick={() => {
                                                                              openImageViewer(index);
                                                                              setImageArray(y.imagenes)
                                                                            }}
                                                                            key={index}
                                                                            style={{ margin: '2px' }}
                                                                            alt=""
                                                                          />
                                                                        ))}
                                                                      </>
                                                                      :
                                                                      <>
                                                                        {y.imagenes.map((src, index) => (
                                                                          <img
                                                                            className='imagenes-view-big'
                                                                            src={src}
                                                                            onClick={() => {
                                                                              openImageViewer(index);
                                                                              setImageArray(y.imagenes)
                                                                            }}
                                                                            key={index}
                                                                            style={{ margin: '2px' }}
                                                                            alt=""
                                                                          />
                                                                        ))}
                                                                      </>
                                                                    }



                                                                    {isViewerOpen && (
                                                                      <ImageViewer
                                                                        src={imageArray}
                                                                        currentIndex={currentImage}
                                                                        disableScroll={true}
                                                                        closeOnClickOutside={true}
                                                                        onClose={closeImageViewer}
                                                                      />
                                                                    )}
                                                                  </div>

                                                                  :
                                                                  <></>
                                                                }


                                                                {/* {y.imagen1 ?
                                                              <div className='anounce-description-img'>
                                                                <Link to={"#"}>
                                                                  {y.imagen1 ?
                                                                    <img src={y.imagen1} />
                                                                    :
                                                                    <></>
                                                                  }
                                                                  {y.imagen2 ?
                                                                    <img src={y.imagen2} />
                                                                    :
                                                                    <></>
                                                                  }
                                                                  {y.imagen3 ?
                                                                    <img src={y.imagen3} />
                                                                    :
                                                                    <></>
                                                                  }
                                                                  {y.imagen4 ?
                                                                    <img src={y.imagen4} />
                                                                    :
                                                                    <></>
                                                                  }
                                                                </Link>
                                                              </div>
                                                              :
                                                              <></>
                                                            } */}
                                                              </div>
                                                              {/* <div className='response-icono'>
                                                                <Link to='#!' className='response-respuestas-like'><span className='response-respuestas-like-num'>{y.comentLike}</span><AiOutlineLike className='response-respuestas-like-icon' size={20} color={"blue"} /></Link> 
                                                                <Link className='response-respuestas-num-conatainer' to='#!'><span className='response-respuestas-num'>{y.comentRepons}</span><IoChatboxOutline className='response-icono-respuestas' size={18} color={"blue"} /><span className='response-responder-text'>respuestas</span></Link> 

                                                              </div> */}
                                                            </div>
                                                          </>
                                                        )

                                                        }
                                                      </>
                                                    }
                                                    <div className='editor-container'>
                                                      {/* editor del tercer comentario */}
                                                      <Editor3s comentId={e._id} />
                                                    </div>
                                                  </> : <></>
                                                }


                                              </div>
                                            )}
                                          </>
                                        }
                                        <div className='editor-container'>
                                          {/* editor del segundo comentario */}
                                          <Editor2s comentId={i._id} />
                                        </div>
                                      </>
                                      :
                                      <></>
                                    }

                                  </div>

                                </div>
                              </div>

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

    </>

  )
}
