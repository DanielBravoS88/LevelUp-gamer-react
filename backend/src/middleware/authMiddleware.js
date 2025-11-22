import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Proteger rutas - Verificar que el usuario esté autenticado
export const protegerRuta = async (req, res, next) => {
  let token;

  // Verificar si el token existe en los headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener usuario del token (sin password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      // Verificar si el usuario está activo
      if (!req.user.activo) {
        return res.status(403).json({
          success: false,
          message: 'Usuario desactivado'
        });
      }

      next();
    } catch (error) {
      console.error('Error en autenticación:', error.message);
      return res.status(401).json({
        success: false,
        message: 'No autorizado, token inválido'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No autorizado, no se proporcionó token'
    });
  }
};

// Verificar si el usuario es administrador
export const esAdmin = (req, res, next) => {
  if (req.user && req.user.rol === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requieren permisos de administrador'
    });
  }
};
