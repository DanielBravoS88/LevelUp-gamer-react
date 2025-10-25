import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function AppNavbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="app-navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <div className="logo">LU</div>
            <h1>LevelUp Gamer</h1>
          </Link>
        </div>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">Inicio</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link admin-link">
                  Panel Admin
                </Link>
              )}
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className={`role-badge ${user.role}`}>{user.role}</span>
                <button onClick={handleLogout} className="btn btn-logout">
                  Cerrar Sesión
                </button>
              </div>
            </>
          ) : (
            <Link to="/signin" className="btn primary">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}