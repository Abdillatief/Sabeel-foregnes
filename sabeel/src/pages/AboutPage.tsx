import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Users, 
  Globe, 
  Clock, 
  Heart, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      titleAr: 'إسناد نبوي متصل وتوثيق أزهري',
      titleEn: 'Continuous Prophetic Sanad',
      descAr: 'جميع معلمات ومشايخ الأكاديمية يحملون إجازات موثقة بالسند المتصل إلى رسول الله ﷺ بروايات حفص وشعبة وقالون وورش، وخريجون معتمدون من جامعة الأزهر الشريف.',
      descEn: 'All instructors hold authenticated chains of transmission (Sanad) to the Prophet ﷺ and degrees from the world-renowned Al-Azhar University.',
    },
    {
      icon: <Users className="w-6 h-6 text-sky-500" />,
      titleAr: 'تعليم فردي 1-on-1 بالكامل',
      titleEn: '100% Private 1-on-1 Instruction',
      descAr: 'لا فصول مزدحمة ولا تشتيت؛ كل دقيقة من الحصة مخصصة لطفلك وحده لمتابعة مخارج الحروف، ترسيخ الحفظ، وتصحيح التلاوة أولاً بأول.',
      descEn: 'Zero crowded online classrooms. Every single minute is personalized for your child to polish articulation, correct Tajweed, and track progress.',
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      titleAr: 'أسلوب تربوي لطيف يغرس الحب',
      titleEn: 'Compassionate Islamic Pedagogy',
      descAr: 'نؤمن بأن حفظ القرآن الكريم يبدأ من محبته؛ معلمونا مدربون على أحدث نظريات التحفيز والتربية الإيجابية للأطفال الناشئين في بلاد المهجر.',
      descEn: 'Memorizing the Quran begins with loving it. Our tutors are trained in positive behavioral reinforcement tailored for diaspora youth.',
    },
    {
      icon: <Clock className="w-6 h-6 text-emerald-500" />,
      titleAr: 'مرونة مواعيد توافق جدولكم الزمني',
      titleEn: 'Flexible Rescheduling & Global Timezones',
      descAr: 'نغطي جميع المناطق الزمنية عبر أمريكا الشمالية، بريطانيا، أوروبا، وأستراليا مع إمكانية إعادة جدولة أي حصة بسهولة تامة.',
      descEn: 'We serve all timezones across North America, the UK, Europe, and the Gulf, with seamless rescheduling for busy family schedules.',
    },
  ];

  const milestones = [
    {
      metric: '3%',
      labelAr: 'نسبة القبول في اختيار المعلمين',
      labelEn: 'Teacher acceptance rate after 4-stage vetting',
    },
    {
      metric: '100%',
      labelAr: 'إسناد وإجازة معتمدة',
      labelEn: 'Azhari Sanad & degree verification',
    },
    {
      metric: '42+',
      labelAr: 'دولة يقيم فيها طلابنا',
      labelEn: 'Countries with active enrolled families',
    },
    {
      metric: '4.98',
      labelAr: 'متوسط تقييم أولياء الأمور',
      labelEn: 'Out of 5.0 average parent rating',
    },
  ];

  return (
    <div className="py-12 lg:py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet />

      {/* Hero Header */}
      <Container size="default" className="text-center mb-16 lg:mb-20">
        <div className="inline-flex flex-col items-center border-y border-amber-500/30 py-2 px-6 mb-6">
          <p className="font-quran text-2xl sm:text-3xl text-amber-600 dark:text-amber-300 font-normal">
            « خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ »
          </p>
          <span className="text-[11px] text-amber-700/70 dark:text-amber-400/70 font-sans tracking-wider mt-0.5">
            {isAr ? 'حديث نبوي شريف · صحيح البخاري' : 'Prophetic Hadith · Sahih Al-Bukhari'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.2] [text-wrap:balance]">
          {isAr ? (
            <>
              أكاديمية سبيل: جسركم الموثوق <br className="hidden sm:inline" />
              <span className="text-sky-600 dark:text-sky-400">لنور القرآن والإسناد النبوي</span>
            </>
          ) : (
            <>
              Sabeel Academy: Your Family’s Bridge <br className="hidden sm:inline" />
              <span className="text-sky-600 dark:text-sky-400">To Authentic Quranic Heritage</span>
            </>
          )}
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {isAr
            ? 'تأسست أكاديمية سبيل استجابة لحاجة الأسر المسلمة في الغرب ومختلف دول العالم إلى تعليم قرآني ولغوي أصيل يجمع بين علو الإسناد الأزهري، وأرقى معايير التقنية والتنظيم الحديث.'
            : 'Founded to serve diaspora Muslim families worldwide, Sabeel Academy unites authentic Al-Azhar transmission with modern educational technology and compassionate mentoring.'}
        </p>
      </Container>

      {/* Visual Feature: Azhar Scholar in Library */}
      <Container size="default" className="mb-20">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900">
          <img
            src="/src/assets/images/sabeel_scholar_mentor_1792243648943.jpg"
            alt={isAr ? 'مجلس مشايخ الأزهر الشريف في أكاديمية سبيل' : 'Azhari scholars at Sabeel Academy'}
            className="w-full h-[360px] sm:h-[480px] object-cover object-top brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
              {isAr ? 'الأمانة العلمية' : 'Academic Integrity'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold max-w-2xl">
              {isAr 
                ? 'إشراف أكاديمي مباشر من كبار مجازي القراءات وعلماء الأزهر الشريف' 
                : 'Direct Oversight by Senior Certified Qira\'at Masters from Al-Azhar'}
            </h2>
          </div>
        </div>
      </Container>

      {/* Metrics Strip */}
      <Container size="default" className="mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          {milestones.map((m, idx) => (
            <div key={idx} className="text-start">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tabular-nums tracking-tight block">
                {m.metric}
              </span>
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 block">
                {isAr ? m.labelAr : m.labelEn}
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* The 4 Core Pillars */}
      <Container size="default" className="mb-20">
        <SectionHeader
          kicker={isAr ? 'ركائزنا التعليمية' : 'Our Foundations'}
          title={isAr ? 'لماذا يأتمننا أولياء الأمور حول العالم على أطفالهم؟' : 'Why Global Families Entrust Their Children With Sabeel'}
          subtitle={isAr 
            ? 'نظام تعليمي وتربوي متكامل تم تصميمه بعناية ليناسب ظروف الأسرة المعاصرة واحتياجات الأجيال الصاعدة.' 
            : 'An integrated educational and ethical model built specifically for diaspora households.'}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, i) => (
            <Card key={i} className="text-start">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                {isAr ? pillar.titleAr : pillar.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr ? pillar.descAr : pillar.descEn}
              </p>
            </Card>
          ))}
        </div>
      </Container>

      {/* Rigorous 4-Stage Vetting Process */}
      <Container size="narrow" className="mb-20 text-start">
        <SectionHeader
          centered={false}
          kicker={isAr ? 'معايير الجودة الصارمة' : 'Quality Assurance'}
          title={isAr ? 'كيف نختار معلمينا ومعلماتنا؟' : 'How We Select Our Faculty (The 3% Rule)'}
          subtitle={isAr 
            ? 'يمر كل معلم ومعلمة بأربع مراحل اختبار دقيقة قبل استقبال أول طالب في سبيل أكاديمي.' 
            : 'Every instructor undergoes a rigorous four-phase vetting pipeline before joining.'}
        />

        <div className="space-y-4">
          {[
            {
              num: '01',
              titleAr: 'تدقيق الأسانيد والشهادات الأكاديمية',
              titleEn: 'Sanad Chain & Degree Verification',
              descAr: 'التحقق الرسمي من الإجازات المسندة وشهادات كلية القرآن الكريم أو كلية الدراسات الإسلامية بجامعة الأزهر.',
              descEn: 'Direct verification of Ijazah chains and accredited Al-Azhar University credentials.',
            },
            {
              num: '02',
              titleAr: 'اختبار مخارج الحروف والإتقان الشفهي',
              titleEn: 'Oral Recitation & Tajweed Examination',
              descAr: 'جلسة تقييم مباشرة أمام لجنة من كبار مقرئي الأزهر الشريف للتأكد من فصاحة التلاوة وخلوها من أي لحن.',
              descEn: 'Rigorous oral exam before senior Recitation Masters testing letter articulation and fluency.',
            },
            {
              num: '03',
              titleAr: 'مهارات التدريس والتربية النفسية للأطفال',
              titleEn: 'Pedagogy & Child Psychology Assessment',
              descAr: 'تقييم أسلوب المعلم في الصبر، التحفيز الإيجابي، والقدرة على التعامل مع الأطفال متعددي اللغات.',
              descEn: 'Evaluating patience, positive reinforcement, and communication with multilingual diaspora kids.',
            },
            {
              num: '04',
              titleAr: 'فترة التدريب الداخلي والمتابعة المستمرة',
              titleEn: 'Internal Onboarding & Continuous Auditing',
              descAr: 'حضور ورش عمل دورية ومراجعة عينات عشوائية من الحصص لضمان التزام المعلم بأعلى معايير التميز.',
              descEn: 'Periodic workshops and routine spot-checks by senior supervisors to ensure standard compliance.',
            },
          ].map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-4">
              <span className="font-mono text-lg font-bold text-sky-600 dark:text-sky-400 shrink-0">
                {step.num}
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white">
                  {isAr ? step.titleAr : step.titleEn}
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA Box */}
      <Container size="default">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isAr ? 'ابدأ تجربة طفلك الأولى مجاناً اليوم' : 'Experience Your Child’s Free Trial Today'}
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'حصة استكشافية فردية 1-on-1 مع شيخ أزهري معتمد بالسند المتصل بدون أي بطاقة بنكية.'
                : '30-minute private 1-on-1 session with a certified Azhari scholar. Zero credit card required.'}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{isAr ? 'احجز الحصة التجريبية المجانية' : 'Book Free Trial Lesson'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
              <Link
                to="/courses"
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900 rounded-xl border border-slate-800 hover:bg-slate-800 transition-colors"
              >
                {isAr ? 'استكشف المناهج والمسارات' : 'Explore All Curricula'}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
