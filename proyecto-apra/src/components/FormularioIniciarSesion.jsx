import React, { useState } from "react";
import "../css/FormularioIniciarSesion.css";
import google from "../Imagenes/gooogle.png";
import apple from "../Imagenes/images-removebg-preview.png";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from "firebase/auth";

// 👇 Importa la función que creamos en services
import { crearUsuario } from "../services/usuarioService";

const FormularioIniciarSesion = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [credenciales, setCredenciales] = useState({
    usuario: "",
    contrasena: "",
  });
  const [user, setUser] = useState(null);

  // 🔹 Login con Google
  const handleGoogleLogin = async () => {
    setError("");
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        uid: result.user.uid,
        usuario: result.user.displayName,
        email: result.user.email,
        rol: "google_user",
      };

      // Guardar en Firestore
      const exito = await crearUsuario(userData);
      if (!exito) {
        console.error("No se pudo guardar el usuario en Firestore ❌");
      } else {
        console.log("Usuario guardado en Firestore ✅");
      }

      setUser(userData);
      localStorage.setItem("usuario", JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      console.error("Google Sign-In error:", err?.code, err?.message);

      if (
        err?.code === "auth/popup-blocked" ||
        err?.code === "auth/cancelled-popup-request"
      ) {
        try {
          await signInWithRedirect(auth, provider);
          return;
        } catch (e2) {
          console.error("Redirect fallback error:", e2?.code, e2?.message);
        }
      }
      setError(
        `No se pudo iniciar sesión con Google (${err?.code || "error-desconocido"}).`
      );
    }
  };

  // 🔹 Login con Email/Password
  const handleLogin = async () => {
    setError("");
    try {
      if (!credenciales.usuario || !credenciales.contrasena) {
        setError("Complete usuario y contraseña");
        return;
      }

      const result = await signInWithEmailAndPassword(
        auth,
        credenciales.usuario,
        credenciales.contrasena
      );

      const userData = {
        uid: result.user.uid,
        usuario: result.user.displayName || credenciales.usuario,
        email: result.user.email,
        rol: "email_user",
      };

      // Guardar en Firestore
      const exito = await crearUsuario(userData);
      if (!exito) {
        console.error("No se pudo guardar el usuario en Firestore ❌");
      } else {
        console.log("Usuario guardado en Firestore ✅");
      }

      setUser(userData);
      localStorage.setItem("usuario", JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="caja-iniciosesion">
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
      <div className="caja-login">
        <h1>Iniciar Sesión</h1>

        <div className="social-login">
          <button
            className="btn btn-social btn-google"
            onClick={handleGoogleLogin}
          >
            <img src={google} alt="registrar" width={70} height={70} />
            <span>Continuar con Google</span>
          </button>

          <button className="btn btn-social btn-apple">
            <img src={apple} alt="iniciar" width={70} height={70} />
            <span>Continuar con Apple</span>
          </button>
        </div>

        <div className="links">
          <p>
            ¿No tienes una cuenta?{" "}
            <button
              onClick={() => navigate("/registrarse")}
              className="link-button"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormularioIniciarSesion;
