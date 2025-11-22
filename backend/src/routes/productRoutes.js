import express from 'express';
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProductosDestacados
} from '../controllers/productController.js';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerProductos);
router.get('/destacados', obtenerProductosDestacados);
router.get('/:id', obtenerProductoPorId);

// Rutas privadas (Admin) - Agregaremos middleware de autenticación después
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

export default router;