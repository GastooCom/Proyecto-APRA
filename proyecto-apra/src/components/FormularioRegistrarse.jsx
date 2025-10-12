import React, { useState } from "react";
import "../css/FormularioRegistrarse.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { crearUsuario } from "../services/usuarioService";

const FormularioRegistrarse = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  // Expresión regular para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    // Validaciones
    if (!usuario.trim() || !email.trim() || !contrasena.trim() || !rol.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Ingrese un correo electrónico válido");
      return;
    }

    if (contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      // Crear usuario con Firebase Authentication
      const result = await createUserWithEmailAndPassword(auth, email, contrasena);

      // Guardar en Firestore
      const nuevoUsuario = {
        uid: result.user.uid,
        usuario,
        email,
        rol,
      };

      await crearUsuario(nuevoUsuario);

      setExito("Usuario registrado correctamente");
      setUsuario("");
      setEmail("");
      setContrasena("");
      setRol("");
      navigate("/iniciar-sesion");
    } catch (err) {
      console.error("Error en registro:", err);
      setError("Hubo un problema al registrar el usuario");
    }
  };

  return (
    <div className="pagina-registro">
      <div className="contenedor-registro">
        <button className="boton-volver" onClick={() => navigate("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
        </button>

        <div className="form_area">
          <p className="titulo-registrarse">Regístrate</p>

          <form onSubmit={handleSubmit} autoComplete="on">
            {/* Usuario */}
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

            {/* Correo electrónico */}
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Correo electrónico</label>
              <input
                className="form_style"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su correo electrónico"
                required
              />
            </div>

            {/* Contraseña */}
            <div className="form_group">
              <label className="sub_title" htmlFor="contrasena">Contraseña</label>
              <input
                className="form_style"
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Ingrese una contraseña"
                minLength={6}
                required
              />
            </div>

            {/* Rol */}
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

            <button className="btn" type="submit">Registrarse</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {exito && <p style={{ color: "green" }}>{exito}</p>}

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
