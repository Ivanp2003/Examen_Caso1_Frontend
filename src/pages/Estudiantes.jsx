import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEstudiantes, createEstudiante, deleteEstudiante, updateEstudiante } from '../services/api.jsx';
import estudiantesImg from '../images/estudiantes.webp';

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nuevo, setNuevo] = useState({ cedula: '', nombre: '', apellido: '', correo: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);

  const cargar = async () => {
    try { 
      setLoading(true); 
      const data = await getEstudiantes(); 
      setEstudiantes(data || []); 
    }
    catch { 
      setMsg({ text: 'Error al cargar estudiantes', type: 'danger' }); 
    }
    finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { cargar(); }, []);

  const guardar = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) { await updateEstudiante(editingId, nuevo); setMsg({ text: 'Estudiante actualizado', type: 'success' }); setEditingId(null); }
      else { await createEstudiante(nuevo); setMsg({ text: 'Estudiante agregado', type: 'success' }); }
      setNuevo({ cedula: '', nombre: '', apellido: '', correo: '' });
      cargar();
    } catch { setMsg({ text: 'Error al guardar estudiante', type: 'danger' }); }
    finally { setLoading(false); }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Seguro que desea eliminar este estudiante?')) return;
    try { await deleteEstudiante(id); setMsg({ text: 'Estudiante eliminado', type: 'success' }); cargar(); }
    catch { setMsg({ text: 'Error al eliminar estudiante', type: 'danger' }); }
  };

  const editar = (est) => {
    setNuevo({ cedula: est.cedula || '', nombre: est.nombre || '', apellido: est.apellido || '', correo: est.correo || '' });
    setEditingId(est.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => { 
    setEditingId(null); 
    setNuevo({ cedula: '', nombre: '', apellido: '', correo: '' }); 
  };

  const filteredEstudiantes = estudiantes.filter(est => 
    est.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.cedula?.includes(searchTerm) ||
    est.correo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEstudiantes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEstudiantes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const verDetalles = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setShowModal(true);
  };

  return (
    <div className="estudiantes-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/dashboard" className="back-btn">
              <span className="back-icon">←</span>
              <span>Volver al Dashboard</span>
            </Link>
            <h1 className="page-title">
              <span className="title-icon">👥</span>
              Gestión de Estudiantes
            </h1>
            <p className="page-subtitle">Administra el registro de alumnos del sistema</p>
          </div>
          <div className="header-right">
            <div className="stats-card">
              <div className="stat-number">{estudiantes.length}</div>
              <div className="stat-label">Total Estudiantes</div>
            </div>
            <div className="header-image">
              <img 
                src={estudiantesImg} 
                alt="Estudiantes" 
                className="header-img"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alert */}
      {msg.text && (
        <div className="alert-wrapper">
          <div className={`alert alert-${msg.type} alert-dismissible fade show`} role="alert">
            <div className="alert-content">
              <span className="alert-icon">{msg.type === 'success' ? '✓' : '⚠'}</span>
              <span>{msg.text}</span>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setMsg({ text: '', type: '' })}
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

      <div className="content-grid">
        {/* Form Section */}
        <div className="form-section">
          <div className="form-card">
            <div className="form-header">
              <h2 className="form-title">
                {editingId ? '✏️ Editar Estudiante' : '➕ Agregar Nuevo Estudiante'}
              </h2>
              {editingId && (
                <button 
                  type="button" 
                  className="cancel-edit-btn"
                  onClick={cancelarEdicion}
                >
                  Cancelar Edición
                </button>
              )}
            </div>
            
            <form onSubmit={guardar} className="estudiante-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="cedula" className="form-label">
                    <span className="label-icon">🆔</span> Cédula
                  </label>
                  <input
                    id="cedula"
                    type="text"
                    className="form-control"
                    value={nuevo.cedula}
                    onChange={e => setNuevo({...nuevo, cedula: e.target.value})}
                    placeholder="Ingrese cédula"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="nombre" className="form-label">
                    <span className="label-icon">👤</span> Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className="form-control"
                    value={nuevo.nombre}
                    onChange={e => setNuevo({...nuevo, nombre: e.target.value})}
                    placeholder="Ingrese nombre"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="apellido" className="form-label">
                    <span className="label-icon">👤</span> Apellido
                  </label>
                  <input
                    id="apellido"
                    type="text"
                    className="form-control"
                    value={nuevo.apellido}
                    onChange={e => setNuevo({...nuevo, apellido: e.target.value})}
                    placeholder="Ingrese apellido"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="correo" className="form-label">
                    <span className="label-icon">📧</span> Correo Electrónico
                  </label>
                  <input
                    id="correo"
                    type="email"
                    className="form-control"
                    value={nuevo.correo}
                    onChange={e => setNuevo({...nuevo, correo: e.target.value})}
                    placeholder="correo@ejemplo.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {editingId ? 'Actualizando...' : 'Agregando...'}
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">{editingId ? '💾' : '➕'}</span>
                      {editingId ? 'Actualizar Estudiante' : 'Agregar Estudiante'}
                    </>
                  )}
                </button>
                
                {editingId && (
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-lg"
                    onClick={cancelarEdicion}
                    disabled={loading}
                  >
                    <span className="btn-icon">❌</span>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-section">
          <div className="table-card">
            <div className="table-header">
              <h3 className="table-title">📋 Lista de Estudiantes</h3>
              <div className="table-controls">
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar estudiantes..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="table-responsive">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((est, index) => (
                      <tr key={est.id} className="table-row">
                        <td className="table-cell">
                          <span className="cell-value">{est.cedula}</span>
                        </td>
                        <td className="table-cell">
                          <div className="student-info">
                            <div className="student-avatar">
                              {est.nombre?.charAt(0)?.toUpperCase()}
                            </div>
                            <span className="cell-value">{est.nombre}</span>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="cell-value">{est.apellido}</span>
                        </td>
                        <td className="table-cell">
                          <span className="cell-value email-cell">{est.correo}</span>
                        </td>
                        <td className="table-cell">
                          <div className="action-buttons">
                            <button 
                              className="btn-action btn-view"
                              onClick={() => verDetalles(est)}
                              title="Ver detalles"
                            >
                              👁️
                            </button>
                            <button 
                              className="btn-action btn-edit"
                              onClick={() => editar(est)}
                              title="Editar"
                            >
                              ✏️
                            </button>
                            <button 
                              className="btn-action btn-delete"
                              onClick={() => eliminar(est.id)}
                              title="Eliminar"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        <div className="empty-state">
                          <div className="empty-icon">📚</div>
                          <p className="empty-text">
                            {searchTerm ? 'No se encontraron estudiantes' : 'No hay estudiantes registrados'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-wrapper">
                <div className="pagination-info">
                  Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredEstudiantes.length)} de {filteredEstudiantes.length} estudiantes
                </div>
                <div className="pagination">
                  <button 
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ←
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for student details */}
      {showModal && selectedEstudiante && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Detalles del Estudiante</h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-item">
                <strong>Cédula:</strong> {selectedEstudiante.cedula}
              </div>
              <div className="detail-item">
                <strong>Nombre:</strong> {selectedEstudiante.nombre} {selectedEstudiante.apellido}
              </div>
              <div className="detail-item">
                <strong>Correo:</strong> {selectedEstudiante.correo}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                  };

export default Estudiantes;
