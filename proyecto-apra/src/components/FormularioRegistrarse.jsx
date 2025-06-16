import React from "react";
import "../css/FormularioRegistrarse.css";

// Componente de formulario
const FormularioRegistrarse = () => {
//const navigate = useNavigate();

  return (
    <div className="body">
      <div className="contenedor-registrarse">
        <div className="form_area">
          <h1 className="titulo-registrarse">Regístrate</h1>
          <form>
            <div className="form_group">
              <label className="sub_title" htmlFor="name">
                <i className="fas fa-user"></i> Nombre completo
              </label>
              <input
                className="form_style"
                type="text"
                placeholder="Ingrese su nombre completo"
                id="name"
              />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="telefono">
                <i className="fas fa-phone"></i> Nº de Teléfono
              </label>
              <input
                className="form_style"
                type="tel"
                placeholder="Ingrese su número de teléfono"
                id="telefono"
              />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="dni">
                <i className="fas fa-pen"></i> DNI
              </label>
              <input
                className="form_style"
                type="text"
                placeholder="Ingrese su DNI"
                id="dni"
              />
            </div>
            <button type="submit" className="btn">
              Registrarse
            </button>
            <p className="texto-pie">
              ¿Ya tienes una Cuenta?{" "}
              <a className="link" href="#">
                Inicia con Google
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioRegistrarse;
