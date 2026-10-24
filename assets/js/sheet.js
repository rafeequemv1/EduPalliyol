// Compact two-page A4 report ("report sheet"), used for printing / PDF and for
// the demo report. Same data as the full report, in a minimal visual layout.
var EP = window.EP = window.EP || {};

EP.sheet = (function () {
  var t = function (k, v) { return EP.t(k, v); };
  var tx = function (o) { return EP.tx(o); };
  var esc = function (s) { return EP.esc(s); };
  var RIASEC = ['R', 'I', 'A', 'S', 'E', 'C'];

  function hbar(label, value, max, display, cls, title) {
    var pct = Math.max(0, Math.min(100, (value / max) * 100));
    return '<div class="sb-row" title="' + esc(title || (label + ': ' + display)) + '">' +
      '<span class="sb-label">' + label + '</span>' +
      '<span class="sb-track"><span class="sb-fill ' + (cls || '') + '" style="width:' + pct.toFixed(1) + '%"></span></span>' +
      '<span class="sb-val">' + display + '</span></div>';
  }

  // Interest profile on the RIASEC hexagon; one series, so no legend.
  function radar(raw) {
    var cx = 110, cy = 104, R = 78;
    function pt(i, v) {
      var a = (-90 + i * 60) * Math.PI / 180;
      return [cx + R * (v / 40) * Math.cos(a), cy + R * (v / 40) * Math.sin(a)];
    }
    var rings = [10, 20, 30, 40].map(function (v) {
      return '<polygon class="rd-ring" points="' + RIASEC.map(function (_, i) { return pt(i, v).map(function (n) { return n.toFixed(1); }).join(','); }).join(' ') + '"/>';
    }).join('');
    var axes = RIASEC.map(function (d, i) {
      var e = pt(i, 40), l = pt(i, 48);
      return '<line class="rd-axis" x1="' + cx + '" y1="' + cy + '" x2="' + e[0].toFixed(1) + '" y2="' + e[1].toFixed(1) + '"/>' +
        '<text class="rd-lab" x="' + l[0].toFixed(1) + '" y="' + (l[1] + 4).toFixed(1) + '">' + d + '</text>';
    }).join('');
    var poly = RIASEC.map(function (d, i) { return pt(i, raw[d]).map(function (n) { return n.toFixed(1); }).join(','); }).join(' ');
    var dots = RIASEC.map(function (d, i) {
      var p = pt(i, raw[d]);
      return '<circle class="rd-dot" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4"><title>' + d + ': ' + raw[d] + '/40</title></circle>';
    }).join('');
    return '<svg class="radar" viewBox="0 0 220 210" role="img" aria-label="' + esc(t('interestTitle')) + '">' +
      rings + axes + '<polygon class="rd-area" points="' + poly + '"/>' + dots +
      '<text class="rd-tick" x="' + (cx + 3) + '" y="' + (cy - R - 2) + '">40</text>' +
      '<text class="rd-tick" x="' + (cx + 3) + '" y="' + (cy - R / 2 - 2) + '">20</text></svg>';
  }

  function header(profile, r, meta, page) {
    var date = meta && meta.finishedAt ? new Date(meta.finishedAt) : new Date();
    return '<header class="sh-head">' +
      '<div><div class="sh-brand">' + esc(t('appName')) + '</div>' +
      '<div class="sh-title">' + esc(t('reportTitle')) + '</div>' +
      '<div class="sh-meta">' + esc(profile.name || t('studentDefault')) +
      (profile.klass ? ' · ' + esc(t('classOption', { n: profile.klass })) : '') +
      (profile.school ? ' · ' + esc(profile.school) : '') +
      ' · ' + esc(date.toLocaleDateString(EP.lang === 'ml' ? 'ml-IN' : 'en-IN')) + '</div></div>' +
      (page === 1 && r.interest ? '<div class="sh-code"><span>' + esc(t('hollandCode')) + '</span><b>' + r.interest.code + '</b></div>'
        : '<div class="sh-pg">2 / 2</div>') +
      '</header>';
  }

  function quality(v) {
    var label = { good: t('quality_good'), caution: t('quality_caution'), retake: t('quality_retake') }[v.level];
    return '<span class="sh-q q-' + v.level + '">' + esc(t('colQuality')) + ': ' + esc(label) + '</span>';
  }

  function page1(profile, r, meta) {
    var bars = RIASEC.map(function (d) {
      var dim = EP.interest.dims[d];
      return hbar(d + ' · ' + esc(tx(dim)), r.interest.raw[d], 40, r.interest.raw[d] + '/40', 'riasec-fill-bg-' + d);
    }).join('');
    var tops = r.interest.ranked.slice(0, 3).map(function (d) {
      var dim = EP.interest.dims[d];
      return '<div class="sh-type"><b><span class="tag riasec-' + d + '">' + d + '</span> ' + esc(tx(dim)) + '</b><p>' + esc(tx(dim.desc)) + '</p></div>';
    }).join('');
    var pers = '';
    if (r.personality) {
      pers = '<section class="sh-sec"><h3>' + esc(t('personalityTitle')) + '</h3><p class="sh-help">' + esc(t('sheetPersonalityHelp')) + '</p>' +
        ['O', 'C', 'E', 'A', 'ES'].map(function (k) {
          var dim = EP.personality.dims[k];
          var band = r.personality.bands[k];
          return hbar(esc(tx(dim)), r.personality.scores[k], 100, esc(t('band_' + band)), 'pers-fill', tx(dim[band]));
        }).join('') + '</section>';
    }
    var summary = '<div class="sh-glance">' +
      '<div><span>' + esc(t('summaryInterest')) + '</span><b>' + r.interest.ranked.slice(0, 3).map(function (d) { return esc(tx(EP.interest.dims[d])); }).join(', ') + '</b></div>' +
      '<div><span>' + esc(t('summaryStreams')) + '</span><b>' + r.streams.slice(0, 2).map(function (s) { return esc(tx(EP.streams[s.id])); }).join(', ') + '</b></div>' +
      '<div><span>' + esc(t('summaryCareers')) + '</span><b>' + r.careers.slice(0, 3).map(function (c) { return esc(tx(EP.careerById[c.id])); }).join(', ') + '</b></div>' +
      '</div>';
    return '<div class="sheet-page">' + header(profile, r, meta, 1) +
      '<div class="sh-row-q">' + quality(r.validity) + '</div>' + summary +
      '<section class="sh-sec"><h3>' + esc(t('interestTitle')) + '</h3><p class="sh-help">' + esc(t('sheetInterestHelp')) + '</p>' +
      '<div class="sh-two"><div>' + radar(r.interest.raw) + '</div><div class="sh-bars">' + bars + '</div></div>' +
      '<div class="sh-types">' + tops + '</div></section>' +
      pers +
      (meta && meta.demo ? '<div class="sh-demo">' + esc(t('demoNote')) + '</div>' : '') +
      '</div>';
  }

  function page2(profile, r, meta) {
    var streams = r.streams.map(function (s, i) {
      return hbar((i + 1) + '. ' + esc(tx(EP.streams[s.id])), s.total, 100, String(s.total), i < 2 ? 'stream-fill top' : 'stream-fill');
    }).join('');
    var rows = r.careers.slice(0, 8).map(function (c, i) {
      var cr = EP.careerById[c.id];
      return '<tr><td class="n">' + (i + 1) + '</td><td><b>' + esc(tx(cr)) + '</b><div class="sh-path">' + esc(tx(cr.path)) + '</div></td>' +
        '<td class="code">' + cr.code.split('').map(function (d) { return '<span class="tag riasec-' + d + '">' + d + '</span>'; }).join('') + '</td>' +
        '<td class="fit"><span class="sb-track sm"><span class="sb-fill fit-fill" style="width:' + c.total + '%"></span></span><b>' + c.total + '</b></td></tr>';
    }).join('');
    var interests = r.interest.ranked.slice(0, 3).map(function (d) { return tx(EP.interest.dims[d]); }).join(', ');
    var streamNames = r.streams.slice(0, 2).map(function (s) { return tx(EP.streams[s.id]); }).join(', ');
    return '<div class="sheet-page">' + header(profile, r, meta, 2) +
      '<section class="sh-sec"><h3>' + esc(t('streamsTitle')) + '</h3><p class="sh-help">' + esc(t('streamsLead')) + '</p>' + streams + '</section>' +
      '<section class="sh-sec"><h3>' + esc(t('careersTitle')) + '</h3><p class="sh-help">' + esc(t('sheetCareersHelp')) + '</p>' +
      '<table class="sh-table"><thead><tr><th></th><th>' + esc(t('sheetCareer')) + '</th><th>' + esc(t('colCode')) + '</th><th>' + esc(t('fit')) + '</th></tr></thead><tbody>' + rows + '</tbody></table></section>' +
      '<section class="sh-sec sh-cols"><div><h3>' + esc(t('parentsTitle')) + '</h3><ul>' +
        '<li>' + esc(t('parents1', { interests: interests })) + '</li>' +
        '<li>' + esc(t('parents2', { streams: streamNames })) + '</li>' +
        '<li>' + esc(t('parents5')) + '</li></ul></div>' +
      '<div><h3>' + esc(t('nextTitle')) + '</h3><ol>' +
        ['next1', 'next2', 'next3', 'next4'].map(function (k) { return '<li>' + esc(t(k)) + '</li>'; }).join('') + '</ol></div></section>' +
      '<footer class="sh-foot">' + esc(t('sheetFooter', { v: r.scoringVersion })) + '</footer>' +
      '</div>';
  }

  function render(profile, r, meta) {
    profile = profile || {};
    if (!r.interest) return '<p class="muted">' + esc(t('reportLocked')) + '</p>';
    return '<div class="sheet-wrap"><div class="sheet">' + page1(profile, r, meta) + page2(profile, r, meta) + '</div></div>';
  }

  // A fixed, clearly labelled sample student used by the demo report.
  function demoState() {
    var interest = { R: [3, 4, 2, 3, 3, 4, 2, 3, 2, 3], I: [5, 5, 4, 5, 4, 5, 4, 5, 5, 4], A: [2, 3, 2, 2, 3, 1, 2, 2, 3, 2],
      S: [4, 5, 4, 4, 3, 4, 5, 4, 3, 4], E: [2, 1, 2, 3, 2, 2, 1, 2, 2, 1], C: [3, 2, 3, 3, 2, 3, 3, 2, 3, 2] };
    var personality = { MI1: 3, MI2: 5, MI3: 4, MI4: 2, MI5: 4, MI6: 3, MI7: 1, MI8: 2, MI9: 4, MI10: 2,
      MI11: 3, MI12: 4, MI13: 4, MI14: 2, MI15: 2, MI16: 3, MI17: 1, MI18: 2, MI19: 4, MI20: 2 };
    var seen = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    var st = { responses: { interest: {}, personality: {} }, completed: { interest: true, personality: true },
      finishedAt: new Date().toISOString() };
    EP.interest.items.forEach(function (it, i) {
      st.responses.interest[it.id] = { v: interest[it.dim][seen[it.dim]++], rt: 2600 + (i % 7) * 400 };
    });
    EP.personality.items.forEach(function (it, i) { st.responses.personality[it.id] = { v: personality[it.id], rt: 3200 + (i % 5) * 500 }; });
    return st;
  }

  return { render: render, demoState: demoState };
})();
