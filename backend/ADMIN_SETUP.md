# 🔐 Configuración de Usuario Administrador

## Crear Usuario Administrador

Para crear un usuario administrador en la base de datos, sigue estos pasos:

### 1. Asegúrate de que el servidor backend esté configurado

Verifica que tu archivo `.env` tenga la configuración correcta:

```env
MONGODB_URI=tu_conexion_mongodb
JWT_SECRET=tu_secreto_jwt
PORT=5000
```

### 2. Ejecuta el script de seed para crear el admin

Desde la carpeta `backend`, ejecuta:

```bash
npm run seed:admin
```

### 3. Credenciales por defecto

El script creará un usuario administrador con las siguientes credenciales:

```
📧 Email: admin@levelup.com
🔑 Contraseña: admin123456
👤 Nombre: Admin LevelUp
🎭 Rol: admin
```

### 4. Iniciar sesión como administrador

1. Ve a la página de login: `http://localhost:5173/signin`
2. Ingresa las credenciales:
   - **Email:** `admin@levelup.com`
   - **Contraseña:** `admin123456`
3. Serás redirigido automáticamente al panel de administración en `/admin`

## 🔒 Seguridad

⚠️ **IMPORTANTE:**
- Cambia la contraseña del administrador después del primer login
- No compartas las credenciales de administrador
- En producción, usa contraseñas fuertes y únicas

## 📝 Crear más administradores

Puedes crear más usuarios administradores de dos formas:

### Opción 1: Modificar el script seedAdminUser.js

Edita el archivo `backend/src/scripts/seedAdminUser.js` y cambia los datos del objeto `adminUser`:

```javascript
const adminUser = {
  nombre: 'Nuevo',
  apellido: 'Admin',
  email: 'nuevoadmin@levelup.com',
  password: 'contraseña_segura',
  rol: 'admin',
  // ... otros campos
};
```

Luego ejecuta: `npm run seed:admin`

### Opción 2: Usar MongoDB Compass o mongosh

Conéctate directamente a tu base de datos y actualiza el campo `rol` de un usuario existente:

```javascript
db.users.updateOne(
  { email: "usuario@ejemplo.com" },
  { $set: { rol: "admin" } }
)
```

## ✅ Verificar que funciona

1. Inicia sesión con las credenciales de admin
2. Verifica que puedas acceder a `/admin`
3. Deberías ver el panel de administración con funciones exclusivas

## 🔧 Troubleshooting

### El usuario admin ya existe

Si ejecutas el script y ya existe un admin, verás este mensaje:
```
⚠️  El usuario administrador ya existe
```

Para resetear la contraseña:
1. Elimina el usuario desde MongoDB Compass o mongosh
2. Ejecuta nuevamente `npm run seed:admin`

### Error de conexión a MongoDB

Verifica que:
- MongoDB Atlas esté accesible
- Tu IP esté en la whitelist de MongoDB Atlas
- Las credenciales en `.env` sean correctas

### No puedo acceder a /admin después de login

Verifica en las herramientas de desarrollador (F12) que:
- El token se guardó en localStorage
- El rol del usuario es 'admin'
- La respuesta del backend incluye `rol: 'admin'`
