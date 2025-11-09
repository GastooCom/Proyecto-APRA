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
  const [apellido, setApellido] = useState("");
  const [curso, setCurso] = useState("");
  const [division, setDivision] = useState("");
  
  const [gmailPadres, setGmailPadres] = useState("");
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
    if (!descriptor || !nombre || !apellido || !curso || !division) {
      alert("Completá todos los campos y capturá un rostro.");
      return;
    }
    if (descriptor && descriptor.length && descriptor.length !== 128) {
      console.warn("Descriptor con longitud inesperada:", descriptor.length);
    }
    setSaving(true);
    try {
      const nombreCompleto = `${nombre} ${apellido}`.trim();
      await guardarRostro({ nombre: nombreCompleto, curso, division, gmailPadres, descriptor });
      setNombre("");
      setApellido("");
      setCurso("");
      setDivision("");
      setGmailPadres("");
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
          <div style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: 8 }}>
            <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, padding: 12, marginBottom: 14 }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Datos del alumno</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <input className="inp" placeholder="Curso" value={curso} onChange={e => setCurso(e.target.value)} />
                <input className="inp" placeholder="División" value={division} onChange={e => setDivision(e.target.value)} />
                <input className="inp" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                <input className="inp" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
              </div>
            </div>

            <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, padding: 12, marginBottom: 14 }}>
              <div style={{ fontWeight: 800, marginBottom: 8 }}>Contacto</div>
              <input className="inp" type="email" placeholder="Correo de los Padres" value={gmailPadres} onChange={e => setGmailPadres(e.target.value)} />
            </div>

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
