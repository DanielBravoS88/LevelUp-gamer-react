import express from 'express';
import {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  actualizarPerfil,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarRolUsuario,
  eliminarUsuario
} from '../controllers/userController.js';
import { protegerRuta, esAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

// Rutas privadas (requieren autenticación)
router.get('/perfil', protegerRuta, obtenerPerfil);
router.put('/perfil', protegerRuta, actualizarPerfil);

// Rutas de administración (solo admin)
router.get('/', protegerRuta, esAdmin, obtenerUsuarios);
router.get('/:id', protegerRuta, esAdmin, obtenerUsuarioPorId);
router.put('/:id/rol', protegerRuta, esAdmin, actualizarRolUsuario);
router.delete('/:id', protegerRuta, esAdmin, eliminarUsuario);

export default router;