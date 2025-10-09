import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAsistencias } from "../hooks/useAsistencias";
import "../css/Asistencia.css";

export default function ModificarAsistencia() {
  const navigate = useNavigate();
  const { datosAsistencia, actualizarAsistencia, loading } = useAsistencias();
  const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState(null);
  const [formData, setFormData] = useState({
    curso: "",
    division: "",
    nombre: "",
    fecha: "",
    estado: "",
  });

  const handleSelect = (asistencia) => {
    setAsistenciaSeleccionada(asistencia.id);
    setFormData({
      curso: asistencia.curso,
      division: asistencia.division,
      nombre: asistencia.nombre,
      fecha: asistencia.fecha,
      estado: asistencia.estado,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!asistenciaSeleccionada) return alert("Seleccioná una asistencia.");
    try {
      await actualizarAsistencia(asistenciaSeleccionada, formData);
      alert("✅ Asistencia actualizada correctamente");
      setAsistenciaSeleccionada(null);
    } catch (error) {
      alert("❌ Error al actualizar asistencia");
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

      <h1 className="titulo-asistencia">Modificar Asistencia</h1>

      {/* Listado de asistencias */}
      <div className="tabla-asistencia">
        <div className="fila-modificar encabezado">
          <div className="celda">#</div>
          <div className="celda">Curso</div>
          <div className="celda">División</div>
          <div className="celda">Nombre</div>
          <div className="celda">Fecha</div>
          <div className="celda">Estado</div>
          <div className="celda">Acción</div>
        </div>

        {datosAsistencia.map((registro) => (
          <div className="fila-modificar" key={registro.id}>
            <div className="celda">{registro.numero}</div>
            <div className="celda">{registro.curso}</div>
            <div className="celda">{registro.division}</div>
            <div className="celda">{registro.nombre}</div>
            <div className="celda">{registro.fecha}</div>
            <div className="celda">{registro.estado}</div>
            <div className="celda">
              <button
                onClick={() => handleSelect(registro)}
                style={{
                  background: "#ffc107",
                  color: "black",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Formulario de edición */}
      {asistenciaSeleccionada && (
        <form onSubmit={handleUpdate} className="formulario-edicion">
          <div className="campo">
            <label>Curso:</label>
            <input
              type="text"
              name="curso"
              value={formData.curso}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label>División:</label>
            <input
              type="text"
              name="division"
              value={formData.division}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label>Estado:</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="Presente">Presente</option>
              <option value="Ausente">Ausente</option>
              <option value="Tarde">Tarde</option>
            </select>
          </div>

          <button type="submit" className="boton-guardar">
            Guardar Cambios
          </button>
        </form>
      )}

    </div>
  );
}
