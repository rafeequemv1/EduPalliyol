// Counsellor dashboard: loads student result files locally, lists them,
// opens individual reports and exports a CSV summary.
(function () {
  var EP = window.EP;
  var t = EP.t, tx = EP.tx, esc = EP.esc;
  var LANG_KEY = 'ep_lang';
  EP.lang = EP.store.get(LANG_KEY) || 'en';

  var app = document.getElementById('app');
  var students = [];
  var errors = [];
  var openIdx = null;

  // Re-score from raw answers so every report uses the current scoring rules.
  function rescore(payload) {
    if (payload.state && payload.state.responses) return EP.scoring.score(payload.state);
    return payload.result;
  }

  function shell(body) {
    return '<header class="topbar"><div class="brand"><span class="logo">◎</span> ' + esc(t('appName')) + '</div>' +
      '<div><a class="btn ghost small" href="index.html">←</a> ' +
      '<button class="btn ghost small" data-act="lang">' + esc(t('langToggle')) + '</button></div></header>' +
      '<main class="container wide">' + body + '</main>';
  }

  function topStream(r) { return r.streams && r.streams[0] && r.streams[0].total !== null ? tx(EP.streams[r.streams[0].id]) : '–'; }
  function topCareers(r, n) { return (r.careers || []).slice(0, n).map(function (c) { return tx(EP.careerById[c.id]); }).join(', '); }

  function renderList() {
    var rows = students.map(function (s, i) {
      var r = s.result, p = s.profile || {};
      return '<tr><td>' + esc(p.name) + '</td><td>' + esc(p.klass) + '</td><td>' + esc(p.school) + '</td>' +
        '<td><b>' + esc(r.interest ? r.interest.code : '–') + '</b></td>' +
        '<td>' + esc(topStream(r)) + '</td><td>' + esc(topCareers(r, 3)) + '</td>' +
        '<td><span class="q q-' + r.validity.level + '">' + esc(t('quality_' + r.validity.level)) + '</span></td>' +
        '<td>' + esc(s.date ? new Date(s.date).toLocaleDateString('en-IN') : '') + '</td>' +
        '<td><button class="btn small" data-act="openReport" data-i="' + i + '">' + esc(t('open')) + '</button></td></tr>';
    }).join('');
    var table = students.length
      ? '<div class="table-wrap"><table><thead><tr>' +
        ['colName', 'colClass', 'colSchool', 'colCode', 'colStream', 'colCareers', 'colQuality', 'colDate', ''].map(function (k) {
          return '<th>' + (k ? esc(t(k)) : '') + '</th>';
        }).join('') + '</tr></thead><tbody>' + rows + '</tbody></table></div>'
      : '<p class="muted">' + esc(t('noFiles')) + '</p>';
    return shell(
      '<h1>' + esc(t('counsellorTitle')) + '</h1><p class="lead">' + esc(t('counsellorLead')) + '</p>' +
      '<div class="actions"><label class="btn primary">' + esc(t('loadFiles')) +
      '<input type="file" id="files" accept=".json,application/json" multiple hidden></label>' +
      (students.length ? '<button class="btn" data-act="csv">' + esc(t('exportCsv')) + '</button>' : '') + '</div>' +
      errors.map(function (e) { return '<p class="error">' + esc(e) + '</p>'; }).join('') +
      '<section class="card">' + table + '</section>'
    );
  }

  function renderOpen() {
    var s = students[openIdx];
    return shell(
      '<div class="toolbar no-print"><button class="btn ghost small" data-act="close">' + esc(t('closeReport')) + '</button>' +
      '<button class="btn primary small" data-act="print">' + esc(t('print')) + '</button></div>' +
      '<div class="screen-only">' + EP.report.render(s.profile, s.result, { finishedAt: s.date }) + '</div>' +
      '<div class="print-only">' + EP.sheet.render(s.profile, s.result, { finishedAt: s.date }) + '</div>'
    );
  }

  function render() {
    document.documentElement.lang = EP.lang;
    app.innerHTML = openIdx === null ? renderList() : renderOpen();
    var input = document.getElementById('files');
    if (input) input.addEventListener('change', function () { load(input.files); });
  }

  function load(files) {
    errors = [];
    var pending = files.length;
    Array.prototype.forEach.call(files, function (f) {
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var payload = JSON.parse(reader.result);
          if (payload.app !== 'edupalliyol-career') throw new Error('bad');
          students.push({
            profile: payload.profile,
            result: rescore(payload),
            date: (payload.state && payload.state.finishedAt) || payload.exportedAt
          });
        } catch (e) {
          errors.push(t('badFile', { f: f.name }));
        }
        if (--pending === 0) render();
      };
      reader.readAsText(f);
    });
  }

  function csvCell(v) {
    var s = String(v === null || v === undefined ? '' : v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  function exportCsv() {
    var head = ['name', 'class', 'school', 'district', 'code', 'riasec_code',
      'R_0_40', 'I_0_40', 'A_0_40', 'S_0_40', 'E_0_40', 'C_0_40',
      'openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotional_stability',
      'stream_1', 'stream_2', 'career_1', 'career_2', 'career_3', 'quality', 'date'];
    var lines = [head.join(',')];
    var prev = EP.lang;
    EP.lang = 'en';
    students.forEach(function (s) {
      var r = s.result, p = s.profile || {};
      var ri = r.interest ? r.interest.raw : {};
      var pe = r.personality ? r.personality.scores : {};
      var stream = function (i) { return r.streams[i] ? tx(EP.streams[r.streams[i].id]) : ''; };
      var career = function (i) { return r.careers[i] ? tx(EP.careerById[r.careers[i].id]) : ''; };
      lines.push([p.name, p.klass, p.school, p.district, p.code, r.interest ? r.interest.code : '',
        ri.R, ri.I, ri.A, ri.S, ri.E, ri.C,
        pe.O, pe.C, pe.E, pe.A, pe.ES,
        stream(0), stream(1), career(0), career(1), career(2), r.validity.level, s.date || ''
      ].map(csvCell).join(','));
    });
    EP.lang = prev;
    var blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'career-results-summary.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');
    if (act === 'lang') { EP.lang = EP.lang === 'en' ? 'ml' : 'en'; EP.store.set(LANG_KEY, EP.lang); render(); }
    if (act === 'openReport') { openIdx = Number(el.getAttribute('data-i')); render(); window.scrollTo(0, 0); }
    if (act === 'close') { openIdx = null; render(); }
    if (act === 'print') window.print();
    if (act === 'csv') exportCsv();
  });

  if (!EP.careerById) {
    EP.careerById = {};
    EP.careers.forEach(function (c) { EP.careerById[c.id] = c; });
  }
  render();
})();
