export interface Ayah {
  number: number;
  arabic: string;
  transliteration: string;
  translation: string;
  words: {
    ar: string;
    tr: string;
    en: string;
    root?: string;
  }[];
}

export interface Surah {
  id: string;
  number: number;
  nameArabic: string;
  nameTransliterated: string;
  nameEnglish: string;
  revelationType: 'Meccan' | 'Medinan';
  ayahsCount: number;
  description: string;
  ayahs: Ayah[];
}

export const SURAHS: Surah[] = [
  {
    id: 'al-fatihah',
    number: 1,
    nameArabic: 'سُورَةُ الْفَاتِحَةِ',
    nameTransliterated: 'Al-Fātihah',
    nameEnglish: 'The Opening',
    revelationType: 'Meccan',
    ayahsCount: 7,
    description: 'The foundational mother of the book (Umm al-Kitab), recited in every unit of Islamic prayer, encompassing praise, monotheism, prayer for guidance, and moral destiny.',
    ayahs: [
      {
        number: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismi Allāhi ar-raḥmāni ar-raḥīm',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        words: [
          { ar: 'بِسْمِ', tr: 'Bismi', en: 'In the name', root: 'س-م-و' },
          { ar: 'اللَّهِ', tr: 'Allāh', en: 'of God/Allah', root: 'إ-ل-ه' },
          { ar: 'الرَّحْمَٰنِ', tr: 'Ar-Raḥmān', en: 'the Entirely Merciful', root: 'ر-ح-م' },
          { ar: 'الرَّحِيمِ', tr: 'Ar-Raḥīm', en: 'the Especially Merciful', root: 'ر-ح-م' }
        ]
      },
      {
        number: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        transliteration: 'Al-ḥamdu lillāhi rabbi al-‘ālamīn',
        translation: '[All] praise is [due] to Allah, Lord of all the worlds.',
        words: [
          { ar: 'الْحَمْدُ', tr: 'Al-ḥamdu', en: 'All Praise', root: 'ح-م-د' },
          { ar: 'لِلَّهِ', tr: 'Lillāh', en: 'is to Allah', root: 'إ-ل-ه' },
          { ar: 'رَبِّ', tr: 'Rabbi', en: 'Lord / Sustainer', root: 'ر-ب-ب' },
          { ar: 'الْعَالَمِينَ', tr: 'Al-‘ālamīn', en: 'of all realms / worlds', root: 'ع-ل-م' }
        ]
      },
      {
        number: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Ar-raḥmāni ar-raḥīm',
        translation: 'The Entirely Merciful, the Especially Merciful.',
        words: [
          { ar: 'الرَّحْمَٰنِ', tr: 'Ar-Raḥmān', en: 'The All-Merciful', root: 'ر-ح-م' },
          { ar: 'الرَّحِيمِ', tr: 'Ar-Raḥīm', en: 'The Bestower of Mercy', root: 'ر-ح-م' }
        ]
      },
      {
        number: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        transliteration: 'Māliki yawmi ad-dīn',
        translation: 'Sovereign of the Day of Recompense.',
        words: [
          { ar: 'مَالِكِ', tr: 'Māliki', en: 'Master / Sovereign', root: 'م-ل-ك' },
          { ar: 'يَوْمِ', tr: 'Yawmi', en: 'Day', root: 'ي-و-م' },
          { ar: 'الدِّينِ', tr: 'Ad-Dīn', en: 'of Judgment / Recompense', root: 'د-ي-ن' }
        ]
      },
      {
        number: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        transliteration: 'Iyyāka na‘budu wa-iyyāka nasta‘īn',
        translation: 'It is You we worship and You we ask for help.',
        words: [
          { ar: 'إِيَّاكَ', tr: 'Iyyāka', en: 'You alone', root: 'إ-ي' },
          { ar: 'نَعْبُدُ', tr: 'Na‘budu', en: 'we worship', root: 'ع-ب-د' },
          { ar: 'وَإِيَّاكَ', tr: 'Wa-iyyāka', en: 'and You alone', root: 'إ-ي' },
          { ar: 'نَسْتَعِينُ', tr: 'Nasta‘īn', en: 'we ask for help', root: 'ع-و-ن' }
        ]
      },
      {
        number: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        transliteration: 'Ihdinā aṣ-ṣirāṭa al-mustaqīm',
        translation: 'Guide us to the straight path.',
        words: [
          { ar: 'اهْدِنَا', tr: 'Ihdinā', en: 'Guide us', root: 'ه-د-ي' },
          { ar: 'الصِّرَاطَ', tr: 'Aṣ-Ṣirāṭ', en: 'the Path', root: 'ص-ر-ط' },
          { ar: 'الْمُسْتَقِيمَ', tr: 'Al-Mustaqīm', en: 'the Straight / Upright', root: 'ق-و-م' }
        ]
      },
      {
        number: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        transliteration: 'Ṣirāṭa alladhīna an‘amta ‘alayhim ghayri al-maghḍūbi ‘alayhim walā aḍ-ḍāllīn',
        translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        words: [
          { ar: 'صِرَاطَ', tr: 'Ṣirāṭa', en: 'Path of', root: 'ص-ر-ط' },
          { ar: 'الَّذِينَ', tr: 'Alladhīna', en: 'those who', root: 'ا-ل-ذ' },
          { ar: 'أَنْعَمْتَ', tr: 'An‘amta', en: 'You bestowed grace', root: 'ن-ع-م' },
          { ar: 'عَلَيْهِمْ', tr: '‘Alayhim', en: 'upon them', root: 'ع-ل-ي' },
          { ar: 'غَيْرِ', tr: 'Ghayri', en: 'not [that of]', root: 'غ-ي-ر' },
          { ar: 'الْمَغْضُوبِ', tr: 'Al-Maghḍūb', en: 'those who earned anger', root: 'غ-ض-ب' },
          { ar: 'وَلَا الضَّالِّينَ', tr: 'Walā aḍ-ḍāllīn', en: 'nor of those who go astray', root: 'ض-ل-ل' }
        ]
      }
    ]
  },
  {
    id: 'al-ikhlas',
    number: 112,
    nameArabic: 'سُورَةُ الإِخْلَاصِ',
    nameTransliterated: 'Al-Ikhlāṣ',
    nameEnglish: 'Purity of Faith',
    revelationType: 'Meccan',
    ayahsCount: 4,
    description: 'The defining declaration of divine oneness (Tawheed), equivalent in spiritual weight to one-third of the Quran.',
    ayahs: [
      {
        number: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul huwa Allāhu aḥad',
        translation: 'Say, "He is Allah, [who is] One,',
        words: [
          { ar: 'قُلْ', tr: 'Qul', en: 'Say', root: 'ق-و-ل' },
          { ar: 'هُوَ', tr: 'Huwa', en: 'He is', root: 'ه-و' },
          { ar: 'اللَّهُ', tr: 'Allāh', en: 'Allah', root: 'إ-ل-ه' },
          { ar: 'أَحَدٌ', tr: 'Aḥad', en: 'One / Indivisible', root: 'و-ح-د' }
        ]
      },
      {
        number: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        transliteration: 'Allāhu aṣ-ṣamad',
        translation: 'Allah, the Eternal Refuge.',
        words: [
          { ar: 'اللَّهُ', tr: 'Allāhu', en: 'Allah', root: 'إ-ل-ه' },
          { ar: 'الصَّمَدُ', tr: 'Aṣ-Ṣamad', en: 'The Self-Sufficient Refuge', root: 'ص-م-د' }
        ]
      },
      {
        number: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        transliteration: 'Lam yalid walam yūlad',
        translation: 'He neither begets nor is born,',
        words: [
          { ar: 'لَمْ', tr: 'Lam', en: 'Not', root: 'ل-م' },
          { ar: 'يَلِدْ', tr: 'Yalid', en: 'He begets', root: 'و-ل-د' },
          { ar: 'وَلَمْ', tr: 'Walam', en: 'and not', root: 'ل-م' },
          { ar: 'يُولَدْ', tr: 'Yūlad', en: 'is He begotten', root: 'و-ل-د' }
        ]
      },
      {
        number: 4,
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        transliteration: 'Walam yakun lahu kufuwan aḥad',
        translation: 'Nor is there to Him any equivalent."',
        words: [
          { ar: 'وَلَمْ يَكُن', tr: 'Walam yakun', en: 'And there has never been', root: 'ك-و-ن' },
          { ar: 'لَّهُ', tr: 'Lahu', en: 'unto Him', root: 'ل' },
          { ar: 'كُفُوًا', tr: 'Kufuwan', en: 'equal / peer', root: 'ك-ف-أ' },
          { ar: 'أَحَدٌ', tr: 'Aḥad', en: 'anyone', root: 'و-ح-د' }
        ]
      }
    ]
  },
  {
    id: 'al-asr',
    number: 103,
    nameArabic: 'سُورَةُ الْعَصْرِ',
    nameTransliterated: 'Al-‘Aṣr',
    nameEnglish: 'The Declining Day',
    revelationType: 'Meccan',
    ayahsCount: 3,
    description: 'Imam ash-Shafi\'i noted: "If humanity contemplated only this surah, it would suffice them for salvation."',
    ayahs: [
      {
        number: 1,
        arabic: 'وَالْعَصْرِ',
        transliteration: 'Wal-‘aṣr',
        translation: 'By time,',
        words: [
          { ar: 'وَ', tr: 'Wa', en: 'By oath of', root: 'و' },
          { ar: 'الْعَصْرِ', tr: 'Al-‘Aṣr', en: 'Time / The fleeting epoch', root: 'ع-ص-ر' }
        ]
      },
      {
        number: 2,
        arabic: 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',
        transliteration: 'Inna al-insāna lafī khusr',
        translation: 'Indeed, mankind is in loss,',
        words: [
          { ar: 'إِنَّ', tr: 'Inna', en: 'Truly', root: 'إ-ن' },
          { ar: 'الْإِنسَانَ', tr: 'Al-Insān', en: 'humanity', root: 'أ-ن-س' },
          { ar: 'لَفِي', tr: 'Lafī', en: 'is surely within', root: 'ف-ي' },
          { ar: 'خُسْرٍ', tr: 'Khusr', en: 'profound loss', root: 'خ-س-ر' }
        ]
      },
      {
        number: 3,
        arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
        transliteration: 'Illā alladhīna āmanū wa‘amilū aṣ-ṣāliḥāti watawāṣaw bil-ḥaqqi watawāṣaw biṣ-ṣabr',
        translation: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.',
        words: [
          { ar: 'إِلَّا', tr: 'Illā', en: 'Except', root: 'إ-ل-ا' },
          { ar: 'آمَنُوا', tr: 'Āmanū', en: 'who believe', root: 'أ-م-ن' },
          { ar: 'الصَّالِحَاتِ', tr: 'Aṣ-Ṣāliḥāt', en: 'righteous good deeds', root: 'ص-ل-ح' },
          { ar: 'بِالْحَقِّ', tr: 'Bil-Ḥaqq', en: 'to the Truth', root: 'ح-ق-ق' },
          { ar: 'بِالصَّبْرِ', tr: 'Biṣ-Ṣabr', en: 'to Patience & Steadfastness', root: 'ص-ب-ر' }
        ]
      }
    ]
  }
];
