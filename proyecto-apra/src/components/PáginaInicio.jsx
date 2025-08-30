import React from 'react';
import '../css/PáginaInicio.css';
import ImagenInic from "../Imagenes/161042942-icono-de-cirugía-plástica-ocular-estilo-de-esquema-removebg-preview.png";
import ImagenInicio from "../Imagenes/ImagenInc.png";
import { useNavigate } from "react-router-dom";

const AsistenciaRA = () => {
  const navigate = useNavigate();
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
            <img src={ImagenInic} className='inline-icon' alt="Fots" />
          </h1>
          <p>
            Proporcionamos asistencia experta remota mediante la realidad aumentada para técnicos en campo
          </p>
          <button className="info-button">Mas información</button>
        </div>
        <div className="hero-image">
          <img src={ImagenInicio} alt="Fots" width={500} height={900} />
        </div>
      </main>

      <section className="features-section">
        <div className="feature-item">
          <i className="material-icons feature-icon"></i>
          <span>Realidad Aumentada</span>
        </div>
        <div className="feature-item">
          <i className="fas fa-headset feature-icon"></i>
          <span>Soporte Técnico</span>
        </div>
        <div className="feature-item">
          <i className="fas fa-comments feature-icon"></i>
          <span>Comunicación</span>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Asistencia AR. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default AsistenciaRA;