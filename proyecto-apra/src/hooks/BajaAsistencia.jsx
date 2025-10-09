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

  const{
    actualizarAsistencia
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
        <div className="fila-eliminar encabezado">
          <div className="celda">#</div>
          <div className="celda">Curso</div>
          <div className="celda">División</div>
          <div className="celda">Nombre</div>
          <div className="celda">Fecha</div>
          <div className="celda">Estado</div>
          <div className="celda">Acción</div>
        </div>

         {datosAsistencia.map((registro) => (
          <div className="fila-eliminar" key={registro.id}>
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
