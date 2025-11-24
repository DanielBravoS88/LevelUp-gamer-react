// Manejador de rutas no encontradas (404)
export const notFound = (req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Manejador general de errores
export const errorHandler = (err, req, res, next) => {
  // Si no hay código de estado, usar 500 (Error del servidor)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Error de Mongoose - ID inválido
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Recurso no encontrado';
  }

  // Error de duplicación de MongoDB (ej: email duplicado)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `El ${field} ya existe en la base de datos`;
  }

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map(error => error.message);
    message = errors.join(', ');
  }

  // Error de JWT token expirado
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expirado, por favor inicia sesión nuevamente';
  }

  // Error de JWT token inválido
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token inválido';
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};