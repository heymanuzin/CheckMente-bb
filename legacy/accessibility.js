// CheckMente — painel de acessibilidade (engrenagem flutuante)
(function () {
  const STORAGE_KEY = 'checkmente-a11y';
  const root = document.documentElement;

  const DEFAULTS = {
    fontScale: 1,
    contrast: false,
    motion: false,
    spacing: false,
    links: false,
    readableFont: false,
  };

  const FONT_MIN = 0.85;
  const FONT_MAX = 1.4;
  const FONT_STEP = 0.1;

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch (e) {
      return { ...DEFAULTS };
    }
  }

  function saveSettings(settings) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (e) {}
  }

  let settings = loadSettings();

  // ---------- elementos ----------
  const toggleBtn = document.getElementById('a11yToggle');
  const panel = document.getElementById('a11yPanel');
  const closeBtn = document.getElementById('a11yClose');
  const resetBtn = document.getElementById('a11yReset');
  const fontButtons = document.querySelectorAll('[data-a11y-font]');
  const contrastInput = document.getElementById('a11yContrast');
  const motionInput = document.getElementById('a11yMotion');
  const spacingInput = document.getElementById('a11ySpacing');
  const linksInput = document.getElementById('a11yLinks');
  const readableFontInput = document.getElementById('a11yReadableFont');

  // ---------- aplicar no DOM ----------
  function applySettings() {
    root.style.setProperty('--a11y-font-scale', settings.fontScale.toFixed(2));

    root.setAttribute('data-a11y-contrast', String(settings.contrast));
    root.setAttribute('data-a11y-motion', settings.motion ? 'reduce' : 'auto');
    root.setAttribute('data-a11y-spacing', String(settings.spacing));
    root.setAttribute('data-a11y-links', String(settings.links));
    root.setAttribute('data-a11y-readable-font', String(settings.readableFont));

    contrastInput.checked = settings.contrast;
    motionInput.checked = settings.motion;
    spacingInput.checked = settings.spacing;
    linksInput.checked = settings.links;
    readableFontInput.checked = settings.readableFont;

    // avisa outros scripts (ex: bubbles.js) que o modo de movimento pode ter mudado
    document.dispatchEvent(new CustomEvent('checkmente:a11y-motion-change'));
  }

  function update(partial) {
    settings = { ...settings, ...partial };
    saveSettings(settings);
    applySettings();
  }

  applySettings();

  // ---------- tamanho do texto ----------
  fontButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.a11yFont;
      let scale = settings.fontScale;
      if (action === 'increase') scale = Math.min(FONT_MAX, +(scale + FONT_STEP).toFixed(2));
      else if (action === 'decrease') scale = Math.max(FONT_MIN, +(scale - FONT_STEP).toFixed(2));
      else scale = DEFAULTS.fontScale;
      update({ fontScale: scale });
    });
  });

  // ---------- interruptores ----------
  contrastInput.addEventListener('change', () => update({ contrast: contrastInput.checked }));
  motionInput.addEventListener('change', () => update({ motion: motionInput.checked }));
  spacingInput.addEventListener('change', () => update({ spacing: spacingInput.checked }));
  linksInput.addEventListener('change', () => update({ links: linksInput.checked }));
  readableFontInput.addEventListener('change', () => update({ readableFont: readableFontInput.checked }));

  // ---------- restaurar padrão ----------
  resetBtn.addEventListener('click', () => {
    settings = { ...DEFAULTS };
    saveSettings(settings);
    applySettings();
  });

  // ---------- abrir/fechar painel (com foco preso e Esc) ----------
  function getFocusable() {
    return Array.from(
      panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.disabled && el.offsetParent !== null);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      closePanel();
      return;
    }
    if (e.key === 'Tab') {
      const focusables = getFocusable();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function onClickOutside(e) {
    if (!panel.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
      closePanel(false);
    }
  }

  function openPanel() {
    panel.hidden = false;
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onKeydown, true);
    document.addEventListener('click', onClickOutside, true);
    const focusables = getFocusable();
    if (focusables.length) focusables[0].focus();
  }

  function closePanel(returnFocus = true) {
    if (panel.hidden) return;
    panel.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown, true);
    document.removeEventListener('click', onClickOutside, true);
    if (returnFocus) toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', () => {
    if (panel.hidden) openPanel();
    else closePanel(false);
  });

  closeBtn.addEventListener('click', () => closePanel());
})();
