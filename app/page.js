import Boot from '../components/Boot';

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Pular para o conteúdo</a>

      <canvas id="bubbles" aria-hidden="true"></canvas>


      <header className="site-header">
        <div className="header-inner">
          <a href="#inicio" className="brand">
            <img src="/logo.svg" alt="Logo CheckMente" className="brand-logo" />
            <span className="brand-name">Check<em>Mente</em></span>
          </a>

          <nav className="main-nav" id="mainNav" role="tablist" aria-label="Seções do CheckMente">
            <a href="#inicio" id="tab-inicio" className="nav-link active" data-tab="inicio" role="tab" aria-selected="true" aria-controls="inicio">Início</a>
            <a href="#sobre" id="tab-sobre" className="nav-link" data-tab="sobre" role="tab" aria-selected="false" aria-controls="sobre" tabIndex="-1">Saiba mais</a>
            <a href="#desabafar" id="tab-desabafar" className="nav-link" data-tab="desabafar" role="tab" aria-selected="false" aria-controls="desabafar" tabIndex="-1">Desabafar</a>
            <a href="#checkin" id="tab-checkin" className="nav-link" data-tab="checkin" role="tab" aria-selected="false" aria-controls="checkin" tabIndex="-1">Check-in emocional</a>
            <a href="#ajuda" id="tab-ajuda" className="nav-link" data-tab="ajuda" role="tab" aria-selected="false" aria-controls="ajuda" tabIndex="-1">Ajuda</a>
          </nav>

          <div className="header-actions">
            <div className="auth-actions" id="authGuest">
              <button type="button" className="btn btn-ghost btn-sm" data-auth-open="login">Entrar</button>
              <button type="button" className="btn btn-primary btn-sm" data-auth-open="signup">Criar conta</button>
            </div>
            <div className="auth-actions" id="authUser" hidden>
              <span className="user-chip" id="userName"></span>
              <button type="button" className="btn btn-ghost btn-sm" id="authLogout">Sair</button>
            </div>
            <button id="themeToggle" className="theme-toggle" aria-label="Ativar modo escuro" aria-pressed="false" title="Alternar tema">
              <svg className="icon-sun" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
              <svg className="icon-moon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            </button>
            <button className="menu-toggle" id="menuToggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="mainNav">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">


        <section id="inicio" className="tab-panel active hero" role="tabpanel" aria-labelledby="tab-inicio" tabIndex="0">
          <div className="hero-content">
            <p className="eyebrow">IFPR · bem-estar da comunidade escolar</p>
            <h1 className="hero-title">Antes de checar a matéria, <em>cheque a mente.</em></h1>
            <p className="hero-lead">O CheckMente é um espaço para alunos, professores e servidores respirarem. Fale sobre o que está sentindo, meça seu emocional em segundos e, se precisar, leve isso a uma psicóloga do IFPR.</p>
            <div className="hero-actions">
              <a href="#desabafar" className="btn btn-primary" data-tab="desabafar">Quero desabafar</a>
              <a href="#checkin" className="btn btn-ghost" data-tab="checkin">Fazer check-in emocional</a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="pulse-card">
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <div className="pulse-ring delay-2"></div>
              <img src="/logo.svg" alt="" className="pulse-logo" />
            </div>
          </div>
        </section>

        <section id="sobre" className="tab-panel about" role="tabpanel" aria-labelledby="tab-sobre" tabIndex="0">
          <div className="section-head">
            <p className="eyebrow">Saiba mais</p>
            <h2>O que é o CheckMente</h2>
          </div>

          <div className="about-grid">
            <div className="about-text">
              <p>O <strong>CheckMente</strong> é uma plataforma de saúde mental criada para a comunidade do <strong>IFPR</strong> — alunos, professores e servidores. A ideia é simples: dar um lugar seguro para falar sobre o que está pesando, sem julgamento e sem burocracia.</p>
              <p>Aqui você pode <strong>desabafar</strong> livremente, sabendo que, se quiser, seu relato pode ser encaminhado por e-mail a uma psicóloga profissional do IFPR. Também dá para fazer um <strong>check-in emocional</strong> rápido, uma forma de parar por um minuto e entender como você está de verdade.</p>
              <p>Ninguém deveria carregar tudo sozinho. O CheckMente existe para lembrar disso.</p>
            </div>

            <div className="about-cards">
              <div className="mini-card">
                <span className="mini-card-icon" aria-hidden="true">💬</span>
                <h3>Desabafar</h3>
                <p>Escreva o que está sentindo. Se quiser, envie para a psicóloga do IFPR.</p>
              </div>
              <div className="mini-card">
                <span className="mini-card-icon" aria-hidden="true">🌤️</span>
                <h3>Check-in emocional</h3>
                <p>Um termômetro rápido do seu humor, sem compromisso.</p>
              </div>
              <div className="mini-card">
                <span className="mini-card-icon" aria-hidden="true">🔒</span>
                <h3>Respeito e sigilo</h3>
                <p>Seu relato é seu. Você decide o que compartilhar e com quem.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="desabafar" className="tab-panel vent" role="tabpanel" aria-labelledby="tab-desabafar" tabIndex="0">
          <div className="section-head">
            <p className="eyebrow">Desabafar</p>
            <h2>Fale, estamos ouvindo</h2>
            <p className="section-lead">Preencha com calma. Se preferir, você pode enviar seu desabafo por e-mail diretamente para a psicóloga do IFPR.</p>
          </div>

          <div className="auth-gate" data-gate="" hidden>
            <p><strong>Esta área é só para quem tem conta.</strong> Assim seus registros ficam protegidos e visíveis só para você.</p>
            <div className="auth-gate-actions"><button type="button" className="btn btn-primary" data-auth-open="login">Entrar</button><button type="button" className="btn btn-ghost" data-auth-open="signup">Criar conta</button></div>
          </div>

          <form id="ventForm" className="card-form">
            <div className="form-row">
              <div className="field">
                <label htmlFor="ventNome">Nome</label>
                <input type="text" id="ventNome" name="nome" minLength="2" maxLength="80" autoComplete="name" placeholder="Seu nome" required />
              </div>
              <div className="field">
                <label htmlFor="ventPerfil">Você é</label>
                <select id="ventPerfil" name="perfil" required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option value="Aluno">Aluno(a)</option>
                  <option value="Professor">Professor(a)</option>
                  <option value="Servidor">Servidor(a) / Técnico(a)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="ventTurma">Turma / Setor</label>
                <input type="text" id="ventTurma" name="turma" maxLength="60" placeholder="Ex: 3º ano Info, Coordenação..." />
              </div>
              <div className="field">
                <label htmlFor="ventContato">E-mail para retorno (opcional)</label>
                <input type="email" id="ventContato" name="contato" maxLength="120" autoComplete="email" placeholder="seuemail@exemplo.com" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="ventTexto">O que você quer desabafar?</label>
              <textarea id="ventTexto" name="texto" minLength="10" maxLength="2000" rows="7" placeholder="Pode escrever livremente. Aqui não tem certo ou errado." required></textarea>
            </div>

            <label className="checkbox-field">
              <input type="checkbox" id="ventEnviar" defaultChecked />
              Enviar este desabafo por e-mail para a psicóloga do IFPR
            </label>
            <input type="text" className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <button type="submit" className="btn btn-primary btn-block">Enviar desabafo</button>
            <p className="form-note" id="ventNote">Ao enviar, seu app de e-mail vai abrir com a mensagem pronta para a psicóloga do IFPR.</p>
          </form>

          <div id="ventHistory" className="history-block">
            <h3 className="history-title">Seus desabafos registrados</h3>
            <ul id="ventList" className="history-list"></ul>
            <p id="ventEmpty" className="history-empty">Nenhum desabafo registrado ainda. Fique à vontade para escrever. 💜</p>
          </div>
        </section>

        <section id="checkin" className="tab-panel checkin" role="tabpanel" aria-labelledby="tab-checkin" tabIndex="0">
          <div className="section-head">
            <p className="eyebrow">Check-in emocional</p>
            <h2>Como você está, de verdade?</h2>
            <p className="section-lead">Escolha o que mais combina com o seu momento agora.</p>
          </div>

      <div className="auth-gate" data-gate="" hidden>
            <p><strong>Esta área é só para quem tem conta.</strong> Assim seus registros ficam protegidos e visíveis só para você.</p>
            <div className="auth-gate-actions"><button type="button" className="btn btn-primary" data-auth-open="login">Entrar</button><button type="button" className="btn btn-ghost" data-auth-open="signup">Criar conta</button></div>
          </div>

          <div className="mood-grid" id="moodGrid" role="radiogroup" aria-label="Escolha o humor que mais combina com você agora">
            <button className="mood-option" type="button" role="radio" aria-checked="false" data-mood="Ótimo" data-emoji="😄">
              <span className="mood-emoji" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                  <circle cx="32" cy="32" r="26" />
                  <path d="M22 25h.01M42 25h.01" />
                  <path d="M22 40c3.5 4 8 6 10 6s6.5-2 10-6" />
                </svg>
              </span>
              <span>Ótimo</span>
            </button>
            <button className="mood-option" type="button" role="radio" aria-checked="false" data-mood="Bem" data-emoji="🙂">
              <span className="mood-emoji" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                  <circle cx="32" cy="32" r="26" />
                  <path d="M22 25h.01M42 25h.01" />
                  <path d="M22 38c3 3.5 6.5 5 10 5s7-1.5 10-5" />
                </svg>
              </span>
              <span>Bem</span>
            </button>
            <button className="mood-option" type="button" role="radio" aria-checked="false" data-mood="Neutro" data-emoji="😐">
              <span className="mood-emoji" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                  <circle cx="32" cy="32" r="26" />
                  <path d="M22 25h.01M42 25h.01" />
                  <path d="M22 42h20" />
                </svg>
              </span>
              <span>Neutro</span>
            </button>
            <button className="mood-option" type="button" role="radio" aria-checked="false" data-mood="Cansado" data-emoji="😴">
              <span className="mood-emoji" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                  <circle cx="32" cy="32" r="26" />
                  <path d="M20 26C14 12 10 8 6 8M44 26c6-14 10-18 14-18" />
                  <path d="M24 40c8-4 16-4 16 0" />
                </svg>
              </span>
              <span>Cansado</span>
            </button>
            <button className="mood-option" type="button" role="radio" aria-checked="false" data-mood="Ansioso" data-emoji="😰">
              <span className="mood-emoji" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                  <circle cx="32" cy="32" r="26" />
                  <path d="M22 25h.01M42 25h.01" />
                  <path d="M27 39c3 3 7 3 10 0" />
                  <path d="M25 46l-5 3M39 46l5 3" />
                  <path d="M32 8v4" />
                </svg>
              </span>
              <span>Ansioso</span>
            </button>
            <button className="mood-option" type="button" role="radio" aria-checked="false" data-mood="Triste" data-emoji="😢">
              <span className="mood-emoji" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                  <circle cx="32" cy="32" r="26" />
                  <path d="M22 25h.01M42 25h.01" />
                  <path d="M22 45c3-4 8-6 10-6s7 2 10 6" />
                  <path d="M32 4v5M12 8l4 4M52 8l-4 4" />
                </svg>
              </span>
              <span>Triste</span>
            </button>
          </div>

          <div className="intensity-block">
            <label htmlFor="intensity">Intensidade desse sentimento hoje</label>
            <input type="range" id="intensity" min="1" max="5" defaultValue="3" aria-describedby="intensityLabels" aria-valuetext="Moderado" />
            <div className="intensity-labels" id="intensityLabels" aria-hidden="true">
              <span>Leve</span><span>Moderado</span><span>Forte</span>
            </div>
          </div>

      <div id="moodResult" className="mood-result" hidden role="status" aria-live="polite">
            <p><strong>Registrado:</strong> você está se sentindo <span id="moodResultText">—</span> hoje.</p>
            <p className="mood-tip" id="moodTip"></p>
            <a href="#desabafar" className="btn btn-ghost" data-tab="desabafar" id="moodToVent">Quer desabafar sobre isso?</a>
          </div>

          <div id="checkinHistory" className="history-block">
            <h3 className="history-title">Seus check-ins registrados</h3>
            <ul id="checkinList" className="history-list"></ul>
            <p id="checkinEmpty" className="history-empty">Nenhum check-in registrado ainda. Escolha um humor acima! 💜</p>
          </div>
        </section>

        <section id="ajuda" className="tab-panel help" role="tabpanel" aria-labelledby="tab-ajuda" tabIndex="0">
          <div className="section-head">
            <p className="eyebrow">Ajuda</p>
            <h2>Encontrou algum problema no site?</h2>
            <p className="section-lead">Conte pra gente o que aconteceu. Sua mensagem vai direto por e-mail para quem cuida do CheckMente.</p>
          </div>

          <div className="auth-gate" data-gate="" hidden>
            <p><strong>Esta área é só para quem tem conta.</strong> Assim seus registros ficam protegidos e visíveis só para você.</p>
            <div className="auth-gate-actions"><button type="button" className="btn btn-primary" data-auth-open="login">Entrar</button><button type="button" className="btn btn-ghost" data-auth-open="signup">Criar conta</button></div>
          </div>

          <form id="helpForm" className="card-form">
            <div className="form-row">
              <div className="field">
                <label htmlFor="helpNome">Nome</label>
                <input type="text" id="helpNome" name="nome" minLength="2" maxLength="80" autoComplete="name" placeholder="Seu nome" required />
              </div>
              <div className="field">
                <label htmlFor="helpAssunto">Assunto</label>
                <select id="helpAssunto" name="assunto" required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option value="Erro ou bug no site">Erro ou bug no site</option>
                  <option value="Sugestão de melhoria">Sugestão de melhoria</option>
                  <option value="Dúvida sobre a plataforma">Dúvida sobre a plataforma</option>
                  <option value="Outro assunto">Outro assunto</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="helpEmail">Seu e-mail para retorno</label>
              <input type="email" id="helpEmail" name="email" maxLength="120" autoComplete="email" placeholder="seuemail@exemplo.com" required />
            </div>

            <div className="field">
              <label htmlFor="helpTexto">Descreva o que aconteceu</label>
              <textarea id="helpTexto" name="texto" minLength="10" maxLength="2000" rows="6" placeholder="Explique com o máximo de detalhes possível..." required></textarea>
            </div>
            <input type="text" className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <button type="submit" className="btn btn-primary btn-block">Enviar mensagem</button>
            <p className="form-note">Seu app de e-mail vai abrir com a mensagem pronta para a criadora do site.</p>
          </form>
        </section>

      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/logo.svg" alt="Logo CheckMente" className="footer-logo" />
            <span>Check<em>Mente</em></span>
          </div>
          <p className="footer-credit">
            Feito com carinho por <strong>Emanoelly Borges</strong> · IFPR, turma IIW24.<br />
            Criei essa plataforma para você se sentir bem consigo mesmo(a). Espero que goste — e que se sinta melhor depois. 💜
          </p>
        </div>
      </footer>


      <button id="a11yToggle" className="a11y-fab" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="a11yPanel" aria-label="Abrir opções de acessibilidade" title="Acessibilidade">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="a11y-gear-icon">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      <div id="a11yPanel" className="a11y-panel" role="dialog" aria-modal="true" aria-labelledby="a11yPanelTitle" hidden>
        <div className="a11y-panel-inner">
          <div className="a11y-panel-head">
            <h2 id="a11yPanelTitle">Acessibilidade</h2>
            <button id="a11yClose" className="a11y-close" type="button" aria-label="Fechar opções de acessibilidade">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <div className="a11y-group">
            <span className="a11y-group-label" id="a11yFontLabel">Tamanho do texto</span>
            <div className="a11y-btn-row" role="group" aria-labelledby="a11yFontLabel">
              <button type="button" className="a11y-step-btn" data-a11y-font="decrease" aria-label="Diminuir tamanho do texto">A−</button>
              <button type="button" className="a11y-step-btn" data-a11y-font="reset" aria-label="Tamanho do texto padrão">A</button>
              <button type="button" className="a11y-step-btn" data-a11y-font="increase" aria-label="Aumentar tamanho do texto">A+</button>
            </div>
          </div>

          <label className="a11y-switch">
            <span>Alto contraste</span>
            <span className="a11y-switch-control">
              <input type="checkbox" id="a11yContrast" />
              <span className="a11y-switch-track" aria-hidden="true"></span>
            </span>
          </label>

          <label className="a11y-switch">
            <span>Reduzir animações</span>
            <span className="a11y-switch-control">
              <input type="checkbox" id="a11yMotion" />
              <span className="a11y-switch-track" aria-hidden="true"></span>
            </span>
          </label>

          <label className="a11y-switch">
            <span>Espaçamento maior entre linhas</span>
            <span className="a11y-switch-control">
              <input type="checkbox" id="a11ySpacing" />
              <span className="a11y-switch-track" aria-hidden="true"></span>
            </span>
          </label>

          <label className="a11y-switch">
            <span>Destacar links sublinhados</span>
            <span className="a11y-switch-control">
              <input type="checkbox" id="a11yLinks" />
              <span className="a11y-switch-track" aria-hidden="true"></span>
            </span>
          </label>

          <label className="a11y-switch">
            <span>Fonte de leitura simplificada</span>
            <span className="a11y-switch-control">
              <input type="checkbox" id="a11yReadableFont" />
              <span className="a11y-switch-track" aria-hidden="true"></span>
            </span>
          </label>

          <button type="button" id="a11yReset" className="a11y-reset-btn">Restaurar padrão</button>
        </div>
      </div>

      <dialog id="authDialog" className="auth-dialog" aria-labelledby="authTitle">
        <form id="authForm" className="auth-card" noValidate>
          <div className="auth-head">
            <h2 id="authTitle">Entrar</h2>
            <button type="button" id="authClose" className="a11y-close" aria-label="Fechar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
          </div>
          <div className="field" id="authNomeRow" hidden><label htmlFor="authNome">Nome</label><input type="text" id="authNome" maxLength="60" autoComplete="name" /></div>
          <div className="field"><label htmlFor="authEmail">E-mail</label><input type="email" id="authEmail" maxLength="120" autoComplete="email" required /></div>
          <div className="field"><label htmlFor="authSenha">Senha</label><input type="password" id="authSenha" maxLength="72" autoComplete="current-password" required /><small className="field-hint" id="authHint" hidden>Mínimo de 8 caracteres, com letras e números.</small></div>
          <div className="field" id="authConfRow" hidden><label htmlFor="authConf">Repita a senha</label><input type="password" id="authConf" maxLength="72" autoComplete="new-password" /></div>
          <input type="text" id="authSite" className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" />
          <p className="auth-error" id="authError" role="alert"></p>
          <button type="submit" className="btn btn-primary btn-block" id="authSubmit">Entrar</button>
          <p className="form-note"><span id="authSwitchText"></span> <button type="button" className="link-btn" id="authSwitch"></button></p>
        </form>
      </dialog>

      <div id="toast" className="toast" hidden role="status" aria-live="polite" aria-atomic="true"></div>


      <div vw="" className="enabled">
        <div vw-access-button="" className="active"></div>
        <div vw-plugin-wrapper="">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
      <Boot />
    </>
  );
}
