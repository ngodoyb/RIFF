# spec.md · RIFF

> **Borrador.** Armado con el brief, el brief UX y las 72 pantallas de `disenos/prototipo.html`. Todo lo marcado **[POR DECIDIR]** lo tiene que decidir el equipo antes de construir esa pantalla. Las variantes de una misma pantalla (cargando, vacía, error, con un diálogo encima) van como «Estados» dentro de su pantalla.
>
> Qué funciona de verdad: **Real** = funciona y se guarda · **Simulado** = se ve y se puede tocar, con datos de mentira (`js/data.js`) · **Después** = no entra en el MVP.
> Todavía no tenemos la lista de integraciones de backend de la clase de intro a backend, así que por ahora nada está marcado como Real. **[POR DECIDIR]**: cuáles pasan a Real con Supabase (propuesta: cuentas, eventos, guardados y eventos publicados por organizadores).

## Flujo

**Público (quien busca planes)**

splash → selecciona tu perfil → crear cuenta → iniciar sesión → vincular gustos (Spotify · Apple Music · manual) → tu presupuesto → feed (con tutorial la primera vez) → búsqueda y filtros → resultados → detalle del evento → guardado y recordatorio → calendario / mis guardados.
Desde la barra inferior, en cualquier momento: feed · mapa · calendario · perfil. Desde el feed: notificaciones.
Salida: «Comprar en página oficial» abre la página de venta fuera de RIFF.

**Organizador, venue o artista**

selecciona tu perfil → crear cuenta de organizador → verificación de documentos → perfil público → panel → publicar evento (4 pasos) → evento en revisión → evento publicado → métricas.
Desde el panel: notificaciones del organizador. Si ya tiene cuenta: iniciar sesión → panel.

## Datos

- **usuarios**: nombre, apellido, correo o celular, géneros favoritos, presupuesto mínimo y máximo, cuenta de música vinculada (spotify · apple music · ninguna), artistas más escuchados.
- **eventos**: título, imagen de portada, géneros, formato de acto (DJ set · en vivo · acústico · festival), tipo de venue (club · bar · teatro · al aire libre · estadio · arena), clasificación de edad, fecha y hora (o rango de fechas), venue, dirección, distancia, coordenadas en el mapa, precio desde, precio hasta (o «precios en la página oficial»), descripción, nombre y link de la página de venta, organizador, estado (en revisión · publicado · rechazado), motivo de rechazo.
- **guardados**: usuario, evento, recordatorio (1 h · 3 h · 1 día · 2 días antes · sin recordatorio).
- **notificaciones**: usuario, tipo (según tus gustos · sorpréndeme · recordatorio · evento aprobado · hito alcanzado · actualiza tu evento), título, texto, fecha, evento relacionado.
- **organizadores**: nombre, tipo de cuenta (venue · artista · organizador), correo o celular, descripción, ubicación, fotos, redes sociales, estado de verificación, documentos (permiso de funcionamiento, cámara de comercio, RUT), motivo de rechazo.
- **métricas por evento**: vistas, guardados y clics a venta por día.
- **búsquedas recientes**: usuario, texto buscado.

## Pantallas · flujo público

