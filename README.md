# RIFF

**Riff: todo en un mismo lugar.**

RIFF es una app que centraliza y recomienda eventos musicales en vivo en una ciudad (piloto: Bogotá), de cualquier género, formato de acto y tipo de venue — desde una sinfónica en el parque hasta un DJ en una discoteca o una banda emergente en un bar. El usuario filtra por gustos y presupuesto (declarados manualmente o traídos al vincular Spotify / Apple Music) y descubre planes que hoy están dispersos entre redes sociales y páginas de venues.

## Equipo

| Integrante | Rol |
|---|---|
| Natali Godoy | Liderazgo, dirección de arte |
| Kevin Torres | Front end, agregación de datos |
| Sofia Lizarazo | UX/UI, identidad de marca |

## Links

- App publicada: pendiente de confirmar la dirección de Vercel
- Repositorio: [github.com/ngodoyb/RIFF](https://github.com/ngodoyb/RIFF)
- Prototipo navegable (HTML): abre [`disenos/prototipo.html`](disenos/prototipo.html) con doble clic en tu computador

## Documentos

| Documento | Descripción |
|---|---|
| [Brief](docs/brief.md) | Problema, evidencia, público objetivo, objetivos y alcance del MVP |
| [Brief UX](docs/brief-ux.md) | Contexto, usuarios, objetivo de experiencia, vinculación con Spotify / Apple Music y flujos clave |
| [Pitch](docs/pitch.md) | Guion del pitch en versiones de 4 y 5 minutos |
| [Originales (.docx)](docs/originales/) | Archivos Word originales del brief y el pitch |

## Figma

| Recurso | Enlace |
|---|---|
| User Flow (FigJam) | [RIFF — User Flow](https://www.figma.com/board/7KgBZGQGZQ2nxkP0Jn70Z4/RIFF---User-Flow?node-id=0-1&t=bPOfAQFzcV003AlD-1) |
| Wireframes (diseño) | [RIFF — Wireframes según flujogramas](https://www.figma.com/design/P28vpGKtt6KK4ylnrFQRAl/RIFF---Wireframes--seg%C3%BAn-flujogramas-?node-id=0-1&t=qThFBBWYW42Fvepb-1) |
| Prototipo navegable | [RIFF — Prototipo](https://www.figma.com/proto/80vaxDw05umaX0Ped7RyCk/RIFF---Wireframes--seg%C3%BAn-flujogramas---copia-?node-id=2012-118&starting-point-node-id=2012%3A74&t=ysXcHx3U3ge7Ug0q-1) |
| Presentación | [RIFF — Deck](https://www.figma.com/deck/w50kOxLRInCyYNwwzMUU7j/RIFF?node-id=1-42&t=mpGMw3QFADPTHeMY-1) |

## Alcance del MVP

- Una sola ciudad (Bogotá), para tener densidad real de datos.
- Recomendación básica por preferencias de género, declaradas o vinculadas vía Spotify / Apple Music.
- Feed de eventos con filtros: género, categoría de evento/venue, fecha y precio.
- Formulario simple para que organizadores, bandas y venues publiquen su evento.
- Redirección a la página oficial de venta (venue, organizador o plataforma de ticketing).

## Cómo está organizado este repo

- `index.html`: la puerta de entrada de la app (la primera pantalla).
- `pages/`: una página por cada pantalla de la app.
- `css/`: el design kit (`tokens.css`, `components.css`) y `prototipo.css`, el estilo temporal del prototipo.
- `js/`: el comportamiento de la app (`app.js`).
- `assets/`: todas las imágenes de la app: portadas, fotos y el mapa.
- `disenos/`: el prototipo original en HTML, solo de referencia.
- `componentes.html`: catálogo para ver todos los componentes del design kit.
- `spec.md`: el plano de la app: flujo, datos y pantallas.
- `pantallas.md`: el mapa de avance, pantalla por pantalla.
- `decisiones-design-kit.md`: por qué el kit es como es.
- `CLAUDE.md`: las reglas de trabajo para Claude.
- `docs/`: brief, brief UX y pitch del proceso.
