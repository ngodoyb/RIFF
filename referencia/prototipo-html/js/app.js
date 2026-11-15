// RIFF · navegación mínima entre pantallas (por hash)
(function () {
  const screens = [...document.querySelectorAll('[data-screen]')];
  const tabbar = document.getElementById('tabbar');
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast.hidden = true), 2200);
  }

  function render() {
    const id = location.hash.slice(1) || 'splash';
    const target = screens.find((s) => s.dataset.screen === id);

    if (!target) {
      // Pantalla aún no construida: nos quedamos donde estamos.
      showToast('Esta pantalla está en construcción.');
      history.replaceState(null, '', '#' + (render.current || 'splash'));
      return;
    }

    screens.forEach((s) => (s.hidden = s !== target));
    tabbar.hidden = !target.classList.contains('has-tabbar');
    tabbar.querySelectorAll('.tab').forEach((t) => {
      if (t.dataset.tab === id) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
    render.current = id;
    window.scrollTo(0, 0);

    if (id === 'splash') {
      clearTimeout(render.splashTimer);
      render.splashTimer = setTimeout(() => (location.hash = 'perfil'), 1800);
    }
  }

  // Splash: tocar para saltar
  document.getElementById('splash').addEventListener('click', () => (location.hash = 'perfil'));

  // Guardar evento desde la card
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.save-btn');
    if (!btn) return;
    const saved = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(saved));
    showToast(saved ? 'Guardado en tu calendario.' : 'Quitado de guardados.');
  });

  window.addEventListener('hashchange', render);
  render();
})();
