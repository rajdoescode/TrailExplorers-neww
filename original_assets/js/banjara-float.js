// =========================================================
// Awara Banjara — Banjara avatar on the home page
// =========================================================
// Banjara (the trip planner's mascot) peeks out of a launcher tile above the WhatsApp
// button, fidgets, hops about and keeps asking where you want to go. Tapping
// him opens /plan-your-trip; tapping a destination chip opens it with that
// destination already sent to the chat (?ask=, read by trip-chat.js).
//
// The sprite strip (assets/images/mascot/banjara-idle.webp) is frames 0-13 of
// the full mascot sheet: 0-12 look around, 13 standing. It is only fetched once
// the avatar is revealed, so it never competes with the hero for bandwidth.

(function () {
  var root = document.getElementById('banjaraFloat');
  if (!root) return;

  var sprite = root.querySelector('.banjara-float__sprite');
  var bubble = document.getElementById('banjaraBubble');
  var text = document.getElementById('banjaraText');
  var chips = document.getElementById('banjaraChips');
  var closeBtn = root.querySelector('.banjara-float__close');
  var avatar = root.querySelector('.banjara-float__avatar');

  var REVEAL_AT = 120;          // same scroll threshold as the WhatsApp button
  var FRAMES = 14, STAND = 13;
  var HIDE_KEY = 'ab_banjara_quiet';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Questions he cycles through. Ones with chips let the visitor answer in a tap.
  var LINES = [
    { say: 'Where do you want to go? 🏔️', chips: ['Spiti', 'Ladakh', 'Kashmir'] },
    { say: 'Psst… planning a trip?', sub: 'Tap me, let’s plan it together!' },
    { say: 'Snow peaks or green valleys?', chips: ['Snow peaks', 'Green valleys'] },
    { say: 'Who’s coming along?', chips: ['Friends', 'Family', 'Just me'] },
    { say: 'Got a few days off? 🎒', sub: 'Tell me, I’ll shape a day-by-day plan.' },
    { say: 'Bike, road trip or trek?', chips: ['Bike trip', 'Road trip', 'Trek'] },
    { say: 'Chai and a mountain view? ☕', sub: 'Chat with me about your dream trip.' }
  ];
  var CHIP_ASK = {
    'Spiti': 'Spiti Valley road trip',
    'Ladakh': 'Ladakh trip',
    'Kashmir': 'Kashmir trip',
    'Snow peaks': 'I want a trip with snow peaks',
    'Green valleys': 'I want a trip through green valleys',
    'Friends': 'A Himalayan trip with friends',
    'Family': 'A Himalayan trip with family',
    'Just me': 'A solo Himalayan trip',
    'Bike trip': 'A Himalayan bike trip',
    'Road trip': 'A Himalayan road trip',
    'Trek': 'A Himalayan trek'
  };

  function quiet() {
    try { return sessionStorage.getItem(HIDE_KEY) === '1'; } catch (e) { return false; }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------- Sprite frames ----------
  var frame = STAND, queue = [], fps = 15, last = 0, fidgetAt = 0;

  function paint() {
    sprite.style.backgroundPosition = (frame / (FRAMES - 1) * 100) + '% 0';
  }

  function lookAround() {
    queue = [];
    for (var i = STAND - 1; i >= 0; i--) queue.push(i);
    for (var j = 1; j <= STAND; j++) queue.push(j);
  }

  function tick(now) {
    requestAnimationFrame(tick);
    if (!root.classList.contains('is-visible') || document.hidden) return;
    var step = 1000 / fps;
    if (now - last > 500) last = now - step;
    if (now - last < step) return;
    last = now;
    if (queue.length) {
      frame = queue.shift();
      paint();
    } else if (now > fidgetAt) {
      fidgetAt = now + 6000 + Math.random() * 5000;
      lookAround();
    }
  }

  // ---------- Tricks: something every few seconds ----------
  var TRICKS = ['is-hop', 'is-spin', 'is-wiggle', 'look', 'is-hop'];
  var lastTrick = -1;

  function flash(cls, ms) {
    avatar.classList.remove(cls);
    void avatar.offsetWidth;
    avatar.classList.add(cls);
    setTimeout(function () { avatar.classList.remove(cls); }, ms);
  }

  function trick() {
    var t;
    do { t = Math.floor(Math.random() * TRICKS.length); } while (t === lastTrick);
    lastTrick = t;
    if (TRICKS[t] === 'look') lookAround();
    else flash(TRICKS[t], 900);
  }

  // ---------- Speech bubble ----------
  var lineIdx = 0, bubbleTimer = null;

  function showLine(line) {
    clearTimeout(bubbleTimer);
    text.innerHTML = esc(line.say) + (line.sub ? '<small>' + esc(line.sub) + '</small>' : '');
    chips.innerHTML = (line.chips || []).map(function (c) {
      return '<a class="banjara-float__chip" href="plan-your-trip?ask=' + encodeURIComponent(CHIP_ASK[c] || c) + '">' + esc(c) + '</a>';
    }).join('');
    bubble.classList.remove('is-typing');
    bubble.classList.add('is-open');
    // Chips need time to read and tap; plain lines move on sooner
    bubbleTimer = setTimeout(hideLine, line.chips ? 9000 : 6000);
  }

  function hideLine() {
    clearTimeout(bubbleTimer);
    bubble.classList.remove('is-open', 'is-typing');
    if (!quiet()) bubbleTimer = setTimeout(nextLine, 5000);
  }

  function nextLine() {
    if (quiet() || !root.classList.contains('is-visible')) return;
    var line = LINES[lineIdx++ % LINES.length];
    if (reduced.matches) { showLine(line); return; }
    // A beat of "typing…" first, like the planner chat
    bubble.classList.add('is-open', 'is-typing');
    bubbleTimer = setTimeout(function () {
      showLine(line);
      flash('is-hop', 900);
    }, 1100);
  }

  // Hovering or focusing the bubble keeps it open
  bubble.addEventListener('mouseenter', function () { clearTimeout(bubbleTimer); });
  bubble.addEventListener('mouseleave', function () {
    if (bubble.classList.contains('is-open') && !bubble.classList.contains('is-typing')) {
      bubbleTimer = setTimeout(hideLine, 3000);
    }
  });

  closeBtn.addEventListener('click', function () {
    try { sessionStorage.setItem(HIDE_KEY, '1'); } catch (e) {}
    clearTimeout(bubbleTimer);
    bubble.classList.remove('is-open', 'is-typing');
  });

  avatar.addEventListener('mouseenter', function () {
    if (reduced.matches) return;
    flash('is-hop', 900);
  });

  // ---------- Reveal with the WhatsApp button ----------
  var started = false;

  function start() {
    started = true;
    root.classList.add('is-loaded');   // sprite background is fetched from here on
    paint();
    if (!reduced.matches) {
      fidgetAt = performance.now() + 2500;
      requestAnimationFrame(tick);
      setInterval(function () {
        if (root.classList.contains('is-visible') && !document.hidden) trick();
      }, 7000);
    }
    if (!quiet()) bubbleTimer = setTimeout(nextLine, 1200);
  }

  function update() {
    var show = window.scrollY > REVEAL_AT;
    root.classList.toggle('is-visible', show);
    if (show && !started) start();
    if (show && started && !quiet() && !bubble.classList.contains('is-open') && !bubbleTimer) {
      bubbleTimer = setTimeout(nextLine, 1200);
    }
    if (!show) {
      clearTimeout(bubbleTimer);
      bubbleTimer = null;
      bubble.classList.remove('is-open', 'is-typing');
    }
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
})();
