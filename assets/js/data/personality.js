// Big Five personality: Mini-IPIP, 20 items (4 per trait).
// Donnellan, M. B., Oswald, F. L., Baird, B. M., & Lucas, R. E. (2006).
// The Mini-IPIP scales: Tiny-yet-effective measures of the Big Five factors
// of personality. Psychological Assessment, 18(2), 192-203.
// Items are from the International Personality Item Pool (ipip.ori.org),
// public domain. English text, order, keying, instructions and response
// scale are the original. key: +1 or -1 (reverse-scored).
// Neuroticism (N) is reported reversed as Emotional Stability (ES).
var EP = window.EP = window.EP || {};

EP.personality = {
  id: 'personality',
  kind: 'likert',
  scale: 'ipipAccuracy5',
  minutes: 4,
  source: 'Mini-IPIP (Donnellan et al., 2006), International Personality Item Pool',
  title: { en: 'Personality', ml: 'വ്യക്തിത്വം' },
  intro: {
    en: 'Describe yourself as you generally are now, not as you wish to be in the future. Indicate how accurately each statement describes you.',
    ml: 'ഭാവിയിൽ നിങ്ങൾ എങ്ങനെയാകാൻ ആഗ്രഹിക്കുന്നു എന്നല്ല, ഇപ്പോൾ സാധാരണയായി നിങ്ങൾ എങ്ങനെയാണോ അങ്ങനെ സ്വയം വിവരിക്കുക. ഓരോ വാക്യവും നിങ്ങളെക്കുറിച്ച് എത്രത്തോളം ശരിയാണെന്ന് തിരഞ്ഞെടുക്കുക.'
  },
  stem: { en: 'How accurately does this describe you?', ml: 'ഈ വാക്യം നിങ്ങളെക്കുറിച്ച് എത്രത്തോളം ശരിയാണ്?' },
  dims: {
    E: { en: 'Extraversion', ml: 'ബഹിർമുഖത',
      high: { en: 'You get energy from being with people and enjoy group activities.', ml: 'ആളുകളോടൊപ്പം ആയിരിക്കുമ്പോൾ നിങ്ങൾക്ക് ഉന്മേഷം കിട്ടുന്നു. കൂട്ടായ പ്രവർത്തനങ്ങൾ നിങ്ങൾ ആസ്വദിക്കുന്നു.' },
      mid: { en: 'You are comfortable both in groups and on your own.', ml: 'കൂട്ടത്തിലായാലും ഒറ്റയ്ക്കായാലും നിങ്ങൾക്ക് ഒരുപോലെ സന്തോഷമാണ്.' },
      low: { en: 'You prefer quieter settings and like to think before you speak.', ml: 'ശാന്തമായ ചുറ്റുപാടുകളാണ് നിങ്ങൾക്ക് ഇഷ്ടം. സംസാരിക്കുന്നതിനു മുമ്പ് ആലോചിക്കുന്ന ശീലം നിങ്ങൾക്കുണ്ട്.' } },
    A: { en: 'Agreeableness', ml: 'സഹവർത്തിത്വം',
      high: { en: 'You are caring, kind and considerate of others\' feelings.', ml: 'നിങ്ങൾ കരുതലും ദയയും ഉള്ളവരാണ്. മറ്റുള്ളവരുടെ വികാരങ്ങൾ നിങ്ങൾ മാനിക്കുന്നു.' },
      mid: { en: 'You balance care for others with standing up for your own views.', ml: 'മറ്റുള്ളവരോടുള്ള കരുതലും സ്വന്തം അഭിപ്രായങ്ങളും നിങ്ങൾ ഒരുപോലെ കൊണ്ടുപോകുന്നു.' },
      low: { en: 'You are direct and focus more on tasks than on feelings.', ml: 'നിങ്ങൾ കാര്യങ്ങൾ നേരിട്ട് പറയുന്നവരാണ്. വികാരങ്ങളേക്കാൾ ചെയ്യേണ്ട ജോലിയിലാണ് നിങ്ങളുടെ ശ്രദ്ധ.' } },
    C: { en: 'Conscientiousness', ml: 'ചിട്ടയും ഉത്തരവാദിത്വവും',
      high: { en: 'You are organised, responsible and finish tasks on time.', ml: 'നിങ്ങൾ ചിട്ടയും ഉത്തരവാദിത്വവും ഉള്ളവരാണ്. ജോലികൾ നിങ്ങൾ സമയത്ത് ചെയ്തു തീർക്കുന്നു.' },
      mid: { en: 'You are organised when it matters, and flexible at other times.', ml: 'ആവശ്യമുള്ളപ്പോൾ നിങ്ങൾ ചിട്ടയോടെ പ്രവർത്തിക്കുന്നു. മറ്റു സമയങ്ങളിൽ കുറച്ച് അയവോടെ കാര്യങ്ങൾ ചെയ്യുന്നു.' },
      low: { en: 'You like flexibility; building small daily routines will help you a lot.', ml: 'അയവുള്ള രീതികളാണ് നിങ്ങൾക്ക് ഇഷ്ടം. ചെറിയ ദിനചര്യകൾ ശീലമാക്കുന്നത് നിങ്ങളെ ഏറെ സഹായിക്കും.' } },
    ES: { en: 'Emotional stability', ml: 'വൈകാരിക സ്ഥിരത',
      high: { en: 'You usually stay calm and steady, even under pressure.', ml: 'സമ്മർദ്ദമുള്ളപ്പോഴും നിങ്ങൾ സാധാരണയായി ശാന്തമായി ഇരിക്കുന്നു.' },
      mid: { en: 'You handle most stress well, with some ups and downs.', ml: 'ചില ഏറ്റക്കുറച്ചിലുകൾ ഉണ്ടെങ്കിലും മിക്ക സമ്മർദ്ദങ്ങളും നിങ്ങൾ നന്നായി കൈകാര്യം ചെയ്യുന്നു.' },
      low: { en: 'You feel emotions strongly; learning ways to manage stress will help you.', ml: 'നിങ്ങൾ വികാരങ്ങൾ ആഴത്തിൽ അനുഭവിക്കുന്നവരാണ്. സമ്മർദ്ദം നിയന്ത്രിക്കാനുള്ള വഴികൾ പഠിക്കുന്നത് നിങ്ങളെ സഹായിക്കും.' } },
    O: { en: 'Openness / Imagination', ml: 'തുറന്ന മനസ്സ് / ഭാവന',
      high: { en: 'You are imaginative, curious and enjoy new ideas.', ml: 'നിങ്ങൾക്ക് നല്ല ഭാവനയും ജിജ്ഞാസയും ഉണ്ട്. പുതിയ ആശയങ്ങൾ നിങ്ങൾ ആസ്വദിക്കുന്നു.' },
      mid: { en: 'You enjoy new ideas but also value what is practical and familiar.', ml: 'പുതിയ ആശയങ്ങൾ നിങ്ങൾക്ക് ഇഷ്ടമാണ്. എങ്കിലും പ്രായോഗികവും പരിചിതവുമായ കാര്യങ്ങൾക്കും നിങ്ങൾ വില കൽപ്പിക്കുന്നു.' },
      low: { en: 'You prefer practical, concrete and familiar things.', ml: 'പ്രായോഗികവും വ്യക്തവും പരിചിതവുമായ കാര്യങ്ങളാണ് നിങ്ങൾക്ക് ഇഷ്ടം.' } }
  },
  items: [
    { id: 'MI1', dim: 'E', key: 1, en: 'I am the life of the party', ml: 'ആഘോഷങ്ങളിലും ചടങ്ങുകളിലും എല്ലാവരെയും ഉത്സാഹിപ്പിക്കുന്നത് ഞാനാണ്.' },
    { id: 'MI2', dim: 'A', key: 1, en: 'I sympathize with others\' feelings', ml: 'മറ്റുള്ളവരുടെ വികാരങ്ങൾ മനസ്സിലാക്കി ഞാൻ അവരോട് അനുകമ്പ കാണിക്കുന്നു.' },
    { id: 'MI3', dim: 'C', key: 1, en: 'I get chores done right away', ml: 'ചെയ്യേണ്ട ജോലികൾ ഞാൻ ഉടൻ തന്നെ ചെയ്തു തീർക്കുന്നു.' },
    { id: 'MI4', dim: 'N', key: 1, en: 'I have frequent mood swings', ml: 'എന്റെ മാനസികാവസ്ഥ ഇടയ്ക്കിടെ മാറിക്കൊണ്ടിരിക്കുന്നു.' },
    { id: 'MI5', dim: 'O', key: 1, en: 'I have a vivid imagination', ml: 'എനിക്ക് നല്ല ഭാവനാശക്തിയുണ്ട്.' },
    { id: 'MI6', dim: 'E', key: -1, en: 'I don\'t talk a lot', ml: 'ഞാൻ അധികം സംസാരിക്കാറില്ല.' },
    { id: 'MI7', dim: 'A', key: -1, en: 'I am not interested in other people\'s problems', ml: 'മറ്റുള്ളവരുടെ പ്രശ്നങ്ങളിൽ എനിക്ക് താൽപ്പര്യമില്ല.' },
    { id: 'MI8', dim: 'C', key: -1, en: 'I often forget to put things back in their proper place', ml: 'സാധനങ്ങൾ എടുത്ത സ്ഥലത്തു തന്നെ തിരികെ വെക്കാൻ ഞാൻ പലപ്പോഴും മറന്നുപോകുന്നു.' },
    { id: 'MI9', dim: 'N', key: -1, en: 'I am relaxed most of the time', ml: 'മിക്ക സമയത്തും എന്റെ മനസ്സ് ശാന്തമാണ്.' },
    { id: 'MI10', dim: 'O', key: -1, en: 'I am not interested in abstract ideas', ml: 'കാണാനോ തൊട്ടറിയാനോ കഴിയാത്ത ആശയങ്ങളിൽ (അമൂർത്ത ആശയങ്ങളിൽ) എനിക്ക് താൽപ്പര്യമില്ല.' },
    { id: 'MI11', dim: 'E', key: 1, en: 'I talk to a lot of different people at parties', ml: 'ആഘോഷങ്ങളിലും ചടങ്ങുകളിലും ഞാൻ പലതരം ആളുകളോട് സംസാരിക്കുന്നു.' },
    { id: 'MI12', dim: 'A', key: 1, en: 'I feel others\' emotions', ml: 'മറ്റുള്ളവരുടെ സന്തോഷവും സങ്കടവും ഞാനും ഉള്ളിൽ അനുഭവിക്കുന്നു.' },
    { id: 'MI13', dim: 'C', key: 1, en: 'I like order', ml: 'എല്ലാം ചിട്ടയോടെ ഇരിക്കുന്നത് എനിക്ക് ഇഷ്ടമാണ്.' },
    { id: 'MI14', dim: 'N', key: 1, en: 'I get upset easily', ml: 'എന്റെ മനസ്സ് പെട്ടെന്ന് അസ്വസ്ഥമാകുന്നു.' },
    { id: 'MI15', dim: 'O', key: -1, en: 'I have difficulty understanding abstract ideas', ml: 'കാണാനോ തൊട്ടറിയാനോ കഴിയാത്ത ആശയങ്ങൾ (അമൂർത്ത ആശയങ്ങൾ) മനസ്സിലാക്കാൻ എനിക്ക് ബുദ്ധിമുട്ടാണ്.' },
    { id: 'MI16', dim: 'E', key: -1, en: 'I keep in the background', ml: 'ആൾക്കൂട്ടത്തിൽ ശ്രദ്ധിക്കപ്പെടാതെ പിന്നിൽ ഒതുങ്ങിനിൽക്കുന്നതാണ് എന്റെ രീതി.' },
    { id: 'MI17', dim: 'A', key: -1, en: 'I am not really interested in others', ml: 'മറ്റുള്ളവരുടെ കാര്യങ്ങളിൽ എനിക്ക് അത്ര താൽപ്പര്യമില്ല.' },
    { id: 'MI18', dim: 'C', key: -1, en: 'I make a mess of things', ml: 'ഞാൻ പലപ്പോഴും കാര്യങ്ങൾ അലങ്കോലമാക്കുന്നു.' },
    { id: 'MI19', dim: 'N', key: -1, en: 'I seldom feel blue', ml: 'എനിക്ക് സങ്കടമോ മനോവിഷമമോ തോന്നുന്നത് വളരെ അപൂർവമാണ്.' },
    { id: 'MI20', dim: 'O', key: -1, en: 'I do not have a good imagination', ml: 'എനിക്ക് നല്ല ഭാവനാശക്തിയില്ല.' }
  ]
};
