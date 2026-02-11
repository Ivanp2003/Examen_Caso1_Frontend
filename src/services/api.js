import axios from 'axios'; 
const API_URL = 'http://localhost:8080/backend-api/api'; //URL DEL BACKEND
export const login = async (correo, clave) => {
    const params = new URLSearchParams();
    params.append('correo', correo);
    params.append('clave', clave);

    try {
        const response = await axios.post(`${API_URL}/login`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        console.log("Respuesta del servidor:", response.data); // Para debug
        return response.data;
    } catch (error) {
        console.error("Error en la petición:", error);
        throw error;
    }
};