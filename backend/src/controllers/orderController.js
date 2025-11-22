import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Crear una nueva orden
// @route   POST /api/orders
// @access  Private
export const crearOrden = async (req, res) => {
  try {
    const {
      productos,
      direccionEnvio,
      metodoPago,
      precioProductos,
      precioEnvio,
      precioTotal
    } = req.body;

    // Verificar que hay productos
    if (!productos || productos.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No hay productos en la orden'
      });
    }

    // Verificar stock de cada producto
    for (let item of productos) {
      const producto = await Product.findById(item.producto);
      
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: `Producto ${item.nombre} no encontrado`
        });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente para ${producto.nombre}. Stock disponible: ${producto.stock}`
        });
      }
    }

    // Crear la orden
    const orden = await Order.create({
      usuario: req.user._id,
      productos,
      direccionEnvio,
      metodoPago,
      precioProductos,
      precioEnvio,
      precioTotal
    });

    // Actualizar stock de productos
    for (let item of productos) {
      await Product.findByIdAndUpdate(
        item.producto,
        { $inc: { stock: -item.cantidad } }
      );
    }

    // Poblar datos del usuario
    await orden.populate('usuario', 'nombre apellido email');

    res.status(201).json({
      success: true,
      message: 'Orden creada exitosamente',
      data: orden
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la orden',
      error: error.message
    });
  }
};

// @desc    Obtener todas las órdenes del usuario autenticado
// @route   GET /api/orders/mis-ordenes
// @access  Private
export const obtenerMisOrdenes = async (req, res) => {
  try {
    const ordenes = await Order.find({ usuario: req.user._id })
      .populate('usuario', 'nombre apellido email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      cantidad: ordenes.length,
      data: ordenes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener órdenes',
      error: error.message
    });
  }
};

// @desc    Obtener una orden por ID
// @route   GET /api/orders/:id
// @access  Private
export const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await Order.findById(req.params.id)
      .populate('usuario', 'nombre apellido email telefono')
      .populate('productos.producto', 'nombre imagen');

    if (!orden) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada'
      });
    }

    // Verificar que el usuario sea el dueño de la orden o sea admin
    if (orden.usuario._id.toString() !== req.user._id.toString() && req.user.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para ver esta orden'
      });
    }

    res.status(200).json({
      success: true,
      data: orden
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la orden',
      error: error.message
    });
  }
};

// @desc    Obtener todas las órdenes (solo admin)
// @route   GET /api/orders
// @access  Private/Admin
export const obtenerTodasLasOrdenes = async (req, res) => {
  try {
    const ordenes = await Order.find({})
      .populate('usuario', 'nombre apellido email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      cantidad: ordenes.length,
      data: ordenes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener órdenes',
      error: error.message
    });
  }
};

// @desc    Actualizar estado de pago de una orden
// @route   PUT /api/orders/:id/pagar
// @access  Private
export const actualizarEstadoPago = async (req, res) => {
  try {
    const orden = await Order.findById(req.params.id);

    if (!orden) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada'
      });
    }

    orden.estadoPago = 'Pagado';
    orden.fechaPago = Date.now();

    const ordenActualizada = await orden.save();

    res.status(200).json({
      success: true,
      message: 'Pago registrado exitosamente',
      data: ordenActualizada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar estado de pago',
      error: error.message
    });
  }
};

// @desc    Actualizar estado de envío (solo admin)
// @route   PUT /api/orders/:id/envio
// @access  Private/Admin
export const actualizarEstadoEnvio = async (req, res) => {
  try {
    const { estadoEnvio } = req.body;

    const orden = await Order.findById(req.params.id);

    if (!orden) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada'
      });
    }

    orden.estadoEnvio = estadoEnvio;

    if (estadoEnvio === 'Enviado') {
      orden.fechaEnvio = Date.now();
    }

    if (estadoEnvio === 'Entregado') {
      orden.fechaEntrega = Date.now();
    }

    const ordenActualizada = await orden.save();

    res.status(200).json({
      success: true,
      message: 'Estado de envío actualizado exitosamente',
      data: ordenActualizada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar estado de envío',
      error: error.message
    });
  }
};