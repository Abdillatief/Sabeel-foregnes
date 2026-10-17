import React from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import { formatPrice } from '../../services/currencyService';
import { 
  X, 
  Clock, 
  Check, 
  Layers, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onBookTrial: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ 
  course, 
  onClose, 
  onBookTrial 
}) => {
  const { lang, currency } = useApp();
  if (!course) return null;

  const isAr = lang === 'ar';
  const priceFormatted = formatPrice(course.basePriceUSD * 8, currency, lang);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-slate-950 text-white relative border-b border-slate-800 text-start">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 end-5 p-2 text-slate-400 hover:text-white rounded-xl transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-xs font-semibold text-sky-400 tracking-wide mb-2">
            {isAr ? course.badgeAr : course.badgeEn}
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white pe-8">
            {isAr ? course.titleAr : course.titleEn}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
            {isAr ? course.shortDescAr : course.shortDescEn}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-start">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              {isAr ? 'عن هذا المسار التعليمي' : 'About This Curriculum'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              {isAr ? course.fullDescAr : course.fullDescEn}
            </p>
          </div>

          {/* Levels Breakdown */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{isAr ? 'المراحل والمستويات الدراسية المعتمدة' : 'Accredited Milestone Progression'}</span>
            </h4>
            <div className="space-y-3">
              {course.levels.map((lvl) => (
                <div
                  key={lvl.levelNumber}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white">
                      {isAr ? lvl.titleAr : lvl.titleEn}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 tabular-nums">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lvl.estimatedHours} {isAr ? 'ساعة تدريبية' : 'Hours'}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isAr ? lvl.descriptionAr : lvl.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              {isAr ? 'مميزات المسار' : 'Curriculum Highlights'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(isAr ? course.featuresAr : course.featuresEn).map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with CTA */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-start">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              {isAr ? 'يبدأ الاشتراك من:' : 'Starting tuition:'}
            </span>
            <span className="text-xl font-extrabold text-slate-950 dark:text-white tabular-nums">
              {priceFormatted}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ms-1">
                / {isAr ? 'شهرياً (8 حصص)' : 'month'}
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onBookTrial(course);
            }}
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <span>{isAr ? 'حجز حصة تجريبية لهذه الدورة' : 'Book Free Trial for This Track'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
};
