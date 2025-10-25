import React from 'react';

export default function NotFound() {
  return (
    <div className="container">
      <div className="not-found">
        <h2>404 - Página no encontrada</h2>
        <p>La página que buscas no existe.</p>
        <a href="/" className="btn primary">Volver al inicio</a>
      </div>
    </div>
  );
}