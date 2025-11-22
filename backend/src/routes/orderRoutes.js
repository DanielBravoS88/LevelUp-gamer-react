import express from 'express';
import {
  crearOrden,
  obtenerMisOrdenes,
  obtenerOrdenPorId,
  obtenerTodasLasOrdenes,
  actualizarEstadoPago,
  actualizarEstadoEnvio
} from '../controllers/orderController.js';

const router = express.Router();

// Rutas privadas (requieren autenticación) - Agregaremos middleware después
router.post('/', crearOrden);
router.get('/mis-ordenes', obtenerMisOrdenes);
router.get('/:id', obtenerOrdenPorId);
router.put('/:id/pagar', actualizarEstadoPago);

// Rutas de administración (solo admin)
router.get('/', obtenerTodasLasOrdenes);
router.put('/:id/envio', actualizarEstadoEnvio);

export default router;