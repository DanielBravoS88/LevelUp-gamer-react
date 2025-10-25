import React from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="user-info">
          <p>Bienvenido, <strong>{user?.name}</strong></p>
          <p>Rol: <span className={`role-badge ${user?.role}`}>{user?.role}</span></p>
        </div>

        <div className="dashboard-content">
          {user?.role === 'admin' ? (
            <div className="admin-dashboard">
              <h3>Panel de Administrador</h3>
              <p>Tienes acceso completo al sistema.</p>
              <div className="admin-actions">
                <a href="/admin" className="btn primary">
                  Gestionar Productos
                </a>
              </div>
            </div>
          ) : (
            <div className="user-dashboard">
              <h3>Panel de Usuario</h3>
              <p>Bienvenido al catálogo de productos.</p>
              <div className="user-actions">
                <a href="/" className="btn primary">
                  Ver Catálogo
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}