export interface QuizQuestion {
  id: number;
  category: 'Tajweed' | 'Arabic Grammar' | 'Seerah & History';
  question: string;
  arabicPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  classicalSource: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Tajweed',
    question: 'Which of the following letters produces the rule of Qalqalah (the bouncing echo) when bearing a Sukoon?',
    arabicPrompt: 'حروف القلقلة المجموعة في لفظ...',
    options: [
      'Al-Kaf (ك)',
      'Al-Jeem (ج)',
      'Al-Ayn (ع)',
      'Ash-Sheen (ش)'
    ],
    correctIndex: 1,
    explanation: 'The five letters of Qalqalah are collected in the mnemonic "Qutb Jad" (ق، ط، ب، ج، د). When any of these five letters has a Sukoon, an echo/bounce is released.',
    classicalSource: 'Matn Tuhfat al-Atfal (Imam Al-Jamzuri)'
  },
  {
    id: 2,
    category: 'Tajweed',
    question: 'When a Noon Sakinah is followed by the letter Baa (ب), what Tajweed rule is applied?',
    arabicPrompt: 'حكم النون الساكنة إذا جاء بعدها حرف الباء',
    options: [
      'Izhar Halqi (Clear pronunciation)',
      'Idgham bi-Ghunnah (Merging with nasalization)',
      'Iqlab (Transforming into Meem with Ghunnah)',
      'Ikhfa Haqiqi (Concealment)'
    ],
    correctIndex: 2,
    explanation: 'Iqlab occurs exclusively when a Noon Sakinah or Tanween is followed by Baa (ب). The Noon is converted into a hidden Meem accompanied by a two-count nasal Ghunnah (e.g., مِن بَعْدِ -> mim-ba\'di).',
    classicalSource: 'Al-Muqaddimah Al-Jazariyyah'
  },
  {
    id: 3,
    category: 'Arabic Grammar',
    question: 'In the Arabic nominal sentence (Al-Jumla Al-Ismiyya), what are the two core constituents?',
    arabicPrompt: 'ركنا الجملة الاسمية هما...',
    options: [
      'Fi\'l (Verb) and Faa\'il (Subject)',
      'Mubtada (Subject) and Khabar (Predicate)',
      'Harf (Particle) and Majroor (Genitive noun)',
      'Ism and Sifah (Noun and Adjective)'
    ],
    correctIndex: 1,
    explanation: 'A nominal sentence starts with a noun and is constituted by the Mubtada (the inchoative subject) and the Khabar (the informative predicate), both primarily carrying Raf\' (dammah).',
    classicalSource: 'Al-Ajrumiyyah (Ibn Ajrum)'
  },
  {
    id: 4,
    category: 'Arabic Grammar',
    question: 'What is the role of the particle "Inna" (إِنَّ) when it precedes a nominal sentence?',
    arabicPrompt: 'عمل "إنَّ" وأخواتها في المبتدأ والخبر',
    options: [
      'Gives Nasb (fatha) to the Mubtada and Raf\' (dammah) to the Khabar',
      'Gives Raf\' to both the Mubtada and Khabar',
      'Turns the verb into a jussive (Jazm)',
      'Leaves the sentence unchanged'
    ],
    correctIndex: 0,
    explanation: 'Inna and its sisters (Anna, Ka\'anna, Lakinna, Layta, La\'alla) cause the subject (Ism Inna) to take the accusative case (Mansub / fatha) while maintaining the predicate (Khabar Inna) in the nominative (Marfu\' / dammah).',
    classicalSource: 'Alfiyyah Ibn Malik'
  },
  {
    id: 5,
    category: 'Seerah & History',
    question: 'Which ancient pre-Islamic pact of chivalry and justice was praised by the Prophet Muhammad ﷺ for defending the oppressed in Makkah?',
    arabicPrompt: 'حلف نصرة المظلوم الذي شهده النبي ﷺ في دار عبد الله بن جدعان',
    options: [
      'Hilf al-Fudul (Pact of the Virtuous)',
      'Treaty of Hudaybiyyah',
      'Pledge of Ridwan',
      'Pact of Yathrib'
    ],
    correctIndex: 0,
    explanation: 'Hilf al-Fudul (The Pact of the Virtuous) was established in the house of Abdullah ibn Jud\'an to protect any victim of oppression in Makkah. The Prophet ﷺ said: "I witnessed in the house of Ibn Jud\'an a pact which I would not exchange for red camels."',
    classicalSource: 'Sirat Ibn Hisham'
  }
];
