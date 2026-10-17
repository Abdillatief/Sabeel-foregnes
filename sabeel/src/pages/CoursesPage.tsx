import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CourseCard } from '../components/common/CourseCard';
import { Course } from '../types';
import { Search, BookOpen, Filter } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { lang, courses, setSelectedCourseForModal, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelAr: 'جميع المسارات', labelEn: 'All Tracks' },
    { id: 'quran-reading', labelAr: 'القاعدة النورانية والقراءة', labelEn: 'Quran Reading' },
    { id: 'quran-memorization', labelAr: 'الحفظ والإجازة', labelEn: 'Memorization & Ijazah' },
    { id: 'tajweed', labelAr: 'أحكام التجويد والإتقان', labelEn: 'Tajweed Mastery' },
    { id: 'arabic-non-native', labelAr: 'اللغة العربية الفصحى', labelEn: 'Classical Arabic' },
    { id: 'islamic-studies', labelAr: 'الدراسات الإسلامية', labelEn: 'Islamic Studies' },
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchCategory = activeCategory === 'all' || c.category === activeCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        (isAr ? c.titleAr.includes(searchQuery) || c.shortDescAr.includes(searchQuery) : c.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || c.shortDescEn.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [courses, activeCategory, searchQuery, isAr]);

  return (
    <div className="py-12 lg:py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet />

      <Container size="default">
        {/* Header */}
        <SectionHeader
          kicker={isAr ? 'المناهج المعتمدة' : 'Accredited Curricula'}
          title={isAr ? 'مسارات تعليمية متدرجة بإشراف مشايخ الأزهر الشريف' : 'Structured Learning Pathways Led by Azhari Scholars'}
          subtitle={isAr 
            ? 'خطط دراسية فردية 1-on-1 مصممة لتناسب قدرات طفلك ووتيرة تعلمه، من الحرف الأول وحتى نيل الإجازة بالسند المتصل.' 
            : 'Personalized private curricula tailored to your child’s pace, from foundational phonetics to verified Ijazah certification.'}
        />

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute top-1/2 start-3.5 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث في الدورات والمناهج...' : 'Search courses & syllabus...'}
              className="w-full ps-10 pe-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelectDetails={(c) => setSelectedCourseForModal(c)}
                onBookTrial={() => setIsBookingModalOpen(true)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isAr ? 'لم يتم العثور على مسارات تطابق بحثك' : 'No courses match your search'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isAr ? 'جرّب البحث بكلمة مختلفة أو اختر تصنيفاً آخر.' : 'Try adjusting your filters or search keywords.'}
            </p>
          </div>
        )}

      </Container>
    </div>
  );
};
