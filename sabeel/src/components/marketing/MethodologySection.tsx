import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Check, 
  ShieldCheck, 
  Heart, 
  Clock, 
  Award, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      titleAr: 'الجلسة الاستكشافية وتحديد المستوى الدقيق',
      titleEn: 'Diagnostic Assessment Session (30 Mins)',
      descAr: 'حصة فردية مجانية بالكامل مدتها 30 دقيقة مع شيخ أزهري معتمد، يتم فيها تقييم مخارج الحروف، التجويد، ومستوى الحفظ، وتحديد نقطة الانطلاق المثالية.',
      descEn: 'A 100% free private 30-minute 1-on-1 session with a certified Azhari mentor to evaluate articulation phonetics, recitation accuracy, and current retention.',
    },
    {
      num: '02',
      titleAr: 'تصميم الخطة الفردية وجدول المواعيد المرن',
      titleEn: 'Personalized Roadmap & Timezone Matching',
      descAr: 'بناء خطة دراسية مخصصة تناسب عمر الطالب وسرعة استيعابه ومواعيد دراسته، مع تحديد الأيام والأوقات الملائمة لمنطقتكم الزمنية في أي مكان بالعالم.',
      descEn: 'Crafting a customized syllabus calibrated to the student’s learning pace, school hours, and local timezone across North America, Europe, or the Gulf.',
    },
    {
      num: '03',
      titleAr: 'الحصص التفاعلية المباشرة 1-on-1 بالصوت والصورة',
      titleEn: 'Interactive 1-on-1 Live Private Instruction',
      descAr: 'غرفة تعليمية رقمية خاصة وآمنة تماماً تجمع الطالب بالمعلم وجهاً لوجه، مع سبورة إلكترونية تفاعلية ومصحف مرمز رقمياً لتصحيح النطق لحظة بلحظة.',
      descEn: 'A secure private classroom with digital interactive whiteboards and colored Mushaf display for real-time phonetic feedback and gentle correction.',
    },
    {
      num: '04',
      titleAr: 'تقارير المتابعة الأسبوعية والشهادات المعتمدة',
      titleEn: 'Weekly Parent Reports & Accredited Certificates',
      descAr: 'يتلقى ولي الأمر تقريراً مفصلاً بعد كل أسبوع يرصد الحفظ الجديد ونقاط التحسن، مع منح الطالب شهادة إتمام رسمية برمز تحقق رقمي QR بعد كل مستوى.',
      descEn: 'Parents receive comprehensive weekly progress updates detailing attendance and retention, accompanied by verifiable QR-coded certificates upon milestone completion.',
    },
  ];

  const guarantees = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      titleAr: 'خصوصية وأمان تام للعائلات',
      titleEn: 'Strict Family Privacy & Safety',
      descAr: 'حصص فردية مغلقة بدون أي غرباء، مع التزام بأعلى معايير الأمان الرقمي.',
      descEn: 'Closed 1-on-1 private rooms with complete safeguarding standards.',
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      titleAr: 'طاقم معلمات فضليات للفتيات',
      titleEn: 'Dedicated Female Faculty',
      descAr: 'معلمات أزهريات مؤهلات لتعليم الأخوات والفتيات والأطفال الصغار.',
      descEn: 'Certified female scholars dedicated to sisters and young children.',
    },
    {
      icon: <Clock className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      titleAr: 'مرونة كاملة في تعويض المواعيد',
      titleEn: 'No-Fee Rescheduling Flexibility',
      descAr: 'إمكانية إعادة جدولة أي حصة طارئة بكل سهولة دون خصم من رصيدكم.',
      descEn: 'Reschedule any missed emergency session smoothly without penalties.',
    },
    {
      icon: <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      titleAr: 'إجازة بالسند المتصل إلى النبي ﷺ',
      titleEn: 'Continuous Sanad Ijazah',
      descAr: 'مسار تأهيلي متكامل للراغبين في نيل الإجازة والروايات المعتمدة.',
      descEn: 'Full qualification pathway for students pursuing official Sanad Ijazah.',
    },
  ];

  return (
    <section id="methodology" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-start pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide mb-2">
            <span>{isAr ? 'منهجية التعليم' : 'Pedagogical Framework'}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>{isAr ? 'رحلة تعليمية موجهة' : 'Structured Learner Journey'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight [text-wrap:balance]">
            {isAr ? 'منهجية سبيل: كيف نصنع تجربة تعليمية محببة وراسخة؟' : 'The Sabeel Method: Structured, Engaging & Enduring Mastery'}
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'ندمج بين بركة التلقي المباشر بالسند المتصل، وأرقى معايير التربية الحديثة التي تجعل الطالب يقبل على القرآن بشغف وحب.'
              : 'Uniting traditional oral transmission with contemporary pedagogical insights to instill a lifelong devotion to the Holy Quran.'}
          </p>
        </div>

        {/* 2-Column Split: Photography on left, 4 Progressive steps on right */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Visual Column: Young student engaged in learning */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
              <img
                src="/src/assets/images/sabeel_child_student_1792243649254.jpg"
                alt={isAr ? 'طفل مسلم يكتب الحروف العربية ويتعلم القراءة الصحيحة' : 'Young Muslim student engaged in learning Arabic calligraphy & Quran'}
                className="w-full h-[380px] sm:h-[440px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 text-start border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {isAr ? 'التعليم بالحب والتشجيع المستمر' : 'Encouragement-Based Instruction'}
                </span>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isAr 
                    ? 'نهتم بالبناء النفسي والتربوي للطفل بجانب إتقان القراءة، ليكون ارتباطه بالقرآن نابعاً من المحبة والاعتزاز بهويته الإسلامية.'
                    : 'Nurturing the child’s spiritual and emotional relationship with the Quran alongside technical recitation rigor.'}
                </p>
              </div>
            </div>

            {/* Quick Action below photo */}
            <div className="mt-6 pt-2">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-3.5 px-6 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>{isAr ? 'ابدأ الجلسة الاستكشافية مجاناً' : 'Start Free Diagnostic Session'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Steps Timeline Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {steps.map((st, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={st.num}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer text-start p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 border-sky-400/80 dark:border-sky-500/80 shadow-md ring-1 ring-sky-400/20'
                      : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-base font-extrabold tabular-nums tracking-tight px-2.5 py-1 rounded-lg shrink-0 ${
                      isActive 
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {st.num}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className={`text-base font-bold tracking-tight ${
                        isActive ? 'text-slate-950 dark:text-white' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {isAr ? st.titleAr : st.titleEn}
                      </h3>

                      <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {isAr ? st.descAr : st.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* 4 Core Parental Guarantees */}
        <div className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
          {guarantees.map((g, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800"
            >
              <div className="mb-3">{g.icon}</div>
              <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                {isAr ? g.titleAr : g.titleEn}
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {isAr ? g.descAr : g.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
