// Work values, modelled on the six O*NET work values (Work Importance Profiler).
// Subject preferences are a short rating used for stream guidance.
var EP = window.EP = window.EP || {};

EP.values = {
  id: 'values',
  kind: 'likert',
  scale: 'important5',
  minutes: 3,
  title: { en: 'Work values', ml: 'തൊഴിൽ മൂല്യങ്ങൾ' },
  intro: {
    en: 'Imagine your future job. Choose how important each of these things would be to you.',
    ml: 'നിങ്ങളുടെ ഭാവിയിലെ ജോലി സങ്കൽപ്പിക്കുക. താഴെ പറയുന്ന ഓരോ കാര്യവും നിങ്ങൾക്ക് എത്രത്തോളം പ്രധാനമാണെന്ന് തിരഞ്ഞെടുക്കുക.'
  },
  stem: { en: 'In my future job, it is important to…', ml: 'എന്റെ ഭാവി ജോലിയിൽ ഇത് എത്രത്തോളം പ്രധാനമാണ്?' },
  dims: {
    ACH: { en: 'Achievement', ml: 'നേട്ടം',
      desc: { en: 'Using your abilities and seeing results', ml: 'കഴിവുകൾ ഉപയോഗിച്ച് ഫലം കാണുക' } },
    IND: { en: 'Independence', ml: 'സ്വാതന്ത്ര്യം',
      desc: { en: 'Making your own decisions and trying your own ideas', ml: 'സ്വന്തം തീരുമാനങ്ങളും ആശയങ്ങളും' } },
    REC: { en: 'Recognition', ml: 'അംഗീകാരം',
      desc: { en: 'Respect, status and chances to lead', ml: 'ബഹുമാനം, പദവി, നേതൃത്വ അവസരങ്ങൾ' } },
    REL: { en: 'Relationships & service', ml: 'ബന്ധങ്ങളും സേവനവും',
      desc: { en: 'Friendly co-workers, helping others, doing what is right', ml: 'സൗഹൃദമുള്ള സഹപ്രവർത്തകർ, മറ്റുള്ളവരെ സഹായിക്കൽ, ശരിയായത് ചെയ്യൽ' } },
    SUP: { en: 'Support', ml: 'പിന്തുണ',
      desc: { en: 'Fair treatment, good guidance and training', ml: 'നീതിപൂർവമായ പെരുമാറ്റം, മാർഗ്ഗനിർദ്ദേശം, പരിശീലനം' } },
    WC: { en: 'Security & pay', ml: 'സുരക്ഷയും ശമ്പളവും',
      desc: { en: 'Good salary, a steady job and variety', ml: 'നല്ല ശമ്പളം, സ്ഥിരമായ ജോലി, വൈവിധ്യം' } }
  },
  items: [
    { id: 'V1', dim: 'ACH', en: 'See the results of my hard work', ml: 'എന്റെ കഠിനാധ്വാനത്തിന്റെ ഫലം കാണാൻ കഴിയുക' },
    { id: 'V2', dim: 'IND', en: 'Make my own decisions', ml: 'സ്വന്തമായി തീരുമാനങ്ങൾ എടുക്കാൻ കഴിയുക' },
    { id: 'V3', dim: 'REC', en: 'Be respected for my work', ml: 'എന്റെ ജോലിയുടെ പേരിൽ ബഹുമാനിക്കപ്പെടുക' },
    { id: 'V4', dim: 'REL', en: 'Work with friendly people', ml: 'സൗഹൃദമുള്ള ആളുകളോടൊപ്പം ജോലി ചെയ്യുക' },
    { id: 'V5', dim: 'SUP', en: 'Have a boss who supports and guides me', ml: 'എന്നെ പിന്തുണയ്ക്കുകയും നയിക്കുകയും ചെയ്യുന്ന ഒരു മേലധികാരി ഉണ്ടാവുക' },
    { id: 'V6', dim: 'WC', en: 'Earn a good salary', ml: 'നല്ല ശമ്പളം ലഭിക്കുക' },
    { id: 'V7', dim: 'ACH', en: 'Use my best abilities and talents', ml: 'എന്റെ ഏറ്റവും മികച്ച കഴിവുകൾ ഉപയോഗിക്കാൻ കഴിയുക' },
    { id: 'V8', dim: 'IND', en: 'Try out my own new ideas', ml: 'എന്റെ സ്വന്തം പുതിയ ആശയങ്ങൾ പരീക്ഷിക്കാൻ കഴിയുക' },
    { id: 'V9', dim: 'REC', en: 'Have chances to become a leader or get promoted', ml: 'നേതൃസ്ഥാനത്തെത്താനോ സ്ഥാനക്കയറ്റം നേടാനോ അവസരമുണ്ടാവുക' },
    { id: 'V10', dim: 'REL', en: 'Help other people through my work', ml: 'എന്റെ ജോലിയിലൂടെ മറ്റുള്ളവരെ സഹായിക്കുക' },
    { id: 'V11', dim: 'SUP', en: 'Work for an organisation that treats workers fairly', ml: 'ജീവനക്കാരോട് നീതിപൂർവ്വം പെരുമാറുന്ന ഒരു സ്ഥാപനത്തിൽ ജോലി ചെയ്യുക' },
    { id: 'V12', dim: 'WC', en: 'Have a secure, steady job', ml: 'സുരക്ഷിതവും സ്ഥിരവുമായ ഒരു ജോലി ഉണ്ടാവുക' },
    { id: 'V13', dim: 'ACH', en: 'Feel that I have achieved something', ml: 'എന്തെങ്കിലും നേടിയെടുത്തു എന്ന തോന്നൽ ഉണ്ടാവുക' },
    { id: 'V14', dim: 'IND', en: 'Work without someone always watching over me', ml: 'ആരും എപ്പോഴും മേൽനോട്ടം വഹിക്കാതെ ജോലി ചെയ്യാൻ കഴിയുക' },
    { id: 'V15', dim: 'REC', en: 'Have a job that is respected in society', ml: 'സമൂഹത്തിൽ മതിപ്പുള്ള ഒരു ജോലി ഉണ്ടാവുക' },
    { id: 'V16', dim: 'REL', en: 'Do work that I feel is morally right', ml: 'ധാർമ്മികമായി ശരിയെന്ന് എനിക്ക് തോന്നുന്ന ജോലി ചെയ്യുക' },
    { id: 'V17', dim: 'SUP', en: 'Get training to keep learning new skills', ml: 'പുതിയ കഴിവുകൾ പഠിക്കാൻ പരിശീലനം ലഭിക്കുക' },
    { id: 'V18', dim: 'WC', en: 'Do different things every day', ml: 'ഓരോ ദിവസവും വ്യത്യസ്ത കാര്യങ്ങൾ ചെയ്യാൻ കഴിയുക' }
  ]
};

