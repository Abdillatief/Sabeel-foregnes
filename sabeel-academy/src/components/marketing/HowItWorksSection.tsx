import React from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarCheck, Users, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const steps = [
    {
      stepNum: '01',
      icon: <CalendarCheck className="w-8 h-8 text-sky-500" />,
      titleAr: 'احجز حصتك التجريبية مجاناً',
      titleEn: 'Book Your Free Trial (100% Free)',
      descAr: 'اختر وقتك المفضل والمستوى بحسب منطقتك الزمنية في أقل من دقيقة واحدة، بدون أي بطاقة بنكية.',
      descEn: 'Select your preferred time slot & level based on your local timezone in under a minute without any credit card.',
    },
    {
      stepNum: '02',
      icon: <Users className="w-8 h-8 text-amber-500" />,
      titleAr: 'التقِ بشيخك الأزهري المعتمد',
      titleEn: 'Meet Your Certified Sheikh',
      descAr: 'احضر حصة مباشرة 1-on-1 لمدة 30 دقيقة يتم خلالها تقييم مستواك وتحديد خطة دراسية تناسب هدفك.',
      descEn: 'Join a live 30-minute 1-on-1 session to assess your recitation level and establish a tailored curriculum roadmap.',
    },
    {
      stepNum: '03',
      icon: <GraduationCap className="w-8 h-8 text-emerald-500" />,
      titleAr: 'اختر الباقة المناسبة وابدأ التعلم',
      titleEn: 'Choose Your Plan & Flourish',
      descAr: 'ثبت مواعيدك الأسبوعية المنتظمة مع نفس المعلم، وتابع تقدمك مع شهادات معتمدة وتقارير حية.',
      descEn: 'Lock in your weekly schedule with your dedicated tutor and track continuous mastery with accredited certificates.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {isAr ? 'خطوات بسيطة وسريعة' : 'Easy 3 Steps'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            {isAr ? 'كيف تبدأ التعلم في أكاديمية سبيل؟' : 'How It Works: Getting Started is Effortless'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'ثلاث خطوات سهلة تفصلك أنت وأبنائك عن البدء في حفظ وتجويد القرآن الكريم وقراءة العربية بطلاقة.'
              : 'Three simple steps connect you and your loved ones to authentic Quranic memorization and Arabic eloquence.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-xl transition-all duration-300 relative space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {st.icon}
                </div>
                <span className="font-mono text-3xl font-black text-slate-200">
                  {st.stepNum}
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-slate-900">
                {isAr ? st.titleAr : st.titleEn}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr ? st.descAr : st.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Central CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-xl transition transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isAr ? 'احجز حصتك التجريبية الآن' : 'Start With Step 1: Free Trial'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
