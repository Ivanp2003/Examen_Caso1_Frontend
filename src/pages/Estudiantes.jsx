import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEstudiantes, createEstudiante, deleteEstudiante, updateEstudiante } from '../services/api.jsx';
import Alert from '../components/Alert.jsx';
import estudiantesImg from '../images/estudiantes.webp';

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nuevo, setNuevo] = useState({ cedula: '', nombre: '', apellido: '', correo: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const cargar = async () => {
    try { setLoading(true); const data = await getEstudiantes(); setEstudiantes(data || []); }
    catch { setMsg({ text: 'Error al cargar estudiantes', type: 'danger' }); }
    finally { setLoading(false); }
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

  const cancelarEdicion = () => { setEditingId(null); setNuevo({ cedula: '', nombre: '', apellido: '', correo: '' }); };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Regresar</button>
      </div>

      {msg.text && (
        <div className={`alert alert-${msg.type} alert-dismissible fade show`} role="alert">
          {msg.text}
          <button type="button" className="btn-close" onClick={() => setMsg({ text: '', type: '' })}></button>
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-8">

          {/* FORM */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
            <h2 className="m-0">Gestión de Estudiantes</h2><hr />
              <h5 className="card-title">Agregar / Editar Estudiantes</h5>
              <form onSubmit={guardar} className="row g-3">
                <div className="col-12 col-md-3">
                  <label>Cédula</label>
                  <input className="form-control" value={nuevo.cedula} onChange={e => setNuevo({...nuevo, cedula: e.target.value})} required />
                </div>
                <div className="col-12 col-md-3">
                  <label>Nombre</label>
                  <input className="form-control" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} required />
                </div>
                <div className="col-12 col-md-3">
                  <label>Apellido</label>
                  <input className="form-control" value={nuevo.apellido} onChange={e => setNuevo({...nuevo, apellido: e.target.value})} required />
                </div>
                <div className="col-12 col-md-3">
                  <label>Email</label>
                  <input type="email" className="form-control" value={nuevo.correo} onChange={e => setNuevo({...nuevo, correo: e.target.value})} required />
                </div>

                <div className="col-12 d-flex flex-wrap gap-2 mt-2">
                  <button className="btn btn-primary">{editingId ? 'Actualizar' : 'Agregar'}</button>
                  {editingId && <button type="button" className="btn btn-secondary" onClick={cancelarEdicion}>Cancelar</button>}
                </div>
              </form>
            </div>
          </div>

          {/* TABLA */}
          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="3">Cargando...</td></tr>
                  ) : estudiantes.length === 0 ? (
                    <tr><td colSpan="3">No hay estudiantes.</td></tr>
                  ) : (
                    estudiantes.map(est => (
                      <tr key={est.id}>
                        <td>{est.cedula}</td>
                        <td>{est.nombre} {est.apellido}</td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editar(est)}>Editar</button>
                          <button className="btn btn-sm btn-danger" onClick={() => eliminar(est.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div className="col-12 col-lg-4 d-none d-lg-block">
          <img src={estudiantesImg} alt="Estudiantes" className="img-fluid rounded shadow-lg" style={{ maxHeight: '400px', objectFit: 'cover', width: '100%', transition: 'transform 0.3s' }} 
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
        </div>
      </div>
    </div>
  );
};

export default Estudiantes;
