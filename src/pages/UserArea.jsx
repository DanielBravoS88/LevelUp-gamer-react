import React from 'react';

export default function UserArea() {
  return (
    <div className="container">
      <div className="user-area">
        <h2>Área de Usuario</h2>
        <p>Contenido exclusivo para usuarios registrados.</p>
        
        <div className="user-content">
          <div className="content-section">
            <h3>Mis Compras</h3>
            <p>Aquí puedes ver tu historial de compras.</p>
          </div>
          
          <div className="content-section">
            <h3>Favoritos</h3>
            <p>Productos que has marcado como favoritos.</p>
          </div>
          
          <div className="content-section">
            <h3>Mi Perfil</h3>
            <p>Configura tu información personal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}