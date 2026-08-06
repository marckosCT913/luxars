# CONVENCIONES DEL PROYECTO LUXARS

Reglas obligatorias para los 4 integrantes. Objetivo: que las ramas se unifiquen sin conflictos.

---

## 1. NOMBRES DE ARCHIVOS Y CARPETAS

- TODO en minúsculas. Nunca mayúsculas, nunca espacios.
- Palabras compuestas separadas con guion `-` (kebab-case) para archivos web.
- Ejemplos correctos:
  - `index.html`, `styles.css`, `script.js`, `run.sh`, `manage.py`
  - `mi-portafolio.js`, `boton-subir.css`
- Prohibido: `Mi Archivo.css`, `Fotos Finales.html`, `script(2).js`
- Python (backend): separar con guion bajo `_` (snake_case): `views.py`, `settings.py`

## 2. IDIOMA Y ESTILO GENERAL

- Todo el código, comentarios y commits en ESPAÑOL.
- Sin emojis en código, archivos ni commits.
- Estética Swiss Design: fondos oscuros, acentos rojos (#FF0000), UPPERCASE, sin border-radius.

## 3. FORMATO DE CÓDIGO (indentación)

| Lenguaje | Indentación | Punto y coma | Comillas |
|----------|-------------|--------------|----------|
| HTML     | 2 espacios  | no aplica    | dobles `"` |
| CSS      | 2 espacios  | siempre `;`  | no aplica |
| JavaScript | 2 espacios | siempre `;`  | dobles `"` |
| Python   | 4 espacios  | no aplica    | simples `'` |

Regla de oro: **si un archivo usa 2 espacios, NO lo cambies a 4** (y viceversa). Formatear un archivo completo de otra manera = conflictos seguros.

## 4. NOMBRES EN CÓDIGO

- **CSS:** clases y ids en kebab-case: `.portfolio-item`, `#uploadAuthOverlay`
- **JavaScript:** variables y funciones en camelCase: `currentUser`, `renderGrid()`
- **Constantes JS:** UPPER_SNAKE: `APP_USERS`, `ACCESS_RULES`
- **Python:** `minuto_a_segundo()` (snake_case)
- **HTML:** atributos en minúsculas: `<div class="card">`, no `<DIV CLASS="card">`

## 5. COMENTARIOS

- HTML: secciones con comentarios de contexto:
  ```html
  <!-- ===== NAVBAR ===== -->
  ```
- CSS: bloques de sección:
  ```css
  /* ----- CSS Variables ----- */
  ```
- JS: secciones del script:
  ```js
  // ----- Session System / Supabase Auth -----
  ```
- Python: docstring con comillas simples.

## 6. ESTRUCTURA DEL PROYECTO (no crear archivos fuera de su lugar)

```
luxars/
├── templates/          → index.html (la pagina)
├── static/
│   ├── css/styles.css  → TODO el CSS en este unico archivo
│   └── js/script.js    → TODO el JS en este unico archivo
├── config/             → settings.py, urls.py (backend Django)
├── luxars/             → views.py, models.py (app Django)
├── supabase/migrations/→ SQL que se pega en Supabase
├── manage.py
└── run.sh              → arranca el servidor
```

- NO crear CSS/JS sueltos por cada uno. Todo el estilo va en `styles.css`, todo el script en `script.js`.
- NO subir `.env`, `db.sqlite3`, `venv/`, `staticfiles/` (estan en `.gitignore`).

## 7. GIT Y RAMAS

- Rama por integrante y por funcionalidad: `feature/tu-funcionalidad`
- La rama `main` se protege. Nada se mergea a `main` sin revisión del dueño.
- Solo se toca **una seccion por commit**. Nunca mezclar cambios de CSS + JS + HTML en un mismo commit si no corresponden a la misma tarea.
- Antes de empezar a trabajar: `git pull origin main` (o de tu rama base) para estar al día.
- Commits en espanol, descriptivos, sin emojis:
  ```
  feat: agregar subida de fotos al portafolio
  fix: corregir error de inicio de sesion
  ```
- Mensajes tipo:
  - `feat:` funcionalidad nueva
  - `fix:` correccion de error
  - `refactor:` reestructurar sin cambiar comportamiento
  - `style:` formato / espacios

## 8. COMO EVITAR CONFLICTOS AL UNIFICAR

1. **Repartirse las zonas del HTML/CSS/JS.** Como todo vive en 3 archivos, si dos personas tocan las mismas lineas habra conflicto. Ejemplo de reparto:
   - Compa A: seccion de reservas
   - Compa B: seccion del portafolio
   - Compa C: navbar y login
   - Compa D: backend/supabase
2. **Nunca reformatear un archivo entero** (no cambiar indentacion global "para que se vea bonito").
3. **Trabajar SIEMPRE en rama propia** y hacer commits pequenos y frecuentes.
4. **Integrar a main poco a poco**, no todos de golpe al final.
5. Si hay conflicto al mergear:
   - Abrir el archivo en conflicto (tiene marcadores `<<<<<<<`, `=======`, `>>>>>>>`).
   - Elegir que lineas quedan (las tuyas, las de ellos, o ambas).
   - Borrar los marcadores.
   - Guardar, `git add` y continuar el merge.

## 9. SUPABASE

- Cada tabla/cambio tiene su archivo SQL numerado en `supabase/migrations/`:
  - `0001_profiles.sql`
  - `0002_portfolio.sql`
  - Siguiente: `0003_reservas.sql`
- Los archivos SQL no se numeran de nuevo ni se reescriben los ya ejecutados.

## 10. VERIFICAR ANTES DE SUBIR

- JS: `node --check static/js/script.js`
- Python: `python3 manage.py check`
- Que el servidor arranque con `./run.sh`
- Revisar con `git diff` lo que se va a subir antes de commitear.
