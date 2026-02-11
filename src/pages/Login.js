import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(correo, clave);
            if (data.estado === 'exito') {
                // Guardamos el nombre en el storage para la sesión
                localStorage.setItem('usuario', data.usuario.nombre);
                navigate('/dashboard');
            } else {
                setError(data.mensaje);
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center">Matrículas</h3>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label>Correo:</label>
                                    <input type="email" className="form-control" 
                                        onChange={(e) => setCorreo(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label>Contraseña:</label>
                                    <input type="password" className="form-control" 
                                        onChange={(e) => setClave(e.target.value)} required />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;