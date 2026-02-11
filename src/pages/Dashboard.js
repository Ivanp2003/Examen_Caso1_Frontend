import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const usuario = localStorage.getItem('usuario');

    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
        navigate('/');
    };

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 p-3 rounded">
                <span className="navbar-brand">Sistema de Matrículas</span>
                <div className="navbar-nav me-auto">
                    <Link className="nav-link" to="/estudiantes">Estudiantes</Link>
                    <Link className="nav-link" to="/materias">Materias</Link>
                    <Link className="nav-link" to="/matriculas">Matricular</Link>
                </div>
                <span className="navbar-text me-3">Bienvenido, {usuario}</span>
                <button className="btn btn-outline-danger" onClick={cerrarSesion}>Salir</button>
            </nav>

            <div className="row text-center">
                <div className="col-md-4">
                    <div className="card border-primary mb-3">
                        <div className="card-body">
                            <h3>Estudiantes</h3>
                            <p>Gestionar registros de alumnos.</p>
                            <Link to="/estudiantes" className="btn btn-primary">Ir</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-success mb-3">
                        <div className="card-body">
                            <h3>Materias</h3>
                            <p>Ver y agregar nuevas asignaturas.</p>
                            <Link to="/materias" className="btn btn-success">Ir</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-warning mb-3">
                        <div className="card-body">
                            <h3>Matrículas</h3>
                            <p>Asignar materias a estudiantes.</p>
                            <Link to="/matriculas" className="btn btn-warning">Ir</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;