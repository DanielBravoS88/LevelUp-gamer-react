import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del videojuego es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  plataforma: {
    type: String,
    required: [true, 'La plataforma es obligatoria'],
    enum: ['PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'PC', 'Multi-plataforma']
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio'],
    enum: ['Acción', 'Aventura', 'RPG', 'Deportes', 'Carreras', 'Estrategia', 'Shooter', 'Simulación', 'Terror', 'Pelea', 'Plataformas']
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  imagen: {
    type: String,
    default: 'https://via.placeholder.com/300x400?text=No+Image'
  },
  imagenes: [{
    type: String
  }],
  desarrollador: {
    type: String,
    trim: true
  },
  publicador: {
    type: String,
    trim: true
  },
  fechaLanzamiento: {
    type: Date
  },
  clasificacion: {
    type: String,
    enum: ['E', 'E10+', 'T', 'M', 'RP'],
    default: 'RP'
  },
  destacado: {
    type: Boolean,
    default: false
  },
  descuento: {
    type: Number,
    min: [0, 'El descuento no puede ser negativo'],
    max: [100, 'El descuento no puede exceder 100%'],
    default: 0
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual para precio con descuento
productSchema.virtual('precioConDescuento').get(function() {
  if (this.descuento > 0) {
    return this.precio - (this.precio * this.descuento / 100);
  }
  return this.precio;
});

// Configurar para que se incluyan virtuals en JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

export default Product;