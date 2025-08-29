import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import PáginaInicio from './components/PáginaInicio';
import Asistencia from './components/Asistencia';
import FormularioRegistrarse from './components/FormularioRegistrarse';
import FormularioIniciarSesion from './components/FormularioIniciarSesion';
import Notificaciones from './components/Notificaciones';
import PermisoCamara from './components/PermisoCamara';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AppRouter from './components/AppRouter';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/*" element={user ? <AppRouter user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;