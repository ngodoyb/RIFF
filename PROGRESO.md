# PROGRESO

## Fase 0 · Base (hecha)
- Vite + React 18 + TypeScript + react-router 6; fuentes Unbounded, Lunasima y Anton servidas localmente (@fontsource).
- `src/design-kit/tokens.css` con las variables de Figma y los valores derivados de componentes.
- Marco de app de máx. 430 px; `--top-safe` reserva el status bar.
- `src/routes.tsx` con todas las pantallas y estados (node-id de Figma); `/dev/pantallas` (solo en desarrollo).
- Estado global (`src/state/AppState.tsx`) con localStorage; toasts globales (`src/state/ToastContext.tsx`).
- Datos (`src/data`) y servicios (`src/services/eventsService.ts`).

## Fase 1 · Design kit (hecha)
Componentes en `src/design-kit/components`, todos en `/design-kit`:
Button (6 tipos) · Input (Normal/Foco/Error/Válido) · Chip (Default/Seleccionado/Removible) · Badge (8 tipos) ·
Portada · Event card (Guardado No/Sí) · Event row · Search bar · Nav bar · Tab bar (4 activas) · Toast (3 tipos) ·
Map pin (género × estado) · Map cluster · Ubicación del usuario · Map controls · Bottom sheet (3 alturas, arrastrable y con teclado) ·
Segmented control · Notification card (6 tipos) · Skeleton · Metric tile · Progress steps · Range slider COP ·
Selector de presupuesto (5 rangos) · Botones Spotify / Apple Music · Logo · Screen (fondo con brillos) · Dialog.

Diferencias que quedan: íconos, logos de Spotify/Apple Music y brillos del fondo son aproximaciones hasta tener los assets exportados (ver ASSETS.md).

## Fase 2 · Onboarding consumidor (hecha)
Pantallas: Splash (2012:92, estado entrada 2012:74) · 00 Selecciona tu perfil (2012:118) · 01 Crear cuenta (2012:163 / válido 2012:218) ·
02 Iniciar sesión (2012:280) · 03 Vincular gustos (2013:200) · Spotify autorización (2061:40701) · Apple Music permiso (2061:40845) ·
Importando (2061:40786 / 2061:40908) · Vinculado (2013:256 / 2061:41061) · Manual (2013:331) · Tu presupuesto (2102:125).
Lógica: validación en vivo (correo o celular de 10 dígitos), botón deshabilitado hasta que todo es válido, aviso "¡Cuenta creada!" al venir del registro,
vinculación simulada en `src/services/musicLinkService.ts` (con TODO de integración real), géneros editables, "Omitir" siempre visible.
Diferencias: en "vincula tu música" el salto de línea depende del ancho real de Unbounded; los avatares de Spotify usan un degradado genérico.
