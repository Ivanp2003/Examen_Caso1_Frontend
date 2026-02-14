import React, { useState } from 'react';
import { login } from '../services/api.jsx';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert.jsx';
import fondoImg from '../images/fondo.webp';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });
    try {
      setLoading(true);
      const data = await login(correo, clave);
      if (data && data.estado === 'exito') {
        localStorage.setItem('usuario', data.usuario.nombre);
        setMsg({ text: 'Bienvenido ' + data.usuario.nombre, type: 'success' });
        setTimeout(() => navigate('/dashboard'), 600);
      } else {
        setMsg({ text: (data && data.mensaje) ? data.mensaje : 'Credenciales inválidas', type: 'danger' });
      }
    } catch (err) {
      setMsg({ text: 'Error al conectar con el servidor', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center g-4">

        {/* FORM */}
        <div className="col-12 col-lg-5">
          {msg.text && (
            <div className={`alert alert-${msg.type} alert-dismissible fade show`} role="alert">
              {msg.text}
              <button type="button" className="btn-close" onClick={() => setMsg({ text: '', type: '' })}></button>
            </div>
          )}
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h2 className="text-center mb-3">Sistema de Matrículas</h2>
              <p className="text-center text-muted">Inicia sesión para continuar</p>
              <form onSubmit={handleLogin} className="mt-3">
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="usuario@ejemplo.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    placeholder="Contraseña"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Ingresar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* IMAGEN LATERAL */}
        <div className="col-12 col-lg-5 d-none d-lg-block">
          <img
            src={fondoImg}
            alt="Fondo login"
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: '500px', objectFit: 'cover', width: '100%', transition: 'transform 0.3s' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
