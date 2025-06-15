import "../css/Asistencia.css";
import React from 'react';
import { createRoot } from 'react-dom/client';


// Datos de ejemplo
const attendanceData = [
    { id: 1, curso: '6to', division: '3era', nombre: 'Gaston Frigo', fecha: '2025-06-15', asistencia: 'Presente' },
    { id: 2, curso: '6to', division: '3era', nombre: 'Joaquin Lema', fecha: '2025-06-15', asistencia: 'Ausente' },
    { id: 3, curso: '6to', division: '3era', nombre: 'Aquiles Font', fecha: '2025-06-15', asistencia: 'Presente' },
    { id: 4, curso: '6to', division: '3era', nombre: 'Facundo Carrasco', fecha: '2025-06-15', asistencia: 'Tarde' },
    { id: 5, curso: '6to', division: '3era', nombre: 'Mateo Acunia', fecha: '2025-06-15', asistencia: 'Presente' },
    { id: 6, curso: '6to', division: '3era', nombre: 'Wanda Maximoff', fecha: '2025-06-15', asistencia: 'Presente' },
    { id: 7, curso: '6to', division: '3era', nombre: 'Scarlet Johanson', fecha: '2025-06-15', asistencia: 'Ausente' },
    { id: 8, curso: '6to', division: '3era', nombre: 'Rodrigo Tapari', fecha: '2025-06-15', asistencia: 'Presente' },
];

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
/*
<td>
                                <span className={`status ${getStatusClass(record.asistencia)}`}>
                                    {record.asistencia}
                                </span>
                            </td>
*/
export default function Asistencia(){
    return (
        <div className="container">
            <h1>Asistencia de Alumnos</h1>
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
                                <span className={`status ${getStatusClass(record.asistencia)}`}>
                                    {record.asistencia}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);