### Splash
- Archivo de diseño: `disenos/prototipo.html` (splash · entrada y splash).
- Objetivo: Esta pantalla existe para que la persona reconozca la marca mientras abre la app. Sabemos que funciona si pasa sola a «selecciona tu perfil» en menos de 3 segundos.
- Está lista cuando: muestra el logo «riff» y «todo en un mismo lugar.»; avanza sola; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Selecciona tu perfil
- Archivo de diseño: `disenos/prototipo.html` (00).
- Objetivo: Esta pantalla existe para que cada persona elija si viene a descubrir eventos o a publicarlos. Sabemos que funciona si cada opción lleva a su flujo.
- Contenido: logo, título «¿cómo quieres usar riff?», tarjeta «Quiero descubrir eventos», tarjeta «Soy organizador, venue o artista», aviso de términos.
- Qué funciona de verdad: las dos tarjetas → Simulado (navegan). Enlace a términos → Después.
- Está lista cuando: cada tarjeta lleva a su flujo; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Crear cuenta
- Archivo de diseño: `disenos/prototipo.html` (01 y 01 · campos válidos).
- Objetivo: Esta pantalla existe para que la persona cree su cuenta con nombre y correo o celular. Sabemos que funciona si un correo sin dominio muestra el error y uno válido habilita el botón.
- Contenido: título, nombre, apellido, correo o celular con validación, botón «Crear cuenta», enlace «Inicia sesión».
- Estados: correo con error · todos los campos válidos.
- Qué funciona de verdad: validación del correo o celular → Simulado (en el navegador). Crear la cuenta → Simulado. **[POR DECIDIR]** si pasa a Real con Supabase.
- Está lista cuando: el botón está deshabilitado hasta que los campos sean válidos; el mensaje de error dice qué corregir; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Iniciar sesión
- Archivo de diseño: `disenos/prototipo.html` (02).
- Objetivo: Esta pantalla existe para que la persona entre sin contraseña, con un código de 6 dígitos. Sabemos que funciona si entra y sigue a vincular gustos.
- Contenido: aviso «¡Cuenta creada!», título, campo de correo o celular, botón «Iniciar sesión», enlace «Créala aquí».
- Qué funciona de verdad: iniciar sesión → Simulado. Envío del código de 6 dígitos → **[POR DECIDIR]** (el diseño no tiene la pantalla para escribir el código).
- Está lista cuando: el botón lleva a vincular gustos; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Vincular gustos
- Archivo de diseño: `disenos/prototipo.html` (03 · vincular gustos, Spotify · autorización, Spotify · importando, vinculado con Spotify, Apple Music · permiso, Apple Music · importando, vinculado con Apple Music, manual).
- Objetivo: Esta pantalla existe para que la persona le diga a RIFF qué música le gusta con el menor esfuerzo. Sabemos que funciona si termina con al menos un género elegido, por cualquiera de los tres caminos.
- Contenido: título «vincula tu música», botones de Spotify y Apple Music, opción manual, «Omitir»; después, artistas más escuchados y géneros detectados que se pueden quitar.
- Estados: autorización de Spotify · permiso de Apple Music · importando · vinculado · manual.
- Qué funciona de verdad: autorización de Spotify y Apple Music → Simulado (pantallas de mentira, no se conecta). Elegir y quitar géneros → Simulado. Conexión real con Spotify / Apple Music → **[POR DECIDIR]** (probablemente Después).
- Está lista cuando: los tres caminos llegan a «tu presupuesto»; los chips de género se marcan y desmarcan; «Omitir» lleva al feed; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Tu presupuesto
- Archivo de diseño: `disenos/prototipo.html` (03 · tu presupuesto).
- Objetivo: Esta pantalla existe para que la persona diga cuánto quiere gastar por evento. Sabemos que funciona si después el detalle de cada evento dice si está dentro o fuera de su rango.
- Contenido: título, rango con dos perillas, atajos (gratis, hasta 50 mil, 50–150 mil, 150–300 mil, sin límite), botón «Ir a mi feed», «Omitir por ahora».
- Qué funciona de verdad: elegir un atajo → Simulado. Mover las perillas → **[POR DECIDIR]**.
- Está lista cuando: el atajo elegido se marca; el botón lleva al feed; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Feed
- Archivo de diseño: `disenos/prototipo.html` (04 · feed principal, cargando, sin conexión, tutorial 1/3 a 3/3). Es `index.html` una vez la persona entró. **[POR DECIDIR]**: hoy `index.html` es el splash.
- Objetivo: Esta pantalla existe para que la persona descubra eventos que encajan con sus gustos. Sabemos que funciona si llega al detalle de un evento en uno o dos toques.
- Contenido: saludo, búsqueda, botón de filtros, campana de notificaciones, carruseles «recomendado para ti», «cerca de ti» y «esta semana», barra inferior.
- Estados: cargando · sin conexión · tutorial de 3 pasos (solo la primera vez).
- Qué funciona de verdad: carruseles → Simulado (eventos de `js/data.js`). Guardar desde la tarjeta → Simulado. Recomendación por gustos → **[POR DECIDIR]**.
- Está lista cuando: cada tarjeta lleva a su detalle; el marcador guarda sin entrar al detalle; los carruseles se desplazan de lado; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Búsqueda y filtros
- Archivo de diseño: `disenos/prototipo.html` (05 · búsqueda y filtros, 05 · búsqueda · escribir).
- Objetivo: Esta pantalla existe para que la persona encuentre eventos por texto o por género, formato de acto y tipo de venue. Sabemos que funciona si «Aplicar filtros» muestra solo los eventos que cumplen.
- Contenido: campo de búsqueda, búsquedas recientes, chips de género, formato de acto y tipo de venue, «Limpiar», «Aplicar filtros (n)».
- Qué funciona de verdad: buscar por texto y filtrar → Simulado (sobre `js/data.js`). Búsquedas recientes → Simulado.
- Está lista cuando: el número del botón cuenta los filtros marcados; «Limpiar» desmarca todo; al escribir aparece la lista de eventos; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Resultados
- Archivo de diseño: `disenos/prototipo.html` (06 · resultados, sin resultados, cargando).
- Objetivo: Esta pantalla existe para que la persona compare los eventos que cumplen su búsqueda. Sabemos que funciona si puede quitar un filtro y ver la lista actualizada.
- Contenido: búsqueda, filtros activos que se pueden quitar, cantidad de eventos, orden «Más cercanos», lista de eventos.
- Estados: cargando · sin resultados (con sugerencias y «Quitar todos los filtros»).
- Qué funciona de verdad: quitar filtros → Simulado. Orden → **[POR DECIDIR]** (el diseño solo muestra «Más cercanos»).
- Está lista cuando: cada fila lleva a su detalle; el estado vacío aparece cuando no hay eventos; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Detalle del evento
- Archivo de diseño: `disenos/prototipo.html` (07 · detalle para los 6 eventos, compartir, aviso de salida).
- Objetivo: Esta pantalla existe para que la persona decida si va al evento y llegue a la página oficial de venta. Sabemos que funciona si toca «Comprar en página oficial» y ve el aviso antes de salir.
- Contenido: portada, título, etiquetas (género, venue, edad), fecha, lugar con «Ver en Google Maps», precio, dentro o fuera del presupuesto, descripción, Guardar, Compartir, Ver en mapa, «Comprar en página oficial →».
- Estados: hoja de compartir · aviso «¿Salir de RIFF?».
- Qué funciona de verdad: datos del evento → Simulado. Abrir la página oficial y Google Maps → Real (son links). Compartir → **[POR DECIDIR]** (puede usar el menú de compartir del celular). Guardar → Simulado.
- Está lista cuando: una sola página sirve para todos los eventos (lee cuál de la dirección); el aviso aparece antes de salir; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Guardado y recordatorio
- Archivo de diseño: `disenos/prototipo.html` (08 · guardado, editar recordatorio).
- Objetivo: Esta pantalla existe para confirmar que el evento quedó guardado y elegir cuándo recordarlo. Sabemos que funciona si el evento aparece después en el calendario con su recordatorio.
- Contenido: confirmación, el evento, recordatorio con «Cambiar», «Volver al feed», aviso con «Deshacer».
- Qué funciona de verdad: guardar y cambiar el recordatorio → Simulado. Enviar el recordatorio de verdad → Después.
- Está lista cuando: el recordatorio elegido se muestra; «Deshacer» quita el guardado; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Calendario
- Archivo de diseño: `disenos/prototipo.html` (09 · calendario, sin eventos).
- Objetivo: Esta pantalla existe para que la persona vea sus planes por fecha. Sabemos que funciona si los días con eventos guardados se ven marcados y llevan al evento.
- Contenido: mes con días marcados, lista «tus guardados», «Ver todos →».
- Estados: sin eventos guardados.
- Qué funciona de verdad: días marcados y lista → Simulado (salen de los guardados). Cambiar de mes → **[POR DECIDIR]**.
- Está lista cuando: un día marcado lleva a su evento; el estado vacío lleva al feed; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Mapa
- Archivo de diseño: `disenos/prototipo.html` (10 · mapa, lista media, pin seleccionado, hoja completa, zoom en cluster, sin permiso de ubicación, zona sin eventos, cómo llegar).
- Objetivo: Esta pantalla existe para que la persona vea qué suena cerca. Sabemos que funciona si toca un pin y llega al evento o a la ruta.
- Contenido: mapa de Bogotá, pines con la portada del evento, grupos de pines, ubicación de la persona, hoja inferior con la lista ordenada por distancia.
- Estados: lista media · hoja completa con filtros · pin seleccionado · zoom en un grupo · sin permiso de ubicación · zona sin eventos · cómo llegar (Apple Maps o Google Maps).
- Qué funciona de verdad: el mapa es una imagen fija → Simulado. «Cómo llegar» → Real (abre Apple Maps o Google Maps). Mapa que se mueve con ubicación real → **[POR DECIDIR]** (probablemente Después).
- Está lista cuando: cada pin lleva a su evento; la hoja sube y baja; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Perfil
- Archivo de diseño: `disenos/prototipo.html` (11 · perfil, cerrar sesión, editar presupuesto).
- Objetivo: Esta pantalla existe para que la persona revise y cambie sus gustos, presupuesto y cuentas vinculadas. Sabemos que funciona si cada fila lleva a su ajuste.
- Contenido: avatar, nombre y correo, Mis guardados, Mis gustos musicales, Presupuesto, Cuentas vinculadas, Ayuda, Cerrar sesión.
- Estados: confirmar cierre de sesión · editar presupuesto.
- Qué funciona de verdad: todas las filas → Simulado. Editar nombre (lápiz) → **[POR DECIDIR]** (no hay pantalla). Desvincular cuenta → **[POR DECIDIR]** (el brief UX lo pide; no hay pantalla).
- Está lista cuando: cerrar sesión pide confirmación y vuelve a «selecciona tu perfil»; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Notificaciones
- Archivo de diseño: `disenos/prototipo.html` (12).
- Objetivo: Esta pantalla existe para avisar de eventos nuevos que encajan, sugerencias distintas y recordatorios. Sabemos que funciona si cada aviso lleva a su evento.
- Contenido: avisos de hoy y de esta semana, con tipo, hora, título y texto.
- Qué funciona de verdad: lista → Simulado. Notificaciones push al celular → Después.
- Está lista cuando: cada aviso lleva a su destino; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Mis guardados
- Archivo de diseño: `disenos/prototipo.html` (13).
- Objetivo: Esta pantalla existe para ver todos los eventos guardados en una lista. Sabemos que funciona si muestra los mismos eventos que el calendario.
- Está lista cuando: separa «esta semana» y «próximamente»; cada fila lleva a su detalle; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

