export interface DhikrItem {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  defaultTarget: number;
  virtue: string;
  source: string;
  category: 'Tasbih' | 'Istighfar' | 'Tahmeed' | 'Salawat' | 'Hawqalah';
}

export const DHIKR_LIST: DhikrItem[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'Subḥān Allāh',
    translation: 'Glory be to Allah, free is He from all imperfections.',
    defaultTarget: 33,
    virtue: 'Plants a fruitful date palm tree for the believer in Paradise with each recitation.',
    source: 'Jami` at-Tirmidhi 3464',
    category: 'Tasbih'
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Al-ḥamdu Lillāh',
    translation: 'All praise and gratitude belong exclusively to Allah.',
    defaultTarget: 33,
    virtue: 'Fills the celestial scale (Mizan) with pure goodness and light.',
    source: 'Sahih Muslim 223',
    category: 'Tahmeed'
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allāhu Akbar',
    translation: 'Allah is the Greatest, supreme above all creation.',
    defaultTarget: 34,
    virtue: 'Part of the sacred prophetic litany recited after every obligatory prayer.',
    source: 'Sahih al-Bukhari 843',
    category: 'Tasbih'
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfiru Allāha wa-atūbu ilayh',
    translation: 'I seek forgiveness from Allah and turn to Him in sincere repentance.',
    defaultTarget: 100,
    virtue: 'The Prophet ﷺ said: "By Allah, I seek forgiveness of Allah and turn to Him in repentance more than seventy times a day."',
    source: 'Sahih al-Bukhari 6307',
    category: 'Istighfar'
  },
  {
    id: 'salawat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ',
    transliteration: 'Allāhumma ṣalli ‘alā Muḥammad wa-‘alā āli Muḥammad',
    translation: 'O Allah, send peace and blessings upon Muhammad and upon the family of Muhammad.',
    defaultTarget: 100,
    virtue: 'Whoever sends blessings upon the Prophet ﷺ once, Allah will send blessings upon him tenfold.',
    source: 'Sahih Muslim 408',
    category: 'Salawat'
  },
  {
    id: 'la-hawla',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
    transliteration: 'Lā ḥawla walā quwwata illā billāhi al-‘aliyyi al-‘aẓīm',
    translation: 'There is no power and no strength except through Allah, the Most High, the Most Great.',
    defaultTarget: 40,
    virtue: 'One of the precious treasures stored beneath the Throne of the Most Merciful.',
    source: 'Sahih al-Bukhari 6409',
    category: 'Hawqalah'
  }
];
