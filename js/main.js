(() => {
  'use strict';

  const q = (s, root = document) => root.querySelector(s);
  const qa = (s, root = document) => [...root.querySelectorAll(s)];

  const looks = [
    { n: '01', views: ['assets/look-01.webp', 'assets/look-01-b.webp', 'assets/look-01-c.webp'], name: 'Ombra', mat: 'Tessuto opaco alta qualità · spalle scolpite', price: '€ 390', desc: 'Mini dress couture nero, dalla silhouette netta e architettonica. Vita stretta, spalle scolpite, gonna corta leggermente svasata in tessuto nero opaco di alta qualità. Elegante, deciso e contemporaneo.', note: 'Rifinito a mano da un’unica sarta, dall’inizio alla fine.' },
    { n: '02', views: ['assets/look-02.webp', 'assets/look-02-b.webp', 'assets/look-02-c.webp'], name: 'Nocturne', mat: 'Velluto · corsetto e pantalone palazzo', price: '€ 490', desc: 'Completo composto da corsetto nero aderente e pantalone palazzo in velluto. Il contrasto tra il bustino strutturato e il movimento morbido del pantalone crea una silhouette sofisticata e sensuale.', note: 'Il velluto è lavorato a temperatura controllata, per non perdere la profondità del nero.' },
    { n: '03', views: ['assets/look-03.webp', 'assets/look-03-b.webp', 'assets/look-03-c.webp'], name: 'Eclissi', mat: 'Seta nera · drappeggio monospalla', price: '€ 590', desc: 'Abito lungo in seta nera, caratterizzato da una sola spalla e da un drappeggio diagonale che attraversa il busto. La gonna cade morbida e fluida, creando movimento senza bisogno di decorazioni.', note: 'Il drappeggio è annodato a mano, mai cucito: cade in modo diverso su ogni corpo.' },
    { n: '04', views: ['assets/look-04.webp', 'assets/look-04-b.webp', 'assets/look-04-c.webp'], name: 'Venere', mat: 'Bustino sagomato · schiena scoperta', price: '€ 690', desc: 'Abito lungo nero estremamente femminile. Bustino sagomato, vita definita, schiena completamente scoperta e gonna morbida con un leggero strascico. Un capo sensuale ma raffinato.', note: 'Il bustino è costruito su un unico stampo, calibrato sul corpo di chi lo indossa.' },
    { n: '05', views: ['assets/look-05.webp', 'assets/look-05-b.webp', 'assets/look-05-c.webp'], name: 'Corvo', mat: 'Piume nere · costruzione scultorea', price: '€ 890', desc: 'Il primo vero pezzo statement della collezione. Abito lungo nero aderente, estremamente elegante, con una costruzione di piume nere che nasce dalle spalle e segue il busto, aumentando gradualmente il volume.', note: 'Le piume sono selezionate e cucite a mano, una a una.' },
    { n: '06', views: ['assets/look-06.webp', 'assets/look-06-b.webp', 'assets/look-06-c.webp'], name: 'Obsidian Wing', mat: 'Piume e tessuto strutturato · ala scenografica', price: '€ 1.290', desc: "Il capo simbolo di Ossidiana. Abito nero aderente, minimal nella parte centrale, con una gigantesca struttura laterale che si apre dal fianco e dalla schiena come un'ala. Piume nere e tessuto strutturato costruiscono una forma scenografica, quasi scultorea.", note: 'La struttura laterale richiede oltre sessanta ore di lavorazione a mano.' }
  ];

  const caldera = {
    label: 'Pezzo unico · esemplare 1/1',
    views: ['assets/materia-bg-b.webp', 'assets/materia-bg-c.webp'],
    name: 'Caldera',
    ratio: .75,
    mat: 'Corsetto in ossidiana sfaccettata · gonna in seta e lava solidificata',
    price: '€ 3.200 — su appuntamento',
    desc: 'Corsetto scolpito a mano in ossidiana sfaccettata, vetro vulcanico nero. La gonna in seta si scioglie alla base in lava solidificata — solo pietra e seta, nessun tessuto aggiuntivo. Non verrà replicato.',
    note: 'Pezzo unico, esemplare 1/1: nessun secondo esemplare sarà mai realizzato.'
  };

  const infoPages = {
    taglie: {
      label: 'Guida alle taglie',
      title: 'Non esiste una taglia Ossidiana.',
      body: [
        'Ogni abito è costruito su misura, non scelto da una taglia standard. I prezzi indicati sono il punto di partenza per la prima prova.',
        'Le misure vengono prese di persona in atelier, durante l’appuntamento: busto, vita, fianchi e lunghezza sono calibrati sul corpo di chi indossa il capo.',
        'Se necessario, fissiamo una seconda prova prima della consegna finale.'
      ]
    },
    termini: {
      label: 'Termini e condizioni',
      title: 'Come funziona un ordine Ossidiana.',
      body: [
        'Ogni capo è realizzato su richiesta dopo una prova in atelier: i prezzi indicati sul sito sono di partenza e possono variare in base alle modifiche concordate durante la prova.',
        'Il pagamento avviene in atelier, al momento della conferma, non online.',
        'Trattandosi di capi realizzati su misura, non sono previsti resi salvo difetti di lavorazione.',
        'Per qualsiasi richiesta su un ordine in corso, scrivici dal modulo "Prenota una prova" indicando il capo di interesse.'
      ]
    },
    privacy: {
      label: 'Privacy policy',
      title: 'Come trattiamo i tuoi dati.',
      body: [
        'Ossidiana S.r.l. raccoglie nome ed email solo quando li lasci tu, tramite il modulo di prenotazione o l’iscrizione alla newsletter.',
        'Li usiamo esclusivamente per gestire la tua richiesta di appuntamento e, se hai scelto di iscriverti, per inviarti aggiornamenti dall’atelier.',
        'Non condividiamo i tuoi dati con terzi per finalità commerciali.',
        'Puoi chiedere la cancellazione dei tuoi dati in qualsiasi momento, scrivendoci dal modulo di contatto.'
      ]
    },
    cookie: {
      label: 'Cookie policy',
      title: 'Cookie essenziali, nient’altro.',
      body: [
        'Questo sito utilizza solo cookie tecnici necessari al suo funzionamento — nessun cookie di profilazione o di terze parti.',
        'Puoi gestire o disattivare i cookie dalle impostazioni del tuo browser in qualsiasi momento.'
      ]
    }
  };

  const MONTHS_IT = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

  /* ---------- Scroll lock (iOS ignora overflow:hidden sul solo body) ---------- */

  let locks = 0;
  function lockScroll(on) {
    locks = Math.max(0, locks + (on ? 1 : -1));
    const v = locks > 0 ? 'hidden' : '';
    document.documentElement.style.overflow = v;
    document.body.style.overflow = v;
  }

  /* ---------- Finestre ---------- */

  function buildModals() {
    const lookOptions = looks.map((l) => `<option>${l.n} — ${l.name}</option>`).join('') +
      '<option>Caldera — pezzo unico</option>';

    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal" data-modal="look" role="dialog" aria-modal="true" aria-labelledby="sheet-name">
        <div class="modal-bg" data-close></div>
        <div class="look-sheet">
          <button type="button" class="modal-close" data-close>Chiudi ✕</button>
          <div class="sheet-media">
            <img data-sheet-img alt="">
            <div class="sheet-views" data-sheet-views></div>
          </div>
          <div class="sheet-body">
            <span class="label" data-sheet-label></span>
            <h2 class="title" id="sheet-name" data-sheet-name></h2>
            <div class="sheet-mat" data-sheet-mat></div>
            <div class="sheet-price" data-sheet-price></div>
            <p class="text" data-sheet-desc></p>
            <div class="sheet-note"><span>Nota dell'atelier</span><div data-sheet-note></div></div>
            <p class="sheet-small">Su misura — le misure si prendono in atelier, durante la prova.</p>
            <button type="button" class="btn" data-sheet-book>Richiedi appuntamento</button>
            <p class="sheet-small">Eventuali modifiche al capo (lunghezza, vestibilità, dettagli) concordate in prova comportano un costo aggiuntivo, comunicato prima del pagamento in atelier.</p>
          </div>
        </div>
      </div>

      <div class="modal" data-modal="prenota" role="dialog" aria-modal="true" aria-labelledby="prenota-title">
        <div class="modal-bg" data-close></div>
        <div class="modal-panel">
          <button type="button" class="modal-close" data-close>Chiudi ✕</button>
          <span class="label">Prenotazione</span>
          <h2 class="title" id="prenota-title">Richiedi la tua <i>prova</i>.</h2>
          <p class="text">Lasciaci i tuoi dati: confermiamo data e ora in atelier entro 24 ore.</p>
          <form class="form" data-prenota-form novalidate>
            <div class="form-row">
              <label class="field">Nome e cognome<input type="text" name="nome" autocomplete="name" required></label>
              <label class="field">Email<input type="email" name="email" autocomplete="email" required></label>
            </div>
            <label class="field">Capo di interesse
              <select name="capo" data-prenota-capo><option value="">Nessuna preferenza</option>${lookOptions}</select>
            </label>
            <div class="field">
              <span>Giorno preferito <small>(domenica chiuso)</small></span>
              <div class="cal">
                <div class="cal-head">
                  <button type="button" class="cal-nav" data-cal-prev aria-label="Mese precedente">‹</button>
                  <span data-cal-month aria-live="polite"></span>
                  <button type="button" class="cal-nav" data-cal-next aria-label="Mese successivo">›</button>
                </div>
                <div class="cal-dow" aria-hidden="true"><span>L</span><span>M</span><span>M</span><span>G</span><span>V</span><span>S</span><span>D</span></div>
                <div class="cal-grid" data-cal-grid></div>
              </div>
            </div>
            <label class="field"><span>Messaggio <small>(opzionale)</small></span><textarea name="messaggio" rows="3"></textarea></label>
            <button type="submit" class="btn">Invia richiesta</button>
            <p class="form-note" data-form-note>Sito dimostrativo: la richiesta non viene inviata.</p>
          </form>
        </div>
      </div>

      <div class="modal" data-modal="info" role="dialog" aria-modal="true" aria-labelledby="info-title">
        <div class="modal-bg" data-close></div>
        <div class="modal-panel">
          <button type="button" class="modal-close" data-close>Chiudi ✕</button>
          <span class="label" data-info-label></span>
          <h2 class="title" id="info-title" data-info-title></h2>
          <div class="info-body" data-info-body></div>
        </div>
      </div>
    `);
  }

  let openModalEl = null;
  let lastFocus = null;

  function openModal(name) {
    const m = q(`[data-modal="${name}"]`);
    if (!m) return;
    if (openModalEl) closeModal(true);
    lastFocus = document.activeElement;
    openModalEl = m;
    m.classList.add('is-open');
    lockScroll(true);
    const scroller = q('.look-sheet', m) || q('.modal-panel', m);
    if (scroller) scroller.scrollTop = 0;
    const body = q('.sheet-body', m);
    if (body) body.scrollTop = 0;
    setTimeout(() => { const c = q('.modal-close', m); if (c) c.focus({ preventScroll: true }); }, 50);
  }

  function closeModal(silent) {
    if (!openModalEl) return;
    openModalEl.classList.remove('is-open');
    openModalEl = null;
    lockScroll(false);
    if (!silent && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  /* ---------- Scheda abito ---------- */

  function showLook(item, label) {
    q('[data-sheet-label]').textContent = label;
    q('[data-sheet-name]').textContent = item.name;
    q('[data-sheet-mat]').textContent = item.mat;
    q('[data-sheet-price]').textContent = item.price;
    q('[data-sheet-desc]').textContent = item.desc;
    q('[data-sheet-note]').textContent = item.note;
    q('.look-sheet').style.setProperty('--r', item.ratio || 2 / 3);
    const img = q('[data-sheet-img]');
    img.src = item.views[0];
    img.alt = item.name;
    const views = q('[data-sheet-views]');
    views.innerHTML = item.views
      .map((src, i) => `<button type="button" class="${i === 0 ? 'active' : ''}" aria-label="${item.name}, vista ${i + 1}"><img src="${src}" alt=""></button>`)
      .join('');
    qa('button', views).forEach((b, i) => b.addEventListener('click', () => {
      img.src = item.views[i];
      qa('button', views).forEach((x, j) => x.classList.toggle('active', j === i));
    }));
    q('[data-sheet-book]').dataset.capo = item === caldera ? 'Caldera — pezzo unico' : `${item.n} — ${item.name}`;
    openModal('look');
  }

  /* ---------- Prenotazione ---------- */

  let calView = new Date();
  let calSelected = null;

  const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  function renderCalendar() {
    const grid = q('[data-cal-grid]');
    if (!grid) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const y = calView.getFullYear(), m = calView.getMonth();
    q('[data-cal-month]').textContent = `${MONTHS_IT[m]} ${y}`;
    const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;
    const days = new Date(y, m + 1, 0).getDate();
    let html = '<span></span>'.repeat(firstDow);
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, m, d);
      const disabled = date.getDay() === 0 || date <= today;
      const cls = [sameDay(date, today) ? 'is-today' : '', sameDay(date, calSelected) ? 'active' : ''].join(' ').trim();
      html += `<button type="button" data-day="${d}" class="${cls}" aria-label="${d} ${MONTHS_IT[m]}"${disabled ? ' disabled' : ''}${sameDay(date, calSelected) ? ' aria-pressed="true"' : ''}>${d}</button>`;
    }
    grid.innerHTML = html;
    q('[data-cal-prev]').disabled = y === today.getFullYear() && m === today.getMonth();
    qa('button:not(:disabled)', grid).forEach((b) => b.addEventListener('click', () => {
      calSelected = new Date(y, m, Number(b.dataset.day));
      renderCalendar();
    }));
  }

  function initPrenota() {
    q('[data-cal-prev]').addEventListener('click', () => { calView = new Date(calView.getFullYear(), calView.getMonth() - 1, 1); renderCalendar(); });
    q('[data-cal-next]').addEventListener('click', () => { calView = new Date(calView.getFullYear(), calView.getMonth() + 1, 1); renderCalendar(); });
    renderCalendar();

    const form = q('[data-prenota-form]');
    const note = q('[data-form-note]');
    const defaultNote = note.textContent;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const missing = qa('[required]', form).find((el) => !el.value.trim() || (el.type === 'email' && !el.checkValidity()));
      if (missing) {
        note.textContent = missing.type === 'email' ? 'Inserisci un indirizzo email valido.' : 'Inserisci nome e cognome.';
        missing.focus();
        return;
      }
      const btn = q('button[type="submit"]', form);
      btn.textContent = 'Richiesta ricevuta ✓';
      btn.disabled = true;
      note.textContent = 'Grazie. In un sito reale riceveresti conferma entro 24 ore.';
      setTimeout(() => {
        form.reset();
        calSelected = null;
        calView = new Date();
        renderCalendar();
        btn.textContent = 'Invia richiesta';
        btn.disabled = false;
        note.textContent = defaultNote;
        closeModal();
      }, 2200);
    });
  }

  function openPrenota(capo) {
    const sel = q('[data-prenota-capo]');
    if (sel) sel.value = capo || '';
    openModal('prenota');
  }

  function openInfo(key) {
    const p = infoPages[key];
    if (!p) return;
    q('[data-info-label]').textContent = p.label;
    q('[data-info-title]').textContent = p.title;
    q('[data-info-body]').innerHTML = p.body.map((t) => `<p>${t}</p>`).join('');
    openModal('info');
  }

  /* ---------- Header e menu ---------- */

  function initHeader() {
    const header = q('.site-header');
    if (!header) return;
    const sync = () => header.classList.toggle('is-solid', window.scrollY > 24);
    window.addEventListener('scroll', sync, { passive: true });
    sync();

    const toggle = q('.nav-toggle');
    const panel = q('.menu-panel');
    if (!toggle || !panel) return;
    const setOpen = (open) => {
      if (panel.classList.contains('is-open') === open) return;
      panel.classList.toggle('is-open', open);
      header.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Chiudi' : 'Menu';
      lockScroll(open);
    };
    toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
    qa('a', panel).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('resize', () => { if (window.innerWidth > 900) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    // Safari ripristina la pagina dalla cache con il menu ancora aperto
    window.addEventListener('pageshow', (e) => { if (e.persisted) setOpen(false); });
  }

  /* ---------- Comparsa morbida ---------- */

  function initReveal() {
    const els = qa('[data-reveal]');
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Striscia foto ---------- */

  function initStrip() {
    const strip = q('[data-strip]');
    if (!strip) return;
    const items = qa('.strip-item', strip);
    const prev = q('[data-strip-prev]'), next = q('[data-strip-next]'), count = q('[data-strip-count]');
    // indice della foto allineata a sinistra (o l'ultima, a fine corsa)
    const current = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      if (strip.scrollLeft >= max - 4) return items.length - 1;
      const pad = parseFloat(getComputedStyle(strip).paddingLeft) || 0;
      let idx = 0;
      items.forEach((it, i) => { if (it.offsetLeft - pad <= strip.scrollLeft + 4) idx = i; });
      return idx;
    };
    const sync = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      prev.disabled = strip.scrollLeft <= 4;
      next.disabled = strip.scrollLeft >= max - 4;
      count.textContent = `${current() + 1} / ${items.length}`;
    };
    const go = (dir) => {
      const i = Math.min(items.length - 1, Math.max(0, current() + dir));
      const pad = parseFloat(getComputedStyle(strip).paddingLeft) || 0;
      strip.scrollTo({ left: items[i].offsetLeft - pad, behavior: 'smooth' });
    };
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    strip.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });
    strip.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  function initNewsletter() {
    qa('[data-newsletter-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = q('button', form);
        btn.textContent = 'Grazie ✓';
        form.reset();
        setTimeout(() => { btn.textContent = 'Iscriviti'; }, 2500);
      });
    });
  }

  function init() {
    buildModals();
    initHeader();
    initReveal();
    initPrenota();
    initNewsletter();
    initStrip();

    qa('[data-look]').forEach((el) => el.addEventListener('click', (e) => {
      e.preventDefault();
      const l = looks[Number(el.dataset.look)];
      showLook(l, `Look ${l.n} / ${String(looks.length).padStart(2, '0')}`);
    }));
    qa('[data-caldera]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); showLook(caldera, caldera.label); }));

    qa('[data-prenota]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); openPrenota(el.dataset.capo); }));
    q('[data-sheet-book]').addEventListener('click', (e) => openPrenota(e.currentTarget.dataset.capo));
    qa('[data-info]').forEach((el) => el.addEventListener('click', (e) => { e.preventDefault(); openInfo(el.dataset.info); }));

    qa('[data-close]').forEach((el) => el.addEventListener('click', () => closeModal()));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
