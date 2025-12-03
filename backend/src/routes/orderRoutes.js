import express from 'express';
import {
  crearOrden,
  obtenerMisOrdenes,
  obtenerOrdenPorId,
  obtenerTodasLasOrdenes,
  actualizarEstadoPago,
  actualizarEstadoEnvio,
  cancelarOrden,
  obtenerEstadisticasOrdenes
} from '../controllers/orderController.js';
import { protegerRuta, esAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas privadas (requieren autenticación)
router.post('/', protegerRuta, crearOrden);
router.get('/mis-ordenes', protegerRuta, obtenerMisOrdenes);
router.put('/:id/pagar', protegerRuta, actualizarEstadoPago);
router.put('/:id/cancelar', protegerRuta, cancelarOrden);

// Rutas de administración (solo admin) - DEBEN IR ANTES de /:id
router.get('/admin/todas', protegerRuta, esAdmin, obtenerTodasLasOrdenes);
router.get('/admin/estadisticas', protegerRuta, esAdmin, obtenerEstadisticasOrdenes);
router.put('/:id/envio', protegerRuta, esAdmin, actualizarEstadoEnvio);

// Ruta dinámica (debe ir al final)
router.get('/:id', protegerRuta, obtenerOrdenPorId);

export default router;