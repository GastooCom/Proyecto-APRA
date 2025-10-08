import React from "react";
import { useNavigate } from "react-router-dom";
import { useAsistencias } from "../hooks/useAsistencias";
import "../css/Asistencia.css";

export default function BajaAsistencia() {
  const navigate = useNavigate();
  const { datosAsistencia, borrarAsistencia, loading } = useAsistencias();

  const handleDelete = async (id, nombre) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar la asistencia de ${nombre}?`
    );
    if (!confirmar) return;

    try {
      await borrarAsistencia(id);
      alert("✅ Asistencia eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar asistencia:", error);
      alert("❌ Error al eliminar la asistencia");
    }
  };

  if (loading) return <p>Cargando asistencias...</p>;

  return (
    <div className="contenedor-asistencia">
      {/* Botón volver */}
      <button className="boton-volver" onClick={() => navigate("/asistencia")}>
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

      <h1 className="titulo-asistencia">Baja de Asistencia</h1>

      {/* Tabla simple con botones de eliminar */}
      <div className="tabla-asistencia">
        <div className="fila encabezado">
          <div className="celda">#</div>
          <div className="celda">Curso</div>
          <div className="celda">División</div>
          <div className="celda">Nombre</div>
          <div className="celda">Fecha</div>
          <div className="celda">Estado</div>
          <div className="celda">Acción</div>
        </div>

        {datosAsistencia.map((registro) => (
          <div className="fila" key={registro.id}>
            <div className="celda">{registro.numero}</div>
            <div className="celda">{registro.curso}</div>
            <div className="celda">{registro.division}</div>
            <div className="celda">{registro.nombre}</div>
            <div className="celda">{registro.fecha}</div>
            <div className="celda">{registro.estado}</div>
            <div className="celda">
              <button
                onClick={() => handleDelete(registro.id, registro.nombre)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
