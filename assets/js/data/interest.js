// Interest inventory based on Holland's RIASEC model (8 items per type).
// Item wording is original and adapted for Class 8-10 students in Kerala,
// following the structure of the public-domain O*NET Interest Profiler.
var EP = window.EP = window.EP || {};

EP.interest = {
  id: 'interest',
  kind: 'likert',
  scale: 'like5',
  minutes: 8,
  title: { en: 'Interests', ml: 'താൽപ്പര്യങ്ങൾ' },
  intro: {
    en: 'Read each activity and choose how much you would like doing it. Do not worry about whether you are good at it, or how much money it pays. There are no right or wrong answers.',
    ml: 'ഓരോ പ്രവർത്തനവും വായിച്ച് അത് ചെയ്യാൻ നിങ്ങൾക്ക് എത്രത്തോളം ഇഷ്ടമാണെന്ന് തിരഞ്ഞെടുക്കുക. അതിൽ നിങ്ങൾ മിടുക്കരാണോ, അതിന് എത്ര വരുമാനം കിട്ടും എന്നൊന്നും ആലോചിക്കേണ്ട. ശരിയോ തെറ്റോ ആയ ഉത്തരങ്ങളില്ല.'
  },
  stem: {
    en: 'How much would you like to…',
    ml: 'ഇത് ചെയ്യാൻ നിങ്ങൾക്ക് എത്രത്തോളം ഇഷ്ടമാണ്?'
  },
  dims: {
    R: {
      en: 'Realistic', ml: 'പ്രായോഗികം',
      nick: { en: 'Doer', ml: 'പ്രവർത്തകർ' },
      desc: {
        en: 'You enjoy hands-on, practical work: building, fixing, using tools and machines, working outdoors, with plants or animals.',
        ml: 'കൈകൊണ്ട് ചെയ്യുന്ന പ്രായോഗിക ജോലികൾ നിങ്ങൾക്ക് ഇഷ്ടമാണ്: നിർമ്മിക്കുക, നന്നാക്കുക, ഉപകരണങ്ങളും യന്ത്രങ്ങളും ഉപയോഗിക്കുക, പുറത്ത് ജോലി ചെയ്യുക, ചെടികളോടും മൃഗങ്ങളോടുമൊപ്പം പ്രവർത്തിക്കുക.'
      }
    },
    I: {
      en: 'Investigative', ml: 'അന്വേഷണാത്മകം',
      nick: { en: 'Thinker', ml: 'ചിന്തകർ' },
      desc: {
        en: 'You enjoy observing, questioning and solving problems: science, maths, research and figuring out how things work.',
        ml: 'നിരീക്ഷിക്കാനും ചോദ്യങ്ങൾ ചോദിക്കാനും പ്രശ്നങ്ങൾ പരിഹരിക്കാനും നിങ്ങൾക്ക് ഇഷ്ടമാണ്: ശാസ്ത്രം, ഗണിതം, ഗവേഷണം, കാര്യങ്ങൾ എങ്ങനെ പ്രവർത്തിക്കുന്നു എന്ന് കണ്ടെത്തൽ.'
      }
    },
    A: {
      en: 'Artistic', ml: 'കലാപരം',
      nick: { en: 'Creator', ml: 'സ്രഷ്ടാക്കൾ' },
      desc: {
        en: 'You enjoy expressing yourself and creating new things: art, music, writing, drama, design and media.',
        ml: 'സ്വയം ആവിഷ്കരിക്കാനും പുതിയവ സൃഷ്ടിക്കാനും നിങ്ങൾക്ക് ഇഷ്ടമാണ്: ചിത്രകല, സംഗീതം, എഴുത്ത്, നാടകം, ഡിസൈൻ, മാധ്യമം.'
      }
    },
    S: {
      en: 'Social', ml: 'സാമൂഹികം',
      nick: { en: 'Helper', ml: 'സഹായികൾ' },
      desc: {
        en: 'You enjoy working with people: teaching, helping, caring, guiding and serving the community.',
        ml: 'ആളുകളോടൊപ്പം പ്രവർത്തിക്കാൻ നിങ്ങൾക്ക് ഇഷ്ടമാണ്: പഠിപ്പിക്കുക, സഹായിക്കുക, പരിചരിക്കുക, വഴികാട്ടുക, സമൂഹത്തെ സേവിക്കുക.'
      }
    },
    E: {
      en: 'Enterprising', ml: 'സംരംഭകത്വം',
      nick: { en: 'Persuader', ml: 'നേതൃത്വം' },
      desc: {
        en: 'You enjoy leading, persuading and taking initiative: business, selling, organising and making decisions.',
        ml: 'നയിക്കാനും മറ്റുള്ളവരെ ബോധ്യപ്പെടുത്താനും മുൻകൈയെടുക്കാനും നിങ്ങൾക്ക് ഇഷ്ടമാണ്: ബിസിനസ്, വിൽപ്പന, സംഘാടനം, തീരുമാനമെടുക്കൽ.'
      }
    },
    C: {
      en: 'Conventional', ml: 'ചിട്ടയായത്',
      nick: { en: 'Organiser', ml: 'സംഘാടകർ' },
      desc: {
        en: 'You enjoy order and accuracy: working with data, numbers, records, rules and clear procedures.',
        ml: 'ചിട്ടയും കൃത്യതയും നിങ്ങൾക്ക് ഇഷ്ടമാണ്: ഡാറ്റ, സംഖ്യകൾ, രേഖകൾ, നിയമങ്ങൾ, വ്യക്തമായ നടപടിക്രമങ്ങൾ എന്നിവയുമായി പ്രവർത്തിക്കൽ.'
      }
    }
  },
  items: [
    { id: 'R1', dim: 'R', en: 'Repair a bicycle, fan or other household item', ml: 'ഒരു സൈക്കിൾ, ഫാൻ അല്ലെങ്കിൽ മറ്റു വീട്ടുപകരണം നന്നാക്കുക' },
    { id: 'I1', dim: 'I', en: 'Do experiments in a science lab', ml: 'ശാസ്ത്ര ലാബിൽ പരീക്ഷണങ്ങൾ നടത്തുക' },
    { id: 'A1', dim: 'A', en: 'Draw or paint pictures', ml: 'ചിത്രങ്ങൾ വരയ്ക്കുക അല്ലെങ്കിൽ പെയിന്റ് ചെയ്യുക' },
    { id: 'S1', dim: 'S', en: 'Teach or tutor younger children', ml: 'ചെറിയ കുട്ടികളെ പഠിപ്പിക്കുക' },
    { id: 'E1', dim: 'E', en: 'Be the leader of a class or club', ml: 'ക്ലാസിന്റെയോ ക്ലബ്ബിന്റെയോ നേതാവാകുക' },
    { id: 'C1', dim: 'C', en: 'Keep accounts of money neatly', ml: 'പണത്തിന്റെ കണക്കുകൾ കൃത്യമായി സൂക്ഷിക്കുക' },

    { id: 'R2', dim: 'R', en: 'Build models or things with your hands', ml: 'കൈകൊണ്ട് മോഡലുകളോ മറ്റു വസ്തുക്കളോ നിർമ്മിക്കുക' },
    { id: 'I2', dim: 'I', en: 'Solve difficult maths puzzles', ml: 'കഠിനമായ ഗണിത പസിലുകൾ പരിഹരിക്കുക' },
    { id: 'A2', dim: 'A', en: 'Write stories or poems', ml: 'കഥകളോ കവിതകളോ എഴുതുക' },
    { id: 'S2', dim: 'S', en: 'Help a friend who is having a problem', ml: 'പ്രശ്നത്തിലായ ഒരു സുഹൃത്തിനെ സഹായിക്കുക' },
    { id: 'E2', dim: 'E', en: 'Sell things at a school fair or a shop', ml: 'സ്കൂൾ മേളയിലോ കടയിലോ സാധനങ്ങൾ വിൽക്കുക' },
    { id: 'C2', dim: 'C', en: 'Arrange books or files in proper order', ml: 'പുസ്തകങ്ങളോ ഫയലുകളോ ശരിയായ ക്രമത്തിൽ അടുക്കിവെക്കുക' },

    { id: 'R3', dim: 'R', en: 'Grow plants or work in a farm or garden', ml: 'ചെടികൾ വളർത്തുക അല്ലെങ്കിൽ കൃഷിയിടത്തിലോ തോട്ടത്തിലോ പണിയെടുക്കുക' },
    { id: 'I3', dim: 'I', en: 'Learn how the human body works', ml: 'മനുഷ്യശരീരം എങ്ങനെ പ്രവർത്തിക്കുന്നുവെന്ന് പഠിക്കുക' },
    { id: 'A3', dim: 'A', en: 'Act in a drama or skit', ml: 'നാടകത്തിലോ സ്കിറ്റിലോ അഭിനയിക്കുക' },
    { id: 'S3', dim: 'S', en: 'Take care of sick or elderly people', ml: 'രോഗികളെയോ പ്രായമായവരെയോ പരിചരിക്കുക' },
    { id: 'E3', dim: 'E', en: 'Convince people to agree with your idea', ml: 'നിങ്ങളുടെ ആശയത്തോട് യോജിക്കാൻ ആളുകളെ ബോധ്യപ്പെടുത്തുക' },
    { id: 'C3', dim: 'C', en: 'Enter data in a computer spreadsheet', ml: 'കമ്പ്യൂട്ടർ സ്പ്രെഡ്ഷീറ്റിൽ വിവരങ്ങൾ രേഖപ്പെടുത്തുക' },

    { id: 'R4', dim: 'R', en: 'Use tools like a hammer, screwdriver or drill', ml: 'ചുറ്റിക, സ്ക്രൂഡ്രൈവർ, ഡ്രിൽ പോലുള്ള ഉപകരണങ്ങൾ ഉപയോഗിക്കുക' },
    { id: 'I4', dim: 'I', en: 'Study stars, planets and space', ml: 'നക്ഷത്രങ്ങൾ, ഗ്രഹങ്ങൾ, ബഹിരാകാശം എന്നിവയെക്കുറിച്ച് പഠിക്കുക' },
    { id: 'A4', dim: 'A', en: 'Sing or play a musical instrument', ml: 'പാടുക അല്ലെങ്കിൽ ഒരു സംഗീതോപകരണം വായിക്കുക' },
    { id: 'S4', dim: 'S', en: 'Volunteer for community service', ml: 'സാമൂഹിക സേവന പ്രവർത്തനങ്ങളിൽ സന്നദ്ധ സേവനം ചെയ്യുക' },
    { id: 'CHK1', check: 4, en: 'For this question, please choose "Like"', ml: 'ഈ ചോദ്യത്തിന് "ഇഷ്ടമാണ്" എന്ന് തിരഞ്ഞെടുക്കുക' },
    { id: 'E4', dim: 'E', en: 'Start and run your own business', ml: 'സ്വന്തമായി ഒരു ബിസിനസ് തുടങ്ങി നടത്തുക' },
    { id: 'C4', dim: 'C', en: 'Follow clear rules and step-by-step procedures', ml: 'വ്യക്തമായ നിയമങ്ങളും ഘട്ടം ഘട്ടമായുള്ള നടപടിക്രമങ്ങളും പാലിക്കുക' },

    { id: 'R5', dim: 'R', en: 'Connect wires and assemble an electronic kit', ml: 'വയറുകൾ ബന്ധിപ്പിച്ച് ഒരു ഇലക്ട്രോണിക് കിറ്റ് കൂട്ടിയോജിപ്പിക്കുക' },
    { id: 'I5', dim: 'I', en: 'Find out why something happened, like a detective', ml: 'ഒരു ഡിറ്റക്ടീവിനെപ്പോലെ ഒരു കാര്യം എന്തുകൊണ്ട് സംഭവിച്ചുവെന്ന് കണ്ടെത്തുക' },
    { id: 'A5', dim: 'A', en: 'Design posters, clothes or the look of a room', ml: 'പോസ്റ്ററുകൾ, വസ്ത്രങ്ങൾ അല്ലെങ്കിൽ ഒരു മുറിയുടെ രൂപം ഡിസൈൻ ചെയ്യുക' },
    { id: 'S5', dim: 'S', en: 'Explain a lesson to classmates who did not understand it', ml: 'മനസ്സിലാകാത്ത സഹപാഠികൾക്ക് ഒരു പാഠം വിശദീകരിച്ചു കൊടുക്കുക' },
    { id: 'E5', dim: 'E', en: 'Organise an event like a school fest', ml: 'സ്കൂൾ ഫെസ്റ്റ് പോലുള്ള ഒരു പരിപാടി സംഘടിപ്പിക്കുക' },
    { id: 'C5', dim: 'C', en: 'Check written work carefully for mistakes', ml: 'എഴുതിയവയിൽ തെറ്റുകളുണ്ടോ എന്ന് ശ്രദ്ധാപൂർവ്വം പരിശോധിക്കുക' },

    { id: 'R6', dim: 'R', en: 'Operate machines or drive vehicles', ml: 'യന്ത്രങ്ങൾ പ്രവർത്തിപ്പിക്കുക അല്ലെങ്കിൽ വാഹനങ്ങൾ ഓടിക്കുക' },
    { id: 'I6', dim: 'I', en: 'Write computer programs to solve problems', ml: 'പ്രശ്നങ്ങൾ പരിഹരിക്കാൻ കമ്പ്യൂട്ടർ പ്രോഗ്രാമുകൾ എഴുതുക' },
    { id: 'A6', dim: 'A', en: 'Take photos or make short videos', ml: 'ഫോട്ടോകൾ എടുക്കുക അല്ലെങ്കിൽ ചെറിയ വീഡിയോകൾ നിർമ്മിക്കുക' },
    { id: 'S6', dim: 'S', en: 'Listen to people and give them advice', ml: 'ആളുകൾ പറയുന്നത് കേട്ട് അവർക്ക് ഉപദേശം നൽകുക' },
    { id: 'E6', dim: 'E', en: 'Make decisions for a group', ml: 'ഒരു സംഘത്തിനു വേണ്ടി തീരുമാനങ്ങൾ എടുക്കുക' },
    { id: 'C6', dim: 'C', en: 'Prepare a timetable or schedule', ml: 'ഒരു ടൈംടേബിളോ സമയക്രമമോ തയ്യാറാക്കുക' },

    { id: 'R7', dim: 'R', en: 'Take care of animals', ml: 'മൃഗങ്ങളെ പരിപാലിക്കുക' },
    { id: 'I7', dim: 'I', en: 'Read about new scientific discoveries', ml: 'പുതിയ ശാസ്ത്രീയ കണ്ടുപിടിത്തങ്ങളെക്കുറിച്ച് വായിക്കുക' },
    { id: 'A7', dim: 'A', en: 'Dance or plan the steps of a dance performance', ml: 'നൃത്തം ചെയ്യുക അല്ലെങ്കിൽ ഒരു നൃത്തപരിപാടി ചിട്ടപ്പെടുത്തുക' },
    { id: 'S7', dim: 'S', en: 'Help people affected by floods or other disasters', ml: 'പ്രളയം പോലുള്ള ദുരന്തങ്ങൾ ബാധിച്ചവരെ സഹായിക്കുക' },
    { id: 'E7', dim: 'E', en: 'Give a speech in front of many people', ml: 'ധാരാളം ആളുകളുടെ മുന്നിൽ പ്രസംഗിക്കുക' },
    { id: 'C7', dim: 'C', en: 'Keep track of items in a store room', ml: 'സ്റ്റോർ റൂമിലെ സാധനങ്ങളുടെ കണക്ക് സൂക്ഷിക്കുക' },

    { id: 'R8', dim: 'R', en: 'Work outdoors doing physical work', ml: 'പുറത്ത് ശാരീരികാധ്വാനമുള്ള ജോലി ചെയ്യുക' },
    { id: 'I8', dim: 'I', en: 'Study the causes of diseases and how medicines work', ml: 'രോഗങ്ങളുടെ കാരണങ്ങളും മരുന്നുകൾ എങ്ങനെ പ്രവർത്തിക്കുന്നുവെന്നും പഠിക്കുക' },
    { id: 'A8', dim: 'A', en: 'Create digital art or animation', ml: 'ഡിജിറ്റൽ ആർട്ടോ ആനിമേഷനോ സൃഷ്ടിക്കുക' },
    { id: 'S8', dim: 'S', en: 'Work in a team to help others', ml: 'മറ്റുള്ളവരെ സഹായിക്കാൻ ഒരു ടീമിനൊപ്പം പ്രവർത്തിക്കുക' },
    { id: 'E8', dim: 'E', en: 'Bargain or negotiate to get a good deal', ml: 'നല്ല വില കിട്ടാൻ വിലപേശുക' },
    { id: 'C8', dim: 'C', en: 'Fill in forms and maintain records', ml: 'ഫോമുകൾ പൂരിപ്പിക്കുകയും രേഖകൾ സൂക്ഷിക്കുകയും ചെയ്യുക' }
  ]
};
