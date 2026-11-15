# CLAUDE.md · RIFF (React + TypeScript)

App web mobile-first de eventos de música en vivo en Bogotá, idéntica al Figma
`80vaxDw05umaX0Ped7RyCk` › página "RIFF · Alta fidelidad" (2007:2).
Design system 2008:2 · Flujo consumidor 2012:72 · Flujo organizador 2023:35978.

## Reglas
- Si algo contradice al Figma, manda el Figma. No inventar textos, colores, íconos ni animaciones; lo que falte va a PENDIENTES.md.
- Stack: React 18 + TypeScript + Vite + CSS Modules con las variables de `src/design-kit/tokens.css`. Sin Tailwind ni librerías de UI.
- Pantallas solo con componentes de `src/design-kit/components` (cada uno con .tsx, .module.css e index.ts; props con los nombres de variantes de Figma).
- Frame 375 × 812; la app se centra con máximo 430 px. No se dibuja el status bar (se reserva con `--top-safe`).
- Cada estado de Figma se ve con `?estado=<clave>` (claves en `src/routes.tsx`) y también aparece por la lógica.
- Datos en `src/data`, acceso solo por `src/services`. Estado global en `src/state` (Context + localStorage).
- Al cerrar cada fase: `npm run build` limpio, comparar a 375 × 812, actualizar PROGRESO.md y PENDIENTES.md, commit "Fase N: …".

## Assets
Esta sesión no puede descargar de figma.com. Los íconos de `src/design-kit/icons/*.svg` son provisionales
(se usan como máscara, así que basta con reemplazarlos por los exportados de Figma con el mismo nombre).
Las portadas y el mapa base son renders 1x tomados del Figma. Ver ASSETS.md.
