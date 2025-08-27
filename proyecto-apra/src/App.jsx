import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PáginaInicio from './components/PáginaInicio';
import Asistencia from './components/Asistencia';
import FormularioRegistrarse from './components/FormularioRegistrarse';
import FormularioIniciarSesion from './components/FormularioIniciarSesion';
import Notificaciones from './components/Notificaciones';
import PermisoCamara from './components/PermisoCamara';

//const root = ReactDOM.createRoot(document.getElementById("root"));


function App() {
  return (
    <div>
    <PáginaInicio/>
    <Asistencia/>
    <FormularioRegistrarse/>
    <FormularioIniciarSesion/>
    <Notificaciones/>
    <PermisoCamara/>
  </div>
  );
}
/*
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PáginaInicio />} />
        <Route path="/asistencia" element={<Asistencia />} />
        <Route path="/registrarse" element={<FormularioRegistrarse />} />
        <Route path="/login" element={<FormularioIniciarSesion />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/permisos" element={<PermisoCamara />} />
      </Routes>
    </Router>
  );
}
*/

export default App;