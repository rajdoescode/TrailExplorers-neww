/* =========================================================
   Plan Your Himalayan Trip — AI trip planner chat
   Talks to /api/trip-chat (server/trip-chat.js), keeps a live
   "Your trip" summary, and sends the finished plan as a
   "custom_itinerary" inquiry. When the chat is unavailable the
   page falls back to the step-by-step builder (trip-builder.js).
   Load before trip-builder.js: it reads ?trip= before the
   builder strips it from the URL.
   ========================================================= */

(function () {
  const Leads = window.AwaraLeads;
  const DATA = window.TRIP_BUILDER_DATA || {};
  const STORE_KEY = 'ab_trip_chat_v1';
  const MAX_TURNS = 40;
  const $ = (id) => document.getElementById(id);

  const GREETING = {
    role: 'assistant',
    content: "Hi! I'm **Banjara**, Awara Banjara's trip planner. Tell me what kind of Himalayan trip you're dreaming of: where, roughly when, and who's coming. I'll shape a day-by-day plan with you, and our trip expert will call you with the price.",
    suggestions: ['Spiti Valley road trip', 'Ladakh in summer', 'Kashmir with family', 'Not sure yet, suggest something']
  };

  const params = new URLSearchParams(location.search);
  const tripParam = params.get('trip');
  // ?ask= comes from the home page avatar's destination chips
  const askParam = (params.get('ask') || '').trim().slice(0, 200);

  function emptyItinerary() {
    return {
      title: '', regions: [], start_date: '', dates_text: '', days: 0, adults: 0, children: 0,
      group_type: '', start_point: '', stay: '', transport: '', pace: '', activities: [], budget_per_person: 0, notes: '', plan: []
    };
  }

  function freshState() {
    return { messages: [GREETING], itinerary: emptyItinerary(), ready: false, tripId: '' };
  }

  let state = load() || freshState();
  let busy = false;

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved.messages) || !saved.messages.length) return null;
      return Object.assign(freshState(), saved, { itinerary: Object.assign(emptyItinerary(), saved.itinerary || {}) });
    } catch (e) { return null; }
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  // ---------- Mascot ----------
  // Banjara is one sprite sheet (assets/images/mascot/banjara-sprite.webp, 10 x 6 grid)
  // cut from the mascot clip: frames 0-12 idle fidget, 13-40 hop down to sitting
  // cross-legged, 41-51 meditating. His wave, run-and-laugh and namaste are on a
  // second sheet cut from another clip (banjara-moves.webp, 10 x 9); frame numbers
  // from MOVE (100) up are on that one and the sprite swaps sheets for them. Every .pc-mascot on the page shows the same state:
  //   idle  - standing and breathing, with the odd look around (waiting for input)
  //   sit   - sits down the moment a message is sent
  //   think - meditates while the planner works
  //   rise  - plays the sit backwards and hops when the reply lands, then back to idle
  const Mascot = (function () {
    const COLS = 10, ROWS = 6, MOVE_ROWS = 9;
    const STAND = 13, SEAT = 40, MED_FIRST = 41, MED_LAST = 51;
    // Moves sheet: each move starts and ends on its own standing frame (100)
    const MOVE = 100;
    const MOVES_SRC = '/assets/images/mascot/banjara-moves.webp?v=1';   // same URL as trip-chat.css
    const MOVES = {
      wave: { fps: 8, frames: [0, 1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 5, 4, 2, 1, 0] },
      runLaugh: { fps: 10, frames: [0, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55] },
      namaste: { fps: 8, frames: [0, 57, 58, 60, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 63, 61, 59, 57, 56] }
    };
    let movesReady = false;
    const movesImg = new Image();
    movesImg.onload = () => { movesReady = true; };
    movesImg.src = MOVES_SRC;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let mode = 'idle';
    let frame = STAND;
    let queue = [];
    let fps = 30;
    let then = null;
    let last = 0;
    let fidgetAt = 0;
    let riseNext = null;   // reply arrived mid-sit: rise as soon as he's down

    function range(a, b) {
      const out = [];
      const step = a <= b ? 1 : -1;
      for (let i = a; i !== b + step; i += step) out.push(i);
      return out;
    }

    function paint() {
      const onMoves = frame >= MOVE;
      const f = onMoves ? frame - MOVE : frame;
      const x = (f % COLS) / (COLS - 1) * 100;
      const y = Math.floor(f / COLS) / ((onMoves ? MOVE_ROWS : ROWS) - 1) * 100;
      document.querySelectorAll('.pc-mascot').forEach(el => {
        el.dataset.state = mode;
        el.firstElementChild.classList.toggle('is-move', onMoves);
        el.firstElementChild.style.backgroundPosition = `${x}% ${y}%`;
      });
    }

    function move(name) {
      play(MOVES[name].frames.map(f => f + MOVE).concat([STAND]), MOVES[name].fps, () => {});
    }

    function play(frames, rate, done) {
      if (reduced.matches) { frame = frames[frames.length - 1]; queue = []; paint(); done(); return; }
      queue = frames.slice();
      fps = rate;
      then = done;
    }

    function tick(now) {
      requestAnimationFrame(tick);
      const step = 1000 / fps;
      if (now - last > 500) last = now - step;   // back from a hidden tab
      if (now - last < step) return;
      // Advance by elapsed time, skipping frames if the browser fell behind
      const steps = Math.floor((now - last) / step);
      last += steps * step;
      if (queue.length) {
        frame = queue.splice(0, steps).pop();
        paint();
        if (!queue.length && then) { const done = then; then = null; done(); }
      } else if (mode === 'idle' && now > fidgetAt && !reduced.matches) {
        // Look around: run the fidget back to its start and forward again
        fidgetAt = now + 7000 + Math.random() * 6000;
        play(range(STAND - 1, 0).concat(range(1, STAND)), 15, () => {});
      }
    }

    function idle() {
      mode = 'idle';
      fidgetAt = performance.now() + 5000;
      paint();
    }

    function think() {
      mode = 'think';
      if (riseNext !== null) { const cheer = riseNext; riseNext = null; rise(cheer); return; }
      // Slow ping-pong through the meditation frames until the reply lands
      const loop = () => { if (mode === 'think' && !reduced.matches) play(range(MED_FIRST, MED_LAST).concat(range(MED_LAST - 1, MED_FIRST + 1)), 8, loop); };
      play([MED_FIRST], 8, loop);
    }

    function sit() {
      riseNext = null;
      if (frame >= MOVE) frame = STAND;   // cut a wave or namaste short and sit from standing
      if (frame > SEAT) { think(); return; }
      mode = 'sit';
      paint();
      play(range(frame, SEAT), 30, think);
    }

    function rise(cheer) {
      if (mode === 'sit') { riseNext = cheer; return; }
      if (mode !== 'think') return;
      mode = 'rise';
      paint();
      play(range(Math.min(frame, SEAT), STAND), 36, () => {
        idle();
        if (!cheer || reduced.matches) return;
        document.querySelectorAll('.pc-mascot').forEach(el => {
          el.classList.remove('is-cheer');
          void el.offsetWidth;
          el.classList.add('is-cheer');
        });
        setTimeout(() => document.querySelectorAll('.pc-mascot.is-cheer').forEach(el => el.classList.remove('is-cheer')), 700);
      });
    }

    // ---- Click tricks: poke him while he waits and he does something ----
    const QUIPS = ['Where to, boss?', 'Pack light, walk far.', 'Chai first? ☕', 'The mountains are calling!', 'Tickles! 😄', 'Ready when you are.', 'Ladakh or Spiti?'];
    let lastTrick = -1;
    let bubbleTimer = null;

    function say(el, text) {
      el.querySelectorAll('.pc-mascot-bubble').forEach(b => b.remove());
      const b = document.createElement('span');
      b.className = 'pc-mascot-bubble';
      b.textContent = text || QUIPS[Math.floor(Math.random() * QUIPS.length)];
      el.appendChild(b);
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => b.remove(), 2200);
    }

    function flash(el, cls, ms) {
      el.classList.remove(cls);
      void el.offsetWidth;
      el.classList.add(cls);
      setTimeout(() => el.classList.remove(cls), ms);
    }

    function poke(el) {
      if (mode !== 'idle' || queue.length) return;
      let t = -1;
      if (!reduced.matches) {
        const n = movesReady ? 7 : 4;   // the moves sheet may still be loading
        do { t = Math.floor(Math.random() * n); } while (t === lastTrick);
        lastTrick = t;
      }
      const all = () => document.querySelectorAll('.pc-mascot');
      if (t === 4) {            // wave
        say(el, 'Hello there! 👋');
        move('wave');
        return;
      }
      if (t === 5) {            // pretend to set off running, stop and laugh
        say(el, 'Race you! 🏃');
        move('runLaugh');
        setTimeout(() => { if (mode === 'idle') say(el, 'Haha, kidding! 😄'); }, 2100);
        return;
      }
      if (t === 6) {            // fold hands and bow
        say(el, 'Namaste! 🙏');
        move('namaste');
        return;
      }
      say(el);
      if (t < 0) return;
      if (t === 0) {            // happy hop
        all().forEach(e => flash(e, 'is-cheer', 700));
      } else if (t === 1) {     // spin around
        all().forEach(e => flash(e, 'is-spin', 800));
      } else if (t === 2) {     // look around, then hop
        play(range(STAND - 1, 0).concat(range(1, STAND)), 24, () => all().forEach(e => flash(e, 'is-cheer', 700)));
      } else {                  // sit down, meditate a moment, spring back up
        mode = 'trick';
        paint();
        play(range(frame, SEAT), 30, () => {
          if (mode !== 'trick') return;
          play(range(MED_FIRST, MED_LAST), 10, () => {
            if (mode !== 'trick') return;
            play(range(SEAT, STAND), 36, () => {
              if (mode !== 'trick') return;
              idle();
              all().forEach(e => flash(e, 'is-cheer', 700));
            });
          });
        });
      }
    }

    document.addEventListener('click', e => {
      const el = e.target.closest && e.target.closest('.pc-mascot');
      if (el) poke(el);
    });

    idle();
    requestAnimationFrame(tick);
    return { paint, sit, rise, idle };
  })();

  function mascotHtml(extra) {
    return `<span class="pc-mascot ${extra || ''}" aria-hidden="true"><span class="pc-mascot-sprite"></span><span class="pc-mascot-dots"><i></i><i></i><i></i></span></span>`;
  }

  // ---------- Rendering ----------

  const AVATAR = '<span class="pc-avatar pc-avatar-face" aria-hidden="true"></span>';

  // Welcome cards: a message to send plus a photo from the builder's region data
  const STARTS = [
    { text: 'Spiti Valley road trip', sub: 'Cold desert & monasteries', region: 'spiti' },
    { text: 'Ladakh in summer', sub: 'High passes & blue lakes', region: 'ladakh' },
    { text: 'Kashmir with family', sub: 'Houseboats & meadows', region: 'kashmir' },
    { text: 'Not sure yet, suggest something', label: 'Surprise me', sub: 'Tell us your vibe', region: 'himachal' }
  ];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Escaped text with **bold**, "- " bullets, "1." numbered lists and paragraphs
  function formatText(text) {
    const lines = esc(text).split('\n');
    let html = '';
    let list = '';
    const close = () => { if (list) { html += `</${list}>`; list = ''; } };
    lines.forEach(line => {
      const bullet = /^\s*[-•*]\s+(.*)$/.exec(line);
      const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
      const item = bullet || numbered;
      if (item) {
        const kind = bullet ? 'ul' : 'ol';
        if (list !== kind) { close(); html += `<${kind}>`; list = kind; }
        html += `<li>${item[1]}</li>`;
        return;
      }
      close();
      if (line.trim()) html += `<p>${line}</p>`;
    });
    close();
    return html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  function regionImage(id) {
    const region = (DATA.regions || []).find(r => r.id === id);
    return region ? region.image : '';
  }

  function routeOf(plan, startPoint) {
    const stops = [];
    const start = String(startPoint || '').trim();
    if (start && (plan || []).length) stops.push(start);
    (plan || []).forEach(d => {
      const place = (d.sleep || '').trim();
      if (place && stops[stops.length - 1] !== place) stops.push(place);
    });
    return stops;
  }

  // Budget per person, in rupees: the slider runs 5k to 2 lakh, and the top stop means "or more"
  const BUDGET = { min: 5000, max: 200000, step: 1000, start: 30000 };

  function rupees(n) {
    return '₹' + Number(n || 0).toLocaleString('en-IN');
  }

  function budgetText(n) {
    if (!n) return '';
    return `${rupees(n)}${n >= BUDGET.max ? '+' : ''} per person`;
  }

  function budgetSlider(id, value) {
    const v = Math.min(BUDGET.max, Math.max(BUDGET.min, Number(value) || BUDGET.start));
    return `
      <div class="pc-budget-slider">
        <output class="pc-budget-value" for="${id}">${esc(budgetText(v))}</output>
        <input type="range" id="${id}" class="pc-budget-range" min="${BUDGET.min}" max="${BUDGET.max}" step="${BUDGET.step}" value="${v}" aria-label="Budget per person in rupees">
        <span class="pc-budget-scale"><span>${rupees(BUDGET.min)}</span><span>${rupees(BUDGET.max)}+</span></span>
      </div>`;
  }

  function syncSlider(range) {
    const box = range.closest('.pc-budget-slider');
    const pct = (range.value - BUDGET.min) / (BUDGET.max - BUDGET.min) * 100;
    range.style.setProperty('--pc-fill', pct + '%');
    box.querySelector('output').textContent = budgetText(Number(range.value));
  }

  // Banjara proposed a change: the plan stays as it is until they lock it in
  function renderLockCard(change) {
    return `
      <div class="pc-lock">
        <p><strong>Proposed change</strong>${esc(change)}</p>
        <div class="pc-lock-actions">
          <button type="button" class="pc-cta" data-say="Yes, lock this change in">Lock it in</button>
          <button type="button" class="pc-lock-keep" data-say="No, keep the plan as it was">Keep the original</button>
        </div>
      </div>`;
  }

  function renderBudgetCard() {
    return `
      <div class="pc-budget">
        <p><strong>Your budget per person</strong>Slide to roughly what each person would like to spend, excluding travel to the starting city.</p>
        ${budgetSlider('pcBudgetChat', state.itinerary.budget_per_person)}
        <div class="pc-lock-actions">
          <button type="button" class="pc-cta" data-act="budget">Set my budget</button>
          <button type="button" class="pc-lock-keep" data-say="I'm not sure about the budget yet">Not sure yet</button>
        </div>
      </div>`;
  }

  function renderWelcome() {
    return `
      <div class="pc-welcome">
        ${mascotHtml('pc-mascot-lg')}
        <div class="pc-welcome-msgs">
          <span class="pc-sender">Banjara</span>
          <div class="pc-msg pc-msg-bot"><div class="pc-bubble">Hey! I'm Banjara, Awara Banjara's trip planner 👋</div></div>
          <div class="pc-msg pc-msg-bot"><div class="pc-bubble"><strong>Where are the mountains calling you?</strong></div></div>
          <div class="pc-msg pc-msg-bot pc-tail"><div class="pc-bubble">Tell me where, when and who's coming, and we'll shape a day-by-day plan together. Our trip expert then calls you with the price.</div></div>
        </div>
        <div class="pc-starts">
          ${STARTS.map(s => `
            <button type="button" class="pc-start" data-say="${esc(s.text)}">
              <img src="${esc(regionImage(s.region))}" alt="" loading="lazy">
              <span>${esc(s.label || s.text)}<small>${esc(s.sub)}</small></span>
            </button>`).join('')}
        </div>
      </div>`;
  }

  function renderUpdateCard(update) {
    const route = update.route.length > 1 ? `${update.route[0]} → ${update.route[update.route.length - 1]}` : (update.title || 'Your itinerary');
    return `
      <button type="button" class="pc-update" data-act="trip">
        <span class="pc-update-icon" aria-hidden="true">🗺</span>
        <span><strong>Plan updated · ${update.days} day${update.days === 1 ? '' : 's'}</strong><small>${esc(route)}</small></span>
        <span>View →</span>
      </button>`;
  }

  function renderMessages() {
    const list = $('pcMessages');
    const onlyGreeting = state.messages.length === 1 && !busy;
    let html = '';

    if (onlyGreeting) {
      html = renderWelcome();
    } else {
      state.messages.forEach((m, i) => {
        const prev = state.messages[i - 1];
        const next = state.messages[i + 1];
        const cont = prev && prev.role === m.role && !prev.planUpdate;
        // Last bubble of a run gets the tail (and the avatar), like iMessage
        const tail = m.planUpdate || !(next ? next.role === m.role : busy && m.role !== 'user');
        const bot = m.role !== 'user';
        html += `
          <div class="pc-msg ${bot ? 'pc-msg-bot' : 'pc-msg-user'}${cont ? ' pc-cont' : ''}${tail ? ' pc-tail' : ''}${m.error ? ' pc-msg-error' : ''}">
            ${bot ? AVATAR : ''}
            <div class="pc-bubble">${formatText(m.content)}</div>
          </div>`;
        if (m.planUpdate) html += renderUpdateCard(m.planUpdate);
        if (m.notify) html += renderNotifyCard(m.notify, i);
        // Lock-in and budget cards only answer Banjara's newest message
        const newest = !next && !busy;
        if (newest && m.pendingChange) html += renderLockCard(m.pendingChange);
        else if (newest && m.askBudget && !state.itinerary.budget_per_person) html += renderBudgetCard();
      });
      if (state.ready && planDays()) {
        html += `
          <div class="pc-ready">
            <p><strong>Your plan is ready to send</strong>Our trip expert will call you with the exact price for your group.</p>
            <button type="button" class="pc-cta" style="width:auto" data-act="send">Send to our team</button>
          </div>`;
      }
      if (busy) {
        const afterBot = state.messages.length && state.messages[state.messages.length - 1].role !== 'user';
        html += `<div class="pc-msg pc-msg-bot pc-tail${afterBot ? ' pc-cont' : ''}">${AVATAR}<div class="pc-bubble pc-typing" aria-label="Banjara is typing"><i></i><i></i><i></i><em>Mapping your route…</em></div></div>`;
      }
    }

    list.innerHTML = html;
    list.querySelectorAll('.pc-budget-range').forEach(syncSlider);
    $('pcThread').classList.toggle('is-welcome', onlyGreeting);
    Mascot.paint();
    // After layout, so new bubbles and images are measured
    requestAnimationFrame(() => { list.scrollTop = onlyGreeting ? 0 : list.scrollHeight; });

    const last = state.messages[state.messages.length - 1];
    const hasCard = last && (last.pendingChange || (last.askBudget && !state.itinerary.budget_per_person));
    const suggestions = !busy && !onlyGreeting && !hasCard && last && last.role === 'assistant' && Array.isArray(last.suggestions) ? last.suggestions : [];
    $('pcSuggestions').innerHTML = suggestions.map(s => `<button type="button" class="pc-chip">${esc(s)}</button>`).join('');
    $('pcSend').disabled = busy;
  }

  // "Notify me" for a destination we don't have itineraries for yet
  function renderNotifyCard(notify, index) {
    if (notify.done) {
      return `<p class="pc-notify-done">✓ Done! We'll message you on WhatsApp when ${esc(notify.place)} trips are ready.</p>`;
    }
    return `
      <form class="pc-notify" data-notify="${index}" novalidate>
        <p><strong>Notify me about ${esc(notify.place)}</strong>We'll send one WhatsApp message when it launches. No spam.</p>
        <div class="pc-notify-row">
          <input type="text" name="name" placeholder="Your name" maxlength="60" autocomplete="name" aria-label="Your name">
          <input type="tel" name="phone" placeholder="WhatsApp number" maxlength="20" autocomplete="tel" aria-label="WhatsApp number" required>
          <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="pc-hp">
          <button type="submit" class="pc-cta">Notify me</button>
        </div>
        <span class="pc-notify-error" hidden></span>
      </form>`;
  }

  async function submitNotify(form) {
    const message = state.messages[Number(form.dataset.notify)];
    if (!message || !message.notify || message.notify.done) return;
    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    const errorEl = form.querySelector('.pc-notify-error');
    if (!Leads.isValidPhone(phone)) {
      errorEl.textContent = 'Please enter a valid WhatsApp number.';
      errorEl.hidden = false;
      return;
    }
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = 'Saving…';
    const place = message.notify.place;
    const result = await Leads.postInquiry({
      name: name || 'Chat visitor',
      phone: Leads.normalisePhone(phone),
      type: 'waitlist',
      waitlist_place: place,
      trip_title: `Notify me: ${place} trips`,
      message: `Asked the Banjara trip chat about ${place}. Wants a WhatsApp message when we launch itineraries there.`,
      website: form.elements.website.value
    });
    if (result.ok) {
      message.notify.done = true;
      save();
      render();
    } else {
      button.disabled = false;
      button.textContent = 'Notify me';
      errorEl.textContent = result.error || "Couldn't save that just now. Please try again.";
      errorEl.hidden = false;
    }
  }

  function planDays() {
    return Array.isArray(state.itinerary.plan) ? state.itinerary.plan.length : 0;
  }

  function peopleText(it) {
    if (!it.adults && !it.children) return '';
    const parts = [];
    if (it.adults) parts.push(`${it.adults} adult${it.adults === 1 ? '' : 's'}`);
    if (it.children) parts.push(`${it.children} child${it.children === 1 ? '' : 'ren'}`);
    return parts.join(', ');
  }

  function renderTrip() {
    const it = state.itinerary;
    const days = planDays();
    const route = routeOf(it.plan, it.start_point);
    const facts = [
      ['When', it.dates_text || it.start_date],
      ['Length', it.days ? `${it.days} days` : ''],
      ['Who', [peopleText(it), it.group_type].filter(Boolean).join(' · ')],
      ['From', it.start_point],
      ['Stays', it.stay],
      ['Transport', it.transport],
      ['Pace', it.pace],
      ['Budget', budgetText(it.budget_per_person)],
      ['Wish list', it.activities.join(', '), true]
    ].filter(([, v]) => v);

    $('pcTripTitle').textContent = it.title || (it.regions.length ? it.regions.join(' + ') : 'Your trip');
    $('pcTripSummary').textContent = days
      ? `${days} day${days === 1 ? '' : 's'}${it.regions.length ? ' · ' + it.regions.join(' + ') : ''}`
      : (it.regions.length ? it.regions.join(' + ') : 'Taking shape as you chat');

    if (!facts.length && !days) {
      $('pcTripBody').innerHTML = '<p class="pc-trip-empty"><b>🏔</b>Tell Banjara where and when you want to go. Your route, dates and day-by-day plan appear here as you chat.</p>';
    } else {
      $('pcTripBody').innerHTML =
        (route.length > 1 ? `<div class="pc-route" aria-label="Route">${route.map(p => `<span>${esc(p)}</span>`).join('<i></i>')}</div>` : '') +
        (facts.length ? `<dl class="pc-facts">${facts.map(([k, v, wide]) => `<div${wide || String(v).length > 26 ? ' class="wide"' : ''}><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : '') +
        (days ? `<p class="pc-days-title">Day by day</p><ol class="pc-days">${it.plan.map(d => `
          <li><details>
            <summary><span class="pc-day-num">${d.day}</span><b>${esc(d.title)}</b></summary>
            <div class="pc-day-more">
              ${d.stops.length ? `<span><em>Stops</em> ${esc(d.stops.join(' · '))}</span>` : ''}
              ${d.note ? `<span>${esc(d.note)}</span>` : ''}
              ${d.sleep ? `<span><em>Night</em> ${esc(d.sleep)}</span>` : ''}
            </div>
          </details></li>`).join('')}</ol>` : '');
    }

    const sendBtn = $('pcTripSend');
    sendBtn.disabled = !days;
    sendBtn.textContent = days ? 'Send to our team →' : 'Plan a few days first';

    const pill = $('pcTripPill');
    pill.hidden = !(days || facts.length);
    $('pcTripPillText').textContent = days ? `Your trip · ${days} day${days === 1 ? '' : 's'}` : 'Your trip so far';
  }

  function render() {
    renderMessages();
    renderTrip();
  }

  // Phones: the ticket is a slide-up sheet. Desktop: it's always visible, so just flash it.
  function openTrip() {
    const trip = $('pcTrip');
    if (window.matchMedia('(max-width: 960px)').matches) {
      trip.classList.add('is-open');
      $('pcScrim').hidden = false;
    } else {
      trip.classList.remove('is-flash');
      void trip.offsetWidth;
      trip.classList.add('is-flash');
    }
  }

  function closeTrip() {
    $('pcTrip').classList.remove('is-open');
    $('pcScrim').hidden = true;
  }

  // ---------- Talking to the planner ----------

  async function sendMessage(text) {
    text = String(text || '').trim();
    if (!text || busy) return;
    if (state.messages.filter(m => m.role === 'user').length >= MAX_TURNS) {
      state.messages.push({ role: 'assistant', content: "We've covered a lot! Tap **Send to our team** and our trip expert will take it from here.", error: true });
      render();
      return;
    }

    state.messages.push({ role: 'user', content: text.slice(0, 1500) });
    busy = true;
    Mascot.sit();
    render();
    save();

    let res;
    let json = {};
    try {
      res = await fetch(Leads.apiUrl('/trip-chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: state.messages.filter(m => !m.error).map(m => ({ role: m.role, content: m.content })),
          itinerary: state.itinerary,
          trip_id: state.tripId || undefined
        })
      });
      json = await res.json().catch(() => ({}));
    } catch (e) { res = null; }

    busy = false;
    Mascot.rise(!!(res && res.ok && json.success));
    if (res && res.ok && json.success) {
      const before = JSON.stringify(state.itinerary.plan || []);
      const reply = { role: 'assistant', content: json.reply, suggestions: json.suggestions || [] };
      // A destination we don't cover yet: offer to tell them when we do
      if (json.notify && json.notify.place) reply.notify = { place: String(json.notify.place).slice(0, 40), done: false };
      if (json.pending_change) reply.pendingChange = String(json.pending_change).slice(0, 200);
      if (json.ask_budget) reply.askBudget = true;
      if (json.itinerary) {
        const budget = state.itinerary.budget_per_person;
        state.itinerary = Object.assign(emptyItinerary(), json.itinerary);
        if (!state.itinerary.budget_per_person) state.itinerary.budget_per_person = budget;
        const plan = state.itinerary.plan || [];
        if (plan.length && JSON.stringify(plan) !== before) {
          reply.planUpdate = { days: plan.length, title: state.itinerary.title, route: routeOf(plan, state.itinerary.start_point) };
        }
      }
      state.messages.push(reply);
      state.ready = !!json.ready_to_send;
    } else if (res && res.status === 503 && json.fallback) {
      state.messages.push({
        role: 'assistant', error: true,
        content: "Our trip planner is taking a short break. You can still build your trip with the **quick form** below, or send what you have so far to our team."
      });
      showFallbackOffer();
    } else {
      state.messages.push({
        role: 'assistant', error: true,
        content: (json && json.error) || "Sorry, I couldn't reach our planner just now. Please check your connection and try again."
      });
      // Let them retry the same message
      state.messages = state.messages.filter((m, i, all) => !(i === all.length - 2 && m.role === 'user' && m.content === text));
      $('pcText').value = text;
    }
    render();
    save();
  }

  function showFallbackOffer() {
    $('pcFallback').hidden = false;
  }

  // ---------- Sending to the team ----------

  function stylePackage(it) {
    return [it.stay && `${it.stay} stays`, it.transport, it.pace && `${it.pace} pace`].filter(Boolean).join(' · ') || 'To be discussed';
  }

  function planText(it, ref) {
    const lines = [`Custom Himalayan trip (chat): ${it.title || it.regions.join(' + ') || 'Himalayas'}`];
    if (ref) lines.push(`Ref: ${ref}`);
    if (it.regions.length) lines.push(`Places: ${it.regions.join(' + ')}`);
    lines.push(`Dates: ${it.dates_text || it.start_date || 'Flexible'}${planDays() ? ` · ${planDays()} days` : ''}`);
    const who = [peopleText(it), it.group_type, it.start_point && `from ${it.start_point}`].filter(Boolean).join(' · ');
    if (who) lines.push(`Group: ${who}`);
    lines.push(`Style: ${stylePackage(it)}`);
    if (it.budget_per_person) lines.push(`Budget: ${budgetText(it.budget_per_person)}`);
    if (it.activities.length) lines.push(`Wish list: ${it.activities.join(', ')}`);
    lines.push('');
    it.plan.forEach(d => {
      let line = `Day ${d.day}: ${d.title}`;
      if (d.stops.length) line += ` | ${d.stops.join(', ')}`;
      if (d.sleep) line += ` | Night: ${d.sleep}`;
      if (d.note) line += ` | ${d.note}`;
      lines.push(line);
    });
    if (it.notes) { lines.push(''); lines.push(`Notes: ${it.notes}`); }
    return lines.join('\n');
  }

  function openSendDialog() {
    if (!planDays()) return;
    $('pcSendForm').hidden = false;
    $('pcSendDone').hidden = true;
    $('pcSendError').hidden = true;
    $('pcCallbackNote').textContent = Leads.callbackPromise($('pcCallTime').value);
    $('pcBudgetField').innerHTML = budgetSlider('pcBudget', state.itinerary.budget_per_person);
    syncSlider($('pcBudget'));
    const dialog = $('pcSendDialog');
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    setTimeout(() => $('pcName').focus(), 50);
  }

  function closeSendDialog() {
    const dialog = $('pcSendDialog');
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
  }

  async function submitPlan(e) {
    e.preventDefault();
    const name = $('pcName').value.trim();
    const phone = $('pcPhone').value;
    const errorEl = $('pcSendError');
    const showError = msg => { errorEl.innerHTML = msg; errorEl.hidden = false; };
    if (name.length < 2) return showError('Please tell us your name.');
    if (!Leads.isValidPhone(phone)) return showError('Please enter a valid mobile number so our expert can call you.');

    state.itinerary.budget_per_person = Number($('pcBudget').value);
    const it = state.itinerary;
    const ref = 'PLAN_' + Date.now().toString(36).toUpperCase();
    const travellers = (it.adults || 0) + (it.children || 0);
    const conversation = state.messages
      .filter(m => !m.error)
      .slice(-40)
      .map(m => `${m.role === 'user' ? 'Traveller' : 'Banjara'}: ${m.content}`.slice(0, 900));
    const notes = [it.notes, $('pcNotes').value.trim()].filter(Boolean).join('\n');

    const payload = {
      inquiry_id: ref,
      type: 'custom_itinerary',
      trip_id: 'custom_itinerary',
      trip_title: `Custom trip: ${it.title || it.regions.join(' + ') || 'Himalayas'} (${planDays()} days)`,
      price: 'Quote pending',
      selected_date: it.dates_text || it.start_date || 'Flexible',
      selected_package: stylePackage(it),
      selected_sub_package: 'N/A',
      customer_name: name,
      phone: Leads.normalisePhone(phone),
      email: $('pcEmail').value.trim(),
      travelers_count: travellers || 1,
      call_time: $('pcCallTime').value,
      message: planText(Object.assign({}, it, { notes }), ''),
      itinerary: {
        source: 'chat',
        regions: it.regions,
        start_date: it.start_date,
        days: planDays(),
        adults: it.adults,
        children: it.children,
        group_type: it.group_type,
        start_point: it.start_point,
        stay: it.stay,
        transport: it.transport,
        pace: it.pace,
        activities: it.activities,
        budget_per_person: it.budget_per_person,
        based_on: it.title,
        plan: it.plan,
        notes,
        conversation
      },
      website: $('pcWebsite').value,
      status: 'new'
    };

    const btn = $('pcSubmit');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    const result = await Leads.postInquiry(payload);
    btn.disabled = false;
    btn.textContent = 'Send my itinerary';

    if (!result.ok) {
      return showError(`Sorry, we couldn't send your itinerary just now${result.error ? ` (${esc(result.error)})` : ''}. Please try again, or <a href="${esc(Leads.whatsappUrl('Hi Awara Banjara! I planned a trip on your website.\n\n' + planText(it, '')))}" target="_blank" rel="noopener">send it on WhatsApp</a>.`);
    }

    $('pcSendForm').hidden = true;
    $('pcSendDone').hidden = false;
    $('pcDoneLead').textContent = Leads.callbackPromise($('pcCallTime').value);
    $('pcDoneRef').textContent = ref;
    $('pcDoneWhatsApp').href = Leads.whatsappUrl(`Hi Awara Banjara! I just planned a private trip on your website.\n\n${planText(it, ref)}`);
    state.messages.push({ role: 'assistant', content: `Sent! Your reference is **${ref}**. ${Leads.callbackPromise($('pcCallTime').value)}` });
    state.ready = false;
    render();
    save();
  }

  // ---------- Mode switching (chat / form) ----------

  function settle() {
    document.body.classList.remove('pc-pending');
  }

  function showChat() {
    $('pcShell').hidden = false;
    document.querySelector('.tb-shell').hidden = true;
    $('pcBackToChat').hidden = true;
    document.body.classList.add('pc-mode-chat');
  }

  function showForm(withBackLink) {
    $('pcShell').hidden = true;
    document.querySelector('.tb-shell').hidden = false;
    $('pcBackToChat').hidden = !withBackLink;
    document.body.classList.remove('pc-mode-chat');
  }

  // ---------- Events ----------

  // Phones: while the keyboard is up, pin the chat card over exactly the
  // visible area above it, so the header, thread and input all stay on
  // screen instead of the browser zooming or panning around the card
  function fitAboveKeyboard() {
    const vv = window.visualViewport;
    const app = document.querySelector('.pc-app');
    const text = $('pcText');
    if (!vv || !app || !window.matchMedia('(max-width: 640px)').matches) return;
    let on = false;
    const fit = () => {
      if (!on) return;
      app.style.setProperty('--pc-kb-top', Math.round(vv.offsetTop + 8) + 'px');
      app.style.setProperty('--pc-kb-h', Math.round(vv.height - 16) + 'px');
      if (!app.classList.contains('pc-kb')) {
        app.classList.add('pc-kb');
        const list = $('pcMessages');
        list.scrollTop = list.scrollHeight;
      }
    };
    text.addEventListener('focus', () => { on = true; fit(); setTimeout(fit, 350); });
    text.addEventListener('blur', () => {
      on = false;
      app.classList.remove('pc-kb');
    });
    vv.addEventListener('resize', fit);
    vv.addEventListener('scroll', fit);
  }

  function bind() {
    $('pcForm').addEventListener('submit', e => {
      e.preventDefault();
      const text = $('pcText').value;
      $('pcText').value = '';
      autoGrow();
      sendMessage(text);
    });
    $('pcText').addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        $('pcForm').requestSubmit();
      }
    });
    const autoGrow = () => {
      const t = $('pcText');
      t.style.height = 'auto';
      t.style.height = Math.min(t.scrollHeight, 140) + 'px';
    };
    $('pcText').addEventListener('input', autoGrow);
    fitAboveKeyboard();

    $('pcSuggestions').addEventListener('click', e => {
      const chip = e.target.closest('.pc-chip');
      if (chip) sendMessage(chip.textContent);
    });
    // Live value next to every budget slider (chat card and send form)
    document.addEventListener('input', e => {
      if (e.target.classList && e.target.classList.contains('pc-budget-range')) syncSlider(e.target);
    });
    $('pcMessages').addEventListener('submit', e => {
      const form = e.target.closest('[data-notify]');
      if (!form) return;
      e.preventDefault();
      submitNotify(form);
    });
    $('pcMessages').addEventListener('click', e => {
      if (e.target.closest('[data-act="send"]')) openSendDialog();
      if (e.target.closest('[data-act="trip"]')) openTrip();
      if (e.target.closest('[data-act="budget"]')) {
        const value = Number($('pcBudgetChat').value);
        state.itinerary.budget_per_person = value;
        sendMessage(`My budget is about ${budgetText(value)}.`);
      }
      const start = e.target.closest('[data-say]');
      if (start) sendMessage(start.dataset.say);
    });
    $('pcTripSend').addEventListener('click', () => { closeTrip(); openSendDialog(); });
    $('pcTripPill').addEventListener('click', openTrip);
    $('pcTripToggle').addEventListener('click', closeTrip);
    $('pcScrim').addEventListener('click', closeTrip);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTrip(); });

    $('pcRestart').addEventListener('click', () => {
      if (state.messages.length > 1 && !confirm('Start a new trip plan? This clears the current chat.')) return;
      state = freshState();
      $('pcFallback').hidden = true;
      render();
      save();
      $('pcText').focus();
    });

    $('pcSendForm').addEventListener('submit', submitPlan);
    $('pcSendClose').addEventListener('click', closeSendDialog);
    $('pcDoneClose').addEventListener('click', closeSendDialog);
    $('pcCallTime').addEventListener('change', () => {
      $('pcCallbackNote').textContent = Leads.callbackPromise($('pcCallTime').value);
    });

    $('pcUseForm').addEventListener('click', () => showForm(true));
    $('pcFallbackForm').addEventListener('click', () => showForm(true));
    $('pcBackToChat').addEventListener('click', () => { showChat(); $('pcText').focus(); });
  }

  // ---------- Boot ----------

  async function chatEnabled() {
    try {
      const res = await fetch(Leads.apiUrl('/trip-chat/status'));
      const json = await res.json();
      return !!json.enabled;
    } catch (e) { return false; }
  }

  async function startFromTrip(tripId) {
    try {
      const res = await fetch(Leads.apiUrl('/trips?includeInactive=false'));
      const json = await res.json();
      const trip = (json.data || []).find(t => String(t.id) === String(tripId));
      if (!trip) return;
      state = freshState();
      state.tripId = String(trip.id);
      render();
      sendMessage(`I'd like to customise your "${trip.title}" trip${trip.duration ? ` (${trip.duration})` : ''}.`);
    } catch (e) {}
  }

  async function init() {
    $('pcCallTime').innerHTML = (DATA.callTimes || Leads.CALL_TIMES).map(t => `<option>${esc(t)}</option>`).join('');
    bind();

    if (!(await chatEnabled())) {
      showForm(false);
      settle();
      return;
    }
    showChat();
    settle();
    render();
    if (tripParam) startFromTrip(tripParam);
    else if (askParam) {
      // Drop it from the URL so a reload doesn't send it again
      params.delete('ask');
      history.replaceState(null, '', location.pathname + (params.toString() ? `?${params}` : '') + location.hash);
      sendMessage(askParam);
    }
  }

  init();
})();
