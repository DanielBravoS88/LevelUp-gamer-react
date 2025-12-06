import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Llamar al backend
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Guardar usuario en contexto
        login({
          id: data.data._id,
          name: `${data.data.nombre} ${data.data.apellido}`,
          email: data.data.email,
          role: data.data.rol,
          token: data.data.token
        });

        // Redirigir según el rol
        if (data.data.rol === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="signin-container">
        <div className="signin-card">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa tus credenciales para acceder</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Tu contraseña"
              />
            </div>

            <button 
              type="submit" 
              className="btn primary full-width" 
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-2)' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/register" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}