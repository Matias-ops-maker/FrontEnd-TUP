# 🔌 Guía de Conexión Frontend-Backend

## 📋 Requisitos Previos

### Backend Requerido
Este frontend **REQUIERE** un backend funcionando para operar correctamente. El backend debe:

1. ✅ Estar ejecutándose en `http://localhost:4000` (o la URL configurada)
2. ✅ Tener PostgreSQL configurado y corriendo
3. ✅ Tener todas las tablas de la base de datos creadas
4. ✅ Tener los datos seed cargados (opcional pero recomendado)

---

## ⚙️ Configuración Paso a Paso

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `FRONTEND/`:

```env
# URL del Backend - AJUSTAR SEGÚN TU CONFIGURACIÓN
VITE_API_URL=http://localhost:4000/api

# Clave Pública de MercadoPago
VITE_MP_PUBLIC_KEY=TEST-c14ba9b2-4fda-4c26-85bc-f6e39c96a2f9
```

#### 🔧 Configuraciones Alternativas

**Si el backend está en otro puerto:**
```env
VITE_API_URL=http://localhost:3000/api
```

**Si el backend está en producción:**
```env
VITE_API_URL=https://tu-backend.com/api
```

**Si usas Railway, Render, Heroku, etc:**
```env
VITE_API_URL=https://tu-app.railway.app/api
```

### 2. Iniciar el Backend

Antes de iniciar el frontend, asegúrate de que el backend esté corriendo:

```bash
# En la carpeta del backend
cd BACKEND
npm install
npm start
```

Deberías ver algo como:
```
✓ Servidor corriendo en http://localhost:4000
✓ Base de datos conectada
```

### 3. Iniciar el Frontend

Una vez que el backend esté corriendo:

```bash
# En la carpeta del frontend
cd FRONTEND
npm install
npm run dev
```

---

## 🔍 Verificar Conexión

### Verificación Manual

1. Abre el navegador en: `http://localhost:5173`
2. Abre las DevTools (F12)
3. Ve a la pestaña "Network"
4. Navega por la aplicación
5. Deberías ver peticiones a: `http://localhost:4000/api/...`

### Endpoints Principales

El frontend hace peticiones a estos endpoints del backend:

| Endpoint | Descripción | Método |
|----------|-------------|---------|
| `/api/auth/login` | Login de usuario | POST |
| `/api/auth/register` | Registro de usuario | POST |
| `/api/products` | Listado de productos | GET |
| `/api/products/:id` | Detalle de producto | GET |
| `/api/cart` | Carrito de compras | GET/POST |
| `/api/orders` | Pedidos | GET/POST |
| `/api/payments/create-preference` | Crear pago MP | POST |
| `/api/brands` | Marcas | GET |
| `/api/categories` | Categorías | GET |

---

## 🔐 Autenticación

### Headers Automáticos

El archivo `src/api.js` configura automáticamente estos headers:

```javascript
// Header de API Key (requerido por el backend)
X-API-Key: mi_api_key_super_secreta

// Header de autenticación (si hay sesión activa)
Authorization: Bearer <token-jwt>
```

### Flujo de Autenticación

1. **Login:** Usuario ingresa credenciales → Frontend envía POST a `/api/auth/login`
2. **Token:** Backend responde con JWT → Frontend guarda en `localStorage`
3. **Peticiones:** Todas las peticiones incluyen el token en el header `Authorization`
4. **Logout:** Frontend elimina token de `localStorage`
5. **Expiración:** Si token expira (401), frontend redirige a login automáticamente

---

## 🛠️ Configuración Avanzada

### Modificar API Key

Si el backend usa una API Key diferente, modifica `src/api.js`:

```javascript
// Línea 15 aproximadamente
config.headers['X-API-Key'] = 'tu_nueva_api_key_aqui';
```

### Modificar Timeout

Para aumentar el timeout de peticiones:

