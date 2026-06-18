/* ── Global duck/stanley/koala cursor + touch trail ── */
(function initTrail() {
  const ASSETS = [
    './assets/duck1.png',
    './assets/stanley.png',
    './assets/koala.png'
  ];

  const container = document.createElement('div');
  container.id = 'trail-container';
  Object.assign(container.style, {
    position: 'fixed',
    inset: '0',
    pointerEvents: 'none',
    zIndex: '9999',
    overflow: 'hidden'
  });
  document.body.appendChild(container);

  const style = document.createElement('style');
  style.textContent = `
    .trail-item {
      position: absolute;
      width: clamp(44px, 10vw, 84px);
      height: auto;
      opacity: 0.85;
      transform: translate(-50%, -50%) scale(0.6);
      will-change: transform, opacity;
      user-select: none;
      filter: drop-shadow(0 3px 10px rgba(0,0,0,0.35));
    }
    @keyframes trailFloat {
      0% { transform: translate(-50%, -50%) scale(0.9) rotate(var(--rot)); opacity: 0.85; }
      100% { transform: translate(-50%, calc(-50% - 90px)) scale(0.45) rotate(calc(var(--rot) + 25deg)); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  let lastX = 0, lastY = 0, lastTime = 0;
  let active = [];

  function spawn(x, y) {
    const img = document.createElement('img');
    img.src = ASSETS[(Math.random() * ASSETS.length) | 0];
    img.className = 'trail-item';
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    img.style.setProperty('--rot', (Math.random() * 40 - 20) + 'deg');
    const duration = 900 + Math.random() * 700;
    img.style.animation = `trailFloat ${duration}ms ease-out forwards`;
    container.appendChild(img);

    setTimeout(() => {
      if (img.parentNode) img.parentNode.removeChild(img);
    }, duration + 50);
  }

  function onMove(x, y) {
    const now = performance.now();
    const dist = Math.hypot(x - lastX, y - lastY);
    if (now - lastTime < 35 || dist < 8) return;
    lastX = x; lastY = y; lastTime = now;
    spawn(x, y);
  }

  document.addEventListener('mousemove', e => onMove(e.clientX, e.clientY), { passive: true });

  let touchTimer = null;
  document.addEventListener('touchmove', e => {
    if (!e.touches.length) return;
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
    if (touchTimer) clearTimeout(touchTimer);
    touchTimer = setTimeout(() => { lastTime = 0; }, 120);
  }, { passive: true });

  document.addEventListener('touchstart', e => {
    if (!e.touches.length) return;
    const t = e.touches[0];
    lastX = t.clientX; lastY = t.clientY; lastTime = 0;
    onMove(t.clientX, t.clientY);
  }, { passive: true });
})();
