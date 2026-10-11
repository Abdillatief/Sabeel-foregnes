import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, CourseCategory } from '../../types';
import { formatPrice } from '../../services/currencyService';
import { 
  BookOpen, 
  Crown, 
  Sparkles, 
  Globe, 
  HeartHandshake, 
  Compass, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight
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
    { id: 'all', labelAr: 'جميع الدورات', labelEn: 'All Courses' },
    { id: 'quran', labelAr: 'القرآن والتجويد', labelEn: 'Quran & Tajweed' },
    { id: 'arabic', labelAr: 'اللغة العربية واللهجات', labelEn: 'Arabic & Dialects' },
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

  const getCourseIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-sky-500" />;
      case 'Crown': return <Crown className="w-6 h-6 text-amber-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-sky-400" />;
      case 'Globe': return <Globe className="w-6 h-6 text-indigo-500" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-500" />;
      case 'Compass': return <Compass className="w-6 h-6 text-emerald-500" />;
      default: return <BookOpen className="w-6 h-6 text-sky-500" />;
    }
  };

  const filtered = getFilteredCourses();

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sky-600 font-bold text-xs uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            {isAr ? 'مناهج معتمدة عالمياً' : 'Accredited Curricula'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            {isAr ? 'الدورات والمسارات التعليمية التخصصية' : 'Comprehensive Islamic & Arabic Courses'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'صممت مناهجنا على يد خبراء التعليم بالأزهر الشريف لتناسب كافة الأعمار والمستويات، من التهجئة الأولى حتى إتقان القراءات العشر.'
              : 'Designed by senior Azhar educators for all age groups, from first Arabic syllables to advanced Ten Qira\'at mastery.'}
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {isAr ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(course => {
            const priceFormatted = formatPrice(course.basePriceUSD * 8, currency, lang);
            return (
              <div
                key={course.id}
                className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
                      {getCourseIcon(course.iconName)}
                    </div>

                    {course.badgeAr && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {isAr ? course.badgeAr : course.badgeEn}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition">
                      {isAr ? course.titleAr : course.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {isAr ? course.shortDescAr : course.shortDescEn}
                    </p>
                  </div>

                  {/* Level & duration badges */}
                  <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-600 font-semibold border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      <span>{course.levelsCount} {isAr ? 'مستويات دراسية' : 'Levels'}</span>
                    </span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">1-on-1 Private</span>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-2">
                    {(isAr ? course.featuresAr : course.featuresEn).slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom / Price & CTAs */}
                <div className="p-6 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {isAr ? 'الباقة الشهرية من:' : 'Monthly plan from:'}
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      {priceFormatted}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCourseForModal(course)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition"
                    >
                      {isAr ? 'التفاصيل' : 'Details'}
                    </button>
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 shadow transition flex items-center gap-1"
                    >
                      <span>{isAr ? 'تجربة مجانية' : 'Free Trial'}</span>
                      <ChevronRight className="w-3 h-3 rtl:rotate-180" />
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
