import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAsistencias } from "../hooks/useAsistencias";
import "../css/Asistencia.css";

export default function AltaAsistencia() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const fechaParam = params.get("fecha") || "";
  const { agregarAsistencia } = useAsistencias();

  const [nuevo, setNuevo] = useState({
    curso: "",
    division: "",
    nombre: "",
    apellido: "",
    fecha: fechaParam,
    estado: "Presente",
    gmailPadres: "",
  });

  const handleChange = (campo, valor) => {
    setNuevo({ ...nuevo, [campo]: valor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!nuevo.curso || !nuevo.division || !nuevo.nombre || !nuevo.apellido || !nuevo.fecha) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      // Mantener compatibilidad: guardar 'nombre' como Nombre + Apellido
      const payload = {
        curso: nuevo.curso,
        division: nuevo.division,
        nombre: `${nuevo.nombre} ${nuevo.apellido}`.trim(),
        fecha: nuevo.fecha,
        estado: nuevo.estado,
        gmailPadres: nuevo.gmailPadres || "",
      };
      await agregarAsistencia(payload);
      alert("✅ Asistencia registrada correctamente");

      // limpiar formulario
      setNuevo({
        curso: "",
        division: "",
        nombre: "",
        apellido: "",
        fecha: "",
        estado: "Presente",
        gmailPadres: "",
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

      <div style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: 8 }}>
      <form onSubmit={handleSubmit} className="form-nueva-asistencia">
        <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, padding: 12, marginBottom: 14 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Datos del alumno</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
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
              placeholder="Nombre"
              value={nuevo.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellido"
              value={nuevo.apellido}
              onChange={(e) => handleChange("apellido", e.target.value)}
            />
          </div>
        </div>

        <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, padding: 12, marginBottom: 14 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Fecha y estado</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
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
          </div>
        </div>

        <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, padding: 12, marginBottom: 14 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Contacto</div>
          <input
            type="email"
            placeholder="Correo de los Padres"
            value={nuevo.gmailPadres}
            onChange={(e) => handleChange("gmailPadres", e.target.value)}
          />
        </div>

        <button type="submit">Guardar Asistencia</button>
      </form>
      </div>
    </div>
  );
}
