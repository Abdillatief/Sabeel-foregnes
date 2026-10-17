import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  ShieldCheck, 
  Users, 
  Clock, 
  Video, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  HeartHandshake 
} from 'lucide-react';

export const WhySabeelSection: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const reasons = [
    {
      icon: <Award className="w-7 h-7 text-amber-500" />,
      titleAr: 'معلمون ومعلمات من الأزهر الشريف',
      titleEn: 'Accredited Azhari Scholars',
      descAr: 'خريجو كليات القرآن الكريم ومجازون بالسند المتصل برواية حفص وشعبة والقراءات العشر، مع إتقان كامل للغة الإنجليزية.',
      descEn: 'Graduates of Quranic faculties holding authentic Sanad in Hafs, Shu\'bah, and 10 Qira\'at, with full English proficiency.',
    },
    {
      icon: <Video className="w-7 h-7 text-sky-500" />,
      titleAr: 'حصص فردية خاصة 1-on-1',
      titleEn: '100% Private 1-on-1 Rooms',
      descAr: 'تركيز كامل على الطالب وحده طوال الحصة لضمان النطق الصحيح وتصحيح مخارج الحروف دون أي تشتت.',
      descEn: 'Full 100% undivided attention from your dedicated tutor, ensuring flawless phonetics and Tajweed precision.',
    },
    {
      icon: <Clock className="w-7 h-7 text-emerald-500" />,
      titleAr: 'مرونة المواعيد وتعويض الحصص',
      titleEn: 'Ultimate Scheduling Flexibility',
      descAr: 'نعمل على مدار 24 ساعة لتغطية جميع المناطق الزمنية في أمريكا وأوروبا والخليج، مع إمكانية تعويض أي حصة طارئة.',
      descEn: 'Operating 24/7 covering all US, European, and Gulf timezones, with free rescheduling for family emergencies.',
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-indigo-500" />,
      titleAr: 'بيئة آمنة وتربوية للأطفال',
      titleEn: 'Safe & Gentle Islamic Environment',
      descAr: 'طاقم نسائي مخصص لتعليم السيدات والفتيات الصغيرات، مع مناهج تفاعلية تشجع الطفل على حب كتاب الله دون إكراه.',
      descEn: 'Dedicated female scholars for sisters and young girls, with engaging methods nurturing love for Allah\'s Book.',
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-sky-600 font-bold text-xs uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            {isAr ? 'لماذا تختارنا؟' : 'Why Choose Sabeel?'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            {isAr ? 'لماذا يثق بنا آلاف أولياء الأمور حول العالم؟' : 'Why Diaspora Families Choose Sabeel Academy'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'نجمع بين أصالة الإسناد الأزهري وأحدث تقنيات التعليم الرقمي التفاعلي لنوفر لأبنائك تجربة قرآنية فريدة لا تُنسى.'
              : 'Blending authentic Azhari heritage with cutting-edge digital classrooms to deliver an unforgettable Quranic journey.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/90 hover:border-sky-300 hover:shadow-xl transition-all duration-300 space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
                {r.icon}
              </div>
              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-sky-600 transition">
                {isAr ? r.titleAr : r.titleEn}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr ? r.descAr : r.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
