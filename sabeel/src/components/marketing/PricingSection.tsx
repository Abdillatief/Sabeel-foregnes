import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice, CURRENCIES } from '../../services/currencyService';
import { Currency } from '../../types';
import { 
  Check, 
  ShieldCheck, 
  Users, 
  Clock, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { lang, currency, setCurrency, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const plans = [
    {
      id: 'starter',
      nameAr: 'باقة التأسيس',
      nameEn: 'Starter Foundation',
      descAr: 'حصة واحدة أسبوعياً للأطفال المبتدئين والجدول الهادئ',
      descEn: '1 session per week for beginners and steady pacing',
      sessionsCount: 4,
      durationMin: 45,
      priceUSD: 42,
      popular: false,
      featuresAr: [
        '4 حصص خاصة 1-on-1 شهرياً (45 دقيقة)',
        'معلم أزهري متخصص مجاز بالسند',
        'مرونة تعويض حصة واحدة شهرياً عند الطوارئ',
        'تقرير شهري يرصد الحفظ ومخارج الحروف',
        'تسجيل الحصة بالصوت للمراجعة المنزلية',
      ],
      featuresEn: [
        '4 private 1-on-1 sessions monthly (45 mins each)',
        'Certified Azhari native tutor with Sanad',
        '1 session emergency reschedule allowance',
        'Monthly progress and phonetics report',
        'Audio recordings for home review',
      ],
    },
    {
      id: 'standard',
      nameAr: 'باقة الانتظام والمداومة',
      nameEn: 'Standard Mastery',
      descAr: 'حصتان أسبوعياً للتقدم السريع وتثبيت التجويد والحفظ',
      descEn: '2 sessions per week for steady retention and Tajweed mastery',
      sessionsCount: 8,
      durationMin: 45,
      priceUSD: 76,
      popular: true,
      badgeAr: 'الخيار الأكثر اختياراً للعائلات',
      badgeEn: 'Most Popular Choice for Families',
      featuresAr: [
        '8 حصص خاصة 1-on-1 شهرياً (45 دقيقة)',
        'تثبيت نفس الشيخ والمواعيد المفضلة',
        'مرونة تعويض حصتين شهرياً بدون أي رسوم',
        'تقرير أسبوعي دقيق لولي الأمر',
        'مكتبة كتب وقواعد نورانية رقمية مجانية',
        'شهادة إتمام رسمية مع رمز تحقق رقمي QR',
      ],
      featuresEn: [
        '8 private 1-on-1 sessions monthly (45 mins each)',
        'Dedicated mentor & locked preferred timeslots',
        '2 sessions emergency reschedule allowance',
        'Weekly detailed parent progress updates',
        'Free interactive digital curriculum library',
        'Verifiable official QR-coded certificate',
      ],
    },
    {
      id: 'intensive',
      nameAr: 'باقة الحفظ المكثف والإجازة',
      nameEn: 'Intensive Hifz & Ijazah',
      descAr: '4 حصص أسبوعياً للراغبين في ختم المصحف ونيل السند',
      descEn: '4 sessions per week for full Quran memorization and Sanad',
      sessionsCount: 16,
      durationMin: 45,
      priceUSD: 144,
      popular: false,
      featuresAr: [
        '16 حصة خاصة 1-on-1 شهرياً (45 دقيقة)',
        'شيخ مجاز بالقراءات العشر من الأزهر الشريف',
        'جدول يومي مكثف للحفظ والمراجعة القريبة والبعيدة',
        'مرونة تعويض كاملة للمواعيد طوال الشهر',
        'جلسات إرشادية فردية مع ولي الأمر أسبوعياً',
        'تأهيل مباشر للحصول على الإجازة بالسند المتصل',
      ],
      featuresEn: [
        '16 private 1-on-1 sessions monthly (45 mins each)',
        'Senior Ten Qira\'at scholar from Al-Azhar',
        'Structured daily retention & revision schedule',
        'Unlimited flexible rescheduling options',
        'Weekly parent-mentor consult sessions',
        'Direct qualification for continuous Sanad Ijazah',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl text-start">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide mb-2">
              <span>{isAr ? 'الاشتراكات الشهرية' : 'Transparent Tuition'}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>{isAr ? 'بدون عقود ملزمة' : 'Cancel Anytime'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight [text-wrap:balance]">
              {isAr ? 'باقات دراسية ميسرة، تبدأ بحصة تجريبية مجانية 100%' : 'Accessible Plans with a 100% Free Trial Lesson First'}
            </h2>
            
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'لا نطلب أي دفع مسبق قبل الحصة التجريبية. جرب بنفسك ثم اختر الباقة الملائمة لجدولك.'
                : 'Zero upfront commitment. Experience the free diagnostic lesson first, then select the plan that fits your family.'}
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs self-start md:self-auto overflow-x-auto max-w-full">
            <span className="text-xs text-slate-400 px-2 font-medium">{isAr ? 'العملة:' : 'Currency:'}</span>
            {(['USD', 'GBP', 'EUR', 'SAR', 'AED', 'QAR', 'KWD', 'EGP'] as Currency[]).map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => setCurrency(cur)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  currency === cur
                    ? 'bg-slate-950 dark:bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 p-7 sm:p-8 ${
                  isPopular
                    ? 'border-sky-500/80 dark:border-sky-500 shadow-lg ring-1 ring-sky-500/20 relative'
                    : 'border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Unboxed top label */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-950 dark:text-white">
                      {isAr ? plan.nameAr : plan.nameEn}
                    </span>
                    {isPopular && (
                      <span className="font-semibold text-sky-700 dark:text-sky-400">
                        {isAr ? plan.badgeAr : plan.badgeEn}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums tracking-tight">
                      {formatPrice(plan.priceUSD, currency, lang)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      / {isAr ? 'شهرياً' : 'month'}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {isAr ? plan.descAr : plan.descEn}
                  </p>

                  <div className="mt-4 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between tabular-nums">
                    <span>{plan.sessionsCount} {isAr ? 'حصص شهرياً' : 'classes/mo'}</span>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                    <span>{plan.durationMin} {isAr ? 'دقيقة للحصة' : 'mins/class'}</span>
                  </div>

                  {/* Features list */}
                  <div className="mt-6 space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {(isAr ? plan.featuresAr : plan.featuresEn).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(true)}
                    className={`w-full py-3.5 px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                        : 'bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100'
                    }`}
                  >
                    <span>{isAr ? 'احجز الحصة التجريبية أولاً' : 'Book Free Trial First'}</span>
                    {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Trust & Guarantee Callouts */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-start">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-950 dark:text-white block">
                {isAr ? 'ضمان استرداد 100% بدون أي تعقيد' : '100% Risk-Free Money-Back Guarantee'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block leading-relaxed">
                {isAr 
                  ? 'إذا لم تكن راضياً تماماً بعد الحصة الأولى المدفوعة، نسترجع لك كامل المبلغ فوراً.' 
                  : 'If you are not fully satisfied after your first paid lesson, we issue an immediate full refund.'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-950 dark:text-white block">
                {isAr ? 'خصم العائلة والأشقاء (15% إضافي)' : '15% Family & Sibling Discount'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block leading-relaxed">
                {isAr 
                  ? 'خصم دائم لجميع الإخوة الإضافيين المسجلين في المنصة لدعم الأسر المسلمة.' 
                  : 'Automatic permanent discount applied when enrolling siblings to support diaspora families.'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
