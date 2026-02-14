import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEstudiantes, getMaterias, getMatriculas, createMatricula, deleteMatricula, updateMatricula } from '../services/api.jsx';
import inscripcionImg from '../images/inscripcion.webp';

const Matriculas = () => {
  const [matriculas, setMatriculas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({ id_estudiante: '', id_materia: '' });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => { cargarTodo(); }, []);

  const cargarTodo = async () => {
    try {
      const resEst = await getEstudiantes();
      const resMat = await getMaterias();
      const resMatriculas = await getMatriculas();
      setEstudiantes(resEst || []);
      setMaterias(resMat || []);
      setMatriculas(resMatriculas || []);
    } catch { setMsg({ text: 'Error cargando datos', type: 'danger' }); }
  };

  const handleMatricular = async (e) => {
    e.preventDefault();
    try {
      if (editingId) { await updateMatricula(editingId, form); setMsg({ text: 'Matrícula actualizada', type: 'success' }); setEditingId(null); }
      else { await createMatricula(form); setMsg({ text: '¡Matrícula exitosa!', type: 'success' }); }
      setForm({ id_estudiante: '', id_materia: '' });
      cargarTodo();
    } catch { setMsg({ text: 'Error al guardar matrícula', type: 'danger' }); }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar matrícula?')) return;
    try { await deleteMatricula(id); setMsg({ text: 'Matrícula eliminada', type: 'success' }); cargarTodo(); }
    catch { setMsg({ text: 'Error al eliminar matrícula', type: 'danger' }); }
  };

  const editar = (mat) => { setForm({ id_estudiante: mat.id_estudiante, id_materia: mat.id_materia }); setEditingId(mat.id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const cancelarEdicion = () => { setEditingId(null); setForm({ id_estudiante: '', id_materia: '' }); };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Registro de Matrículas</h2>
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
          <div className="card shadow-sm mb-4 p-4">
            <form onSubmit={handleMatricular} className="row g-3 align-items-end">
              <div className="col-12 col-md-5">
                <label>Estudiante</label>
                <select className="form-select" required value={form.id_estudiante} onChange={e => setForm({...form, id_estudiante: e.target.value})}>
                  <option value="">Seleccione un alumno...</option>
                  {estudiantes.map(e => <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>)}
                </select>
              </div>
              <div className="col-12 col-md-5">
                <label>Materia</label>
                <select className="form-select" required value={form.id_materia} onChange={e => setForm({...form, id_materia: e.target.value})}>
                  <option value="">Seleccione materia...</option>
                  {materias.map(m => <option key={m.id} value={m.id}>{m.nombre} ({m.codigo})</option>)}
                </select>
              </div>
              <div className="col-12 col-md-2 d-flex gap-2">
                <button className="btn btn-success w-100">{editingId ? 'Actualizar' : 'Matricular'}</button>
                {editingId && <button type="button" className="btn btn-secondary w-100" onClick={cancelarEdicion}>Cancelar</button>}
              </div>
            </form>
          </div>

          {/* TABLA */}
          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-info">
                  <tr>
                    <th>Estudiante</th>
                    <th>Materia</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {matriculas.length === 0 ? (
                    <tr><td colSpan="3">No hay matrículas.</td></tr>
                  ) : matriculas.map(mat => (
                    <tr key={mat.id}>
                      <td>{mat.nombreEstudiante}</td>
                      <td>{mat.nombreMateria}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editar(mat)}>Editar</button>
                        <button className="btn btn-sm btn-danger" onClick={() => eliminar(mat.id)}>Eliminar</button>
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
          <img src={inscripcionImg} alt="Inscripción" className="img-fluid rounded shadow-lg" style={{ maxHeight: '400px', objectFit: 'cover', width: '100%', transition: 'transform 0.3s' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
        </div>
      </div>
    </div>
  );
};

export default Matriculas;
