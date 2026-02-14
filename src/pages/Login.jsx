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
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-4">
            <div className="row w-100 justify-content-center align-items-center g-4">
                
                {/* FORMULARIO */}
                <div className="col-12 col-md-8 col-lg-5">
                    <Alert 
                        message={msg.text} 
                        type={msg.type} 
                        onClose={() => setMsg({ text: '', type: '' })} 
                        timeout={4000} 
                    />

                    <div className="card shadow-lg">
                        <div className="card-body p-4 p-md-5">
                            <h2 className="text-center mb-2">Sistema para la Gestión de Matrículas</h2>
                            <p className="text-center text-muted mb-4">
                                Inicia sesión para continuar
                            </p>

                            <form onSubmit={handleLogin}>
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

                                <div className="mb-4">
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
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg"
                                        disabled={loading}
                                    >
                                        {loading ? 'Ingresando...' : 'Ingresar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* IMAGEN */}
                <div className="col-lg-5 d-none d-lg-flex justify-content-center">
                    <img 
                        src={fondoImg}
                        alt="Fondo login"
                        className="img-fluid rounded shadow-sm"
                        style={{
                            maxHeight: '600px',
                            objectFit: 'cover'
                        }}
                    />
                </div>

            </div>
        </div>
    );
};

export default Login;
