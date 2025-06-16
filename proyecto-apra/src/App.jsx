import './App.css';
import FormularioRegistrarse from './components/FormularioRegistrarse';
import PantallaDestino from './components/PantallaDestino';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PáginaInicio from './components/PáginaInicio' ;
import Asistencia from './components/Asistencia';
import Notificaciones from './components/Notificaciones';
import Permisocamara from './components/Permisocamara';

function App() {
  return (
    <div>
    <PáginaInicio/>
  </div>
  );
}
/* 

<Router>
            <Routes>
                <Route path="/" element={<FormularioRegistrarse titulo="Registrarse" />} />
                <Route path="/resultado" element={<PantallaDestino />} />
            </Routes>
        </Router>

function App(){
  return (
    <><div className="App-Barra1">
    </div><div className="App-Barra2">
        <h2>Inicio</h2>
        <h2>Asistencia</h2>
        <h2>Permisos</h2>
      </div></>
  );
}

<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
*/

export default App;
