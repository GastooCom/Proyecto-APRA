import React, { useState } from "react";
import "../css/FormularioRegistrarse.css";
import { useNavigate } from "react-router-dom";

import { crearUsuario } from "../services/usuarioService";

const FormularioRegistrarse = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!usuario || !contrasena || !rol) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const result = await crearUsuario({ usuario, contrasena, rol });

      if (result) {
        setExito("Usuario registrado correctamente");
        setUsuario("");
        setContrasena("");
        setRol("");
      } else {
        setError("No se pudo registrar el usuario");
      }
    } catch (err) {
      console.error("Error en registro:", err);
      setError("Hubo un problema al registrar");
    }
  };

  return (
    <div className="pagina-registro">
      <div className="contenedor-registro">
        <button className="boton-volver" onClick={() => navigate("/")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
        </button>

        <div className="form_area">
          <p className="titulo-registrarse">Regístrate</p>

          <form onSubmit={handleSubmit} autoComplete="on">
            {}
            <div className="form_group">
              <label className="sub_title" htmlFor="usuario">Usuario</label>
              <input
                className="form_style"
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingrese un nombre de usuario"
                required
              />
            </div>

            {}
            <div className="form_group">
              <label className="sub_title" htmlFor="contrasena">Contraseña</label>
              <input
                className="form_style"
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Ingrese una contraseña"
                required
              />
            </div>

            {}
            <div className="form_group">
              <label className="sub_title" htmlFor="rol">Rol</label>
              <input
                className="form_style"
                type="text"
                id="rol"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                placeholder="Ej: admin, usuario"
                required
              />
            </div>

            {}
            <button className="btn" type="submit">Registrarse</button>

            {}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {exito && <p style={{ color: "green" }}>{exito}</p>}

            {}
            <p className="texto-pie">
              ¿Ya tienes una Cuenta?{" "}
              <button
                onClick={() => navigate("/iniciar-sesion")}
                className="link-button"
                type="button"
              >
                Iniciar Sesión
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioRegistrarse;