## Pantallas · flujo organizador, venue o artista

### Crear cuenta de organizador
- Archivo de diseño: `disenos/prototipo.html` (01 organizador y 01 · válido).
- Objetivo: Esta pantalla existe para que un venue, artista u organizador cree su cuenta. Sabemos que funciona si llega a la verificación de documentos.
- Contenido: nombre, correo o celular, tipo de cuenta (venue · artista · organizador), botón, enlace «Inicia sesión».
- Qué funciona de verdad: validación y tipo de cuenta → Simulado.
- Está lista cuando: el botón se habilita con los campos válidos; el tipo de cuenta se puede cambiar; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Verificación de documentos
- Archivo de diseño: `disenos/prototipo.html` (02 · verificación, rechazada).
- Objetivo: Esta pantalla existe para que RIFF compruebe que el negocio es real. Sabemos que funciona si el organizador sabe qué documento falta o por qué lo rechazaron.
- Contenido: permiso de funcionamiento, cámara de comercio, RUT, tiempo de revisión, «Enviar a revisión».
- Estados: subiendo · rechazada con motivo.
- Qué funciona de verdad: subir archivos → **[POR DECIDIR]** (Simulado o Real con el almacenamiento de Supabase). Revisión → Después (la hace una persona del equipo).
- Está lista cuando: se ve el estado de cada documento; el motivo de rechazo es claro; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Perfil público del organizador
- Archivo de diseño: `disenos/prototipo.html` (03 organizador).
- Objetivo: Esta pantalla existe para que el venue o artista arme la página que verá el público. Sabemos que funciona si guarda y llega al panel.
- Contenido: portada, foto, insignia «Verificado», nombre, descripción, ubicación, galería de fotos, redes sociales.
- Qué funciona de verdad: editar campos → Simulado. Subir fotos → **[POR DECIDIR]**.
- Está lista cuando: «Guardar y continuar» lleva al panel; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Iniciar sesión (organizador)
- Archivo de diseño: `disenos/prototipo.html` (04 organizador).
- Objetivo y está lista cuando: igual que «Iniciar sesión» del público, pero lleva al panel.

