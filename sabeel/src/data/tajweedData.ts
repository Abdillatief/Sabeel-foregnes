export interface ArabicLetterInfo {
  letter: string;
  name: string;
  transliteration: string;
  makhrajGroup: 'Throat (Al-Halq)' | 'Tongue (Al-Lisan)' | 'Lips (Ash-Shafatan)' | 'Cavity (Al-Jawf)' | 'Nasal (Al-Khayshum)';
  specificLocation: string;
  attributes: string[];
  sampleWordArabic: string;
  sampleWordTransliteration: string;
  sampleWordMeaning: string;
  tip: string;
  frequencyHz: number;
}

export const ARABIC_LETTERS: ArabicLetterInfo[] = [
  {
    letter: 'ض',
    name: 'Dad',
    transliteration: 'Ḍād',
    makhrajGroup: 'Tongue (Al-Lisan)',
    specificLocation: 'One or both sides of the tongue touching the upper molars.',
    attributes: ['Heavy (Tafkheem)', 'Elongation (Istitalah)', 'Soft sound (Rakhawah)'],
    sampleWordArabic: 'الضَّالِّينَ',
    sampleWordTransliteration: 'Aḍ-Ḍāllīn',
    sampleWordMeaning: 'Those who are astray',
    tip: 'Unique to Arabic ("Lughat al-Dad"). The edge of the tongue expands gently along the molars without puffing like a D.',
    frequencyHz: 180
  },
  {
    letter: 'ع',
    name: 'Ayn',
    transliteration: '‘Ayn',
    makhrajGroup: 'Throat (Al-Halq)',
    specificLocation: 'Middle of the throat (Wasat al-Halq), produced by contracting the pharyngeal muscles.',
    attributes: ['Between soft and rigid (Tawassut)', 'Light (Tarqeeq)', 'Vocal fold constriction'],
    sampleWordArabic: 'الْعَالَمِينَ',
    sampleWordTransliteration: 'Al-‘Ālamīn',
    sampleWordMeaning: 'The Lord of all realms',
    tip: 'Gently squeeze the middle throat muscles as if tightening a necktie, with no breathiness.',
    frequencyHz: 220
  },
  {
    letter: 'ق',
    name: 'Qaf',
    transliteration: 'Qāf',
    makhrajGroup: 'Tongue (Al-Lisan)',
    specificLocation: 'Deepest part of the tongue (Aqsa al-Lisan) meeting the soft palate.',
    attributes: ['Qalqalah (Echo when Sakin)', 'Heavy (Tafkheem)', 'Strength (Shiddah)'],
    sampleWordArabic: 'قُلْ',
    sampleWordTransliteration: 'Qul',
    sampleWordMeaning: 'Say',
    tip: 'A full, deep uvular stop. When silent (Sakin), bounce it with a crisp Qalqalah echo.',
    frequencyHz: 260
  },
  {
    letter: 'ح',
    name: 'Haa',
    transliteration: 'Ḥā’',
    makhrajGroup: 'Throat (Al-Halq)',
    specificLocation: 'Middle of the throat (Wasat al-Halq), pure clean friction.',
    attributes: ['Whisper (Hams)', 'Light (Tarqeeq)', 'Soft (Rakhawah)'],
    sampleWordArabic: 'الرَّحْمَٰنِ',
    sampleWordTransliteration: 'Ar-Raḥmān',
    sampleWordMeaning: 'The Entirely Merciful',
    tip: 'Like breathing warm air onto cold spectacles to fog them up. Smooth and raspless.',
    frequencyHz: 330
  },
  {
    letter: 'ص',
    name: 'Sad',
    transliteration: 'Ṣād',
    makhrajGroup: 'Tongue (Al-Lisan)',
    specificLocation: 'Tip of the tongue placed behind the lower front incisors with whistling sound.',
    attributes: ['Whistle (Safeer)', 'Heavy (Tafkheem)', 'Adhesion (Itbaq)'],
    sampleWordArabic: 'الصِّرَاطَ',
    sampleWordTransliteration: 'Aṣ-Ṣirāṭ',
    sampleWordMeaning: 'The straight path',
    tip: 'Raise the back of the tongue towards the palate to produce a full, dark, resonant S-whistle.',
    frequencyHz: 400
  },
  {
    letter: 'ط',
    name: 'Taa',
    transliteration: 'Ṭā’',
    makhrajGroup: 'Tongue (Al-Lisan)',
    specificLocation: 'Tip of the tongue pressing the base of the top front teeth (gums).',
    attributes: ['Strongest letter in Arabic', 'Qalqalah', 'Elevated (Isti\'la)', 'Adhesion (Itbaq)'],
    sampleWordArabic: 'طَيِّبَةً',
    sampleWordTransliteration: 'Ṭayyibah',
    sampleWordMeaning: 'Pure & goodly',
    tip: 'The heaviest explosive sound in the language. The entire tongue roof closes upward.',
    frequencyHz: 350
  },
  {
    letter: 'خ',
    name: 'Khaa',
    transliteration: 'Khā’',
    makhrajGroup: 'Throat (Al-Halq)',
    specificLocation: 'Closest part of the throat (Adna al-Halq), near the uvula.',
    attributes: ['Heavy (Tafkheem)', 'Whispered (Hams)', 'Continuous friction'],
    sampleWordArabic: 'خَيْرٌ',
    sampleWordTransliteration: 'Khayr',
    sampleWordMeaning: 'Goodness / better',
    tip: 'Fricative sound similar to the Scottish "loch" or German "Bach", accompanied by a full mouth resonance.',
    frequencyHz: 280
  },
  {
    letter: 'غ',
    name: 'Ghayn',
    transliteration: 'Ghayn',
    makhrajGroup: 'Throat (Al-Halq)',
    specificLocation: 'Closest part of the throat (Adna al-Halq), voiced uvular fricative.',
    attributes: ['Heavy (Tafkheem)', 'Voiced (Jahr)', 'Flowing sound'],
    sampleWordArabic: 'غَفُورٌ',
    sampleWordTransliteration: 'Ghafūr',
    sampleWordMeaning: 'All-Forgiving',
    tip: 'Voiced equivalent of Khaa; similar to the gentle French "R" in Paris or gargling water.',
    frequencyHz: 240
  },
  {
    letter: 'ب',
    name: 'Baa',
    transliteration: 'Bā’',
    makhrajGroup: 'Lips (Ash-Shafatan)',
    specificLocation: 'Firm meeting of the wet inner surfaces of the two lips.',
    attributes: ['Qalqalah (Echo)', 'Light (Tarqeeq)', 'Voiced (Jahr)'],
    sampleWordArabic: 'بِسْمِ',
    sampleWordTransliteration: 'Bismi',
    sampleWordMeaning: 'In the name of',
    tip: 'Crisp bilabial stop. When it bears a sukoon (e.g., Al-Falaq ayah 2), provide a distinct Qalqalah bounce.',
    frequencyHz: 200
  },
  {
    letter: 'م',
    name: 'Meem',
    transliteration: 'Mīm',
    makhrajGroup: 'Lips (Ash-Shafatan)',
    specificLocation: 'Gentle closure of the dry outer margins of both lips, with nasal Ghunnah resonance.',
    attributes: ['Ghunnah (Nasalization)', 'Tawassut', 'Light (Tarqeeq)'],
    sampleWordArabic: 'مُحَمَّدٌ',
    sampleWordTransliteration: 'Muḥammad',
    sampleWordMeaning: 'The Praised One',
    tip: 'Half of the letter is formed by the lips, and half resonates inside the nasal cavity (Khayshum).',
    frequencyHz: 210
  }
];

