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

export default App;
