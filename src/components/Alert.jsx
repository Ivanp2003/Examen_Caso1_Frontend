import React, { useEffect } from 'react';

// Componente de alerta reutilizable con auto-dismiss y botón de cerrar
const Alert = ({ message, type = 'info', onClose = () => {}, timeout = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    if (timeout > 0) {
      const t = setTimeout(() => { onClose(); }, timeout);
      return () => clearTimeout(t);
    }
  }, [message, timeout, onClose]);

  if (!message) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;
