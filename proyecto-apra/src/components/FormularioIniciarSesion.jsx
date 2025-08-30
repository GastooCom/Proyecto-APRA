import React from "react";
import "../css/FormularioIniciarSesion.css";
import google from "../Imagenes/gooogle.png";
import apple from "../Imagenes/images-removebg-preview.png";
import {useNavigate} from "react-router-dom"

const FormularioIniciarSesion = () => {
  const navigate = useNavigate();

  return (
    <div className="caja-iniciosesion">
    <div className="caja-login">
      <h1>Iniciar Sesión</h1>

      <div className="social-login">
        <button className="btn btn-social btn-google">
          <img src={google} alt="registrar" width={70} height={70}/>
          <span>Continuar con Google</span>
        </button>

        <button className="btn btn-social btn-apple">
          <img src={apple} alt="iniciar" width={70} height={70}/>
          <span>Continuar con Apple</span>
        </button>
      </div>

      <div className="links">
        <p>
          ¿No tienes una cuenta?{" "}
          <button onClick={() => navigate("/registrarse")} className="link-button">
          Regístrate
          </button>
        </p>

      </div>
    </div>
    </div>
  );
  
};
export default FormularioIniciarSesion;
