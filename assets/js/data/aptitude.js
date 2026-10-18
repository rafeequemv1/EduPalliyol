// Aptitude test: four timed sections of 10 original multiple-choice items.
// Verbal items test meaning and reasoning with words (not English vocabulary),
// so they work in both English and Malayalam. `answer` is the 0-based index
// of the correct option.
var EP = window.EP = window.EP || {};

EP.aptitude = {
  id: 'aptitude',
  kind: 'mcq',
  minutes: 26,
  title: { en: 'Aptitude', ml: 'അഭിരുചി' },
  intro: {
    en: 'This test has 4 short timed sections. Each question has one correct answer. Work quickly but carefully. If you are not sure, make your best guess. You cannot use a calculator.',
    ml: 'ഈ ടെസ്റ്റിൽ സമയപരിധിയുള്ള 4 ചെറിയ ഭാഗങ്ങളുണ്ട്. ഓരോ ചോദ്യത്തിനും ഒരു ശരിയുത്തരം മാത്രം. വേഗത്തിലും ശ്രദ്ധയോടെയും ചെയ്യുക. ഉറപ്പില്ലെങ്കിൽ ഏറ്റവും ശരിയെന്നു തോന്നുന്നത് തിരഞ്ഞെടുക്കുക. കാൽക്കുലേറ്റർ ഉപയോഗിക്കരുത്.'
  },
  dims: {
    verbal: { en: 'Verbal reasoning', ml: 'ഭാഷാപരമായ യുക്തി',
      desc: { en: 'Understanding words, ideas and relationships between them', ml: 'വാക്കുകളും ആശയങ്ങളും അവ തമ്മിലുള്ള ബന്ധവും മനസ്സിലാക്കൽ' } },
    numerical: { en: 'Numerical ability', ml: 'സംഖ്യാപരമായ കഴിവ്',
      desc: { en: 'Working with numbers, calculations and number patterns', ml: 'സംഖ്യകൾ, കണക്കുകൂട്ടലുകൾ, സംഖ്യാ ശ്രേണികൾ' } },
    logical: { en: 'Logical reasoning', ml: 'യുക്തിചിന്ത',
      desc: { en: 'Finding patterns, rules and drawing conclusions', ml: 'പാറ്റേണുകളും നിയമങ്ങളും കണ്ടെത്തി നിഗമനത്തിലെത്തൽ' } },
    mechanical: { en: 'Mechanical reasoning', ml: 'യാന്ത്രിക യുക്തി',
      desc: { en: 'Understanding how machines, forces and everyday physics work', ml: 'യന്ത്രങ്ങൾ, ബലങ്ങൾ, ദൈനംദിന ഭൗതികശാസ്ത്രം എന്നിവ എങ്ങനെ പ്രവർത്തിക്കുന്നുവെന്ന് മനസ്സിലാക്കൽ' } }
  },
  sections: [
    {
      id: 'verbal',
      timeLimitSec: 360,
      example: {
        en: 'Example: Hand : Glove :: Foot : ?  Answer: Sock (a glove covers a hand, a sock covers a foot).',
        ml: 'ഉദാഹരണം: കൈ : കയ്യുറ :: കാൽ : ?  ഉത്തരം: സോക്സ് (കയ്യുറ കൈ മൂടുന്നു, സോക്സ് കാൽ മൂടുന്നു).'
      },
      items: [
        { id: 'VB1', answer: 1,
          q: { en: 'Doctor : Hospital :: Teacher : ?', ml: 'ഡോക്ടർ : ആശുപത്രി :: അധ്യാപകർ : ?' },
          options: [{ en: 'Book', ml: 'പുസ്തകം' }, { en: 'School', ml: 'സ്കൂൾ' }, { en: 'Student', ml: 'വിദ്യാർത്ഥി' }, { en: 'Chalk', ml: 'ചോക്ക്' }] },
        { id: 'VB2', answer: 2,
          q: { en: 'Which word does NOT belong with the others?', ml: 'കൂട്ടത്തിൽ ചേരാത്ത വാക്ക് ഏത്?' },
          options: [{ en: 'Mango', ml: 'മാമ്പഴം' }, { en: 'Banana', ml: 'വാഴപ്പഴം' }, { en: 'Carrot', ml: 'കാരറ്റ്' }, { en: 'Grapes', ml: 'മുന്തിരി' }] },
        { id: 'VB3', answer: 0,
          q: { en: 'Seed : Tree :: Egg : ?', ml: 'വിത്ത് : മരം :: മുട്ട : ?' },
          options: [{ en: 'Chick', ml: 'കോഴിക്കുഞ്ഞ്' }, { en: 'Nest', ml: 'കൂട്' }, { en: 'Shell', ml: 'തോട്' }, { en: 'Hen', ml: 'പിടക്കോഴി' }] },
        { id: 'VB4', answer: 3,
          q: { en: 'Which word means the same as "ancient"?', ml: '"പുരാതനം" എന്ന വാക്കിന്റെ അർത്ഥം ഏത്?' },
          options: [{ en: 'Very large', ml: 'വളരെ വലുത്' }, { en: 'Very fast', ml: 'വളരെ വേഗമുള്ളത്' }, { en: 'Very new', ml: 'വളരെ പുതിയത്' }, { en: 'Very old', ml: 'വളരെ പഴയത്' }] },
        { id: 'VB5', answer: 1,
          q: { en: 'Which pair has the same relationship as Fish : Water?', ml: 'മത്സ്യം : വെള്ളം എന്നതിലെ അതേ ബന്ധമുള്ള ജോഡി ഏത്?' },
          options: [{ en: 'Cow : Milk', ml: 'പശു : പാൽ' }, { en: 'Bird : Air', ml: 'പക്ഷി : വായു' }, { en: 'Tree : Leaf', ml: 'മരം : ഇല' }, { en: 'Book : Page', ml: 'പുസ്തകം : താൾ' }] },
        { id: 'VB6', answer: 2,
          q: { en: 'Which word does NOT belong with the others?', ml: 'കൂട്ടത്തിൽ ചേരാത്ത വാക്ക് ഏത്?' },
          options: [{ en: 'Happy', ml: 'സന്തോഷം' }, { en: 'Joyful', ml: 'ആഹ്ലാദം' }, { en: 'Angry', ml: 'ദേഷ്യം' }, { en: 'Cheerful', ml: 'ഉല്ലാസം' }] },
        { id: 'VB7', answer: 0,
          q: { en: 'Author : Book :: Composer : ?', ml: 'എഴുത്തുകാരൻ : പുസ്തകം :: സംഗീതസംവിധായകൻ : ?' },
          options: [{ en: 'Music', ml: 'സംഗീതം' }, { en: 'Piano', ml: 'പിയാനോ' }, { en: 'Singer', ml: 'ഗായകൻ' }, { en: 'Stage', ml: 'വേദി' }] },
        { id: 'VB8', answer: 3,
          q: { en: 'Which word does NOT belong with the others?', ml: 'കൂട്ടത്തിൽ ചേരാത്ത വാക്ക് ഏത്?' },
          options: [{ en: 'Delhi', ml: 'ഡൽഹി' }, { en: 'Mumbai', ml: 'മുംബൈ' }, { en: 'Chennai', ml: 'ചെന്നൈ' }, { en: 'Kerala', ml: 'കേരളം' }] },
        { id: 'VB9', answer: 1,
          q: { en: '"All students who passed the exam got a certificate. Anu did not get a certificate." Which statement must be true?', ml: '"പരീക്ഷ ജയിച്ച എല്ലാ വിദ്യാർത്ഥികൾക്കും സർട്ടിഫിക്കറ്റ് ലഭിച്ചു. അനുവിന് സർട്ടിഫിക്കറ്റ് ലഭിച്ചില്ല." താഴെ പറയുന്നവയിൽ തീർച്ചയായും ശരിയായത് ഏത്?' },
          options: [{ en: 'Anu passed the exam', ml: 'അനു പരീക്ഷ ജയിച്ചു' }, { en: 'Anu did not pass the exam', ml: 'അനു പരീക്ഷ ജയിച്ചില്ല' }, { en: 'Anu was absent', ml: 'അനു ഹാജരായില്ല' }, { en: 'Nothing can be said', ml: 'ഒന്നും പറയാൻ കഴിയില്ല' }] },
        { id: 'VB10', answer: 2,
          q: { en: '"Some artists are teachers. All teachers are readers." Which statement must be true?', ml: '"ചില കലാകാരന്മാർ അധ്യാപകരാണ്. എല്ലാ അധ്യാപകരും വായനക്കാരാണ്." താഴെ പറയുന്നവയിൽ തീർച്ചയായും ശരിയായത് ഏത്?' },
          options: [{ en: 'All artists are readers', ml: 'എല്ലാ കലാകാരന്മാരും വായനക്കാരാണ്' }, { en: 'All readers are teachers', ml: 'എല്ലാ വായനക്കാരും അധ്യാപകരാണ്' }, { en: 'Some artists are readers', ml: 'ചില കലാകാരന്മാർ വായനക്കാരാണ്' }, { en: 'No artist is a reader', ml: 'ഒരു കലാകാരനും വായനക്കാരനല്ല' }] }
      ]
    },
    {
      id: 'numerical',
      timeLimitSec: 420,
      example: {
        en: 'Example: 4, 8, 12, 16, ?  Answer: 20 (add 4 each time).',
        ml: 'ഉദാഹരണം: 4, 8, 12, 16, ?  ഉത്തരം: 20 (ഓരോ തവണയും 4 കൂട്ടുന്നു).'
      },
      items: [
        { id: 'NM1', answer: 1,
          q: { en: '12 + 15 × 2 = ?', ml: '12 + 15 × 2 = ?' },
          options: [{ en: '54' }, { en: '42' }, { en: '39' }, { en: '30' }] },
        { id: 'NM2', answer: 0,
          q: { en: 'A pen costs ₹15. How much do 7 pens cost?', ml: 'ഒരു പേനയ്ക്ക് ₹15 ആണ് വില. 7 പേനകൾക്ക് എത്ര രൂപയാകും?' },
          options: [{ en: '₹105' }, { en: '₹95' }, { en: '₹115' }, { en: '₹135' }] },
        { id: 'NM3', answer: 2,
          q: { en: 'What comes next? 3, 9, 27, 81, ?', ml: 'അടുത്ത സംഖ്യ ഏത്? 3, 9, 27, 81, ?' },
          options: [{ en: '162' }, { en: '108' }, { en: '243' }, { en: '324' }] },
        { id: 'NM4', answer: 3,
          q: { en: 'The average of 10, 20, 30 and 40 is:', ml: '10, 20, 30, 40 എന്നിവയുടെ ശരാശരി:' },
          options: [{ en: '20' }, { en: '30' }, { en: '100' }, { en: '25' }] },
        { id: 'NM5', answer: 0,
          q: { en: 'A shirt costs ₹800. It is sold at 25% discount. What is the new price?', ml: '₹800 വിലയുള്ള ഒരു ഷർട്ട് 25% കിഴിവിൽ വിൽക്കുന്നു. പുതിയ വില എത്ര?' },
          options: [{ en: '₹600' }, { en: '₹650' }, { en: '₹575' }, { en: '₹625' }] },
        { id: 'NM6', answer: 1,
          q: { en: 'A train travels 240 km in 4 hours. What is its average speed?', ml: 'ഒരു ട്രെയിൻ 4 മണിക്കൂറിൽ 240 കി.മീ. സഞ്ചരിക്കുന്നു. അതിന്റെ ശരാശരി വേഗത എത്ര?', },
          options: [{ en: '50 km/h', ml: '50 കി.മീ./മണിക്കൂർ' }, { en: '60 km/h', ml: '60 കി.മീ./മണിക്കൂർ' }, { en: '70 km/h', ml: '70 കി.മീ./മണിക്കൂർ' }, { en: '80 km/h', ml: '80 കി.മീ./മണിക്കൂർ' }] },
        { id: 'NM7', answer: 2,
          q: { en: 'What comes next? 2, 6, 12, 20, 30, ?', ml: 'അടുത്ത സംഖ്യ ഏത്? 2, 6, 12, 20, 30, ?' },
          options: [{ en: '40' }, { en: '36' }, { en: '42' }, { en: '44' }] },
        { id: 'NM8', answer: 1,
          q: { en: 'If 5x − 3 = 22, then x = ?', ml: '5x − 3 = 22 ആണെങ്കിൽ x = ?' },
          options: [{ en: '4' }, { en: '5' }, { en: '6' }, { en: '7' }] },
        { id: 'NM9', answer: 3,
          q: { en: 'In a class of 40 students, the ratio of boys to girls is 3 : 2. How many girls are there?', ml: '40 വിദ്യാർത്ഥികളുള്ള ഒരു ക്ലാസിൽ ആൺകുട്ടികളും പെൺകുട്ടികളും തമ്മിലുള്ള അനുപാതം 3 : 2 ആണ്. എത്ര പെൺകുട്ടികളുണ്ട്?' },
          options: [{ en: '24' }, { en: '20' }, { en: '12' }, { en: '16' }] },
        { id: 'NM10', answer: 0,
          q: { en: 'Pipe A fills a tank in 6 hours. Pipe B fills it in 3 hours. How long will both pipes together take to fill it?', ml: 'പൈപ്പ് A ഒരു ടാങ്ക് 6 മണിക്കൂറിലും പൈപ്പ് B 3 മണിക്കൂറിലും നിറയ്ക്കുന്നു. രണ്ടും ഒരുമിച്ച് തുറന്നാൽ ടാങ്ക് നിറയാൻ എത്ര സമയം വേണം?' },
          options: [{ en: '2 hours', ml: '2 മണിക്കൂർ' }, { en: '3 hours', ml: '3 മണിക്കൂർ' }, { en: '4.5 hours', ml: '4.5 മണിക്കൂർ' }, { en: '9 hours', ml: '9 മണിക്കൂർ' }] }
      ]
    },
    {
      id: 'logical',
      timeLimitSec: 420,
      example: {
        en: 'Example: A, B, C, D, ?  Answer: E (letters in order).',
        ml: 'ഉദാഹരണം: A, B, C, D, ?  ഉത്തരം: E (അക്ഷരങ്ങൾ ക്രമത്തിൽ).'
      },
      items: [
        { id: 'LG1', answer: 2,
          q: { en: 'Meera is taller than Sara. Sara is taller than Lini. Who is the shortest?', ml: 'മീര സാറയേക്കാൾ ഉയരമുള്ളവളാണ്. സാറ ലിനിയേക്കാൾ ഉയരമുള്ളവളാണ്. ഏറ്റവും ഉയരം കുറഞ്ഞത് ആർക്ക്?' },
          options: [{ en: 'Meera', ml: 'മീര' }, { en: 'Sara', ml: 'സാറ' }, { en: 'Lini', ml: 'ലിനി' }, { en: 'Cannot say', ml: 'പറയാൻ കഴിയില്ല' }] },
        { id: 'LG2', answer: 1,
          q: { en: 'What comes next? A, C, E, G, ?', ml: 'അടുത്തത് ഏത്? A, C, E, G, ?' },
          options: [{ en: 'H' }, { en: 'I' }, { en: 'J' }, { en: 'K' }] },
        { id: 'LG3', answer: 0,
          q: { en: 'If CAT is written in a code as DBU, how is DOG written in the same code?', ml: 'ഒരു കോഡിൽ CAT എന്നത് DBU എന്ന് എഴുതുന്നുവെങ്കിൽ, അതേ കോഡിൽ DOG എങ്ങനെ എഴുതും?' },
          options: [{ en: 'EPH' }, { en: 'CNF' }, { en: 'DPH' }, { en: 'EOH' }] },
        { id: 'LG4', answer: 2,
          q: { en: 'Which number does NOT belong with the others? 3, 5, 9, 11', ml: 'കൂട്ടത്തിൽ ചേരാത്ത സംഖ്യ ഏത്? 3, 5, 9, 11' },
          options: [{ en: '3' }, { en: '5' }, { en: '9' }, { en: '11' }] },
        { id: 'LG5', answer: 1,
          q: { en: 'Today is Monday. What day will it be 10 days from today?', ml: 'ഇന്ന് തിങ്കളാഴ്ചയാണ്. ഇന്നു മുതൽ 10 ദിവസം കഴിഞ്ഞാൽ ഏത് ദിവസമായിരിക്കും?' },
          options: [{ en: 'Wednesday', ml: 'ബുധൻ' }, { en: 'Thursday', ml: 'വ്യാഴം' }, { en: 'Friday', ml: 'വെള്ളി' }, { en: 'Saturday', ml: 'ശനി' }] },
        { id: 'LG6', answer: 3,
          q: { en: 'Ravi walks 5 m north, turns right and walks 3 m, then turns right again and walks 5 m. In which direction is he now from his starting point?', ml: 'രവി 5 മീ. വടക്കോട്ട് നടന്ന് വലത്തോട്ട് തിരിഞ്ഞ് 3 മീ. നടക്കുന്നു, വീണ്ടും വലത്തോട്ട് തിരിഞ്ഞ് 5 മീ. നടക്കുന്നു. തുടങ്ങിയ സ്ഥലത്തു നിന്ന് ഏത് ദിശയിലാണ് അവൻ ഇപ്പോൾ?' },
          options: [{ en: 'North', ml: 'വടക്ക്' }, { en: 'West', ml: 'പടിഞ്ഞാറ്' }, { en: 'South', ml: 'തെക്ക്' }, { en: 'East', ml: 'കിഴക്ക്' }] },
        { id: 'LG7', answer: 0,
          q: { en: 'All Bloops are Razzies. All Razzies are Lazzies. Are all Bloops definitely Lazzies?', ml: 'എല്ലാ ബ്ലൂപ്പുകളും റാസികളാണ്. എല്ലാ റാസികളും ലാസികളാണ്. എല്ലാ ബ്ലൂപ്പുകളും തീർച്ചയായും ലാസികളാണോ?' },
          options: [{ en: 'Yes', ml: 'അതെ' }, { en: 'No', ml: 'അല്ല' }, { en: 'Cannot say', ml: 'പറയാൻ കഴിയില്ല' }] },
        { id: 'LG8', answer: 1,
          q: { en: 'What is the angle between the hour hand and the minute hand of a clock at 3:00?', ml: '3:00 മണിക്ക് ക്ലോക്കിലെ മണിക്കൂർ സൂചിയും മിനിറ്റ് സൂചിയും തമ്മിലുള്ള കോൺ എത്ര?' },
          options: [{ en: '60°' }, { en: '90°' }, { en: '120°' }, { en: '180°' }] },
        { id: 'LG9', answer: 3,
          q: { en: 'In a class of 30 students, Ravi\'s rank is 12th from the top. What is his rank from the bottom?', ml: '30 വിദ്യാർത്ഥികളുള്ള ക്ലാസിൽ രവിയുടെ റാങ്ക് മുകളിൽ നിന്ന് 12-ാമതാണ്. താഴെ നിന്ന് അവന്റെ റാങ്ക് എത്ര?' },
          options: [{ en: '18' }, { en: '17' }, { en: '20' }, { en: '19' }] },
        { id: 'LG10', answer: 2,
          q: { en: 'If 2 → 6, 3 → 12 and 4 → 20, then 5 → ?', ml: '2 → 6, 3 → 12, 4 → 20 ആണെങ്കിൽ 5 → ?' },
          options: [{ en: '25' }, { en: '28' }, { en: '30' }, { en: '35' }] }
      ]
    },
    {
      id: 'mechanical',
      timeLimitSec: 360,
      example: {
        en: 'Example: Which is easier to push: a cart with round wheels or a cart with square wheels?  Answer: Round wheels.',
        ml: 'ഉദാഹരണം: ഉരുണ്ട ചക്രങ്ങളുള്ള വണ്ടിയോ ചതുര ചക്രങ്ങളുള്ള വണ്ടിയോ തള്ളാൻ എളുപ്പം?  ഉത്തരം: ഉരുണ്ട ചക്രങ്ങൾ.'
      },
      items: [
        { id: 'MC1', answer: 1,
          q: { en: 'To loosen a very tight nut, which spanner is easier to use?', ml: 'വളരെ മുറുകിയ ഒരു നട്ട് അഴിക്കാൻ ഏത് സ്പാനർ ഉപയോഗിക്കുന്നതാണ് എളുപ്പം?' },
          options: [{ en: 'A short spanner', ml: 'നീളം കുറഞ്ഞ സ്പാനർ' }, { en: 'A long spanner', ml: 'നീളം കൂടിയ സ്പാനർ' }, { en: 'Both are the same', ml: 'രണ്ടും ഒരുപോലെ' }, { en: 'A painted spanner', ml: 'പെയിന്റടിച്ച സ്പാനർ' }] },
        { id: 'MC2', answer: 2,
          q: { en: 'Two gears are touching each other. The first gear turns clockwise. Which way does the second gear turn?', ml: 'പരസ്പരം ചേർന്നിരിക്കുന്ന രണ്ട് ഗിയറുകളിൽ ആദ്യത്തേത് ഘടികാരദിശയിൽ കറങ്ങുന്നു. രണ്ടാമത്തെ ഗിയർ ഏത് ദിശയിൽ കറങ്ങും?' },
          options: [{ en: 'Clockwise', ml: 'ഘടികാരദിശയിൽ' }, { en: 'It does not turn', ml: 'കറങ്ങില്ല' }, { en: 'Anticlockwise', ml: 'എതിർ ഘടികാരദിശയിൽ' }, { en: 'Back and forth', ml: 'മുന്നോട്ടും പിന്നോട്ടും' }] },
        { id: 'MC3', answer: 0,
          q: { en: 'A metal spoon and a wooden spoon are kept in hot water. Which handle becomes hot faster?', ml: 'ഒരു ലോഹ സ്പൂണും ഒരു തടി സ്പൂണും ചൂടുവെള്ളത്തിൽ വെച്ചിരിക്കുന്നു. ഏതിന്റെ പിടിയാണ് വേഗം ചൂടാകുക?' },
          options: [{ en: 'Metal spoon', ml: 'ലോഹ സ്പൂൺ' }, { en: 'Wooden spoon', ml: 'തടി സ്പൂൺ' }, { en: 'Both at the same time', ml: 'രണ്ടും ഒരേ സമയം' }, { en: 'Neither becomes hot', ml: 'രണ്ടും ചൂടാകില്ല' }] },
        { id: 'MC4', answer: 0,
          q: { en: 'You are lifting a heavy stone with an iron rod placed over a small rock (the pivot). Where should the pivot be to need the least effort?', ml: 'ഒരു ചെറിയ കല്ലിനു മുകളിൽ (താങ്ങ്) വെച്ച ഇരുമ്പ് കമ്പി ഉപയോഗിച്ച് ഭാരമുള്ള ഒരു കല്ല് ഉയർത്തുന്നു. ഏറ്റവും കുറഞ്ഞ ബലം മതിയാകാൻ താങ്ങ് എവിടെയായിരിക്കണം?' },
          options: [{ en: 'Close to the heavy stone', ml: 'ഭാരമുള്ള കല്ലിനടുത്ത്' }, { en: 'In the middle of the rod', ml: 'കമ്പിയുടെ നടുവിൽ' }, { en: 'Close to your hands', ml: 'നിങ്ങളുടെ കൈകൾക്കടുത്ത്' }, { en: 'It does not matter', ml: 'വ്യത്യാസമില്ല' }] },
        { id: 'MC5', answer: 3,
          q: { en: 'Gear A has 20 teeth and gear B has 40 teeth. They are joined together. When A makes 10 full turns, how many turns does B make?', ml: 'ഗിയർ A-യ്ക്ക് 20 പല്ലുകളും ഗിയർ B-യ്ക്ക് 40 പല്ലുകളും ഉണ്ട്. ഇവ പരസ്പരം ചേർന്നിരിക്കുന്നു. A 10 തവണ പൂർണ്ണമായി കറങ്ങുമ്പോൾ B എത്ര തവണ കറങ്ങും?' },
          options: [{ en: '20' }, { en: '10' }, { en: '40' }, { en: '5' }] },
        { id: 'MC6', answer: 1,
          q: { en: 'A big ship made of iron floats on water mainly because:', ml: 'ഇരുമ്പ് കൊണ്ട് നിർമ്മിച്ച വലിയ കപ്പൽ വെള്ളത്തിൽ പൊങ്ങിക്കിടക്കുന്നതിന്റെ പ്രധാന കാരണം:' },
          options: [{ en: 'Iron is lighter than water', ml: 'ഇരുമ്പ് വെള്ളത്തേക്കാൾ ഭാരം കുറഞ്ഞതാണ്' }, { en: 'Its shape pushes aside a lot of water', ml: 'അതിന്റെ ആകൃതി ധാരാളം വെള്ളത്തെ തള്ളിമാറ്റുന്നു' }, { en: 'It is painted', ml: 'അതിൽ പെയിന്റ് അടിച്ചിട്ടുണ്ട്' }, { en: 'Its engines keep it up', ml: 'എഞ്ചിനുകൾ അതിനെ ഉയർത്തി നിർത്തുന്നു' }] },
        { id: 'MC7', answer: 2,
          q: { en: 'Two bulbs are connected one after the other (in series) to a battery. If one bulb burns out, what happens to the other bulb?', ml: 'രണ്ട് ബൾബുകൾ ഒന്നിനു പിറകെ ഒന്നായി (ശ്രേണിയിൽ) ഒരു ബാറ്ററിയുമായി ബന്ധിപ്പിച്ചിരിക്കുന്നു. ഒരു ബൾബ് ഫ്യൂസായാൽ മറ്റേ ബൾബിന് എന്തു സംഭവിക്കും?' },
          options: [{ en: 'It glows brighter', ml: 'കൂടുതൽ പ്രകാശിക്കും' }, { en: 'Nothing changes', ml: 'മാറ്റമൊന്നുമില്ല' }, { en: 'It also goes off', ml: 'അതും അണയും' }, { en: 'It starts blinking', ml: 'മിന്നാൻ തുടങ്ങും' }] },
        { id: 'MC8', answer: 0,
          q: { en: 'A single fixed pulley (like on a well) mainly helps you by:', ml: 'കിണറിലെ കപ്പി പോലുള്ള ഒരു ഉറപ്പിച്ച കപ്പി പ്രധാനമായും സഹായിക്കുന്നത്:' },
          options: [{ en: 'Changing the direction of your pull', ml: 'വലിക്കുന്ന ദിശ മാറ്റുന്നതിലൂടെ' }, { en: 'Making the load half as heavy', ml: 'ഭാരം പകുതിയാക്കുന്നതിലൂടെ' }, { en: 'Making the rope longer', ml: 'കയറിന്റെ നീളം കൂട്ടുന്നതിലൂടെ' }, { en: 'Making the water cleaner', ml: 'വെള്ളം ശുദ്ധമാക്കുന്നതിലൂടെ' }] },
        { id: 'MC9', answer: 3,
          q: { en: 'A ball dropped on the floor bounces a little lower each time. This is mainly because:', ml: 'തറയിലേക്ക് ഇട്ട ഒരു പന്ത് ഓരോ തവണയും അല്പം കുറഞ്ഞ ഉയരത്തിലേ കുതിക്കുന്നുള്ളൂ. ഇതിന്റെ പ്രധാന കാരണം:' },
          options: [{ en: 'Gravity becomes stronger', ml: 'ഗുരുത്വാകർഷണം കൂടുന്നു' }, { en: 'The ball becomes heavier', ml: 'പന്തിന്റെ ഭാരം കൂടുന്നു' }, { en: 'The floor pulls the ball', ml: 'തറ പന്തിനെ വലിക്കുന്നു' }, { en: 'Some energy is lost as heat and sound', ml: 'കുറച്ച് ഊർജ്ജം താപവും ശബ്ദവുമായി നഷ്ടപ്പെടുന്നു' }] },
        { id: 'MC10', answer: 1,
          q: { en: 'A wheelbarrow is easiest to lift when the heavy load is placed:', ml: 'ഭാരം എവിടെ വെക്കുമ്പോഴാണ് ഒരു ഉന്തുവണ്ടി (വീൽബാരോ) ഉയർത്താൻ ഏറ്റവും എളുപ്പം?' },
          options: [{ en: 'Near the handles', ml: 'പിടികൾക്കടുത്ത്' }, { en: 'Near the wheel', ml: 'ചക്രത്തിനടുത്ത്' }, { en: 'Hanging from the handles', ml: 'പിടികളിൽ തൂക്കിയിട്ട്' }, { en: 'It does not matter', ml: 'വ്യത്യാസമില്ല' }] }
      ]
    }
  ]
};
