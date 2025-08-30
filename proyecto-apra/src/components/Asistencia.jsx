import "../css/Asistencia.css";
import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import "@fontsource/source-code-pro";
import "@fontsource/source-code-pro/900.css"; // Título en negrita
import { useNavigate } from "react-router-dom";

export default function Asistencia() {
  const [datosAsistencia, setDatosAsistencia] = useState([
    { id: 1, curso: '6to', division: '3era', nombre: 'Gaston Frigo', fecha: '2025-06-15', estado: 'Presente' },
    { id: 2, curso: '6to', division: '3era', nombre: 'Joaquin Lema', fecha: '2025-06-15', estado: 'Ausente' },
    { id: 3, curso: '6to', division: '3era', nombre: 'Aquiles Font', fecha: '2025-06-15', estado: 'Presente' },
    { id: 4, curso: '6to', division: '3era', nombre: 'Facundo Carrasco', fecha: '2025-06-15', estado: 'Tarde' },
    { id: 5, curso: '6to', division: '3era', nombre: 'Mateo Acunia', fecha: '2025-06-15', estado: 'Presente' },
    { id: 6, curso: '6to', division: '3era', nombre: 'Wanda Maximoff', fecha: '2025-06-15', estado: 'Presente' },
    { id: 7, curso: '6to', division: '3era', nombre: 'Scarlet Johanson', fecha: '2025-06-15', estado: 'Ausente' },
    { id: 8, curso: '6to', division: '3era', nombre: 'Rodrigo Tapari', fecha: '2025-06-15', estado: 'Presente' },
  ]);

  const obtenerClaseEstado = (estado) => {
    switch (estado.toLowerCase()) {
      case 'presente':
        return 'estado-presente';
      case 'ausente':
        return 'estado-ausente';
      case 'tarde':
        return 'estado-tarde';
      default:
        return '';
    }
  };

  const manejarCambio = (id, campo, valor) => {
    const nuevosDatos = datosAsistencia.map((registro) =>
      registro.id === id ? { ...registro, [campo]: valor } : registro
    );
    setDatosAsistencia(nuevosDatos);
  };

  const navigate = useNavigate();

  return (
      <div className="contenedor-asistencia">
         
        <button className="boton-volver" onClick={() => navigate("/")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <h1 className="titulo-asistencia">Asistencia de Estudiantes</h1><br />

        <div className="tabla-asistencia">
          <div className="fila encabezado">
            <div className="celda">ID</div>
            <div className="celda">Curso</div>
            <div className="celda">División</div>
            <div className="celda">Nombre y Apellido</div>
            <div className="celda">Fecha</div>
            <div className="celda">Asistencia</div>
          </div>
          
          {datosAsistencia.map((registro) => (
            <div className="fila" key={registro.id}>
              <div className="celda">{registro.id}</div>
              <div className="celda">
                <input
                  type="text"
                  value={registro.curso}
                  onChange={(e) => manejarCambio(registro.id, "curso", e.target.value)}
                />
              </div>
              <div className="celda">
                <input
                  type="text"
                  value={registro.division}
                  onChange={(e) => manejarCambio(registro.id, "division", e.target.value)}
                />
              </div>
              <div className="celda">
                <input
                  type="text"
                  value={registro.nombre}
                  onChange={(e) => manejarCambio(registro.id, "nombre", e.target.value)}
                />
              </div>
              <div className="celda">
                <input
                  type="date"
                  value={registro.fecha}
                  onChange={(e) => manejarCambio(registro.id, "fecha", e.target.value)}
                />
              </div>
              <div className="celda">
                <select
                  value={registro.estado}
                  onChange={(e) => manejarCambio(registro.id, "estado", e.target.value)}
                  className={`estado ${obtenerClaseEstado(registro.estado)}`}
                >
                  <option value="Presente">Presente</option>
                  <option value="Ausente">Ausente</option>
                  <option value="Tarde">Tarde</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
} 
/*
const contenedor = document.getElementById('root');
const root = createRoot(contenedor);
root.render(<Asistencia />);
*/