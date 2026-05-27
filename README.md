# 🌱 AGROTECH — Soluciones Químicas de Precisión

Sitio web profesional de catálogo industrial y cotización en línea para **Agrotech S.A. de C.V.**, empresa de Zapopan, Jalisco dedicada a la nutrición vegetal de alta eficiencia.

---

## 📁 Estructura del Proyecto

```
agrotech/
│
├── index.html        ← Estructura HTML principal (limpia, sin estilos ni scripts inline)
├── style.css         ← Todos los estilos visuales del sitio
├── script.js         ← Lógica de la tienda, carrito, slider y formulario
├── firebase.js       ← Conexión a Firebase (base de datos en la nube)
│
├── vercel.json       ← Configuración para despliegue en Vercel
├── .gitignore        ← Archivos que NO se suben a GitHub (incluye .env)
├── .env.example      ← Plantilla de variables de entorno (sí se sube)
└── README.md         ← Este archivo
```

---

## ✨ Funcionalidades

- **Slider Hero** con autoplay cada 7 segundos y controles manuales
- **Catálogo de productos** con filtros por categoría (Fertilizantes / Bio-estimulantes)
- **Carrito lateral** con gestión de cantidades y cotización formal
- **Formulario de contacto** conectado a Firebase Firestore
- **Diseño responsive** optimizado para móvil y escritorio

---

## 🚀 Guía de Despliegue: GitHub → Vercel

### Paso 1 — Preparar tu repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión (o crea cuenta).
2. Haz clic en **"New repository"** → Ponle nombre: `agrotech-web`.
3. Deja el repositorio en **Público** o **Privado** (ambos funcionan con Vercel).
4. Sube tus archivos:
   ```bash
   # En la terminal, dentro de tu carpeta del proyecto:
   git init
   git add .
   git commit -m "Primer commit: sitio Agrotech"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/agrotech-web.git
   git push -u origin main
   ```

### Paso 2 — Conectar Firebase (base de datos)

1. Ve a [console.firebase.google.com](https://console.firebase.google.com).
2. Crea un proyecto nuevo → Activa **Firestore Database**.
3. Ve a ⚙️ → **Configuración del proyecto** → **Aplicaciones web** → copia las claves.
4. Crea un archivo `.env` en tu proyecto (copia `.env.example` y pega tus claves).

> **⚠️ IMPORTANTE:** El archivo `.env` ya está en `.gitignore`, así que nunca se subirá a GitHub. ¡Tus claves estarán seguras!

### Paso 3 — Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New Project"** → selecciona tu repositorio `agrotech-web`.
3. En la sección **"Environment Variables"**, agrega cada variable de tu `.env`:
   - `VITE_FIREBASE_API_KEY` → el valor real
   - `VITE_FIREBASE_AUTH_DOMAIN` → el valor real
   - *(repite para cada variable)*
4. Haz clic en **"Deploy"** → en ~2 minutos tu sitio estará en línea.

### Paso 4 — Actualizaciones futuras

Cada vez que hagas cambios y los subas a GitHub, Vercel los desplegará **automáticamente**:
```bash
git add .
git commit -m "Descripción del cambio"
git push
```

---

## 🔒 Seguridad

| Archivo | ¿Se sube a GitHub? | ¿Por qué? |
|---|---|---|
| `.env` | ❌ NO | Contiene claves secretas |
| `.env.example` | ✅ SÍ | Es solo una plantilla sin valores reales |
| `firebase.js` | ✅ SÍ | Lee las claves desde variables de entorno |

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 / CSS3 / JavaScript** — Estándar web moderno
- **Tailwind CSS** — Framework de estilos (vía CDN)
- **Firebase Firestore** — Base de datos NoSQL en la nube (Google)
- **Vercel** — Hosting y despliegue continuo

---

## 📞 Contacto del Proyecto

**Empresa:** Agrotech S.A. de C.V.  
**Ubicación:** Parque Industrial Zapopan Norte, Jalisco, México  
**Email:** ventas@agrotech-precision.com  

---

*Proyecto académico — 6to Grado Preparatoria — 2024*
