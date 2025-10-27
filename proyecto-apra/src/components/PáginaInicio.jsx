import React, { useEffect, useRef } from 'react';
import '../css/PáginaInicio.css';
import ImagenInicio from "../Imagenes/ImagenInc.png";
import { useNavigate } from "react-router-dom";

const AsistenciaRA = () => {
  const navigate = useNavigate();
  const eyesRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0, d: 0 });
  const currentRef = useRef({ x: 0, y: 0, d: 0 });
  const lastMoveRef = useRef(Date.now());

  useEffect(() => {
    const container = eyesRef.current;
    if (!container) return;

    const computeTarget = (e) => {
      // Tomar el centro del contenedor completo para simular que ambos ojos miran el mismo punto
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // Normalizar distancia (para dilatación)
      const dist = Math.min(1, Math.hypot(dx, dy) / Math.max(rect.width, rect.height));
      targetRef.current = { x: dx, y: dy, d: dist };
      lastMoveRef.current = Date.now();
    };

    const onMove = (e) => computeTarget(e);
    window.addEventListener('mousemove', onMove);

    // Micro-saccades (movimientos leves) cuando el usuario está inactivo
    const microTimer = setInterval(() => {
      const idleMs = Date.now() - lastMoveRef.current;
      if (idleMs > 1500) {
        const jitterX = (Math.random() - 0.5) * 20;
        const jitterY = (Math.random() - 0.5) * 12;
        const rect = container.getBoundingClientRect();
        targetRef.current = { x: jitterX, y: jitterY, d: 0.3 };
      }
    }, 2000);

    const animate = () => {
      const eyes = container.querySelectorAll('.eye');
      // Interpolación suave del objetivo
      const lerp = (a, b, t) => a + (b - a) * t;
      const t = 0.12; // suavizado
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, t);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, t);
      currentRef.current.d = lerp(currentRef.current.d, targetRef.current.d, 0.08);

      eyes.forEach((eye) => {
        const svg = eye.querySelector('svg');
        const group = svg?.querySelector('.pupil-group');
        const pupilCircle = svg?.querySelector('.pupil-circle');
        if (!svg || !group || !pupilCircle) return;
        const rect = eye.getBoundingClientRect();
        const angle = Math.atan2(currentRef.current.y, currentRef.current.x);
        const maxR = Math.min(rect.width, rect.height) * 0.18;
        const offsetX = Math.cos(angle) * maxR;
        const offsetY = Math.sin(angle) * maxR;
        // Convertir offsets en unidades del viewBox (200x100)
        const sx = 200 / rect.width;
        const sy = 100 / rect.height;
        const dxUnits = offsetX * sx;
        const dyUnits = offsetY * sy;
        group.setAttribute('transform', `translate(${100 + dxUnits}, ${50 + dyUnits})`);
        // Dilatación de pupila
        const scale = 1 - currentRef.current.d * 0.25;
        const r = Math.max(12, Math.min(20, 18 * scale));
        pupilCircle.setAttribute('r', String(r));
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      clearInterval(microTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  return (
    <div className="inicio-container">
      <header className="inicio-header">
        <div className="header-left">
          <div className="logo-placeholder"></div>
          <nav className="nav-menu">
            <button onClick={() => navigate("/")}>Inicio</button>
            <button onClick={() => navigate("/asistencia")}>Asistencia</button>
            <button onClick={() => navigate("/permisoscam")}>Permiso de Camara</button>
            <button onClick={() => navigate("/permisosnoti")}>Permiso de Notificaciones</button>
          </nav>
        </div>
        <div className="header-right">
          <button
            onClick={() => navigate("/iniciar-sesion")}
            className="login-button"
            >
            Iniciar sesión
          </button>
          <button
            onClick={() => navigate("/registrarse")}
            className="register-button"
          >
            Registrarse
          </button>
        </div>
      </header>

      <div className="social-bar">
        <i className="fab fa-instagram icon"></i>
        <i className="fab fa-facebook icon"></i>
        <i className="fab fa-tiktok icon"></i>
        <i className="fab fa-youtube icon"></i>
      </div>

      <main className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">
            Asistencia<br /> Realidad <br /> Aumentada
          </h1>
          <p>
            Proporcionamos asistencia experta remota mediante la realidad aumentada para técnicos en campo
          </p>
          <button className="info-button">Mas información</button>
        </div>
        <div className="hero-image">
          <div className="eyes-anim" aria-hidden="true" ref={eyesRef}>
            <div className="eye">
              <svg viewBox="0 0 200 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                <path d="M10,50 Q100,5 190,50 Q100,95 10,50 Z" fill="none" stroke="#0f0f14" strokeWidth="8" strokeLinecap="round" />
                <path d="M30,50 Q100,20 170,50 Q100,80 30,50 Z" fill="none" stroke="#0f0f14" strokeWidth="6" strokeLinecap="round" />
                <g className="pupil-group" transform="translate(100,50)">
                  <circle className="pupil-circle" r="18" fill="#0b0b0f" />
                  <path d="M-6,-6 a12,12 0 1,0 12,-12" fill="none" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
            <div className="eye">
              <svg viewBox="0 0 200 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                <path d="M10,50 Q100,5 190,50 Q100,95 10,50 Z" fill="none" stroke="#0f0f14" strokeWidth="8" strokeLinecap="round" />
                <path d="M30,50 Q100,20 170,50 Q100,80 30,50 Z" fill="none" stroke="#0f0f14" strokeWidth="6" strokeLinecap="round" />
                <g className="pupil-group" transform="translate(100,50)">
                  <circle className="pupil-circle" r="18" fill="#0b0b0f" />
                  <path d="M-6,-6 a12,12 0 1,0 12,-12" fill="none" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </main>

      <section className="features-section">
        <button
          type="button"
          className="feature-item"
          onClick={() => navigate("/permisoscam")}
          aria-label="Iniciar Realidad Aumentada"
          title="Iniciar Realidad Aumentada"
        >
          <i className="material-icons feature-icon"></i>
          <span>Realidad Aumentada</span>
        </button>
        <button type="button" className="feature-item" aria-label="Soporte Técnico" title="Soporte Técnico">
          <i className="fas fa-headset feature-icon"></i>
          <span>Soporte Técnico</span>
        </button>
        <button type="button" className="feature-item" aria-label="Comunicación" title="Comunicación">
          <i className="fas fa-comments feature-icon"></i>
          <span>Comunicación</span>
        </button>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Asistencia AR. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default AsistenciaRA;