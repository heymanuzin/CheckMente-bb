// CheckMente — bolhas flutuantes de fundo (canvas)
(function () {
  const canvas = document.getElementById('bubbles');
  const ctx = canvas.getContext('2d');
  let bubbles = [];
  let width, height;
  const systemReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let staticInterval = null;

  function isReducedMotion() {
    return systemReduceMotion || document.documentElement.getAttribute('data-a11y-motion') === 'reduce';
  }

  function getBubbleColor() {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue('--bubble-color').trim() || '139, 92, 246';
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createBubbles() {
    const count = Math.max(18, Math.min(38, Math.floor(width / 45)));
    bubbles = Array.from({ length: count }, () => spawnBubble());
  }

  function spawnBubble(fromBottom = false) {
    const r = 8 + Math.random() * 46;
    return {
      x: Math.random() * width,
      y: fromBottom ? height + r : Math.random() * height,
      r,
      speed: 0.15 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 0.4,
      opacity: 0.05 + Math.random() * 0.16,
      wobble: Math.random() * Math.PI * 2,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const color = getBubbleColor();

    bubbles.forEach((b) => {
      b.y -= b.speed;
      b.wobble += 0.01;
      b.x += Math.sin(b.wobble) * b.drift;

      if (b.y + b.r < -20) {
        Object.assign(b, spawnBubble(true));
      }

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${b.opacity})`;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${color}, ${Math.min(b.opacity + 0.12, 0.3)})`;
      ctx.stroke();
    });

    if (!isReducedMotion()) requestAnimationFrame(draw);
  }

  function drawStaticFrame() {
    ctx.clearRect(0, 0, width, height);
    const color = getBubbleColor();
    bubbles.forEach((b) => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${b.opacity})`;
      ctx.fill();
    });
  }

  function startMotionMode() {
    if (staticInterval) {
      clearInterval(staticInterval);
      staticInterval = null;
    }
    if (isReducedMotion()) {
      drawStaticFrame();
      staticInterval = setInterval(drawStaticFrame, 4000);
    } else {
      requestAnimationFrame(draw);
    }
  }

  window.addEventListener('resize', () => {
    resize();
    createBubbles();
  });

  resize();
  createBubbles();
  startMotionMode();

  // reage ao toggle "Reduzir animações" do painel de acessibilidade
  document.addEventListener('checkmente:a11y-motion-change', startMotionMode);
})();
