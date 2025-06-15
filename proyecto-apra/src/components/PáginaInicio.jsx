// Home.jsx
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { FaHeadset } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
<<<<<<< HEAD
import { MdViewInAr } from "react-icons/md";
=======
//import { SiAugmentedreality } from "react-icons/si";
>>>>>>> cad6858f61ebf3f7bac0d4f6d2e6479846266af6
import "../css/PáginaInicio.css";

export default function Inicio() {
  return (
    <div className="inicio-container">
      {/* Header */}
      <header className="inicio-header">
        <div className="header-left">
          <div className="logo-placeholder" />
          <nav className="nav-menu">
            <a href="#">Inicio</a>
            <a href="#">Asistencia</a>
            <a href="#">Permisos</a>
          </nav>
        </div>
        <div className="header-right">
          <a href="#" className="login-button">Iniciar sesión</a>
          <a href="#" className="register-button">Registrarse</a>
        </div>
      </header>

      {/* Social bar */}
      <div className="social-bar">
        <FaInstagram className="icon" />
        <FaFacebook className="icon" />
        <FaTiktok className="icon" />
        <FaYoutube className="icon" />
      </div>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-text">
          <h1>
            Asistencia<br/>
            Realidad<br/>
            Aumentada <MdVisibility className="inline-icon" />
          </h1>
          <p>
            Proporcionamos asistencia experta remota mediante la realidad aumentada
            para técnicos en campo
          </p>
          <button className="info-button">Más información</button>
        </div>
        <div className="hero-image">
          <img src="/illustration-ar.png" alt="Ilustración" />
        </div>
      </main>

      {/* Features */}
      <section className="features-section">
        <div className="feature-item">
<<<<<<< HEAD
          <MdViewInAr className="feature-icon" />
=======
>>>>>>> cad6858f61ebf3f7bac0d4f6d2e6479846266af6
          <span>Realidad Aumentada</span>
        </div>
        <div className="feature-item">
          <FaHeadset className="feature-icon" />
          <span>Soporte Técnico</span>
        </div>
        <div className="feature-item">
          <FaComments className="feature-icon" />
          <span>Comunicación</span>
        </div>
      </section>
    </div>
  );
}
