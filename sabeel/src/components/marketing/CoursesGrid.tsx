import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import { formatPrice } from '../../services/currencyService';
import { 
  BookOpen, 
  Clock, 
  Check, 
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles
} from 'lucide-react';

export const CoursesGrid: React.FC = () => {
  const { 
    lang, 
    currency, 
    courses, 
    setSelectedCourseForModal, 
    setIsBookingModalOpen 
  } = useApp();

  const isAr = lang === 'ar';
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', labelAr: 'جميع المسارات', labelEn: 'All Tracks' },
    { id: 'quran', labelAr: 'القرآن والتجويد', labelEn: 'Quran & Tajweed' },
    { id: 'arabic', labelAr: 'اللغة العربية واللسان', labelEn: 'Arabic Language' },
    { id: 'islamic', labelAr: 'الدراسات الإسلامية', labelEn: 'Islamic Studies' },
  ];

  const getFilteredCourses = () => {
    if (selectedFilter === 'all') return courses;
    if (selectedFilter === 'quran') {
      return courses.filter(c => ['quran-reading', 'quran-memorization', 'tajweed'].includes(c.category));
    }
    if (selectedFilter === 'arabic') {
      return courses.filter(c => ['arabic-non-native', 'egyptian-arabic'].includes(c.category));
    }
    if (selectedFilter === 'islamic') {
      return courses.filter(c => c.category === 'islamic-studies');
    }
    return courses;
  };

  const filtered = getFilteredCourses();

  return (
    <section id="courses" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Anti-slop clean editorial discipline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl text-start">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide mb-2">
              <span>{isAr ? 'المناهج المعتمدة' : 'Accredited Curricula'}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>{isAr ? 'أربعة مسارات تخصصية' : 'Four Specialized Tracks'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight [text-wrap:balance]">
              {isAr ? 'مسارات تعليمية متدرجة من الصفر حتى الإتقان والإجازة' : 'Structured Paths from Fundamentals to Mastery & Ijazah'}
            </h2>
            
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'مناهج مؤصلة علمياً بإشراف كبار علماء الأزهر الشريف، تناسب الصغار من سن 5 سنوات والكبار، مع خطة فردية لكل طالب.'
                : 'Scholarly structured syllabi supervised by senior Azhar academicians, tailored for children from age 5 to adult learners.'}
            </p>
          </div>

          {/* Interactive Filter Controls (Segmented control buttons allowed by constitution) */}
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs self-start md:self-auto overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedFilter === tab.id
                    ? 'bg-slate-950 dark:bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isAr ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Bento-Grid Layout (No repetitive cloned cards) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filtered.map((course, idx) => {
            const isFeatured = idx === 0 && selectedFilter === 'all';

            return (
              <div
                key={course.id}
                className={`flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 p-6 sm:p-7 ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white via-white to-sky-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/40' : ''
                }`}
              >
                <div>
                  {/* Top unboxed kicker & level counter */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-sky-700 dark:text-sky-400">
                      {isAr ? course.badgeAr : course.badgeEn}
                    </span>
                    <span className="flex items-center gap-1.5 tabular-nums">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{course.levelsCount} {isAr ? 'مستويات منهجية' : 'Curriculum Levels'}</span>
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="mt-4 text-lg sm:text-xl font-bold text-slate-950 dark:text-white tracking-tight leading-snug">
                    {isAr ? course.titleAr : course.titleEn}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isAr ? course.shortDescAr : course.shortDescEn}
                  </p>

                  {/* Syllabus / Level breakdown preview */}
                  <div className="mt-5 space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {isAr ? 'خطة المراحل الدراسية' : 'Milestone Progression'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {course.levels.slice(0, isFeatured ? 3 : 2).map((lvl) => (
                        <div 
                          key={lvl.levelNumber}
                          className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2"
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold flex items-center justify-center shrink-0 tabular-nums">
                            {lvl.levelNumber}
                          </span>
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                              {isAr ? lvl.titleAr : lvl.titleEn}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                              {lvl.estimatedHours} {isAr ? 'ساعة تدريبية' : 'hours'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Features */}
                  <div className="mt-5 space-y-1.5">
                    {(isAr ? course.featuresAr : course.featuresEn).slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions & Pricing Anchor */}
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                      {isAr ? 'يبدأ من' : 'Starting from'}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-950 dark:text-white tabular-nums">
                      {formatPrice(course.basePriceUSD, currency, lang)}
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ms-1">
                        / {isAr ? 'حصة' : 'lesson'}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCourseForModal(course)}
                      className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
                    >
                      {isAr ? 'تفاصيل المنهج' : 'Syllabus'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsBookingModalOpen(true)}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 rounded-lg transition-all shadow-2xs whitespace-nowrap flex items-center gap-1.5"
                    >
                      <span>{isAr ? 'حصة تجريبية' : 'Free Trial'}</span>
                      {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
