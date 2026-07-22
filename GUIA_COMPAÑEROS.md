# Guía para colaborar en LuxArs

## 1. Requisitos

- Tener Git instalado
- Tener Node.js instalado (para opencode)
- Crear una cuenta en GitHub

## 2. Clonar el proyecto

Abre una terminal y ejecuta:

```bash
git clone https://github.com/marckosCT913/luxars.git
cd luxars
```

## 3. Hacer cambios con OpenCode

Siempre trabajen en una rama separada para no dañar la página principal:

```bash
git checkout -b feature/nombre-del-cambio
opencode
```

OpenCode leerá las reglas del proyecto y los guiará. Al terminar, la IA hará commit y push automático a su rama.

Si no usan opencode, pueden editar manualmente y luego:

```bash
git add -A
git commit -m "Descripción del cambio"
git push origin feature/nombre-del-cambio
```

## 4. Publicar los cambios en la página web

Cuando estén seguros de que funciona:

1. Van a **https://github.com/marckosCT913/luxars**
2. Verán un banner amarillo: *"feature/nombre-del-cambio had recent pushes"*
3. Hacen clic en **"Compare & pull request"**
4. Escriben un título y descripción
5. Clic en **"Create pull request"**
6. El dueño del repo revisa y da clic en **"Merge pull request"** → **"Confirm merge"**

Automáticamente los cambios se publican en:
**https://marckosct913.github.io/luxars/** (esperar ~1-2 minutos)

## 5. Importante

- **No trabajen directamente en `main`** — siempre usen ramas `feature/...`
- Si algo sale mal, el error queda en su rama, la página principal sigue funcionando
- Pueden usar Ctrl+Shift+R (hard refresh) en el navegador para ver los cambios actualizados

## Dudas

Pregunten al dueño del repo por cualquier problema.
