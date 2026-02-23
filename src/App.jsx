import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import faviconImg from "./images/favicon.webp";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Estudiantes from "./pages/Estudiantes.jsx";
import Materias from "./pages/Materias.jsx";
import Matriculas from "./pages/Matriculas.jsx";

function App() {
  useEffect(() => {
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.href = faviconImg;
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/estudiantes" element={<Estudiantes />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/matriculas" element={<Matriculas />} />
      </Routes>
    </Router>
  );
}

export default App;
