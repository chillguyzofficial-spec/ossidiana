(() => {
  'use strict';

  const SPEED = 1;
  const EASE_BEZIER = 'cubic-bezier(.77,0,.18,1)';

  const q = (s) => document.querySelector(s);
  const qa = (s) => [...document.querySelectorAll(s)];
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const looks = [
    { n: '01', src: 'assets/look-01.webp', name: 'Ombra', mat: 'Tessuto opaco alta qualità · spalle scolpite', price: '€ 390', desc: 'Mini dress couture nero, dalla silhouette netta e architettonica. Vita stretta, spalle scolpite, gonna corta leggermente svasata in tessuto nero opaco di alta qualità. Elegante, deciso e contemporaneo.' },
    { n: '02', src: 'assets/look-02.webp', name: 'Nocturne', mat: 'Velluto · corsetto e pantalone palazzo', price: '€ 490', desc: 'Completo composto da corsetto nero aderente e pantalone palazzo in velluto. Il contrasto tra il bustino strutturato e il movimento morbido del pantalone crea una silhouette sofisticata e sensuale.' },
    { n: '03', src: 'assets/look-03.webp', name: 'Eclissi', mat: 'Seta nera · drappeggio monospalla', price: '€ 590', desc: 'Abito lungo in seta nera, caratterizzato da una sola spalla e da un drappeggio diagonale che attraversa il busto. La gonna cade morbida e fluida, creando movimento senza bisogno di decorazioni.' },
    { n: '04', src: 'assets/look-04.webp', name: 'Venere', mat: 'Bustino sagomato · schiena scoperta', price: '€ 690', desc: 'Abito lungo nero estremamente femminile. Bustino sagomato, vita definita, schiena completamente scoperta e gonna morbida con un leggero strascico. Un capo sensuale ma raffinato.' },
    { n: '05', src: 'assets/look-05.webp', name: 'Corvo', mat: 'Piume nere · costruzione scultorea', price: '€ 890', desc: 'Il primo vero pezzo statement della collezione. Abito lungo nero aderente, estremamente elegante, con una costruzione di piume nere che nasce dalle spalle e segue il busto, aumentando gradualmente il volume.' },
    { n: '06', src: 'assets/look-06.webp', name: 'Obsidian Wing', mat: 'Piume e tessuto strutturato · ala scenografica', price: '€ 1.290', desc: "Il capo simbolo di Ossidiana. Abito nero aderente, minimal nella parte centrale, con una gigantesca struttura laterale che si apre dal fianco e dalla schiena come un'ala. Piume nere e tessuto strutturato costruiscono una forma scenografica, quasi scultorea." }
  ];

  const chapters = [
    ['hero', 'Notte'],
    ['manifesto', 'Manifesto'],
    ['collezione', 'La collezione'],
    ['velluto', 'Materia'],
    ['atelier', 'Atelier']
  ];

  const manifestoWords = "Ossidiana nasce quando la lava incontra l'aria e si raffredda in un istante. Disegniamo abiti allo stesso modo: pochi gesti, materia densa, nessun rumore.".split(' ');

  let curCh = -1;
  let currentSize = 1;
  let fromEl = null;
  let fromRect = null;
  let raf = null;

  function buildManifestoWords() {
    const el = q('[data-words]');
    el.innerHTML = manifestoWords
      .map((w) => `<span class="word">${w}</span>`)
      .join(' ');
  }

  function sectionProgress(el) {
    if (!el) return 0;
    const b = el.getBoundingClientRect();
    return clamp(-b.top / Math.max(1, b.height - window.innerHeight));
  }

  function update() {
    const vh = window.innerHeight;

    // Hero
    const ph = sectionProgress(q('[data-sec="hero"]'));
    const hi = q('[data-hero-img]');
    if (hi) hi.style.transform = `scale(${1.12 - .1 * ph}) translateY(${-3 * ph}%)`;
    const ht = q('[data-hero-title]');
    if (ht) { ht.style.transform = `translateY(${-ph * 140}px)`; ht.style.opacity = clamp(1 - ph * 1.6); }
    const hd = q('[data-hero-dim]');
    if (hd) hd.style.opacity = .85 + ph * .15;

    // Manifesto
    const pm = sectionProgress(q('[data-sec="manifesto"]'));
    const ws = qa('.word');
    ws.forEach((w, i) => { w.style.opacity = .12 + .88 * clamp(pm * 1.25 * ws.length - i); });

    // Collezione
    const pc = sectionProgress(q('[data-sec="collezione"]'));
    const tr = q('[data-track]');
    if (tr) tr.style.transform = `translate3d(${-pc * Math.max(0, tr.scrollWidth - window.innerWidth)}px,0,0)`;
    const pars = qa('[data-par]');
    pars.forEach((im, i) => {
      im.style.transform = `scale(1.18) translateX(${(pc - (i + 1) / (pars.length + 1)) * -12}%)`;
    });
    const bar = q('[data-bar]');
    if (bar) bar.style.transform = `scaleX(${pc})`;

    // Velluto
    const pv = sectionProgress(q('[data-sec="velluto"]'));
    const e = ease(clamp(pv / .6));
    const clip = q('[data-clip]');
    if (clip) clip.style.clipPath = `inset(${22 * (1 - e)}% ${36 * (1 - e)}% ${22 * (1 - e)}% ${36 * (1 - e)}%)`;
    const ci = q('[data-clip-img]');
    if (ci) ci.style.transform = `scale(${1.3 - .3 * e})`;
    const cp = q('[data-clip-pre]');
    if (cp) { cp.style.opacity = clamp(1 - e * 1.5); cp.style.letterSpacing = `${e * .3}em`; }
    const ct = q('[data-clip-text]');
    if (ct) {
      const o = clamp((pv - .55) / .2);
      ct.style.opacity = o;
      ct.style.transform = `translateY(${-40 - (1 - o) * -8}%)`;
    }

    // Chapter indicator
    let cur = 0;
    chapters.forEach(([id], i) => {
      const el = q(`[data-sec="${id}"]`);
      if (el && el.getBoundingClientRect().top <= vh * .5) cur = i;
    });
    if (cur !== curCh) {
      curCh = cur;
      const n = q('[data-ch-n]'), l = q('[data-ch-l]');
      if (n) n.textContent = '0' + (cur + 1);
      if (l) l.textContent = chapters[cur][1];
    }
  }

  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = null; update(); });
  }

  function goTo(id, label) {
    return (e) => {
      if (e) e.preventDefault();
      const c = q('[data-curtain]'), el = q(`[data-sec="${id}"]`);
      if (!c || !el) return;
      const d = .9 * SPEED;
      const w = q('[data-wipe]');
      w.textContent = label;
      const intro = q('[data-intro]');
      if (intro) intro.style.opacity = 0;
      w.style.transition = 'opacity .5s';
      w.style.opacity = 0;
      c.style.transition = 'none';
      c.style.transform = 'translateY(100%)';
      void c.offsetHeight;
      c.style.transition = `transform ${d}s ${EASE_BEZIER}`;
      c.style.transform = 'translateY(0)';
      setTimeout(() => { w.style.opacity = 1; }, d * 600);
      setTimeout(() => {
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
        update();
        setTimeout(() => { w.style.opacity = 0; c.style.transform = 'translateY(-100%)'; }, 450 * SPEED);
      }, d * 1000 + 150);
    };
  }

  function openLook(i, e) {
    if (e) e.preventDefault();
    const card = e.currentTarget;
    const img = card.querySelector('img');
    if (!img) return;
    fromRect = card.querySelector('.look-card-media').getBoundingClientRect();
    fromEl = card;
    const d = 1.1 * SPEED;
    const ov = q('[data-ov]'), bg = q('[data-ov-bg]'), im = q('[data-ov-img]'), pn = q('[data-ov-panel]'), cx = q('[data-ov-close]');

    document.body.style.overflow = 'hidden';
    fillOverlay(i);
    im.src = looks[i].src;
    Object.assign(im.style, {
      transition: 'none',
      left: fromRect.left + 'px', top: fromRect.top + 'px',
      width: fromRect.width + 'px', height: fromRect.height + 'px',
      opacity: 1
    });
    card.querySelector('.look-card-media img').style.opacity = 0;
    void im.offsetHeight;
    ov.style.pointerEvents = 'auto';

    const narrow = window.innerWidth < 800;
    Object.assign(im.style, {
      transition: `all ${d}s ${EASE_BEZIER}`,
      left: '0px', top: '0px',
      width: narrow ? '100vw' : '50vw',
      height: narrow ? '45vh' : '100vh'
    });
    bg.style.transition = `opacity ${d * .8}s`;
    bg.style.opacity = 1;
    Object.assign(pn.style, {
      width: narrow ? '100vw' : '50vw',
      top: narrow ? '38vh' : '0',
      transition: `opacity .8s ${d * .7}s, transform 1s ${d * .7}s ${EASE_BEZIER}`,
      opacity: 1,
      transform: 'none'
    });
    cx.style.transition = `opacity .6s ${d}s`;
    cx.style.opacity = 1;
  }

  function fillOverlay(i) {
    const l = looks[i];
    q('[data-ov-eyebrow]').textContent = `LOOK ${l.n} / ${String(looks.length).padStart(2, '0')}`;
    q('[data-ov-name]').textContent = l.name;
    q('[data-ov-mat]').textContent = l.mat;
    q('[data-ov-desc]').textContent = l.desc;
    q('[data-ov-price]').textContent = l.price;
    setActiveSize(currentSize);
  }

  function setActiveSize(i) {
    currentSize = i;
    qa('[data-ov-sizes] a').forEach((a, idx) => a.classList.toggle('active', idx === i));
  }

  function closeOverlay(e) {
    if (e) e.preventDefault();
    const d = 1 * SPEED;
    const ov = q('[data-ov]'), bg = q('[data-ov-bg]'), im = q('[data-ov-img]'), pn = q('[data-ov-panel]'), cx = q('[data-ov-close]');
    const r = fromEl ? fromEl.querySelector('.look-card-media').getBoundingClientRect() : fromRect;

    Object.assign(pn.style, { transition: 'opacity .4s, transform .5s', opacity: 0, transform: 'translateY(40px)' });
    cx.style.transition = 'opacity .3s';
    cx.style.opacity = 0;

    setTimeout(() => {
      Object.assign(im.style, {
        transition: `all ${d}s ${EASE_BEZIER}`,
        left: r.left + 'px', top: r.top + 'px',
        width: r.width + 'px', height: r.height + 'px'
      });
      bg.style.transition = `opacity ${d}s`;
      bg.style.opacity = 0;
    }, 250);

    setTimeout(() => {
      const img = fromEl && fromEl.querySelector('.look-card-media img');
      if (img) img.style.opacity = 1;
      Object.assign(im.style, { transition: 'none', opacity: 0, width: '0px', height: '0px' });
      ov.style.pointerEvents = 'none';
      document.body.style.overflow = '';
    }, 250 + d * 1000);
  }

  function initNewsletterForm() {
    const form = q('[data-newsletter-form]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Grazie ✓';
      form.reset();
      setTimeout(() => { btn.textContent = original; }, 2500);
    });
  }

  function initNavToggle() {
    const toggle = q('.nav-toggle');
    const nav = q('.site-nav');
    if (!toggle || !nav) return;
    const close = () => {
      nav.classList.remove('nav-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    qa('.site-nav a').forEach((a) => a.addEventListener('click', close));
  }

  function init() {
    buildManifestoWords();

    qa('[data-goto]').forEach((el) => {
      el.addEventListener('click', goTo(el.dataset.goto, el.dataset.label));
    });

    initNavToggle();

    qa('[data-look]').forEach((card) => {
      card.addEventListener('click', (e) => openLook(Number(card.dataset.look), e));
    });

    qa('[data-ov-sizes] a').forEach((a) => {
      a.addEventListener('click', (e) => { e.preventDefault(); setActiveSize(Number(a.dataset.size)); });
    });

    q('[data-ov-close]').addEventListener('click', closeOverlay);

    initNewsletterForm();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const c = q('[data-curtain]');
    const reveal = () => qa('[data-hero-in]').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });

    if (reduced) {
      c.style.transform = 'translateY(-100%)';
      reveal();
      return;
    }

    setTimeout(() => {
      qa('[data-l]').forEach((el, i) => {
        el.style.transitionDelay = i * 70 + 'ms';
        el.style.transform = 'translateY(0)';
        el.style.opacity = 1;
      });
    }, 150);

    setTimeout(() => {
      c.style.transition = `transform ${1.2 * SPEED}s ${EASE_BEZIER}`;
      c.style.transform = 'translateY(-100%)';
      setTimeout(reveal, 500 * SPEED);
    }, 2000 * SPEED);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
