import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getEstudiantes, getMaterias, getMatriculas } from '../services/api.jsx';
import estudiantesImg from '../images/estudiantes.webp';
import materiasImg from '../images/materias.webp';
import inscripcionImg from '../images/inscripcion.webp';

const Dashboard = () => {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    estudiantes: 0,
    materias: 0,
    matriculas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [estudiantesRes, materiasRes, matriculasRes] = await Promise.all([
        getEstudiantes(),
        getMaterias(),
        getMatriculas()
      ]);
      
      setStats({
        estudiantes: estudiantesRes?.length || 0,
        materias: materiasRes?.length || 0,
        matriculas: matriculasRes?.length || 0
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const menuItems = [
    { 
      id: 'estudiantes', 
      title: 'Estudiantes', 
      description: 'Gestión de registros de alumnos', 
      icon: '👥', 
      color: 'primary',
      stats: stats.estudiantes,
      image: estudiantesImg
    },
    { 
      id: 'materias', 
      title: 'Materias', 
      description: 'Catálogo de asignaturas', 
      icon: '📚', 
      color: 'success',
      stats: stats.materias,
      image: materiasImg
    },
    { 
      id: 'matriculas', 
      title: 'Matrículas', 
      description: 'Asignación de materias', 
      icon: '📝', 
      color: 'warning',
      stats: stats.matriculas,
      image: inscripcionImg
    }
  ];

  return (
    <div className="dashboard-container min-vh-100 bg-light">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo-circle-small">
              <span className="logo-text-small">SM</span>
            </div>
            <h5 className="brand-name">Sistema de Matrículas</h5>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h6 className="nav-section-title">Menú Principal</h6>
            {menuItems.map(item => (
              <Link 
                key={item.id}
                to={`/${item.id}`}
                className="nav-item"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <div className="nav-content">
                  <span className="nav-title">{item.title}</span>
                  <span className="nav-stats">{item.stats}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <span>{usuario ? usuario.charAt(0).toUpperCase() : 'U'}</span>
            </div>
            <div className="user-details">
              <span className="user-name">{usuario || 'Usuario'}</span>
              <span className="user-role">Administrador</span>
            </div>
          </div>
          <button className="logout-btn" onClick={cerrarSesion}>
            <span className="logout-icon">🚪</span>
            <span>Salir</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <button 
              className="menu-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="menu-icon">☰</span>
            </button>
            <div className="breadcrumb">
              <span className="breadcrumb-item">Inicio</span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-item active">Dashboard</span>
            </div>
          </div>
          
          <div className="top-bar-right">
            <div className="datetime-display">
              <div className="time">{formatTime(currentTime)}</div>
              <div className="date">{formatDate(currentTime)}</div>
            </div>
            <div className="notification-area">
              <button className="notification-btn">
                <span className="notification-icon">🔔</span>
                <span className="notification-badge">3</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-main">
          {/* Welcome Section */}
          <section className="welcome-section mb-4">
            <div className="welcome-content">
              <h1 className="welcome-title">
                ¡Bienvenido de nuevo, <span className="user-highlight">{usuario}</span>!
              </h1>
              <p className="welcome-subtitle">
                Gestiona eficientemente el sistema académico desde tu panel central
              </p>
            </div>
            <div className="welcome-stats">
              <div className="stat-card">
                <div className="stat-number">{loading ? '...' : stats.estudiantes}</div>
                <div className="stat-label">Total Estudiantes</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{loading ? '...' : stats.materias}</div>
                <div className="stat-label">Materias Activas</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{loading ? '...' : stats.matriculas}</div>
                <div className="stat-label">Matrículas</div>
              </div>
            </div>
          </section>

          {/* Quick Actions Grid */}
          <section className="quick-actions-section">
            <h2 className="section-title">Acciones Rápidas</h2>
            <div className="actions-grid">
              {menuItems.map(item => (
                <Link 
                  key={item.id}
                  to={`/${item.id}`}
                  className="action-card"
                >
                  <div className="action-card-image">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="card-image"
                    />
                    <div className="image-overlay-card"></div>
                  </div>
                  <div className="action-card-header">
                    <div className="action-icon-wrapper bg-{item.color}-light">
                      <span className="action-icon">{item.icon}</span>
                    </div>
                    <div className="action-stats">
                      <span className="stats-number">{item.stats}</span>
                    </div>
                  </div>
                  <div className="action-card-body">
                    <h3 className="action-title">{item.title}</h3>
                    <p className="action-description">{item.description}</p>
                  </div>
                  <div className="action-card-footer">
                    <span className="action-link">Acceder →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="recent-activity-section mt-4">
            <h2 className="section-title">Actividad Reciente</h2>
            <div className="activity-card">
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">👤</div>
                  <div className="activity-content">
                    <span className="activity-text">Nuevo estudiante registrado</span>
                    <span className="activity-time">Hace 5 minutos</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📚</div>
                  <div className="activity-content">
                    <span className="activity-text">Materia actualizada</span>
                    <span className="activity-time">Hace 1 hora</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📝</div>
                  <div className="activity-content">
                    <span className="activity-text">Matrícula procesada</span>
                    <span className="activity-time">Hace 2 horas</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
