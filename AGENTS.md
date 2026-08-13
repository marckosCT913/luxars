# AGENTS.md - LuxArs (Node/Express)

Este archivo se carga automaticamente cada vez que trabajes en este proyecto.
Antes de tocar codigo, lee y respeta:

- `INSTRUCCIONES.md`  -> reglas obligatorias (commits, ramas, estilo, estructura)
- `CONTROLADORES.md`  -> tablas de controladores y flujo de desarrollo del equipo

## Resumen del proyecto

LuxArs es un marketplace fotografico del Valle de Aburra (SPA con estetica Swiss Design).

- **Backend**: Node/Express (`server.js`). Sirve la SPA estatica de `public/` y
  en cada arranque inyecta `SUPABASE_URL` / `SUPABASE_ANON_KEY` desde el `.env`.
  Cualquier ruta responde con `index.html` (navegacion por History API).
- **Frontend**: SPA en `public/` (`index.html`, `css/styles.css`, `js/script.js`).
  Todo el CSS y el JS viven en esos 2 unicos archivos. No crear archivos sueltos.
- **Auth y storage**: Supabase (cliente via CDN). Sin `.env` la app corre en
  "modo demo" con usuarios de prueba: `admin@luxars.com/admin123` y `foto@luxars.com/foto123`.

## Paginas de la SPA (`public/index.html`)

`home` (landing), `catalog`, `profile`, `dashboard`, `auth`, `reservas`, `portafolio`.

## Controladores clave (`public/js/script.js`)

- Render de cards: `createCard` / `renderGrid` / `initBlobButtons` (~266)
- Navegacion SPA: `navigateTo` / `scrollToSection` + History API (~358)
- Catalogo / filtros: `applyFilters` / `clearFilters` (~522)
- Reservas: `initBookingSystem` / `handleBookingSubmit` / `showPaymentStep` /
  `handleConfirmPayment` / `renderMyReservations` (~866)
- Sesion / auth Supabase: `saveSession` / `restoreSession` / `logoutSession` /
  handlers de login y register (~1251)
- Portafolio / upload: `initUploadSystem` / `handleUploadSubmit` / `supabaseUpload` / `loadPortfolio` (~1347)
- Alertas: `luxAlert` (~1157); contadores: `animateCounters` (~1689)

Detalles y lineas actualizadas en `CONTROLADORES.md`.

## Arranque local

```bash
npm install              # primera vez
cp .env.example .env     # claves de Supabase; sin .env -> modo demo
npm start                # http://localhost:3000
```

## Regla fija al terminar una tarea

1. Verifica sintaxis: `node --check public/js/script.js`
2. Confirma que arranca: `npm start`
3. Muestra al usuario los archivos modificados y pide confirmacion ante cambios destructivos.
4. Commit descriptivo en espanol (una tarea por commit, sin emojis) y `git push` a la rama actual.
