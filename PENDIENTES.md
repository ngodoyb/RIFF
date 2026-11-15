# PENDIENTES

## Assets (bloqueado: sin acceso de red a figma.com)
- Exportar desde Figma los íconos `icon/*` como SVG y reemplazar `src/design-kit/icons/<nombre>.svg` (lista en ASSETS.md).
- Exportar logos `Logo/Spotify (verde)` 2060:40679, `Logo/Spotify (negro)` 2060:40685, `Logo/Apple Music` 2060:40691 → `src/design-kit/icons/spotify.svg` y `apple.svg`.
- Portadas (`src/assets/portadas/*.jpg`) y mapa (`src/assets/mapa/bogota-base.jpg`) son renders 1x: exportarlos a 2x/3x para pantallas retina.
- Brillos del fondo (`brillo morado/rosa/coral`): se recrean con CSS (color + desenfoque) aproximando el SVG de Figma.

## Datos no definidos en Figma
- URL exacta de venta de cada evento: Figma solo muestra el dominio (tuboleta.com, ticketmaster.co). Se usa la raíz del dominio. [POR DEFINIR]

## Onboarding
- 02 · Iniciar sesión: el brief pide un código de 6 dígitos, pero Figma no tiene pantalla de código. Se entra directo al tocar "Iniciar sesión". [POR DEFINIR]
- Mensaje de celular válido: Figma solo define "¡Listo! Correo válido."; para celular se usa "¡Listo! Celular válido." [POR DEFINIR]
- Errores de Nombre/Apellido: Figma no define mensaje; el campo solo se marca válido con 2+ letras.
- Fotos de artistas de Apple Music (src/assets/artistas): recortes 1x del Figma; exportar a 2x.

## Feed y búsqueda
- El prompt pide filtros de fecha y precio, pero 05 · Búsqueda y filtros (2015:1442) solo tiene género, formato de acto y tipo de venue. No se agregaron. El presupuesto del perfil marca dentro/fuera en el detalle. [POR DEFINIR]
- "Más cercanos ▾" (06 · Resultados): Figma no muestra las otras opciones de orden; se ordena por distancia y el control no despliega nada. [POR DEFINIR]
- Eventos del cluster "Zona T" (House en la azotea, DJ set: Pulso Andino, Minimal en el parque, Techno al amanecer), Kaleido, Mar de Cumbia en vivo y Jazz en la terraza:
  Figma solo da nombre, zona, pin y a veces precio/fecha. Fecha, dirección, descripción y URL son datos de prueba (`prueba: true`, "[POR DEFINIR]").

## Evento y calendario
- Hoja de compartir: los íconos de Mensajes/WhatsApp/Correo/Instagram son genéricos (exportar los de Figma). Instagram no permite compartir por URL: abre instagram.com.
- "Copiar enlace" muestra el toast "Enlace copiado" (texto no definido en Figma). [POR DEFINIR]
- URL pública de un evento: se usa riff.app/e/<id> como en Figma (riff.app/e/omar-courtz-segunda-fecha); el slug real está [POR DEFINIR].
- 09 · Calendario — sin eventos marca el 10 como hoy y la versión con eventos el 12; se usa el 12 (lun 12 oct 2026) como "hoy" de la demo.

## Mapa
- 10 · Mapa — sin permiso de ubicación: la tarjeta "Activa tu ubicación" se sale del frame en Figma; se dejó dentro de los márgenes de 16 px.
- Títulos de la hoja: Figma usa cifras fijas ("12 eventos cerca de ti", "38 eventos en toda Bogotá"); la app muestra el conteo real de eventos.
- Chips de la hoja completa: Figma muestra "Hoy", "Esta semana", "Género" y uno cortado ("Pre…"). Se implementó "Precio" (dentro del presupuesto). [POR DEFINIR]
- Kaleido, Mar de Cumbia y Jazz en la terraza no tienen pin en Figma: se ubicaron al oriente de Chapinero, fuera de la vista inicial.
- Las transiciones de mover/acercar el mapa (300 ms) y de la hoja (280 ms) no se pudieron leer del prototipo de Figma; revisar contra el Smart animate.
