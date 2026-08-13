# Controladores y flujo de desarrollo - LuxArs (Node)

Guia para todos los companeros. Explica donde vive cada funcionalidad del app
(controladores) y como trabajar en el proyecto sin romper nada.

Complementa a `INSTRUCCIONES.md`, que tiene las reglas obligatorias (commits,
ramas, estilo y estructura).

---

## 1. Arrancar el proyecto

```bash
npm install          # primera vez
cp .env.example .env # configurar claves de Supabase (nunca subir .env)
npm start            # abre la app en http://localhost:3000
```

- El backend (Node/Express) sirve la SPA de `public/` y en cada arranque inyecta
  `window.SUPABASE_URL` y `window.SUPABASE_ANON_KEY` desde el `.env`.
- Sin `.env`, la app corre en "modo demo": hay 2 usuarios de prueba
  (`admin@luxars.com/admin123` y `foto@luxars.com/foto123`) y las reservas/
  portafolio se guardan solo en memoria o local del navegador.

---

## 2. Controladores (donde vive cada cosa)

### 2.1 Backend - `server.js`

| Responsabilidad | Detalle |
|-----------------|---------|
| Servir la SPA | `express.static` sirve `public/` (index.html, css, js) |
| Ruta SPA | Cualquier ruta responde con `index.html` (navegacion por History API) |
| Configuracion | Inyecta `SUPABASE_URL` y `SUPABASE_ANON_KEY` desde variables de entorno |
| Puerto | `process.env.PORT` o 3000 |

### 2.2 Frontend - `public/js/script.js`

| Modulo | Funciones | Lineas | Responsabilidad |
|--------|-----------|--------|-----------------|
| Datos demo | `photographers` | 6 | Lista de 16 fotografos con perfil, portafolio y precio |
| Render de cards | `createCard`, `renderGrid`, `initBlobButtons` | 266-321 | Pinta las tarjetas de fotografos en grillas |
| Navegacion SPA | `navigateTo`, `scrollToSection`, `hasAccess`, modales de acceso | 324-498 | Cambio de paginas, historial, acceso por rol |
| Catalogo | `applyFilters`, `clearFilters` | 522-560 | Filtros por especialidad y precio |
| Perfil | handler de cards y `backToCatalog` | 563-628 | Vista detalle del fotografo |
| Reservas | `initBookingSystem`, `selectPhotographer`, `handleBookingSubmit`, `showPaymentStep`, `handleConfirmPayment`, `renderMyReservations` | 699-1156 | DatePicker/TimePicker, validaciones, pago simulado y cancelacion |
| Alertas | `luxAlert`, `closeLuxAlert` | 1157-1201 | Modal de avisos personalizado |
| Sesion / Auth | `saveSession`, `fetchProfile`, `applyProfile`, `restoreSession`, `logoutSession`, `updateNavbarUI`, handlers de login/register | 1203-1343 y 1739-1898 | Autenticacion con Supabase (o modo demo) |
| Portafolio / Upload | `initUploadSystem`, `handleFileSelect`, `openUploadModal`, `handleUploadSubmit`, `supabaseUpload`, `loadPortfolio` | 1344-1674 | Subida de imagenes/videos a Supabase Storage |
| Utilidades | `animateCounters`, back-to-top, carousel | 1689-1736 | Contadores animados y helpers visuales |

> Regla del proyecto: TODO el JS vive en `public/js/script.js` y TODO el CSS en
> `public/css/styles.css`. No crear archivos sueltos por cada uno.

---

## 3. Flujo de desarrollo (paso a paso)

1. **Actualiza tu repo antes de empezar**:
   ```bash
   git pull origin main
   ```

2. **Crea tu rama** por funcionalidad:
   ```bash
   git checkout -b feature/tu-funcionalidad
   ```

3. **Trabaja UNA seccion por commit**. Si tu tarea toca reservas, no mezcles
   cambios de CSS + JS + HTML de otra seccion en el mismo commit.

4. **Verifica antes de subir**:
   ```bash
   node --check public/js/script.js   # sintaxis JS
   npm start                          # que arranque el servidor
   git diff                           # revisa lo que se va a subir
   ```

5. **Commit en espanol, sin emojis**:
   ```bash
   git add public/js/script.js
   git commit -m "feat: agregar subida de fotos al portafolio"
   ```
   Prefijos: `feat:` nueva funcionalidad, `fix:` correccion, `refactor:`
   reestructurar, `style:` formato/espacios.

6. **Sube tu rama**:
   ```bash
   git push -u origin feature/tu-funcionalidad
   ```

7. **Integra a `main` poco a poco** (la rama esta protegida): abre un Pull
   Request, revisa con un companero y mergea. No integrar todo de golpe al final.

---

## 4. Reglas para no romper la pagina

- **Repartirse las zonas**: como todo vive en 3 archivos, si dos personas tocan
  las mismas lineas habra conflicto. Ejemplo: compa A = reservas, compa B =
  portafolio, compa C = navbar/login, compa D = backend/Supabase.
- **Nunca reformatear un archivo entero** (no cambiar la indentacion global
  "para que se vea bonito"). Genera conflictos seguros.
- **No subir** `node_modules/`, `.env`, `npm-debug.log` (ya estan en
  `.gitignore`).
- **Cambios mayores** (reestructuracion de HTML, navbar): avisa antes de tocar
  `main` y crea rama.
- Los cambios en `.env` son locales: los companeros usan el suyo propio.

---

## 5. Supabase

- Cada cambio de base de datos va en `supabase/migrations/` con numeracion
  correlativa: `0001_profiles.sql`, `0002_portfolio.sql`, siguiente
  `0003_reservas.sql`. El SQL se pega en Supabase (SQL Editor).
- No se reescriben ni renumeran archivos SQL ya ejecutados.