### Panel de organizador
- Archivo de diseño: `disenos/prototipo.html` (05 · panel, confirmar cancelación).
- Objetivo: Esta pantalla existe para que el organizador publique eventos y vea cómo le va. Sabemos que funciona si llega a publicar un evento nuevo o a las métricas en un toque.
- Contenido: saludo, notificaciones, «+ Publicar nuevo evento», resumen de 7 días (vistas, guardados, clics a venta), mis eventos con estado (publicado, en revisión, rechazado) y acciones (Métricas, Editar, Duplicar, Cancelar, Corregir).
- Estados: confirmar cancelación.
- Qué funciona de verdad: lista de eventos y métricas → Simulado. Duplicar → **[POR DECIDIR]**. Cancelar → Simulado (pide confirmación).
- Está lista cuando: cada acción lleva a su pantalla; cancelar pide confirmación; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Publicar evento (4 pasos)
- Archivo de diseño: `disenos/prototipo.html` (06 · paso 1 a paso 4).
- Objetivo: Esta pantalla existe para que publicar un evento tome dos minutos. Sabemos que funciona si el organizador completa los 4 pasos y lo envía a revisión.
- Contenido: paso 1 lo básico (duplicar un evento anterior, nombre, organizadores, portada) · paso 2 fecha y lugar (dirección con mapa, fecha, hora) · paso 3 clasificación y precio (género, formato, tipo de venue, precio desde y hasta, edad) · paso 4 venta y permisos (link de venta, PMU, restricciones).
- Qué funciona de verdad: formulario y navegación entre pasos → Simulado. Guardar el evento → **[POR DECIDIR]** (candidato a Real con Supabase). Verificar que el link abra → Después.
- Está lista cuando: la barra de pasos avanza; «Atrás» no borra lo escrito; «Enviar a revisión» lleva a «en revisión»; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Evento en revisión
- Archivo de diseño: `disenos/prototipo.html` (07 organizador).
- Objetivo: Esta pantalla existe para que el organizador sepa qué sigue y en cuánto tiempo. Sabemos que funciona si entiende que tiene respuesta en 48 horas.
- Está lista cuando: muestra los tres estados (enviado, en revisión, publicado); «Volver al panel» funciona; se ve igual al diseño aprobado; funciona en celular (375 px de ancho). El enlace «(Prototipo) Simular aprobación» se quita en la app final.

### Evento publicado
- Archivo de diseño: `disenos/prototipo.html` (08 organizador).
- Objetivo: Esta pantalla existe para confirmar que el evento ya se ve en el feed, el mapa y los filtros.
- Está lista cuando: muestra la tarjeta del evento como la ve el público; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Métricas del evento
- Archivo de diseño: `disenos/prototipo.html` (09 organizador).
- Objetivo: Esta pantalla existe para que el organizador vea si su evento está llegando a la gente. Sabemos que funciona si entiende su mejor día y su tasa de guardado.
- Contenido: evento, vistas, guardados, clics a venta, gráfica de 7 días, mejor día, tasa de guardado.
- Qué funciona de verdad: números y gráfica → Simulado.
- Está lista cuando: los números coinciden con el panel; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).

### Notificaciones del organizador
- Archivo de diseño: `disenos/prototipo.html` (10 organizador).
- Objetivo: Esta pantalla existe para avisar al organizador de aprobaciones, hitos y datos por revisar.
- Está lista cuando: cada aviso lleva a su destino; se ve igual al diseño aprobado; funciona en celular (375 px de ancho).
