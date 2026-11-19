/* =========================================================
   Plan Your Himalayan Trip — private itinerary builder
   Five steps (where → when & who → style → day by day → send).
   The draft is kept in localStorage so a refresh doesn't lose
   work; the finished plan is sent as an inquiry of type
   "custom_itinerary" to /api/inquiries.
   ========================================================= */

(function () {
  const DATA = window.TRIP_BUILDER_DATA;
  if (!DATA) return;

  const DRAFT_KEY = 'ab_trip_plan_v1';
  const STEP_COUNT = 5;
  const MAX_DAYS = 30;
  const $ = (id) => document.getElementById(id);

  const regionById = Object.fromEntries(DATA.regions.map(r => [r.id, r]));
  const labelOf = (list, id) => (list.find(o => o.id === id) || {}).label || '';

  function freshState() {
    return {
      step: 0,
      regions: [],
      startDate: '',
      flexible: false,
      days: 7,
      adults: 2,
      children: 0,
      groupType: '',
      startPoint: 'Delhi',
      stay: 'comfort',
      transport: 'suggest',
      pace: 'balanced',
      activities: [],
      itinerary: [],
      basedOn: '',
      name: '',
      phone: '',
      email: '',
      callTime: DATA.callTimes[0],
      notes: ''
    };
  }

  let state = loadDraft() || freshState();
  let himalayanTrips = [];

  // ---------- Draft persistence (per-browser convenience only) ----------

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      const saved = JSON.parse(raw);
      return Object.assign(freshState(), saved);
    } catch (e) { return null; }
  }

  function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function clearDraft() {
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
  }

  // ---------- Helpers ----------

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function shortText(text, max) {
    const clean = String(text || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    const cut = clean.slice(0, max);
    const sentence = cut.lastIndexOf('. ');
    return sentence > max * 0.5 ? cut.slice(0, sentence + 1) : cut.replace(/\s+\S*$/, '') + '…';
  }

  function blankDay() {
    return { title: '', sleep: '', stops: [], note: '' };
  }

  function todayISO() {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function parseISODate(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return null;
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function fmtDate(date, withYear) {
    return date.toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', ...(withYear ? { year: 'numeric' } : {})
    });
  }

  function dateRangeText() {
    const start = parseISODate(state.startDate);
    if (!start) return state.flexible ? 'Flexible dates' : 'Dates not set';
    const end = new Date(start);
    end.setDate(end.getDate() + Math.max(state.itinerary.length || state.days, 1) - 1);
    return `${fmtDate(start, false)} → ${fmtDate(end, true)}${state.flexible ? ' (flexible)' : ''}`;
  }

  function dayDate(i) {
    const start = parseISODate(state.startDate);
    if (!start) return '';
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return fmtDate(d, false);
  }

  function regionNames() {
    return state.regions.map(id => (regionById[id] || {}).name).filter(Boolean);
  }

  function travellersText() {
    const parts = [`${state.adults} adult${state.adults === 1 ? '' : 's'}`];
    if (state.children) parts.push(`${state.children} child${state.children === 1 ? '' : 'ren'}`);
    return parts.join(', ');
  }

  function dayTitle(day, i) {
    if (day.title) return day.title;
    const prev = i === 0 ? state.startPoint : state.itinerary[i - 1].sleep;
    if (!day.sleep) return 'Plan to be decided';
    if (i === 0) return prev && prev !== 'Other' && prev !== day.sleep ? `${prev} → ${day.sleep}` : `Arrive in ${day.sleep}`;
    return prev && prev !== day.sleep ? `${prev} → ${day.sleep}` : `Explore ${day.sleep}`;
  }

  function callbackPromise() {
    return window.AwaraLeads.callbackPromise(state.callTime);
  }

  // ---------- Suggested route ----------

  // Rough west-to-east order so a combined route doesn't zig-zag
  const REGION_ORDER = ['kashmir', 'zanskar', 'ladakh', 'spiti', 'himachal', 'uttarakhand', 'northeast'];

  function suggestedRoute(totalDays) {
    const ordered = REGION_ORDER.filter(id => state.regions.includes(id));
    let nights = [];
    ordered.forEach(id => {
      const route = regionById[id].route.slice();
      // Don't repeat a town where two regions meet (Spiti ends near Manali etc.)
      if (nights.length && nights[nights.length - 1] === route[0]) route.shift();
      nights = nights.concat(route);
    });
    if (!nights.length) return [];

    if (nights.length > totalDays) {
      // Keep the first and last night, sample evenly in between
      const picked = [];
      for (let i = 0; i < totalDays; i++) {
        picked.push(nights[Math.round(i * (nights.length - 1) / Math.max(totalDays - 1, 1))]);
      }
      nights = picked;
    } else {
      // Add extra nights spread across the trip
      let cursor = 1;
      while (nights.length < totalDays) {
        const at = Math.min(cursor, nights.length - 1);
        nights.splice(at + 1, 0, nights[at]);
        cursor = (cursor + 3) % Math.max(nights.length - 1, 1);
      }
    }
    return nights.map(sleep => ({ title: '', sleep, stops: [], note: '' }));
  }

  function itineraryFromTrip(trip) {
    const days = Array.isArray(trip.itinerary) ? trip.itinerary : [];
    return days.slice(0, MAX_DAYS).map(d => ({
      title: String(d.title || '').slice(0, 120),
      sleep: '',
      stops: [],
      // Just the day's headline: the full trip-page copy is too long to edit or read in an alert
      note: shortText(Array.isArray(d.points) && d.points.length ? d.points[0] : String(d.details || ''), 160)
    }));
  }

  function regionsForTrip(trip) {
    const cats = String(trip.category || '').toLowerCase();
    const ids = DATA.regions
      .filter(r => r.tripTitleMatch ? r.tripTitleMatch.test(trip.title || '') : r.tripCategories.some(c => cats.includes(c)))
      .map(r => r.id);
    // A Zanskar trip is filed under ladakh_tours; don't also tick Ladakh for it
    if (ids.includes('zanskar') && !/ladakh/i.test(trip.title || '')) return ids.filter(id => id !== 'ladakh');
    return ids;
  }

  // ---------- Warnings ----------

  function seasonWarnings() {
    const start = parseISODate(state.startDate);
    if (!start) return [];
    const month = start.getMonth() + 1;
    return state.regions
      .map(id => regionById[id])
      .filter(r => r && !r.openMonths.includes(month))
      .map(r => `<strong>${esc(r.name)} in ${start.toLocaleDateString('en-IN', { month: 'long' })}:</strong> ${esc(r.seasonNote)} Our expert will suggest the best way to do it.`);
  }

  function routeWarnings() {
    const out = [];
    const regions = state.regions.map(id => regionById[id]).filter(Boolean);
    const dayCount = state.itinerary.length || state.days;

    if (regions.length) {
      const needed = regions.reduce((sum, r) => sum + r.minDays, 0) - (regions.length - 1);
      if (dayCount < needed) {
        out.push(`<strong>${dayCount} days is tight</strong> for ${esc(regionNames().join(' + '))}. Most travellers take at least ${needed} days, but our expert can suggest what fits.`);
      }
    }

    if (state.regions.includes('northeast') && state.regions.length > 1) {
      out.push('<strong>The Northeast is far from the western Himalayas.</strong> Combining them usually adds a flight and a travel day.');
    }

    const highAltitude = state.regions.some(id => id === 'ladakh' || id === 'zanskar');
    if (state.regions.includes('ladakh') && state.itinerary.length > 1) {
      const firstLeh = state.itinerary.findIndex(d => /^leh$/i.test(d.sleep.trim()));
      if (firstLeh === 0 && !/^leh$/i.test(state.itinerary[1].sleep.trim())) {
        out.push('<strong>Rest in Leh first.</strong> If you fly into Leh, plan at least one easy day there to acclimatise before heading to higher passes.');
      }
    }

    if (state.children && (highAltitude || state.regions.includes('spiti'))) {
      out.push('Travelling with children at high altitude: we\'ll plan a slower climb and shorter driving days.');
    }
    return out;
  }

  function renderWarnings(el, list) {
    el.innerHTML = list.map(w => `<p class="tb-warning">${w}</p>`).join('');
  }

  // ---------- Static option rendering ----------

  function renderRegions() {
    $('tbRegions').innerHTML = DATA.regions.map(r => `
      <button type="button" class="tb-region${state.regions.includes(r.id) ? ' is-selected' : ''}" data-region="${r.id}" aria-pressed="${state.regions.includes(r.id)}">
        <img src="${esc(r.image)}" alt="" loading="lazy">
        <span class="tb-region-text">
          <strong>${esc(r.name)}</strong>
          <small>${esc(r.tagline)}</small>
        </span>
        <span class="tb-region-tick" aria-hidden="true">✓</span>
      </button>`).join('');
  }

  function renderChips(el, items, selected) {
    el.innerHTML = items.map(label => {
      const on = Array.isArray(selected) ? selected.includes(label) : selected === label;
      return `<button type="button" class="tb-chip${on ? ' is-selected' : ''}" data-value="${esc(label)}" aria-pressed="${on}">${esc(label)}</button>`;
    }).join('');
  }

  function renderOptions(el, items, selected) {
    el.innerHTML = items.map(o => `
      <button type="button" class="tb-option${o.id === selected ? ' is-selected' : ''}" data-value="${o.id}" aria-pressed="${o.id === selected}">
        <strong>${esc(o.label)}</strong><small>${esc(o.hint)}</small>
      </button>`).join('');
  }

  function renderStaticInputs() {
    renderRegions();
    renderChips($('tbGroupTypes'), DATA.groupTypes, state.groupType);
    renderChips($('tbActivities'), DATA.activities, state.activities);
    renderOptions($('tbStays'), DATA.stays, state.stay);
    renderOptions($('tbTransport'), DATA.transport, state.transport);
    renderOptions($('tbPaces'), DATA.paces, state.pace);

    $('tbStartPoint').innerHTML = DATA.startPoints.map(p => `<option${p === state.startPoint ? ' selected' : ''}>${esc(p)}</option>`).join('');
    $('tbCallTime').innerHTML = DATA.callTimes.map(p => `<option${p === state.callTime ? ' selected' : ''}>${esc(p)}</option>`).join('');

    $('tbStartDate').min = todayISO();
    $('tbStartDate').value = state.startDate;
    $('tbFlexible').checked = state.flexible;
    $('tbDays').value = state.days;
    $('tbDaysOut').textContent = state.days;
    $('tbAdults').textContent = state.adults;
    $('tbChildren').textContent = state.children;
    $('tbName').value = state.name;
    $('tbPhone').value = state.phone;
    $('tbEmail').value = state.email;
    $('tbNotes').value = state.notes;
  }

  function renderPlaceList() {
    const places = new Set();
    state.regions.forEach(id => regionById[id].places.forEach(p => places.add(p)));
    if (!places.size) DATA.regions.forEach(r => r.places.forEach(p => places.add(p)));
    $('tbPlaceList').innerHTML = [...places].map(p => `<option value="${esc(p)}">`).join('');
  }

  function renderTripOptions() {
    const select = $('tbFromTrip');
    const matches = himalayanTrips.filter(t => regionsForTrip(t).some(id => state.regions.includes(id)));
    const others = himalayanTrips.filter(t => !matches.includes(t));
    const opt = t => `<option value="${esc(t.id)}">${esc(t.title)}${t.duration ? ' · ' + esc(t.duration) : ''}</option>`;
    select.innerHTML = '<option value="">Choose a trip…</option>' +
      (matches.length ? `<optgroup label="Matches your places">${matches.map(opt).join('')}</optgroup>` : '') +
      (others.length ? `<optgroup label="Other Himalayan trips">${others.map(opt).join('')}</optgroup>` : '');
  }

  // ---------- Day-by-day editor ----------

  function renderDays() {
    const list = $('tbDayList');
    if (!state.itinerary.length) {
      list.innerHTML = '<li class="tb-days-empty">Pick one of the options above to get started.</li>';
    } else {
      list.innerHTML = state.itinerary.map((day, i) => `
        <li class="tb-day" data-index="${i}">
          <div class="tb-day-head">
            <span class="tb-day-num">Day ${i + 1}${dayDate(i) ? `<small>${esc(dayDate(i))}</small>` : ''}</span>
            <input type="text" class="tb-day-title" data-k="title" value="${esc(day.title)}" placeholder="${esc(dayTitle(Object.assign({}, day, { title: '' }), i))}" aria-label="Day ${i + 1} title" maxlength="120">
            <div class="tb-day-actions">
              <button type="button" data-act="up" aria-label="Move day ${i + 1} up" ${i === 0 ? 'disabled' : ''}>↑</button>
              <button type="button" data-act="down" aria-label="Move day ${i + 1} down" ${i === state.itinerary.length - 1 ? 'disabled' : ''}>↓</button>
              <button type="button" data-act="remove" aria-label="Remove day ${i + 1}">✕</button>
            </div>
          </div>
          <div class="tb-day-body">
            <label class="tb-mini">Night stay
              <input type="text" class="tb-input" data-k="sleep" list="tbPlaceList" value="${esc(day.sleep)}" placeholder="e.g. Kaza" maxlength="80">
            </label>
            <div class="tb-mini">Places &amp; things to do
              <div class="tb-stops">
                ${day.stops.map((s, si) => `<span class="tb-stop">${esc(s)}<button type="button" data-act="unstop" data-stop="${si}" aria-label="Remove ${esc(s)}">×</button></span>`).join('')}
                <input type="text" class="tb-stop-input" list="tbPlaceList" placeholder="Add a place or activity, then Enter" maxlength="80" aria-label="Add a place to day ${i + 1}">
              </div>
            </div>
            <label class="tb-mini tb-mini-wide">Notes
              <textarea class="tb-input" data-k="note" rows="2" maxlength="400" placeholder="Anything special for this day">${esc(day.note)}</textarea>
            </label>
          </div>
        </li>`).join('');
    }
    renderWarnings($('tbRouteWarnings'), routeWarnings());
  }

  // Re-render without kicking the visitor out of the field they're typing in
  function renderDaysKeepFocus() {
    const active = document.activeElement;
    const li = active && active.closest ? active.closest('.tb-day') : null;
    let selector = null;
    if (li && active.dataset.k) selector = `[data-k="${active.dataset.k}"]`;
    else if (li && active.classList.contains('tb-stop-input')) selector = '.tb-stop-input';
    const index = li ? li.dataset.index : null;
    renderDays();
    if (selector) {
      const again = document.querySelector(`.tb-day[data-index="${index}"] ${selector}`);
      if (again) again.focus();
    }
  }

  // A night stay changes the next day's auto title and the warnings, nothing else
  function refreshDayHints() {
    document.querySelectorAll('.tb-day').forEach(li => {
      const i = Number(li.dataset.index);
      const day = state.itinerary[i];
      if (day) li.querySelector('.tb-day-title').placeholder = dayTitle(Object.assign({}, day, { title: '' }), i);
    });
    renderWarnings($('tbRouteWarnings'), routeWarnings());
  }

  function setItinerary(days, basedOn) {
    state.itinerary = days.slice(0, MAX_DAYS);
    state.basedOn = basedOn || '';
    if (state.itinerary.length) state.days = state.itinerary.length;
    renderDays();
    saveDraft();
  }

  function addStop(index, input) {
    const value = input.value.trim();
    if (!value) return;
    const day = state.itinerary[index];
    if (!day.stops.includes(value) && day.stops.length < 12) day.stops.push(value);
    input.value = '';
    renderDays();
    saveDraft();
    const again = document.querySelector(`.tb-day[data-index="${index}"] .tb-stop-input`);
    if (again) again.focus();
  }

  // ---------- Review ----------

  function renderReview() {
    const style = [
      `${labelOf(DATA.stays, state.stay)} stays`,
      labelOf(DATA.transport, state.transport) === 'Suggest for me' ? 'transport: your suggestion' : labelOf(DATA.transport, state.transport),
      `${labelOf(DATA.paces, state.pace)} pace`
    ];
    const rows = [
      ['Where', regionNames().join(' + '), 0],
      ['When', `${dateRangeText()} · ${state.itinerary.length || state.days} days`, 1],
      ['Who', `${travellersText()}${state.groupType ? ' · ' + state.groupType : ''} · starting from ${state.startPoint}`, 1],
      ['Style', style.join(' · '), 2]
    ];
    if (state.activities.length) rows.push(['Wish list', state.activities.join(', '), 2]);
    if (state.basedOn) rows.push(['Based on', state.basedOn, 3]);

    const warnings = seasonWarnings().concat(routeWarnings());

    $('tbReview').innerHTML = `
      <dl class="tb-summary">
        ${rows.map(([k, v, step]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd><button type="button" class="tb-link" data-goto="${step}">Edit</button></div>`).join('')}
      </dl>
      ${warnings.length ? `<div class="tb-warnings">${warnings.map(w => `<p class="tb-warning">${w}</p>`).join('')}</div>` : ''}
      <div class="tb-timeline-head"><h3>Day by day</h3><button type="button" class="tb-link" data-goto="3">Edit days</button></div>
      <ol class="tb-timeline">
        ${state.itinerary.map((d, i) => `
          <li>
            <span class="tb-tl-day">Day ${i + 1}${dayDate(i) ? ` · ${esc(dayDate(i))}` : ''}</span>
            <strong>${esc(dayTitle(d, i))}</strong>
            ${d.stops.length ? `<span>${esc(d.stops.join(' · '))}</span>` : ''}
            ${d.note ? `<em>${esc(d.note)}</em>` : ''}
            ${d.sleep ? `<span class="tb-tl-sleep">Night: ${esc(d.sleep)}</span>` : ''}
          </li>`).join('')}
      </ol>`;
    $('tbCallbackNote').textContent = callbackPromise();
  }

  // ---------- Plain-text summary (admin message, WhatsApp) ----------

  function planText(ref) {
    const lines = [];
    lines.push(`Custom Himalayan trip: ${regionNames().join(' + ')}`);
    if (ref) lines.push(`Ref: ${ref}`);
    lines.push(`Dates: ${dateRangeText()} · ${state.itinerary.length || state.days} days`);
    lines.push(`Group: ${travellersText()}${state.groupType ? ' · ' + state.groupType : ''} · from ${state.startPoint}`);
    lines.push(`Style: ${labelOf(DATA.stays, state.stay)} stays · ${labelOf(DATA.transport, state.transport)} · ${labelOf(DATA.paces, state.pace)} pace`);
    if (state.activities.length) lines.push(`Wish list: ${state.activities.join(', ')}`);
    if (state.basedOn) lines.push(`Based on: ${state.basedOn}`);
    lines.push('');
    state.itinerary.forEach((d, i) => {
      let line = `Day ${i + 1}: ${dayTitle(d, i)}`;
      if (d.stops.length) line += ` | ${d.stops.join(', ')}`;
      if (d.sleep) line += ` | Night: ${d.sleep}`;
      if (d.note) line += ` | ${shortText(d.note, 200)}`;
      lines.push(line);
    });
    if (state.notes) { lines.push(''); lines.push(`Notes: ${state.notes}`); }
    return lines.join('\n');
  }

  function whatsappLink(ref) {
    let text = `Hi Awara Banjara! I just planned a private trip on your website.\n\n${planText(ref)}`;
    if (text.length > 1800) text = text.slice(0, 1790) + '…';
    return `https://wa.me/${DATA.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  // ---------- Step navigation ----------

  function showError(msg) {
    const el = $('tbError');
    el.innerHTML = msg || '';
    el.hidden = !msg;
  }

  function validateStep(step) {
    if (step === 0 && !state.regions.length) return 'Pick at least one place to continue.';
    if (step === 1) {
      if (!state.startDate && !state.flexible) return 'Pick a start date, or tick "My dates are flexible".';
      if (state.startDate && state.startDate < todayISO()) return 'That start date has already passed. Please pick a future date.';
    }
    if (step === 3 && !state.itinerary.length) return 'Add at least one day to your trip.';
    if (step === 4) {
      if (state.name.trim().length < 2) return 'Please tell us your name.';
      const digits = state.phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 15) return 'Please enter a valid mobile number so our expert can call you.';
    }
    return '';
  }

  function goTo(step) {
    state.step = Math.max(0, Math.min(STEP_COUNT - 1, step));
    showError('');

    if (state.step === 3) {
      renderPlaceList();
      renderTripOptions();
      if (!state.itinerary.length) {
        setItinerary(suggestedRoute(state.days), '');
      } else if (state.itinerary.length < state.days) {
        // Days were raised on step 2 after building: add blank days at the end
        while (state.itinerary.length < state.days) state.itinerary.push(blankDay());
      }
      renderDays();
    }
    if (state.step === 4) renderReview();
    if (state.step === 1) {
      // Adding/removing days on step 4 changes the trip length
      $('tbDays').value = Math.min(state.days, Number($('tbDays').max));
      $('tbDaysOut').textContent = state.days;
      renderWarnings($('tbSeasonWarnings'), seasonWarnings());
    }

    document.querySelectorAll('.tb-step').forEach(el => { el.hidden = Number(el.dataset.step) !== state.step; });
    document.querySelectorAll('#tbProgress li').forEach(li => {
      const s = Number(li.dataset.step);
      li.classList.toggle('is-active', s === state.step);
      li.classList.toggle('is-done', s < state.step);
    });
    $('tbBack').hidden = state.step === 0;
    $('tbNext').hidden = state.step === STEP_COUNT - 1;
    $('tbSubmit').hidden = state.step !== STEP_COUNT - 1;
    saveDraft();
  }

  function scrollToShell() {
    const shell = document.querySelector('.tb-shell');
    const top = shell.getBoundingClientRect().top + window.scrollY - 90;
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
  }

  // ---------- Submit ----------

  async function submitPlan(e) {
    e.preventDefault();
    const problem = validateStep(4);
    if (problem) { showError(problem); return; }

    const ref = 'PLAN_' + Date.now().toString(36).toUpperCase();
    const totalDays = state.itinerary.length;
    const payload = {
      inquiry_id: ref,
      type: 'custom_itinerary',
      trip_id: 'custom_itinerary',
      trip_title: `Custom trip: ${regionNames().join(' + ')} (${totalDays} days)`,
      price: 'Quote pending',
      selected_date: dateRangeText(),
      selected_package: `${labelOf(DATA.stays, state.stay)} stays · ${labelOf(DATA.transport, state.transport)} · ${labelOf(DATA.paces, state.pace)} pace`,
      selected_sub_package: 'N/A',
      customer_name: state.name.trim(),
      phone: window.AwaraLeads.normalisePhone(state.phone),
      email: state.email.trim(),
      travelers_count: state.adults + state.children,
      call_time: state.callTime,
      message: planText(''),
      itinerary: {
        regions: regionNames(),
        start_date: state.startDate,
        flexible: state.flexible,
        days: totalDays,
        adults: state.adults,
        children: state.children,
        group_type: state.groupType,
        start_point: state.startPoint,
        stay: labelOf(DATA.stays, state.stay),
        transport: labelOf(DATA.transport, state.transport),
        pace: labelOf(DATA.paces, state.pace),
        activities: state.activities,
        based_on: state.basedOn,
        plan: state.itinerary.map((d, i) => ({
          day: i + 1, title: dayTitle(d, i), sleep: d.sleep, stops: d.stops, note: d.note
        })),
        notes: state.notes.trim()
      },
      website: $('tbWebsite').value,
      status: 'new'
    };

    const btn = $('tbSubmit');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    showError('');

    let ok = false;
    let errorText = '';
    try {
      const url = typeof window.getAwaraApiUrl === 'function' ? window.getAwaraApiUrl('/inquiries') : '/api/inquiries';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      ok = res.ok;
      if (ok && window.awaraTrackLead) window.awaraTrackLead(payload);
      if (!ok) {
        const json = await res.json().catch(() => ({}));
        errorText = json.error || '';
      }
    } catch (err) { ok = false; }

    btn.disabled = false;
    btn.textContent = original;

    if (!ok) {
      showError(`Sorry, we couldn't send your itinerary just now${errorText ? ` (${esc(errorText)})` : ''}. Please try again, or <a href="${esc(whatsappLink(''))}" target="_blank" rel="noopener">send it to us on WhatsApp</a>.`);
      return;
    }

    $('tbDoneLead').textContent = callbackPromise();
    $('tbDoneRef').textContent = ref;
    $('tbDoneWhatsApp').href = whatsappLink(ref);
    $('tbForm').hidden = true;
    $('tbProgress').hidden = true;
    $('tbDone').hidden = false;
    clearDraft();
    scrollToShell();
  }

  // ---------- Events ----------

  function bindEvents() {
    $('tbRegions').addEventListener('click', e => {
      const card = e.target.closest('[data-region]');
      if (!card) return;
      const id = card.dataset.region;
      state.regions = state.regions.includes(id) ? state.regions.filter(r => r !== id) : state.regions.concat(id);
      // Toggle in place: re-rendering would reload every photo
      const on = state.regions.includes(id);
      card.classList.toggle('is-selected', on);
      card.setAttribute('aria-pressed', on);
      saveDraft();
    });

    document.querySelectorAll('[data-single]').forEach(group => {
      group.addEventListener('click', e => {
        const btn = e.target.closest('[data-value]');
        if (!btn) return;
        const key = group.dataset.single;
        state[key] = state[key] === btn.dataset.value && key === 'groupType' ? '' : btn.dataset.value;
        group.querySelectorAll('[data-value]').forEach(b => {
          const on = b.dataset.value === state[key];
          b.classList.toggle('is-selected', on);
          b.setAttribute('aria-pressed', on);
        });
        saveDraft();
      });
    });

    $('tbActivities').addEventListener('click', e => {
      const btn = e.target.closest('[data-value]');
      if (!btn) return;
      const v = btn.dataset.value;
      state.activities = state.activities.includes(v) ? state.activities.filter(a => a !== v) : state.activities.concat(v);
      btn.classList.toggle('is-selected', state.activities.includes(v));
      btn.setAttribute('aria-pressed', state.activities.includes(v));
      saveDraft();
    });

    $('tbStartDate').addEventListener('change', e => {
      state.startDate = e.target.value;
      renderWarnings($('tbSeasonWarnings'), seasonWarnings());
      saveDraft();
    });
    $('tbFlexible').addEventListener('change', e => { state.flexible = e.target.checked; saveDraft(); });
    $('tbDays').addEventListener('input', e => {
      state.days = Number(e.target.value);
      $('tbDaysOut').textContent = state.days;
      saveDraft();
    });
    $('tbStartPoint').addEventListener('change', e => { state.startPoint = e.target.value; saveDraft(); });
    $('tbCallTime').addEventListener('change', e => {
      state.callTime = e.target.value;
      $('tbCallbackNote').textContent = callbackPromise();
      saveDraft();
    });

    document.querySelectorAll('.tb-stepper').forEach(stepper => {
      stepper.addEventListener('click', e => {
        const btn = e.target.closest('[data-delta]');
        if (!btn) return;
        const key = stepper.dataset.target;
        const min = key === 'adults' ? 1 : 0;
        state[key] = Math.max(min, Math.min(99, state[key] + Number(btn.dataset.delta)));
        stepper.querySelector('output').textContent = state[key];
        saveDraft();
      });
    });

    [['tbName', 'name'], ['tbPhone', 'phone'], ['tbEmail', 'email'], ['tbNotes', 'notes']].forEach(([id, key]) => {
      $(id).addEventListener('input', e => { state[key] = e.target.value.slice(0, key === 'notes' ? 1000 : 120); saveDraft(); });
    });

    // Day editor: typing updates state without re-rendering (keeps focus)
    const dayList = $('tbDayList');
    dayList.addEventListener('input', e => {
      const li = e.target.closest('.tb-day');
      const key = e.target.dataset.k;
      if (!li || !key) return;
      state.itinerary[Number(li.dataset.index)][key] = e.target.value;
      saveDraft();
    });
    dayList.addEventListener('change', e => {
      if (e.target.dataset.k === 'sleep') refreshDayHints();
    });
    dayList.addEventListener('keydown', e => {
      if (!e.target.classList.contains('tb-stop-input')) return;
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addStop(Number(e.target.closest('.tb-day').dataset.index), e.target);
      } else if (e.key === 'Backspace' && !e.target.value) {
        const idx = Number(e.target.closest('.tb-day').dataset.index);
        if (state.itinerary[idx].stops.length) {
          state.itinerary[idx].stops.pop();
          renderDays();
          saveDraft();
          const again = document.querySelector(`.tb-day[data-index="${idx}"] .tb-stop-input`);
          if (again) again.focus();
        }
      }
    });
    dayList.addEventListener('focusout', e => {
      // Picking from the datalist or tapping away still adds the stop
      if (e.target.classList.contains('tb-stop-input') && e.target.value.trim()) {
        const idx = Number(e.target.closest('.tb-day').dataset.index);
        const value = e.target.value.trim();
        const day = state.itinerary[idx];
        if (!day.stops.includes(value) && day.stops.length < 12) day.stops.push(value);
        e.target.value = '';
        saveDraft();
        setTimeout(renderDaysKeepFocus, 0);
      }
    });
    dayList.addEventListener('click', e => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const i = Number(btn.closest('.tb-day').dataset.index);
      const days = state.itinerary;
      if (btn.dataset.act === 'up' && i > 0) [days[i - 1], days[i]] = [days[i], days[i - 1]];
      if (btn.dataset.act === 'down' && i < days.length - 1) [days[i + 1], days[i]] = [days[i], days[i + 1]];
      if (btn.dataset.act === 'remove') {
        days.splice(i, 1);
        state.days = Math.max(days.length, 1);
      }
      if (btn.dataset.act === 'unstop') days[i].stops.splice(Number(btn.dataset.stop), 1);
      renderDays();
      saveDraft();
    });

    $('tbAddDay').addEventListener('click', () => {
      if (state.itinerary.length >= MAX_DAYS) return;
      const last = state.itinerary[state.itinerary.length - 1];
      state.itinerary.push(Object.assign(blankDay(), { sleep: last ? last.sleep : '' }));
      state.days = state.itinerary.length;
      renderDays();
      saveDraft();
      const inputs = document.querySelectorAll('.tb-day-title');
      if (inputs.length) inputs[inputs.length - 1].focus();
    });

    const confirmReplace = () => !state.itinerary.some(d => d.title || d.note || d.stops.length) ||
      confirm('Replace the days you have planned so far?');

    $('tbUseSuggested').addEventListener('click', () => {
      if (confirmReplace()) setItinerary(suggestedRoute(state.days), '');
    });
    $('tbStartBlank').addEventListener('click', () => {
      if (!confirmReplace()) return;
      setItinerary(Array.from({ length: state.days }, blankDay), '');
    });
    $('tbFromTrip').addEventListener('change', e => {
      const trip = himalayanTrips.find(t => String(t.id) === e.target.value);
      e.target.value = '';
      if (!trip || !confirmReplace()) return;
      setItinerary(itineraryFromTrip(trip), trip.title);
    });

    $('tbNext').addEventListener('click', () => {
      const problem = validateStep(state.step);
      if (problem) { showError(problem); return; }
      goTo(state.step + 1);
      scrollToShell();
    });
    $('tbBack').addEventListener('click', () => { goTo(state.step - 1); scrollToShell(); });

    $('tbReview').addEventListener('click', e => {
      const btn = e.target.closest('[data-goto]');
      if (btn) { goTo(Number(btn.dataset.goto)); scrollToShell(); }
    });
    $('tbProgress').addEventListener('click', e => {
      const li = e.target.closest('li');
      // Only allow jumping back to steps already completed
      if (li && Number(li.dataset.step) < state.step) { goTo(Number(li.dataset.step)); scrollToShell(); }
    });

    $('tbForm').addEventListener('submit', submitPlan);

    $('tbPlanAnother').addEventListener('click', () => {
      state = freshState();
      renderStaticInputs();
      $('tbForm').hidden = false;
      $('tbProgress').hidden = false;
      $('tbDone').hidden = true;
      goTo(0);
      scrollToShell();
    });
  }

  // ---------- Boot ----------

  async function loadTrips() {
    try {
      const url = typeof window.getAwaraApiUrl === 'function' ? window.getAwaraApiUrl('/trips?includeInactive=false') : '/api/trips?includeInactive=false';
      const res = await fetch(url);
      const json = await res.json();
      const trips = Array.isArray(json.data) ? json.data : [];
      himalayanTrips = trips.filter(t =>
        t.is_coming_soon !== true &&
        Array.isArray(t.itinerary) && t.itinerary.length &&
        regionsForTrip(t).length
      );
    } catch (e) { himalayanTrips = []; }
    if (!himalayanTrips.length) {
      $('tbFromTrip').closest('.tb-starter').hidden = true;
    }
  }

  async function init() {
    const params = new URLSearchParams(location.search);
    const tripParam = params.get('trip');
    const regionParam = params.get('region');

    renderStaticInputs();
    bindEvents();
    goTo(state.step);

    await loadTrips();
    renderTripOptions();

    // "Customise this trip" from a trip page: prefill places and days
    if (tripParam) {
      const trip = himalayanTrips.find(t => String(t.id) === tripParam);
      if (trip) {
        state = Object.assign(freshState(), { name: state.name, phone: state.phone, email: state.email });
        state.regions = regionsForTrip(trip);
        state.itinerary = itineraryFromTrip(trip);
        state.basedOn = trip.title;
        state.days = state.itinerary.length || state.days;
        renderStaticInputs();
        goTo(1);
      }
      history.replaceState(null, '', location.pathname);
    } else if (regionParam && regionById[regionParam] && !state.regions.length) {
      state.regions = [regionParam];
      renderRegions();
      saveDraft();
      history.replaceState(null, '', location.pathname);
    }
  }

  init();
})();
