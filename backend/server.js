import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Importar rutas
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Inicializar Express
const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS para React
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear datos de formularios

// Logger en desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎮 Bienvenido a LevelUp Gamer API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      users: '/api/users',
      orders: '/api/orders'
    }
  });
});

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Manejadores de errores (deben ir al final)
app.use(notFound);
app.use(errorHandler);

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   🎮 LevelUp Gamer API Server 🎮      ║
  ╠════════════════════════════════════════╣
  ║   Servidor corriendo en modo:         ║
  ║   ${process.env.NODE_ENV || 'development'}                      ║
  ║                                        ║
  ║   🌐 URL: http://localhost:${PORT}       ║
  ║                                        ║
  ║   📡 Endpoints disponibles:            ║
  ║   • GET  /api/products                 ║
  ║   • POST /api/users/registro           ║
  ║   • POST /api/users/login              ║
  ║   • POST /api/orders                   ║
  ╚════════════════════════════════════════╝
  `);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no capturado:', err.message);
  // Cerrar servidor y salir del proceso
  server.close(() => process.exit(1));
});
