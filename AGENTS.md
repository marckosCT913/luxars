# Reglas para OpenCode / Agentes IA

## Commits y Push
- Siempre que termines una tarea basada en un prompt, crea un commit descriptivo en español y haz `git push` a la rama actual.
- Antes de pushear, muestra al usuario los archivos modificados y pide confirmación si hay cambios destructivos.

## Ramas
- Para cambios experimentales o que puedan romper la página, crea una rama nueva: `git checkout -b feature/descripcion-breve`.
- No pushees directamente a `main` sin preguntar si el cambio es mayor (ej: reestructuración de HTML, cambios en el navbar, etc.).

## Estilo de código
- Sigue la estética Swiss Design: fondos oscuros (#121212, #1E1E1E), acentos rojos (#FF0000), tipografía uppercase con letter-spacing, bordes rectos sin border-radius.
- No uses emojis en el código ni en commits.
- Mantén el HTML semántico y el CSS modulado por secciones con comentarios.

## Estructura del proyecto (Node/Express)

```
luxars-node/
├── public/
│   ├── index.html   → la pagina (SPA)
│   ├── css/styles.css → TODO el CSS en este unico archivo
│   └── js/script.js   → TODO el JS en este unico archivo
├── supabase/migrations/ → SQL que se pega en Supabase
├── server.js         → sirve el frontend con Express
├── package.json
└── .env              → SUPABASE_URL y SUPABASE_ANON_KEY (nunca subir)
```

- NO crear CSS/JS sueltos por cada uno. Todo el estilo va en `styles.css`, todo el script en `script.js`.
- NO subir `node_modules/`, `.env` (estan en `.gitignore`).
- El servidor inyecta `window.SUPABASE_URL` y `window.SUPABASE_ANON_KEY` desde las variables de entorno del `.env`.

## Despliegue
- Sin despliegue configurado por ahora. Se corre local con `npm install` y `npm start`.

## Verificar antes de subir
- JS: `node --check public/js/script.js`
- Que el servidor arranque con `npm start`
- Revisar con `git diff` lo que se va a subir antes de commitear.
