import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import { formatPrice } from '../../services/currencyService';
import { BookOpen, Clock, Check, ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { Card } from '../ui/Card';

export interface CourseCardProps {
  course: Course;
  onSelectDetails?: (course: Course) => void;
  onBookTrial?: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelectDetails,
  onBookTrial,
}) => {
  const { lang, currency, setSelectedCourseForModal, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const handleBook = () => {
    if (onBookTrial) {
      onBookTrial(course);
    } else {
      setSelectedCourseForModal(null);
      setIsBookingModalOpen(true);
    }
  };

  const handleDetails = () => {
    if (onSelectDetails) {
      onSelectDetails(course);
    } else {
      setSelectedCourseForModal(course);
    }
  };

  return (
    <Card className="flex flex-col justify-between text-start group">
      <div>
        {/* Unboxed Metadata Header */}
        <div className="flex items-center justify-between text-xs font-semibold tracking-wide text-sky-700 dark:text-sky-400 mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>{isAr ? `${course.levelsCount} مستويات منهجية` : `${course.levelsCount} Curricular Levels`}</span>
          </div>
          {course.popular && (
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              {isAr ? 'الأكثر طلباً' : 'Most Popular'}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-950 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          <Link to={`/courses/${course.slug || course.id}`}>
            {isAr ? course.titleAr : course.titleEn}
          </Link>
        </h3>

        {/* Description */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          {isAr ? course.shortDescAr : course.shortDescEn}
        </p>

        {/* Key Features */}
        <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          {(isAr ? course.featuresAr : course.featuresEn).slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-tight">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing and Actions Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
            {isAr ? 'يبدأ من' : 'Starting from'}
          </span>
          <span className="text-lg font-extrabold text-slate-950 dark:text-white tabular-nums">
            {formatPrice(course.basePriceUSD, currency, lang)}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ms-1">
              {isAr ? '/ حصة' : '/ class'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/courses/${course.slug || course.id}`}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
          >
            {isAr ? 'المنهج' : 'Syllabus'}
          </Link>

          <button
            type="button"
            onClick={handleBook}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{isAr ? 'حصة مجانية' : 'Free Trial'}</span>
            {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </Card>
  );
};
