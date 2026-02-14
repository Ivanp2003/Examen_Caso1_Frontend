import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMaterias, createMateria, deleteMateria, updateMateria } from '../services/api.jsx';
import Alert from '../components/Alert.jsx';
import materiasImg from '../images/materias.webp';

// Página: Gestión de Materias
// Lista materias y permite agregar nuevas (botón de ejemplo).
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
        } catch (err) { console.error('Error cargando materias', err); setMsg({ text: 'Error cargando materias', type: 'danger' }); }
    };

    const guardar = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (editingId) {
                await updateMateria(editingId, nuevo);
                setMsg({ text: 'Materia actualizada', type: 'success' });
                setEditingId(null);
            } else {
                await createMateria(nuevo);
                setMsg({ text: 'Materia creada', type: 'success' });
            }
            setNuevo({ codigo: '', nombre: '', creditos: '' });
            cargarMaterias();
        } catch (err) {
            setMsg({ text: 'Error al crear materia', type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    const eliminar = async (id) => {
        if (!window.confirm('¿Eliminar materia?')) return;
        try {
            await deleteMateria(id);
            setMsg({ text: 'Materia eliminada', type: 'success' });
            cargarMaterias();
        } catch (err) { setMsg({ text: 'Error al eliminar materia', type: 'danger' }); }
    };

    const editar = (m) => {
        setNuevo({ codigo: m.codigo || '', nombre: m.nombre || '', creditos: m.creditos || '' });
        setEditingId(m.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setEditingId(null);
        setNuevo({ codigo: '', nombre: '', creditos: '' });
    };

return (
  <div className="container py-4">

    {/* HEADER */}
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
      <button 
        className="btn btn-secondary btn-sm"
        onClick={() => navigate('/dashboard')}
      >
        Regresar
      </button>

      <h4 className="mb-0 text-md-end">
        Gestión de Materias
      </h4>
    </div>

    <Alert
      message={msg.text}
      type={msg.type}
      onClose={() => setMsg({ text: '', type: '' })}
      timeout={4000}
    />

    <div className="row g-4">

      {/* FORM + TABLA */}
      <div className="col-12 col-lg-8">
        <div className="card shadow-sm">
          <div className="card-body">

            {/* FORMULARIO */}
            <form onSubmit={guardar} className="row g-3 mb-4">

              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label">Código</label>
                <input
                  className="form-control"
                  value={nuevo.codigo}
                  onChange={e => setNuevo({ ...nuevo, codigo: e.target.value })}
                  required
                />
              </div>

              <div className="col-12 col-md-6 col-lg-5">
                <label className="form-label">Nombre</label>
                <input
                  className="form-control"
                  value={nuevo.nombre}
                  onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="col-12 col-md-6 col-lg-2">
                <label className="form-label">Créditos</label>
                <input
                  className="form-control"
                  value={nuevo.creditos}
                  onChange={e => setNuevo({ ...nuevo, creditos: e.target.value })}
                  required
                />
              </div>

              <div className="col-12 d-flex flex-wrap gap-2">
                <button
                  className="btn btn-success"
                  disabled={loading}
                >
                  {editingId ? 'Actualizar' : 'Agregar'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelarEdicion}
                  >
                    Cancelar
                  </button>
                )}
              </div>

            </form>

            {/* TABLA */}
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-sm align-middle mb-0">
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
                    <tr>
                      <td colSpan="4">No hay materias registradas.</td>
                    </tr>
                  ) : (
                    materias.map(m => (
                      <tr key={m.id}>
                        <td>{m.codigo}</td>
                        <td>{m.nombre}</td>
                        <td>{m.creditos}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => editar(m)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => eliminar(m.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      {/* IMAGEN */}
      <div className="col-lg-4 d-none d-lg-flex align-items-start">
        <img
          src={materiasImg}
          alt="Materias"
          className="img-fluid rounded shadow-sm"
          style={{
            maxHeight: '450px',
            objectFit: 'cover',
            width: '100%'
          }}
        />
      </div>

    </div>
  </div>
);

};

export default Materias;
