import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";
import { FaRegSquare, FaVideo, FaUserAlt } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { useAsistencias } from "../hooks/useAsistencias";
import { useRostros } from "../hooks/useRostros";

function Reconocimiento() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const snapshotCanvasRef = useRef(null);
  const rafIdRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [facesCount, setFacesCount] = useState(0);
  const [error, setError] = useState("");
  const [frozen, setFrozen] = useState(false);
  const [goodCount, setGoodCount] = useState(0);
  const [badCount, setBadCount] = useState(0);
  const [adding, setAdding] = useState(false);
  const [permitirRecrear, setPermitirRecrear] = useState(false);

  // Hook de asistencias
  const { datosAsistencia, agregarAsistencia, actualizarAsistencia } = useAsistencias();
  // Hook de rostros registrados
  const { rostros } = useRostros();
  const [detectionsData, setDetectionsData] = useState([]); // guarda {detection, descriptor}

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
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Ajustar canvas al tamaño del video cuando esté listo
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    // Tamaño real visible del video en CSS px
    const w = video.clientWidth || video.videoWidth;
    const h = video.clientHeight || video.videoHeight;
    // Canvas en espacio CSS px (sin escalar por DPR) para que faceapi.draw alinee
    canvas.width = Math.round(w);
    canvas.height = Math.round(h);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    const snapshotCanvas = snapshotCanvasRef.current;
    if (snapshotCanvas) {
      snapshotCanvas.width = Math.round(w);
      snapshotCanvas.height = Math.round(h);
      snapshotCanvas.style.width = '100%';
      snapshotCanvas.style.height = '100%';
    }
    const captureCanvas = captureCanvasRef.current;
    if (captureCanvas) {
      // Captura a resolución del video para mejor precisión
      captureCanvas.width = video.videoWidth || w;
      captureCanvas.height = video.videoHeight || h;
    }
  };

  const clearOverlay = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setFacesCount(0);
  };

  const takeAndAnalyzePhoto = async () => {
    if (!modelsLoaded) return;
    // Si ya está congelado, preparar para tomar una nueva foto
    if (frozen) {
      setFrozen(false);
      clearOverlay();
      try { await videoRef.current?.play(); } catch {}
      return;
    }
    const video = videoRef.current;
    const overlay = canvasRef.current;
    const captureCanvas = captureCanvasRef.current;
    const snapshotCanvas = snapshotCanvasRef.current;
    if (!video || !overlay || !captureCanvas) return;

    // capturar frame actual del video
    const cctx = captureCanvas.getContext("2d");
    cctx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
    // dibujar esa captura en el canvas visible de snapshot para "congelar" la imagen
    if (snapshotCanvas) {
      const sctx = snapshotCanvas.getContext('2d');
      // Ajustar a tamaño del overlay (espacio CSS)
      sctx.clearRect(0, 0, snapshotCanvas.width, snapshotCanvas.height);
      // Usar drawImage con escala a tamaño CSS
      sctx.drawImage(captureCanvas, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    }

    // limpiar overlay previo
    const octx = overlay.getContext("2d");
    // Usar transform identidad para dibujar en espacio CSS px
    octx.setTransform(1, 0, 0, 1, 0, 0);
    octx.clearRect(0, 0, overlay.width, overlay.height);

    // detectar rostros en la foto capturada
    const detections = await faceapi
      .detectAllFaces(captureCanvas, new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.5 }))
      .withFaceLandmarks()
      .withFaceDescriptors();

    setFacesCount(detections.length);
    // Guardar para matching posterior (descriptor por rostro)
    setDetectionsData(detections.map(d => ({ detection: d.detection ?? d, descriptor: d.descriptor })));

    const resized = faceapi.resizeResults(detections, { width: overlay.width, height: overlay.height });
    const MIN_SIZE = 80; // px mínimos para considerarla "identificable"
    const MAX_TILT_DEG = 20; // grados máximos de inclinación del eje de ojos
    let good = 0, bad = 0;
    const ctx = overlay.getContext('2d');
    ctx.lineWidth = 4;
    resized.forEach(r => {
      const det = r.detection ?? r;
      const box = det.box;
      let isIdentificable = box?.width >= MIN_SIZE && box?.height >= MIN_SIZE && (det.score ?? 0.6) >= 0.6;
      // Heurística de inclinación usando landmarks de ojos
      const lm = r.landmarks;
      if (lm) {
        const leftEye = lm.getLeftEye();
        const rightEye = lm.getRightEye();
        if (leftEye?.[0] && rightEye?.[0]) {
          const lx = leftEye[0].x, ly = leftEye[0].y;
          const rx = rightEye[0].x, ry = rightEye[0].y;
          const angle = Math.abs((Math.atan2(ry - ly, rx - lx) * 180) / Math.PI);
          const tilt = Math.min(angle, 180 - angle); // 0..90
          if (tilt > MAX_TILT_DEG) isIdentificable = false;
        }
      }
      if (isIdentificable) {
        ctx.shadowColor = 'rgba(46, 204, 113, 0.55)';
        ctx.strokeStyle = '#2ecc71';
        good += 1;
      } else {
        ctx.shadowColor = 'rgba(231, 76, 60, 0.55)';
        ctx.strokeStyle = '#e74c3c';
        bad += 1;
      }
      ctx.shadowBlur = 10;
      ctx.strokeRect(box.x, box.y, box.width, box.height);
      ctx.shadowBlur = 0;
    });
    setGoodCount(good);
    setBadCount(bad);

    // Congelar video y mostrar snapshot
    try { video.pause(); } catch {}
    setFrozen(true);
  };

  const handleAgregarATabla = async () => {
    if (facesCount <= 0 || adding) return;
    setAdding(true);
    try {
      const hoy = new Date().toISOString().slice(0, 10);
      for (let i = 0; i < facesCount; i++) {
        await agregarAsistencia({
          curso: "",
          division: "",
          nombre: "",
          fecha: hoy,
          estado: "",
        });
      }
    } catch (e) {
      console.error("Error al agregar filas a asistencia:", e);
    } finally {
      setAdding(false);
    }
  };

  const handleAutocompletar = async () => {
    if (!frozen || detectionsData.length === 0 || adding) return;
    const labeled = rostros
      .filter(r => Array.isArray(r.descriptor) && r.descriptor.length > 0)
      .map(r => new faceapi.LabeledFaceDescriptors(r.nombre, [new Float32Array(r.descriptor)]));
    if (labeled.length === 0) {
      alert("No hay rostros registrados para comparar.");
      return;
    }
    const matcher = new faceapi.FaceMatcher(labeled, 0.45);
    const hoy = new Date().toISOString().slice(0, 10);
    setAdding(true);
    try {
      const reconocidos = new Set();
      const eliminadosHoy = (() => {
        try { return JSON.parse(localStorage.getItem(`eliminados:${hoy}`) || '[]'); } catch { return []; }
      })();
      for (const d of detectionsData) {
        if (!d.descriptor) continue;
        const best = matcher.findBestMatch(d.descriptor);
        if (best?.label && best.label !== 'unknown') {
          const nombreTarget = best.label;
          reconocidos.add(nombreTarget);
          const existente = (datosAsistencia || []).find(a => a?.nombre === nombreTarget && a?.fecha === hoy);
          if (existente) {
            await actualizarAsistencia(existente.id, { estado: 'Presente' });
          } else {
            // Crear SOLO si no fue eliminado manualmente hoy, o si el usuario habilita recreación
            if (!eliminadosHoy.includes(nombreTarget) || permitirRecrear) {
              const reg = rostros.find(r => r.nombre === nombreTarget);
              await agregarAsistencia({
                curso: reg?.curso || "",
                division: reg?.division || "",
                nombre: reg?.nombre || nombreTarget,
                fecha: hoy,
                estado: 'Presente',
              });
            }
          }
        }
      }
      // Marcar como Ausente a los rostros registrados no reconocidos en esta captura (solo actualizar existentes)
      for (const r of rostros) {
        const nombre = r?.nombre;
        if (!nombre) continue;
        if (reconocidos.has(nombre)) continue;
        const existente = (datosAsistencia || []).find(a => a?.nombre === nombre && a?.fecha === hoy);
        if (existente) {
          await actualizarAsistencia(existente.id, { estado: 'Ausente' });
        }
      }
    } catch (e) {
      console.error("Error autocompletando asistencia:", e);
    } finally {
      setAdding(false);
    }
  };

  const stopAnyLoop = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 28 }}>
      <div style={{ width: "min(92vw, 1400px)", position: "relative" }}>
        {/* Flecha de volver mejorada y fija en esquina superior izquierda */}
        <button
          onClick={() => navigate("/")}
          style={{ position: "fixed", top: 16, left: 16, width: 44, height: 44, display: "grid", placeItems: "center", background: "#0f0f14", border: "1px solid rgba(138,43,226,0.5)", color: "#fff", borderRadius: 12, cursor: "pointer", zIndex: 10, boxShadow: "0 6px 18px rgba(138,43,226,0.3)" }}
          aria-label="Volver"
          title="Volver"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a45aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
        </button>

        <div style={{ position: "relative", width: "100%", borderRadius: 20, overflow: "hidden", background: "#0b0b0f", aspectRatio: "16/9", boxShadow: "0 18px 50px rgba(138,43,226,0.32)", border: "1px solid rgba(164,90,255,0.35)" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onLoadedMetadata={handleLoadedMetadata}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: loading ? "none" : (frozen ? "none" : "block"), filter: "contrast(1.05) saturate(1.05)", zIndex: 0 }}
          />
          {/* Canvas visible que muestra la foto congelada */}
          <canvas ref={snapshotCanvasRef} style={{ position: "absolute", inset: 0, zIndex: 1, display: frozen ? 'block' : 'none' }} />
          <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }} />
          {/* Canvas invisible donde se captura la foto para analizar */}
          <canvas ref={captureCanvasRef} style={{ display: "none" }} />

          {(!stream || loading) && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb" }}>
              {error || "Cargando cámara..."}
            </div>
          )}
        </div>

        {/* Barra inferior estilo HUD */}
        <div style={{ position: 'relative', marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: 'linear-gradient(180deg, rgba(24,21,32,0.85), rgba(24,21,32,0.85))', border: '1px solid rgba(164,90,255,0.35)', borderRadius: 16, padding: '12px 16px', boxShadow: '0 12px 34px rgba(138,43,226,0.35)' }}>
            {/* Izquierda: botón principal */}
            <button onClick={takeAndAnalyzePhoto} disabled={!modelsLoaded || !!error} style={{ background: 'linear-gradient(135deg, #8a2be2, #a45aff)', color: 'white', border: 'none', padding: '12px 18px', borderRadius: 999, cursor: 'pointer', fontSize: 16, fontWeight: 700, boxShadow: '0 10px 24px rgba(138,43,226,0.45)' }}>
              {frozen ? 'Nueva foto' : 'Tomar Asistencia'}
            </button>

            {/* Centro: botón cámara */}
            <button onClick={takeAndAnalyzePhoto} disabled={!modelsLoaded || !!error} style={{ width: 56, height: 44, borderRadius: 12, border: '1px solid rgba(164,90,255,0.45)', background: '#1b1530', color: '#c8a6ff', display: 'grid', placeItems: 'center' }}>
              <FaVideo size={22} />
            </button>

            {/* Derecha: acciones e indicadores */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {frozen && facesCount > 0 && (
                <button
                  onClick={handleAgregarATabla}
                  disabled={adding}
                  title={`Agregar ${facesCount} ${facesCount === 1 ? 'fila' : 'filas'} a la asistencia`}
                  style={{ background: adding ? '#3a2d58' : 'linear-gradient(135deg, #27ae60, #2ecc71)', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 12, cursor: adding ? 'not-allowed' : 'pointer', fontWeight: 800, boxShadow: '0 10px 24px rgba(39,174,96,0.35)' }}
                >
                  {adding ? 'Agregando...' : `Agregar a la tabla (${facesCount})`}
                </button>
              )}
              {frozen && facesCount > 0 && (
                <button
                  onClick={handleAutocompletar}
                  disabled={adding}
                  title="Autocompletar con rostros registrados"
                  style={{ background: adding ? '#55406e' : 'linear-gradient(135deg, #1f8ef1, #2d9cdb)', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 12, cursor: adding ? 'not-allowed' : 'pointer', fontWeight: 800, boxShadow: '0 10px 24px rgba(31,142,241,0.35)' }}
                >
                  {adding ? 'Procesando...' : 'Autocompletar'}
                </button>
              )}
              <div title="No identificables" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e74c3c', fontWeight: 700 }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(231,76,60,0.15)', border: '1px solid rgba(231,76,60,0.6)', display: 'grid', placeItems: 'center' }}>
                  <BsInfoCircle />
                </span>
                <span>{badCount}</span>
              </div>
              <div title="Identificables" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#2ecc71', fontWeight: 700 }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(46,204,113,0.12)', border: '1px solid rgba(46,204,113,0.6)', display: 'grid', placeItems: 'center' }}>
                  <FaUserAlt />
                </span>
                <span>{goodCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reconocimiento;
