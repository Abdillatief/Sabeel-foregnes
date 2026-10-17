export interface Course {
  id: string;
  title: string;
  arabicTitle: string;
  category: 'Quran & Tajweed' | 'Arabic Language' | 'Islamic Sciences' | 'Seerah & History' | 'Youth & Leadership';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  instructorTitle: string;
  enrolledCount: number;
  rating: number;
  description: string;
  image: string;
  tuition: string;
  schedule: string;
  modules: {
    week: number;
    title: string;
    topics: string[];
  }[];
  prerequisites: string;
}

export const COURSES: Course[] = [
  {
    id: 'tajweed-foundations',
    title: 'Foundations of Quranic Tajweed & Phonetics',
    arabicTitle: 'أصول التجويد ومخارج الحروف',
    category: 'Quran & Tajweed',
    level: 'Beginner',
    duration: '10 Weeks',
    instructor: 'Shaykh Dr. Ismail Al-Qasimi',
    instructorTitle: 'Ijaza in Ten Qira\'at, Al-Azhar University',
    enrolledCount: 3420,
    rating: 4.96,
    description: 'Master the vocal articulation points (Makharij), phonetic attributes (Sifat), and essential rules of Noon Sakinah, Meem Sakinah, and Madd with real-time feedback and classical Sanad-linked methodology.',
    image: '/src/assets/images/course_quran_tajweed_1792259828908.jpg',
    tuition: 'Endowment Sponsored (Free)',
    schedule: 'Tuesdays & Thursdays, 7:00 PM GMT',
    modules: [
      { week: 1, title: 'Introduction to Tajweed & Etiquette of Tilawah', topics: ['Sanad tradition and transmission', 'Virtues of recitation', 'Introduction to the vocal tract'] },
      { week: 2, title: 'The Throat & Deep Oral Articulation Points', topics: ['Aqsa, Wasat, and Adna al-Halq', 'Letters: Hamzah, Ha, Ayn, Haa, Ghayn, Khaa'] },
      { week: 3, title: 'The Tongue Articulation (Al-Lisan)', topics: ['Deep tongue (Qaf & Kaf)', 'Middle tongue (Jeem, Sheen, Ya)', 'Lateral tongue (Daad & Laam)'] },
      { week: 4, title: 'Noon Sakinah & Tanween Rules', topics: ['Izhar Halqi', 'Idgham with/without Ghunnah', 'Iqlab', 'Ikhfa Haqiqi'] },
      { week: 5, title: 'Rules of Madd (Prolongation)', topics: ['Madd Asli / Tabee\'i', 'Madd Muttasil and Munfasil', "Madd Lazim and 'Aridh li-s-Sukoon"] }
    ],
    prerequisites: 'Familiarity with recognizing the Arabic alphabet.'
  },
  {
    id: 'classical-arabic-grammar',
    title: 'Classical Arabic Grammar (Nahw & Sarf)',
    arabicTitle: 'النحو التطبيقي والصرف العربي',
    category: 'Arabic Language',
    level: 'Intermediate',
    duration: '12 Weeks',
    instructor: 'Ustadha Fatima Al-Zahra',
    instructorTitle: 'M.A. Arabic Linguistics, SOAS & Umm Al-Qura',
    enrolledCount: 2890,
    rating: 4.94,
    description: 'Unlock direct comprehension of the Quran and classical Islamic texts through systematic analysis of sentence structure (Nahw), morphological patterns (Sarf), and syntactic parsing (I\'rab).',
    image: '/src/assets/images/course_arabic_grammar_1792259828126.jpg',
    tuition: 'Endowment Sponsored (Free)',
    schedule: 'Mondays & Wednesdays, 6:30 PM GMT',
    modules: [
      { week: 1, title: 'The Tripartite Word Division', topics: ['Ism (Noun), Fi\'l (Verb), and Harf (Particle)', 'Signs of each word category'] },
      { week: 2, title: 'Nominal Sentence Structure (Al-Jumla Al-Ismiyya)', topics: ['Mubtada and Khabar', 'Types of predicate', 'Inna and its sisters'] },
      { week: 3, title: 'Verbal Sentence Architecture (Al-Jumla Al-Fi\'liyya)', topics: ['Fi\'l Maadi, Mudaari\', and Amr', 'Faa\'il (Subject) and Maf\'ool Bihi (Object)'] },
      { week: 4, title: 'Morphology (Awzan & Derivation)', topics: ['The 3-letter root system (Fa-\'Ayn-Laam)', 'Augmented verb forms (Forms II to X)', 'Active and passive participles'] }
    ],
    prerequisites: 'Basic ability to read unvocalized Arabic words.'
  },
  {
    id: 'heritage-science-astronomy',
    title: 'Islamic Heritage of Science, Astronomy & Thought',
    arabicTitle: 'إسهامات الحضارة الإسلامية في العلوم والفلك',
    category: 'Youth & Leadership',
    level: 'Beginner',
    duration: '8 Weeks',
    instructor: 'Prof. Tariq Hashimi',
    instructorTitle: 'Historian of Science & Astrophyics Researcher',
    enrolledCount: 1940,
    rating: 4.98,
    description: 'Explore the golden era of House of Wisdom (Bayt al-Hikmah), celestial navigation through astrolabes, algebraic breakthroughs of Al-Khwarizmi, and optics of Ibn al-Haytham tailored for curious minds.',
    image: '/src/assets/images/course_heritage_science_1792259829349.jpg',
    tuition: 'Endowment Sponsored (Free)',
    schedule: 'Saturdays, 11:00 AM GMT',
    modules: [
      { week: 1, title: 'The Golden Age of Translation & Synthesis', topics: ['Baghdad and Cordoba libraries', 'Empirical scientific method emergence', 'Faith-intellect harmony'] },
      { week: 2, title: 'Astronomy, Astrolabes & Qibla Trigonometry', topics: ['Spherical trigonometry', 'Mechanical astrolabe workings', 'Lunar sighting science'] },
      { week: 3, title: 'Ibn al-Haytham & the Birth of Optics', topics: ['Camera Obscura experiments', 'Light ray mechanics', 'Foundations of visual perception'] }
    ],
    prerequisites: 'Open to youth, students, and general learners of all backgrounds.'
  },
  {
    id: 'sciences-of-hadith',
    title: 'Methodology of Hadith Verification & Criticism',
    arabicTitle: 'مصطلح الحديث ونقد الرواية',
    category: 'Islamic Sciences',
    level: 'Advanced',
    duration: '10 Weeks',
    instructor: 'Shaykh Bilal Al-Husseini',
    instructorTitle: 'Senior Fellow, Faculty of Hadith & Usul',
    enrolledCount: 1620,
    rating: 4.97,
    description: 'Study the rigorous epistemological framework of Hadith classification (Sahih, Hasan, Da\'if), Isnad chain analysis, biographical evaluation (Ilm ar-Rijal), and resolving textual reconciliation (Mukhtalaf al-Hadith).',
    image: '/src/assets/images/course_quran_tajweed_1792259828908.jpg',
    tuition: 'Endowment Sponsored (Free)',
    schedule: 'Sundays, 5:00 PM GMT',
    modules: [
      { week: 1, title: 'Historical Origins of Hadith Codification', topics: ['Oral transmission safeguarding', 'Early written scrolls (Sahifah)', 'Compilations of Imam Malik and Bukhari'] },
      { week: 2, title: 'The Five Criteria for Sahih Authenticity', topics: ['Ittisal as-Sanad (Continuous chain)', '\'Adalah (Moral integrity)', 'Dabt (Accuracy of retention)', 'Shudhoodh & \'Illah exemption'] }
    ],
    prerequisites: 'Basic terminology of Islamic sciences.'
  },
  {
    id: 'seerah-ethical-leadership',
    title: 'The Prophetic Biography (Seerah) & Ethical Leadership',
    arabicTitle: 'السيرة النبوية وبناء الشخصية القيادية',
    category: 'Seerah & History',
    level: 'Beginner',
    duration: '9 Weeks',
    instructor: 'Dr. Maryam Siddiqui',
    instructorTitle: 'Scholar in Prophetic Ethics & Community Leadership',
    enrolledCount: 4120,
    rating: 4.99,
    description: 'An immersive chronological journey through the life of the Prophet Muhammad ﷺ, extracting timeless leadership principles, psychological resilience, emotional intelligence, and civil society building.',
    image: '/src/assets/images/hero_sabeel_academy_1792259827604.jpg',
    tuition: 'Endowment Sponsored (Free)',
    schedule: 'Fridays, 7:30 PM GMT',
    modules: [
      { week: 1, title: 'Pre-Islamic Arabia & The Moral Compass of Al-Amin', topics: ['Social fabric of Makkah', 'The Pact of the Virtuous (Hilf al-Fudul)', 'Spiritual seclusion in Mount Hira'] },
      { week: 2, title: 'The Early Secret & Public Da\'wah: Strategic Patience', topics: ['Dar al-Arqam incubation', 'Perseverance through boycott', 'Diplomatic outreach to Ta\'if'] }
    ],
    prerequisites: 'None; accessible to all seekers of knowledge.'
  }
];
