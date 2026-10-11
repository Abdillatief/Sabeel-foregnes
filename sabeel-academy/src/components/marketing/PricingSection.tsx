import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../services/currencyService';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Clock, 
  RefreshCw,
  Gift
} from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { lang, currency, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const plans = [
    {
      id: 'starter',
      nameAr: 'باقة البداية (Starter)',
      nameEn: 'Starter Plan',
      descAr: 'حصة واحدة أسبوعياً لتأسيس الأطفال والمبتدئين',
      descEn: '1 session per week for beginners and foundational pace',
      sessionsCount: 4,
      durationMin: 45,
      priceUSD: 42,
      popular: false,
      featuresAr: [
        '4 حصص خاصة 1-on-1 شهرياً (45 دقيقة)',
        'معلم أزهري متخصص ومجاز',
        'مرونة تعويض حصة واحدة شهرياً',
        'تقارير أسبوعية لولي الأمر',
        'تسجيل الحصص للمراجعة',
      ],
      featuresEn: [
        '4 private 1-on-1 sessions monthly (45 mins each)',
        'Certified Azhari native tutor',
        '1 session reschedule allowance per month',
        'Weekly student progress reports',
        'Session recordings for practice',
      ],
    },
    {
      id: 'standard',
      nameAr: 'الباقة المتميزة (الأكثر اختياراً)',
      nameEn: 'Standard Plan (Most Popular)',
      descAr: 'حصتان أسبوعياً للتقدم السريع وتثبيت الحفظ والتجويد',
      descEn: '2 sessions per week for steady progress & Tajweed mastery',
      sessionsCount: 8,
      durationMin: 45,
      priceUSD: 76,
      popular: true,
      badgeAr: 'الأفضل قيمة وتطوراً',
      badgeEn: 'Best Value for Fluency',
      featuresAr: [
        '8 حصص خاصة 1-on-1 شهرياً (45 دقيقة)',
        'تثبيت نفس المعلم والمواعيد المفضلة',
        'مرونة تعويض حصتين شهرياً',
        'متابعة حية عبر لوحة الطالب وولي الأمر',
        'مكتبة كتب ومواد صوتية تفاعلية مجاناً',
        'شهادة إتمام معتمدة مع رمز تحقق QR',
      ],
      featuresEn: [
        '8 private 1-on-1 sessions monthly (45 mins each)',
        'Dedicated tutor & locked preferred time slots',
        '2 sessions reschedule allowance per month',
        'Live parent portal & real-time monitoring',
        'Free interactive curriculum library & audio packs',
        'Accredited Certificate with live QR verification',
      ],
    },
    {
      id: 'intensive',
      nameAr: 'باقة الحفظ المكثف (Intensive)',
      nameEn: 'Intensive Hifz Plan',
      descAr: '3 إلى 4 حصص أسبوعياً لختم القرآن الكريم ونيل الإجازة',
      descEn: '3-4 sessions per week for full Quran memorization & Ijazah',
      sessionsCount: 14,
      durationMin: 45,
      priceUSD: 119,
      popular: false,
      badgeAr: 'برنامج الإجازة وختم المصحف',
      badgeEn: 'Ijazah & Fast-Track',
      featuresAr: [
        '14 حصة خاصة 1-on-1 شهرياً (45 دقيقة)',
        'أولوية قصوى مع كبار مشايخ المقارئ المصرية',
        'مرونة كاملة في تعديل المواعيد',
        'إشراف مباشر من رئيس المقرأة',
        'خصم 15% إضافي للطفل الثاني من نفس الأسرة',
        'تأهيل كامل لنيل الإجازة بالسند المتصل',
      ],
      featuresEn: [
        '14 private 1-on-1 sessions monthly (45 mins each)',
        'Highest priority with Senior Azhari Reciters',
        'Unlimited flexible rescheduling',
        'Direct supervision from Chief of Recitations',
        '15% additional sibling family discount',
        'Full qualification pathway for authentic Sanad Ijazah',
      ],
    },
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-sky-600 font-bold text-xs uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            {isAr ? 'أسعار شفافة ومناسبة' : 'Transparent Pricing'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            {isAr ? 'باقات اشتراك شهرية مرنة تناسب أسرتك' : 'Flexible Monthly Plans for Every Family'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'ادفع بالعملة المحلية لبلدك، بدون أي التزامات طويلة الأجل، مع إمكانية تجربة حصة كاملة مجاناً قبل دفع أي مبلغ.'
              : 'Pay in your local currency, no long-term contracts, with a full 100% free trial before any payment.'}
          </p>

          {/* Family Discount Notice */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            <Gift className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              {isAr
                ? 'خصم عائلي خاص: احصل على خصم 15% إضافي عند تسجيل أكثر من طالب من نفس الأسرة'
                : 'Family Benefit: Get an extra 15% sibling discount when enrolling multiple students'}
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map(plan => {
            const priceFormatted = formatPrice(plan.priceUSD, currency, lang);
            const pricePerSession = formatPrice(Math.round(plan.priceUSD / plan.sessionsCount), currency, lang);

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10 border-2 border-sky-400'
                    : 'bg-white text-slate-900 shadow-sm border border-slate-200 hover:border-sky-300'
                }`}
              >
                {/* Popular Ribbon */}
                {plan.badgeAr && (
                  <div className="absolute -top-3.5 start-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                      {isAr ? plan.badgeAr : plan.badgeEn}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-black">{isAr ? plan.nameAr : plan.nameEn}</h3>
                  <p className={`text-xs mt-1.5 ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                    {isAr ? plan.descAr : plan.descEn}
                  </p>

                  {/* Price Block */}
                  <div className="my-6 pt-4 border-t border-slate-200/20">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight">
                        {priceFormatted}
                      </span>
                      <span className={`text-xs font-semibold ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                        / {isAr ? 'شهرياً' : 'month'}
                      </span>
                    </div>
                    <span className={`text-[11px] font-medium block mt-1 ${plan.popular ? 'text-sky-300' : 'text-sky-600'}`}>
                      {pricePerSession} {isAr ? 'فقط لكل حصة خاصة' : 'per private session'}
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 pt-2">
                    {(isAr ? plan.featuresAr : plan.featuresEn).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular ? 'bg-sky-500/20 text-sky-400' : 'bg-emerald-100 text-emerald-600'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={plan.popular ? 'text-slate-200' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/25'
                        : 'bg-slate-900 hover:bg-sky-600 text-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{isAr ? 'ابدأ بحصة تجريبية مجانية' : 'Start with Free Trial'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                {isAr ? 'ضمان الرضا الكامل 100% أو استرجاع الرسوم' : '100% Satisfaction or Full Refund Guarantee'}
              </h4>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'إذا لم تكن راضياً تماماً خلال أول أسبوعين، يمكنك استرداد الرسوم المتبقية دون أي تعقيد.'
                  : 'If you are not delighted within the first two weeks, get a 100% refund on unutilized classes, no questions asked.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="text-xs font-bold text-sky-600 hover:underline whitespace-nowrap"
          >
            {isAr ? 'حجز الحصة التجريبية أولاً ←' : 'Try Free Lesson First →'}
          </button>
        </div>
      </div>
    </section>
  );
};
