import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { TeacherCard } from '../components/common/TeacherCard';
import { Search, ShieldCheck, Users, Award } from 'lucide-react';

export const TeachersPage: React.FC = () => {
  const { lang, teachers, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchGender = genderFilter === 'all' || t.gender === genderFilter;
      const matchSearch =
        searchQuery.trim() === '' ||
        (isAr ? t.nameAr.includes(searchQuery) || t.titleAr.includes(searchQuery) : t.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || t.titleEn.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchGender && matchSearch;
    });
  }, [teachers, genderFilter, searchQuery, isAr]);

  return (
    <div className="py-12 lg:py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet />

      <Container size="default">
        {/* Header */}
        <SectionHeader
          kicker={isAr ? 'نخبة مشايخ ومعلمات الأزهر الشريف' : 'Accredited Azhari Faculty'}
          title={isAr ? 'معلمون ومعلمات بالإسناد المتصل وخبرة التدريس للغرب' : 'Certified Scholars with Continuous Sanad & Diaspora Experience'}
          subtitle={isAr 
            ? 'نختار بدقة أعلى 3% فقط من الكفاءات الأزهرية المجازة بالقراءات المتواترة، مع توفير معلمات متخصصات للبنات والسيدات.' 
            : 'We admit only the top 3% of Azhari reciters with authentic Sanad, offering certified female scholars for sisters and young girls.'}
        />

        {/* Filter Bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          
          {/* Gender Filter Buttons */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', labelAr: 'جميع المعلمين والمعلمات', labelEn: 'All Faculty' },
              { id: 'male', labelAr: 'مشايخ (ذكور)', labelEn: 'Male Scholars' },
              { id: 'female', labelAr: 'معلمات (إناث)', labelEn: 'Female Scholars' },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setGenderFilter(btn.id as 'all' | 'male' | 'female')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  genderFilter === btn.id
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isAr ? btn.labelAr : btn.labelEn}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute top-1/2 start-3.5 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث باسم المعلم أو التخصص...' : 'Search tutor name or degree...'}
              className="w-full ps-10 pe-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onBookTrial={() => setIsBookingModalOpen(true)}
            />
          ))}
        </div>

      </Container>
    </div>
  );
};
