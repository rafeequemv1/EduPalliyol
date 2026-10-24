// Scoring engine. Pure functions: takes the saved test state and returns the
// full result object used by the report. Language-independent; the report
// layer turns keys into text.
var EP = window.EP = window.EP || {};

EP.SCORING_VERSION = '2.0.0';

EP.LIKERT_TESTS = ['interest', 'personality'];
EP.ALL_TESTS = ['interest', 'personality'];

EP.scoring = (function () {
  var RIASEC = ['R', 'I', 'A', 'S', 'E', 'C'];

  function mean(arr) {
    if (!arr.length) return null;
    var s = 0;
    for (var i = 0; i < arr.length; i++) s += arr[i];
    return s / arr.length;
  }

  function median(arr) {
    if (!arr.length) return null;
    var a = arr.slice().sort(function (x, y) { return x - y; });
    var m = Math.floor(a.length / 2);
    return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
  }

  function pearson(a, b) {
    var ma = mean(a), mb = mean(b), num = 0, da = 0, db = 0;
    for (var i = 0; i < a.length; i++) {
      num += (a[i] - ma) * (b[i] - mb);
      da += (a[i] - ma) * (a[i] - ma);
      db += (b[i] - mb) * (b[i] - mb);
    }
    if (da === 0 || db === 0) return 0;
    return num / Math.sqrt(da * db);
  }

  function traitBand(pct) {
    if (pct === null) return null;
    if (pct > 65) return 'high';
    if (pct >= 40) return 'mid';
    return 'low';
  }

  // O*NET Interest Profiler Short Form scoring: each answer is worth 0
  // (Strongly dislike) to 4 (Strongly like); an area's raw score is the sum of
  // its 10 items, 0-40. pct rescales the raw score to 0-100 for charts.
  function scoreInterest(state) {
    var resp = state.responses.interest || {};
    var raw = {}, n = {};
    RIASEC.forEach(function (d) { raw[d] = 0; n[d] = 0; });
    EP.interest.items.forEach(function (it) {
      var r = resp[it.id];
      if (!r) return;
      raw[it.dim] += r.v - 1;
      n[it.dim]++;
    });
    if (RIASEC.some(function (d) { return n[d] < 10; })) return null;
    var pct = {};
    RIASEC.forEach(function (d) { pct[d] = Math.round((raw[d] / 40) * 100); });
    var ranked = RIASEC.slice().sort(function (a, b) { return raw[b] - raw[a] || RIASEC.indexOf(a) - RIASEC.indexOf(b); });
    var vals = RIASEC.map(function (d) { return pct[d]; });
    return {
      raw: raw,
      scores: pct,
      ranked: ranked,
      code: ranked.slice(0, 3).join(''),
      differentiation: Math.max.apply(null, vals) - Math.min.apply(null, vals)
    };
  }

  // Mini-IPIP: trait score = mean of 4 items (reverse-keyed items as 6 - x),
  // rescaled from 1-5 to 0-100.
  function scorePersonality(state) {
    var resp = state.responses.personality || {};
    var buckets = { E: [], A: [], C: [], N: [], O: [] };
    EP.personality.items.forEach(function (it) {
      var r = resp[it.id];
      if (!r) return;
      buckets[it.dim].push(it.key === -1 ? 6 - r.v : r.v);
    });
    if (Object.keys(buckets).some(function (k) { return buckets[k].length < 4; })) return null;
    var toPct = function (k) { return Math.round(((mean(buckets[k]) - 1) / 4) * 100); };
    var out = { E: toPct('E'), A: toPct('A'), C: toPct('C'), ES: 100 - toPct('N'), O: toPct('O') };
    var bands = {};
    Object.keys(out).forEach(function (k) { bands[k] = traitBand(out[k]); });
    return { scores: out, bands: bands };
  }

  // RIASEC weight vector for a career code: 1st letter strongest.
  function codeVector(code) {
    var w = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    var weights = [1, 0.6, 0.3];
    for (var i = 0; i < code.length && i < 3; i++) w[code[i]] = weights[i];
    return w;
  }

  // Interest congruence between the student's profile and a career's code:
  // 60% profile-shape correlation, 40% interest level in the career's areas.
  function careerFit(career, interest) {
    var cv = codeVector(career.code);
    var corr = pearson(RIASEC.map(function (d) { return interest.scores[d]; }), RIASEC.map(function (d) { return cv[d]; }));
    var wsum = 0, lvl = 0;
    RIASEC.forEach(function (d) { lvl += cv[d] * interest.scores[d]; wsum += cv[d]; });
    var total = Math.round(100 * (0.6 * Math.max(0, corr) + 0.4 * (lvl / wsum / 100)));
    var reasons = career.code.split('').filter(function (d) {
      return interest.ranked.slice(0, 3).indexOf(d) !== -1 && interest.scores[d] >= 50;
    }).map(function (d) { return { type: 'interest', key: d }; });
    return { id: career.id, total: total, reasons: reasons };
  }

  function scoreStreams(careers) {
    return Object.keys(EP.streams).map(function (sid) {
      var fits = careers.filter(function (c) { return EP.careerById[c.id].streams.indexOf(sid) !== -1; })
        .map(function (c) { return c.total; }).sort(function (a, b) { return b - a; });
      return { id: sid, total: fits.length ? Math.round(mean(fits.slice(0, 3))) : null };
    }).sort(function (a, b) { return (b.total || 0) - (a.total || 0); });
  }

  // Response-quality checks: straight-lining and speeding.
  function validity(state, r) {
    var flags = [];
    EP.LIKERT_TESTS.forEach(function (tid) {
      var resp = state.responses[tid] || {};
      var keys = Object.keys(resp);
      var vals = keys.map(function (k) { return resp[k].v; });
      var rts = keys.map(function (k) { return resp[k].rt; }).filter(function (x) { return typeof x === 'number'; });
      if (vals.length >= 10) {
        var counts = {};
        vals.forEach(function (v) { counts[v] = (counts[v] || 0) + 1; });
        var maxShare = Math.max.apply(null, Object.keys(counts).map(function (k) { return counts[k]; })) / vals.length;
        if (maxShare >= 0.8) flags.push({ key: 'sameAnswer', test: tid });
      }
      var md = median(rts);
      if (rts.length >= 10 && md !== null && md < 800) flags.push({ key: 'tooFast', test: tid });
    });
    if (r.interest && r.interest.differentiation < 15) flags.push({ key: 'flatInterest', soft: true });
    var missing = EP.ALL_TESTS.filter(function (t) { return !(state.completed && state.completed[t]); });
    if (missing.length) flags.push({ key: 'incomplete', tests: missing });

    var hard = flags.filter(function (f) { return !f.soft && f.key !== 'incomplete'; }).length;
    var level = 'good';
    if (hard >= 2) level = 'retake';
    else if (hard >= 1 || missing.length) level = 'caution';
    return { level: level, flags: flags };
  }

  function score(state) {
    if (!EP.careerById) {
      EP.careerById = {};
      EP.careers.forEach(function (c) { EP.careerById[c.id] = c; });
    }
    var r = {
      scoringVersion: EP.SCORING_VERSION,
      interest: scoreInterest(state),
      personality: scorePersonality(state)
    };
    r.careers = r.interest
      ? EP.careers.map(function (c) { return careerFit(c, r.interest); }).sort(function (a, b) { return b.total - a.total; })
      : [];
    r.streams = r.careers.length ? scoreStreams(r.careers) : [];
    r.validity = validity(state, r);
    return r;
  }

  return { score: score, pearson: pearson, codeVector: codeVector, traitBand: traitBand };
})();
