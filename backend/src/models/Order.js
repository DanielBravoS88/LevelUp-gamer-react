import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false  // Cambiado a false para permitir productos sin ID
    },
    nombre: {
      type: String,
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: [1, 'La cantidad debe ser al menos 1']
    },
    precio: {
      type: Number,
      required: true,
      min: [0, 'El precio no puede ser negativo']
    },
    imagen: String
  }],
  direccionEnvio: {
    calle: {
      type: String,
      required: [true, 'La calle es obligatoria']
    },
    ciudad: {
      type: String,
      required: [true, 'La ciudad es obligatoria']
    },
    region: {
      type: String,
      required: [true, 'La región es obligatoria']
    },
    codigoPostal: {
      type: String,
      required: [true, 'El código postal es obligatorio']
    }
  },
  metodoPago: {
    type: String,
    required: [true, 'El método de pago es obligatorio'],
    enum: ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia', 'PayPal', 'Mercado Pago']
  },
  precioProductos: {
    type: Number,
    required: true,
    default: 0.0
  },
  precioEnvio: {
    type: Number,
    required: true,
    default: 0.0
  },
  precioTotal: {
    type: Number,
    required: true,
    default: 0.0
  },
  estadoPago: {
    type: String,
    enum: ['Pendiente', 'Pagado', 'Rechazado'],
    default: 'Pendiente'
  },
  estadoEnvio: {
    type: String,
    enum: ['Procesando', 'Enviado', 'En Camino', 'Entregado', 'Cancelado'],
    default: 'Procesando'
  },
  fechaPago: Date,
  fechaEnvio: Date,
  fechaEntrega: Date,
  notasOrden: String
}, {
  timestamps: true
});

// Virtual para número de orden
orderSchema.virtual('numeroOrden').get(function() {
  return `ORD-${this._id.toString().slice(-8).toUpperCase()}`;
});

orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;