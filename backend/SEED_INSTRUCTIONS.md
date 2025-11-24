# 📦 Instrucciones para Poblar la Base de Datos

## 🔧 Configuración Previa

### 1. Crear archivo `.env`

Crea un archivo `.env` en la carpeta `backend/` con tu conexión a MongoDB:

```env
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/levelup-gamer?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=tu_clave_secreta_aqui
NODE_ENV=development
```

**Cómo obtener tu MONGO_URI:**
1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Inicia sesión en tu cuenta
3. Click en "Connect" en tu cluster
4. Selecciona "Connect your application"
5. Copia la connection string y reemplaza `<password>` con tu contraseña

### 2. Verificar que MongoDB esté configurado

Asegúrate de tener:
- ✅ Una cuenta en MongoDB Atlas
- ✅ Un cluster creado
- ✅ Un usuario de base de datos configurado
- ✅ Tu IP en la whitelist (o permitir acceso desde cualquier IP: 0.0.0.0/0)

## 🚀 Ejecutar el Script de Población

### Opción 1: Con npm script (Recomendado)

```bash
cd backend
npm run seed
```

### Opción 2: Directamente con Node

```bash
cd backend
node src/scripts/seedDatabase.js
```

## ✅ Resultado Esperado

Deberías ver algo como:

```
🔄 Conectando a MongoDB...
✅ Conectado a MongoDB Atlas
📦 Se encontraron 23 productos en el archivo JSON
🗑️  Base de datos limpiada
✅ 23 productos insertados correctamente

📋 Primeros 5 productos insertados:
   1. Accesorio Xbox Series - $19.990
   2. Audífonos Gamer Inalámbricos - $29.990
   3. Resident Evil Revelations (Switch) - $34.990
   4. Rayman Legends Definitive (Switch) - $22.990
   5. Donkey Kong Country Returns HD (Switch) - $54.990

🎉 ¡Base de datos poblada exitosamente!
📊 Total de productos en la base de datos: 23

🔌 Conexión cerrada
```

## ⚠️ Notas Importantes

1. **El script BORRA todos los productos existentes** antes de insertar los nuevos. Si quieres conservar datos existentes, comenta la línea:
   ```javascript
   await Product.deleteMany({});
   ```

2. **Campos mapeados automáticamente:**
   - `name` → `nombre`
   - `description` → `descripcion`
   - `price` → `precio`
   - `category` → `plataforma` (con mapeo de categorías)
   - `image` → `imagen`

3. **Valores por defecto:**
   - `stock`: 10 unidades
   - `destacado`: false
   - `descuento`: 0
   - `activo`: true
   - `genero`: 'Acción'

## 🔍 Verificar que funcionó

Después de ejecutar el script, puedes verificar en MongoDB Atlas:
1. Ve a tu cluster
2. Click en "Browse Collections"
3. Busca la colección `products`
4. Deberías ver todos tus productos insertados

## 🐛 Problemas Comunes

### Error: "MongoNetworkError"
- ✅ Verifica que tu IP esté en la whitelist de MongoDB Atlas
- ✅ Revisa que tu MONGO_URI sea correcta

### Error: "Authentication failed"
- ✅ Verifica tu usuario y contraseña en el MONGO_URI
- ✅ Asegúrate de no tener caracteres especiales sin codificar en la contraseña

### Error: "Cannot find module"
- ✅ Ejecuta `npm install` en la carpeta backend primero

## 📞 Soporte

Si tienes problemas, revisa:
1. Los logs de error en la terminal
2. Tu configuración de MongoDB Atlas
3. Que el archivo `products.json` exista en `src/data/`
