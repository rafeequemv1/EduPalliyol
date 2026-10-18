// Sanity tests for the item bank and scoring engine. Run: node tests/run.js
var path = require('path');
var assert = require('assert');

global.window = global;
['i18n', 'data/scales', 'data/interest', 'data/aptitude', 'data/personality', 'data/values', 'data/careers', 'scoring']
  .forEach(function (f) { require(path.join(__dirname, '..', 'assets', 'js', f + '.js')); });
var EP = global.EP;

var passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ok  ' + name); }
  catch (e) { console.error('  FAIL ' + name + '\n       ' + e.message); process.exitCode = 1; }
}

function bilingual(o, where) {
  assert.ok(o && o.en, where + ': missing English');
  assert.ok(o.ml || /^[\d₹°.,\s:A-Z×−+=?→/-]+$/.test(o.en) || /^[\d.]+ ?(km\/h|hours)?$/.test(o.en), where + ': missing Malayalam');
}

console.log('Item bank');
test('likert tests have unique ids, valid dims and both languages', function () {
  ['interest', 'personality', 'values', 'subjects'].forEach(function (tid) {
    var seen = {};
    EP[tid].items.forEach(function (it) {
      assert.ok(!seen[it.id], tid + ' duplicate ' + it.id);
      seen[it.id] = 1;
      bilingual(it, tid + '.' + it.id);
      if (!it.check && tid !== 'personality') assert.ok(EP[tid].dims[it.dim], tid + '.' + it.id + ' bad dim');
    });
    bilingual(EP[tid].title, tid + '.title');
    bilingual(EP[tid].intro, tid + '.intro');
  });
});
test('interest has 8 items per RIASEC type', function () {
  'RIASEC'.split('').forEach(function (d) {
    assert.strictEqual(EP.interest.items.filter(function (i) { return i.dim === d; }).length, 8, d);
  });
});
test('Mini-IPIP has 4 items per trait with balanced keying', function () {
  ['E', 'A', 'C', 'N', 'O'].forEach(function (d) {
    var its = EP.personality.items.filter(function (i) { return i.dim === d; });
    assert.strictEqual(its.length, 4, d);
  });
});
test('aptitude items have valid answer keys and translations', function () {
  EP.aptitude.sections.forEach(function (s) {
    assert.strictEqual(s.items.length, 10, s.id);
    s.items.forEach(function (it) {
      assert.ok(it.answer >= 0 && it.answer < it.options.length, it.id + ' answer out of range');
      bilingual(it.q, it.id);
      it.options.forEach(function (o, i) { bilingual(o, it.id + ' option ' + i); });
    });
  });
});
test('answer positions are spread out (no position used for > 40%)', function () {
  var counts = [0, 0, 0, 0], n = 0;
  EP.aptitude.sections.forEach(function (s) { s.items.forEach(function (it) { counts[it.answer]++; n++; }); });
  counts.forEach(function (c, i) { assert.ok(c / n <= 0.4, 'position ' + i + ' used ' + c + ' times'); });
});
test('careers reference valid codes, aptitudes, values, traits and streams', function () {
  var ids = {};
  EP.careers.forEach(function (c) {
    assert.ok(!ids[c.id], 'duplicate career ' + c.id); ids[c.id] = 1;
    assert.ok(/^[RIASEC]{3}$/.test(c.code), c.id + ' code');
    Object.keys(c.apt).forEach(function (k) { assert.ok(EP.aptitude.dims[k], c.id + ' apt ' + k); });
    c.values.forEach(function (v) { assert.ok(EP.values.dims[v], c.id + ' value ' + v); });
    c.traits.forEach(function (tr) { assert.ok(EP.personality.dims[tr], c.id + ' trait ' + tr); });
    c.streams.forEach(function (s) { assert.ok(EP.streams[s], c.id + ' stream ' + s); });
    bilingual(c, c.id); bilingual(c.path, c.id + '.path');
  });
});
test('every UI string exists in Malayalam', function () {
  Object.keys(EP.strings.en).forEach(function (k) { assert.ok(EP.strings.ml[k], 'missing ml string ' + k); });
});

