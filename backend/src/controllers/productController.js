import Product from '../models/Product.js';

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
export const obtenerProductos = async (req, res) => {
  try {
    const { genero, plataforma, destacado, buscar } = req.query;
    
    let query = { activo: true };
    
    // Filtrar por género
    if (genero) {
      query.genero = genero;
    }
    
    // Filtrar por plataforma
    if (plataforma) {
      query.plataforma = plataforma;
    }
    
    // Filtrar destacados
    if (destacado === 'true') {
      query.destacado = true;
    }
    
    // Búsqueda por nombre o descripción
    if (buscar) {
      query.$or = [
        { nombre: { $regex: buscar, $options: 'i' } },
        { descripcion: { $regex: buscar, $options: 'i' } }
      ];
    }
    
    const productos = await Product.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      cantidad: productos.length,
      data: productos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
// @access  Public
export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el producto',
      error: error.message
    });
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/products
// @access  Private/Admin
export const crearProducto = async (req, res) => {
  try {
    const producto = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: producto
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el producto',
      error: error.message
    });
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private/Admin
export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: producto
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el producto',
      error: error.message
    });
  }
};

// @desc    Eliminar un producto (soft delete)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el producto',
      error: error.message
    });
  }
};

// @desc    Obtener productos destacados
// @route   GET /api/products/destacados
// @access  Public
export const obtenerProductosDestacados = async (req, res) => {
  try {
    const productos = await Product.find({ 
      destacado: true, 
      activo: true 
    }).limit(8);
    
    res.status(200).json({
      success: true,
      cantidad: productos.length,
      data: productos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos destacados',
      error: error.message
    });
  }
};