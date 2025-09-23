import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import AppContext from "../../contexts/ServiceContext";
import { useContext, useState } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import Editors from "../../components/editoresAddImg/edits";


const Comentario = ({ i }) => {
  const { GetDataComentResponse, ScrollInfinito } = useContext(AppContext)
  const [verResp, setverResp] = useState("")



  const VerResp = (id) => {
    if (id) {
      GetDataComentResponse(id)
      setverResp(id)
    } else {
      setverResp("")
    }

  }

  return (

    <div className='chat-container' key={i._id}>
      {/* primer comentario el principal */}
      <div className='chat-user-container'>

        <div className='chat-user-anounce'>
          <div className='chat-user-anounce-foto-perfil'><p>{i.userId?.fullname?.[0]}</p></div>
          <div className='chat-user-anounce-perfilName-descripAnounce'>
            <div className='anounce-user-perfilName-date'><p className='user-name'>{i.userId?.fullname}</p><p className='anounce-date'>{i.updatedAt}</p></div>
          </div>
          <div className='anounce-description'>

            {i.content == "" ? <></> : parse(i.content)}

          </div>
          <div className='anounce-icono'>

            <Link style={{ display: "none" }} to='#' onClick={() => console.log("+1")} className='anounce-respuestas-like'><span className='anounce-respuestas-like-num'>{i.comentLike}</span><AiOutlineLike className='anounce-respuestas-like-icon' size={20} color={"#000000"} /></Link>



            {verResp == i._id ?
              <>
                {/* Renderizar recursivamente respuestas */}
                {i.respuestas?.length > 0 && (
                  <div>
                    {i.respuestas.map(resp => (
                      <Comentario key={resp._id} comentario={resp} />
                    ))}

                  </div>
                )}
                                                      <Editors />

                <Link to="#!" onClick={() => VerResp("")} className='anounce-respuestas-num-conatainer'><span className='anounce-respuestas-num'>{/*i.comentRepons*/}</span><IoChatboxOutline className='anounce-icono-respuestas' size={18} color={"blue"} /><span className='anounce-responder-text'>ocultar respuestas</span></Link>
              </>
              :
              <>
                <Link to="#!" onClick={() => VerResp(i._id)} className='anounce-respuestas-num-conatainer'><span className='anounce-respuestas-num'>{/*i.comentRepons*/}</span><IoChatboxOutline className='anounce-icono-respuestas' size={18} color={"blue"} /><span className='anounce-responder-text'>respuestas</span></Link>
              </>
            }
          </div>



        </div>

      </div>
    </div>

  );
};

export default Comentario;