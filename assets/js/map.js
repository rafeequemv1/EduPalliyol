// "Map" tab: a visual overview of what the assessment measures, how answers
// become recommendations, and the research behind each step.
var EP = window.EP = window.EP || {};

EP.map = (function () {
  var tx = function (o) { return EP.tx(o); };
  var esc = function (s) { return EP.esc(s); };
  var L = function (en, ml) { return esc(tx({ en: en, ml: ml })); };

  var REFS = [
    { id: 'holland', text: 'Holland, J. L. (1997). <i>Making vocational choices: A theory of vocational personalities and work environments</i> (3rd ed.). Psychological Assessment Resources.' },
    { id: 'lewis', text: 'Lewis, P., & Rivkin, D. (1999). <i>Development of the O*NET Interest Profiler</i>. National Center for O*NET Development, U.S. Department of Labor.' },
    { id: 'rounds', text: 'Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). <i>O*NET Interest Profiler Short Form psychometric characteristics: Summary</i>. National Center for O*NET Development, U.S. Department of Labor.' },
    { id: 'goldberg99', text: 'Goldberg, L. R. (1999). A broad-bandwidth, public domain, personality inventory measuring the lower-level facets of several five-factor models. In I. Mervielde, I. Deary, F. De Fruyt, & F. Ostendorf (Eds.), <i>Personality Psychology in Europe</i> (Vol. 7, pp. 7–28). Tilburg University Press.' },
    { id: 'goldberg06', text: 'Goldberg, L. R., Johnson, J. A., Eber, H. W., Hogan, R., Ashton, M. C., Cloninger, C. R., & Gough, H. G. (2006). The International Personality Item Pool and the future of public-domain personality measures. <i>Journal of Research in Personality, 40</i>(1), 84–96.' },
    { id: 'donnellan', text: 'Donnellan, M. B., Oswald, F. L., Baird, B. M., & Lucas, R. E. (2006). The Mini-IPIP scales: Tiny-yet-effective measures of the Big Five factors of personality. <i>Psychological Assessment, 18</i>(2), 192–203.' },
    { id: 'nye', text: 'Nye, C. D., Su, R., Rounds, J., & Drasgow, F. (2012). Vocational interests and performance: A quantitative summary of over 60 years of research. <i>Perspectives on Psychological Science, 7</i>(4), 384–403.' },
    { id: 'vani', text: 'Van Iddekinge, C. H., Roth, P. L., Putka, D. J., & Lanivich, S. E. (2011). Are you interested? A meta-analysis of relations between vocational interests and employee performance and turnover. <i>Journal of Applied Psychology, 96</i>(6), 1167–1194.' },
    { id: 'barrick', text: 'Barrick, M. R., & Mount, M. K. (1991). The Big Five personality dimensions and job performance: A meta-analysis. <i>Personnel Psychology, 44</i>(1), 1–26.' },
    { id: 'itc', text: 'International Test Commission. (2017). <i>The ITC guidelines for translating and adapting tests</i> (2nd ed.).' }
  ];
  var refNum = {};
  REFS.forEach(function (r, i) { refNum[r.id] = i + 1; });
  function cite() {
    var ids = Array.prototype.slice.call(arguments);
    return '<sup class="cite">[' + ids.map(function (id) {
      return '<a href="#ref-' + id + '">' + refNum[id] + '</a>';
    }).join(', ') + ']</sup>';
  }

  // RIASEC hexagon, in Holland's order around the hexagon.
  function hexagon(scores) {
    var order = ['R', 'I', 'A', 'S', 'E', 'C'];
    var cx = 160, cy = 150, r = 105;
    var pts = order.map(function (d, i) {
      var a = (-90 + i * 60) * Math.PI / 180;
      return { d: d, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), a: a };
    });
    var poly = pts.map(function (p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ');
    var spokes = pts.map(function (p) {
      return '<line x1="' + cx + '" y1="' + cy + '" x2="' + p.x.toFixed(1) + '" y2="' + p.y.toFixed(1) + '" class="hex-spoke"/>';
    }).join('');
    var nodes = pts.map(function (p) {
      var lx = cx + (r + 34) * Math.cos(p.a), ly = cy + (r + 34) * Math.sin(p.a);
      return '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="20" class="hex-node riasec-fill-' + p.d + '"/>' +
        '<text x="' + p.x.toFixed(1) + '" y="' + (p.y + 5).toFixed(1) + '" class="hex-letter">' + p.d + '</text>' +
        '<text x="' + lx.toFixed(1) + '" y="' + (ly + 4).toFixed(1) + '" class="hex-label">' + esc(tx(EP.interest.dims[p.d])) + '</text>';
    }).join('');
    return '<svg viewBox="-30 0 380 300" class="hexagon" role="img" aria-label="RIASEC hexagon">' +
      '<polygon points="' + poly + '" class="hex-shape"/>' + spokes + nodes + '</svg>';
  }

  function flow() {
    var interestChips = ['R', 'I', 'A', 'S', 'E', 'C'].map(function (d) {
      return '<span class="chip-c riasec-bg-' + d + '">' + d + ' · ' + esc(tx(EP.interest.dims[d])) + '</span>';
    }).join('');
    var traitChips = ['O', 'C', 'E', 'A', 'ES'].map(function (k) {
      return '<span class="chip-c trait-bg">' + esc(tx(EP.personality.dims[k])) + '</span>';
    }).join('');
    var streamChips = Object.keys(EP.streams).map(function (k) {
      return '<span class="chip-c stream-bg">' + esc(tx(EP.streams[k])) + '</span>';
    }).join('');
    return '<div class="flow">' +
      '<div class="fnode start"><div class="fk">' + L('Start', 'തുടക്കം') + '</div><h3>' + L('Student, Class 8–10', 'വിദ്യാർത്ഥി, 8–10 ക്ലാസ്') + '</h3>' +
      '<p>' + L('Fills in name, class and school, and takes two tests (about 15 minutes, 80 questions).', 'പേര്, ക്ലാസ്, സ്കൂൾ എന്നിവ നൽകി രണ്ട് ടെസ്റ്റുകൾ എഴുതുന്നു. ഏകദേശം 15 മിനിറ്റും 80 ചോദ്യങ്ങളുമാണ് ഉള്ളത്.') + '</p></div>' +
      '<div class="farrow"></div>' +
      '<div class="fsplit">' +
        '<div class="fnode interest"><div class="fk">' + L('Test 1 · 60 questions', 'ടെസ്റ്റ് 1 · 60 ചോദ്യങ്ങൾ') + '</div>' +
          '<h3>' + L('Interests', 'താൽപ്പര്യങ്ങൾ') + '</h3>' +
          '<p class="src">O*NET Interest Profiler Short Form' + cite('lewis', 'rounds') + '</p>' +
          '<p>' + L('Measures which kinds of work activities the student likes, in six areas.', 'ഏതുതരം ജോലികളാണ് വിദ്യാർത്ഥിക്ക് ഇഷ്ടമെന്ന് ആറ് മേഖലകളിലായി അളക്കുന്നു.') + '</p>' +
          '<div class="chips-c">' + interestChips + '</div></div>' +
        '<div class="fnode personality"><div class="fk">' + L('Test 2 · 20 questions', 'ടെസ്റ്റ് 2 · 20 ചോദ്യങ്ങൾ') + '</div>' +
          '<h3>' + L('Personality', 'വ്യക്തിത്വം') + '</h3>' +
          '<p class="src">Mini-IPIP (Big Five)' + cite('donnellan', 'goldberg06') + '</p>' +
          '<p>' + L('Describes the student\'s usual way of thinking, feeling and behaving, in five traits.', 'വിദ്യാർത്ഥി സാധാരണയായി ചിന്തിക്കുകയും അനുഭവിക്കുകയും പെരുമാറുകയും ചെയ്യുന്ന രീതി അഞ്ച് സ്വഭാവഗുണങ്ങളിലായി വിവരിക്കുന്നു.') + '</p>' +
          '<div class="chips-c">' + traitChips + '</div></div>' +
      '</div>' +
      '<div class="farrow"></div>' +
      '<div class="fnode check"><div class="fk">' + L('Quality check', 'നിലവാര പരിശോധന') + '</div><h3>' + L('Were the answers careful?', 'ഉത്തരങ്ങൾ ശ്രദ്ധയോടെയാണോ നൽകിയത്?') + '</h3>' +
        '<p>' + L('Flags the same answer to almost every question, very fast answering, and unfinished tests. Result: Good, Use with care, or Retake.', 'മിക്കവാറും എല്ലാ ചോദ്യങ്ങൾക്കും ഒരേ ഉത്തരം നൽകുന്നത്, വളരെ വേഗത്തിൽ ഉത്തരം നൽകുന്നത്, ടെസ്റ്റ് പൂർത്തിയാക്കാത്തത് എന്നിവ കണ്ടെത്തുന്നു. ഫലം: നല്ലത്, ശ്രദ്ധിച്ച് ഉപയോഗിക്കുക, അല്ലെങ്കിൽ വീണ്ടും എഴുതുക.') + '</p></div>' +
      '<div class="farrow"></div>' +
      '<div class="fsplit">' +
        '<div class="fnode match"><div class="fk">' + L('Matching', 'യോജിപ്പിക്കൽ') + '</div><h3>' + L('46 careers', '46 കരിയറുകൾ') + '</h3>' +
          '<p>' + L('The interest profile is compared with each career\'s O*NET interest code. Personality is reported but not used for matching.', 'വിദ്യാർത്ഥിയുടെ താൽപ്പര്യങ്ങൾ ഓരോ കരിയറിന്റെയും O*NET താൽപ്പര്യ കോഡുമായി താരതമ്യം ചെയ്യുന്നു. വ്യക്തിത്വം റിപ്പോർട്ടിൽ കാണിക്കുമെങ്കിലും കരിയർ യോജിപ്പിക്കാൻ ഉപയോഗിക്കുന്നില്ല.') + cite('nye', 'vani') + '</p></div>' +
        '<div class="fnode match"><div class="fk">' + L('After Class 10', 'പത്താം ക്ലാസിനു ശേഷം') + '</div><h3>' + L('5 streams', '5 സ്ട്രീമുകൾ') + '</h3>' +
          '<div class="chips-c">' + streamChips + '</div></div>' +
      '</div>' +
      '<div class="farrow"></div>' +
      '<div class="fnode report"><div class="fk">' + L('Output', 'ഫലം') + '</div><h3>' + L('Report', 'റിപ്പോർട്ട്') + '</h3>' +
        '<div class="fgrid3">' +
          '<div><b>' + L('Student', 'വിദ്യാർത്ഥി') + '</b><p>' + L('Interest code, personality profile, top streams and careers with study paths.', 'താൽപ്പര്യ കോഡ്, വ്യക്തിത്വം, യോജിച്ച സ്ട്രീമുകൾ, കരിയറുകൾ, പഠനവഴികൾ.') + '</p></div>' +
          '<div><b>' + L('Parents', 'രക്ഷിതാക്കൾ') + '</b><p>' + L('A plain-language section on how to support the child.', 'കുട്ടിയെ എങ്ങനെ പിന്തുണയ്ക്കാം എന്ന് ലളിതമായി വിശദീകരിക്കുന്ന ഭാഗം.') + '</p></div>' +
          '<div><b>' + L('Counsellors', 'കൗൺസിലർമാർ') + '</b><p>' + L('Class list, individual reports and a spreadsheet export.', 'ക്ലാസ് പട്ടിക, ഓരോ കുട്ടിയുടെയും റിപ്പോർട്ട്, സ്പ്രെഡ്ഷീറ്റ് എക്സ്പോർട്ട്.') + '</p></div>' +
        '</div></div>' +
      '<div class="farrow dashed"></div>' +
      '<div class="fnode planned"><div class="fk">' + L('Planned, not yet included', 'വരാനിരിക്കുന്നത്, ഇപ്പോൾ ഇല്ല') + '</div>' +
        '<p>' + L('Aptitude (ICAR) and work values (O*NET Work Importance Profiler) will be added only from their official published items.', 'അഭിരുചി (ICAR), തൊഴിൽ മൂല്യങ്ങൾ (O*NET Work Importance Profiler) എന്നിവ അവയുടെ ഔദ്യോഗിക ചോദ്യങ്ങൾ ലഭിച്ച ശേഷം മാത്രമേ ചേർക്കുകയുള്ളൂ.') + '</p></div>' +
      '</div>';
  }

  function interestDetail() {
    var cards = ['R', 'I', 'A', 'S', 'E', 'C'].map(function (d) {
      var dim = EP.interest.dims[d];
      var ex = EP.interest.items.filter(function (it) { return it.dim === d; }).slice(0, 3)
        .map(function (it) { return '<li>' + esc(EP.lang === 'ml' ? it.ml : it.en) + '</li>'; }).join('');
      return '<div class="dcard riasec-edge-' + d + '"><h4><span class="tag riasec-' + d + '">' + d + '</span> ' + esc(tx(dim)) +
        ' <small>' + esc(tx(dim.nick)) + '</small></h4><p>' + esc(tx(dim.desc)) + '</p>' +
        '<p class="mini-h">' + L('Example questions (3 of 10)', 'ഉദാഹരണ ചോദ്യങ്ങൾ (10-ൽ 3)') + '</p><ul>' + ex + '</ul></div>';
    }).join('');
    return '<div class="split2"><div>' + hexagon() + '</div><div>' +
      '<p>' + L('Holland\'s theory sorts people and work environments into six types. Types next to each other on the hexagon are more alike; opposite types are least alike.', 'ഹോളണ്ടിന്റെ സിദ്ധാന്തം ആളുകളെയും തൊഴിൽ സാഹചര്യങ്ങളെയും ആറ് തരങ്ങളായി തിരിക്കുന്നു. ഷഡ്ഭുജത്തിൽ അടുത്തടുത്തുള്ള തരങ്ങൾ തമ്മിൽ കൂടുതൽ സാമ്യമുണ്ട്. നേർക്കുനേർ എതിരെയുള്ളവ തമ്മിലാണ് ഏറ്റവും കുറഞ്ഞ സാമ്യം.') + cite('holland') + '</p>' +
      '<ul class="facts">' +
        '<li><b>' + L('Format', 'രീതി') + ':</b> ' + L('60 work activities, 10 per type, rated from Strongly dislike to Strongly like.', '60 ജോലികൾ, ഓരോ തരത്തിലും 10 എണ്ണം. ഓരോന്നിനും "ഒട്ടും ഇഷ്ടമല്ല" മുതൽ "വളരെ ഇഷ്ടമാണ്" വരെ ഉത്തരം നൽകുന്നു.') + '</li>' +
        '<li><b>' + L('Scoring', 'സ്കോറിംഗ്') + ':</b> ' + L('0–4 points per answer; each type scores 0–40. The three highest types form the interest code, for example ISR.', 'ഓരോ ഉത്തരത്തിനും 0 മുതൽ 4 വരെ പോയിന്റ്. ഓരോ തരത്തിനും 0 മുതൽ 40 വരെ സ്കോർ. ഏറ്റവും ഉയർന്ന മൂന്ന് തരങ്ങൾ ചേർന്നതാണ് താൽപ്പര്യ കോഡ്, ഉദാഹരണം ISR.') + cite('rounds') + '</li>' +
        '<li><b>' + L('Why interests', 'എന്തുകൊണ്ട് താൽപ്പര്യം') + ':</b> ' + L('Meta-analyses of decades of research show that people whose interests fit their work perform better and stay longer.', 'താൽപ്പര്യത്തിന് യോജിച്ച ജോലി ചെയ്യുന്നവർ കൂടുതൽ നന്നായി പ്രവർത്തിക്കുകയും ആ ജോലിയിൽ കൂടുതൽ കാലം തുടരുകയും ചെയ്യുന്നുവെന്ന് പതിറ്റാണ്ടുകളുടെ ഗവേഷണം കാണിക്കുന്നു.') + cite('nye', 'vani') + '</li>' +
      '</ul></div></div>' +
      '<div class="dgrid">' + cards + '</div>';
  }

  function personalityDetail() {
    var traits = [['O', 'O', [5, 10, 15, 20]], ['C', 'C', [3, 8, 13, 18]], ['E', 'E', [1, 6, 11, 16]], ['A', 'A', [2, 7, 12, 17]], ['ES', 'N', [4, 9, 14, 19]]];
    var cards = traits.map(function (tr) {
      var dim = EP.personality.dims[tr[0]];
      var items = EP.personality.items.filter(function (it) { return it.dim === tr[1]; });
      var ex = items.map(function (it) {
        return '<li>' + esc(EP.lang === 'ml' ? it.ml : it.en) + (it.key === -1 ? ' <span class="rev">' + L('reversed', 'തിരിച്ച്') + '</span>' : '') + '</li>';
      }).join('');
      return '<div class="dcard trait-edge"><h4>' + esc(tx(dim)) + '</h4>' +
        '<p><b>' + L('High', 'ഉയർന്നത്') + ':</b> ' + esc(tx(dim.high)) + '</p>' +
        '<p><b>' + L('Low', 'കുറഞ്ഞത്') + ':</b> ' + esc(tx(dim.low)) + '</p>' +
        '<p class="mini-h">' + L('Its 4 questions', 'ഇതിലെ 4 ചോദ്യങ്ങൾ') + '</p><ul>' + ex + '</ul></div>';
    }).join('');
    return '<ul class="facts">' +
      '<li><b>' + L('Format', 'രീതി') + ':</b> ' + L('20 statements, 4 per trait, rated from Very inaccurate to Very accurate. 11 statements are reverse-scored.', '20 വാക്യങ്ങൾ, ഓരോ സ്വഭാവഗുണത്തിനും 4 എണ്ണം. ഓരോന്നിനും "ഒട്ടും ശരിയല്ല" മുതൽ "പൂർണ്ണമായും ശരിയാണ്" വരെ ഉത്തരം നൽകുന്നു. 11 വാക്യങ്ങൾ തിരിച്ചാണ് സ്കോർ ചെയ്യുന്നത്.') + cite('donnellan') + '</li>' +
      '<li><b>' + L('Origin', 'ഉറവിടം') + ':</b> ' + L('A short form of the 50-item IPIP Big Five markers, from the public-domain International Personality Item Pool.', 'ആർക്കും സൗജന്യമായി ഉപയോഗിക്കാവുന്ന International Personality Item Pool-ലെ 50 ചോദ്യങ്ങളുള്ള Big Five സ്കെയിലിന്റെ ചുരുക്കിയ രൂപമാണ് ഇത്.') + cite('goldberg99', 'goldberg06') + '</li>' +
      '<li><b>' + L('How it is used', 'എങ്ങനെ ഉപയോഗിക്കുന്നു') + ':</b> ' + L('Shown to help students understand themselves. Not used to pick careers, because personality predicts job outcomes much more weakly than interests do.', 'വിദ്യാർത്ഥികൾക്ക് സ്വയം മനസ്സിലാക്കാനാണ് ഇത് കാണിക്കുന്നത്. ജോലിയിലെ വിജയം പ്രവചിക്കാൻ താൽപ്പര്യത്തോളം ശക്തി വ്യക്തിത്വത്തിനില്ല. അതിനാൽ കരിയർ തിരഞ്ഞെടുക്കാൻ ഇത് ഉപയോഗിക്കുന്നില്ല.') + cite('barrick', 'nye') + '</li>' +
      '</ul><div class="dgrid">' + cards + '</div>';
  }

  function matchingDetail() {
    return '<div class="formula">' +
      '<div class="fx"><span class="fx-l">' + L('Career fit', 'കരിയർ യോജിപ്പ്') + '</span> = ' +
      '<span class="fx-a">60% × ' + L('profile match', 'താൽപ്പര്യ രൂപത്തിന്റെ സാമ്യം') + '</span> + ' +
      '<span class="fx-b">40% × ' + L('interest level in the career\'s areas', 'ആ കരിയറിന്റെ മേഖലകളിലെ താൽപ്പര്യ നില') + '</span></div></div>' +
      '<ol class="steps">' +
      '<li>' + L('Each career has a three-letter O*NET interest code, for example Doctor = ISR. The letters are weighted 1, 0.6 and 0.3.', 'ഓരോ കരിയറിനും O*NET-ൽ നിന്നുള്ള മൂന്നക്ഷര താൽപ്പര്യ കോഡുണ്ട്. ഉദാഹരണത്തിന്, ഡോക്ടർ = ISR. ഈ അക്ഷരങ്ങൾക്ക് യഥാക്രമം 1, 0.6, 0.3 എന്നിങ്ങനെ പ്രാധാന്യം നൽകുന്നു.') + '</li>' +
      '<li>' + L('Profile match: how closely the shape of the student\'s six scores follows the career\'s code (a correlation).', 'താൽപ്പര്യ രൂപത്തിന്റെ സാമ്യം: വിദ്യാർത്ഥിയുടെ ആറ് സ്കോറുകളുടെ രൂപം കരിയറിന്റെ കോഡുമായി എത്രത്തോളം ഒത്തുപോകുന്നു എന്ന് (കോറിലേഷൻ) കണക്കാക്കുന്നു.') + '</li>' +
      '<li>' + L('Interest level: how much the student actually likes the career\'s three areas.', 'താൽപ്പര്യ നില: ആ കരിയറിന്റെ മൂന്ന് മേഖലകൾ വിദ്യാർത്ഥിക്ക് യഥാർത്ഥത്തിൽ എത്രത്തോളം ഇഷ്ടമാണെന്ന് കണക്കാക്കുന്നു.') + '</li>' +
      '<li>' + L('Stream fit is the average fit of the three best-matching careers that each stream leads to.', 'ഓരോ സ്ട്രീമും നയിക്കുന്ന കരിയറുകളിൽ ഏറ്റവും യോജിക്കുന്ന മൂന്നെണ്ണത്തിന്റെ ശരാശരിയാണ് സ്ട്രീം യോജിപ്പ്.') + '</li>' +
      '</ol>' +
      '<p class="note">' + L('The 60/40 weights are a starting point. They will be calibrated with outcome data from Kerala students.', '60/40 എന്ന അനുപാതം ഒരു തുടക്കം മാത്രമാണ്. കേരളത്തിലെ വിദ്യാർത്ഥികളുടെ വിവരങ്ങൾ ഉപയോഗിച്ച് ഇത് പിന്നീട് ക്രമീകരിക്കും.') + '</p>';
  }

  function qualityDetail() {
    var rows = [
      [L('Same answer', 'ഒരേ ഉത്തരം'), L('80% or more of a test\'s answers are identical.', 'ഒരു ടെസ്റ്റിലെ 80% അല്ലെങ്കിൽ അതിൽ കൂടുതൽ ഉത്തരങ്ങൾ ഒന്നുതന്നെ.')],
      [L('Too fast', 'വളരെ വേഗം'), L('Typical time per question is under 0.8 seconds.', 'ഒരു ചോദ്യത്തിന് സാധാരണയായി എടുത്ത സമയം 0.8 സെക്കൻഡിൽ താഴെ.')],
      [L('Unfinished', 'പൂർത്തിയായില്ല'), L('A test was not completed.', 'ഒരു ടെസ്റ്റ് പൂർത്തിയാക്കിയില്ല.')],
      [L('Flat interests', 'ഒരുപോലെയുള്ള താൽപ്പര്യം'), L('All six interest scores are very close. This is a note, not an error: interests are still forming.', 'ആറ് താൽപ്പര്യ സ്കോറുകളും ഏകദേശം ഒരുപോലെ. ഇതൊരു കുറിപ്പ് മാത്രമാണ്, തെറ്റല്ല. താൽപ്പര്യങ്ങൾ ഇപ്പോഴും രൂപപ്പെട്ടു വരുന്നു.')]
    ].map(function (r) { return '<tr><th>' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('');
    return '<div class="table-wrap"><table class="qtable">' + rows + '</table></div>' +
      '<div class="levels"><span class="q q-good">' + L('Good', 'നല്ലത്') + '</span>' +
      '<span class="q q-caution">' + L('Use with care: 1 flag', 'ശ്രദ്ധിച്ച് ഉപയോഗിക്കുക: 1 പ്രശ്നം') + '</span>' +
      '<span class="q q-retake">' + L('Retake: 2 or more flags', 'വീണ്ടും എഴുതുക: 2-ഓ അതിലധികമോ പ്രശ്നങ്ങൾ') + '</span></div>';
  }

  function roadmap() {
    var steps = [
      [L('Now', 'ഇപ്പോൾ'), L('Two standardised tests, interest-based matching, Malayalam translation.', 'രണ്ട് നിലവാരമുള്ള ടെസ്റ്റുകൾ, താൽപ്പര്യം അടിസ്ഥാനമാക്കിയുള്ള യോജിപ്പിക്കൽ, മലയാളം പരിഭാഷ.')],
      [L('Translation review', 'പരിഭാഷാ പരിശോധന'), L('Back-translation, expert review and a student pre-test, following ITC guidelines.', 'ITC മാർഗ്ഗനിർദ്ദേശങ്ങൾ അനുസരിച്ച് തിരികെ പരിഭാഷപ്പെടുത്തൽ, വിദഗ്ദ്ധ പരിശോധന, വിദ്യാർത്ഥികളിൽ ഒരു പ്രാഥമിക പരീക്ഷണം.') + cite('itc')],
      [L('Pilot', 'പൈലറ്റ്'), L('300–500 students: reliability, item statistics and English–Malayalam equivalence.', '300–500 വിദ്യാർത്ഥികൾ: വിശ്വാസ്യത, ചോദ്യങ്ങളുടെ നിലവാരം, ഇംഗ്ലീഷ്–മലയാളം തുല്യത.')],
      [L('Kerala norms', 'കേരള മാനദണ്ഡങ്ങൾ'), L('About 2,000 students, so scores can be shown as percentiles.', 'ഏകദേശം 2,000 വിദ്യാർത്ഥികൾ. ഇതോടെ സ്കോറുകൾ പെർസന്റൈലായി കാണിക്കാം.')],
      [L('More tests', 'കൂടുതൽ ടെസ്റ്റുകൾ'), L('Aptitude (ICAR) and work values (O*NET), from official items only.', 'അഭിരുചി (ICAR), തൊഴിൽ മൂല്യങ്ങൾ (O*NET), ഔദ്യോഗിക ചോദ്യങ്ങളിൽ നിന്ന് മാത്രം.')]
    ];
    return '<ol class="timeline">' + steps.map(function (s, i) {
      return '<li class="' + (i === 0 ? 'now' : '') + '"><b>' + s[0] + '</b><span>' + s[1] + '</span></li>';
    }).join('') + '</ol>';
  }

  function references() {
    return '<ol class="refs">' + REFS.map(function (r) {
      return '<li id="ref-' + r.id + '">' + r.text + '</li>';
    }).join('') + '</ol>';
  }

  function sec(id, num, title, lead, body) {
    return '<section class="map-sec" id="map-' + id + '"><div class="map-sec-h"><span class="map-num">' + num + '</span><h2>' + title + '</h2></div>' +
      (lead ? '<p class="lead">' + lead + '</p>' : '') + body + '</section>';
  }

  function render() {
    var toc = [
      ['flow', L('Overview', 'ആകെ ചിത്രം')], ['interests', L('Interests', 'താൽപ്പര്യങ്ങൾ')],
      ['personality', L('Personality', 'വ്യക്തിത്വം')], ['matching', L('Matching', 'യോജിപ്പിക്കൽ')],
      ['quality', L('Quality checks', 'നിലവാര പരിശോധന')], ['roadmap', L('Roadmap', 'മുന്നോട്ടുള്ള വഴി')],
      ['refs', L('References', 'അവലംബങ്ങൾ')]
    ].map(function (x) { return '<a href="#map-' + x[0] + '">' + x[1] + '</a>'; }).join('');
    return '<div class="map">' +
      '<header class="map-hero"><h1>' + L('Assessment map', 'ടെസ്റ്റിന്റെ രൂപരേഖ') + '</h1>' +
      '<p class="lead">' + L('What this assessment measures, how answers become recommendations, and the research behind each step.', 'ഈ ടെസ്റ്റ് എന്താണ് അളക്കുന്നത്, ഉത്തരങ്ങളിൽ നിന്ന് നിർദ്ദേശങ്ങൾ എങ്ങനെ ഉണ്ടാകുന്നു, ഓരോ ഘട്ടത്തിനും പിന്നിലെ ഗവേഷണം എന്താണ് എന്നെല്ലാം ഇവിടെ കാണാം.') + '</p>' +
      '<nav class="map-toc">' + toc + '</nav></header>' +
      sec('flow', '1', L('Overview', 'ആകെ ചിത്രം'), L('From the student\'s answers to the final report.', 'വിദ്യാർത്ഥിയുടെ ഉത്തരങ്ങളിൽ നിന്ന് അവസാന റിപ്പോർട്ട് വരെ.'), flow()) +
      sec('interests', '2', L('Interests: O*NET Interest Profiler', 'താൽപ്പര്യങ്ങൾ: O*NET ഇന്ററസ്റ്റ് പ്രൊഫൈലർ'), null, interestDetail()) +
      sec('personality', '3', L('Personality: Mini-IPIP Big Five', 'വ്യക്തിത്വം: Mini-IPIP Big Five'), null, personalityDetail()) +
      sec('matching', '4', L('From scores to careers and streams', 'സ്കോറുകളിൽ നിന്ന് കരിയറുകളിലേക്കും സ്ട്രീമുകളിലേക്കും'), null, matchingDetail()) +
      sec('quality', '5', L('Response quality checks', 'ഉത്തരങ്ങളുടെ നിലവാര പരിശോധന'), L('These rules are common screening practice and will be calibrated in the pilot.', 'ഇവ സാധാരണ ഉപയോഗിക്കുന്ന പരിശോധനാ രീതികളാണ്. പൈലറ്റ് പഠനത്തിൽ ഇവ ക്രമീകരിക്കും.'), qualityDetail()) +
      sec('roadmap', '6', L('Roadmap', 'മുന്നോട്ടുള്ള വഴി'), null, roadmap()) +
      sec('refs', '7', L('References', 'അവലംബങ്ങൾ'), null, references()) +
      '</div>';
  }

  return { render: render };
})();
