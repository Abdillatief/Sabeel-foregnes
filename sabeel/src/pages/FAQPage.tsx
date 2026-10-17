import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { FAQItem } from '../types';
import { INITIAL_FAQS } from '../data/initialData';
import { Search, MessageCircle, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { lang } = useApp();
  const faqs: FAQItem[] = INITIAL_FAQS;
  const isAr = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelAr: 'جميع الأسئلة', labelEn: 'All Questions' },
    { id: 'booking', labelAr: 'الحصة التجريبية', labelEn: 'Trial Lessons' },
    { id: 'teachers', labelAr: 'المعلمون والسند', labelEn: 'Tutors & Sanad' },
    { id: 'scheduling', labelAr: 'المواعيد والتوقيت', labelEn: 'Scheduling' },
    { id: 'payment', labelAr: 'الرسوم وطرق الدفع', labelEn: 'Billing & Currency' },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        (isAr
          ? item.questionAr.includes(searchQuery) || item.answerAr.includes(searchQuery)
          : item.questionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answerEn.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [faqs, activeCategory, searchQuery, isAr]);

  return (
    <div className="py-12 lg:py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet />

      <Container size="default">
        {/* Header */}
        <SectionHeader
          kicker={isAr ? 'الأسئلة الشائعة وإجاباتها' : 'Frequently Asked Questions'}
          title={isAr ? 'كل ما تحتاج معرفته عن أكاديمية سبيل' : 'Everything You Need to Know About Sabeel'}
          subtitle={isAr 
            ? 'إجابات واضحة وشفافة حول كيفية سير الحصص، مؤهلات المعلمين، مواعيد الدروس، وضمانات الرضا الكامل.' 
            : 'Clear answers regarding class workflows, tutor qualifications, rescheduling, and our 100% money-back guarantee.'}
        />

        {/* Filter Tabs & Search */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute top-1/2 start-3.5 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث في الأسئلة الشائعة...' : 'Search questions & topics...'}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Component */}
        {filteredFaqs.length > 0 ? (
          <FAQAccordion items={filteredFaqs} />
        ) : (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-xl mx-auto">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {isAr ? 'لم نعثر على نتائج مطابقة لبحثك' : 'No matching questions found'}
            </p>
          </div>
        )}

        {/* Still Have Questions Box */}
        <div className="mt-16 max-w-2xl mx-auto text-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
            {isAr ? 'هل لديك سؤال آخر لم تجد إجابته هنا؟' : 'Still have a question?'}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {isAr
              ? 'مستشارونا الأكاديميون متاحون للرد المباشر على جميع استفساراتكم ومساعدتكم في اختيار المسار المناسب.'
              : 'Our academic advisors are ready to answer your questions and assist in choosing the ideal track.'}
          </p>
          <div className="mt-5 flex justify-center">
            <a
              href="https://wa.me/201000000000?text=Assalamu%20Alaikum%20I%20have%20a%20question"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'تحدث مباشرة مع مستشار أكاديمي' : 'Chat with an Advisor on WhatsApp'}</span>
            </a>
          </div>
        </div>

      </Container>
    </div>
  );
};
