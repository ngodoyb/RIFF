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

## Fase 3 · Feed y búsqueda (hecha)
Pantallas: 04 Feed (2014:299) con estados cargando (2014:612), sin conexión (2014:688, usa navigator.onLine y eventos online/offline) y tutorial 1–3
(2014:759/813/863, solo la primera vez) · 05 Búsqueda y filtros (2015:1442) y modo escribir (2170:3564, resultados mientras se teclea) ·
06 Resultados (2015:1542) con vacío (2015:1736, sugerencias "Prueba con" calculadas) y cargando (2015:1820).
Lógica: secciones recomendado (gustos + pesos de guardados + presupuesto + cercanía), cerca de ti (distancia) y esta semana (fecha demo);
filtros reales por género, formato y venue (OR dentro de cada grupo, AND entre grupos), búsqueda sin tildes en evento, artista y venue,
chips removibles, búsquedas recientes, guardar desde card/fila con toast y "Deshacer".

## Fase 4 · Evento, guardados y calendario (hecha)
Pantallas: 07 Detalle (2018:1764 y las 5 variantes por evento 2084:*) · compartir (2018:1866) · aviso de salida (2018:2025) ·
08 Guardado y recordatorio (2018:2140) · editar recordatorio (2018:2212) · 09 Calendario (2019:1920) · vacío (2019:2115).
Lógica: badge dentro/fuera del presupuesto con "Tu rango", "Precio aún no publicado" si no hay precio; Ver en Google Maps;
compartir con navigator.share o la hoja de Figma (Mensajes, WhatsApp, Correo, Instagram, Copiar enlace, Añadir a Calendario (.ics), Guardar en RIFF);
aviso "¿Salir de RIFF?" que abre la URL de venta en otra pestaña; guardar desde el detalle lleva a 08 con toast "Deshacer";
recordatorio editable (1 h, 3 h, 1 día, 2 días, sin recordatorio) con la fecha calculada; calendario navegable por meses con días guardados y hoy.
Nuevos componentes del kit: ActionSheet y Alert.

## Fase 5 · Mapa (hecha)
Componente `MapView` (src/design-kit/components/MapView): mapa base exportado del Figma (2011:72), sin librería de mapas; pines por género con
las posiciones de Figma, cluster "Zona T" que se separa al acercar (escala 1.6 como en 2021:19070), ubicación del usuario y arrastre con el dedo.
Pantalla 10 · Mapa con: hoja mínima/media/completa arrastrable y con teclado (2020:1989 / 2020:6244 / 2020:14868), pin seleccionado con mini-card
(2020:10552), zoom en cluster (2021:19070), sin permiso de ubicación (2021:23280, Permissions API + navigator.geolocation), zona sin eventos
(2021:27512, se detecta al mover el mapa) y cómo llegar (2021:31674, abre Apple Maps o Google Maps con la dirección). "Ver en mapa" del detalle
abre el mapa con ese pin seleccionado.
