# Ajedrez Tsundere 💢

Ajedrez en el navegador contra **120 chicas tsundere** con elo de 100 a 3000.

- Piezas con el símbolo de enojo 💢.
- Jaque mate con el clásico "バカ！" (baka) y un acorde descendente. Los jaques llevan un "ふんっ！".
- El progreso se guarda en el navegador (`localStorage`): partida en curso, bot elegido, color, sonido y récord (G/P/T) contra cada chica. Las vencidas se marcan con ✓.
- Se adapta a cualquier resolución: móvil vertical y horizontal, tablet y escritorio.
- Sin dependencias ni compilación: `index.html`, `style.css` y `script.js`.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo y sube todos los archivos de esta carpeta, incluido `.nojekyll`.
2. En **Settings → Pages**, elige **Deploy from a branch**, la rama `main` y la carpeta `/ (root)`.
3. Tu juego quedará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

También puedes abrir `index.html` directamente en el navegador.

## Notas

- El elo de cada bot es aproximado: controla la profundidad de cálculo y la cantidad de errores intencionales.
- La voz usa `speechSynthesis` del navegador. Sin voz japonesa instalada solo se oyen los tonos.
- Los datos guardados dependen del navegador y del dominio. Si cambias de dispositivo, empiezas de cero.
