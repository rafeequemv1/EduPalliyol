// Sanity tests for the item banks and scoring engine. Run: node tests/run.js
var path = require('path');
var assert = require('assert');

global.window = global;
['i18n', 'data/scales', 'data/interest', 'data/personality', 'data/careers', 'scoring']
  .forEach(function (f) { require(path.join(__dirname, '..', 'assets', 'js', f + '.js')); });
var EP = global.EP;

var passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ok  ' + name); }
  catch (e) { console.error('  FAIL ' + name + '\n       ' + e.message); process.exitCode = 1; }
}

function bilingual(o, where) {
  assert.ok(o && o.en, where + ': missing English');
  assert.ok(o.ml, where + ': missing Malayalam');
}

console.log('Item banks');
test('O*NET Interest Profiler: 60 items, 10 per area, in R-R-I-I-A-A-S-S-E-E-C-C blocks', function () {
  var items = EP.interest.items;
  assert.strictEqual(items.length, 60);
  'RIASEC'.split('').forEach(function (d) {
    assert.strictEqual(items.filter(function (i) { return i.dim === d; }).length, 10, d);
  });
  items.forEach(function (it, i) {
    assert.strictEqual(it.dim, 'RIASEC'[Math.floor((i % 12) / 2)], it.id + ' out of official order');
    assert.strictEqual(it.id, 'IP' + (i + 1));
    bilingual(it, it.id);
  });
});
test('Mini-IPIP: 20 items, 4 per trait, official keying', function () {
  var items = EP.personality.items;
  assert.strictEqual(items.length, 20);
  var dims = ['E', 'A', 'C', 'N', 'O'];
  var reversed = ['MI6', 'MI7', 'MI8', 'MI9', 'MI10', 'MI15', 'MI16', 'MI17', 'MI18', 'MI19', 'MI20'];
  items.forEach(function (it, i) {
    assert.strictEqual(it.id, 'MI' + (i + 1));
    assert.strictEqual(it.dim, dims[i % 5], it.id + ' trait');
    assert.strictEqual(it.key, reversed.indexOf(it.id) !== -1 ? -1 : 1, it.id + ' keying');
    bilingual(it, it.id);
  });
});
test('Malayalam item text is written as complete sentences', function () {
  EP.interest.items.forEach(function (it) { assert.ok(/\?$/.test(it.ml), it.id + ' should end with ?'); });
  EP.personality.items.forEach(function (it) { assert.ok(/\.$/.test(it.ml), it.id + ' should end with .'); });
});
test('careers reference valid codes and streams', function () {
  var ids = {};
  EP.careers.forEach(function (c) {
    assert.ok(!ids[c.id], 'duplicate career ' + c.id); ids[c.id] = 1;
    assert.ok(/^[RIASEC]{3}$/.test(c.code), c.id + ' code');
    c.streams.forEach(function (s) { assert.ok(EP.streams[s], c.id + ' stream ' + s); });
    bilingual(c, c.id); bilingual(c.path, c.id + '.path');
  });
});
test('every UI string exists in Malayalam', function () {
  Object.keys(EP.strings.en).forEach(function (k) { assert.ok(EP.strings.ml[k], 'missing ml string ' + k); });
});

// ---- Simulated students ----
function makeState(opts) {
  var st = { responses: { interest: {}, personality: {} }, completed: { interest: true, personality: true } };
  var rt = opts.rt || 3000;
  EP.interest.items.forEach(function (it, i) {
    var v = opts.interest[it.dim] || 2;
    if (opts.vary && i % 4 === 0) v = Math.max(1, v - 1);
    st.responses.interest[it.id] = { v: v, rt: rt };
  });
  EP.personality.items.forEach(function (it) {
    var t = opts.traits && opts.traits[it.dim];
    var v = t ? (it.key === 1 ? t : 6 - t) : (it.key === 1 ? 4 : 2);
    st.responses.personality[it.id] = { v: v, rt: rt };
  });
  return st;
}

