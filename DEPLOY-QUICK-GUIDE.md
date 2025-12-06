# 🚀 GUÍA RÁPIDA DE DEPLOYMENT

## ✅ Archivos preparados

Ya está todo listo para deployment. Los siguientes archivos fueron creados/actualizados:

- ✅ `backend/render.yaml` - Configuración de Render
- ✅ `backend/.env.example` - Template de variables de entorno del backend
- ✅ `.env.example` - Template de variables de entorno del frontend  
- ✅ `.env` - Variables locales (no se sube a GitHub)
- ✅ `src/config/api.js` - Configuración centralizada de API
- ✅ Todos los fetch() actualizados para usar variables de entorno

---

## 📝 PASO A PASO PARA DEPLOYMENT

### 1️⃣ SUBIR CAMBIOS A GITHUB

```bash
cd c:\Workspace\LevelUp-gamer-react
git add .
git commit -m "Preparar deployment: Backend en Render + Frontend en Vercel"
git push origin main
```

---

### 2️⃣ DESPLEGAR BACKEND EN RENDER

#### A. Crear cuenta
1. Ve a **https://render.com**
2. Clic en **"Get Started for Free"**
3. Regístrate con GitHub
4. Autoriza acceso a tus repositorios

#### B. Crear Web Service
1. En dashboard: **"New +"** → **"Web Service"**
2. Selecciona: `DanielBravoS88/LevelUp-gamer-react`
3. Configura:
   ```
   Name: levelup-gamer-api
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

#### C. Variables de Entorno en Render
Agregar en **"Environment Variables"**:

```
NODE_ENV = production
PORT = 10000
MONGODB_URI = [Copiar de tu archivo backend/.env local]
JWT_SECRET = [Copiar de tu archivo backend/.env local]
JWT_EXPIRE = 30d
```

⚠️ **IMPORTANTE**: Usa exactamente los mismos valores de tu `.env` local

#### D. Deploy
1. Clic **"Create Web Service"**
2. Espera 5-10 minutos
3. Cuando termine verás: ✅ **Live**
4. Copia tu URL: `https://levelup-gamer-api.onrender.com`

---

### 3️⃣ CONFIGURAR FRONTEND EN VERCEL

#### A. Agregar variable de entorno
1. Ve a tu proyecto en **https://vercel.com**
2. **Settings** → **Environment Variables**
3. Agregar nueva variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://levelup-gamer-api.onrender.com` (tu URL de Render)
   - **Environments**: Marca las 3 opciones (Production, Preview, Development)
4. **Save**

#### B. Redeploy
1. En tu proyecto de Vercel, ve a **"Deployments"**
2. Clic en los **3 puntos** del último deployment
3. **"Redeploy"**
4. Espera 2-3 minutos

---

### 4️⃣ VERIFICAR QUE TODO FUNCIONE

#### Probar Backend
Abre en navegador:
```
https://levelup-gamer-api.onrender.com
```

Deberías ver:
```json
{
  "success": true,
  "message": "🎮 Bienvenido a LevelUp Gamer API"
}
```

#### Probar Frontend  
1. Abre tu sitio de Vercel
2. Login: `admin@levelup.com` / `admin123456`
3. Verifica productos carguen
4. Prueba crear orden de compra
5. Prueba panel admin (agregar/editar/eliminar producto)

---

## ⚠️ NOTAS IMPORTANTES

### Plan Free de Render
- Se "duerme" tras 15 min sin actividad
- Primer request después de dormir: **~30-50 segundos**
- Requests siguientes: **instantáneos**
- Perfecto para proyectos académicos

### MongoDB Atlas
Asegúrate que tu MongoDB Atlas permita conexiones desde cualquier IP:
1. Entra a MongoDB Atlas
2. **Network Access** → **Add IP Address**
3. Agregar: `0.0.0.0/0` (Permitir desde cualquier IP)

### Si el backend está dormido
- Primera carga puede tardar (mostrar loading)
- Después funciona normal
- Es comportamiento esperado del plan Free

---

## 🐛 TROUBLESHOOTING

### ❌ Error: No se conecta a MongoDB
**Solución**: 
- Verifica `MONGODB_URI` en Render
- Revisa IP Whitelist en MongoDB Atlas (0.0.0.0/0)
- Chequea logs en Render Dashboard

### ❌ Frontend no carga productos
**Solución**:
- Verifica variable `VITE_API_URL` en Vercel
- Asegúrate que tenga `https://` y sin `/` al final
- Haz redeploy en Vercel después de agregar variable

### ❌ Error 500 en requests
**Solución**:
- Revisa logs en tiempo real en Render Dashboard
- Verifica que todas las variables de entorno estén configuradas
- Comprueba JWT_SECRET esté igual en backend y frontend

---

## 📊 RESUMEN DE URLs

| Componente | URL |
|------------|-----|
| **Frontend** | `https://level-up-gamer-react-weld.vercel.app` |
| **Backend** | `https://levelup-gamer-api.onrender.com` |
| **MongoDB** | MongoDB Atlas (cloud) |
| **Repositorio** | `github.com/DanielBravoS88/LevelUp-gamer-react` |

---

## ✅ CHECKLIST FINAL

Antes de presentar tu proyecto, verifica:

- [ ] Backend desplegado en Render (status: Live)
- [ ] Frontend desplegado en Vercel  
- [ ] Variable `VITE_API_URL` configurada en Vercel
- [ ] Login funciona (admin@levelup.com)
- [ ] Productos cargan correctamente
- [ ] Carrito de compras funciona
- [ ] Creación de órdenes funciona
- [ ] Panel admin funciona (CRUD productos)
- [ ] Pruebas unitarias pasan (`npm test`)

---

**¡Tu aplicación está 100% en la nube y lista para presentar!** 🎉🚀

Si tienes problemas, revisa el archivo `DEPLOYMENT.md` para documentación detallada.
