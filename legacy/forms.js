// CheckMente — formulários (desabafar, check-in, ajuda) com validação e login obrigatório
(function () {
  // Troque pelos e-mails reais antes de publicar o site.
  const EMAIL_PSICOLOGA = 'psicologia.ifpr@exemplo.com.br';
  const EMAIL_CRIADORA  = 'emanoelly.borges@exemplo.com.br';

  const CM = window.CM || {};
  const supabase = CM.supabase || null;
  const $ = (id) => document.getElementById(id);

  const PERFIS = ['Aluno', 'Professor', 'Servidor'];
  const ASSUNTOS = ['Erro ou bug no site', 'Sugestão de melhoria', 'Dúvida sobre a plataforma', 'Outro assunto'];
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const toast = $('toast');
  function showToast(msg) {
    toast.textContent = msg;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => { toast.hidden = true; }, 350); }, 3600);
  }
  function openMail(to, subject, body) {
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // ---------- limpeza e validação (o servidor valida de novo) ----------
  const clean = (s, max) => String(s || '').normalize('NFKC')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E]/g, '')
    .replace(/[ \t]{2,}/g, ' ').trim().slice(0, max);
  const isSpam = (s) => /(.)\1{11,}/u.test(s) || !/\p{L}{2,}/u.test(s) || (s.match(/https?:\/\//gi) || []).length > 1;
  const last = {};
  function guard(form, key) {
    if (!CM.user) { showToast('Entre na sua conta para continuar.'); return false; }
    const hp = form.querySelector('.hp');
    if (hp && hp.value) return false;
    if (last[key] && Date.now() - last[key] < 15000) { showToast('Calma! Aguarde alguns segundos para enviar de novo.'); return false; }
    last[key] = Date.now();
    return true;
  }

  function formatDate(ts) {
    const d = new Date(ts);
    if (!ts || isNaN(d.getTime())) return '';
    const p = (n) => String(n).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }
  function makeHistoryItem(record, title) {
    const li = document.createElement('li');
    const head = document.createElement('div');
    head.className = 'history-item-head';
    const who = document.createElement('span'); who.textContent = title;
    const date = document.createElement('span'); date.className = 'history-item-date'; date.textContent = formatDate(record.created_at);
    head.append(who, date);
    li.appendChild(head);
    return li;
  }
  async function fetchMine(table) {
    if (!supabase || !CM.user) return [];
    const { data, error } = await supabase.from(table).select('*').eq('user_id', CM.user.id).order('created_at', { ascending: false }).limit(50);
    return error ? [] : data;
  }

  // ---------- Desabafar ----------
  const ventForm = $('ventForm'), ventList = $('ventList'), ventEmpty = $('ventEmpty');
  function renderVentHistory(list) {
    ventList.innerHTML = '';
    ventEmpty.hidden = list.length > 0;
    list.forEach((r) => {
      const li = makeHistoryItem(r, `${r.nome || 'Anônimo(a)'} · ${r.perfil || '—'} · ${r.turma || '—'}`);
      const p = document.createElement('p'); p.className = 'history-item-text'; p.textContent = r.texto;
      li.appendChild(p); ventList.appendChild(li);
    });
  }
  const loadVentHistory = async () => renderVentHistory(await fetchMine('desabafos'));

  ventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!guard(ventForm, 'vent')) return;
    const nome = clean($('ventNome').value, 80), perfil = $('ventPerfil').value, turma = clean($('ventTurma').value, 60);
    const contato = clean($('ventContato').value, 120), texto = clean($('ventTexto').value, 2000);
    const enviarEmail = $('ventEnviar').checked;
    const fail = (m) => { last.vent = 0; showToast(m); };
    if (nome.length < 2) return fail('Digite seu nome.');
    if (!PERFIS.includes(perfil)) return fail('Escolha uma opção em "Você é".');
    if (contato && !EMAIL_RE.test(contato)) return fail('Confira o e-mail de retorno.');
    if (texto.length < 10 || isSpam(texto)) return fail('Escreva um pouco mais sobre o que você sente (mínimo de 10 caracteres).');

    const { error } = await supabase.from('desabafos').insert({ nome, perfil, turma, contato, texto, enviado_email: enviarEmail });
    if (error) return fail('Não foi possível salvar agora. Tente de novo em instantes.');
    loadVentHistory();

    if (enviarEmail) {
      openMail(EMAIL_PSICOLOGA, `[CheckMente] Desabafo de ${nome}`,
        `Nome: ${nome}\nPerfil: ${perfil}\nTurma/Setor: ${turma || 'não informado'}\nE-mail para retorno: ${contato || 'não informado'}\n\nDesabafo:\n${texto}\n\n— Enviado pela plataforma CheckMente (IFPR)`);
      showToast('Salvo! Abrindo seu e-mail para enviar à psicóloga do IFPR...');
    } else showToast('Desabafo salvo. Obrigado por compartilhar. 💜');
    ventForm.reset();
    $('ventEnviar').checked = true;
    applyAuth();
  });

  // ---------- Ajuda ----------
  const helpForm = $('helpForm');
  helpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!guard(helpForm, 'help')) return;
    const nome = clean($('helpNome').value, 80), assunto = $('helpAssunto').value;
    const email = clean($('helpEmail').value, 120), texto = clean($('helpTexto').value, 2000);
    const fail = (m) => { last.help = 0; showToast(m); };
    if (nome.length < 2) return fail('Digite seu nome.');
    if (!ASSUNTOS.includes(assunto)) return fail('Escolha um assunto.');
    if (!EMAIL_RE.test(email)) return fail('Confira seu e-mail.');
    if (texto.length < 10 || isSpam(texto)) return fail('Descreva o problema com mais detalhes (mínimo de 10 caracteres).');

    const { error } = await supabase.from('mensagens').insert({ nome, assunto, email, texto });
    if (error) return fail('Não foi possível enviar agora. Tente de novo em instantes.');
    openMail(EMAIL_CRIADORA, `[CheckMente] ${assunto} — ${nome}`,
      `Nome: ${nome}\nE-mail para retorno: ${email}\nAssunto: ${assunto}\n\nDescrição:\n${texto}\n\n— Enviado pela plataforma CheckMente (IFPR)`);
    showToast('Mensagem enviada! Abrindo seu e-mail...');
    helpForm.reset();
    applyAuth();
  });

  // ---------- Check-in emocional ----------
  const moodGrid = $('moodGrid'), moodResult = $('moodResult'), moodResultText = $('moodResultText'), moodTip = $('moodTip');
  const intensity = $('intensity'), checkinList = $('checkinList'), checkinEmpty = $('checkinEmpty');
  const tips = {
    'Ótimo':   'Que bom! Aproveite esse momento e, se puder, compartilhe essa energia com alguém.',
    'Bem':     'Legal ver você bem. Continue cuidando do que te faz bem.',
    'Neutro':  'Dias neutros também fazem parte. Sem pressa para sentir nada além disso.',
    'Cansado': 'Talvez seja hora de descansar um pouco mais. Seu corpo está pedindo isso.',
    'Ansioso': 'Respire fundo. Se a ansiedade estiver forte, considere desabafar ou buscar a psicóloga do IFPR.',
    'Triste':  'Sentir tristeza não é fraqueza. Se quiser conversar sobre isso, estamos aqui.',
  };
  const MOODS = Object.keys(tips);
  function renderCheckinHistory(list) {
    checkinList.innerHTML = '';
    checkinEmpty.hidden = list.length > 0;
    list.forEach((r) => checkinList.appendChild(makeHistoryItem(r, `${r.emoji || ''} ${r.humor} (intensidade ${r.nivel_label || r.intensidade})`)));
  }
  const loadCheckinHistory = async () => renderCheckinHistory(await fetchMine('checkins'));

  // mantém o rótulo falado pelo leitor de tela em sincronia com o valor do slider
  const intensityLevelLabel = (level) => (level <= 2 ? 'Leve' : level === 3 ? 'Moderado' : 'Forte');
  intensity.setAttribute('aria-valuetext', intensityLevelLabel(Number(intensity.value)));
  intensity.addEventListener('input', () => {
    intensity.setAttribute('aria-valuetext', intensityLevelLabel(Number(intensity.value)));
  });

  // roving tabindex: só uma opção do grupo fica no tab order por vez (padrão ARIA radiogroup)
  const moodOptions = Array.from(document.querySelectorAll('.mood-option'));
  moodOptions.forEach((btn, i) => { btn.tabIndex = i === 0 ? 0 : -1; });

  function selectMoodByIndex(index, { focus = true } = {}) {
    const target = moodOptions[index];
    if (!target) return;
    moodOptions.forEach((b) => { b.tabIndex = -1; });
    target.tabIndex = 0;
    if (focus) target.focus();
  }

  moodGrid.addEventListener('keydown', (e) => {
    const current = moodOptions.indexOf(document.activeElement);
    if (current === -1) return;
    let targetIndex = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      targetIndex = (current + 1) % moodOptions.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      targetIndex = (current - 1 + moodOptions.length) % moodOptions.length;
    } else if (e.key === 'Home') {
      targetIndex = 0;
    } else if (e.key === 'End') {
      targetIndex = moodOptions.length - 1;
    }
    if (targetIndex !== null) {
      e.preventDefault();
      selectMoodByIndex(targetIndex);
    }
  });

  moodGrid.addEventListener('click', async (e) => {
    const btn = e.target.closest('.mood-option');
    if (!btn || !CM.user) return;
    const mood = btn.dataset.mood;
    if (!MOODS.includes(mood) || !guard(moodGrid, 'mood')) return;

    moodOptions.forEach((b) => { b.classList.remove('selected'); b.setAttribute('aria-checked', 'false'); });
    btn.classList.add('selected');
    btn.setAttribute('aria-checked', 'true');
    selectMoodByIndex(moodOptions.indexOf(btn), { focus: false });

    const level = Math.min(5, Math.max(1, Number(intensity.value) || 3));
    const levelLabel = level <= 2 ? 'leve' : level === 3 ? 'moderada' : 'forte';
    moodResultText.textContent = `${mood.toLowerCase()} (intensidade ${levelLabel})`;
    moodTip.textContent = tips[mood];
    moodResult.hidden = false;
    moodResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const { error } = await supabase.from('checkins').insert({ humor: mood, emoji: btn.dataset.emoji || '', intensidade: level, nivel_label: levelLabel });
    if (error) showToast('Não foi possível salvar este check-in agora.');
    else loadCheckinHistory();
  });

  // ---------- bloqueio por login ----------
  function applyAuth() {
    const u = CM.user;
    [ventForm, helpForm].forEach((f) => Array.from(f.elements).forEach((el) => { el.disabled = !u; }));
    document.querySelectorAll('.mood-option, #intensity').forEach((el) => { el.disabled = !u; });
    document.querySelectorAll('[data-gate]').forEach((g) => { g.hidden = !!u; });
    if (u) {
      const nm = (u.user_metadata && u.user_metadata.nome) || '';
      if (!$('ventNome').value) $('ventNome').value = nm;
      if (!$('helpNome').value) $('helpNome').value = nm;
      if (!$('helpEmail').value) $('helpEmail').value = u.email || '';
      loadVentHistory(); loadCheckinHistory();
    } else { renderVentHistory([]); renderCheckinHistory([]); moodResult.hidden = true; }
  }
  document.addEventListener('checkmente:auth', applyAuth);
  applyAuth();
})();