function topIds(r, n) { return r.careers.slice(0, n).map(function (c) { return c.id; }); }
function streams(r) { return r.streams.map(function (s) { return s.id + ':' + s.total; }).join(); }

console.log('Scoring');
test('O*NET raw scores are 0-40 per area', function () {
  var r = EP.scoring.score(makeState({ interest: { R: 5, I: 1, A: 3, S: 4, E: 2, C: 3 } }));
  assert.deepStrictEqual(r.interest.raw, { R: 40, I: 0, A: 20, S: 30, E: 10, C: 20 });
  assert.strictEqual(r.interest.code, 'RSA');
});
test('investigative + realistic student → science/tech careers and Science stream', function () {
  var r = EP.scoring.score(makeState({ interest: { I: 5, R: 4, C: 3, A: 2, S: 2, E: 1 }, vary: true }));
  var top = topIds(r, 5);
  assert.ok(top.some(function (id) { return ['electrical', 'biotech', 'mlt', 'scientist', 'software'].indexOf(id) !== -1; }), top.join());
  assert.ok(['SCI_CS', 'SCI_BIO'].indexOf(r.streams[0].id) !== -1, streams(r));
});
test('artistic student → creative careers and Humanities stream', function () {
  var r = EP.scoring.score(makeState({ interest: { A: 5, E: 4, S: 3, R: 2, I: 2, C: 1 }, vary: true }));
  var top = topIds(r, 5);
  assert.ok(top.some(function (id) { return ['graphic', 'fashion', 'film', 'performer', 'journalist', 'interior'].indexOf(id) !== -1; }), top.join());
  assert.strictEqual(r.streams[0].id, 'HUM', streams(r));
});
test('enterprising + conventional student → business careers and Commerce stream', function () {
  var r = EP.scoring.score(makeState({ interest: { E: 5, C: 5, S: 3, I: 2, A: 2, R: 1 }, vary: true }));
  var top = topIds(r, 5);
  assert.ok(top.some(function (id) { return ['ca', 'banking', 'manager', 'accountant', 'civilservices'].indexOf(id) !== -1; }), top.join());
  assert.strictEqual(r.streams[0].id, 'COM', streams(r));
});
test('Mini-IPIP reverse keying and Emotional Stability', function () {
  var r = EP.scoring.score(makeState({ interest: { I: 4 }, traits: { C: 5, N: 1, E: 3, A: 3, O: 3 } }));
  assert.strictEqual(r.personality.scores.C, 100);
  assert.strictEqual(r.personality.scores.ES, 100);
  assert.strictEqual(r.personality.scores.E, 50);
});
test('careful answers are rated good', function () {
  var r = EP.scoring.score(makeState({ interest: { I: 5, R: 4, C: 3, A: 2, S: 2, E: 1 }, vary: true }));
  assert.strictEqual(r.validity.level, 'good', JSON.stringify(r.validity.flags));
});
test('same answer everywhere + speeding → retake', function () {
  var r = EP.scoring.score(makeState({ interest: { R: 3, I: 3, A: 3, S: 3, E: 3, C: 3 }, rt: 300 }));
  var keys = r.validity.flags.map(function (f) { return f.key; });
  assert.ok(keys.indexOf('sameAnswer') !== -1);
  assert.ok(keys.indexOf('tooFast') !== -1);
  assert.ok(keys.indexOf('flatInterest') !== -1);
  assert.strictEqual(r.validity.level, 'retake');
});
test('interest only (personality not done) still gives careers and a caution', function () {
  var st = makeState({ interest: { S: 5, A: 4 }, vary: true });
  delete st.responses.personality;
  st.completed = { interest: true };
  var r = EP.scoring.score(st);
  assert.ok(r.careers.length > 0);
  assert.strictEqual(r.personality, null);
  assert.strictEqual(r.validity.level, 'caution');
});

console.log('\n' + passed + ' tests passed' + (process.exitCode ? ', some FAILED' : ''));
