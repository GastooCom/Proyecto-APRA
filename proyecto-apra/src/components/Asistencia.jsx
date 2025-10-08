import "../css/Asistencia.css";
import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import "@fontsource/source-code-pro";
import "@fontsource/source-code-pro/900.css"; // Título en negrita
import { useNavigate } from "react-router-dom";
import { useAsistencias } from "../hooks/useAsistencias";
import { db } from "../firebase/firebase";
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";
import { useEffect } from "react"; 

  /*
  const [datosAsistencia, setDatosAsistencia] = useState([
    { id: 1, curso: '6to', division: '3era', nombre: 'Gaston Frigo', fecha: '2025-06-15', estado: 'Presente' },
    { id: 2, curso: '6to', division: '3era', nombre: 'Joaquin Lema', fecha: '2025-06-15', estado: 'Ausente' },
    { id: 3, curso: '6to', division: '3era', nombre: 'Aquiles Font', fecha: '2025-06-15', estado: 'Presente' },
    { id: 4, curso: '6to', division: '3era', nombre: 'Facundo Carrasco', fecha: '2025-06-15', estado: 'Tarde' },
    { id: 5, curso: '6to', division: '3era', nombre: 'Mateo Acunia', fecha: '2025-06-15', estado: 'Presente' },
    ]);
  */
    export default function Asistencia() {
  const navigate = useNavigate();
  const {
    datosAsistencia,
    actualizarAsistencia,
    borrarAsistencia,
    loading,
  } = useAsistencias();

  const obtenerClaseEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case "presente":
        return "estado-presente";
      case "ausente":
        return "estado-ausente";
      case "tarde":
        return "estado-tarde";
      default:
        return "";
    }
  };

  if (loading) return <p>Cargando asistencias...</p>;

  return (
    <div className="contenedor-asistencia">
      {/* Botón volver */}
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

      <h1 className="titulo-asistencia">Asistencia de Estudiantes</h1>

      {/* Botón para ir a AltaAsistencia */}
      <div className="acciones-superiores">
        <button
          className="boton-nueva-asistencia"
          onClick={() => navigate("/alta-asistencia")}
        >
          Nueva Asistencia
        </button>
        <button
          className="boton-baja-asistencia"
          onClick={() => navigate("/baja-asistencia")}
        >
          Eliminar Asistencia
        </button>

        <button
          className="boton-modificar-asistencia"
          onClick={() => navigate("/modificar-asistencia")}
        >
         Modificar Asistencia
        </button>
      </div>

      {/* Tabla de asistencias */}
      <div className="tabla-asistencia">
        <div className="fila encabezado">
          <div className="celda">#</div>
          <div className="celda">Curso</div>
          <div className="celda">División</div>
          <div className="celda">Nombre y Apellido</div>
          <div className="celda">Fecha</div>
          <div className="celda">Estado</div>
        </div>

        {datosAsistencia.map((registro) => (
          <div className="fila" key={registro.id}>
            <div className="celda">{registro.numero}</div>

            <div className="celda">
              <input
                type="text"
                value={registro.curso}
                onChange={(e) =>
                  actualizarAsistencia(registro.id, "curso", e.target.value)
                }
              />
            </div>

            <div className="celda">
              <input
                type="text"
                value={registro.division}
                onChange={(e) =>
                  actualizarAsistencia(registro.id, "division", e.target.value)
                }
              />
            </div>

            <div className="celda">
              <input
                type="text"
                value={registro.nombre}
                onChange={(e) =>
                  actualizarAsistencia(registro.id, "nombre", e.target.value)
                }
              />
            </div>

            <div className="celda">
              <input
                type="date"
                value={registro.fecha}
                onChange={(e) =>
                  actualizarAsistencia(registro.id, "fecha", e.target.value)
                }
              />
            </div>

            <div className="celda">
              <select
                value={registro.estado}
                onChange={(e) =>
                  actualizarAsistencia(registro.id, "estado", e.target.value)
                }
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