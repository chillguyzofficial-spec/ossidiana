// Genera index.html, storia.html e manifesto.html.
// Header, footer e <head> sono scritti qui una volta sola: modifica i testi
// in questo file e rilancia `node _build/build.js` dalla cartella del sito.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const V = { css: 39, js: 15 }; // cache-busting: alza quando cambi css/js

const looks = [
  ['01', 'Ombra', 'Tessuto opaco · spalle scolpite', '€ 390'],
  ['02', 'Nocturne', 'Velluto · corsetto e pantalone palazzo', '€ 490'],
  ['03', 'Eclissi', 'Seta nera · drappeggio monospalla', '€ 590'],
  ['04', 'Venere', 'Bustino sagomato · schiena scoperta', '€ 690'],
  ['05', 'Corvo', 'Piume nere · costruzione scultorea', '€ 890'],
  ['06', 'Obsidian Wing', 'Piume e tessuto strutturato · ala scenografica', '€ 1.290']
];

const reviews = [
  ['Sono entrata con l’idea di un vestito, sono uscita con l’idea di un abito diverso da quello che avevo in testa. Meglio.', 'Claudia B. — Milano'],
  ['Ho pianto la prima volta che me lo sono provato davanti allo specchio dell’atelier. Non me lo aspettavo.', 'Sofia R. — Torino'],
  ['Ho aspettato otto mesi per Obsidian Wing. Non l’ho rimpianto un solo giorno.', 'Alessandra — Roma'],
  ['Mi hanno chiesto che rumore fa la mia voce quando sono felice, non solo le misure. È lì che ho capito che non era un negozio.', 'Elena F. — Milano'],
  ['L’ho indossato al matrimonio di mio fratello. Mia madre non riconosceva il tessuto: pensava fosse un vestito suo, di quando era giovane.', 'Giulia — Napoli'],
  ['Non un abito comprato — un abito ascoltato.', 'Marta — Milano']
];

function head({ title, desc, ogDesc }) {
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#000000">

<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">

<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${ogDesc}">
<meta property="og:image" content="og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${ogDesc}">
<meta name="twitter:image" content="og-image.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Archivo:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css?v=${V.css}">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
`;
}

// page: 'home' | 'storia' | 'manifesto'
function header(page) {
  const home = page === 'home' ? '' : 'index.html';
  const cur = (p) => (page === p ? ' aria-current="page"' : '');
  const links = [
    [`${home}#collezione`, 'Collezione', ''],
    [`${home}#atelier`, 'Atelier', ''],
    ['manifesto.html', 'Manifesto', cur('manifesto')],
    ['storia.html', 'Storia', cur('storia')]
  ];
  const a = links.map(([h, t, c]) => `<a href="${h}"${c}>${t}</a>`).join('\n      ');
  return `
  <header class="site-header">
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="menu">Menu</button>
    <nav class="nav-main" aria-label="Principale">
      ${a}
    </nav>
    <a href="index.html" class="logo" aria-label="Ossidiana — home">OSSIDIANA</a>
    <div class="nav-side">
      <a href="#" data-prenota>Prenota</a>
    </div>
  </header>

  <nav class="menu-panel" id="menu" aria-label="Menu">
      ${a}
      <a href="#" data-prenota>Prenota una prova</a>
      <div class="menu-info">Via Borgonuovo, Milano<br>Lunedì – Sabato, 10:00 – 19:00<br>Solo su appuntamento</div>
  </nav>
`;
}

function footer(page) {
  const home = page === 'home' ? '' : 'index.html';
  return `
  <footer class="site-footer">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-logo">OSSIDIANA</div>
        <div class="newsletter-title">Lettere dall'atelier</div>
        <form class="newsletter-form" data-newsletter-form>
          <input type="email" name="email" placeholder="La tua email" required aria-label="La tua email">
          <button type="submit">Iscriviti</button>
        </form>
      </div>
      <div class="footer-col">
        <span class="label">Assistenza</span>
        <button type="button" data-prenota>Prenota una prova</button>
        <button type="button" data-info="taglie">Guida alle taglie</button>
        <a href="tel:+390287345521">+39 02 8734 5521</a>
      </div>
      <div class="footer-col">
        <span class="label">La maison</span>
        <a href="${home}#collezione">Collezione</a>
        <a href="manifesto.html">Manifesto</a>
        <a href="storia.html">Storia</a>
        <a href="#" rel="noopener">Instagram</a>
      </div>
      <div class="footer-col">
        <span class="label">Legale</span>
        <button type="button" data-info="termini">Termini e condizioni</button>
        <button type="button" data-info="privacy">Privacy policy</button>
        <button type="button" data-info="cookie">Cookie policy</button>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Ossidiana S.r.l.</span>
      <span>Via Borgonuovo · 20121 Milano (MI) · P.IVA IT 12345678901 · REA MI-2284591</span>
    </div>
  </footer>

  <script src="js/main.js?v=${V.js}"></script>
</body>
</html>
`;
}

