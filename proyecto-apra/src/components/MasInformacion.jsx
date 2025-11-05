import React from "react";
import "../css/PáginaInicio.css";
import { useNavigate } from "react-router-dom";

function MasInformacion() {
  const navigate = useNavigate();

  const integrantes = [
    { nombre: "Acuña Mateo" },
    { nombre: "Font Aquiles" },
    { nombre: "Lema Joaquin" },
    { nombre: "Frigo Gaston" },
    { nombre: "Facundo Carrasco" },
  ];

  return (
    <div className="about-page">
      <button
        onClick={() => navigate(-1)}
        aria-label="Volver"
        title="Volver"
        className="back-fab"
      >
        ←
      </button>

      <div className="bg-anim" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>

      

      <section className="team-section">
        <h1 className="about-title">Más Información</h1>
        <h2 className="team-title">Integrantes</h2>
        <div className="team-grid">
          {integrantes.map((m) => (
            <div key={m.nombre} className="team-card">
              <div className="avatar" aria-hidden="true">{m.nombre.split(" ")[0][0]}{m.nombre.split(" ")[1]?.[0] || ""}</div>
              <div className="team-info">
                <h3>{m.nombre}</h3>
                <p>Desarrollo y soporte</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-details">
        <h2>Acerca del proyecto</h2>
        <ul>
          <li>Reconocimiento facial y permisos de cámara para autenticación.</li>
          <li>Interfaz moderna con animaciones y diseño responsive.</li>
          <li>Soporte técnico integrado: contacto, FAQ, guía rápida y reportes.</li>
        </ul>
      </section>

      <section className="about-details">
        <h2>Misión y objetivos</h2>
        <p>
          Brindar una plataforma confiable para asistencia remota con RA, reduciendo tiempos de resolución y elevando
          la seguridad mediante verificación biométrica. Apuntamos a experiencias claras, accesibles y rápidas.
        </p>
      </section>

      <section className="highlights">
        <div className="highlight-card">
          <h3>Asistencia en vivo</h3>
          <p>Guiado paso a paso con cámara y superposiciones para acelerar diagnósticos.</p>
        </div>
        <div className="highlight-card">
          <h3>Verificación biométrica</h3>
          <p>Protección de acceso con reconocimiento facial y permisos granulares.</p>
        </div>
        <div className="highlight-card">
          <h3>Soporte integrado</h3>
          <p>Contacto directo, preguntas frecuentes, guía rápida y reporte de problemas.</p>
        </div>
      </section>

      <section className="tech-section">
        <h2>Tecnologías</h2>
        <div className="tech-badges">
          <span className="badge">React</span>
          <span className="badge">React Router</span>
          <span className="badge">face-api.js</span>
          <span className="badge">Firebase</span>
        </div>
      </section>

      <section className="about-cta">
        <button className="info-button" onClick={() => navigate("/soporte-tecnico")}>
          Ir a Soporte Técnico
        </button>
      </section>
    </div>
  );
}

export default MasInformacion;
