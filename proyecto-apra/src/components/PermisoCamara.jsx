import React, { useState, useRef } from "react";
import '../css/PermisoCamara.css';
import miImagen from "../Imagenes/icono-de-camara-violet.png";
import { useNavigate } from "react-router-dom";

const CamaraPermiso = () => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [noAskAgain, setNoAskAgain] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    // ==============================
    // PEDIR PERMISO Y MOSTRAR CÁMARA
    // ==============================
    const handleAllow = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraActive(true);
                setErrorMessage(null);
            }
        } catch (error) {
            console.error("Error al acceder a la cámara:", error);
            setErrorMessage("No se pudo acceder a la cámara. Por favor, revisa los permisos del navegador.");
        }
    };

    const handleContinuar = () => {
        navigate("/reconocimiento");
    };

    const handleReject = () => {
        if (noAskAgain) {
            localStorage.setItem("skipCameraPermission", "true");
        }
        navigate("/");
    };

    React.useEffect(() => {
        const skip = localStorage.getItem("skipCameraPermission");
        if (skip === "true") navigate("/");
    }, [navigate]);

    return (
        <div className="contenedor-permisocamara">
            <button className="boton-volver" onClick={() => navigate("/")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5"></path>
                    <path d="M12 19l-7-7 7-7"></path>
                </svg>
            </button>

            <h1 className="titulo">PERMISO DE CÁMARA</h1>

            <div className="box">
                {!isCameraActive && (
                    <div className="camara">
                        <img src={miImagen} alt="camara" width={90} height={90}/>
                    </div>
                )}

                {isCameraActive && (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        width="320"
                        height="240"
                        style={{ borderRadius: "10px", marginTop: "10px" }}
                    />
                )}

                <p className="text-camara">
                    Para continuar, necesitamos el acceso a la cámara del dispositivo.<br />
                    {isCameraActive
                        ? "La cámara está activa. Presiona continuar para ir al reconocimiento facial."
                        : "Haz clic en PERMITIR para activar la cámara."}
                </p>

                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="noAsk"
                        checked={noAskAgain}
                        onChange={(e) => setNoAskAgain(e.target.checked)}
                    />
                    <label htmlFor="noAsk">No volver a preguntar</label>
                </div>

                <div className="buttons">
                    <button className="reject" onClick={handleReject}>RECHAZAR</button>

                    {!isCameraActive ? (
                        <button className="allow" onClick={handleAllow}>PERMITIR</button>
                    ) : (
                        <button className="allow" onClick={handleContinuar}>CONTINUAR</button>
                    )}
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

            <footer className="footer">
                Argentina S.A. – Av. Cramer 3226 Piso 3A, 1429 Ciudad Autónoma de Buenos Aires, Argentina – ©2025 RA Support Argentina – Made in Argentina<br />
                La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.<br />
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </footer>
        </div>
    );
};

export default CamaraPermiso;
