import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEstudiantes, getMaterias, getMatriculas, createMatricula, deleteMatricula, updateMatricula } from '../services/api.jsx';
import Alert from '../components/Alert.jsx';
import inscripcionImg from '../images/inscripcion.webp';

// Página: Registro de Matrículas
// Permite asignar materias a estudiantes y ver el listado.
const Matriculas = () => {
    const [matriculas, setMatriculas] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [form, setForm] = useState({ id_estudiante: '', id_materia: '' });
    const [editingId, setEditingId] = useState(null);
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
        } catch (err) { console.error('Error cargando datos', err); }
    };

    const handleMatricular = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateMatricula(editingId, { id_estudiante: form.id_estudiante, id_materia: form.id_materia });
                alert('Matrícula actualizada');
                setEditingId(null);
            } else {
                await createMatricula({ id_estudiante: form.id_estudiante, id_materia: form.id_materia });
                alert('¡Matrícula exitosa!');
            }
            setForm({ id_estudiante: '', id_materia: '' });
            cargarTodo();
        } catch (err) { alert('Error al guardar matrícula'); }
    };

    const eliminar = async (id) => {
        if (!window.confirm('¿Eliminar matrícula?')) return;
        try {
            await deleteMatricula(id);
            alert('Matrícula eliminada');
            cargarTodo();
        } catch (err) { alert('Error al eliminar matrícula'); }
    };

    const editar = (mat) => {
        setForm({ id_estudiante: mat.id_estudiante, id_materia: mat.id_materia });
        setEditingId(mat.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => { setEditingId(null); setForm({ id_estudiante: '', id_materia: '' }); };

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
        Registro de Matrículas
      </h4>
    </div>

    <div className="row g-4">

      {/* FORM + TABLA */}
      <div className="col-12 col-lg-8">

        {/* FORMULARIO */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">

            <form onSubmit={handleMatricular} className="row g-3">

              <div className="col-12 col-md-6">
                <label className="form-label">Estudiante</label>
                <select
                  className="form-select"
                  value={form.id_estudiante}
                  required
                  onChange={(e) =>
                    setForm({ ...form, id_estudiante: e.target.value })
                  }
                >
                  <option value="">Seleccione un alumno...</option>
                  {estudiantes.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.nombre} {e.apellido}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Materia</label>
                <select
                  className="form-select"
                  value={form.id_materia}
                  required
                  onChange={(e) =>
                    setForm({ ...form, id_materia: e.target.value })
                  }
                >
                  <option value="">Seleccione materia...</option>
                  {materias.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.nombre} ({m.codigo})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 d-flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  {editingId ? 'Actualizar' : 'Matricular'}
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

          </div>
        </div>

        {/* TABLA */}
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-sm align-middle mb-0">
                <thead className="table-info">
                  <tr>
                    <th>Estudiante</th>
                    <th>Materia</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {matriculas.length === 0 ? (
                    <tr>
                      <td colSpan="3">No hay matrículas registradas.</td>
                    </tr>
                  ) : (
                    matriculas.map((mat, index) => (
                      <tr key={mat.id || index}>
                        <td>{mat.nombreEstudiante}</td>
                        <td>{mat.nombreMateria}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => editar(mat)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => eliminar(mat.id)}
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

      {/* IMAGEN LATERAL */}
      <div className="col-lg-4 d-none d-lg-flex align-items-start">
        <img
          src={inscripcionImg}
          alt="Inscripción"
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

export default Matriculas;
