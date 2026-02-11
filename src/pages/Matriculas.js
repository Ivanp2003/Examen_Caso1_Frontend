import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Matriculas = () => {
    const [matriculas, setMatriculas] = useState([]);
    const API_URL = 'http://localhost:8080/backend-api/api/matriculas';

    useEffect(() => {
        cargarMatriculas();
    }, []);

    const cargarMatriculas = async () => {
        try {
            const res = await axios.get(API_URL);
            setMatriculas(res.data);
        } catch (err) { console.error("Error cargando matrículas", err); }
    };

    return (
        <div className="container mt-4">
            <h2>Registro de Matrículas</h2>
            <div className="alert alert-info">Aquí se visualiza la unión de Estudiantes y Materias.</div>
            <table className="table table-hover">
                <thead className="table-info">
                    <tr>
                        <th>Estudiante</th>
                        <th>Materia</th>
                    </tr>
                </thead>
                <tbody>
                    {matriculas.map((mat, index) => (
                        <tr key={index}>
                            <td>{mat.nombreEstudiante}</td>
                            <td>{mat.nombreMateria}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Matriculas;