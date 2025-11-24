import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from '../models/User.js';

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '../../.env') });

// Usuario administrador por defecto
const adminUser = {
  nombre: 'Admin',
  apellido: 'LevelUp',
  email: 'admin@levelup.com',
  password: 'admin123456',
  telefono: '123456789',
  direccion: {
    calle: 'Calle Principal 123',
    ciudad: 'Santiago',
    region: 'Región Metropolitana',
    codigoPostal: '8320000'
  },
  rol: 'admin',
  activo: true
};

// Función para crear usuario administrador
async function seedAdminUser() {
  try {
    // Conectar a MongoDB
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB Atlas');

    // Verificar si ya existe un administrador
    const adminExistente = await User.findOne({ email: adminUser.email });

    if (adminExistente) {
      console.log('⚠️  El usuario administrador ya existe');
      console.log('📧 Email:', adminExistente.email);
      console.log('👤 Nombre:', `${adminExistente.nombre} ${adminExistente.apellido}`);
      console.log('🔑 Rol:', adminExistente.rol);
      
      // Preguntar si desea actualizar la contraseña
      console.log('\n💡 Si olvidaste la contraseña, puedes eliminar este usuario de la BD y ejecutar el script nuevamente.');
    } else {
      // Crear nuevo usuario administrador
      const nuevoAdmin = await User.create(adminUser);
      
      console.log('\n✅ Usuario administrador creado exitosamente');
      console.log('═══════════════════════════════════════════');
      console.log('📧 Email:', nuevoAdmin.email);
      console.log('🔑 Contraseña:', adminUser.password);
      console.log('👤 Nombre:', `${nuevoAdmin.nombre} ${nuevoAdmin.apellido}`);
      console.log('🎭 Rol:', nuevoAdmin.rol);
      console.log('═══════════════════════════════════════════');
      console.log('\n⚠️  IMPORTANTE: Guarda estas credenciales en un lugar seguro');
      console.log('⚠️  Se recomienda cambiar la contraseña después del primer login');
    }

    console.log('\n🎉 Proceso completado exitosamente');
    
  } catch (error) {
    console.error('❌ Error creando usuario administrador:', error);
    process.exit(1);
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('\n🔌 Conexión cerrada');
    process.exit(0);
  }
}

// Ejecutar
seedAdminUser();
