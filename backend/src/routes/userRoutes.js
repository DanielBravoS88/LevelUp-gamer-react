import express from 'express';
import {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  actualizarPerfil,
  obtenerUsuarios,
  obtenerUsuarioPorId
} from '../controllers/userController.js';

const router = express.Router();

// Rutas públicas
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

// Rutas privadas (requieren autenticación) - Agregaremos middleware después
router.get('/perfil', obtenerPerfil);
router.put('/perfil', actualizarPerfil);

// Rutas de administración (solo admin)
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);

export default router;