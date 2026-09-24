(() => {
  'use strict';

  const SPEED = 1;
  const EASE_BEZIER = 'cubic-bezier(.77,0,.18,1)';

  const q = (s) => document.querySelector(s);
  const qa = (s) => [...document.querySelectorAll(s)];
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const looks = [
    { n: '01', src: 'assets/look-01.webp', views: ['assets/look-01.webp', 'assets/look-01-b.webp', 'assets/look-01-c.webp'], name: 'Ombra', mat: 'Tessuto opaco alta qualità · spalle scolpite', price: '€ 390', desc: 'Mini dress couture nero, dalla silhouette netta e architettonica. Vita stretta, spalle scolpite, gonna corta leggermente svasata in tessuto nero opaco di alta qualità. Elegante, deciso e contemporaneo.', note: 'Rifinito a mano da un’unica sarta, dall’inizio alla fine.' },
    { n: '02', src: 'assets/look-02.webp', views: ['assets/look-02.webp', 'assets/look-02-b.webp', 'assets/look-02-c.webp'], name: 'Nocturne', mat: 'Velluto · corsetto e pantalone palazzo', price: '€ 490', desc: 'Completo composto da corsetto nero aderente e pantalone palazzo in velluto. Il contrasto tra il bustino strutturato e il movimento morbido del pantalone crea una silhouette sofisticata e sensuale.', note: 'Il velluto è lavorato a temperatura controllata, per non perdere la profondità del nero.' },
    { n: '03', src: 'assets/look-03.webp', views: ['assets/look-03.webp', 'assets/look-03-b.webp', 'assets/look-03-c.webp'], name: 'Eclissi', mat: 'Seta nera · drappeggio monospalla', price: '€ 590', desc: 'Abito lungo in seta nera, caratterizzato da una sola spalla e da un drappeggio diagonale che attraversa il busto. La gonna cade morbida e fluida, creando movimento senza bisogno di decorazioni.', note: 'Il drappeggio è annodato a mano, mai cucito: cade in modo diverso su ogni corpo.' },
    { n: '04', src: 'assets/look-04.webp', views: ['assets/look-04.webp', 'assets/look-04-b.webp', 'assets/look-04-c.webp'], name: 'Venere', mat: 'Bustino sagomato · schiena scoperta', price: '€ 690', desc: 'Abito lungo nero estremamente femminile. Bustino sagomato, vita definita, schiena completamente scoperta e gonna morbida con un leggero strascico. Un capo sensuale ma raffinato.', note: 'Il bustino è costruito su un unico stampo, calibrato sul corpo di chi lo indossa.' },
    { n: '05', src: 'assets/look-05.webp', views: ['assets/look-05.webp', 'assets/look-05-b.webp', 'assets/look-05-c.webp'], name: 'Corvo', mat: 'Piume nere · costruzione scultorea', price: '€ 890', desc: 'Il primo vero pezzo statement della collezione. Abito lungo nero aderente, estremamente elegante, con una costruzione di piume nere che nasce dalle spalle e segue il busto, aumentando gradualmente il volume.', note: 'Le piume sono selezionate e cucite a mano, una a una.' },
    { n: '06', src: 'assets/look-06.webp', views: ['assets/look-06.webp', 'assets/look-06-b.webp', 'assets/look-06-c.webp'], name: 'Obsidian Wing', mat: 'Piume e tessuto strutturato · ala scenografica', price: '€ 1.290', desc: "Il capo simbolo di Ossidiana. Abito nero aderente, minimal nella parte centrale, con una gigantesca struttura laterale che si apre dal fianco e dalla schiena come un'ala. Piume nere e tessuto strutturato costruiscono una forma scenografica, quasi scultorea.", note: 'La struttura laterale richiede oltre sessanta ore di lavorazione a mano.' }
  ];

  const caldera = {
    src: 'assets/materia-bg-b.webp',
    views: ['assets/materia-bg-b.webp', 'assets/materia-bg-c.webp'],
    name: 'Caldera',
    mat: 'Corsetto in ossidiana sfaccettata · gonna in seta e lava solidificata',
    price: '€ 3.200 — Su appuntamento',
    desc: 'Corsetto scolpito a mano in ossidiana sfaccettata, vetro vulcanico nero. La gonna in seta si scioglie alla base in lava solidificata — solo pietra e seta, nessun tessuto aggiuntivo. Non verrà replicato.',
    note: 'Pezzo unico, esemplare 1/1: nessun secondo esemplare sarà mai realizzato.'
  };

  const chapters = [
    ['hero', 'Notte'],
    ['manifesto', 'Manifesto'],
    ['collezione', 'La collezione'],
    ['velluto', 'Materia'],
    ['atelier', 'Atelier']
  ];

  const manifestoWords = "Ossidiana nasce quando la lava incontra l'aria e si raffredda in un istante. Disegniamo abiti allo stesso modo: pochi gesti, materia densa, nessun rumore.".split(' ');

  const infoPages = {
    taglie: {
      eyebrow: 'GUIDA ALLE TAGLIE',
      title: 'Non esiste una taglia Ossidiana.',
      body: [
        'Ogni abito è costruito su misura, non scelto da una taglia standard. I numeri che vedi accanto ai prezzi sono solo un riferimento di partenza per la prima prova.',
        'Le misure vengono prese di persona in atelier, durante l’appuntamento: busto, vita, fianchi e lunghezza sono calibrati sul corpo di chi indossa il capo.',
        'Se necessario, fissiamo una seconda prova prima della consegna finale.'
      ]
    },
    termini: {
      eyebrow: 'TERMINI E CONDIZIONI',
      title: 'Come funziona un ordine Ossidiana.',
      body: [
        'Ogni capo è realizzato su richiesta dopo una prova in atelier: i prezzi indicati sul sito sono di partenza e possono variare in base alle modifiche concordate durante la prova.',
        'Il pagamento avviene in salone, al momento della conferma, non online.',
        'Trattandosi di capi realizzati su misura, non sono previsti resi salvo difetti di lavorazione.',
        'Per qualsiasi richiesta su un ordine in corso, scrivici dal modulo "Prenota una prova" indicando il capo di interesse.'
      ]
    },
    privacy: {
      eyebrow: 'PRIVACY POLICY',
      title: 'Come trattiamo i tuoi dati.',
      body: [
        'Ossidiana S.r.l. raccoglie nome ed email solo quando li lasci tu, tramite il modulo di prenotazione o l’iscrizione alla newsletter.',
        'Li usiamo esclusivamente per gestire la tua richiesta di appuntamento e, se hai scelto di iscriverti, per inviarti aggiornamenti dall’atelier.',
        'Non condividiamo i tuoi dati con terzi per finalità commerciali.',
        'Puoi chiedere la cancellazione dei tuoi dati in qualsiasi momento, scrivendoci dal modulo di contatto.'
      ]
    },
    cookie: {
      eyebrow: 'COOKIE POLICY',
      title: 'Cookie essenziali, nient’altro.',
      body: [
        'Questo sito utilizza solo cookie tecnici necessari al suo funzionamento — nessun cookie di profilazione o di terze parti.',
        'Puoi gestire o disattivare i cookie dalle impostazioni del tuo browser in qualsiasi momento.'
      ]
    }
  };

  const reviews = [
    { quote: 'Sono entrata con l’idea di un vestito, sono uscita con l’idea di un abito diverso da quello che avevo in testa. Meglio.', attr: 'Claudia B. — Milano' },
    { quote: 'Ho pianto la prima volta che me lo sono provato davanti allo specchio dell’atelier. Non me lo aspettavo.', attr: 'Sofia R. — Torino' },
    { quote: 'Ho aspettato otto mesi per Obsidian Wing. Non l’ho rimpianto un solo giorno.', attr: 'Alessandra — Roma' },
    { quote: 'Mi hanno chiesto che rumore fa la mia voce quando sono felice, non solo le misure. È lì che ho capito che non era un negozio.', attr: 'Elena F. — Milano' },
    { quote: 'L’ho indossato al matrimonio di mio fratello. Mia madre non riconosceva il tessuto: pensava fosse un vestito suo, di quando era giovane.', attr: 'Giulia — Napoli' },
    { quote: 'Non un abito comprato — un abito ascoltato.', attr: 'Marta — Milano' }
  ];

  let curCh = -1;
  let calViewDate = new Date();
  let calSelected = null;
  let fromEl = null;
  let fromRect = null;
  let overlayMode = 'flip';
  let raf = null;

  function buildManifestoWords() {
    const el = q('[data-words]');
    if (!el) return;
    el.innerHTML = manifestoWords
      .map((w) => `<span class="word">${w}</span>`)
      .join(' ');
  }

  function sectionProgress(el) {
    if (!el) return 0;
    const b = el.getBoundingClientRect();
    return clamp(-b.top / Math.max(1, b.height - window.innerHeight));
  }

  const isMobile = () => window.matchMedia('(max-width: 760px)').matches;

  function update() {
    const vh = window.innerHeight;
    const mobile = isMobile();

    // Hero, Manifesto, Collezione and Velluto use a pinned scroll-scrubbed
    // animation on desktop. On mobile that rig fights with the browser's
    // dynamic toolbar (address bar) and produces overlapping/flickering
    // layouts, so these sections run as plain static content instead —
    // see the matching @media (max-width:760px) blocks in styles.css.
    if (!mobile) {
      // Hero
      const ph = sectionProgress(q('[data-sec="hero"]'));
      const hi = q('[data-hero-img]');
      if (hi) hi.style.transform = `scale(${1.12 - .1 * ph}) translateY(${-3 * ph}%)`;
      const ht = q('[data-hero-title]');
      if (ht) { ht.style.transform = `translateY(${-ph * 140}px)`; ht.style.opacity = clamp(1 - ph * 1.6); }
      const hd = q('[data-hero-dim]');
      if (hd) hd.style.opacity = .85 + ph * .15;
      const hv = q('[data-hero-veil]');
      if (hv) hv.style.opacity = clamp((ph - .9) / .1) * .5;

      // Manifesto
      const pm = sectionProgress(q('[data-sec="manifesto"]'));
      const ws = qa('.word');
      ws.forEach((w, i) => { w.style.opacity = .12 + .88 * clamp(pm * 1.25 * ws.length - i); });
      const mi = q('[data-manifesto-img]');
      if (mi) mi.style.transform = `scale(${1.1 - .06 * pm})`;
      const mv = q('[data-manifesto-veil]');
      if (mv) mv.style.opacity = clamp(1 - pm / .05) * .5;
      const mn = q('[data-manifesto-numeral]');
      if (mn) mn.style.opacity = clamp((pm - .12) / .28);
      const me = q('[data-manifesto-eyebrow]');
      if (me) {
        const o = clamp((pm - .05) / .25);
        me.style.opacity = o;
        me.style.transform = `translateX(${(1 - o) * 24}px)`;
      }
      const mf = q('[data-manifesto-fact]');
      if (mf) {
        const o = clamp((pm - .55) / .25);
        mf.style.opacity = o;
        mf.style.transform = `translateX(${(1 - o) * 24}px)`;
      }
      const mc = q('[data-manifesto-cta]');
      if (mc) {
        const o = clamp((pm - .65) / .25);
        mc.style.opacity = o;
        mc.style.transform = `translateX(${(1 - o) * 24}px)`;
      }

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
    }

    // Chapter indicator
    // On mobile the Manifesto chapter isn't rendered inline (it lives on its
    // own page, manifesto.html), so it's dropped from the count there to
    // keep "01/02/03..." matching what the visitor actually scrolls through.
    const activeChapters = mobile ? chapters.filter(([id]) => id !== 'manifesto') : chapters;
    let cur = 0;
    activeChapters.forEach(([id], i) => {
      const el = q(`[data-sec="${id}"]`);
      if (el && el.offsetParent !== null && el.getBoundingClientRect().top <= vh * .5) cur = i;
    });
    if (cur !== curCh) {
      curCh = cur;
      const n = q('[data-ch-n]'), l = q('[data-ch-l]');
      if (n) n.textContent = '0' + (cur + 1);
      if (l) l.textContent = activeChapters[cur][1];
    }
    const chInd = q('.chapter-indicator');
    const footerEl = q('.site-footer');
    let chVisible = 1;
    if (chInd && footerEl) {
      chVisible = footerEl.getBoundingClientRect().top <= vh ? 0 : 1;
      chInd.style.transition = 'opacity .3s';
      chInd.style.opacity = chVisible;
    }
    const colProg = q('[data-collezione-progress]');
    if (colProg && chInd) {
      colProg.style.opacity = activeChapters[cur] && activeChapters[cur][0] === 'collezione' ? chVisible : 0;
      const chRect = chInd.getBoundingClientRect();
      colProg.style.left = (chRect.right + 24) + 'px';
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

  function goToPage(href, label) {
    return (e) => {
      if (e) e.preventDefault();
      const c = q('[data-curtain]');
      if (!c) { window.location.href = href; return; }
      const d = .9 * SPEED;
      const w = q('[data-wipe]');
      if (w) {
        w.textContent = label;
        w.style.transition = 'none';
        w.style.opacity = 0;
      }
      c.style.transition = 'none';
      c.style.transform = 'translateY(100%)';
      void c.offsetHeight;
      c.style.transition = `transform ${d}s ${EASE_BEZIER}`;
      c.style.transform = 'translateY(0)';
      if (w) setTimeout(() => { w.style.transition = 'opacity .4s'; w.style.opacity = 1; }, d * 600);
      setTimeout(() => { window.location.href = href; }, d * 1000 + 100);
    };
  }

  function openLook(i, e) {
    if (e) e.preventDefault();
    const card = e.currentTarget;
    const img = card.querySelector('img');
    if (!img) return;
    fromRect = card.querySelector('.look-card-media').getBoundingClientRect();
    fromEl = card;
    overlayMode = 'flip';
    const d = 1.1 * SPEED;
    const ov = q('[data-ov]'), bg = q('[data-ov-bg]'), im = q('[data-ov-img]'), pn = q('[data-ov-panel]'), cx = q('[data-ov-close]');

    document.body.style.overflow = 'hidden';
    fillOverlay(i);
    im.src = looks[i].src;
    im.alt = looks[i].name;
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
    const vw = q('[data-ov-views]');
    vw.style.transition = `opacity .6s ${d}s`;
    vw.style.opacity = 1;
  }

  function openCaldera(e) {
    if (e) e.preventDefault();
    const media = q('[data-clip]');
    fromRect = media ? media.getBoundingClientRect() : e.currentTarget.getBoundingClientRect();
    fromEl = media || e.currentTarget;
    overlayMode = 'fade';
    const d = 1.1 * SPEED;
    const ov = q('[data-ov]'), bg = q('[data-ov-bg]'), im = q('[data-ov-img]'), pn = q('[data-ov-panel]'), cx = q('[data-ov-close]');

    document.body.style.overflow = 'hidden';
    q('[data-ov-eyebrow]').textContent = 'PEZZO UNICO · ESEMPLARE 1/1';
    q('[data-ov-name]').textContent = caldera.name;
    q('[data-ov-mat]').textContent = caldera.mat;
    q('[data-ov-desc]').textContent = caldera.desc;
    q('[data-ov-note]').textContent = caldera.note;
    q('[data-ov-price]').textContent = caldera.price;
    buildOverlayViews(caldera);
    im.src = caldera.src;
    im.alt = caldera.name;

    const narrow = window.innerWidth < 800;
    const finalW = narrow ? window.innerWidth : window.innerWidth * .5;
    const finalH = narrow ? window.innerHeight * .45 : window.innerHeight;
    const originX = Math.min(100, Math.max(0, ((fromRect.left + fromRect.width / 2) / finalW) * 100));
    const originY = Math.min(100, Math.max(0, ((fromRect.top + fromRect.height / 2) / finalH) * 100));

    Object.assign(im.style, {
      transition: 'none',
      left: '0px', top: '0px',
      width: finalW + 'px', height: finalH + 'px',
      opacity: 0,
      transform: 'scale(.92)',
      transformOrigin: `${originX}% ${originY}%`
    });
    void im.offsetHeight;
    ov.style.pointerEvents = 'auto';

    Object.assign(im.style, {
      transition: `opacity ${d * .8}s, transform ${d}s ${EASE_BEZIER}`,
      opacity: 1,
      transform: 'scale(1)'
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
    const vw2 = q('[data-ov-views]');
    vw2.style.transition = `opacity .6s ${d}s`;
    vw2.style.opacity = 1;
  }

  function fillOverlay(i) {
    const l = looks[i];
    q('[data-ov-eyebrow]').textContent = `LOOK ${l.n} / ${String(looks.length).padStart(2, '0')}`;
    q('[data-ov-name]').textContent = l.name;
    q('[data-ov-mat]').textContent = l.mat;
    q('[data-ov-desc]').textContent = l.desc;
    q('[data-ov-note]').textContent = l.note;
    q('[data-ov-price]').textContent = l.price;
    buildOverlayViews(l);
  }

  function buildOverlayViews(l) {
    const el = q('[data-ov-views]');
    el.innerHTML = l.views
      .map((src, i) => `<button type="button" data-view="${i}" class="${i === 0 ? 'active' : ''}" aria-label="${l.name} — vista ${i + 1}"><img src="${src}" alt=""></button>`)
      .join('');
    qa('[data-ov-views] button').forEach((b) => {
      b.addEventListener('click', () => setActiveView(l, Number(b.dataset.view)));
    });
  }

  function setActiveView(l, i) {
    const img = q('[data-ov-img]');
    img.src = l.views[i];
    img.alt = l.name;
    qa('[data-ov-views] button').forEach((b, idx) => b.classList.toggle('active', idx === i));
  }

  function closeOverlay(e) {
    if (e) e.preventDefault();
    const d = 1 * SPEED;
    const ov = q('[data-ov]'), bg = q('[data-ov-bg]'), im = q('[data-ov-img]'), pn = q('[data-ov-panel]'), cx = q('[data-ov-close]');
    const r = fromEl ? (fromEl.querySelector('.look-card-media') || fromEl).getBoundingClientRect() : fromRect;

    Object.assign(pn.style, { transition: 'opacity .4s, transform .5s', opacity: 0, transform: 'translateY(40px)' });
    cx.style.transition = 'opacity .3s';
    cx.style.opacity = 0;
    const vw = q('[data-ov-views]');
    vw.style.transition = 'opacity .3s';
    vw.style.opacity = 0;

    setTimeout(() => {
      if (overlayMode === 'fade') {
        Object.assign(im.style, {
          transition: `opacity ${d * .8}s, transform ${d}s ${EASE_BEZIER}`,
          opacity: 0,
          transform: 'scale(.92)'
        });
      } else {
        Object.assign(im.style, {
          transition: `all ${d}s ${EASE_BEZIER}`,
          left: r.left + 'px', top: r.top + 'px',
          width: r.width + 'px', height: r.height + 'px'
        });
      }
      bg.style.transition = `opacity ${d}s`;
      bg.style.opacity = 0;
    }, 250);

    setTimeout(() => {
      const img = fromEl && fromEl.querySelector('.look-card-media img');
      if (img) img.style.opacity = 1;
      Object.assign(im.style, { transition: 'none', opacity: 0, width: '0px', height: '0px', transform: 'none' });
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

  const MONTHS_IT = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

  function sameDay(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function renderCalendar() {
    if (!q('[data-cal-grid]')) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const y = calViewDate.getFullYear(), m = calViewDate.getMonth();
    q('[data-cal-month]').textContent = `${MONTHS_IT[m]} ${y}`;

    const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const grid = q('[data-cal-grid]');
    let html = '';
    for (let i = 0; i < firstDow; i++) html += '<span></span>';
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(y, m, d);
      const isSunday = date.getDay() === 0;
      const isPast = date < today;
      const disabled = isSunday || isPast;
      const cls = [
        sameDay(date, today) ? 'is-today' : '',
        sameDay(date, calSelected) ? 'active' : ''
      ].filter(Boolean).join(' ');
      html += `<button type="button" data-day="${d}" class="${cls}" ${disabled ? 'disabled' : ''}>${d}</button>`;
    }
    grid.innerHTML = html;

    const prevDisabled = y === today.getFullYear() && m === today.getMonth();
    q('[data-cal-prev]').disabled = prevDisabled;

    qa('[data-cal-grid] button:not(:disabled)').forEach((btn) => {
      btn.addEventListener('click', () => {
        calSelected = new Date(y, m, Number(btn.dataset.day));
        renderCalendar();
      });
    });
  }

  function initPrenotaCalendar() {
    if (!q('[data-cal-grid]')) return;
    q('[data-cal-prev]').addEventListener('click', () => {
      calViewDate = new Date(calViewDate.getFullYear(), calViewDate.getMonth() - 1, 1);
      renderCalendar();
    });
    q('[data-cal-next]').addEventListener('click', () => {
      calViewDate = new Date(calViewDate.getFullYear(), calViewDate.getMonth() + 1, 1);
      renderCalendar();
    });
    renderCalendar();
  }

  function resetPrenotaCalendar() {
    calViewDate = new Date();
    calSelected = null;
    renderCalendar();
  }

  function openPrenotaModal(lookLabel) {
    const m = q('[data-prenota-modal]'), bg = q('[data-prenota-modal-bg]'), pn = q('[data-prenota-modal-panel]');
    document.body.style.overflow = 'hidden';
    m.style.pointerEvents = 'auto';
    m.style.transition = 'opacity .4s';
    m.style.opacity = 1;
    pn.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
    pn.style.transform = 'translateY(0) scale(1)';
    q('[data-prenota-modal-close]').style.opacity = 1;
    setPrenotaLook(lookLabel || '');
  }

  function closePrenotaModal(e) {
    if (e) e.preventDefault();
    const m = q('[data-prenota-modal]'), pn = q('[data-prenota-modal-panel]');
    m.style.opacity = 0;
    m.style.pointerEvents = 'none';
    pn.style.transform = 'translateY(24px) scale(.98)';
    document.body.style.overflow = '';
    closePrenotaSelect();
  }

  function initReviewStrip() {
    const strip = q('[data-review-strip]');
    if (!strip) return;
    strip.innerHTML = reviews
      .map((r) => `<figure class="storia-review-card"><blockquote>${r.quote}</blockquote><figcaption>${r.attr}</figcaption></figure>`)
      .join('');
  }

  function openInfoModal(key) {
    const page = infoPages[key];
    if (!page) return;
    q('[data-info-eyebrow]').innerHTML = `<span class="eyebrow-rule"></span>${page.eyebrow}`;
    q('[data-info-title]').textContent = page.title;
    q('[data-info-body]').innerHTML = page.body.map((p) => `<p>${p}</p>`).join('');

    const m = q('[data-info-modal]'), pn = q('[data-info-modal-panel]');
    document.body.style.overflow = 'hidden';
    m.style.pointerEvents = 'auto';
    m.style.transition = 'opacity .4s';
    m.style.opacity = 1;
    pn.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
    pn.style.transform = 'translateY(0) scale(1)';
    q('[data-info-modal-close]').style.opacity = 1;
  }

  function closeInfoModal(e) {
    if (e) e.preventDefault();
    const m = q('[data-info-modal]'), pn = q('[data-info-modal-panel]');
    m.style.opacity = 0;
    m.style.pointerEvents = 'none';
    pn.style.transform = 'translateY(24px) scale(.98)';
    document.body.style.overflow = '';
  }

  function setPrenotaLook(label) {
    const list = q('[data-prenota-select-list]');
    const match = label
      ? [...list.children].find((li) => li.dataset.value === label || li.textContent.includes(label))
      : list.children[0];
    if (match) selectPrenotaOption(match);
  }

  function selectPrenotaOption(li) {
    q('[data-prenota-select-label]').textContent = li.textContent;
    qa('[data-prenota-select-list] li').forEach((el) => el.classList.toggle('active', el === li));
    closePrenotaSelect();
  }

  function closePrenotaSelect() {
    q('[data-prenota-select]').classList.remove('is-open');
    q('[data-prenota-select-btn]').setAttribute('aria-expanded', 'false');
  }

  function initPrenotaSelect() {
    const wrap = q('[data-prenota-select]');
    const btn = q('[data-prenota-select-btn]');
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    qa('[data-prenota-select-list] li').forEach((li) => {
      li.addEventListener('click', () => selectPrenotaOption(li));
    });
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) closePrenotaSelect();
    });
  }

  function initPrenotaForm() {
    const form = q('[data-prenota-form]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Richiesta inviata ✓';
      form.reset();
      resetPrenotaCalendar();
      setPrenotaLook('');
      setTimeout(() => { btn.textContent = original; }, 3000);
      setTimeout(() => closePrenotaModal(), 1600);
    });
  }

  function initNavToggle() {
    const toggle = q('.nav-toggle');
    const nav = q('.site-nav');
    if (!toggle || !nav) return;
    const header = q('.site-header');
    const setOpen = (open) => {
      nav.classList.toggle('nav-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (header) header.classList.toggle('nav-is-open', open);
      const chInd = q('.chapter-indicator');
      if (chInd) chInd.style.visibility = open ? 'hidden' : '';
      document.body.style.overflow = open ? 'hidden' : '';
    };
    const close = () => setOpen(false);
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('nav-open')));
    qa('.site-nav a').forEach((a) => a.addEventListener('click', close));
  }

  function init() {
    buildManifestoWords();

    qa('[data-goto]').forEach((el) => {
      el.addEventListener('click', goTo(el.dataset.goto, el.dataset.label));
    });

    qa('[data-goto-page]').forEach((el) => {
      el.addEventListener('click', goToPage(el.dataset.gotoPage, el.dataset.label));
    });

    initNavToggle();

    qa('[data-look]').forEach((card) => {
      card.addEventListener('click', (e) => openLook(Number(card.dataset.look), e));
    });

    const calderaHotspot = q('[data-caldera-look]');
    if (calderaHotspot) calderaHotspot.addEventListener('click', openCaldera);

    initPrenotaCalendar();

    if (q('[data-ov-close]')) q('[data-ov-close]').addEventListener('click', closeOverlay);

    if (q('[data-ov-book]')) {
      q('[data-ov-book]').addEventListener('click', (e) => {
        e.preventDefault();
        const lookName = q('[data-ov-name]').textContent;
        closeOverlay();
        setTimeout(() => openPrenotaModal(lookName), 1400);
      });
    }

    qa('[data-prenota-open]').forEach((el) => {
      el.addEventListener('click', (e) => { e.preventDefault(); openPrenotaModal(); });
    });
    if (q('[data-prenota-modal-close]')) q('[data-prenota-modal-close]').addEventListener('click', closePrenotaModal);
    if (q('[data-prenota-modal-bg]')) q('[data-prenota-modal-bg]').addEventListener('click', closePrenotaModal);

    qa('[data-info-open]').forEach((el) => {
      el.addEventListener('click', (e) => { e.preventDefault(); openInfoModal(el.dataset.infoOpen); });
    });
    if (q('[data-info-modal-close]')) q('[data-info-modal-close]').addEventListener('click', closeInfoModal);
    if (q('[data-info-modal-bg]')) q('[data-info-modal-bg]').addEventListener('click', closeInfoModal);

    initNewsletterForm();
    initPrenotaForm();
    initPrenotaSelect();
    initReviewStrip();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const c = q('[data-curtain]');
    const reveal = () => qa('[data-hero-in]').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });

    if (!c) { reveal(); return; }

    if (reduced) {
      c.style.transform = 'translateY(-100%)';
      reveal();
      return;
    }

    const INTRO_KEY = 'ossidiana_intro_seen';
    const letters = qa('[data-l]');
    if (letters.length && !sessionStorage.getItem(INTRO_KEY)) {
      sessionStorage.setItem(INTRO_KEY, '1');
      setTimeout(() => {
        letters.forEach((el, i) => {
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
    } else {
      setTimeout(() => {
        c.style.transition = `transform ${1 * SPEED}s ${EASE_BEZIER}`;
        c.style.transform = 'translateY(-100%)';
        const w = q('[data-wipe]');
        if (w) { w.style.transition = 'opacity .3s'; w.style.opacity = 0; }
        setTimeout(reveal, 400 * SPEED);
      }, 250);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
