import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario');

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div className="container py-4">

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 p-3 rounded shadow-sm">
        <span className="navbar-brand fw-bold">Sistema de Matrículas</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav me-auto">
            <a className="nav-link" href="/estudiantes">Estudiantes</a>
            <a className="nav-link" href="/materias">Materias</a>
            <a className="nav-link" href="/matriculas">Matricular</a>
          </div>
          <span className="navbar-text me-3">Bienvenido, {usuario}</span>
          <button className="btn btn-outline-danger" onClick={cerrarSesion}>Salir</button>
        </div>
      </nav>

      {/* CARDS DASHBOARD */}
      <div className="row g-3 text-center">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card border-primary h-100 shadow-sm hover-shadow">
            <div className="card-body">
              <h5 className="card-title">Estudiantes</h5>
              <p className="card-text">Gestionar registros de alumnos.</p>
              <a href="/estudiantes" className="btn btn-primary btn-sm">Ir</a>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card border-success h-100 shadow-sm hover-shadow">
            <div className="card-body">
              <h5 className="card-title">Materias</h5>
              <p className="card-text">Ver y agregar nuevas asignaturas.</p>
              <a href="/materias" className="btn btn-success btn-sm">Ir</a>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-lg-4">
          <div className="card border-warning h-100 shadow-sm hover-shadow">
            <div className="card-body">
              <h5 className="card-title">Matrículas</h5>
              <p className="card-text">Asignar materias a estudiantes.</p>
              <a href="/matriculas" className="btn btn-warning btn-sm">Ir</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
