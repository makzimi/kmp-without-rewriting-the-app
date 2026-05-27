// Deck runtime: navigation, scaling, overview, URL hash sync.
(function () {
  const deck = document.getElementById('deck');
  const stage = document.getElementById('stage');
  const slides = Array.from(deck.querySelectorAll('.slide'));
  const counterCur = document.getElementById('cur');
  const counterTot = document.getElementById('tot');
  const nav = document.getElementById('nav');
  const hint = document.getElementById('hint');

  // Stamp page numbers and aria-labels.
  slides.forEach((s, idx) => {
    if (!s.querySelector('.slide__page-num')) {
      const pn = document.createElement('div');
      pn.className = 'slide__page-num';
      pn.textContent = String(idx + 1).padStart(2, '0');
      s.appendChild(pn);
    }
    s.setAttribute('data-index', idx);
  });

  counterTot.textContent = slides.length;
  let current = 0;

  function clamp(n) { return Math.max(0, Math.min(slides.length - 1, n)); }

  function go(n, opts = {}) {
    current = clamp(n);
    slides.forEach((s, idx) => s.classList.toggle('is-active', idx === current));
    counterCur.textContent = current + 1;
    if (!opts.skipHash) {
      history.replaceState(null, '', '#' + (current + 1));
    }
  }

  function next() { go(current + 1); }
  function prev() { go(current - 1); }

  function fitToViewport() {
    if (deck.classList.contains('is-overview')) return;
    const W = 1280, H = 720;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min(vw / W, vh / H) * 0.96;
    deck.style.transform = `scale(${scale})`;
  }

  function toggleOverview() {
    const isOn = deck.classList.toggle('is-overview');
    stage.classList.toggle('is-overview', isOn);
    if (isOn) {
      deck.style.transform = '';
      slides.forEach(s => s.classList.add('is-active'));
    } else {
      slides.forEach((s, idx) => s.classList.toggle('is-active', idx === current));
      fitToViewport();
    }
  }

  // Show nav briefly on mouse move; in fullscreen also hide the cursor.
  let hideTimer = null;
  function poke() {
    nav.classList.add('is-visible');
    document.body.classList.remove('is-idle');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      nav.classList.remove('is-visible');
      document.body.classList.add('is-idle');
    }, 1800);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const el = document.documentElement;
      const req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req) req.call(el).catch(() => {});
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) exit.call(document).catch(() => {});
    }
  }

  function onFullscreenChange() {
    const on = !!(document.fullscreenElement || document.webkitFullscreenElement);
    document.body.classList.toggle('is-fullscreen', on);
    fitToViewport();
  }
  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);

  // Wire up controls
  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);
  document.getElementById('overview').addEventListener('click', toggleOverview);
  document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);

  document.addEventListener('keydown', (e) => {
    // Skip if user is typing somewhere.
    if (e.target && /input|textarea/i.test(e.target.tagName || '')) return;
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
      case 'l':
      case 'j':
        e.preventDefault(); next(); break;
      case 'ArrowLeft':
      case 'PageUp':
      case 'h':
      case 'k':
        e.preventDefault(); prev(); break;
      case 'Home':
        e.preventDefault(); go(0); break;
      case 'End':
        e.preventDefault(); go(slides.length - 1); break;
      case 'o':
      case 'Escape':
        e.preventDefault(); toggleOverview(); break;
      case 'f':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'g': {
        const target = parseInt(prompt('Go to slide #'), 10);
        if (!isNaN(target)) go(target - 1);
        break;
      }
    }
  });

  document.addEventListener('mousemove', poke);
  document.addEventListener('click', (e) => {
    // Click on a slide in overview mode → go to it.
    if (deck.classList.contains('is-overview')) {
      const s = e.target.closest('.slide');
      if (s) {
        current = parseInt(s.getAttribute('data-index'), 10);
        toggleOverview();
        go(current);
      }
    }
  });

  // Touch swipe
  let touchStartX = null;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX = null;
  });

  window.addEventListener('resize', fitToViewport);
  fitToViewport();

  // Read deep link
  const fromHash = parseInt(location.hash.replace('#', ''), 10);
  go(isNaN(fromHash) ? 0 : fromHash - 1, { skipHash: true });

  // Show hint briefly on load
  poke();
  setTimeout(() => hint.style.opacity = '0', 4000);
})();