/* ---------- Home ---------- */

const lookCards = looks.map(([n, name, mat, price], i) => `
      <a href="#" class="look" data-look="${i}" data-reveal>
        <div class="look-media">
          <img src="assets/look-${n}.webp" alt="${name}, abito nero della collezione" loading="lazy" width="1280" height="1920">
          <img class="look-alt" src="assets/look-${n}-b.webp" alt="" loading="lazy" width="1280" height="1920">
        </div>
        <div class="look-info">
          <span class="look-name">${name}</span>
          <span class="look-price">${price}</span>
        </div>
        <span class="look-mat">${mat}</span>
      </a>`).join('');

const home = head({
  title: 'Ossidiana — Abiti da sera su misura · Alta sartoria a Milano',
  desc: 'Ossidiana — atelier di alta moda a Milano. Sei abiti, un solo nero: raso, velluto e piuma, cuciti a mano in pochi esemplari.',
  ogDesc: "Sei abiti, un solo nero: raso, velluto e piuma, cuciti a mano in pochi esemplari nell'atelier di Milano."
}) + header('home') + `
  <main>
    <section class="hero">
      <img src="assets/hero-cristalli.webp" alt="Donna in abito nero seduta tra cristalli neri, sotto un fascio di luce" fetchpriority="high" width="2048" height="1152">
      <div class="hero-caption">
        <h1>Abiti da sera <i>su misura</i><span>Alta sartoria · <em>Milano, dal 1928</em></span></h1>
        <a href="#collezione" class="link">Scopri la collezione</a>
      </div>
    </section>

    <section class="section" id="collezione" aria-labelledby="collezione-title">
      <div class="section-head" data-reveal>
        <div>
          <span class="label">Collezione I · Autunno Inverno 2026</span>
          <h2 class="title" id="collezione-title">Sei abiti. <i>Un solo nero.</i></h2>
        </div>
        <p class="text">Raso, velluto e piuma. Ogni abito è cucito a mano nel nostro atelier di Milano e prodotto in pochi esemplari.</p>
      </div>
      <div class="looks">${lookCards}
      </div>
    </section>

    <section class="section" aria-labelledby="caldera-title">
      <div class="split">
        <a href="#" class="split-media portrait" data-caldera data-reveal aria-label="Apri la scheda di Caldera">
          <img src="assets/materia-bg-b.webp" alt="Caldera, corsetto in ossidiana sfaccettata con gonna in seta e lava solidificata" loading="lazy" width="1344" height="1792">
        </a>
        <div class="split-body" data-reveal>
          <span class="label">Pezzo unico · esemplare 1/1</span>
          <h2 class="title" id="caldera-title">Caldera. La pietra si taglia come un <i>diamante</i>.</h2>
          <p class="text">Corsetto scolpito a mano in ossidiana sfaccettata, vetro vulcanico nero. La gonna in seta si scioglie alla base in lava solidificata. Non verrà replicato.</p>
          <span class="price-line">€ 3.200 — su appuntamento</span>
          <div class="split-actions">
            <a href="#" class="link" data-caldera>Scopri il pezzo unico</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section statement" aria-label="Manifesto">
      <div class="statement-inner" data-reveal>
        <span class="label">Manifesto</span>
        <p class="quote">Ossidiana nasce quando la lava incontra l'aria e si raffredda in un istante. Disegniamo abiti allo stesso modo: <i>pochi gesti, materia densa, nessun rumore.</i></p>
        <span class="price-line">Fondata a Milano nel 1928 · meno di venti abiti l'anno</span>
        <div class="statement-actions">
          <a href="manifesto.html" class="link">Leggi il manifesto</a>
          <a href="storia.html" class="link">La nostra storia</a>
        </div>
      </div>
    </section>

    <section class="strip-wrap" aria-label="L'atelier in immagini" data-reveal>
      <div class="strip" data-strip tabindex="0">
          <figure class="strip-item" style="--ar:2048/1152">
            <img src="assets/atelier-boutique.webp" alt="Il salone dell'atelier, con due abiti esposti e le vetrate sulla città" loading="lazy" width="2048" height="1152">
            <figcaption>Il salone</figcaption>
          </figure>
          <figure class="strip-item" style="--ar:2048/1152">
            <img src="assets/storia-bg.webp" alt="Il laboratorio: manichino, tavolo da taglio e bozzetti alle pareti" loading="lazy" width="2048" height="1152">
            <figcaption>Il laboratorio</figcaption>
          </figure>
          <figure class="strip-item" style="--ar:2048/1152">
            <img src="assets/passerella.webp" alt="Una modella in abito nero sfila tra due fasci di luce e cristalli neri" loading="lazy" width="2048" height="1152">
            <figcaption>La sfilata</figcaption>
          </figure>
          <figure class="strip-item" style="--ar:2048/1152">
            <img src="assets/banda-tre-modelle.webp" alt="Tre modelle in abito nero tra cristalli di ossidiana" loading="lazy" width="2048" height="1152">
            <figcaption>Collezione I</figcaption>
          </figure>
          <figure class="strip-item" style="--ar:1920/1280">
            <img src="assets/storia-feather.webp" alt="Una piuma nera sulla seta, con l'etichetta Ossidiana" loading="lazy" width="1920" height="1280">
            <figcaption>La piuma</figcaption>
          </figure>
      </div>
      <div class="strip-controls">
        <span class="strip-count" data-strip-count aria-live="polite">1 / 5</span>
        <button type="button" class="strip-btn" data-strip-prev aria-label="Foto precedente">‹</button>
        <button type="button" class="strip-btn" data-strip-next aria-label="Foto successiva">›</button>
      </div>
    </section>

    <section class="page-hero feature atelier" id="atelier" style="--ar:16/9;--pos:70% 50%" aria-labelledby="atelier-title">
      <img src="assets/atelier-bg.webp" alt="Una cliente nell'atelier Ossidiana a Milano" loading="lazy" width="2048" height="1152">
      <div class="page-hero-text" data-reveal>
        <span class="label">Atelier</span>
        <h2 class="title" id="atelier-title">Ogni abito si prova <i>in privato</i>.</h2>
        <p class="text">Riceviamo su appuntamento nel nostro atelier di Milano. Una stanza, una cliente, il tempo necessario.</p>
        <div class="split-actions"><a href="#" class="btn" data-prenota>Prenota una prova</a></div>
      </div>
    </section>
    <section class="section" aria-label="Indirizzo e orari">
      <div class="info-row" data-reveal>
        <div><span>Indirizzo</span>Via Borgonuovo, 20121 Milano</div>
        <div><span>Orari</span>Lunedì – Sabato, 10:00 – 19:00</div>
        <div><span>Telefono</span><a href="tel:+390287345521">+39 02 8734 5521</a></div>
      </div>
    </section>
  </main>
` + footer('home');

