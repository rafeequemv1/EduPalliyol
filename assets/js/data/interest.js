// O*NET Interest Profiler Short Form (60 items, 10 per RIASEC area).
// Source: National Center for O*NET Development, U.S. Department of Labor.
// Rounds, J., Su, R., Lewis, P., & Rivkin, D. (2010). O*NET Interest Profiler
// Short Form psychometric characteristics: Summary. Raleigh, NC: NCOND.
// Used under the O*NET Career Exploration Tools license; English item text is
// the official wording, in the official item order. Malayalam is a translation
// pending expert review (see docs/METHODOLOGY.md).
var EP = window.EP = window.EP || {};

EP.interest = {
  id: 'interest',
  kind: 'likert',
  scale: 'onetLike5',
  minutes: 10,
  source: 'O*NET Interest Profiler Short Form (U.S. Department of Labor)',
  title: { en: 'Interests', ml: 'താൽപ്പര്യങ്ങൾ' },
  intro: {
    en: 'Read each work activity and decide how you would feel about doing it. Do not think about whether you have enough education or training to do it, or how much money you would earn. Just think about whether you would like or dislike doing the activity.',
    ml: 'ഓരോ ജോലിയും വായിച്ച്, ആ ജോലി ചെയ്യുന്നത് നിങ്ങൾക്ക് എങ്ങനെ തോന്നും എന്ന് തീരുമാനിക്കുക. അതു ചെയ്യാനുള്ള പഠിപ്പോ പരിശീലനമോ നിങ്ങൾക്കുണ്ടോ എന്ന് ആലോചിക്കേണ്ടതില്ല. അതിൽ നിന്ന് എത്ര പണം കിട്ടും എന്നും ആലോചിക്കേണ്ടതില്ല. ആ ജോലി ചെയ്യാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ അല്ലയോ എന്നു മാത്രം ചിന്തിക്കുക.'
  },
  stem: {
    en: 'How would you feel about doing this activity?',
    // Malayalam items are already full questions, so no stem is shown.
    ml: ''
  },
  dims: {
    R: {
      en: 'Realistic', ml: 'പ്രായോഗികം',
      nick: { en: 'Doers', ml: 'പ്രവർത്തകർ' },
      desc: {
        en: 'You like practical, hands-on work: building, fixing, using tools and machines, and working outdoors with plants or animals.',
        ml: 'കൈകൊണ്ട് ചെയ്യുന്ന പ്രായോഗിക ജോലികൾ നിങ്ങൾക്ക് ഇഷ്ടമാണ്. സാധനങ്ങൾ നിർമ്മിക്കുന്നതും നന്നാക്കുന്നതും ഉപകരണങ്ങളും യന്ത്രങ്ങളും ഉപയോഗിക്കുന്നതും നിങ്ങൾ ആസ്വദിക്കുന്നു. ചെടികളോടും മൃഗങ്ങളോടുമൊപ്പം പുറത്ത് ജോലി ചെയ്യുന്നതും നിങ്ങൾക്ക് ഇഷ്ടമാണ്.'
      }
    },
    I: {
      en: 'Investigative', ml: 'അന്വേഷണാത്മകം',
      nick: { en: 'Thinkers', ml: 'ചിന്തകർ' },
      desc: {
        en: 'You like observing, learning, investigating and solving problems, especially in science and maths.',
        ml: 'കാര്യങ്ങൾ നിരീക്ഷിക്കാനും പഠിക്കാനും അന്വേഷിക്കാനും പ്രശ്നങ്ങൾ പരിഹരിക്കാനും നിങ്ങൾക്ക് ഇഷ്ടമാണ്. ശാസ്ത്രവും ഗണിതവും നിങ്ങളെ പ്രത്യേകം ആകർഷിക്കുന്നു.'
      }
    },
    A: {
      en: 'Artistic', ml: 'കലാപരം',
      nick: { en: 'Creators', ml: 'സ്രഷ്ടാക്കൾ' },
      desc: {
        en: 'You like creative work and expressing yourself through art, music, writing, drama, design or film.',
        ml: 'സർഗ്ഗാത്മകമായ ജോലികൾ നിങ്ങൾക്ക് ഇഷ്ടമാണ്. ചിത്രകല, സംഗീതം, എഴുത്ത്, നാടകം, ഡിസൈൻ, സിനിമ എന്നിവയിലൂടെ സ്വയം ആവിഷ്കരിക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നു.'
      }
    },
    S: {
      en: 'Social', ml: 'സാമൂഹികം',
      nick: { en: 'Helpers', ml: 'സഹായികൾ' },
      desc: {
        en: 'You like working with people: teaching, helping, caring for others and giving guidance.',
        ml: 'ആളുകളോടൊപ്പം പ്രവർത്തിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണ്. മറ്റുള്ളവരെ പഠിപ്പിക്കുന്നതും സഹായിക്കുന്നതും പരിചരിക്കുന്നതും വഴികാട്ടുന്നതും നിങ്ങൾ ആസ്വദിക്കുന്നു.'
      }
    },
    E: {
      en: 'Enterprising', ml: 'സംരംഭകത്വം',
      nick: { en: 'Persuaders', ml: 'നേതാക്കൾ' },
      desc: {
        en: 'You like leading, persuading and taking charge: starting projects, selling, managing and making decisions.',
        ml: 'മറ്റുള്ളവരെ നയിക്കാനും ബോധ്യപ്പെടുത്താനും ചുമതല ഏറ്റെടുക്കാനും നിങ്ങൾക്ക് ഇഷ്ടമാണ്. പുതിയ സംരംഭങ്ങൾ തുടങ്ങുന്നതും വിൽക്കുന്നതും കൈകാര്യം ചെയ്യുന്നതും തീരുമാനങ്ങൾ എടുക്കുന്നതും നിങ്ങൾ ആസ്വദിക്കുന്നു.'
      }
    },
    C: {
      en: 'Conventional', ml: 'ചിട്ടയായത്',
      nick: { en: 'Organisers', ml: 'സംഘാടകർ' },
      desc: {
        en: 'You like orderly, accurate work: following procedures and working with data, records and numbers.',
        ml: 'ചിട്ടയോടെയും കൃത്യതയോടെയും ചെയ്യുന്ന ജോലികൾ നിങ്ങൾക്ക് ഇഷ്ടമാണ്. നിശ്ചിത നടപടിക്രമങ്ങൾ പാലിക്കുന്നതും വിവരങ്ങൾ, രേഖകൾ, സംഖ്യകൾ എന്നിവ കൈകാര്യം ചെയ്യുന്നതും നിങ്ങൾ ആസ്വദിക്കുന്നു.'
      }
    }
  },
  items: [
    { id: 'IP1', dim: 'R', en: 'Build kitchen cabinets', ml: 'അടുക്കളയിലെ അലമാരകൾ പണിയാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP2', dim: 'R', en: 'Lay brick or tile', ml: 'ഇഷ്ടിക കെട്ടാനോ തറയിൽ ടൈൽ പാകാനോ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP3', dim: 'I', en: 'Develop a new medicine', ml: 'പുതിയ ഒരു മരുന്ന് കണ്ടുപിടിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP4', dim: 'I', en: 'Study ways to reduce water pollution', ml: 'ജലമലിനീകരണം കുറയ്ക്കാനുള്ള വഴികളെക്കുറിച്ച് പഠിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP5', dim: 'A', en: 'Write books or plays', ml: 'പുസ്തകങ്ങളോ നാടകങ്ങളോ എഴുതാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP6', dim: 'A', en: 'Play a musical instrument', ml: 'ഒരു സംഗീതോപകരണം വായിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP7', dim: 'S', en: 'Teach an individual an exercise routine', ml: 'ഒരാളെ വ്യായാമമുറകൾ പഠിപ്പിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP8', dim: 'S', en: 'Help people with personal or emotional problems', ml: 'വ്യക്തിപരമോ മാനസികമോ ആയ പ്രശ്നങ്ങളുള്ള ആളുകളെ സഹായിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP9', dim: 'E', en: 'Buy and sell stocks and bonds', ml: 'ഓഹരികളും ബോണ്ടുകളും വാങ്ങുകയും വിൽക്കുകയും ചെയ്യാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP10', dim: 'E', en: 'Manage a retail store', ml: 'ഒരു ചില്ലറ വിൽപ്പനക്കട നടത്തിക്കൊണ്ടുപോകാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP11', dim: 'C', en: 'Develop a spreadsheet using computer software', ml: 'കമ്പ്യൂട്ടർ സോഫ്റ്റ്‌വെയർ ഉപയോഗിച്ച് ഒരു സ്പ്രെഡ്ഷീറ്റ് (കണക്കുപട്ടിക) തയ്യാറാക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP12', dim: 'C', en: 'Proofread records or forms', ml: 'രേഖകളിലോ ഫോമുകളിലോ തെറ്റുകളുണ്ടോ എന്ന് വായിച്ചു പരിശോധിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP13', dim: 'R', en: 'Repair household appliances', ml: 'മിക്സി, ഫാൻ പോലുള്ള വീട്ടുപകരണങ്ങൾ നന്നാക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP14', dim: 'R', en: 'Raise fish in a fish hatchery', ml: 'ഒരു മത്സ്യവിത്തുൽപ്പാദന കേന്ദ്രത്തിൽ മീൻ വളർത്താൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP15', dim: 'I', en: 'Conduct chemical experiments', ml: 'രസതന്ത്ര പരീക്ഷണങ്ങൾ നടത്താൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP16', dim: 'I', en: 'Study the movement of planets', ml: 'ഗ്രഹങ്ങളുടെ ചലനത്തെക്കുറിച്ച് പഠിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP17', dim: 'A', en: 'Compose or arrange music', ml: 'പാട്ടുകൾക്ക് ഈണം നൽകാനോ സംഗീതം ചിട്ടപ്പെടുത്താനോ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP18', dim: 'A', en: 'Draw pictures', ml: 'ചിത്രങ്ങൾ വരയ്ക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP19', dim: 'S', en: 'Give career guidance to people', ml: 'ആളുകൾക്ക് തൊഴിൽ തിരഞ്ഞെടുക്കാനുള്ള മാർഗ്ഗനിർദ്ദേശം നൽകാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP20', dim: 'S', en: 'Perform rehabilitation therapy', ml: 'രോഗമോ പരിക്കോ ഭേദമായി വരുന്നവരെ പഴയ നിലയിലേക്ക് തിരിച്ചെത്താൻ സഹായിക്കുന്ന ചികിത്സ (റീഹാബിലിറ്റേഷൻ തെറാപ്പി) നൽകാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP21', dim: 'E', en: 'Operate a beauty salon or barber shop', ml: 'ഒരു ബ്യൂട്ടി പാർലറോ ബാർബർ ഷോപ്പോ നടത്താൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP22', dim: 'E', en: 'Manage a department within a large company', ml: 'ഒരു വലിയ കമ്പനിയിലെ ഒരു വിഭാഗത്തിന്റെ ചുമതല വഹിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP23', dim: 'C', en: 'Install software across computers on a large network', ml: 'ഒരു വലിയ നെറ്റ്‌വർക്കിലുള്ള കമ്പ്യൂട്ടറുകളിൽ സോഫ്റ്റ്‌വെയർ ഇൻസ്റ്റാൾ ചെയ്യാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP24', dim: 'C', en: 'Operate a calculator', ml: 'കാൽക്കുലേറ്റർ ഉപയോഗിച്ച് കണക്കുകൂട്ടാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP25', dim: 'R', en: 'Assemble electronic parts', ml: 'ഇലക്ട്രോണിക് ഭാഗങ്ങൾ കൂട്ടിയോജിപ്പിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP26', dim: 'R', en: 'Drive a truck to deliver packages to offices and homes', ml: 'ഓഫീസുകളിലും വീടുകളിലും പാഴ്സലുകൾ എത്തിക്കാൻ ട്രക്ക് ഓടിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP27', dim: 'I', en: 'Examine blood samples using a microscope', ml: 'മൈക്രോസ്കോപ്പ് ഉപയോഗിച്ച് രക്തസാമ്പിളുകൾ പരിശോധിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP28', dim: 'I', en: 'Investigate the cause of a fire', ml: 'ഒരു തീപിടിത്തം ഉണ്ടായതിന്റെ കാരണം അന്വേഷിച്ചു കണ്ടെത്താൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP29', dim: 'A', en: 'Create special effects for movies', ml: 'സിനിമകൾക്കു വേണ്ടി സ്പെഷ്യൽ ഇഫക്റ്റുകൾ തയ്യാറാക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP30', dim: 'A', en: 'Paint sets for plays', ml: 'നാടകങ്ങളുടെ രംഗപശ്ചാത്തലം (സെറ്റ്) വരച്ചൊരുക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP31', dim: 'S', en: 'Do volunteer work at a non-profit organization', ml: 'ലാഭം നോക്കാതെ പ്രവർത്തിക്കുന്ന ഒരു സന്നദ്ധ സംഘടനയിൽ സേവനം ചെയ്യാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP32', dim: 'S', en: 'Teach children how to play sports', ml: 'കുട്ടികളെ കളികൾ പഠിപ്പിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP33', dim: 'E', en: 'Start your own business', ml: 'സ്വന്തമായി ഒരു ബിസിനസ് തുടങ്ങാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP34', dim: 'E', en: 'Negotiate business contracts', ml: 'ബിസിനസ് കരാറുകൾക്കു വേണ്ടി ചർച്ച നടത്തി ധാരണയിലെത്താൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP35', dim: 'C', en: 'Keep shipping and receiving records', ml: 'അയയ്ക്കുന്നതും വന്നുചേരുന്നതുമായ സാധനങ്ങളുടെ രേഖകൾ സൂക്ഷിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP36', dim: 'C', en: 'Calculate the wages of employees', ml: 'ജീവനക്കാരുടെ ശമ്പളം കണക്കാക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP37', dim: 'R', en: 'Test the quality of parts before shipment', ml: 'സാധനങ്ങൾ അയയ്ക്കുന്നതിനു മുമ്പ് അവയുടെ ഭാഗങ്ങളുടെ ഗുണനിലവാരം പരിശോധിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP38', dim: 'R', en: 'Repair and install locks', ml: 'പൂട്ടുകൾ നന്നാക്കാനും പുതിയവ ഘടിപ്പിക്കാനും നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP39', dim: 'I', en: 'Develop a way to better predict the weather', ml: 'കാലാവസ്ഥ കൂടുതൽ കൃത്യമായി പ്രവചിക്കാനുള്ള ഒരു വഴി കണ്ടെത്താൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP40', dim: 'I', en: 'Work in a biology lab', ml: 'ഒരു ജീവശാസ്ത്ര ലാബിൽ ജോലി ചെയ്യാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP41', dim: 'A', en: 'Write scripts for movies or television shows', ml: 'സിനിമകൾക്കോ ടിവി പരിപാടികൾക്കോ തിരക്കഥ എഴുതാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP42', dim: 'A', en: 'Perform jazz or tap dance', ml: 'ജാസ്, ടാപ്പ് പോലുള്ള നൃത്തരൂപങ്ങൾ വേദിയിൽ അവതരിപ്പിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP43', dim: 'S', en: 'Teach sign language to people who are deaf or hard of hearing', ml: 'കേൾവിശക്തി ഇല്ലാത്തവരെയും കേൾവിക്കുറവുള്ളവരെയും ആംഗ്യഭാഷ പഠിപ്പിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP44', dim: 'S', en: 'Help conduct a group therapy session', ml: 'ഒരു കൂട്ടം ആളുകൾക്ക് ഒരുമിച്ച് നൽകുന്ന കൗൺസിലിംഗ് (ഗ്രൂപ്പ് തെറാപ്പി) നടത്താൻ സഹായിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP45', dim: 'E', en: 'Represent a client in a lawsuit', ml: 'ഒരു കോടതി കേസിൽ ഒരാൾക്കു വേണ്ടി വാദിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP46', dim: 'E', en: 'Market a new line of clothing', ml: 'പുതിയ ഒരു വസ്ത്രശേഖരം ആളുകളിലേക്ക് എത്തിക്കാൻ പ്രചാരണം നടത്താൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP47', dim: 'C', en: 'Inventory supplies using a hand-held computer', ml: 'കയ്യിൽ പിടിക്കാവുന്ന ഒരു കമ്പ്യൂട്ടർ ഉപയോഗിച്ച് സ്റ്റോക്കിലുള്ള സാധനങ്ങളുടെ കണക്കെടുക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP48', dim: 'C', en: 'Record rent payments', ml: 'വാടക അടച്ചതിന്റെ കണക്കുകൾ രേഖപ്പെടുത്താൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP49', dim: 'R', en: 'Set up and operate machines to make products', ml: 'ഉൽപ്പന്നങ്ങൾ നിർമ്മിക്കുന്ന യന്ത്രങ്ങൾ സജ്ജമാക്കി പ്രവർത്തിപ്പിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP50', dim: 'R', en: 'Put out forest fires', ml: 'കാട്ടുതീ അണയ്ക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP51', dim: 'I', en: 'Invent a replacement for sugar', ml: 'പഞ്ചസാരയ്ക്കു പകരം ഉപയോഗിക്കാവുന്ന ഒരു വസ്തു കണ്ടുപിടിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP52', dim: 'I', en: 'Do laboratory tests to identify diseases', ml: 'രോഗങ്ങൾ കണ്ടെത്താനുള്ള ലാബ് പരിശോധനകൾ നടത്താൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP53', dim: 'A', en: 'Sing in a band', ml: 'ഒരു സംഗീത ബാൻഡിൽ പാടാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP54', dim: 'A', en: 'Edit movies', ml: 'സിനിമകൾ എഡിറ്റ് ചെയ്യാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP55', dim: 'S', en: 'Take care of children at a day-care center', ml: 'ഒരു ഡേ-കെയർ കേന്ദ്രത്തിൽ കുട്ടികളെ പരിചരിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP56', dim: 'S', en: 'Teach a high-school class', ml: 'ഒരു ഹൈസ്കൂൾ ക്ലാസിൽ പഠിപ്പിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP57', dim: 'E', en: 'Sell merchandise at a department store', ml: 'ഒരു വലിയ കടയിൽ (ഡിപ്പാർട്ട്മെന്റ് സ്റ്റോറിൽ) സാധനങ്ങൾ വിൽക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP58', dim: 'E', en: 'Manage a clothing store', ml: 'ഒരു തുണിക്കട നടത്തിക്കൊണ്ടുപോകാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP59', dim: 'C', en: 'Keep inventory records', ml: 'സ്റ്റോക്കിലുള്ള സാധനങ്ങളുടെ രേഖകൾ സൂക്ഷിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' },
    { id: 'IP60', dim: 'C', en: 'Stamp, sort, and distribute mail for an organization', ml: 'ഒരു സ്ഥാപനത്തിലെ തപാലുകൾ സീൽ ചെയ്ത് തരംതിരിച്ച് വിതരണം ചെയ്യാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണോ?' }
  ]
};
