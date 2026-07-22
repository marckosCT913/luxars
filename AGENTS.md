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

## Despliegue
- Los cambios en `main` se despliegan automáticamente a GitHub Pages vía GitHub Actions.
- No modifiques el workflow `.github/workflows/deploy.yml` sin autorización.
