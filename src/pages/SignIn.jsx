import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState('user');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleRoleSelection = (e) => {
    e.preventDefault();
    if (selectedRole === 'admin') {
      setShowAdminLogin(true);
    } else {
      const userData = { name: "Daniel", role: 'user' };
      login(userData);
      navigate('/');
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Validar credenciales del administrador
    if (adminCredentials.username === 'admin' && adminCredentials.password === 'admin123') {
      const userData = { name: "Admin", role: 'admin' };
      login(userData);
      navigate('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleCredentialChange = (e) => {
    setAdminCredentials({
      ...adminCredentials,
      [e.target.name]: e.target.value
    });
  };

  const goBackToRoleSelection = () => {
    setShowAdminLogin(false);
    setAdminCredentials({ username: '', password: '' });
    setError('');
  };

  if (showAdminLogin) {
    return (
      <div className="container">
        <div className="signin-container">
          <div className="signin-card">
            <h2>Acceso de Administrador</h2>
            <p>Ingresa tus credenciales para acceder al panel administrativo</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleAdminLogin}>
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={adminCredentials.username}
                  onChange={handleCredentialChange}
                  required
                  placeholder="Ingresa tu usuario"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={adminCredentials.password}
                  onChange={handleCredentialChange}
                  required
                  placeholder="Ingresa tu contraseña"
                />
              </div>

              <div className="admin-login-buttons">
                <button type="button" className="btn secondary" onClick={goBackToRoleSelection}>
                  Volver
                </button>
                <button type="submit" className="btn primary">
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="signin-container">
        <div className="signin-card">
          <h2>Iniciar Sesión</h2>
          <p>Selecciona tu rol para acceder al sistema</p>
          
          <form onSubmit={handleRoleSelection}>
            <div className="role-selection">
              <label className={`role-option ${selectedRole === 'user' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="user"
                  checked={selectedRole === 'user'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <div className="role-info">
                  <h3>Usuario</h3>
                  <p>Acceso básico para ver productos y realizar compras</p>
                </div>
              </label>

              <label className={`role-option ${selectedRole === 'admin' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="admin"
                  checked={selectedRole === 'admin'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <div className="role-info">
                  <h3>Administrador</h3>
                  <p>Acceso completo para gestionar productos y comentarios</p>
                </div>
              </label>
            </div>

            <button type="submit" className="btn primary full-width">
              Ingresar como {selectedRole === 'admin' ? 'Administrador' : 'Usuario'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}