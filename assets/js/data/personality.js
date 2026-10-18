// Big Five personality: Mini-IPIP (Donnellan et al., 2006), 20 public-domain
// IPIP items, lightly adapted for school students. key: +1 or -1 (reverse).
// Neuroticism (N) is reported reversed as Emotional Stability (ES).
var EP = window.EP = window.EP || {};

EP.personality = {
  id: 'personality',
  kind: 'likert',
  scale: 'agree5',
  minutes: 4,
  title: { en: 'Personality', ml: 'വ്യക്തിത്വം' },
  intro: {
    en: 'Each statement describes a way people behave. Choose how well it describes you as you usually are now, not as you wish to be. Be honest; there are no right or wrong answers.',
    ml: 'ഓരോ പ്രസ്താവനയും ആളുകൾ പെരുമാറുന്ന ഒരു രീതിയാണ്. നിങ്ങൾ ആകാൻ ആഗ്രഹിക്കുന്നതല്ല, സാധാരണയായി ഇപ്പോൾ നിങ്ങൾ എങ്ങനെയാണോ അതനുസരിച്ച് തിരഞ്ഞെടുക്കുക. സത്യസന്ധമായി ഉത്തരം നൽകുക; ശരിയോ തെറ്റോ ആയ ഉത്തരങ്ങളില്ല.'
  },
  stem: { en: 'How well does this describe you?', ml: 'ഇത് നിങ്ങളെ എത്രത്തോളം വിവരിക്കുന്നു?' },
  dims: {
    E: { en: 'Extraversion', ml: 'ബഹിർമുഖത',
      high: { en: 'You get energy from being with people and enjoy group activities.', ml: 'ആളുകളോടൊപ്പമിരിക്കുമ്പോൾ നിങ്ങൾക്ക് ഊർജ്ജം ലഭിക്കുന്നു; കൂട്ടായ പ്രവർത്തനങ്ങൾ നിങ്ങൾ ആസ്വദിക്കുന്നു.' },
      mid: { en: 'You are comfortable both in groups and on your own.', ml: 'കൂട്ടത്തിലും ഒറ്റയ്ക്കും നിങ്ങൾ ഒരുപോലെ സുഖകരമായി ഇരിക്കുന്നു.' },
      low: { en: 'You prefer quieter settings and like to think before you speak.', ml: 'ശാന്തമായ ചുറ്റുപാടുകളാണ് നിങ്ങൾക്കിഷ്ടം; സംസാരിക്കുന്നതിനു മുമ്പ് ആലോചിക്കാൻ നിങ്ങൾ ഇഷ്ടപ്പെടുന്നു.' } },
    A: { en: 'Agreeableness', ml: 'സഹവർത്തിത്വം',
      high: { en: 'You are caring, kind and considerate of others\' feelings.', ml: 'നിങ്ങൾ കരുതലും ദയയുമുള്ളവരാണ്; മറ്റുള്ളവരുടെ വികാരങ്ങൾ പരിഗണിക്കുന്നു.' },
      mid: { en: 'You balance care for others with standing up for your own views.', ml: 'മറ്റുള്ളവരോടുള്ള കരുതലും സ്വന്തം അഭിപ്രായങ്ങളും നിങ്ങൾ സന്തുലിതമായി കൊണ്ടുപോകുന്നു.' },
      low: { en: 'You are direct and focus more on tasks than on feelings.', ml: 'നിങ്ങൾ നേരിട്ട് കാര്യങ്ങൾ പറയുന്നവരാണ്; വികാരങ്ങളേക്കാൾ ജോലിയിലാണ് ശ്രദ്ധ.' } },
    C: { en: 'Conscientiousness', ml: 'ചിട്ടയും ഉത്തരവാദിത്വവും',
      high: { en: 'You are organised, responsible and finish tasks on time.', ml: 'നിങ്ങൾ ചിട്ടയും ഉത്തരവാദിത്വവുമുള്ളവരാണ്; ജോലികൾ സമയത്ത് തീർക്കുന്നു.' },
      mid: { en: 'You are organised when it matters, and flexible at other times.', ml: 'ആവശ്യമുള്ളപ്പോൾ നിങ്ങൾ ചിട്ടയോടെ പ്രവർത്തിക്കുന്നു, മറ്റു സമയങ്ങളിൽ അയവുള്ളവരാണ്.' },
      low: { en: 'You like flexibility; building small daily routines will help you a lot.', ml: 'അയവുള്ള രീതികളാണ് നിങ്ങൾക്കിഷ്ടം; ചെറിയ ദിനചര്യകൾ ശീലിക്കുന്നത് നിങ്ങളെ ഏറെ സഹായിക്കും.' } },
    ES: { en: 'Emotional stability', ml: 'വൈകാരിക സ്ഥിരത',
      high: { en: 'You usually stay calm and steady, even under pressure.', ml: 'സമ്മർദ്ദത്തിലും നിങ്ങൾ സാധാരണയായി ശാന്തരും സ്ഥിരതയുള്ളവരുമാണ്.' },
      mid: { en: 'You handle most stress well, with some ups and downs.', ml: 'ചില ഏറ്റക്കുറച്ചിലുകളോടെ, മിക്ക സമ്മർദ്ദങ്ങളും നിങ്ങൾ നന്നായി കൈകാര്യം ചെയ്യുന്നു.' },
      low: { en: 'You feel emotions strongly; learning stress-management skills will help you.', ml: 'നിങ്ങൾ വികാരങ്ങൾ ശക്തമായി അനുഭവിക്കുന്നു; സമ്മർദ്ദം നിയന്ത്രിക്കാനുള്ള വഴികൾ പഠിക്കുന്നത് സഹായകമാകും.' } },
    O: { en: 'Openness / Imagination', ml: 'തുറന്ന മനസ്സ് / ഭാവന',
      high: { en: 'You are imaginative, curious and enjoy new ideas.', ml: 'നിങ്ങൾ ഭാവനാശാലികളും ജിജ്ഞാസുക്കളുമാണ്; പുതിയ ആശയങ്ങൾ ആസ്വദിക്കുന്നു.' },
      mid: { en: 'You enjoy new ideas but also value what is practical and familiar.', ml: 'പുതിയ ആശയങ്ങൾ ഇഷ്ടമാണെങ്കിലും പ്രായോഗികവും പരിചിതവുമായവയ്ക്കും നിങ്ങൾ വില കൽപ്പിക്കുന്നു.' },
      low: { en: 'You prefer practical, concrete and familiar things.', ml: 'പ്രായോഗികവും വ്യക്തവും പരിചിതവുമായ കാര്യങ്ങളാണ് നിങ്ങൾക്കിഷ്ടം.' } }
  },
  items: [
    { id: 'P1', dim: 'E', key: 1, en: 'I am the life of the party (I make gatherings fun)', ml: 'ആഘോഷങ്ങളിലും കൂട്ടായ്മകളിലും എല്ലാവരെയും ഉഷാറാക്കുന്നത് ഞാനാണ്' },
    { id: 'P2', dim: 'A', key: 1, en: 'I sympathise with others\' feelings', ml: 'മറ്റുള്ളവരുടെ വികാരങ്ങളോട് എനിക്ക് സഹാനുഭൂതിയുണ്ട്' },
    { id: 'P3', dim: 'C', key: 1, en: 'I get my tasks and chores done right away', ml: 'ചെയ്യേണ്ട ജോലികൾ ഞാൻ ഉടനെ ചെയ്തു തീർക്കും' },
    { id: 'P4', dim: 'N', key: 1, en: 'I have frequent mood swings', ml: 'എന്റെ മാനസികാവസ്ഥ ഇടയ്ക്കിടെ മാറിക്കൊണ്ടിരിക്കും' },
    { id: 'P5', dim: 'O', key: 1, en: 'I have a vivid imagination', ml: 'എനിക്ക് നല്ല ഭാവനാശക്തിയുണ്ട്' },
    { id: 'P6', dim: 'E', key: -1, en: 'I don\'t talk a lot', ml: 'ഞാൻ അധികം സംസാരിക്കാറില്ല' },
    { id: 'P7', dim: 'A', key: -1, en: 'I am not interested in other people\'s problems', ml: 'മറ്റുള്ളവരുടെ പ്രശ്നങ്ങളിൽ എനിക്ക് താൽപ്പര്യമില്ല' },
    { id: 'P8', dim: 'C', key: -1, en: 'I often forget to put things back in their proper place', ml: 'സാധനങ്ങൾ യഥാസ്ഥാനത്ത് തിരികെ വെക്കാൻ ഞാൻ പലപ്പോഴും മറക്കാറുണ്ട്' },
    { id: 'P9', dim: 'N', key: -1, en: 'I am relaxed most of the time', ml: 'മിക്ക സമയത്തും എന്റെ മനസ്സ് ശാന്തമാണ്' },
    { id: 'P10', dim: 'O', key: -1, en: 'I am not interested in abstract ideas (big ideas you cannot see or touch)', ml: 'അമൂർത്തമായ ആശയങ്ങളിൽ (കാണാനോ തൊടാനോ കഴിയാത്ത വലിയ ആശയങ്ങൾ) എനിക്ക് താൽപ്പര്യമില്ല' },
    { id: 'P11', dim: 'E', key: 1, en: 'I talk to a lot of different people at gatherings', ml: 'കൂട്ടായ്മകളിൽ ഞാൻ പലതരം ആളുകളോട് സംസാരിക്കാറുണ്ട്' },
    { id: 'P12', dim: 'A', key: 1, en: 'I feel others\' emotions', ml: 'മറ്റുള്ളവരുടെ വികാരങ്ങൾ ഞാൻ ഉള്ളിൽ അനുഭവിക്കാറുണ്ട്' },
    { id: 'CHK2', check: 2, en: 'For this statement, please choose "Disagree"', ml: 'ഈ പ്രസ്താവനയ്ക്ക് "വിയോജിക്കുന്നു" എന്ന് തിരഞ്ഞെടുക്കുക' },
    { id: 'P13', dim: 'C', key: 1, en: 'I like order', ml: 'കാര്യങ്ങൾ ചിട്ടയോടെ ഇരിക്കുന്നത് എനിക്കിഷ്ടമാണ്' },
    { id: 'P14', dim: 'N', key: 1, en: 'I get upset easily', ml: 'എനിക്ക് പെട്ടെന്ന് മനസ്സ് അസ്വസ്ഥമാകാറുണ്ട്' },
    { id: 'P15', dim: 'O', key: -1, en: 'I have difficulty understanding abstract ideas', ml: 'അമൂർത്തമായ ആശയങ്ങൾ മനസ്സിലാക്കാൻ എനിക്ക് ബുദ്ധിമുട്ടുണ്ട്' },
    { id: 'P16', dim: 'E', key: -1, en: 'I keep in the background', ml: 'ഞാൻ പിന്നണിയിൽ ഒതുങ്ങിനിൽക്കാറാണ് പതിവ്' },
    { id: 'P17', dim: 'A', key: -1, en: 'I am not really interested in others', ml: 'മറ്റുള്ളവരിൽ എനിക്ക് അത്ര താൽപ്പര്യമില്ല' },
    { id: 'P18', dim: 'C', key: -1, en: 'I make a mess of things', ml: 'ഞാൻ കാര്യങ്ങൾ അലങ്കോലമാക്കാറുണ്ട്' },
    { id: 'P19', dim: 'N', key: -1, en: 'I seldom feel sad or low', ml: 'എനിക്ക് സങ്കടമോ വിഷാദമോ തോന്നുന്നത് വളരെ അപൂർവമാണ്' },
    { id: 'P20', dim: 'O', key: -1, en: 'I do not have a good imagination', ml: 'എനിക്ക് നല്ല ഭാവനാശക്തിയില്ല' }
  ]
};
