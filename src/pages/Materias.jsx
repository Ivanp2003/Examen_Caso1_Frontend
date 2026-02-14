import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMaterias, createMateria, deleteMateria, updateMateria } from '../services/api.jsx';
import Alert from '../components/Alert.jsx';
import materiasImg from '../images/materias.webp';

const Materias = () => {
  const [materias, setMaterias] = useState([]);
  const [nuevo, setNuevo] = useState({ codigo: '', nombre: '', creditos: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { cargarMaterias(); }, []);

  const cargarMaterias = async () => {
    try {
      const data = await getMaterias();
      setMaterias(data || []);
    } catch {
      setMsg({ text: 'Error cargando materias', type: 'danger' });
    }
  };

  const guardar = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) { await updateMateria(editingId, nuevo); setMsg({ text: 'Materia actualizada', type: 'success' }); setEditingId(null); }
      else { await createMateria(nuevo); setMsg({ text: 'Materia creada', type: 'success' }); }
      setNuevo({ codigo: '', nombre: '', creditos: '' });
      cargarMaterias();
    } catch { setMsg({ text: 'Error al guardar materia', type: 'danger' }); }
    finally { setLoading(false); }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar materia?')) return;
    try { await deleteMateria(id); setMsg({ text: 'Materia eliminada', type: 'success' }); cargarMaterias(); }
    catch { setMsg({ text: 'Error al eliminar materia', type: 'danger' }); }
  };

  const editar = (m) => {
    setNuevo({ codigo: m.codigo || '', nombre: m.nombre || '', creditos: m.creditos || '' });
    setEditingId(m.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => { setEditingId(null); setNuevo({ codigo: '', nombre: '', creditos: '' }); };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Gestión de Materias</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Regresar</button>
      </div>

      {msg.text && (
        <div className={`alert alert-${msg.type} alert-dismissible fade show`} role="alert">
          {msg.text}
          <button type="button" className="btn-close" onClick={() => setMsg({ text: '', type: '' })}></button>
        </div>
      )}

      <div className="row g-4">
        {/* FORMULARIO */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Agregar / Editar Materia</h5>
              <form onSubmit={guardar} className="row g-3">
                <div className="col-12 col-md-3">
                  <label>Código</label>
                  <input className="form-control" value={nuevo.codigo} onChange={e => setNuevo({...nuevo, codigo: e.target.value})} required />
                </div>
                <div className="col-12 col-md-5">
                  <label>Nombre</label>
                  <input className="form-control" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} required />
                </div>
                <div className="col-12 col-md-2">
                  <label>Créditos</label>
                  <input className="form-control" value={nuevo.creditos} onChange={e => setNuevo({...nuevo, creditos: e.target.value})} required />
                </div>
                <div className="col-12 col-md-2 d-flex gap-2">
                  <button className="btn btn-success w-100">{editingId ? 'Actualizar' : 'Agregar'}</button>
                  {editingId && <button type="button" className="btn btn-secondary w-100" onClick={cancelarEdicion}>Cancelar</button>}
                </div>
              </form>
            </div>
          </div>

          {/* TABLA */}
          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Créditos</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {materias.length === 0 ? (
                    <tr><td colSpan="4">No hay materias.</td></tr>
                  ) : materias.map(m => (
                    <tr key={m.id}>
                      <td>{m.codigo}</td>
                      <td>{m.nombre}</td>
                      <td>{m.creditos}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editar(m)}>Editar</button>
                        <button className="btn btn-sm btn-danger" onClick={() => eliminar(m.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* IMAGEN */}
        <div className="col-12 col-lg-4 d-none d-lg-block">
          <img src={materiasImg} alt="Materias" className="img-fluid rounded shadow-lg" style={{ maxHeight: '400px', objectFit: 'cover', width: '100%', transition: 'transform 0.3s' }} 
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
        </div>
      </div>
    </div>
  );
};

export default Materias;
