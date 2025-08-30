import ReactDOM from 'react-dom/client';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PáginaInicio from './components/PáginaInicio';
import Asistencia from './components/Asistencia';
import FormularioRegistrarse from './components/FormularioRegistrarse';
import FormularioIniciarSesion from './components/FormularioIniciarSesion';
import Notificaciones from './components/Notificaciones';
import PermisoCamara from './components/PermisoCamara';
import React, { useState } from 'react';

//const root = ReactDOM.createRoot(document.getElementById("root"));

/*function App(){
  return(
    <div>
      <FormularioIniciarSesion/>
    </div>
  );
}
*/
/*
const App = () => {
  const [user, setUser] = useState(null);
}

/*function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/*" element={user ? <AppRouter user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
 HEAD
};
}
*/


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PáginaInicio />} />
        <Route path="/asistencia" element={<Asistencia />} />
        <Route path="/registrarse" element={<FormularioRegistrarse />} />
        <Route path="/iniciar-sesion" element={<FormularioIniciarSesion />} />
        <Route path="/permisosnoti" element={<Notificaciones />} />
        <Route path="/permisoscam" element={<PermisoCamara />} />
      </Routes>
    </Router>
  );
}
export default App;