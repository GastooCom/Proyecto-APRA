import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAsistencias } from "../hooks/useAsistencias";
import "../css/Asistencia.css";

export default function AltaAsistencia() {
  const navigate = useNavigate();
  const { agregarAsistencia } = useAsistencias();

  const [nuevo, setNuevo] = useState({
    curso: "",
    division: "",
    nombre: "",
    fecha: "",
    estado: "Presente",
  });

  const handleChange = (campo, valor) => {
    setNuevo({ ...nuevo, [campo]: valor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!nuevo.curso || !nuevo.division || !nuevo.nombre || !nuevo.fecha) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      await agregarAsistencia(nuevo);
      alert("✅ Asistencia registrada correctamente");

      // limpiar formulario
      setNuevo({
        curso: "",
        division: "",
        nombre: "",
        fecha: "",
        estado: "Presente",
      });

      // volver o quedarse
      navigate("/asistencia"); // o "/" según tu ruta
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
      alert("❌ Ocurrió un error al guardar la asistencia.");
    }
  };

  return (
    <div className="contenedor-asistencia">
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

      <h1 className="titulo-asistencia">Registrar Nueva Asistencia</h1>

      <form onSubmit={handleSubmit} className="form-nueva-asistencia">
        <input
          type="text"
          placeholder="Curso"
          value={nuevo.curso}
          onChange={(e) => handleChange("curso", e.target.value)}
        />

        <input
          type="text"
          placeholder="División"
          value={nuevo.division}
          onChange={(e) => handleChange("division", e.target.value)}
        />

        <input
          type="text"
          placeholder="Nombre y Apellido"
          value={nuevo.nombre}
          onChange={(e) => handleChange("nombre", e.target.value)}
        />

        <input
          type="date"
          value={nuevo.fecha}
          onChange={(e) => handleChange("fecha", e.target.value)}
        />

        <select
          value={nuevo.estado}
          onChange={(e) => handleChange("estado", e.target.value)}
        >
          <option value="Presente">Presente</option>
          <option value="Ausente">Ausente</option>
          <option value="Tarde">Tarde</option>
        </select>

        <button type="submit">Guardar Asistencia</button>
      </form>
    </div>
  );
}
