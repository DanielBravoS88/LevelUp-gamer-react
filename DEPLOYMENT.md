# 🚀 Guía de Deployment - LevelUp Gamer

## 📋 Preparación completada

Tu backend está listo para desplegarse en Render. Sigue estos pasos:

---

## 🔧 PASO 1: Crear cuenta en Render

1. Ve a [https://render.com](https://render.com)
2. Haz clic en **"Get Started for Free"**
3. Regístrate con tu cuenta de GitHub
4. Autoriza a Render para acceder a tus repositorios

---

## 🚀 PASO 2: Desplegar el Backend

### A. Crear nuevo Web Service
1. En el dashboard de Render, clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio: `DanielBravoS88/LevelUp-gamer-react`
3. Configura los siguientes campos:

```
Name: levelup-gamer-api
Region: Oregon (US West) o el más cercano
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### B. Configurar Variables de Entorno
En la sección **"Environment Variables"**, agrega:

```
NODE_ENV = production
PORT = 10000
MONGODB_URI = [Tu string de conexión MongoDB Atlas]
JWT_SECRET = [Tu clave secreta JWT actual]
JWT_EXPIRE = 30d
```

**⚠️ IMPORTANTE:** Usa los mismos valores que tienes en tu archivo `.env` local

### C. Desplegar
1. Clic en **"Create Web Service"**
2. Espera 5-10 minutos mientras Render construye y despliega
3. Verás logs en tiempo real del proceso
4. Cuando termine, verás: ✅ **"Live"** en verde

### D. Obtener tu URL
Tu backend estará disponible en:
```
https://levelup-gamer-api.onrender.com
```
(O el nombre que hayas elegido)

---

## 🌐 PASO 3: Actualizar el Frontend

### A. Crear archivo .env en el proyecto raíz
```bash
VITE_API_URL=https://levelup-gamer-api.onrender.com
```

### B. Actualizar código del frontend
Ya preparé los archivos para usar la variable de entorno. Solo necesitas:

1. Crear el archivo `.env` localmente con tu URL de Render
2. Hacer push a GitHub
3. Vercel detectará los cambios automáticamente

### C. Configurar variable en Vercel
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://levelup-gamer-api.onrender.com`
   - **Environments:** Selecciona Production, Preview, Development
4. Redeploy tu aplicación en Vercel

---

## ✅ PASO 4: Verificación

### Probar el Backend
Abre en tu navegador:
```
https://levelup-gamer-api.onrender.com/
```

Deberías ver:
```json
{
  "success": true,
  "message": "🎮 Bienvenido a LevelUp Gamer API",
  "version": "1.0.0",
  "endpoints": {
    "products": "/api/products",
    "users": "/api/users",
    "orders": "/api/orders"
  }
}
```

### Probar el Frontend
1. Ve a tu sitio de Vercel
2. Prueba login con: `admin@levelup.com` / `admin123456`
3. Verifica que carguen los productos
4. Prueba crear una orden de compra
5. Verifica el panel de administración

---

## ⚠️ NOTAS IMPORTANTES

### Plan Free de Render
- El servicio se "duerme" después de 15 minutos sin actividad
- El primer request después de dormir tarda ~30-50 segundos
- Perfecto para proyectos académicos y demos

### Si el backend está "dormido"
- La primera carga del frontend puede tardar
- Muestra un mensaje de "Cargando..." mientras espera
- Los siguientes requests serán instantáneos

### Monitoreo
- Render te enviará emails si hay errores
- Puedes ver logs en tiempo real desde el dashboard
- Configura notificaciones en Settings

---

## 🐛 Troubleshooting

### Error de conexión a MongoDB
- Verifica que `MONGODB_URI` esté correctamente configurado
- Asegúrate que MongoDB Atlas permita conexiones desde cualquier IP (0.0.0.0/0)

### Error 500 en el backend
- Revisa los logs en Render Dashboard
- Verifica que todas las variables de entorno estén configuradas

### Frontend no conecta con backend
- Verifica la variable `VITE_API_URL` en Vercel
- Asegúrate que incluya `https://` y no tenga `/` al final

---

## 📞 Soporte

Si encuentras algún problema durante el deployment, revisa:
1. Logs en Render Dashboard
2. Variables de entorno correctamente configuradas
3. MongoDB Atlas con IP Whitelist habilitado

---

**¡Tu aplicación estará 100% operativa en la nube!** 🚀
