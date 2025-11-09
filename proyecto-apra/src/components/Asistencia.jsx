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

  // Fecha seleccionada para filtrar (YYYY-MM-DD)
  const hoyStr = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(hoyStr);

  // Utilidades de calendario
  const MONTH_NAMES = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];
  const currentYear = new Date().getFullYear();

  const daysInMonth = (year, monthIndex) => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const toYMD = (year, monthIndex, day) => {
    const m = String(monthIndex + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const isSameDate = (ymd) => ymd === selectedDate;

  const filtered = (datosAsistencia || []).filter(r => r?.fecha === selectedDate);

  
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

      {/* Calendario anual simple con scroll */}
      <div style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: 8, marginBottom: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {MONTH_NAMES.map((name, mi) => {
          const total = daysInMonth(currentYear, mi);
          return (
            <div key={mi} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 12, background: '#fafafa' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>{name} {currentYear}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                {[...Array(total)].map((_, di) => {
                  const day = di + 1;
                  const ymd = toYMD(currentYear, mi, day);
                  const active = isSameDate(ymd);
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(ymd)}
                      onDoubleClick={() => { setSelectedDate(ymd); setTimeout(() => { try { document.getElementById('tabla-asistencia')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch {} }, 0); }}
                      style={{
                        padding: '8px 0',
                        borderRadius: 8,
                        border: active ? '2px solid #8a2be2' : '1px solid #e0e0e0',
                        background: active ? 'rgba(138,43,226,0.12)' : 'white',
                        color: active ? '#4b1f8f' : '#333',
                        cursor: 'pointer',
                        fontWeight: active ? 800 : 600
                      }}
                      title={`Ver asistencias del ${ymd}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          );
          })}
        </div>
      </div>

      <div className="acciones-superiores" style={{ alignItems: 'center', gap: 12 }}>
        <div style={{ fontWeight: 700 }}>Fecha seleccionada: {selectedDate}</div>
      </div>

      {/* Botón para ir a AltaAsistencia */}
      <div className="acciones-superiores">
        <button
          className="boton-nueva-asistencia"
          onClick={() => navigate(`/alta-asistencia?fecha=${selectedDate}`)}
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
      <div className="tabla-asistencia" id="tabla-asistencia">
        <div className="fila encabezado">
          <div className="celda">#</div>
          <div className="celda">Curso</div>
          <div className="celda">División</div>
          <div className="celda">Nombre y Apellido</div>
          <div className="celda">Fecha</div>
          <div className="celda">Estado</div>
        </div>

       {filtered.map((registro) => (
          <div className="fila" key={registro.id}>
            <div
              className="celda"
              onDoubleClick={() => setSelectedDate(registro.fecha)}
              title={registro.fecha ? `Ver todas las asistencias del ${registro.fecha}` : undefined}
              style={{ cursor: registro.fecha ? 'pointer' : undefined }}
            >
              {registro.numero}
            </div>
            <div className="celda">{registro.curso}</div>
            <div className="celda">{registro.division}</div>
            <div className="celda">{registro.nombre}</div>
            <div
              className="celda"
              onDoubleClick={() => setSelectedDate(registro.fecha)}
              title={registro.fecha ? `Ver todas las asistencias del ${registro.fecha}` : undefined}
              style={{ cursor: registro.fecha ? 'pointer' : undefined }}
            >
              {registro.fecha}
            </div>
            <div className="celda">{registro.estado}</div>
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