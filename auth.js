// CheckMente — contas (Supabase Auth): criar conta, entrar, sair
(function () {
  const cfg = window.APP_CONFIG || {};
  let client = null;
  try { client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY); } catch (e) {}
  const CM = (window.CM = { supabase: client, user: null });

  const $ = (id) => document.getElementById(id);
  const dlg = $('authDialog'), form = $('authForm'), errBox = $('authError'), submit = $('authSubmit');
  const NOME_RE = /^\p{L}[\p{L} '.-]{1,59}$/u;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const SENHA_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,72}$/;
  let mode = 'login';

  function setMode(m) {
    mode = m;
    const s = m === 'signup';
    $('authTitle').textContent = s ? 'Criar conta' : 'Entrar';
    $('authNomeRow').hidden = !s;
    $('authConfRow').hidden = !s;
    $('authHint').hidden = !s;
    submit.textContent = s ? 'Criar conta' : 'Entrar';
    $('authSwitchText').textContent = s ? 'Já tem conta?' : 'Ainda não tem conta?';
    $('authSwitch').textContent = s ? 'Entrar' : 'Criar conta';
    $('authSenha').autocomplete = s ? 'new-password' : 'current-password';
    errBox.textContent = '';
  }

  function open(m) {
    setMode(m || 'login');
    form.reset();
    if (!dlg.open) dlg.showModal();
    $(mode === 'signup' ? 'authNome' : 'authEmail').focus();
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-auth-open]');
    if (t) open(t.dataset.authOpen);
  });
  $('authClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  $('authSwitch').addEventListener('click', () => { setMode(mode === 'login' ? 'signup' : 'login'); form.reset(); });
  $('authLogout').addEventListener('click', () => client && client.auth.signOut());

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errBox.textContent = '';
    if ($('authSite').value) return; // honeypot: só robôs preenchem
    if (!client) { errBox.textContent = 'Serviço indisponível. Tente mais tarde.'; return; }

    const nome = $('authNome').value.normalize('NFKC').replace(/\s+/g, ' ').trim();
    const email = $('authEmail').value.trim().toLowerCase();
    const senha = $('authSenha').value;

    if (!EMAIL_RE.test(email) || email.length > 120) return void (errBox.textContent = 'Digite um e-mail válido.');
    if (mode === 'signup') {
      if (!NOME_RE.test(nome)) return void (errBox.textContent = 'Use um nome com 2 a 60 letras (sem números ou símbolos).');
      if (!SENHA_RE.test(senha)) return void (errBox.textContent = 'A senha precisa de 8+ caracteres, com letras e números.');
      if (senha !== $('authConf').value) return void (errBox.textContent = 'As senhas não são iguais.');
    } else if (!senha) {
      return void (errBox.textContent = 'Digite sua senha.');
    }

    submit.disabled = true;
    try {
      if (mode === 'signup') {
        const { data, error } = await client.auth.signUp({ email, password: senha, options: { data: { nome } } });
        if (error) throw error;
        if (!data.session) {
          errBox.textContent = '';
          dlg.close();
          alert('Conta criada! Confira seu e-mail para confirmar o cadastro e depois entre.');
        } else dlg.close();
      } else {
        const { error } = await client.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        dlg.close();
      }
    } catch (err) {
      errBox.textContent = mode === 'login'
        ? 'E-mail ou senha incorretos.'
        : 'Não foi possível criar a conta. Se você já tem cadastro, use "Entrar".';
    } finally {
      setTimeout(() => { submit.disabled = false; }, 1500);
    }
  });

  function render() {
    const u = CM.user;
    $('authGuest').hidden = !!u;
    $('authUser').hidden = !u;
    if (u) $('userName').textContent = (u.user_metadata && u.user_metadata.nome || u.email).split(' ')[0];
    document.dispatchEvent(new CustomEvent('checkmente:auth'));
  }

  if (client) {
    client.auth.getSession().then(({ data }) => { CM.user = data.session ? data.session.user : null; render(); });
    client.auth.onAuthStateChange((_e, session) => { CM.user = session ? session.user : null; render(); });
  } else render();
})();