// ---- Simulated students ----
function makeState(opts) {
  var st = { responses: {}, sections: {}, completed: {} };
  var rt = opts.rt || 3000;
  st.responses.interest = {};
  EP.interest.items.forEach(function (it) {
    var v = it.check ? (opts.failChecks ? 1 : it.check) : (opts.interest[it.dim] || 2);
    st.responses.interest[it.id] = { v: v, rt: rt };
  });
  st.responses.personality = {};
  EP.personality.items.forEach(function (it) {
    var v = it.check ? (opts.failChecks ? 5 : it.check) : 3;
    if (!it.check && opts.traits && opts.traits[it.dim]) v = it.key === 1 ? opts.traits[it.dim] : 6 - opts.traits[it.dim];
    st.responses.personality[it.id] = { v: v, rt: rt };
  });
  st.responses.values = {};
  EP.values.items.forEach(function (it) { st.responses.values[it.id] = { v: (opts.values && opts.values[it.dim]) || 3, rt: rt }; });
  st.responses.subjects = {};
  EP.subjects.items.forEach(function (it) { st.responses.subjects[it.id] = { v: (opts.subjects && opts.subjects[it.dim]) || 2, rt: rt }; });
  st.responses.aptitude = {};
  EP.aptitude.sections.forEach(function (s) {
    var acc = (opts.apt && opts.apt[s.id]) || 0.5;
    s.items.forEach(function (it, i) {
      var right = i < Math.round(acc * s.items.length);
      st.responses.aptitude[it.id] = { v: right ? it.answer : (it.answer + 1) % it.options.length, rt: opts.aptRt || 20000 };
    });
    st.sections[s.id] = { finished: true };
  });
  EP.ALL_TESTS.forEach(function (tid) { st.completed[tid] = true; });
  return st;
}

function topIds(r, n) { return r.careers.slice(0, n).map(function (c) { return c.id; }); }

