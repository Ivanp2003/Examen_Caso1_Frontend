# Sistema de Matrículas - Frontend

Aplicación web moderna para la gestión académica de matrículas, estudiantes y materias. Desarrollada con React y diseñada para ofrecer una experiencia de usuario intuitiva y eficiente.

## 🚀 Características Principales

- **Gestión de Estudiantes**: Registro, edición y eliminación de estudiantes
- **Administración de Materias**: Catálogo completo de asignaturas
- **Sistema de Matrículas**: Asignación de materias a estudiantes
- **Dashboard Interactivo**: Estadísticas en tiempo real
- **Diseño Responsive**: Funciona en cualquier dispositivo
- **Interfaz Moderna**: UX/UI optimizada para máxima usabilidad

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Backend API corriendo en `http://localhost:8080`

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone [URL-del-repositorio]
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
# Renombra .env.example a .env y ajusta la URL del API
REACT_APP_API_URL=http://localhost:8080/backend-api/api
```

## ▶️ Ejecución

### Modo Desarrollo
```bash
npm start
```
La aplicación se abrirá en `http://localhost:3000`

### Modo Producción
```bash
npm run build
```
Los archivos optimizados se generarán en la carpeta `build`

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)
1. Sube tu proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) y conecta tu repositorio
3. Configura las variables de entorno en el dashboard de Vercel
4. Deploy automático

### Opción 2: Netlify
1. Comprime la carpeta `build` en un archivo ZIP
2. Ve a [netlify.com](https://netlify.com) y arrastra el archivo ZIP
3. Configura las variables de entorno
4. Deploy listo

### Opción 3: Hosting Compartido (cPanel/Plesk)
1. Comprime la carpeta `build`
2. Sube via FTP al directorio `public_html/` o `htdocs/`
3. Crea archivo `.htaccess` para manejar rutas:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Opción 4: Servidor Local
```bash
# Para pruebas
npm install -g serve
serve -s build

# Para producción
npm install -g http-server
http-server build -p 80
```

### ⚙️ Configuración Importante
- Actualiza `REACT_APP_API_URL` en producción
- Configura CORS en el backend
- Habilita HTTPS si es posible

## 🏗️ Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas principales
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Estudiantes.jsx
│   ├── Materias.jsx
│   └── Matriculas.jsx
├── services/      # Conexión con la API
├── images/        # Recursos visuales
├── App.css        # Estilos globales
└── App.jsx        # Componente principal
```

## 🎨 Tecnologías Utilizadas

- **React 19**: Librería principal de UI
- **React Router**: Navegación entre páginas
- **Bootstrap**: Framework CSS para componentes base
- **Axios**: Cliente HTTP para comunicación con API
- **CSS3**: Estilos personalizados y animaciones

## 📱 Funcionalidades

### 🔐 Login
- Autenticación segura con credenciales
- Validación de formularios en tiempo real
- Redirección automática al dashboard

### 📊 Dashboard
- Estadísticas en vivo del sistema
- Navegación rápida a todas las secciones
- Reloj y fecha actualizados

### 👥 Gestión de Estudiantes
- CRUD completo de estudiantes
- Búsqueda y paginación
- Vista detallada con modal

### 📚 Administración de Materias
- Catálogo de asignaturas
- Control de créditos
- Organización por código

### 📝 Sistema de Matrículas
- Asignación intuitiva
- Validación automática
- Historial de matrículas

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
REACT_APP_API_URL=http://localhost:8080/backend-api/api
REACT_APP_NAME=Sistema de Matrículas
REACT_APP_VERSION=1.0.0
```

## 🐛 Solución de Problemas Comunes

### Problemas de Conexión
- Verifica que el backend esté corriendo en el puerto 8080
- Confirma la URL del API en el archivo `.env`

### Problemas de Estilos
- Limpia la caché del navegador
- Reinicia el servidor de desarrollo

### Errores de Build
- Elimina la carpeta `node_modules` y reinstala
- Verifica la versión de Node.js

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - revisa el archivo LICENSE para más detalles.

## 📞 Soporte

Para reportar problemas o solicitar ayuda:
- Crea un issue en el repositorio
- Contacta al equipo de desarrollo

---

**Desarrollado con ❤️ para la gestión educativa moderna**
