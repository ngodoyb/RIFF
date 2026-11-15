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
