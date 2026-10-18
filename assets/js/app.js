// Student test app: screens, navigation, timing and saving progress.
(function () {
  var EP = window.EP;
  var t = EP.t, tx = EP.tx, esc = EP.esc;
  var STORE_KEY = 'ep_career_state_v1';
  var LANG_KEY = 'ep_lang';

  var app = document.getElementById('app');
  var state = EP.store.get(STORE_KEY) || newState();
  var view = { name: state.profile ? 'hub' : 'welcome' };
  var shownAt = 0;
  var timer = null;

  EP.lang = EP.store.get(LANG_KEY) || 'en';

  function newState() {
    return { v: 1, profile: null, responses: {}, sections: {}, completed: {}, pos: {}, startedAt: null, finishedAt: null };
  }

  function save() { EP.store.set(STORE_KEY, state); }

  function now() { return (window.performance && performance.now) ? performance.now() : Date.now(); }

  function go(name, extra) {
    if (timer) { clearInterval(timer); timer = null; }
    view = Object.assign({ name: name }, extra || {});
    render();
    window.scrollTo(0, 0);
  }

  function shell(body) {
    return '<header class="topbar"><div class="brand"><span class="logo">◎</span> ' + esc(t('appName')) + '</div>' +
      '<button class="btn ghost small" data-act="lang">' + esc(t('langToggle')) + '</button></header>' +
      '<main class="container">' + body + '</main>';
  }

  function testById(id) { return EP[id]; }

  function itemCount(test) {
    if (test.kind === 'mcq') return test.sections.reduce(function (n, s) { return n + s.items.length; }, 0);
    return test.items.length;
  }

  function answeredCount(test) {
    return Object.keys(state.responses[test.id] || {}).length;
  }

  // ---------- Screens ----------

  function renderWelcome() {
    var resume = state.profile ? '<button class="btn" data-act="hub">' + esc(t('continueTests')) + '</button>' : '';
    return shell(
      '<section class="hero"><h1>' + esc(t('welcomeTitle')) + '</h1><p class="lead">' + esc(t('tagline')) + '</p>' +
      '<p>' + esc(t('welcomeLead')) + '</p></section>' +
      '<section class="card"><h2>' + esc(t('welcomeHowTitle')) + '</h2><ul class="tips">' +
      ['welcomeHow1', 'welcomeHow2', 'welcomeHow3', 'welcomeHow4'].map(function (k) { return '<li>' + esc(t(k)) + '</li>'; }).join('') +
      '</ul></section>' +
      '<div class="actions"><button class="btn primary" data-act="profile">' + esc(t('start')) + '</button>' + resume +
      '<a class="btn ghost" href="counsellor.html">' + esc(t('forCounsellors')) + '</a></div>'
    );
  }

  function renderProfile() {
    var p = state.profile || {};
    var classes = ['8', '9', '10'].map(function (n) {
      return '<option value="' + n + '"' + (p.klass === n ? ' selected' : '') + '>' + esc(t('classOption', { n: n })) + '</option>';
    }).join('');
    var districts = EP.DISTRICTS.map(function (d) {
      return '<option' + (p.district === d ? ' selected' : '') + '>' + esc(d) + '</option>';
    }).join('');
    return shell(
      '<section class="card form"><h2>' + esc(t('profileTitle')) + '</h2>' +
      '<label>' + esc(t('name')) + '<input id="f-name" autocomplete="name" value="' + esc(p.name) + '"></label>' +
      '<label>' + esc(t('klass')) + '<select id="f-class"><option value="">' + esc(t('select')) + '</option>' + classes + '</select></label>' +
      '<label>' + esc(t('school')) + '<input id="f-school" value="' + esc(p.school) + '"></label>' +
      '<label>' + esc(t('district')) + '<select id="f-district"><option value="">' + esc(t('select')) + '</option>' + districts + '</select></label>' +
      '<label>' + esc(t('counsellorCode')) + '<input id="f-code" value="' + esc(p.code) + '"></label>' +
      '<label class="check"><input type="checkbox" id="f-consent"' + (p.consent ? ' checked' : '') + '> ' + esc(t('consent')) + '</label>' +
      '<p class="error" id="f-error" role="alert"></p>' +
      '<div class="actions"><button class="btn ghost" data-act="welcome">' + esc(t('back')) + '</button>' +
      '<button class="btn primary" data-act="saveProfile">' + esc(t('next')) + '</button></div></section>'
    );
  }

  function renderHub() {
    var rows = EP.ALL_TESTS.map(function (id, i) {
      var test = testById(id);
      var done = state.completed[id];
      var started = !done && (answeredCount(test) > 0 || state.pos[id]);
      var status = done ? 'statusDone' : started ? 'statusProgress' : 'statusNew';
      var btn = done
        ? '<span class="done-mark">✓ ' + esc(t('done')) + '</span>'
        : '<button class="btn primary small" data-act="open" data-id="' + id + '">' + esc(t(started ? 'resume' : 'begin')) + '</button>';
      return '<div class="test-row' + (done ? ' is-done' : '') + '">' +
        '<div class="num">' + (i + 1) + '</div>' +
        '<div class="info"><h3>' + esc(tx(test.title)) + '</h3><p class="muted small">' +
        esc(t('minutes', { n: test.minutes })) + ' · ' + esc(t('questions', { n: itemCount(test) })) + ' · ' + esc(t(status)) + '</p></div>' +
        '<div class="act">' + btn + '</div></div>';
    }).join('');
    var allDone = EP.ALL_TESTS.every(function (id) { return state.completed[id]; });
    var report = state.completed.interest
      ? '<button class="btn ' + (allDone ? 'primary' : '') + '" data-act="report">' + esc(t(allDone ? 'viewReport' : 'viewPartial')) + '</button>'
      : '<p class="muted small">' + esc(t('reportLocked')) + '</p>';
    return shell(
      (allDone ? '<div class="banner success">' + esc(t('allDone')) + '</div>' : '') +
      '<section><h1>' + esc(t('hubTitle')) + '</h1><p class="lead">' + esc(t('hubLead')) + '</p></section>' +
      '<section class="card tests">' + rows + '</section>' +
      '<div class="actions">' + report +
      '<button class="btn ghost small" data-act="reset">' + esc(t('startOver')) + '</button></div>'
    );
  }

  function progressBar(i, n) {
    return '<div class="progress"><span style="width:' + Math.round((i / n) * 100) + '%"></span></div>' +
      '<p class="muted small">' + esc(t('questionOf', { i: i + 1, n: n })) + '</p>';
  }

  function renderIntro(test) {
    return shell(
      '<section class="card"><h1>' + esc(tx(test.title)) + '</h1><p>' + esc(tx(test.intro)) + '</p>' +
      (test.kind === 'likert' ? '<p class="muted small">' + esc(t('keyboardHint')) + '</p>' : '') +
      '<div class="actions"><button class="btn ghost" data-act="hub">' + esc(t('backToTests')) + '</button>' +
      '<button class="btn primary" data-act="beginTest" data-id="' + test.id + '">' + esc(t('beginTest')) + '</button></div></section>'
    );
  }

  function renderLikertItem(test, idx) {
    var item = test.items[idx];
    var cur = (state.responses[test.id] || {})[item.id];
    var opts = EP.scales[test.scale].map(function (o) {
      return '<button class="opt likert' + (cur && cur.v === o.v ? ' selected' : '') + '" data-act="likert" data-v="' + o.v + '">' +
        '<span class="key">' + o.v + '</span>' + esc(tx(o)) + '</button>';
    }).join('');
    return shell(
      '<section class="card question">' + progressBar(idx, test.items.length) +
      '<p class="stem">' + esc(tx(test.stem)) + '</p>' +
      '<h2 class="item">' + esc(tx(item)) + '</h2>' +
      '<div class="options">' + opts + '</div>' +
      '<div class="actions"><button class="btn ghost small" data-act="prev"' + (idx === 0 ? ' disabled' : '') + '>' + esc(t('previous')) + '</button>' +
      '<button class="btn ghost small" data-act="hub">' + esc(t('backToTests')) + '</button></div></section>'
    );
  }

  function renderSectionIntro(test, si) {
    var sec = test.sections[si];
    var dim = test.dims[sec.id];
    return shell(
      '<section class="card"><p class="muted small">' + esc(tx(test.title)) + ' · ' + esc(t('sectionOf', { i: si + 1, n: test.sections.length })) + '</p>' +
      '<h1>' + esc(tx(dim)) + '</h1><p>' + esc(tx(dim.desc)) + '</p>' +
      (si === 0 ? '<p>' + esc(tx(test.intro)) + '</p>' : '') +
      '<p class="example">' + esc(tx(sec.example)) + '</p>' +
      '<p><b>' + esc(t('sectionTime', { n: Math.round(sec.timeLimitSec / 60), q: sec.items.length })) + '</b></p>' +
      '<div class="actions"><button class="btn ghost" data-act="hub">' + esc(t('backToTests')) + '</button>' +
      '<button class="btn primary" data-act="startSection">' + esc(t('startSection')) + '</button></div></section>'
    );
  }

  function fmtTime(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(s / 60);
    s = s % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function renderMcqItem(test, si, idx) {
    var sec = test.sections[si];
    var item = sec.items[idx];
    var cur = (state.responses[test.id] || {})[item.id];
    var letters = ['A', 'B', 'C', 'D', 'E'];
    var opts = item.options.map(function (o, i) {
      return '<button class="opt mcq' + (cur && cur.v === i ? ' selected' : '') + '" data-act="mcq" data-v="' + i + '">' +
        '<span class="key">' + letters[i] + '</span>' + esc(tx(o)) + '</button>';
    }).join('');
    var last = idx === sec.items.length - 1;
    var remaining = state.sections[sec.id].deadline - Date.now();
    return shell(
      '<section class="card question">' +
      '<div class="q-head"><span class="muted small">' + esc(tx(test.dims[sec.id])) + '</span>' +
      '<span class="timer" id="timer">' + esc(t('timeLeft')) + ' <b>' + fmtTime(remaining) + '</b></span></div>' +
      progressBar(idx, sec.items.length) +
      '<h2 class="item">' + esc(tx(item.q)) + '</h2>' +
      '<div class="options">' + opts + '</div>' +
      '<div class="actions"><button class="btn ghost small" data-act="mprev"' + (idx === 0 ? ' disabled' : '') + '>' + esc(t('previous')) + '</button>' +
      (last ? '' : '<button class="btn ghost small" data-act="mnext">' + esc(t('skip')) + '</button>') +
      '<button class="btn small' + (last ? ' primary' : '') + '" data-act="finishSection">' + esc(t('finishSection')) + '</button></div></section>'
    );
  }

  function renderMessage(msg, nextAct, nextLabel) {
    return shell('<section class="card center"><h2>' + esc(msg) + '</h2><div class="actions">' +
      '<button class="btn primary" data-act="' + nextAct + '">' + esc(nextLabel) + '</button></div></section>');
  }

  function renderReport() {
    var result = EP.scoring.score(state);
    return shell(
      '<div class="toolbar no-print">' +
      '<button class="btn ghost small" data-act="hub">' + esc(t('backToTests')) + '</button>' +
      '<button class="btn small" data-act="download">' + esc(t('download')) + '</button>' +
      '<button class="btn primary small" data-act="print">' + esc(t('print')) + '</button></div>' +
      '<p class="muted small no-print">' + esc(t('downloadHint')) + '</p>' +
      EP.report.render(state.profile, result, state)
    );
  }

  // ---------- Test flow helpers ----------

  function openTest(id) {
    var test = testById(id);
    var pos = state.pos[id];
    if (test.kind === 'likert') {
      if (pos === undefined) go('intro', { id: id });
      else go('likert', { id: id, idx: pos });
    } else {
      var allFinished = test.sections.every(function (sc) { return state.sections[sc.id] && state.sections[sc.id].finished; });
      if (allFinished) { completeTest(id); return; }
      var si = firstOpenSection(test);
      var sec = test.sections[si];
      var s = state.sections[sec.id];
      if (s && s.deadline && !s.finished) go('mcq', { id: id, si: si, idx: (pos && pos.si === si) ? pos.idx : 0 });
      else go('section', { id: id, si: si });
    }
  }

  function firstOpenSection(test) {
    for (var i = 0; i < test.sections.length; i++) {
      var s = state.sections[test.sections[i].id];
      if (!s || !s.finished) return i;
    }
    return test.sections.length - 1;
  }

  function nextTestId(id) {
    var rest = EP.ALL_TESTS.filter(function (x) { return !state.completed[x] && x !== id; });
    return rest[0];
  }

  function completeTest(id) {
    state.completed[id] = true;
    delete state.pos[id];
    if (EP.ALL_TESTS.every(function (x) { return state.completed[x]; })) state.finishedAt = new Date().toISOString();
    save();
    var nxt = nextTestId(id);
    if (nxt) go('message', { msg: t('testDone'), act: 'openNext', label: tx(testById(nxt).title) + ' →', nextId: nxt });
    else go('message', { msg: t('allDone'), act: 'report', label: t('viewReport') });
  }

  function answerLikert(v) {
    var test = testById(view.id);
    var item = test.items[view.idx];
    state.responses[test.id] = state.responses[test.id] || {};
    state.responses[test.id][item.id] = { v: v, rt: Math.round(now() - shownAt) };
    var nextIdx = view.idx + 1;
    if (nextIdx >= test.items.length) { save(); completeTest(test.id); return; }
    state.pos[test.id] = nextIdx;
    save();
    go('likert', { id: test.id, idx: nextIdx });
  }

  function finishSection(timedOut) {
    var test = testById(view.id);
    var sec = test.sections[view.si];
    state.sections[sec.id].finished = true;
    var nextSi = view.si + 1;
    if (nextSi >= test.sections.length) {
      save();
      if (timedOut) { go('message', { msg: t('timeUp'), act: 'completeAptitude', label: t('next') }); return; }
      completeTest(test.id);
      return;
    }
    state.pos[test.id] = { si: nextSi, idx: 0 };
    save();
    if (timedOut) go('message', { msg: t('timeUp'), act: 'toSection', label: t('next'), id: test.id, si: nextSi });
    else go('section', { id: test.id, si: nextSi });
  }

  function startTimer() {
    var test = testById(view.id);
    var sec = test.sections[view.si];
    timer = setInterval(function () {
      var remaining = state.sections[sec.id].deadline - Date.now();
      var el = document.getElementById('timer');
      if (el) {
        el.innerHTML = esc(t('timeLeft')) + ' <b>' + fmtTime(remaining) + '</b>';
        el.classList.toggle('low', remaining < 60000);
      }
      if (remaining <= 0) { clearInterval(timer); timer = null; finishSection(true); }
    }, 500);
  }

  // ---------- Render + events ----------

  function render() {
    document.documentElement.lang = EP.lang;
    var html;
    switch (view.name) {
      case 'welcome': html = renderWelcome(); break;
      case 'profile': html = renderProfile(); break;
      case 'hub': html = renderHub(); break;
      case 'intro': html = renderIntro(testById(view.id)); break;
      case 'likert': html = renderLikertItem(testById(view.id), view.idx); break;
      case 'section': html = renderSectionIntro(testById(view.id), view.si); break;
      case 'mcq': {
        var sec = testById(view.id).sections[view.si];
        if (state.sections[sec.id].deadline <= Date.now()) { finishSection(true); return; }
        html = renderMcqItem(testById(view.id), view.si, view.idx);
        break;
      }
      case 'message': html = renderMessage(view.msg, view.act, view.label); break;
      case 'report': html = renderReport(); break;
      default: html = renderWelcome();
    }
    app.innerHTML = html;
    shownAt = now();
    if (view.name === 'mcq') startTimer();
  }

  function saveProfile() {
    var val = function (id) { return (document.getElementById(id).value || '').trim(); };
    var p = {
      name: val('f-name'), klass: val('f-class'), school: val('f-school'),
      district: val('f-district'), code: val('f-code'),
      consent: document.getElementById('f-consent').checked
    };
    var err = document.getElementById('f-error');
    if (!p.name || !p.klass || !p.school) { err.textContent = t('required'); return; }
    if (!p.consent) { err.textContent = t('consentRequired'); return; }
    state.profile = p;
    if (!state.startedAt) state.startedAt = new Date().toISOString();
    save();
    go('hub');
  }

  function download() {
    var result = EP.scoring.score(state);
    var payload = {
      app: 'edupalliyol-career', format: 1, exportedAt: new Date().toISOString(), lang: EP.lang,
      profile: state.profile, state: state, result: result
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    var safe = (state.profile && state.profile.name || 'student').replace(/[^a-z0-9]+/gi, '_').toLowerCase();
    a.href = URL.createObjectURL(blob);
    a.download = 'career-report_' + safe + '.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  function handle(act, el) {
    var test = view.id ? testById(view.id) : null;
    switch (act) {
      case 'lang':
        EP.lang = EP.lang === 'en' ? 'ml' : 'en';
        EP.store.set(LANG_KEY, EP.lang);
        render();
        break;
      case 'welcome': go('welcome'); break;
      case 'profile': go('profile'); break;
      case 'saveProfile': saveProfile(); break;
      case 'hub': go('hub'); break;
      case 'open': openTest(el.getAttribute('data-id')); break;
      case 'openNext': openTest(view.nextId); break;
      case 'beginTest':
        state.pos[view.id] = 0; save();
        go('likert', { id: view.id, idx: 0 });
        break;
      case 'likert': answerLikert(Number(el.getAttribute('data-v'))); break;
      case 'prev':
        if (view.idx > 0) { state.pos[view.id] = view.idx - 1; save(); go('likert', { id: view.id, idx: view.idx - 1 }); }
        break;
      case 'startSection': {
        var sec = test.sections[view.si];
        state.sections[sec.id] = { startedAt: Date.now(), deadline: Date.now() + sec.timeLimitSec * 1000, finished: false };
        state.pos[test.id] = { si: view.si, idx: 0 };
        save();
        go('mcq', { id: test.id, si: view.si, idx: 0 });
        break;
      }
      case 'mcq': {
        var s = test.sections[view.si];
        var item = s.items[view.idx];
        state.responses[test.id] = state.responses[test.id] || {};
        state.responses[test.id][item.id] = { v: Number(el.getAttribute('data-v')), rt: Math.round(now() - shownAt) };
        var nextIdx = Math.min(view.idx + 1, s.items.length - 1);
        state.pos[test.id] = { si: view.si, idx: nextIdx };
        save();
        go('mcq', { id: test.id, si: view.si, idx: nextIdx });
        break;
      }
      case 'mprev':
      case 'mnext': {
        var step = act === 'mprev' ? -1 : 1;
        var ni = Math.max(0, Math.min(view.idx + step, test.sections[view.si].items.length - 1));
        state.pos[test.id] = { si: view.si, idx: ni }; save();
        go('mcq', { id: test.id, si: view.si, idx: ni });
        break;
      }
      case 'finishSection': {
        var sc = test.sections[view.si];
        var resp = state.responses[test.id] || {};
        var left = sc.items.filter(function (it) { return !resp[it.id]; }).length;
        if (left && !window.confirm(t('finishSectionConfirm', { n: left }))) return;
        finishSection(false);
        break;
      }
      case 'toSection': go('section', { id: view.id, si: view.si }); break;
      case 'completeAptitude': completeTest('aptitude'); break;
      case 'report': go('report'); break;
      case 'print': window.print(); break;
      case 'download': download(); break;
      case 'reset':
        if (window.confirm(t('startOverConfirm'))) { state = newState(); save(); go('welcome'); }
        break;
    }
  }

  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    handle(el.getAttribute('data-act'), el);
  });

  document.addEventListener('keydown', function (e) {
    if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
    var n = parseInt(e.key, 10);
    if (view.name === 'likert' && n >= 1 && n <= 5) answerLikert(n);
    if (view.name === 'mcq') {
      var letter = 'abcde'.indexOf((e.key || '').toLowerCase());
      var idx = letter >= 0 ? letter : (n >= 1 ? n - 1 : -1);
      var btn = app.querySelectorAll('.opt.mcq')[idx];
      if (btn) handle('mcq', btn);
    }
  });

  render();
})();
