import React, { useState } from "react";
import "../css/PáginaInicio.css";
import { useNavigate } from "react-router-dom";
import { FiMail, FiHelpCircle, FiBookOpen, FiAlertTriangle } from "react-icons/fi";

function SoporteTecnico() {
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState("");

  const enviarReporteGmail = () => {
    const to = encodeURIComponent("apra.general.123@gmail.com");
    const su = encodeURIComponent("Asistencia técnica - Reporte de problema");
    const bodyPrefix = "Envíanos tu consulta:";
    const body = encodeURIComponent(`${bodyPrefix}\n\n${descripcion}`);
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${body}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="inicio-container">
      <button
        onClick={() => navigate(-1)}
        aria-label="Volver"
        title="Volver"
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          width: 40,
          height: 40,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(148,163,184,0.2)",
          color: "#fff",
          fontSize: 20,
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
        }}
      >
        ←
      </button>

      <main
        className="hero-section"
        style={{ justifyContent: "center", textAlign: "center", minHeight: "16vh", padding: "1rem 1rem 0.25rem" }}
      >
        <div className="hero-text" style={{ maxWidth: "900px" }}>
          <h1 className="hero-title">Bienvenido a Soporte Técnico</h1>
          <p>Encontrá respuestas rápidas, guías y formas de contactarnos para resolver tus dudas.</p>
        </div>
      </main>

      <div className="features-header">
        <h2 className="features-title">Centro de ayuda</h2>
        <p className="features-subtitle">Seleccioná una opción para continuar</p>
      </div>

      <section className="features-section support-features" style={{ justifyContent: "center", paddingTop: 8, paddingBottom: 28 }}>
        <a
          className="feature-item feature-link"
          href={
            "https://mail.google.com/mail/?view=cm&fs=1&to=" +
            encodeURIComponent("apra.general.123@gmail.com") +
            "&su=" + encodeURIComponent("Asistencia técnica") +
            "&body=" + encodeURIComponent("Envíanos tu consulta:")
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="feature-icon"><FiMail /></div>
          <h2>Contacto rápido</h2>
          <p>Haz click en el gmail y envianos tu consulta: apra.general.123@gmail.com</p>
        </a>
        <div className="feature-item">
          <div className="feature-icon"><FiHelpCircle /></div>
          <h2>Preguntas frecuentes</h2>
          <ul className="faq-list">
            <li>¿Navegadores compatibles? Chrome, Edge, Firefox.</li>
            <li>¿No toma la cámara? Revisá permisos del sitio.</li>
            <li>Reconocimiento falla: buena luz y rostro centrado.</li>
            <li>“Sin dispositivo de video”: cerrá otras apps de cámara.</li>
            <li>Privacidad: datos usados para verificación segura.</li>
          </ul>
        </div>
        <div className="feature-item">
          <div className="feature-icon"><FiBookOpen /></div>
          <h2>Guía rápida</h2>
          <ul className="guide-list">
            <li>Iniciá sesión con tu cuenta.</li>
            <li>Permití el acceso a la cámara cuando se solicite.</li>
            <li>Alineá tu rostro en el recuadro y mirá al frente.</li>
            <li>Esperá la confirmación para continuar.</li>
          </ul>
        </div>
        <div className="feature-item">
          <div className="feature-icon"><FiAlertTriangle /></div>
          <h2>Reportar problema</h2>
          <p>Detallá el error y la hora del incidente. Adjuntá una captura si podés.</p>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describí el problema..."
            className="report-textarea"
          />
          <button type="button" className="send-button" onClick={enviarReporteGmail}>
            Enviar por Gmail
          </button>
        </div>
      </section>
    </div>
  );
}

export default SoporteTecnico;

