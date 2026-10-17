import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Teacher } from '../../types';
import { 
  Award, 
  Play, 
  Pause, 
  Globe, 
  Check, 
  ShieldCheck,
  GraduationCap,
  Volume2
} from 'lucide-react';

export const TeachersSection: React.FC = () => {
  const { lang, teachers, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const [playingTeacherId, setPlayingTeacherId] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');

  const filteredTeachers = teachers.filter(t => {
    if (genderFilter === 'all') return true;
    return t.gender === genderFilter;
  });

  const toggleAudio = (id: string) => {
    if (playingTeacherId === id) {
      setPlayingTeacherId(null);
    } else {
      setPlayingTeacherId(id);
    }
  };

  return (
    <section id="faculty" className="py-20 lg:py-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl text-start">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 tracking-wide mb-2">
              <span>{isAr ? 'هيئة التدريس الأزهري' : 'Azhari Scholarly Faculty'}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>{isAr ? 'إجازات بالسند المتصل' : 'Continuous Sanad Ijazah'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight [text-wrap:balance]">
              {isAr ? 'نخبة من شيوخ ومعلمات الأزهر الشريف المعتمدين' : 'Distinguished Azhar Mentors for Quran & Arabic'}
            </h2>
            
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'يخضع جميع معلمينا لاختبارات أداء صارمة في إتقان التلاوة، طلاقة الإنجليزية، والأسلوب التربوي الصبور المحبب للأطفال.'
                : 'Selected through a rigorous multi-stage vetting process evaluating recitation accuracy, English fluency, and child pedagogy.'}
            </p>
          </div>

          {/* Gender Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setGenderFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                genderFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {isAr ? 'الجميع' : 'All Mentors'}
            </button>
            <button
              type="button"
              onClick={() => setGenderFilter('male')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                genderFilter === 'male'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {isAr ? 'المشايخ (معلمون)' : 'Male Scholars'}
            </button>
            <button
              type="button"
              onClick={() => setGenderFilter('female')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                genderFilter === 'female'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {isAr ? 'الفضليات (معلمات)' : 'Female Scholars'}
            </button>
          </div>
        </div>

        {/* Feature Spotlight on Rigorous Faculty Standards */}
        <div className="mt-8 mb-12 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                {isAr ? 'معيار قبول دقيق (3% فقط)' : 'Rigorous 3% Acceptance Rate'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block leading-relaxed">
                {isAr ? 'اجتياز لجان المشيخة في علوم التجويد وعلم النفس التربوي للأطفال.' : 'Rigorous examinations in Tajweed sciences and child developmental pedagogy.'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/50 text-sky-800 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                {isAr ? 'خريجو جامعة الأزهر الشريف' : 'Al-Azhar University Graduates'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block leading-relaxed">
                {isAr ? 'كليات القرآن الكريم، الدراسات الإسلامية، واللغات والترجمة.' : 'Faculties of Holy Quran, Islamic Sciences, and Languages & Translation.'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                {isAr ? 'إتقان تام للإنجليزية واللغات' : 'Bilingual Native Competence'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block leading-relaxed">
                {isAr ? 'قدرة فائقة على التواصل مع الطلاب المغتربين في أمريكا وأوروبا.' : 'Seamless communication with diaspora Muslim youths in the West.'}
              </span>
            </div>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {filteredTeachers.map((teacher, idx) => {
            const isPlaying = playingTeacherId === teacher.id;
            // Use our generated portrait for the primary Azhari scholar
            const photoSrc = idx === 0 
              ? '/src/assets/images/sabeel_scholar_mentor_1792243648943.jpg' 
              : teacher.photoUrl;

            return (
              <div
                key={teacher.id}
                className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={photoSrc}
                      alt={isAr ? teacher.nameAr : teacher.nameEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Audio Recitation Floating Button */}
                    <button
                      type="button"
                      onClick={() => toggleAudio(teacher.id)}
                      className={`absolute bottom-3 end-3 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md ${
                        isPlaying
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-950/80 hover:bg-slate-950 text-white'
                      }`}
                      aria-label="Play audio recitation sample"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>{isAr ? 'إيقاف التلاوة' : 'Pause'}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                          <span>{isAr ? 'عينة التلاوة' : 'Recitation'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 text-start">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-medium text-amber-700 dark:text-amber-400">
                        {isAr ? teacher.titleAr : teacher.titleEn}
                      </span>
                      <span className="tabular-nums">
                        {teacher.yearsExperience} {isAr ? 'سنوات خبرة' : 'yrs exp'}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-slate-950 dark:text-white">
                      {isAr ? teacher.nameAr : teacher.nameEn}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {isAr ? teacher.bioAr : teacher.bioEn}
                    </p>

                    {/* Accreditations & Languages */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 truncate">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{isAr ? teacher.degreesAr[0] : teacher.degreesEn[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{teacher.languages.join(' · ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-slate-900 dark:text-white hover:text-white dark:hover:text-slate-900 bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-white rounded-xl transition-colors whitespace-nowrap text-center block"
                  >
                    {isAr ? 'احجز حصة مع المعلم' : 'Book Session with Mentor'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
