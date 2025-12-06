import express from 'express';
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProductosDestacados
} from '../controllers/productController.js';
import { protegerRuta, esAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerProductos);
router.get('/destacados', obtenerProductosDestacados);
router.get('/:id', obtenerProductoPorId);

// Rutas privadas (Admin)
router.post('/', protegerRuta, esAdmin, crearProducto);
router.put('/:id', protegerRuta, esAdmin, actualizarProducto);
router.delete('/:id', protegerRuta, esAdmin, eliminarProducto);

export default router;