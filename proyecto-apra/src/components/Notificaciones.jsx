import React from 'react';
import "../css/Notificaciones.css";
import miImagen from "../Imagenes/campanavioleta.png";// ruta a tu imagen
import { useNavigate } from 'react-router-dom';
const Notificaciones = () => {

    const navigate = useNavigate();
    const handleAllow = async () => {
      try {
        if (typeof window !== 'undefined' && 'Notification' in window) {
          const res = await Notification.requestPermission();
          if (res === 'granted') {
            localStorage.setItem("permisoNotificaciones", "true");
            try { new Notification('Notificaciones habilitadas'); } catch {}
          }
        }
      } catch {}
    };

    const handleReject = () => {
      localStorage.setItem("permisoNotificaciones", "true");
      navigate('/');
    };

  return (
    <div className="contenedor-notificaciones">
         
        <button className="boton-volver" onClick={() => navigate("/")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
        </button>

      <h1 className="titulo">PERMISO DE NOTIFICACIONES</h1>
      <div className="card">
        {/* Icono de campana al lado izquierdo */}
        <i className="fas fa-bell icon"></i>

        <div className='caja-campana'>
        <div className='campana'>
        <img src={miImagen} alt="campana" width={70} height={70}/>
        </div>
        <p className="text-campana">¿Quieres permitir que te envíen y recibas notificaciones?</p>
        </div>

        <div className="buttons">
          <button className="reject" onClick={handleReject}>RECHAZAR</button>
          <button className="allow" onClick={handleAllow}>PERMITIR</button> 
        </div>
      </div>
      <footer className="footer">
        Argentina S.A. – Av. Cramer 3226 Piso 3A, 1429 Ciudad Autónoma de Buenos Aires, Argentina – ©2025 RA Support Argentina – Made in Argentina<br />
        La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.<br />
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </footer>
    </div>
  );
};

export default Notificaciones;