EP.subjects = {
  id: 'subjects',
  kind: 'likert',
  scale: 'like5',
  minutes: 2,
  title: { en: 'School subjects', ml: 'സ്കൂൾ വിഷയങ്ങൾ' },
  intro: {
    en: 'Choose how much you enjoy studying each subject. Think about enjoyment, not your marks.',
    ml: 'ഓരോ വിഷയവും പഠിക്കുന്നത് നിങ്ങൾക്ക് എത്രത്തോളം ഇഷ്ടമാണെന്ന് തിരഞ്ഞെടുക്കുക. മാർക്കല്ല, ഇഷ്ടമാണ് പരിഗണിക്കേണ്ടത്.'
  },
  stem: { en: 'How much do you enjoy studying…', ml: 'ഈ വിഷയം പഠിക്കുന്നത് നിങ്ങൾക്ക് എത്രത്തോളം ഇഷ്ടമാണ്?' },
  dims: {},
  items: [
    { id: 'maths', dim: 'maths', en: 'Mathematics', ml: 'ഗണിതം' },
    { id: 'physics', dim: 'physics', en: 'Physics', ml: 'ഭൗതികശാസ്ത്രം' },
    { id: 'chemistry', dim: 'chemistry', en: 'Chemistry', ml: 'രസതന്ത്രം' },
    { id: 'biology', dim: 'biology', en: 'Biology', ml: 'ജീവശാസ്ത്രം' },
    { id: 'computer', dim: 'computer', en: 'Computer / IT', ml: 'കമ്പ്യൂട്ടർ / ഐടി' },
    { id: 'languages', dim: 'languages', en: 'Languages (English, Malayalam, Hindi)', ml: 'ഭാഷകൾ (ഇംഗ്ലീഷ്, മലയാളം, ഹിന്ദി)' },
    { id: 'social', dim: 'social', en: 'Social Science (History, Geography, Civics)', ml: 'സാമൂഹ്യശാസ്ത്രം (ചരിത്രം, ഭൂമിശാസ്ത്രം, പൗരധർമ്മം)' },
    { id: 'economics', dim: 'economics', en: 'Economics / Business topics', ml: 'സാമ്പത്തികശാസ്ത്രം / ബിസിനസ് വിഷയങ്ങൾ' },
    { id: 'art', dim: 'art', en: 'Art and Music', ml: 'ചിത്രകലയും സംഗീതവും' },
    { id: 'sports', dim: 'sports', en: 'Physical Education / Sports', ml: 'കായിക വിദ്യാഭ്യാസം / സ്പോർട്സ്' },
    { id: 'workexp', dim: 'workexp', en: 'Work Experience / practical skills', ml: 'പ്രവൃത്തിപരിചയം / പ്രായോഗിക കഴിവുകൾ' }
  ]
};
EP.subjects.items.forEach(function (it) {
  EP.subjects.dims[it.dim] = { en: it.en, ml: it.ml };
});
