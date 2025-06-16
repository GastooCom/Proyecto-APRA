import React from "react";
import "../css/FormularioIniciarSesion.css";

const FormularioIniciarSesion = () => {
  return (
    <div className="body-iniciosesion">
    <div className="contenedor-iniciosesion">
    <div className="Cuadrado-login">
      <h1>Iniciar con Google</h1>

      <div className="Google">
        <img src="src/Imagenes/Google.jpeg" alt="Google" />
        <span>Continuar con Google</span>
      </div>

      <div className="Apple">
        <img src="src/Imagenes/b531b3cd-f41c-4628-9e4a-141d0275ab16.jpeg" alt="Apple" />
        <span>Registrarse con Apple</span>
      </div>
    </div>
    </div>
    </div>
  );
};

export default FormularioIniciarSesion;