/* ---------- Storia ---------- */

const storia = head({
  title: 'Ossidiana — Storia',
  desc: "La storia dell'atelier Ossidiana: fondato a Milano nel 1928, tre generazioni della stessa famiglia, ancora cucito a mano.",
  ogDesc: 'Dal 1928, un atelier privato a Milano. Tre generazioni, un solo nero, cucito a mano.'
}) + header('storia') + `
  <main>
    <section class="page-hero" style="--ar:16/9;--pos:50% 50%">
      <img src="assets/storia-laboratorio.webp" alt="Il laboratorio dell'atelier: manichino, forbici e cartamodelli sul tavolo da taglio" fetchpriority="high" width="2048" height="1152">
      <div class="page-hero-text">
        <span class="label">Storia</span>
        <h1 class="title">Dal 1928, <i>un'unica famiglia</i>.</h1>
        <p class="text">Ossidiana nasce come atelier privato in Via Borgonuovo, a Milano. Tre generazioni più tardi si cuce ancora a mano, un abito alla volta, nella stessa stanza.</p>
      </div>
    </section>

    <section class="section">
      <div class="narrow two-cols prose">
        <div data-reveal>
          <h3>Le origini</h3>
          <p>Ossidiana apre nel 1928 in Via Borgonuovo, per volontà di Adele Fontana, sarta di scena al Teatro alla Scala. La prima cliente, una soprano, le chiese un abito «che si vedesse anche dall'ultima fila»: nacque così il nero pesante, quasi liquido, che porta ancora il nome dell'atelier.</p>
          <p>Suo figlio Cesare prese il suo posto nel 1961, sua nipote Marta nel 1994. Tre generazioni, la stessa porta senza insegna, lo stesso campanello d'ottone consumato da un secolo di mani.</p>
        </div>
        <div data-reveal>
          <h3>Il mestiere</h3>
          <p>Ogni abito nasce da un disegno a matita, poi da un cartamodello in carta nera, poi da settimane di lavorazione — piuma per piuma, cucitura per cucitura, sullo stesso tavolo da taglio del 1928, ancora segnato dalle forbici di Adele.</p>
          <p>Meno di venti abiti l'anno, ciascuno numerato a mano sull'etichetta interna. Nessuna produzione in serie, nessuna replica: il numero uno di ogni modello è anche l'ultimo.</p>
        </div>
      </div>
    </section>

    <section class="section section-tight" aria-label="L'atelier al lavoro">
      <div class="gallery">
        <figure style="--ar:1.5" data-reveal><img src="assets/storia-sewing.webp" alt="Mani che cuciono un abito Ossidiana" loading="lazy" width="1920" height="1280"></figure>
        <figure style="--ar:1.5" data-reveal><img src="assets/storia-swatches.webp" alt="Materiali dell'atelier: piuma, velluto, raso e seta neri" loading="lazy" width="1920" height="1280"></figure>
        <figure style="--ar:1.7778" data-reveal><img src="assets/storia-label.webp" alt="L'etichetta Ossidiana, cucita a mano su ogni capo" loading="lazy" width="2048" height="1152"></figure>
      </div>
    </section>

    <section class="section" aria-labelledby="clienti-title">
      <div class="narrow">
        <div class="block-head" data-reveal>
          <span class="label">Clienti dell'atelier</span>
          <h2 class="title" id="clienti-title">Chi ci ha vestito.</h2>
        </div>
        <div class="reviews">
          ${reviews.map(([t, a]) => `<figure class="review" data-reveal><blockquote>${t}</blockquote><figcaption>${a}</figcaption></figure>`).join('\n          ')}
        </div>
      </div>
    </section>
  </main>
` + footer('storia');

