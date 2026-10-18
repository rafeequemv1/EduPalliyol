// Scoring engine. Pure functions: takes the saved test state and returns the
// full result object used by the report. Language-independent; the report
// layer turns keys into text.
var EP = window.EP = window.EP || {};

EP.SCORING_VERSION = '1.0.0';

EP.LIKERT_TESTS = ['interest', 'personality', 'values', 'subjects'];
EP.ALL_TESTS = ['interest', 'aptitude', 'personality', 'values', 'subjects'];

// Weights of each component in the career-fit score.
EP.FIT_WEIGHTS = { interest: 0.5, aptitude: 0.25, values: 0.15, personality: 0.1 };
// Weights in the stream score.
EP.STREAM_WEIGHTS = { careers: 0.5, subjects: 0.3, aptitude: 0.2 };

EP.scoring = (function () {
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

  // Likert mean (1-5) to a 0-100 scale.
  function toPct(m) { return m === null ? null : Math.round(((m - 1) / 4) * 100); }

  function weightedMean(weights, scores) {
    var num = 0, den = 0;
    Object.keys(weights).forEach(function (k) {
      if (scores[k] === null || scores[k] === undefined || !weights[k]) return;
      num += weights[k] * scores[k];
      den += weights[k];
    });
    return den ? num / den : null;
  }

  function band(pct) {
    if (pct === null) return null;
    if (pct >= 80) return 'veryhigh';
    if (pct >= 60) return 'high';
    if (pct >= 40) return 'average';
    return 'developing';
  }

  function traitBand(pct) {
    if (pct === null) return null;
    if (pct > 65) return 'high';
    if (pct >= 40) return 'mid';
    return 'low';
  }

  function scoreLikert(test, resp) {
    var buckets = {};
    Object.keys(test.dims).forEach(function (d) { buckets[d] = []; });
    test.items.forEach(function (it) {
      if (it.check) return;
      var r = resp[it.id];
      if (!r) return;
      var v = it.key === -1 ? 6 - r.v : r.v;
      (buckets[it.dim] = buckets[it.dim] || []).push(v);
    });
    var out = {};
    Object.keys(buckets).forEach(function (d) { out[d] = toPct(mean(buckets[d])); });
    return out;
  }

  function scoreInterest(state) {
    var resp = state.responses.interest || {};
    var pct = scoreLikert(EP.interest, resp);
    var order = ['R', 'I', 'A', 'S', 'E', 'C'];
    if (order.some(function (d) { return pct[d] === null; })) return null;
    var ranked = order.slice().sort(function (a, b) { return pct[b] - pct[a] || order.indexOf(a) - order.indexOf(b); });
    var vals = order.map(function (d) { return pct[d]; });
    return {
      scores: pct,
      ranked: ranked,
      code: ranked.slice(0, 3).join(''),
      differentiation: Math.max.apply(null, vals) - Math.min.apply(null, vals),
      level: Math.round(mean(vals))
    };
  }

  function scoreAptitude(state) {
    var resp = state.responses.aptitude || {};
    var out = {}, any = false;
    EP.aptitude.sections.forEach(function (sec) {
      var correct = 0, answered = 0;
      sec.items.forEach(function (it) {
        var r = resp[it.id];
        if (r && r.v !== null && r.v !== undefined) {
          answered++;
          if (r.v === it.answer) correct++;
        }
      });
      var done = state.sections && state.sections[sec.id] && state.sections[sec.id].finished;
      if (!done && !answered) { out[sec.id] = null; return; }
      any = true;
      var pct = Math.round((correct / sec.items.length) * 100);
      out[sec.id] = { correct: correct, answered: answered, total: sec.items.length, pct: pct, band: band(pct) };
    });
    return any ? out : null;
  }

  function scorePersonality(state) {
    var resp = state.responses.personality || {};
    if (!Object.keys(resp).length) return null;
    var raw = scoreLikert(EP.personality, resp);
    if (raw.N === null || raw.N === undefined) return null;
    var out = { E: raw.E, A: raw.A, C: raw.C, ES: 100 - raw.N, O: raw.O };
    var bands = {};
    Object.keys(out).forEach(function (k) { bands[k] = traitBand(out[k]); });
    return { scores: out, bands: bands };
  }

  function scoreValues(state) {
    var resp = state.responses.values || {};
    if (!Object.keys(resp).length) return null;
    var pct = scoreLikert(EP.values, resp);
    var ranked = Object.keys(pct).sort(function (a, b) { return pct[b] - pct[a]; });
    return { scores: pct, ranked: ranked, top: ranked.slice(0, 3) };
  }

  function scoreSubjects(state) {
    var resp = state.responses.subjects || {};
    if (!Object.keys(resp).length) return null;
    var pct = scoreLikert(EP.subjects, resp);
    var ranked = Object.keys(pct).filter(function (k) { return pct[k] !== null; })
      .sort(function (a, b) { return pct[b] - pct[a]; });
    return { scores: pct, ranked: ranked };
  }

  // RIASEC weight vector for a career code: 1st letter strongest.
  function codeVector(code) {
    var w = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    var weights = [1, 0.6, 0.3];
    for (var i = 0; i < code.length && i < 3; i++) w[code[i]] = weights[i];
    return w;
  }

  function careerFit(career, r) {
    var parts = {}, reasons = [], cautions = [];
    var order = ['R', 'I', 'A', 'S', 'E', 'C'];

    if (r.interest) {
      var cv = codeVector(career.code);
      var corr = pearson(order.map(function (d) { return r.interest.scores[d]; }), order.map(function (d) { return cv[d]; }));
      var level = weightedMean(cv, r.interest.scores);
      parts.interest = Math.round(100 * (0.6 * Math.max(0, corr) + 0.4 * (level / 100)));
      career.code.split('').forEach(function (d) {
        if (r.interest.ranked.slice(0, 3).indexOf(d) !== -1 && r.interest.scores[d] >= 50) {
          reasons.push({ type: 'interest', key: d });
        }
      });
    }

    if (r.aptitude) {
      var aptScores = {};
      Object.keys(r.aptitude).forEach(function (k) { aptScores[k] = r.aptitude[k] ? r.aptitude[k].pct : null; });
      var a = weightedMean(career.apt, aptScores);
      parts.aptitude = a === null ? null : Math.round(a);
      Object.keys(career.apt).forEach(function (k) {
        if (aptScores[k] === null || aptScores[k] === undefined) return;
        if (career.apt[k] >= 2 && aptScores[k] >= 60) reasons.push({ type: 'aptitude', key: k });
        if (career.apt[k] === 3 && aptScores[k] < 40) cautions.push({ type: 'aptitude', key: k });
      });
    }

    if (r.values) {
      parts.values = Math.round(mean(career.values.map(function (v) { return r.values.scores[v]; })));
      career.values.forEach(function (v) {
        if (r.values.top.indexOf(v) !== -1) reasons.push({ type: 'value', key: v });
      });
    }

    if (r.personality) {
      parts.personality = career.traits.length
        ? Math.round(mean(career.traits.map(function (t) { return r.personality.scores[t]; })))
        : 50;
      career.traits.forEach(function (t) {
        if (r.personality.scores[t] > 65) reasons.push({ type: 'trait', key: t });
      });
    }

    var total = weightedMean(EP.FIT_WEIGHTS, parts);
    return {
      id: career.id,
      total: total === null ? null : Math.round(total),
      parts: parts,
      reasons: reasons,
      cautions: cautions
    };
  }

  function scoreStreams(r) {
    var out = Object.keys(EP.streams).map(function (sid) {
      var s = EP.streams[sid];
      var fits = r.careers.filter(function (c) {
        return EP.careerById[c.id].streams.indexOf(sid) !== -1 && c.total !== null;
      }).map(function (c) { return c.total; }).sort(function (a, b) { return b - a; });
      var parts = {
        careers: fits.length ? Math.round(mean(fits.slice(0, 3))) : null,
        subjects: r.subjects ? Math.round(mean(s.subjects.map(function (x) { return r.subjects.scores[x]; }).filter(function (x) { return x !== null && x !== undefined; }))) : null,
        aptitude: null
      };
      if (r.aptitude) {
        var aptScores = {};
        Object.keys(r.aptitude).forEach(function (k) { aptScores[k] = r.aptitude[k] ? r.aptitude[k].pct : null; });
        var a = weightedMean(s.apt, aptScores);
        parts.aptitude = a === null ? null : Math.round(a);
      }
      var total = weightedMean(EP.STREAM_WEIGHTS, parts);
      return { id: sid, total: total === null ? null : Math.round(total), parts: parts };
    });
    return out.sort(function (a, b) { return (b.total || 0) - (a.total || 0); });
  }

  // Response-quality checks: attention items, straight-lining and speed.
  function validity(state, r) {
    var flags = [];
    var checks = [];
    [EP.interest, EP.personality].forEach(function (test) {
      test.items.forEach(function (it) {
        if (!it.check) return;
        var resp = (state.responses[test.id] || {})[it.id];
        if (resp) checks.push(resp.v === it.check);
      });
    });
    var failedChecks = checks.filter(function (x) { return !x; }).length;
    if (failedChecks) flags.push({ key: 'attention', n: failedChecks });

    EP.LIKERT_TESTS.forEach(function (tid) {
      var resp = state.responses[tid] || {};
      var vals = Object.keys(resp).map(function (k) { return resp[k].v; });
      var rts = Object.keys(resp).map(function (k) { return resp[k].rt; }).filter(function (x) { return typeof x === 'number'; });
      if (vals.length >= 10) {
        var counts = {};
        vals.forEach(function (v) { counts[v] = (counts[v] || 0) + 1; });
        var maxShare = Math.max.apply(null, Object.keys(counts).map(function (k) { return counts[k]; })) / vals.length;
        if (maxShare >= 0.8) flags.push({ key: 'sameAnswer', test: tid });
      }
      var md = median(rts);
      if (rts.length >= 10 && md !== null && md < 800) flags.push({ key: 'tooFast', test: tid });
    });

    if (r.aptitude) {
      var resp = state.responses.aptitude || {};
      var rts = Object.keys(resp).map(function (k) { return resp[k].rt; }).filter(function (x) { return typeof x === 'number'; });
      var pcts = Object.keys(r.aptitude).filter(function (k) { return r.aptitude[k]; }).map(function (k) { return r.aptitude[k].pct; });
      var md = median(rts);
      if (md !== null && md < 2500 && mean(pcts) <= 35) flags.push({ key: 'aptitudeGuessing' });
    }

    if (r.interest && r.interest.differentiation < 15) flags.push({ key: 'flatInterest', soft: true });

    var missing = EP.ALL_TESTS.filter(function (t) { return !(state.completed && state.completed[t]); });
    if (missing.length) flags.push({ key: 'incomplete', tests: missing });

    var hard = flags.filter(function (f) { return !f.soft && f.key !== 'incomplete'; }).length;
    var level = 'good';
    if (failedChecks >= 2 || hard >= 3) level = 'retake';
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
      aptitude: scoreAptitude(state),
      personality: scorePersonality(state),
      values: scoreValues(state),
      subjects: scoreSubjects(state)
    };
    r.careers = EP.careers.map(function (c) { return careerFit(c, r); })
      .filter(function (c) { return c.total !== null; })
      .sort(function (a, b) { return b.total - a.total; });
    r.streams = scoreStreams(r);
    r.validity = validity(state, r);
    return r;
  }

  return {
    score: score,
    pearson: pearson,
    codeVector: codeVector,
    band: band,
    traitBand: traitBand
  };
})();
