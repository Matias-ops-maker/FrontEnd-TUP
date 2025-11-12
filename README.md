# 🚗 RepuestosAuto - Frontend

> **Proyecto Final - Técnicatura Universitaria en Programación**

## 👥 INTEGRANTES

- **Sandoval Sirimarco, Lautaro Agustin** - [Lautaro.Sandoval98@gmail.com]
- **Aispuro, Francisco** - [aispurofrancisco2003@gmail.com]
- **Perez Daniele, Matias Sebastian** - [matiasperezdaniele@gmail.com]

---

## 📋 Descripción

Este es el **repositorio del Frontend** del sistema RepuestosAuto, un e-commerce de repuestos automotrices desarrollado con React 18 y Vite.

> ⚠️ **IMPORTANTE**: El backend de este proyecto está en un repositorio separado. Este repositorio contiene únicamente el frontend.

## 🚀 Inicio Rápido

### 1️⃣ Instalación

```bash
cd FRONTEND
npm install
```

### 2️⃣ Configuración

Crear un archivo `.env` en la carpeta `FRONTEND/` con las siguientes variables:

```env
# URL del Backend (ajustar según tu configuración)
VITE_API_URL=http://localhost:4000/api

# Clave pública de MercadoPago
VITE_MP_PUBLIC_KEY=TEST-c14ba9b2-4fda-4c26-85bc-f6e39c96a2f9
```

> 📝 **Nota**: Ya existe un archivo `.env.example` como referencia.

### 3️⃣ Ejecutar en Desarrollo

**Opción 1 - Con npm:**
```bash
npm run dev
```

**Opción 2 - Con script de Windows:**
```bash
.\start-frontend.bat
```

**Opción 3 - Con PowerShell:**
```bash
.\start-frontend.ps1
```

### 4️⃣ Acceder a la Aplicación

Abre tu navegador en: **http://localhost:5173**

---

## 🔧 Configuración del Backend

Este frontend necesita conectarse a un backend para funcionar. Asegúrate de:

1. **Tener el backend corriendo** en `http://localhost:4000` (o la URL que configures en `VITE_API_URL`)
2. **El backend debe tener:**
   - Base de datos PostgreSQL configurada
   - Variables de entorno correctas
   - Estar ejecutándose antes de iniciar el frontend

### Configuración de API

El archivo `src/api.js` contiene la configuración de Axios para conectar con el backend:

```javascript
// Configuración automática desde .env
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Headers automáticos
- X-API-Key: Para autenticación de API
- Authorization: Token JWT (si el usuario está logueado)
```

---

## 📁 Estructura del Proyecto

```
FRONTEND/
├── src/
│   ├── api.js              # ⚙️ Configuración de Axios
│   ├── App.jsx             # 📄 Componente principal
│   ├── main.jsx            # 🚀 Punto de entrada
│   ├── components/         # 🧩 Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── UserNavbar.jsx
│   │   └── MercadoPagoCheckout.jsx
│   ├── pages/              # 📄 Páginas
│   │   ├── admin/          # 👑 Panel de administración
│   │   ├── auth/           # 🔐 Autenticación
│   │   ├── usuario/        # 👤 Área de usuario
│   │   └── payments/       # 💳 Páginas de pago
│   └── styles/             # 🎨 Estilos CSS
├── .env                    # 🔒 Variables de entorno (NO subir a git)
├── .env.example            # 📝 Ejemplo de variables
├── package.json            # 📦 Dependencias
└── vite.config.js          # ⚙️ Configuración de Vite
```

---

## 🌐 Funcionalidades

### Usuario
- 🏠 Página principal con productos destacados
- 🔍 Catálogo con búsqueda y filtros
- 🛒 Carrito de compras
- 💳 Checkout con MercadoPago
- 👤 Perfil de usuario
- 📦 Historial de pedidos

### Administrador
- 📊 Dashboard administrativo
- 📦 Gestión de productos (CRUD)
- 🏷️ Gestión de categorías y marcas
- 🛍️ Gestión de pedidos
- 📈 Reportes de ventas

---

## 🔑 Cuentas de Prueba

Para probar la aplicación, puedes usar estas cuentas:

**Usuario Cliente:**
- Email: `juan@gmail.com`
- Contraseña: `user123`

**Administrador:**
- Email: `admin@repuestos.com`
- Contraseña: `admin123`

---

## 🛠️ Tecnologías Utilizadas

- ⚛️ **React 18** - Framework UI
- ⚡ **Vite** - Build tool
- 🧭 **React Router v6** - Navegación
- 📡 **Axios** - Peticiones HTTP
- 💳 **MercadoPago SDK** - Integración de pagos
- 🎨 **CSS3** - Estilos personalizados
- 🔍 **ESLint** - Calidad de código

---

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Genera build de producción
npm run preview  # Preview del build de producción
npm run lint     # Ejecuta ESLint
```

---

## ⚠️ Notas Importantes

1. **Backend Separado**: Este proyecto requiere un backend funcionando. El backend NO está incluido en este repositorio.

2. **Variables de Entorno**: Asegúrate de crear el archivo `.env` con las URLs correctas antes de ejecutar.

3. **Puerto del Frontend**: Por defecto Vite usa el puerto `5173`. Si está ocupado, usará el siguiente disponible.

4. **Puerto del Backend**: El backend debe estar en el puerto configurado en `VITE_API_URL` (por defecto `4000`).

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to backend"
- ✅ Verifica que el backend esté corriendo
- ✅ Revisa la URL en el archivo `.env`
- ✅ Verifica que no haya firewall bloqueando el puerto

### Error: "CORS policy"
- ✅ Verifica que el backend tenga CORS configurado correctamente
- ✅ Asegúrate de que la URL del frontend esté permitida en el backend

### Error: "Module not found"
- ✅ Ejecuta `npm install` nuevamente
- ✅ Borra la carpeta `node_modules` y ejecuta `npm install`

---

## 📞 Soporte

Para dudas o problemas, contacta a cualquiera de los integrantes del equipo.