/* ---------- Manifesto ---------- */

const manifesto = head({
  title: 'Ossidiana — Manifesto',
  desc: 'Il manifesto di Ossidiana: pochi gesti, materia densa, nessun rumore. Un solo nero, cucito a mano a Milano.',
  ogDesc: "Pochi gesti, materia densa, nessun rumore. Il manifesto dell'atelier Ossidiana."
}) + header('manifesto') + `
  <main>
    <section class="page-hero" style="--ar:16/9;--pos:50% 50%">
      <img src="assets/manifesto-hero.webp" alt="Due abiti neri su manichino tra rocce vulcaniche e lava" fetchpriority="high" width="2048" height="1152">
      <div class="page-hero-text">
        <span class="label">Manifesto</span>
        <h1 class="title">Ossidiana nasce quando la lava incontra l'aria e si raffredda <i>in un istante</i>.</h1>
        <p class="text">Disegniamo abiti allo stesso modo: pochi gesti, materia densa, nessun rumore. Fondata a Milano nel 1928, meno di venti abiti l'anno.</p>
      </div>
    </section>

    <section class="section">
      <ul class="stats" data-reveal>
        <li><b>1928</b><span>Fondata a Milano</span></li>
        <li><b>&lt; 20</b><span>Abiti l'anno</span></li>
        <li><b>30+</b><span>Misure prese a mano</span></li>
        <li><b>1/1</b><span>Caldera, pezzo unico</span></li>
      </ul>
    </section>

    <!-- Ogni capitolo: una foto a tutta larghezza, poi testo centrato -->
    <section class="chapter chapter-text-only" aria-labelledby="cap-pietra">
      <div class="chapter-body">
        <div class="chapter-head" data-reveal>
          <span class="label">La pietra</span>
          <h2 class="title" id="cap-pietra">Una pietra che non ha avuto il tempo di diventare <i>cristallo</i>.</h2>
          <p class="text">L'ossidiana è vetro vulcanico. Nasce quando una lava ricca di silice si raffredda così in fretta che la materia non riesce a ordinarsi in cristalli. Da quella fretta vengono tre proprietà, e da ognuna un modo di lavorare.</p>
        </div>
        <ol class="props">
          <li data-reveal><span class="prop-n">I</span><b>Nessun cristallo</b><p>Senza una struttura interna che si ripete, ogni frammento di ossidiana è diverso dall'altro. Per questo non partiamo da una taglia: partiamo dal corpo di chi indosserà l'abito.</p></li>
          <li data-reveal><span class="prop-n">II</span><b>Frattura concoide</b><p>Si spezza in curve lisce, con bordi più sottili di una lama chirurgica. È la precisione che cerchiamo nel taglio: una linea sola, netta, senza ripensamenti.</p></li>
          <li data-reveal><span class="prop-n">III</span><b>Specchio nero</b><p>Per millenni è stata levigata per farne specchi. Un abito Ossidiana non deve nascondere chi lo porta: deve restituirne l'immagine, più nitida.</p></li>
        </ol>
      </div>
    </section>

    <section class="chapter" aria-labelledby="cap-processo">
      <figure class="chapter-media" style="--ar:16/9" data-reveal>
        <img src="assets/processo-cucito.webp" alt="Mani di una sarta che cuciono a mano un abito in seta nera con l'etichetta Ossidiana" loading="lazy" width="2048" height="1152">
      </figure>
      <div class="chapter-body">
        <div class="chapter-head" data-reveal>
          <span class="label">Il processo</span>
          <h2 class="title" id="cap-processo">Il tempo di un abito, <i>senza scorciatoie</i>.</h2>
          <p class="text">Dalle prime misure alla consegna passano da sei a dodici settimane. Per i capi con piume o strutture scultoree, fino a otto mesi.</p>
        </div>
        <ol class="step-cards">
          <li data-reveal><span>01</span><b>Il primo incontro</b><p>Un'ora in atelier. Parliamo di dove porterai l'abito, prima ancora di come dovrà essere.</p></li>
          <li data-reveal><span>02</span><b>Le misure</b><p>Oltre trenta misure prese a mano: busto, vita, fianchi, lunghezze, e il modo in cui ti muovi.</p></li>
          <li data-reveal><span>03</span><b>La prova in tela</b><p>Prima del tessuto vero, l'abito viene costruito in tela grezza e corretto direttamente sul corpo.</p></li>
          <li data-reveal><span>04</span><b>Il taglio</b><p>Solo ora si taglia il tessuto definitivo. Una volta sola: velluto e seta non perdonano.</p></li>
          <li data-reveal><span>05</span><b>La seconda prova</b><p>Rifiniture su lunghezze, vestibilità e dettagli, finché l'abito cade come deve.</p></li>
          <li data-reveal><span>06</span><b>La consegna</b><p>In atelier, con l'abito pronto e un'ultima occhiata allo specchio.</p></li>
        </ol>
      </div>
    </section>

    <section class="section statement" aria-label="Citazione">
      <div class="statement-inner" data-reveal>
        <p class="quote">Pochi gesti, materia densa, <i>nessun rumore</i>.</p>
      </div>
    </section>

    <section class="chapter" aria-labelledby="cap-rinunce">
      <figure class="chapter-media" style="--ar:16/9" data-reveal>
        <img src="assets/rinunce-etichetta.webp" alt="Etichetta Ossidiana 1/1 numero 07 cucita a mano" loading="lazy" width="2048" height="1152">
      </figure>
      <div class="chapter-body">
        <div class="chapter-head" data-reveal>
          <span class="label">Le rinunce</span>
          <h2 class="title" id="cap-rinunce">Quello che abbiamo scelto di <i>non fare</i>.</h2>
        </div>
        <ul class="nots" data-reveal>
          <li><b>Niente saldi.</b> Un abito costruito su di te non perde valore a fine stagione.</li>
          <li><b>Niente taglie standard.</b> I prezzi sono il punto di partenza, le misure si prendono in prova.</li>
          <li><b>Niente produzione in serie.</b> Meno di venti abiti l'anno, tutti cuciti a mano a Milano.</li>
          <li><b>Niente repliche.</b> Caldera esiste in un solo esemplare, e così resterà.</li>
          <li><b>Niente vendita online.</b> Si prova, si sceglie e si conferma in atelier.</li>
        </ul>
        <div class="chapter-cta" data-reveal><a href="#" class="btn" data-prenota>Prenota una prova</a></div>
      </div>
    </section>
  </main>
` + footer('manifesto');

for (const [file, html] of [['index.html', home], ['storia.html', storia], ['manifesto.html', manifesto]]) {
  fs.writeFileSync(path.join(ROOT, file), html);
  console.log('scritto', file);
}
