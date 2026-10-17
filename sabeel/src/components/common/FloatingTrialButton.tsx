import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

export const FloatingTrialButton: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  return (
    <div className="fixed bottom-6 end-6 z-40 hidden sm:block">
      <button
        type="button"
        onClick={() => setIsBookingModalOpen(true)}
        className="group flex items-center gap-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs font-semibold border border-slate-800 dark:border-slate-200"
        aria-label={isAr ? 'احجز الحصة التجريبية المجانية' : 'Book Free Trial Lesson'}
      >
        <Calendar className="w-4 h-4 text-amber-400 dark:text-amber-600 shrink-0" />
        <span>{isAr ? 'احجز حصة تجريبية مجانية' : 'Book Free Trial'}</span>
        {isAr ? (
          <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
        ) : (
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        )}
      </button>
    </div>
  );
};
