import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Estudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [busqueda, setBusqueda] = useState(''); // Para cumplir con "Filtros"

    useEffect(() => {
        cargarEstudiantes();
    }, []);

    const cargarEstudiantes = async () => {
        const res = await axios.get('http://localhost:8080/backend-api/api/estudiantes');
        setEstudiantes(res.data);
    };

    // Filtro de búsqueda por nombre o cédula
    const estudiantesFiltrados = estudiantes.filter(est => 
        est.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        est.cedula.includes(busqueda)
    );

    return (
        <div className="container mt-4">
            <h2>Gestión de Estudiantes</h2>
            <input 
                type="text" 
                className="form-control mb-3" 
                placeholder="Buscar por nombre o cédula..." 
                onChange={(e) => setBusqueda(e.target.value)}
            />
            <table className="table table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantesFiltrados.map(est => (
                        <tr key={est.id}>
                            <td>{est.cedula}</td>
                            <td>{est.nombre}</td>
                            <td>{est.apellido}</td>
                            <td>{est.correo}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2">Editar</button>
                                <button className="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Estudiantes;