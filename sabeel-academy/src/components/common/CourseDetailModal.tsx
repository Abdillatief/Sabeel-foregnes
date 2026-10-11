import React from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import { formatPrice } from '../../services/currencyService';
import { 
  X, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles, 
  Layers, 
  Award,
  ChevronRight
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 end-4 p-2 text-slate-400 hover:text-white rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>

          {course.badgeAr && (
            <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-300/30 text-[11px] font-bold rounded-full mb-3">
              {isAr ? course.badgeAr : course.badgeEn}
            </span>
          )}

          <h2 className="text-2xl font-black text-white pr-8">
            {isAr ? course.titleAr : course.titleEn}
          </h2>

          <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
            {isAr ? course.shortDescAr : course.shortDescEn}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {isAr ? 'عن الدورة والمنهج:' : 'About This Curriculum:'}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {isAr ? course.fullDescAr : course.fullDescEn}
            </p>
          </div>

          {/* Levels Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-500" />
              <span>{isAr ? 'المستويات الدراسية المعتمدة:' : 'Curriculum Levels:'}</span>
            </h4>
            <div className="space-y-3">
              {course.levels.map(lvl => (
                <div
                  key={lvl.levelNumber}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 transition"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-slate-900">
                      {isAr ? lvl.titleAr : lvl.titleEn}
                    </span>
                    <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{lvl.estimatedHours} {isAr ? 'ساعة تدريبية' : 'Hours'}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isAr ? lvl.descriptionAr : lvl.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {isAr ? 'مميزات هذا المسار:' : 'Key Course Highlights:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(isAr ? course.featuresAr : course.featuresEn).map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with CTA */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">
              {isAr ? 'تبدأ الباقات من:' : 'Plans starting from:'}
            </span>
            <span className="text-xl font-black text-slate-900">
              {priceFormatted}
              <span className="text-xs font-normal text-slate-500"> / {isAr ? 'شهرياً' : 'month'}</span>
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookTrial(course);
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isAr ? 'حجز حصة تجريبية لهذه الدورة' : 'Book Free Trial for this Course'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
