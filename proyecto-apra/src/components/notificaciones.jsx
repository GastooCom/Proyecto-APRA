import React from 'react';

const Notificaciones = () => {
  return (
    <div className="container">
      <h1 className="titulo">PERMISO DE NOTIFICACIONES</h1>
      <div className="card">
        {/* Icono de campana al lado izquierdo */}
        <i className="fas fa-bell icon"></i>
        <p className="text">¿Quieres permitir que te envíen y recibas notificaciones?</p>
        <div className="buttons">
          <button className="reject">RECHAZAR</button>
          <button className="allow">PERMITIR</button>
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
