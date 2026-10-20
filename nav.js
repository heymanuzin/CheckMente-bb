// CheckMente — navegação entre abas
(function () {
  const links = Array.from(document.querySelectorAll('[data-tab]'));
  const tabLinks = Array.from(document.querySelectorAll('.main-nav .nav-link'));
  const panels = document.querySelectorAll('.tab-panel');
  const nav = document.getElementById('mainNav');
  const menuToggle = document.getElementById('menuToggle');

  function showTab(id, { moveFocus = false } = {}) {
    panels.forEach((p) => {
      const show = p.id === id;
      p.classList.toggle('active', show);
      p.style.display = show ? '' : 'none';
    });

    tabLinks.forEach((l) => {
      const isActive = l.dataset.tab === id;
      l.classList.toggle('active', isActive);
      l.setAttribute('aria-selected', isActive ? 'true' : 'false');
      l.tabIndex = isActive ? 0 : -1;
    });

    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // move o foco para o painel recém-aberto, assim leitores de tela
    // anunciam a nova seção (importante para quem navega sem mouse)
    if (moveFocus) {
      const panel = document.getElementById(id);
      if (panel) {
        requestAnimationFrame(() => panel.focus({ preventScroll: true }));
      }
    }
  }

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showTab(link.dataset.tab, { moveFocus: true });
      history.replaceState(null, '', `#${link.dataset.tab}`);
    });
  });

  // navegação por setas entre as abas, seguindo o padrão ARIA de tablist
  tabLinks.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        targetIndex = (index + 1) % tabLinks.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        targetIndex = (index - 1 + tabLinks.length) % tabLinks.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = tabLinks.length - 1;
      }
      if (targetIndex !== null) {
        e.preventDefault();
        const targetLink = tabLinks[targetIndex];
        targetLink.focus();
        showTab(targetLink.dataset.tab);
        history.replaceState(null, '', `#${targetLink.dataset.tab}`);
      }
    });
  });

  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // fecha o menu mobile com Esc, devolvendo o foco ao botão
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });

  // abre a aba certa se a URL já tiver um hash
  const initial = window.location.hash.replace('#', '');
  if (initial && document.getElementById(initial)) {
    showTab(initial);
  }
})();
