import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generar JWT Token
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/registro
// @access  Public
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono, direccion, rol } = req.body; // ⭐ Agregado 'rol'
    
    // Verificar si el usuario ya existe
    const usuarioExiste = await User.findOne({ email });
    
    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }
    
    // Crear usuario
    const usuario = await User.create({
      nombre,
      apellido,
      email,
      password,
      telefono,
      direccion,
      rol: rol || 'usuario' // ⭐ Si no se envía rol, por defecto será 'usuario'
    });
    
    // Generar token
    const token = generarToken(usuario._id);
    
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        _id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al registrar usuario',
      error: error.message
    });
  }
};

// @desc    Login de usuario
// @route   POST /api/users/login
// @access  Public
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si el email existe
    const usuario = await User.findOne({ email }).select('+password');
    
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    // Verificar contraseña
    const passwordCorrecta = await usuario.compararPassword(password);
    
    if (!passwordCorrecta) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(403).json({
        success: false,
        message: 'Usuario desactivado'
      });
    }
    
    // Generar token
    const token = generarToken(usuario._id);
    
    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        _id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

// @desc    Obtener perfil de usuario
// @route   GET /api/users/perfil
// @access  Private
export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.user._id);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message
    });
  }
};

// @desc    Actualizar perfil de usuario
// @route   PUT /api/users/perfil
// @access  Private
export const actualizarPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.user._id);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    // Actualizar campos
    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.apellido = req.body.apellido || usuario.apellido;
    usuario.email = req.body.email || usuario.email;
    usuario.telefono = req.body.telefono || usuario.telefono;
    usuario.direccion = req.body.direccion || usuario.direccion;
    
    // Si se proporciona nueva contraseña
    if (req.body.password) {
      usuario.password = req.body.password;
    }
    
    const usuarioActualizado = await usuario.save();
    
    res.status(200).json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: {
        _id: usuarioActualizado._id,
        nombre: usuarioActualizado.nombre,
        apellido: usuarioActualizado.apellido,
        email: usuarioActualizado.email,
        telefono: usuarioActualizado.telefono,
        direccion: usuarioActualizado.direccion
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar perfil',
      error: error.message
    });
  }
};

// @desc    Obtener todos los usuarios (solo admin)
// @route   GET /api/users
// @access  Private/Admin
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({});
    
    res.status(200).json({
      success: true,
      cantidad: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

// @desc    Obtener usuario por ID (solo admin)
// @route   GET /api/users/:id
// @access  Private/Admin
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: error.message
    });
  }
};

// @desc    Actualizar rol de usuario (solo admin)
// @route   PUT /api/users/:id/rol
// @access  Private/Admin
export const actualizarRolUsuario = async (req, res) => {
  try {
    const { rol } = req.body;
    
    // Validar que el rol sea válido
    if (!['usuario', 'admin'].includes(rol)) {
      return res.status(400).json({
        success: false,
        message: 'Rol inválido. Debe ser "usuario" o "admin"'
      });
    }
    
    const usuario = await User.findById(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    usuario.rol = rol;
    await usuario.save();
    
    res.status(200).json({
      success: true,
      message: `Usuario actualizado a rol: ${rol}`,
      data: {
        _id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar rol',
      error: error.message
    });
  }
};

// @desc    Eliminar usuario (solo admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    // Evitar que el admin se elimine a sí mismo
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'No puedes eliminar tu propia cuenta'
      });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Usuario eliminado exitosamente',
      data: {
        _id: usuario._id,
        email: usuario.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar usuario',
      error: error.message
    });
  }
};