import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PricingCard } from '../components/common/PricingCard';
import { CURRENCIES } from '../services/currencyService';
import { Currency, PricingPlan } from '../types';
import { INITIAL_PRICING_PLANS } from '../data/initialData';
import { ShieldCheck, Heart, Users, Clock, Check } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { lang, currency, setCurrency, setIsBookingModalOpen } = useApp();
  const pricingPlans: PricingPlan[] = INITIAL_PRICING_PLANS;
  const isAr = lang === 'ar';

  const [duration, setDuration] = useState<30 | 60>(30);

  return (
    <div className="py-12 lg:py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet />

      <Container size="default">
        {/* Header */}
        <SectionHeader
          kicker={isAr ? 'رسوم شفافة بدون التزام' : 'Transparent Tuition'}
          title={isAr ? 'استثمار مبارك في تعليم أطفالك القرآن الكريم' : 'A Blessed Investment in Your Children’s Quranic Education'}
          subtitle={isAr 
            ? 'باقات شهرية مرنة تناسب جميع الأسر المسلمة حول العالم، مع ضمان استرجاع كامل الرسوم بعد أول حصة إن لم تكن راضياً تماماً.' 
            : 'Flexible monthly family subscriptions with zero hidden fees and a 100% money-back guarantee after the first class.'}
        />

        {/* Controls: Duration Switcher + Currency Selector */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Duration Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setDuration(30)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                duration === 30
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {isAr ? '30 دقيقة (الموصى به للأطفال)' : '30 Minutes (Recommended for Kids)'}
            </button>
            <button
              type="button"
              onClick={() => setDuration(60)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                duration === 60
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {isAr ? '60 دقيقة (للكبار والحفظ المكثف)' : '60 Minutes (Adults & Intensive Hifz)'}
            </button>
          </div>

          {/* Currency Pill */}
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <span>{isAr ? 'العملة:' : 'Currency:'}</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              aria-label={isAr ? 'اختر العملة' : 'Select currency'}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {(Object.keys(CURRENCIES) as Currency[]).map((cur) => (
                <option key={cur} value={cur}>
                  {cur} ({CURRENCIES[cur].symbol}) - {isAr ? CURRENCIES[cur].nameAr : CURRENCIES[cur].nameEn}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-16">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              durationMinutes={duration}
              onSelectPlan={() => setIsBookingModalOpen(true)}
            />
          ))}
        </div>

        {/* Family Sibling Discount Banner */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 text-start">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-sky-950 dark:text-sky-100">
                {isAr ? 'خصم الإخوة والأسرة (15% للطفل الثاني وما بعده)' : 'Family & Sibling Discount (15% off for 2nd+ child)'}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
                {isAr
                  ? 'نشجع العائلات على إلحاق جميع أبنائها بحلقات القرآن؛ يتم تطبيق خصم 15% تلقائياً عند تسجيل أكثر من طالب من نفس الأسرة.'
                  : 'We encourage families to learn together. A 15% discount applies automatically for siblings enrolled from the same household.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsBookingModalOpen(true)}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors shrink-0 whitespace-nowrap"
          >
            {isAr ? 'تفعيل خصم الأسرة' : 'Claim Family Plan'}
          </button>
        </div>

        {/* Money Back Guarantee Banner */}
        <div className="max-w-3xl mx-auto text-center border-t border-slate-200/80 dark:border-slate-800 pt-10">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">
            {isAr ? 'ضمان الرضا الكامل 100% أو استرجاع الرسوم' : '100% Satisfaction Guarantee'}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            {isAr
              ? 'إذا لم تكن راضياً تماماً عن مستوى المعلم أو أسلوب التدريس بعد الحصة الأولى المدفوعة، يمكنك استرداد كامل المبلغ فوراً بدون أي تعقيد.'
              : 'If you are not completely delighted with your tutor after your first paid lesson, we will refund 100% of your tuition immediately, no questions asked.'}
          </p>
        </div>

      </Container>
    </div>
  );
};
