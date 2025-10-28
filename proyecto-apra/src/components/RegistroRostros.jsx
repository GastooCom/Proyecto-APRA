import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";
import { useRostros } from "../hooks/useRostros";
import "../css/RegistroRostros.css";

const RegistroRostros = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [stream, setStream] = useState(null);
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [division, setDivision] = useState("");
  const [descriptor, setDescriptor] = useState(null);
  const [saving, setSaving] = useState(false);
  const { guardarRostro } = useRostros();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  useEffect(() => {
    let current;
    const start = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        current = s;
        if (videoRef.current) videoRef.current.srcObject = s;
        setStream(s);
      } catch (e) {
        console.error("No se pudo abrir la cámara", e);
      }
    };
    start();
    return () => current?.getTracks().forEach(t => t.stop());
  }, []);

  const capturar = async () => {
    if (!modelsLoaded || !videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const result = await faceapi
      .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.5 }))
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!result) {
      alert("No se detectó un rostro. Intentá otra vez.");
      return;
    }
    setDescriptor(result.descriptor);
  };

  const guardar = async () => {
    if (!descriptor || !nombre) {
      alert("Completá al menos el nombre y capturá un rostro.");
      return;
    }
    if (descriptor && descriptor.length && descriptor.length !== 128) {
      console.warn("Descriptor con longitud inesperada:", descriptor.length);
    }
    setSaving(true);
    try {
      await guardarRostro({ nombre, curso, division, descriptor });
      setNombre("");
      setCurso("");
      setDivision("");
      setDescriptor(null);
      alert("Rostro guardado correctamente");
    } catch (e) {
      console.error("Error al guardar rostro:", e);
      const msg = e?.message || e?.code || String(e);
      alert(`Error al guardar rostro: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="registro-container">
      <button className="btn-volver" onClick={() => navigate("/")}>Volver</button>
      <h2 className="titulo-registro">Registro de Rostros</h2>

      <div className="registro-grid">
        <div className="cam-box">
          <div className="cam-frame">
            <video ref={videoRef} autoPlay playsInline muted className="cam-video" />
            <canvas ref={canvasRef} className="hidden-canvas" />
          </div>
          <div className="cam-actions">
            <button className="btn-primario" onClick={capturar} disabled={!modelsLoaded}>
              {modelsLoaded ? "Capturar rostro" : "Cargando modelos..."}
            </button>
            {descriptor && <span className="badge-ok">Rostro capturado ✓</span>}
          </div>
        </div>

        <div className="form-box">
          <div className="form-grid">
            <input className="inp" placeholder="Nombre y Apellido" value={nombre} onChange={e => setNombre(e.target.value)} />
            <input className="inp" placeholder="Curso" value={curso} onChange={e => setCurso(e.target.value)} />
            <input className="inp" placeholder="División" value={division} onChange={e => setDivision(e.target.value)} />
            <button className="btn-guardar" onClick={guardar} disabled={saving || !descriptor}>
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroRostros;
