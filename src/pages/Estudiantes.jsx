import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEstudiantes, createEstudiante, deleteEstudiante, updateEstudiante } from '../services/api.jsx';
import Alert from '../components/Alert.jsx';
import estudiantesImg from '../images/estudiantes.webp';

// Página: Mantenimiento de Estudiantes
// Permite listar, crear y eliminar estudiantes.
const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nuevo, setNuevo] = useState({ cedula: '', nombre: '', apellido: '', correo: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const cargar = async () => {
    try {
      setLoading(true);
      const data = await getEstudiantes();
      setEstudiantes(data || []);
    } catch (err) {
      setMsg({ text: 'Error al cargar estudiantes', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const guardar = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await updateEstudiante(editingId, nuevo);
        setMsg({ text: 'Estudiante actualizado', type: 'success' });
        setEditingId(null);
      } else {
        await createEstudiante(nuevo);
        setMsg({ text: 'Estudiante agregado', type: 'success' });
      }
      setNuevo({ cedula: '', nombre: '', apellido: '', correo: '' });
      cargar();
    } catch (err) {
      setMsg({ text: 'Error al guardar estudiante', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Seguro que desea eliminar este estudiante?')) return;
    try {
      setLoading(true);
      await deleteEstudiante(id);
      setMsg({ text: 'Estudiante eliminado', type: 'success' });
      cargar();
    } catch (err) {
      setMsg({ text: 'Error al eliminar estudiante', type: 'danger' });
    } finally {
      setLoading(false);
    }
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

  useEffect(() => { cargar(); }, []);

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
        Registro de Estudiantes
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
                <label className="form-label">Cédula</label>
                <input
                  className="form-control"
                  value={nuevo.cedula}
                  onChange={e => setNuevo({ ...nuevo, cedula: e.target.value })}
                  required
                />
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label">Nombre</label>
                <input
                  className="form-control"
                  value={nuevo.nombre}
                  onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label">Apellido</label>
                <input
                  className="form-control"
                  value={nuevo.apellido}
                  onChange={e => setNuevo({ ...nuevo, apellido: e.target.value })}
                  required
                />
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={nuevo.correo}
                  onChange={e => setNuevo({ ...nuevo, correo: e.target.value })}
                  required
                />
              </div>

              <div className="col-12 d-flex flex-wrap gap-2">
                <button 
                  className="btn btn-primary"
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
              <table className="table table-hover table-sm align-middle mb-0">
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
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => editar(est)}
                          >
                            Editar
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => eliminar(est.id)}
                            disabled={loading}
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
          src={estudiantesImg}
          alt="Estudiantes"
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

export default Estudiantes;
