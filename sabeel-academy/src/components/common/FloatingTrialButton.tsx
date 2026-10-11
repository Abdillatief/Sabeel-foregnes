import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Sparkles } from 'lucide-react';

export const FloatingTrialButton: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  return (
    <div className="fixed bottom-6 end-6 z-50">
      <button
        onClick={() => setIsBookingModalOpen(true)}
        className="group relative flex items-center gap-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20"
        aria-label={isAr ? 'احجز الحصة التجريبية' : 'Book Free Trial'}
      >
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div className="text-start">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-sky-100 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{isAr ? 'مجانية 100%' : '100% Free'}</span>
          </div>
          <div className="text-sm font-extrabold text-white">
            {isAr ? 'احجز الحصة التجريبية' : 'Book Free Trial'}
          </div>
        </div>
      </button>
    </div>
  );
};
