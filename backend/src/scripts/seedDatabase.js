import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '../../.env') });

// Modelo de Producto adaptado a tu estructura
const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  plataforma: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    default: 'Acción'
  },
  stock: {
    type: Number,
    default: 10
  },
  imagen: {
    type: String
  },
  destacado: {
    type: Boolean,
    default: false
  },
  descuento: {
    type: Number,
    default: 0
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

// Función para mapear categorías del JSON a plataformas
function mapearCategoria(category) {
  const mapeo = {
    'PS5': 'PlayStation 5',
    'Switch': 'Nintendo Switch',
    'Xbox': 'Xbox Series X/S',
    'Accesorios': 'Multi-plataforma',
    'Consolas': 'Multi-plataforma'
  };
  return mapeo[category] || 'Multi-plataforma';
}

// Función para poblar la base de datos
async function seedDatabase() {
  try {
    // Conectar a MongoDB
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB Atlas');

    // Leer el archivo products.json
    const productsPath = join(__dirname, '../../../src/data/products.json');
    const productsData = JSON.parse(readFileSync(productsPath, 'utf-8'));
    
    console.log(`📦 Se encontraron ${productsData.length} productos en el archivo JSON`);

    // Limpiar la colección (opcional - comentar si no quieres borrar datos existentes)
    await Product.deleteMany({});
    console.log('🗑️  Base de datos limpiada');

    // Transformar datos del JSON al formato del modelo
    const productosTransformados = productsData.map(producto => ({
      nombre: producto.name,
      descripcion: producto.description || 'Sin descripción',
      precio: producto.price,
      plataforma: mapearCategoria(producto.category),
      genero: 'Acción', // Valor por defecto, puedes ajustarlo según necesites
      stock: 10,
      imagen: producto.image,
      destacado: false,
      descuento: 0,
      activo: true
    }));

    // Insertar productos
    const productosInsertados = await Product.insertMany(productosTransformados);
    console.log(`✅ ${productosInsertados.length} productos insertados correctamente`);

    // Mostrar algunos productos
    console.log('\n📋 Primeros 5 productos insertados:');
    productosInsertados.slice(0, 5).forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.nombre} - $${p.precio.toLocaleString('es-CL')}`);
    });

    console.log('\n🎉 ¡Base de datos poblada exitosamente!');
    console.log(`📊 Total de productos en la base de datos: ${productosInsertados.length}`);
    
  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error);
    process.exit(1);
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('\n🔌 Conexión cerrada');
    process.exit(0);
  }
}

// Ejecutar
seedDatabase();
