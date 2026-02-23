import React, { useState, useEffect } from 'react';
import { login } from '../services/api.jsx';
import { useNavigate } from 'react-router-dom';
import fondoImg from '../images/fondo.webp';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAnimating(true);
    // Precargar imagen
    const img = new Image();
    img.src = fondoImg;
    img.onload = () => setImageLoaded(true);
  }, []);

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
    <div className="login-container min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden">
      {/* Animated Background */}
      <div className="position-absolute w-100 h-100 top-0 start-0">
        <div className="bg-gradient-primary opacity-10"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="container position-relative z-1">
        <div className="row justify-content-center align-items-center g-4">

          {/* FORM CARD */}
          <div className={`col-12 col-lg-5 ${isAnimating ? 'fade-in-left' : 'opacity-0'}`}>
            {msg.text && (
              <div className={`alert alert-${msg.type} alert-dismissible fade show mb-4`} role="alert">
                <div className="d-flex align-items-center">
                  <span className="alert-icon me-2">{msg.type === 'success' ? '✓' : '⚠'}</span>
                  <span>{msg.text}</span>
                </div>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setMsg({ text: '', type: '' })}
                  aria-label="Close"
                ></button>
              </div>
            )}
            
            <div className="card border-0 shadow-xl login-card">
              <div className="card-body p-5">
                {/* Logo/Brand Section */}
                <div className="text-center mb-4">
                  <div className="brand-logo mb-3">
                    <div className="logo-circle">
                      <span className="logo-text">SM</span>
                    </div>
                  </div>
                  <h2 className="fw-bold text-primary mb-2">Sistema de Matrículas</h2>
                  <p className="text-muted fs-6">Ingresa tus credenciales para acceder</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                  <div className="mb-4">
                    <label htmlFor="correo" className="form-label fw-semibold text-dark">
                      <span className="me-1">📧</span> Correo Electrónico
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-envelope text-muted"></i>
                      </span>
                      <input
                        id="correo"
                        type="email"
                        className="form-control form-control-lg border-start-0"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="usuario@ejemplo.com"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="clave" className="form-label fw-semibold text-dark">
                      <span className="me-1">🔒</span> Contraseña
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-lock text-muted"></i>
                      </span>
                      <input
                        id="clave"
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-lg border-start-0 border-end-0"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="input-group-text bg-light border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="d-grid gap-3">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg fw-semibold py-3 position-relative overflow-hidden"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Ingresando...
                        </>
                      ) : (
                        <>
                          <span className="btn-text">Ingresar</span>
                          <span className="btn-icon ms-2">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <p className="text-muted small mb-0">
                    ¿Problemas para acceder? Contacta al administrador
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGEN LATERAL */}
          <div className={`col-12 col-lg-5 d-none d-lg-block ${isAnimating ? 'fade-in-right' : 'opacity-0'}`}>
            <div className="position-relative">
              <div className="image-wrapper">
                <img
                  src={fondoImg}
                  alt="Acceso al sistema"
                  className={`img-fluid rounded-4 shadow-xxl ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="image-overlay rounded-4"></div>
                <div className="image-content">
                  <div className="image-badge">
                    <span className="badge-icon">🎓</span>
                    <span className="badge-text">Educación Superior</span>
                  </div>
                </div>
              </div>
              <div className="image-caption text-center mt-4">
                <h4 className="fw-bold text-dark">Gestión Académica Moderna</h4>
                <p className="text-muted">Control eficiente de matrículas y estudiantes</p>
                <div className="image-features">
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">Gestión Integral</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">Interfaz Moderna</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">Seguridad Garantizada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
