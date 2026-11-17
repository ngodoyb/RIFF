## Qué es este proyecto
RIFF: centraliza y recomienda eventos de música en vivo en Bogotá, según los gustos y el presupuesto de cada persona, para amantes de la música en vivo y buscadores de plan. También permite que organizadores, venues y artistas publiquen sus eventos. Es el MVP de un equipo del curso Lenguajes Digitales 3. Más contexto en README.md.

## Documentos que debes leer antes de construir
- spec.md: qué se construye (flujo, datos y pantallas). Si no existe o algo no está ahí, pregunta antes de inventar.
- css/tokens.css y css/components.css: el design kit. componentes.html muestra todos los componentes.
- pantallas.md: el mapa de avance. Actualízalo al terminar cada pantalla.

## Tecnología (no cambiar sin preguntar)
- HTML, CSS y JavaScript puro. Sin frameworks ni librerías (nada de React, Vue, Tailwind ni TypeScript) y sin paso de compilación: todo debe funcionar abriendo los archivos en el navegador.
- La app se publica en Vercel, conectada a este repositorio.
- Más adelante, la base de datos será Supabase. Por ahora, los datos son simulados.

## Estructura del proyecto
- disenos/: diseños originales. Solo de referencia: nunca los modifiques.
- assets/: todas las imágenes, logos e íconos de la app. Usa siempre las de aquí, nunca links de imágenes de internet.
- css/: estilos. tokens.css (decisiones base), components.css (componentes) y styles.css (estilos generales de las pantallas). prototipo.css es temporal: el estilo del prototipo mientras las pantallas pasan al kit; se borra cuando ninguna pantalla lo use.
- js/: código. app.js (comportamiento) y data.js (datos simulados, separados del diseño).
- index.html: la pantalla de inicio, la puerta de entrada de la app. Las demás pantallas van en la carpeta pages/.
- docs/: documentos del proceso (brief, brief UX, pitch). No son parte de la app.
- Nombres de archivos y carpetas: minúsculas, sin tildes, ñ ni espacios, con guiones.

## Reglas de trabajo
1. Antes de crear o modificar archivos, explica tu plan en pocas líneas y espera aprobación.
2. Trabaja una pantalla o una función a la vez.
3. Usa solo los tokens y componentes del design kit. Si necesitas un estilo o componente que no existe, pregunta: primero se agrega al kit y a componentes.html, y después se usa.
4. Nunca escribas claves, contraseñas ni tokens de acceso en el código: este repositorio es público.
5. Si algo que te pedimos contradice spec.md, avísanos antes de hacerlo.
6. Al terminar cada tarea, explica en lenguaje simple qué cambiaste y por qué. Somos un equipo aprendiendo.
7. Antes de cada comando de git, explica en una frase qué hace.
8. Los títulos de RIFF van siempre en minúscula (por ejemplo «tu feed», «mi perfil»): es parte de la marca.

## Componentes disponibles
Todos están en css/components.css y se ven en componentes.html. Los íconos son de Lucide, como `<svg class="icono"><use href="#i-nombre"/></svg>` con el sprite en la misma página.

- `.boton` (+ `--secundario`, `--fantasma`, `--peligro`, `--circulo`, `--pequeno`, `disabled`): `<button class="boton">Ir a mi feed</button>`
- `.enlace`: `<a class="enlace" href="iniciar-sesion.html">Inicia sesión</a>`
- `.campo` (+ `--error`): `<label class="campo"><span class="campo__etiqueta">Nombre</span><input class="campo__entrada"><span class="campo__ayuda">…</span></label>`
- `.busqueda`: `<label class="busqueda"><svg class="icono">…</svg>Buscar eventos, artistas, venues</label>`
- `.chip` (+ `--seleccionado`, `--removible`): `<button class="chip chip--seleccionado" aria-pressed="true">Electrónica</button>`
- `.etiqueta` (+ `--genero`, `--edad`, `--publicado`, `--revision`, `--rechazado`, `--dentro`, `--fuera`): `<span class="etiqueta etiqueta--genero">Urbano</span>`
- `.tarjeta` (+ `--destacada`, `--alerta`): `<div class="tarjeta">…</div>`
- `.tarjeta-evento`: `<a class="tarjeta-evento" href="…"><div class="tarjeta-evento__portada" style="background-image:url(…)"></div><div class="tarjeta-evento__info"><h3 class="tarjeta-evento__titulo">…</h3><p class="tarjeta-evento__meta">…</p></div></a>`
- `.fila-evento`: `<a class="fila-evento" href="…"><span class="fila-evento__miniatura"></span><span class="fila-evento__texto"><p class="fila-evento__titulo">…</p><p class="fila-evento__linea">…</p></span></a>`
- `.precio`: `<span class="precio">desde $88.800</span>`
- `.encabezado`: `<header class="encabezado"><button class="boton boton--circulo encabezado__izquierda">…</button><h1 class="encabezado__titulo">notificaciones</h1></header>`
- `.navegacion`: `<nav class="navegacion"><a class="navegacion__item navegacion__item--activo" href="…">Feed</a>…</nav>`
- `.segmentado`: `<div class="segmentado"><button class="segmentado__opcion segmentado__opcion--activa">Venue</button>…</div>`
- `.metrica`: `<div class="metrica"><p class="metrica__valor">128</p><p class="metrica__nombre">Vistas</p></div>`
- `.aviso`: `<div class="aviso">Guardado en tu calendario <a class="enlace">Deshacer</a></div>`
- `.dialogo`: `<div class="dialogo"><div class="dialogo__cuerpo"><p class="dialogo__titulo">…</p><p class="dialogo__texto">…</p></div><div class="dialogo__acciones"><button>Cancelar</button><button class="dialogo__accion--principal">Aceptar</button></div></div>`
- `.progreso`: `<div class="progreso"><div class="progreso__barra" style="width:60%"></div></div>`
- `.esqueleto`: `<div class="esqueleto" style="height:14px"></div>`
- `.caja-icono` (+ `--primario`, `--secundario`): `<span class="caja-icono"><svg class="icono">…</svg></span>`
- Títulos: `.titulo-1` (32), `.titulo-2` (24), `.titulo-3` (20), `.titulo-4` (17); texto: `.texto-suave`, `.texto-pequeno`, `.cifra`.
