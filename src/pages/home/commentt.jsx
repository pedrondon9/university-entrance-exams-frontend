import React, { useState } from "react";
import parse from "html-react-parser";
import Editors from "../../components/editoresAddImg/edits";
import EditorsRespuestas from "../../components/editoresAddImg/editorRespuestas";

const Comentarios = ({ comentario }) => {
    const [showRespuestas, setShowRespuestas] = useState(false);
    const [verResp, setverResp] = useState("")



    const VerResp = (id) => {
        setShowRespuestas(!showRespuestas)
        if (id) {
            setverResp(id)
        } else {
            setverResp("")
        }

    }


    return (
        <div
            style={{
                marginLeft: comentario?.parentId ? 10 : 0,
                borderLeft: comentario?.parentId ? "2px solid #e0e0e0" : "none",
                paddingLeft: 10,
                marginTop: 10,
                borderRadius: comentario?.parentId ? '0px' : "5px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                background: "#fafafa",
                padding: "10px",
            }}
        >
            {/* Header usuario */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                <div
                    style={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        background: "#eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        marginRight: 8,
                    }}
                >
                    <p style={{ fontWeight: 600, fontSize: 18 }}>{comentario?.userId?.fullname?.charAt(0) || "U"}</p>
                </div>
                <div>
                    <strong style={{ fontWeight: 600 }}>{comentario?.userId?.fullname || "Anónimo"}</strong>{" "}
                    <small style={{ color: "#777" }}>
                        {new Date(comentario?.createdAt).toLocaleString()}
                    </small>
                </div>
            </div>

            {/* Contenido */}
            <p>{parse(comentario?.content)}</p>

            {/* Botón respuestas */}
            <div
                style={{ color: "blue", cursor: "pointer", fontSize: 14 }}
                onClick={() => VerResp(comentario._id)}
            >
                💬 {showRespuestas ? "ocultar respuestas" : "respuestas"}
            </div>


            {/* Respuestas */}
            {showRespuestas && 
                <>
                    {comentario?.respuestas?.length > 0 && (
                        comentario?.respuestas.map((resp) => (
                            <Comentarios key={resp._id} comentario={resp} />
                        ))
                    )}

                    <EditorsRespuestas parentId={comentario._id} examenId={comentario.examenId} />

                </>
            }
        </div>
    );
};

export default Comentarios;