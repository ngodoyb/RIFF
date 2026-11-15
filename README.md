# riff · web app

Eventos de música en vivo en Bogotá, según tus gustos y tu presupuesto. *Cero fomo, siempre al tanto.*

Construida para quedar idéntica al Figma **80vaxDw05umaX0Ped7RyCk › "RIFF · Alta fidelidad" (2007:2)**:
design system 2008:2, flujo consumidor 2012:72 y flujo organizador 2023:35978. Funciona sin backend (datos simulados
y `localStorage`).

## Cómo correrla

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # TypeScript estricto + build de producción en dist/
npm run preview    # sirve dist/
```

Requiere Node 18 o superior. Rutas útiles en desarrollo:

- `/dev/pantallas`: índice de todas las pantallas y estados, con su node-id de Figma (no existe en producción).
- `/design-kit`: catálogo de todos los componentes y sus variantes.
- Cualquier estado de Figma se fuerza con `?estado=<clave>`, por ejemplo `/feed?estado=sin-conexion` o
  `/mapa?estado=pin`. Las claves están en `src/routes.tsx`.
- **Perfil › Ayuda › Reiniciar demo** borra todo el `localStorage` de la app.

## Estructura

```
src/
├─ main.tsx, App.tsx        arranque y router (react-router)
├─ routes.tsx               rutas ↔ node-id de Figma ↔ estados (?estado=)
├─ design-kit/
│  ├─ tokens.css            colores, tipografías, radios, espacios, sombras (variables CSS)
│  ├─ global.css            reset, fuentes y marco de la app (máx. 430 px)
│  ├─ icons/*.svg           íconos (se pintan con currentColor)
│  └─ components/           un componente por carpeta: .tsx + .module.css + index.ts
├─ screens/
│  ├─ consumer/             onboarding, feed, evento, mapa, perfil
│  ├─ organizer/            registro, verificación, panel, formulario, métricas
│  └─ dev/                  /dev/pantallas y /design-kit
├─ state/                   AppState (Context + localStorage), toasts, hooks
├─ data/                    datos simulados (eventos, géneros, notificaciones, organizador, mapa)
├─ services/                ÚNICO acceso a datos (eventos, música, recordatorios, mapas, organizador…)
├─ lib/                     formatos de fecha/precio (es-CO), validaciones, utilidades
└─ assets/                  portadas, mapa base, fotos
```

Cada pantalla empieza con un comentario con su node-id de Figma. Los componentes usan los nombres de variantes de Figma
como props (`tipo`, `estado`, `guardado`, `activa`, `altura`, `seleccionado`…).

## Cómo cambiar…

- **Colores, tipografías, radios o espacios:** edita `src/design-kit/tokens.css`. Las pantallas no tienen colores
  sueltos; todo sale de esas variables. Las únicas excepciones son las pantallas que imitan al sistema o a terceros
  (autorización de Spotify, permiso de Apple Music, hoja de compartir).
- **Logo:** `src/design-kit/components/Logo/Logo.tsx` (hoy es el texto "riff" con el gradiente de marca, como el
  placeholder de Figma 2008:103). Si el logo final es un SVG, reemplaza el `<span>` por un `<img>` en ese archivo y se
  actualiza en toda la app.
- **Íconos:** reemplaza `src/design-kit/icons/<nombre>.svg` por el exportado de Figma con el mismo nombre
  (ver `ASSETS.md`). Se usan como máscara, así que el color lo pone el CSS.
- **Textos:** están en cada pantalla (`src/screens/**`) tal cual en Figma, en minúsculas donde Figma las usa.
  Los mensajes de validación están en `src/lib/validation.ts`.
- **Datos:** eventos en `src/data/events.ts` (los de Figma y otros marcados `prueba: true`), géneros y filtros en
  `src/data/genres.ts`, notificaciones en `src/data/notifications.ts`, organizador de ejemplo en `src/data/organizer.ts`,
  fecha "hoy" de la demo en `src/data/demo.ts`.
- **Posición de un pin:** `mapa: { x, y }` del evento, en píxeles sobre el mapa base de 600 × 1000.

## Cómo conectar un backend

Las pantallas nunca leen `src/data` directamente: todo pasa por `src/services/*.ts`. Para usar una API, cambia el cuerpo
de esas funciones y conserva sus firmas (puedes volverlas `async` y esperar el resultado en la pantalla):

| Servicio | Qué hace hoy | Con API |
|---|---|---|
| `eventsService.ts` | lee `data/events.ts` + eventos publicados en `localStorage`; búsqueda, filtros y recomendación | `GET /events`, `GET /events/:id`, `GET /events?q=&genre=` |
| `musicLinkService.ts` | simula Spotify / Apple Music | OAuth PKCE de Spotify (`user-top-read`) y MusicKit JS (hay `TODO` en el archivo) |
| `reminderService.ts` | calcula la fecha del recordatorio | programar push/correo en el servidor |
| `notificationsService.ts` | notificaciones de `data/notifications.ts` | `GET /notifications` |
| `organizerService.ts` | convierte el borrador en evento y lo guarda en `localStorage` | `POST /events`, `POST /verifications`, `GET /events/:id/metrics` |
| `mapsService.ts` | arma enlaces de Google Maps y Apple Maps | sin cambios (o geocodificar direcciones) |
| `calendarService.ts` | genera el `.ics` para "Añadir a Calendario" | sin cambios |

La sesión, los gustos, el presupuesto, los guardados, el tutorial y el borrador del organizador están en
`src/state/AppState.tsx` (`localStorage` con la clave `riff:state`).

## Estado del proyecto

- `PROGRESO.md`: qué se hizo en cada fase y qué diferencias con Figma quedan.
- `PENDIENTES.md`: lo que Figma no define ([POR DEFINIR]) y decisiones tomadas.
- `ASSETS.md`: íconos e imágenes que hay que exportar de Figma para reemplazar los provisionales.
