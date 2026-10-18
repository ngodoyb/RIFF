# RIFF — Brief UX

**Riff: todo en un mismo lugar.**

Equipo: Natali Godoy (liderazgo, dirección de arte), Kevin Torres (front end, agregación de datos), Sofia Lizarazo (UX/UI, identidad de marca)

---

## Contexto del producto

RIFF es una app que centraliza y recomienda eventos musicales en vivo en una ciudad (piloto: Bogotá), de cualquier género, formato de acto y tipo de venue — desde una sinfónica en el parque hasta un DJ en una discoteca o una banda emergente en un bar. El usuario filtra por gustos y presupuesto, y descubre planes que hoy están dispersos entre redes sociales y páginas de venues.

La oportunidad viene de un vacío claro frente a la competencia: Bandsintown, Songkick, Eventbrite y Jukely resuelven bien "sigue a los artistas que ya conoces", pero ninguno ayuda a **descubrir lo que no conocías**, filtrar por presupuesto real, ni tiene foco local en ciudades latinoamericanas. Ese es el terreno de RIFF.

---

## El problema, en una frase

La gente se entera de los conciertos que le importan cuando ya pasaron, o solo conoce los eventos de artistas famosos porque son los únicos con marketing masivo — mientras que el 90%+ de los eventos de una ciudad (bandas pequeñas, toques en bares, sinfónicas en parques) son prácticamente invisibles.

---

## Usuarios

RIFF diseña para la demanda general descrita en estos cinco perfiles, sin priorizar uno solo en el MVP:

- **Amantes de música en vivo** — ya salen a eventos regularmente y quieren no perderse nada.
- **Turistas** — quieren vivir la escena musical local de la ciudad que visitan.
- **Buscadores de plan** — abren la app con el "¿qué hago hoy/este finde?", según presupuesto y cercanía.
- **Descubridores de música nueva** — buscan activamente bandas emergentes, escena under, freestyle, orquestas jóvenes.
- **Artistas u organizadores pequeños** — tienen público potencial pero no visibilidad, y publican sus eventos vía un formulario simple.

---

## Objetivo de experiencia

Que el usuario evite el "FOMO": pasar de la frustración de enterarse tarde a la sensación de estar siempre al tanto y descubrir eventos de su interés — sin importar si es un concierto grande o un plan underground.

Esto tiene una implicación directa de UX: **cuanto menos esfuerzo le tome al usuario decirle a RIFF qué le gusta, más rápido siente que la app "lo conoce"**. Ahí es donde entra la vinculación con apps de streaming.

---

## Funcionalidad nueva: vincular cuenta de Spotify / Apple Music

**La idea:** en vez de que el usuario configure sus gustos musicales desde cero (seleccionando géneros manualmente uno por uno), RIFF le ofrece vincular su cuenta de Spotify o Apple Music para que la app use su historial de escucha, artistas y géneros más frecuentes como punto de partida de las recomendaciones.

**Por qué importa para la experiencia:**
- Reduce la fricción del onboarding — menos pantallas de "selecciona tus géneros favoritos", más "ya sabemos lo que te gusta".
- Las recomendaciones parten de datos reales de escucha en vez de una autodeclaración genérica, lo cual ataca directamente el objetivo de experiencia (menos FOMO, descubrimiento más certero desde el día uno).
- Refuerza la propuesta de valor frente al benchmark: Bandsintown y Songkick usan esta misma integración para "seguir artistas que ya conoces" — RIFF la usa para lo opuesto, **descubrir lo que no conocías pero que encaja con tu gusto real**.

**Cómo se integra en el flujo (propuesta de alto nivel para validar con el equipo):**

