// Response scales shared by the Likert-type tests.
var EP = window.EP = window.EP || {};

EP.scales = {
  like5: [
    { v: 1, en: 'Strongly dislike', ml: 'വളരെ ഇഷ്ടമല്ല' },
    { v: 2, en: 'Dislike', ml: 'ഇഷ്ടമല്ല' },
    { v: 3, en: 'Not sure', ml: 'ഉറപ്പില്ല' },
    { v: 4, en: 'Like', ml: 'ഇഷ്ടമാണ്' },
    { v: 5, en: 'Strongly like', ml: 'വളരെ ഇഷ്ടമാണ്' }
  ],
  agree5: [
    { v: 1, en: 'Strongly disagree', ml: 'തീർത്തും വിയോജിക്കുന്നു' },
    { v: 2, en: 'Disagree', ml: 'വിയോജിക്കുന്നു' },
    { v: 3, en: 'Neutral', ml: 'നിഷ്പക്ഷം' },
    { v: 4, en: 'Agree', ml: 'യോജിക്കുന്നു' },
    { v: 5, en: 'Strongly agree', ml: 'പൂർണ്ണമായി യോജിക്കുന്നു' }
  ],
  important5: [
    { v: 1, en: 'Not important', ml: 'പ്രധാനമല്ല' },
    { v: 2, en: 'Slightly important', ml: 'അല്പം പ്രധാനം' },
    { v: 3, en: 'Moderately important', ml: 'ഇടത്തരം പ്രധാനം' },
    { v: 4, en: 'Very important', ml: 'വളരെ പ്രധാനം' },
    { v: 5, en: 'Extremely important', ml: 'ഏറ്റവും പ്രധാനം' }
  ]
};
