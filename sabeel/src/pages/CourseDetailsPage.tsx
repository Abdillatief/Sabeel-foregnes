import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { formatPrice } from '../services/currencyService';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Clock, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Users, 
  Star,
  ChevronRight
} from 'lucide-react';

export const CourseDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { lang, courses, teachers, currency, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const course = courses.find((c) => c.slug === slug || c.id === slug) || courses[0];

  // Find teachers specialized in this course category
  const courseTeachers = teachers.filter((t) => 
    t.specialties.includes(course.category) || t.specialties.includes('quran-reading')
  ).slice(0, 2);

  return (
    <div className="py-10 lg:py-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet
        title={`${isAr ? course.titleAr : course.titleEn} | Sabeel Academy`}
        description={isAr ? course.shortDescAr : course.shortDescEn}
      />

      <Container size="default">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
          <Link to="/" className="hover:text-slate-950 dark:hover:text-white transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/courses" className="hover:text-slate-950 dark:hover:text-white transition-colors">
            {isAr ? 'المسارات' : 'Courses'}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">
            {isAr ? course.titleAr : course.titleEn}
          </span>
        </div>

        {/* Course Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Course Content (Left 8 Cols) */}
          <div className="lg:col-span-8 text-start space-y-10">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide mb-3">
                <BookOpen className="w-4 h-4" />
                <span>{isAr ? `${course.levelsCount} مستويات تدرجية` : `${course.levelsCount} Step-by-Step Levels`}</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span>{isAr ? 'إشراف أزهري مباشر' : 'Azhari Supervision'}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                {isAr ? course.titleAr : course.titleEn}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr ? course.fullDescAr : course.fullDescEn}
              </p>
            </div>

            {/* Key Features Pill-free Grid */}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                {isAr ? 'ما يميز دراسة هذا المسار في أكاديمية سبيل' : 'Program Highlights'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {(isAr ? course.featuresAr : course.featuresEn).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Breakdown by Levels */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mb-6">
                {isAr ? 'الخطة المنهجية للمستويات' : 'Curriculum & Level Breakdown'}
              </h2>

              <div className="space-y-4">
                {course.levels.map((lvl) => (
                  <div
                    key={lvl.levelNumber}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-start"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-sm flex items-center justify-center shrink-0">
                          {lvl.levelNumber}
                        </span>
                        <h3 className="text-base font-bold text-slate-950 dark:text-white">
                          {isAr ? lvl.titleAr : lvl.titleEn}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lvl.estimatedHours} {isAr ? 'ساعة تدريبية تقديرية' : 'Estimated Hours'}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ps-11">
                      {isAr ? lvl.descriptionAr : lvl.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Faculty Preview */}
            {courseTeachers.length > 0 && (
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800">
                <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white mb-4">
                  {isAr ? 'نخبة من معلمي هذا المسار' : 'Instructors for this Track'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {courseTeachers.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                    >
                      <img
                        src={t.photoUrl}
                        alt={isAr ? t.nameAr : t.nameEn}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <Link to={`/teachers/${t.id}`} className="text-sm font-bold text-slate-900 dark:text-white truncate block hover:text-sky-600">
                          {isAr ? t.nameAr : t.nameEn}
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {isAr ? t.titleAr : t.titleEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sticky Tuition Card (Right 4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 text-start">
            <Card className="border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 p-6 sm:p-7">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-2">
                {isAr ? 'الالتحاق بالمسار' : 'Track Enrollment'}
              </span>

              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-3xl font-extrabold text-slate-950 dark:text-white tabular-nums tracking-tight">
                  {formatPrice(course.basePriceUSD, currency, lang)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? '/ للحصة الفردية 1-on-1' : '/ private class'}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {isAr
                  ? 'يبدأ طفلك بحصة استكشافية مجانية لتقييم مستواه واختيار الخطة والجدول الأنسب له.'
                  : 'Your child begins with a free diagnostic lesson to evaluate their proficiency and customize their study schedule.'}
              </p>

              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold rounded-xl text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-3"
              >
                <span>{isAr ? 'احجز الحصة التجريبية لهذا المسار' : 'Book Free Trial for Track'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <a
                href="https://wa.me/201000000000?text=Assalamu%20Alaikum%20Inquiry%20About%20Course"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>{isAr ? 'استفسر عبر واتساب' : 'Inquire via WhatsApp'}</span>
              </a>

              {/* Guarantees checklist */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isAr ? 'بدون بطاقة ائتمانية للحصة الأولى' : 'No credit card for initial session'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isAr ? 'مرونة كاملة في استبدال المعلم' : 'Switch tutors anytime easily'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isAr ? 'شهادة إتمام معتمدة بعد كل مستوى' : 'Accredited certificate per level'}</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </Container>
    </div>
  );
};
