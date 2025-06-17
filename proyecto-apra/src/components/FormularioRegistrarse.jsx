import React from "react";
import "../css/FormularioRegistrarse.css";

const FormularioRegistrarse = () => {
  return (
    <div className="container">
      <div className="form_area">
        <p className="title">Regístrate</p>
        <form action="#" method="post" autoComplete="on">
          {/* Nombre */}
          <div className="form_group">
            <label className="sub_title" htmlFor="name">
              <i className="fas fa-user"></i> Nombre completo
            </label>
            <input
              className="form_style"
              type="text"
              id="name"
              name="name"
              placeholder="Ingrese su nombre completo"
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          {/* Teléfono */}
          <div className="form_group">
            <label className="sub_title" htmlFor="telefono">
              <i className="fas fa-phone"></i> Nº de Teléfono
            </label>
            <input
              className="form_style"
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="Ej: 2991234567"
              pattern="[0-9]{10}"
              required
            />
          </div>

          {/* DNI */}
          <div className="form_group">
            <label className="sub_title" htmlFor="dni">
              <i className="fas fa-id-card"></i> DNI
            </label>
            <input
              className="form_style"
              type="text"
              id="dni"
              name="dni"
              placeholder="Ingrese su DNI"
              pattern="[0-9]{7,8}"
              required
            />
          </div>

          {/* Botón */}
          <button className="btn" type="submit">
            Registrarse
          </button>

          {/* Pie */}
          <p className="texto-pie">
            ¿Ya tienes una Cuenta?{" "}
            <a className="link" href="#">
              Inicia con Google
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistrarse;
