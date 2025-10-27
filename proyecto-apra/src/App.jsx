import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PáginaInicio from "./components/PáginaInicio";
import Asistencia from "./components/Asistencia";
import AltaAsistencia from "./hooks/AltaAsistencia";
import BajaAsistencia from "./hooks/BajaAsistencia";
import ModificarAsistencia from "./hooks/ModificarAsistencia";
import FormularioRegistrarse from "./components/FormularioRegistrarse";
import FormularioIniciarSesion from "./components/FormularioIniciarSesion";
import Notificaciones from "./components/Notificaciones";
import PermisoCamara from "./components/PermisoCamara";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import "./App.css";

/*GASTON DEJAME IIIIRRRRR*/


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🌐 Rutas públicas */}
          <Route path="/" element={<PáginaInicio />} />
          <Route path="/registrarse" element={<FormularioRegistrarse />} />
          <Route path="/iniciar-sesion" element={<FormularioIniciarSesion />} />

          {/* 🔒 Rutas protegidas */}
          <Route
            path="/asistencia"
            element={
              <ProtectedRoute>
                <Asistencia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alta-asistencia"
            element={
              <ProtectedRoute>
                <AltaAsistencia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/baja-asistencia"
            element={
              <ProtectedRoute>
                <BajaAsistencia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modificar-asistencia"
            element={
              <ProtectedRoute>
                <ModificarAsistencia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/permisosnoti"
            element={
              <ProtectedRoute>
                <Notificaciones />
              </ProtectedRoute>
            }
          />
          <Route
            path="/permisoscam"
            element={
              <ProtectedRoute>
                <PermisoCamara />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;