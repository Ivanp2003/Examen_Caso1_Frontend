import axios from 'axios'; 
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/backend-api/api'; //URL DEL BACKEND desde .env
export const login = async (correo, clave) => {
    const params = new URLSearchParams();
    params.append('correo', correo);
    params.append('clave', clave);

    try {
        const response = await axios.post(`${API_URL}/login`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
    } catch (error) {
        console.error("Error en la petición:", error);
        throw error;
    }
};

export const getEstudiantes = async () => {
    try {
        const response = await axios.get(`${API_URL}/estudiantes`);
        return response.data;
    } catch (error) {
        console.error('Error getEstudiantes', error);
        throw error;
    }
};

export const createEstudiante = async ({ cedula, nombre, apellido, correo }) => {
    const params = new URLSearchParams();
    params.append('cedula', cedula);
    params.append('nombre', nombre);
    params.append('apellido', apellido);
    params.append('correo', correo);

    try {
        const response = await axios.post(`${API_URL}/estudiantes`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
    } catch (error) {
        console.error('Error createEstudiante', error);
        throw error;
    }
};

export const deleteEstudiante = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/estudiantes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleteEstudiante', error);
        throw error;
    }
};

export const getMaterias = async () => {
    try {
        const response = await axios.get(`${API_URL}/materias`);
        return response.data;
    } catch (error) {
        console.error('Error getMaterias', error);
        throw error;
    }
};

export const createMateria = async ({ codigo, nombre, creditos }) => {
    const params = new URLSearchParams();
    params.append('codigo', codigo);
    params.append('nombre', nombre);
    params.append('creditos', creditos);

    try {
        const response = await axios.post(`${API_URL}/materias`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
    } catch (error) {
        console.error('Error createMateria', error);
        throw error;
    }
};

export const deleteMateria = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/materias/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleteMateria', error);
        throw error;
    }
};

export const getMatriculas = async () => {
    try {
        const response = await axios.get(`${API_URL}/matriculas`);
        return response.data;
    } catch (error) {
        console.error('Error getMatriculas', error);
        throw error;
    }
};

export const createMatricula = async ({ id_estudiante, id_materia }) => {
    const params = new URLSearchParams();
    params.append('id_estudiante', id_estudiante);
    params.append('id_materia', id_materia);

    try {
        const response = await axios.post(`${API_URL}/matriculas`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
    } catch (error) {
        console.error('Error createMatricula', error);
        throw error;
    }
};

export const deleteMatricula = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/matriculas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleteMatricula', error);
        throw error;
    }
};

// PUT /matriculas/{id} - actualizar matrícula
export const updateMatricula = async (id, { id_estudiante, id_materia }) => {
    const params = new URLSearchParams();
    params.append('id_estudiante', id_estudiante);
    params.append('id_materia', id_materia);
    try {
        const response = await axios.put(`${API_URL}/matriculas/${id}`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
    } catch (error) {
        console.error('Error updateMatricula', error);
        throw error;
    }
};

// PUT /estudiantes/{id} - actualizar estudiante
export const updateEstudiante = async (id, { cedula, nombre, apellido, correo }) => {
    const params = new URLSearchParams();
    params.append('cedula', cedula);
    params.append('nombre', nombre);
    params.append('apellido', apellido);
    params.append('correo', correo);
    try {
        const response = await axios.put(`${API_URL}/estudiantes/${id}`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
    } catch (error) {
        console.error('Error updateEstudiante', error);
        throw error;
    }
};

// PUT /materias/{id} - actualizar materia
export const updateMateria = async (id, { codigo, nombre, creditos }) => {
    const params = new URLSearchParams();
    params.append('codigo', codigo);
    params.append('nombre', nombre);
    params.append('creditos', creditos);
    try {
        const response = await axios.put(`${API_URL}/materias/${id}`, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data;
    } catch (error) {
        console.error('Error updateMateria', error);
        throw error;
    }
};
