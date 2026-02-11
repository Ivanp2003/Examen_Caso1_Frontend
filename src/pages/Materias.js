import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Materias = () => {
    const [materias, setMaterias] = useState([]);
    const API_URL = 'http://localhost:8080/backend-api/api/materias';

    useEffect(() => {
        cargarMaterias();
    }, []);

    const cargarMaterias = async () => {
        try {
            const res = await axios.get(API_URL);
            setMaterias(res.data);
        } catch (err) { console.error("Error cargando materias", err); }
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Materias</h2>
            <button className="btn btn-success mb-3">Nueva Materia</button>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Créditos</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.map(m => (
                        <tr key={m.id}>
                            <td>{m.codigo}</td>
                            <td>{m.nombre}</td>
                            <td>{m.creditos}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Materias;