```javascript
// En src/api.js
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Agregar Interceptores

El archivo `api.js` ya incluye interceptores para:

- ✅ Agregar headers automáticamente
- ✅ Manejar errores 401 (no autenticado)
- ✅ Redirigir a login si la sesión expira

---

## 🐛 Solución de Problemas Comunes

### ❌ Error: "Failed to fetch" / "Network Error"

**Causa:** El backend no está corriendo o no es accesible.

**Solución:**
1. Verifica que el backend esté corriendo: `curl http://localhost:4000/api`
2. Revisa la URL en `.env`
3. Verifica que no haya firewall bloqueando el puerto

### ❌ Error: "CORS policy: No 'Access-Control-Allow-Origin'"

**Causa:** El backend no tiene CORS configurado correctamente.

**Solución en el Backend:**
```javascript
// En backend/src/app.js
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend
  credentials: true
}));
```

### ❌ Error: 401 Unauthorized

**Causa:** Token JWT inválido o expirado.

**Solución:**
1. Cierra sesión y vuelve a iniciar
2. Verifica que el backend esté generando tokens correctamente
3. Borra `localStorage`: F12 → Application → Local Storage → Clear

### ❌ Error: 403 Forbidden / Invalid API Key

**Causa:** La API Key no coincide con la del backend.

**Solución:**
1. Verifica la API Key en `src/api.js`
2. Verifica la API Key en el backend
3. Asegúrate de que ambas coincidan

### ❌ Productos no cargan / Página en blanco

**Causa:** El backend no tiene datos o hay error en las peticiones.

**Solución:**
1. Verifica el backend con: `curl http://localhost:4000/api/products`
2. Revisa la consola del navegador (F12)
3. Asegúrate de que el backend tenga datos seed cargados

---

## 🧪 Testing de Conexión

### Test Manual con cURL

```bash
# Test de conexión básica
curl http://localhost:4000/api/products

# Test de login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "X-API-Key: mi_api_key_super_secreta" \
  -d '{"email":"juan@gmail.com","password":"user123"}'
```

### Test desde el Navegador

```javascript
// Pega esto en la consola del navegador (F12)
fetch('http://localhost:4000/api/products', {
  headers: {
    'X-API-Key': 'mi_api_key_super_secreta'
  }
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
```

---

## 📊 Monitoreo de Peticiones

### Ver todas las peticiones en tiempo real

1. Abre DevTools (F12)
2. Ve a la pestaña "Network"
3. Filtra por "Fetch/XHR"
4. Navega por la aplicación
5. Verás todas las peticiones al backend

### Headers de una petición

1. Click en cualquier petición
2. Ve a "Headers"
3. Verifica que tenga:
   - `X-API-Key: mi_api_key_super_secreta`
   - `Authorization: Bearer <token>` (si estás logueado)

---

## 🔒 Seguridad

### Variables Sensibles

- ❌ **NUNCA** subas el archivo `.env` a git
- ✅ Usa `.env.example` como plantilla
- ✅ El `.gitignore` ya incluye `.env`

### API Key

- La API Key actual es para desarrollo
- En producción, usa una API Key segura y única
- Nunca expongas la API Key del backend en el código del frontend

### Token JWT

- Los tokens se guardan en `localStorage`
- Se eliminan automáticamente al hacer logout
- Expiran según la configuración del backend

---

## 📝 Checklist de Configuración

Antes de ejecutar el frontend, verifica:

- [ ] Backend instalado y configurado
- [ ] PostgreSQL corriendo
- [ ] Base de datos creada
- [ ] Backend ejecutándose en el puerto correcto
- [ ] Archivo `.env` creado en FRONTEND/
- [ ] `VITE_API_URL` apunta al backend correcto
- [ ] `npm install` ejecutado
- [ ] Puertos no bloqueados por firewall

---

## 🎯 Resumen

1. **Backend primero**: Siempre inicia el backend antes que el frontend
2. **Verifica la URL**: El `.env` debe tener la URL correcta del backend
3. **API Key**: Debe coincidir con la del backend
4. **CORS**: El backend debe permitir peticiones desde `localhost:5173`
5. **Datos**: El backend debe tener datos para mostrar

---

## 📞 Ayuda

Si sigues teniendo problemas:

1. Revisa los logs del backend
2. Revisa la consola del navegador (F12)
3. Verifica que ambos (frontend y backend) estén en la misma red
4. Contacta al equipo de desarrollo
