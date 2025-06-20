import "../css/Asistencia.css";
import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import "@fontsource/source-code-pro";
import "@fontsource/source-code-pro/900.css";//Titulo en Bold

export default function Asistencia(){

// Datos de ejemplo
const [attendanceData, setAttendanceData] = useState([
    { id: 1, curso: '6to', division: '3era', nombre: 'Gaston Frigo', fecha: '2025-06-15', asistencia: 'Presente' },
    { id: 2, curso: '6to', division: '3era', nombre: 'Joaquin Lema', fecha: '2025-06-15', asistencia: 'Ausente' },
    { id: 3, curso: '6to', division: '3era', nombre: 'Aquiles Font', fecha: '2025-06-15', asistencia: 'Presente' },
    { id: 4, curso: '6to', division: '3era', nombre: 'Facundo Carrasco', fecha: '2025-06-15', asistencia: 'Tarde' },
    { id: 5, curso: '6to', division: '3era', nombre: 'Mateo Acunia', fecha: '2025-06-15', asistencia: 'Presente' },
    { id: 6, curso: '6to', division: '3era', nombre: 'Wanda Maximoff', fecha: '2025-06-15', asistencia: 'Presente' },
    { id: 7, curso: '6to', division: '3era', nombre: 'Scarlet Johanson', fecha: '2025-06-15', asistencia: 'Ausente' },
    { id: 8, curso: '6to', division: '3era', nombre: 'Rodrigo Tapari', fecha: '2025-06-15', asistencia: 'Presente' },
]);

const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'presente':
                return 'status-presente';
            case 'ausente':
                return 'status-ausente';
            case 'tarde':
                return 'status-tarde';
            default:
                return '';
        }
    }

const handleChange = (id, newStatus) => {
    const nuevosDatos = attendanceData.map((registro) =>
      registro.id === id ? { ...registro, asistencia: newStatus } : registro
    );
    setAttendanceData(nuevosDatos);
};

    return (
        <div className="body-asistencia">
        <div className="contenedor-asistencia">
            <h1 class="titulo-asistencia">Asistencia de Alumnos</h1><br></br>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Curso</th>
                        <th>División</th>
                        <th>Nombre y Apellido</th>
                        <th>Fecha</th>
                        <th>Asistencia</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map((record) => (
                        <tr key={record.id}>
                            <td>{record.curso}</td>
                            <td>{record.division}</td>
                            <td>{record.nombre}</td>
                            <td>{record.fecha}</td>
                            <td>
                                <select
                                    value={record.asistencia}
                                    onChange={(e) => handleChange(record.id, e.target.value)}
                                    className={`status ${getStatusClass(record.asistencia)}`}
                                >
                                    <option value="Presente">Presente</option>
                                    <option value="Ausente">Ausente</option>
                                    <option value="Tarde">Tarde</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);