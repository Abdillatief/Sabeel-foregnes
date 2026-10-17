import React from 'react';
import { useApp } from '../../context/AppContext';
import { PricingPlan } from '../../types';
import { formatPrice } from '../../services/currencyService';
import { Check, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';

export interface PricingCardProps {
  plan: PricingPlan;
  durationMinutes?: 30 | 60;
  onSelectPlan?: (plan: PricingPlan) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  durationMinutes = 30,
  onSelectPlan,
}) => {
  const { lang, currency, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const durationMultiplier = durationMinutes === 60 ? 1.8 : 1.0;
  const baseMonthly = plan.priceUSD * durationMultiplier;
  const perClassRate = baseMonthly / plan.sessionsCount;

  const handleSelect = () => {
    if (onSelectPlan) {
      onSelectPlan(plan);
    } else {
      setIsBookingModalOpen(true);
    }
  };

  return (
    <Card
      variant="default"
      className={`flex flex-col justify-between text-start relative transition-all ${
        plan.popular
          ? 'border-amber-400 dark:border-amber-400/80 ring-1 ring-amber-400/40 shadow-lg'
          : 'border-slate-200/80 dark:border-slate-800'
      }`}
    >
      {/* Popular Kicker */}
      {plan.popular && (
        <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-bold text-xs py-0.5 px-3 rounded-full shadow-sm whitespace-nowrap">
          {isAr ? (plan.badgeAr || 'الخيار الأكثر طلباً للأسر') : (plan.badgeEn || 'Most Popular for Families')}
        </div>
      )}

      <div>
        {/* Plan Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-slate-950 dark:text-white">
            {isAr ? plan.titleAr : plan.titleEn}
          </h3>
          <span className="text-xs font-semibold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-md">
            {isAr ? `${plan.sessionsCount} حصص شهرياً` : `${plan.sessionsCount} sessions/mo`}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed min-h-[38px]">
          {isAr ? plan.subtitleAr : plan.subtitleEn}
        </p>

        {/* Price Display */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums tracking-tight">
              {formatPrice(baseMonthly, currency, lang)}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isAr ? '/ شهرياً' : '/ month'}
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              {isAr ? `إجمالي ${plan.sessionsCount} حصة شهرياً` : `${plan.sessionsCount} total classes/mo`}
            </span>
            <span className="tabular-nums font-medium text-slate-700 dark:text-slate-300">
              {formatPrice(perClassRate, currency, lang)} {isAr ? '/ للحصة' : '/ class'}
            </span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          {(isAr ? plan.featuresAr : plan.featuresEn).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-snug">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button Action */}
      <div className="mt-8 pt-4">
        <button
          type="button"
          onClick={handleSelect}
          className={`w-full py-3.5 px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer ${
            plan.popular
              ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
              : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white'
          }`}
        >
          <span>{isAr ? 'ابدأ بحصة تجريبية مجانية' : 'Start with Free Trial'}</span>
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>

        <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2.5 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>{isAr ? 'بدون اشتراك تلقائي إجباري' : 'No automatic lock-in'}</span>
        </p>
      </div>
    </Card>
  );
};
