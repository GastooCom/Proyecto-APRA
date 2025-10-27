import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";

function Reconocimiento() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const captureCanvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [facesCount, setFacesCount] = useState(0);
  const [error, setError] = useState("");

  // Cargar modelos desde CDN para evitar tener archivos locales
  useEffect(() => {
    const loadModels = async () => {
      try {
        // URL pública estable con los modelos de ejemplo del autor
        const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (e) {
        console.error("Error cargando modelos de face-api:", e);
        setError("No se pudieron cargar los modelos de reconocimiento facial.");
      }
    };
    loadModels();
  }, []);

  // Iniciar cámara
  useEffect(() => {
    let currentStream;
    const startCam = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
        currentStream = s;
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (e) {
        console.error("Error al acceder a la cámara:", e);
        setError("No se pudo acceder a la cámara. Revisá los permisos del navegador.");
      } finally {
        setLoading(false);
      }
    };
    startCam();
    return () => {
      if (currentStream) currentStream.getTracks().forEach(t => t.stop());
    };
  }, []);

  // Ajustar canvas al tamaño del video cuando esté listo
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const captureCanvas = captureCanvasRef.current;
    if (captureCanvas) {
      captureCanvas.width = video.videoWidth;
      captureCanvas.height = video.videoHeight;
    }
  };

  const clearOverlay = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setFacesCount(0);
  };

  const takeAndAnalyzePhoto = async () => {
    if (!modelsLoaded) return;
    const video = videoRef.current;
    const overlay = canvasRef.current;
    const captureCanvas = captureCanvasRef.current;
    if (!video || !overlay || !captureCanvas) return;

    // capturar frame actual del video
    const cctx = captureCanvas.getContext("2d");
    cctx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);

    // limpiar overlay previo
    const octx = overlay.getContext("2d");
    octx.clearRect(0, 0, overlay.width, overlay.height);

    // detectar rostros en la foto capturada
    const detections = await faceapi
      .detectAllFaces(captureCanvas, new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.5 }))
      .withFaceLandmarks()
      .withFaceDescriptors();

    setFacesCount(detections.length);

    // dibujar recuadros
    const resized = faceapi.resizeResults(detections, {
      width: overlay.width,
      height: overlay.height,
    });

    resized.forEach(d => {
      const box = d.detection.box;
      octx.strokeStyle = "#2ecc71"; // verde
      octx.lineWidth = 3;
      octx.strokeRect(box.x, box.y, box.width, box.height);
      octx.fillStyle = "rgba(46, 204, 113, 0.2)";
      octx.fillRect(box.x, box.y, box.width, box.height);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 900, position: "relative" }}>
        <button
          onClick={() => navigate("/")}
          style={{ position: "absolute", top: -4, left: -4, background: "transparent", border: "none", cursor: "pointer", zIndex: 2 }}
          aria-label="Volver"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
        </button>

        <div style={{ position: "relative", width: "100%", borderRadius: 12, overflow: "hidden", background: "#111", aspectRatio: "4/3" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onLoadedMetadata={handleLoadedMetadata}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: loading ? "none" : "block" }}
          />
          <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
          {/* Canvas invisible donde se captura la foto para analizar */}
          <canvas ref={captureCanvasRef} style={{ display: "none" }} />

          {(!stream || loading) && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb" }}>
              {error || "Cargando cámara..."}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", marginTop: 12 }}>
          <button onClick={takeAndAnalyzePhoto} disabled={!modelsLoaded || !!error} style={{ background: "#8a2be2", color: "white", border: "none", padding: "10px 14px", borderRadius: 10, cursor: "pointer" }}>
            Tomar foto
          </button>
          <button onClick={clearOverlay} style={{ background: "#2d2d2d", color: "white", border: "none", padding: "10px 14px", borderRadius: 10, cursor: "pointer" }}>
            Limpiar
          </button>
          <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ color: "#2ecc71" }}>Detectados: {facesCount}</span>
            <span style={{ color: modelsLoaded ? "#2ecc71" : "#e67e22" }}>{modelsLoaded ? "Modelos listos" : "Cargando modelos..."}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reconocimiento;