export const TAJWEED_RULES_EXPLAINED = [
  {
    rule: 'Noon Sakinah & Tanween',
    arabic: 'أحكام النون الساكنة والتنوين',
    summary: 'Four distinct rulings when a silent Noon (نْ) or nunation vowel appears: Izhar (clear pronunciation), Idgham (merging with or without nasalization), Iqlab (transforming into Meem), and Ikhfa (concealing with 2-count Ghunnah).',
    lettersExample: 'Izhar: ء هـ ع ح غ خ | Idgham: ي ر م ل و ن | Iqlab: ب | Ikhfa: Remaining 15 letters'
  },
  {
    rule: 'Qalqalah (The Echoing Bounce)',
    arabic: 'القلقلة (ق ط ب ج د)',
    summary: 'A vibrating resonance or bounce applied when five specific letters carry a Sukoon (quiescence): Qaf (ق), Taa (ط), Baa (ب), Jeem (ج), and Dal (د), collected in the mnemonic "Qutb Jad".',
    lettersExample: 'Kubra (Major): at end of Ayah (e.g., كَسَبَْ) | Sughra (Minor): mid-word (e.g., يَقْطَعُونَ)'
  },
  {
    rule: 'Madd (Vocalic Prolongation)',
    arabic: 'أحكام المدود (الأصلي والفرعي)',
    summary: 'The elongation of sound for the long vowels (Alif, Waw, Yaa). Normal natural elongation is 2 harakāt; secondary elongation due to Hamzah or Sukoon extends to 4, 5, or 6 harakāt.',
    lettersExample: 'Madd Asli: 2 counts | Madd Wajib: 4-5 counts | Madd Lazim: 6 fixed counts'
  }
];