1. **Onboarding — paso de vinculación (opcional, no bloqueante).** Después del registro, se muestra una pantalla: "¿Quieres conectar tu cuenta de música?" con botones para Spotify y Apple Music, y un "Ahora no" siempre visible y del mismo peso visual que las opciones de conectar (para no forzar la decisión).
2. **Si el usuario conecta:** RIFF pide autorización vía OAuth del proveedor (Spotify/Apple), trae top géneros y artistas, y pre-llena las preferencias de género. El usuario ve esa preselección en la siguiente pantalla y puede **ajustarla manualmente** antes de continuar — nunca queda una configuración invisible que el usuario no pueda ver o editar.
3. **Si el usuario no conecta (o no tiene ninguna de las dos apps):** cae en el flujo actual de selección manual de géneros, sin fricción adicional ni mensajes de "te estás perdiendo algo" que generen presión.
4. **Después del onboarding:** la opción de vincular/desvincular cuenta debe estar disponible en el perfil/ajustes en cualquier momento, no solo en el primer uso — alguien puede instalar RIFF sin Spotify a mano y querer conectarlo después.
5. **Estado de la cuenta vinculada:** el perfil debe mostrar claramente qué cuenta está conectada (ícono/nombre del proveedor) y ofrecer desconectar en un solo paso, sin tener que buscarlo en submenús.

**Consideraciones de UX a resolver con el equipo (no cerradas en este brief):**
- Qué pasa si el usuario tiene *ambas* apps (Spotify y Apple Music) instaladas — ¿se puede vincular solo una a la vez o las dos?
- Qué tan transparente hay que ser sobre qué datos exactos se leen (top artistas/géneros vs. historial completo) — esto es tanto un tema de UX (copy claro) como de privacidad.
- Qué pasa con la recomendación si el usuario desvincula la cuenta después de haberla usado por un tiempo: ¿se conserva la última foto de sus gustos o vuelve a preferencias manuales?
- Si el usuario no tiene Spotify ni Apple Music (aplica sobre todo a los segmentos de "turistas" y "buscadores de plan" ocasionales), el flujo manual debe sentirse igual de completo, no como una versión degradada.

---

## Flujo clave: descubrir y guardar un evento

1. Usuario abre la app → ve un feed de eventos recomendados para su ciudad, ya filtrado por sus gustos (declarados o traídos de Spotify/Apple Music).
2. Puede refinar con filtros: género musical, categoría de evento/venue, fecha, precio.
3. Selecciona un evento → ve el detalle (venue, fecha, precio, formato de acto).
4. Puede guardarlo/marcar interés, lo cual también retroalimenta la recomendación futura.

## Flujo clave: publicar un evento (lado organizador)

1. Organizador, banda o venue pequeño accede al formulario simple de publicación.
2. Completa los datos del evento (sin necesidad de crear un perfil complejo).
3. El evento entra al feed general, visible para los cinco perfiles de usuario sin necesidad de tener seguidores previos en RIFF.

---

## Alcance del MVP (resumen)

- Una sola ciudad (Bogotá), para tener densidad real de datos.
- Recomendación básica por preferencias de género — declaradas manualmente **o** traídas de Spotify/Apple Music si el usuario decide vincular su cuenta.
- Feed de eventos con filtros: género musical, categoría de evento/venue (con edad implícita según categoría), fecha, precio.
- Formulario simple para que organizadores, bandas y venues publiquen su evento.
- Vinculación opcional de cuenta de streaming (Spotify/Apple Music) como acelerador de onboarding y de calidad de recomendación.

---

## Qué debe sentir el usuario (norte para diseño de interacción)

- **Al abrir la app por primera vez:** "esto ya entiende lo que me gusta" (gracias a la opción de vincular streaming) o, si no vincula, "esto es rápido de configurar, no me toma nada".
- **Al usar el feed:** "esto me está mostrando algo que no sabía que existía", no solo artistas que ya sigo en otro lado.
- **Al filtrar por presupuesto:** confianza en que el precio mostrado es real y no una sorpresa en la puerta del evento.
- **Como organizador pequeño:** "publicar mi evento aquí toma dos minutos y me da visibilidad real", sin sentir que compite en desventaja frente a los artistas grandes.
