import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const ConversionBanner: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden bg-slate-100/70 dark:bg-slate-900 text-slate-950 dark:text-white py-16 lg:py-20 border-b border-slate-200/90 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-white dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl">
          {/* Subtle gold glow in corner */}
          <div 
            aria-hidden="true" 
            className="absolute -top-20 -end-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Start: Value Proposition */}
            <div className="lg:col-span-8 text-start">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-3">
                {isAr ? 'الخطوة الأولى لأسرتك' : 'The First Step for Your Family'}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.25] [text-wrap:balance]">
                {isAr
                  ? 'جرب حصتك الأولى مجاناً مع معلم أزهري متخصص'
                  : 'Experience Your First Lesson Free With a Certified Scholar'}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {isAr
                  ? 'اختر التوقيت الذي يناسب أسرتك، ودع معلمنا يقيّم مستوى طفلك ويضع له خطة تعليمية مخصصة بدون أي التزام مالي.'
                  : 'Select a time that suits your household. Our tutor will diagnose your child’s level and build a tailored study plan with zero upfront commitment.'}
              </p>

              {/* Steps preview */}
              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-[11px]">1</span>
                  <span>{isAr ? 'حجز موعد خلال 60 ثانية' : 'Book in 60 seconds'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-[11px]">2</span>
                  <span>{isAr ? 'حصة تجريبية 30 دقيقة' : '30-min trial session'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-[11px]">3</span>
                  <span>{isAr ? 'تقرير ومقترح دراسي' : 'Report & custom plan'}</span>
                </div>
              </div>
            </div>

            {/* Right/End: CTA Action */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>{isAr ? 'احجز الحصة التجريبية الآن' : 'Book Free Trial Lesson'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isAr ? 'ضمان الرضا 100% أو استرجاع كامل' : '100% Satisfaction Guarantee'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
