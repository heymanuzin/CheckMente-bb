// CheckMente — alternância de tema claro/escuro
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  let theme = 'light';

  try {
    const stored = window.localStorage ? localStorage.getItem('checkmente-theme') : null;
    if (stored) theme = stored;
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
  } catch (e) {
    // segue com o tema padrão se localStorage não estiver disponível
  }

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('checkmente-theme', t); } catch (e) {}
    const isDark = t === 'dark';
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
  }

  applyTheme(theme);

  toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
  });
})();
