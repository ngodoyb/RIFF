// RIFF · app.js
// Comportamiento de la app. Por ahora es el mínimo para navegar el prototipo dividido:
// volver, pantallas que avanzan solas, links dentro de tarjetas y chips que se marcan.
// Los datos simulados irán en js/data.js a medida que cada pantalla se construya con el kit.

const enPages = location.pathname.includes("/pages/");
const raiz = enPages ? "../" : "";

document.addEventListener("click", (evento) => {
  const el = evento.target.closest("[data-href], [data-volver], [data-url], [data-alternar]");
  if (!el) return;

  // Chips de filtros y gustos: se marcan y desmarcan
  if (el.dataset.alternar !== undefined) {
    evento.preventDefault();
    el.classList.toggle("sel");
    return;
  }
  // Links externos que están dentro de otro link (página de venta, mapas)
  if (el.dataset.url) {
    evento.preventDefault();
    evento.stopPropagation();
    window.open(el.dataset.url, "_blank", "noopener");
    return;
  }
  // Botón volver: regresa a la pantalla anterior, o al inicio si se abrió directo
  if (el.dataset.volver !== undefined) {
    evento.preventDefault();
    if (history.length > 1 && document.referrer) history.back();
    else location.href = raiz + "index.html";
    return;
  }
  // Un link dentro de otro (por ejemplo «guardar» dentro de una tarjeta de evento)
  if (el.dataset.href) {
    evento.preventDefault();
    evento.stopPropagation();
    location.href = el.dataset.href;
  }
});

// Pantallas que avanzan solas (splash, cargando, importando gustos)
const automatica = document.querySelector("[data-auto]");
if (automatica) {
  const [destino, espera] = automatica.dataset.auto.split(",");
  setTimeout(() => (location.href = destino), Number(espera));
}
