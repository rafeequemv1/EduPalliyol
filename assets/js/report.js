// Renders the report HTML from a profile + scored result. Shared by the
// student app and the counsellor dashboard.
var EP = window.EP = window.EP || {};

EP.report = (function () {
  var t = function (k, v) { return EP.t(k, v); };
  var tx = function (o) { return EP.tx(o); };
  var esc = function (s) { return EP.esc(s); };

  function bar(pct, cls) {
    var p = pct === null || pct === undefined ? 0 : Math.max(0, Math.min(100, pct));
    return '<div class="bar ' + (cls || '') + '"><span style="width:' + p + '%"></span></div>';
  }

  function row(label, pct, num, extra, cls) {
    return '<div class="score-row">' +
      '<div class="score-label">' + label + '</div>' +
      bar(pct, cls) +
      '<div class="score-num">' + (num === null || num === undefined ? '–' : num) + '</div>' +
      (extra ? '<div class="score-extra">' + extra + '</div>' : '') +
      '</div>';
  }

  function section(id, title, body, lead) {
    return '<section class="rp-section" id="rp-' + id + '"><h2>' + title + '</h2>' +
      (lead ? '<p class="lead">' + lead + '</p>' : '') + body + '</section>';
  }

  function listJoin(arr) { return arr.filter(Boolean).join(', '); }

  function testName(id) { return tx(EP[id].title); }

  function validityBlock(v) {
    var msg = { good: t('validityGood'), caution: t('validityCaution'), retake: t('validityRetake') }[v.level];
    var notes = v.flags.map(function (f) {
      var vars = {};
      if (f.test) vars.test = testName(f.test);
      if (f.tests) vars.tests = f.tests.map(testName).join(', ');
      return '<li>' + esc(t('flag_' + f.key, vars)) + '</li>';
    }).join('');
    return '<div class="validity validity-' + v.level + '"><p>' + esc(msg) + '</p>' +
      (notes ? '<ul>' + notes + '</ul>' : '') + '</div>';
  }

  function summary(r) {
    var items = [];
    if (r.interest) {
      items.push([t('summaryInterest'), listJoin(r.interest.ranked.slice(0, 3).map(function (d) {
        return esc(tx(EP.interest.dims[d])) + ' (' + d + ')';
      }))]);
    }
    if (r.streams.length) {
      items.push([t('summaryStreams'), listJoin(r.streams.slice(0, 2).map(function (s) { return esc(tx(EP.streams[s.id])); }))]);
    }
    if (r.careers.length) {
      items.push([t('summaryCareers'), listJoin(r.careers.slice(0, 5).map(function (c) { return esc(tx(EP.careerById[c.id])); }))]);
    }
    return '<dl class="summary">' + items.map(function (p) {
      return '<dt>' + esc(p[0]) + '</dt><dd>' + p[1] + '</dd>';
    }).join('') + '</dl>';
  }

  function interestSection(r) {
    if (!r.interest) return section('interest', t('interestTitle'), '<p class="muted">' + t('noData') + '</p>');
    var rows = ['R', 'I', 'A', 'S', 'E', 'C'].map(function (d) {
      var dim = EP.interest.dims[d];
      return row(esc(tx(dim)) + ' <small>(' + d + ' · ' + esc(tx(dim.nick)) + ')</small>',
        r.interest.scores[d], r.interest.raw[d] + '/40', null, 'riasec-' + d);
    }).join('');
    var top = r.interest.ranked.slice(0, 3).map(function (d) {
      var dim = EP.interest.dims[d];
      return '<div class="card mini"><h3><span class="tag riasec-' + d + '">' + d + '</span> ' + esc(tx(dim)) + '</h3><p>' + esc(tx(dim.desc)) + '</p></div>';
    }).join('');
    return section('interest', t('interestTitle'), rows + '<div class="grid3">' + top + '</div>', t('interestLead'));
  }

  function personalitySection(r) {
    if (!r.personality) return section('personality', t('personalityTitle'), '<p class="muted">' + t('noData') + '</p>');
    var rows = ['O', 'C', 'E', 'A', 'ES'].map(function (k) {
      var dim = EP.personality.dims[k];
      return row(esc(tx(dim)), r.personality.scores[k], r.personality.scores[k], esc(tx(dim[r.personality.bands[k]])), 'pers');
    }).join('');
    return section('personality', t('personalityTitle'), rows, t('personalityLead'));
  }

  function streamsSection(r) {
    if (!r.streams.length) return '';
    var body = r.streams.map(function (s, i) {
      var st = EP.streams[s.id];
      return '<div class="card stream' + (i < 2 ? ' best' : '') + '">' +
        '<div class="stream-head"><h3>' + (i + 1) + '. ' + esc(tx(st)) + '</h3><div class="pill">' + s.total + '</div></div>' +
        bar(s.total, 'stream-bar') +
        '<p>' + esc(tx(st.desc)) + '</p></div>';
    }).join('');
    return section('streams', t('streamsTitle'), body, t('streamsLead'));
  }

  function careersSection(r) {
    if (!r.careers.length) return '';
    var body = r.careers.slice(0, 10).map(function (c, i) {
      var cr = EP.careerById[c.id];
      var reasons = c.reasons.map(function (x) {
        return '<li>' + t('reason_interest', { x: '<b>' + esc(tx(EP.interest.dims[x.key])) + '</b>' }) + '</li>';
      }).join('');
      var codeTags = cr.code.split('').map(function (d) { return '<span class="tag riasec-' + d + '">' + d + '</span>'; }).join('');
      return '<div class="card career">' +
        '<div class="career-head"><h3>' + (i + 1) + '. ' + esc(tx(cr)) + ' ' + codeTags + '</h3>' +
        '<div class="pill">' + esc(t('fit')) + ' ' + c.total + '</div></div>' +
        bar(c.total, 'fit-bar') +
        (reasons ? '<p class="small"><b>' + esc(t('why')) + ':</b></p><ul class="reasons">' + reasons + '</ul>' : '') +
        '<p class="small path"><b>' + esc(t('path')) + ':</b> ' + esc(tx(cr.path)) + '</p>' +
        '</div>';
    }).join('');
    return section('careers', t('careersTitle'), body, t('careersLead'));
  }

  function parentsSection(r) {
    var interests = r.interest ? listJoin(r.interest.ranked.slice(0, 3).map(function (d) { return tx(EP.interest.dims[d]); })) : '–';
    var streams = r.streams.length ? listJoin(r.streams.slice(0, 2).map(function (s) { return tx(EP.streams[s.id]); })) : '–';
    var items = [
      t('parents1', { interests: interests }),
      t('parents2', { streams: streams }),
      t('parents3'), t('parents5')
    ].map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    return section('parents', t('parentsTitle'), '<ul class="tips">' + items + '</ul>', t('parentsLead'));
  }

  function nextSection() {
    var items = ['next1', 'next2', 'next3', 'next4'].map(function (k) { return '<li>' + esc(t(k)) + '</li>'; }).join('');
    return section('next', t('nextTitle'), '<ol class="tips">' + items + '</ol>');
  }

  function aboutSection(r) {
    return section('about', t('aboutTitle'),
      '<p class="small">' + esc(t('about1')) + '</p><p class="small">' + esc(t('about2')) + '</p>' +
      '<p class="small muted">' + esc(t('about3', { v: r.scoringVersion })) + '</p>');
  }

  function render(profile, r, meta) {
    profile = profile || {};
    var date = meta && meta.finishedAt ? new Date(meta.finishedAt) : new Date();
    var head = '<header class="rp-header">' +
      '<div><div class="brand-sm">' + esc(t('appName')) + '</div><h1>' + esc(t('reportTitle')) + '</h1>' +
      '<p>' + esc(t('reportFor')) + ': <b>' + esc(profile.name || t('studentDefault')) + '</b>' +
      (profile.klass ? ' · ' + esc(t('classOption', { n: profile.klass })) : '') +
      (profile.school ? ' · ' + esc(profile.school) : '') + '</p>' +
      '<p class="muted small">' + esc(t('reportDate')) + ': ' + esc(date.toLocaleDateString(EP.lang === 'ml' ? 'ml-IN' : 'en-IN')) + '</p></div>' +
      (r.interest ? '<div class="code-badge"><div class="small">' + esc(t('hollandCode')) + '</div><div class="code">' + r.interest.code + '</div></div>' : '') +
      '</header>';
    return '<article class="report">' + head +
      validityBlock(r.validity) +
      section('summary', t('summaryTitle'), summary(r)) +
      interestSection(r) +
      personalitySection(r) +
      streamsSection(r) +
      careersSection(r) +
      parentsSection(r) +
      nextSection() +
      aboutSection(r) +
      '</article>';
  }

  return { render: render };
})();