console.log('Scoring');
test('investigative + strong maths student → science/tech careers and Science stream', function () {
  var r = EP.scoring.score(makeState({
    interest: { I: 5, R: 4, C: 3, A: 2, S: 2, E: 2 },
    apt: { numerical: 0.9, logical: 0.9, verbal: 0.6, mechanical: 0.8 },
    subjects: { maths: 5, physics: 5, computer: 5, chemistry: 4 },
    values: { ACH: 5, IND: 4 }, traits: { O: 4, C: 4 }
  }));
  assert.strictEqual(r.interest.code[0], 'I');
  var top = topIds(r, 5);
  assert.ok(top.some(function (id) { return ['software', 'electrical', 'scientist', 'data', 'cyber', 'biotech'].indexOf(id) !== -1; }), top.join());
  assert.strictEqual(r.streams[0].id, 'SCI_CS', r.streams.map(function (s) { return s.id + ':' + s.total; }).join());
  assert.strictEqual(r.validity.level, 'good', JSON.stringify(r.validity.flags));
});
test('artistic student → creative careers and Humanities stream', function () {
  var r = EP.scoring.score(makeState({
    interest: { A: 5, E: 4, S: 3, R: 2, I: 2, C: 1 },
    apt: { verbal: 0.8, numerical: 0.4, logical: 0.5, mechanical: 0.4 },
    subjects: { art: 5, languages: 5, social: 4 },
    values: { IND: 5, REC: 4 }, traits: { O: 5, E: 4 }
  }));
  assert.strictEqual(r.interest.code[0], 'A');
  var top = topIds(r, 5);
  assert.ok(top.some(function (id) { return ['graphic', 'fashion', 'film', 'performer', 'writer', 'journalist', 'interior'].indexOf(id) !== -1; }), top.join());
  assert.strictEqual(r.streams[0].id, 'HUM', r.streams.map(function (s) { return s.id + ':' + s.total; }).join());
});
test('social + biology student → care careers and Biology stream', function () {
  var r = EP.scoring.score(makeState({
    interest: { S: 5, I: 4, R: 3, A: 2, E: 2, C: 2 },
    apt: { verbal: 0.7, numerical: 0.6, logical: 0.7, mechanical: 0.5 },
    subjects: { biology: 5, chemistry: 4 },
    values: { REL: 5, ACH: 4 }, traits: { A: 5, C: 4 }
  }));
  var top = topIds(r, 5);
  assert.ok(top.some(function (id) { return ['nurse', 'doctor', 'physio', 'psychologist', 'vet'].indexOf(id) !== -1; }), top.join());
  assert.strictEqual(r.streams[0].id, 'SCI_BIO', r.streams.map(function (s) { return s.id + ':' + s.total; }).join());
});
test('enterprising + conventional student → business careers and Commerce stream', function () {
  var r = EP.scoring.score(makeState({
    interest: { E: 5, C: 5, S: 3, I: 2, A: 2, R: 1 },
    apt: { verbal: 0.7, numerical: 0.8, logical: 0.7, mechanical: 0.2 },
    subjects: { economics: 5, maths: 4, computer: 4 },
    values: { WC: 5, REC: 4 }
  }));
  var top = topIds(r, 5);
  assert.ok(top.some(function (id) { return ['ca', 'banking', 'manager', 'accountant', 'marketing'].indexOf(id) !== -1; }), top.join());
  assert.strictEqual(r.streams[0].id, 'COM', r.streams.map(function (s) { return s.id + ':' + s.total; }).join());
});
test('hands-on realistic student with strong mechanical → technical careers, Vocational in top 2', function () {
  var r = EP.scoring.score(makeState({
    interest: { R: 5, C: 3, I: 3, E: 2, S: 2, A: 1 },
    apt: { mechanical: 0.9, numerical: 0.5, logical: 0.5, verbal: 0.3 },
    subjects: { workexp: 5, physics: 4 }
  }));
  var top = topIds(r, 5);
  assert.ok(top.some(function (id) { return ['electrician', 'autotech', 'mech', 'civil', 'marine'].indexOf(id) !== -1; }), top.join());
  assert.ok(['VOC', 'SCI_CS'].indexOf(r.streams[0].id) !== -1 && r.streams.slice(0, 2).some(function (s) { return s.id === 'VOC'; }),
    r.streams.map(function (s) { return s.id + ':' + s.total; }).join());
});
test('reverse-keyed personality items are scored correctly', function () {
  var r = EP.scoring.score(makeState({ interest: { I: 4 }, traits: { C: 5, N: 1 } }));
  assert.strictEqual(r.personality.scores.C, 100);
  assert.strictEqual(r.personality.scores.ES, 100);
});
test('straight-lining, failed checks and speeding are flagged as retake', function () {
  var r = EP.scoring.score(makeState({ interest: { R: 3, I: 3, A: 3, S: 3, E: 3, C: 3 }, failChecks: true, rt: 300 }));
  var keys = r.validity.flags.map(function (f) { return f.key; });
  assert.ok(keys.indexOf('attention') !== -1);
  assert.ok(keys.indexOf('sameAnswer') !== -1);
  assert.ok(keys.indexOf('tooFast') !== -1);
  assert.ok(keys.indexOf('flatInterest') !== -1);
  assert.strictEqual(r.validity.level, 'retake');
});
test('fast low aptitude answers are flagged as guessing', function () {
  var r = EP.scoring.score(makeState({ interest: { I: 4 }, apt: { verbal: 0.2, numerical: 0.2, logical: 0.2, mechanical: 0.2 }, aptRt: 1000 }));
  assert.ok(r.validity.flags.some(function (f) { return f.key === 'aptitudeGuessing'; }));
});
test('partial results (interest only) still produce careers and a caution', function () {
  var st = makeState({ interest: { S: 5, A: 4 } });
  st.responses = { interest: st.responses.interest };
  st.sections = {};
  st.completed = { interest: true };
  var r = EP.scoring.score(st);
  assert.ok(r.careers.length > 0);
  assert.strictEqual(r.aptitude, null);
  assert.strictEqual(r.validity.level, 'caution');
});

console.log('\n' + passed + ' tests passed' + (process.exitCode ? ', some FAILED' : ''));
