// Official response scales of the two instruments.
var EP = window.EP = window.EP || {};

EP.scales = {
  // O*NET Interest Profiler Short Form
  onetLike5: [
    { v: 1, en: 'Strongly dislike', ml: 'ഒട്ടും ഇഷ്ടമല്ല' },
    { v: 2, en: 'Dislike', ml: 'ഇഷ്ടമല്ല' },
    { v: 3, en: 'Unsure', ml: 'ഉറപ്പില്ല' },
    { v: 4, en: 'Like', ml: 'ഇഷ്ടമാണ്' },
    { v: 5, en: 'Strongly like', ml: 'വളരെ ഇഷ്ടമാണ്' }
  ],
  // IPIP accuracy scale
  ipipAccuracy5: [
    { v: 1, en: 'Very inaccurate', ml: 'എന്നെക്കുറിച്ച് ഒട്ടും ശരിയല്ല' },
    { v: 2, en: 'Moderately inaccurate', ml: 'എന്നെക്കുറിച്ച് അധികം ശരിയല്ല' },
    { v: 3, en: 'Neither accurate nor inaccurate', ml: 'ശരിയെന്നോ തെറ്റെന്നോ പറയാനാവില്ല' },
    { v: 4, en: 'Moderately accurate', ml: 'എന്നെക്കുറിച്ച് ഏറെക്കുറെ ശരിയാണ്' },
    { v: 5, en: 'Very accurate', ml: 'എന്നെക്കുറിച്ച് പൂർണ്ണമായും ശരിയാണ്' }
  ]
};
