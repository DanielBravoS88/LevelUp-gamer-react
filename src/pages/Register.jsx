import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // Llamar al backend
      const response = await fetch(`${API_URL}/api/users/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          password: formData.password,
          role: 'usuario' // Por defecto, los nuevos usuarios son 'usuario'
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

        // Redirigir al home
        navigate('/');
      } else {
        setError(data.message || 'Error al registrar usuario');
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
          <h2>Crear Cuenta</h2>
          <p>Regístrate para empezar a comprar en LevelUp Gamer</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido *</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                placeholder="Tu apellido"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
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
              <label htmlFor="password">Contraseña *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Repite tu contraseña"
              />
            </div>

            <button 
              type="submit" 
              className="btn primary full-width" 
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-2)' }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/signin" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}