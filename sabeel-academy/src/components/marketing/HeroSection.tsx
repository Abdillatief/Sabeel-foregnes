import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Play, 
  ShieldCheck, 
  Users, 
  Award, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { lang, setIsBookingModalOpen, setActiveView } = useApp();
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-32 bg-islamic-pattern">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 end-10 w-[350px] h-[350px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left / Main Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200/80 shadow-xs text-sky-800 text-xs font-bold">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>
                {isAr
                  ? 'الأكاديمية الإسلامية الرائدة لتعليم القرآن والعربية عن بُعد'
                  : 'Premier Global Online Academy for Quran & Arabic'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2]">
              {isAr ? (
                <>
                  تعلّم القرآن الكريم واللغة العربية <br />
                  <span className="sky-gradient-text">مع نخبة علماء الأزهر الشريف</span>
                </>
              ) : (
                <>
                  Master the Holy Quran & Arabic <br />
                  <span className="sky-gradient-text">With Certified Azhari Scholars</span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {isAr
                ? 'حصص فردية مباشرة 1-on-1 مصممة خصيصاً لأطفالك ولجميع أفراد الأسرة في أي مكان بالعالم. مناهج معتمدة، مواعيد مرنة تضمن أعلى درجات الإتقان مع إجازة بالسند المتصل.'
                : 'Private 1-on-1 live interactive sessions personalized for kids and adults worldwide. Accredited curriculums, flexible scheduling, and authentic Ijazah certification with continuous Sanad.'}
            </p>

            {/* Bullet trust factors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-700 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{isAr ? 'حصة تجريبية مجانية 100% بدون بطاقة' : '100% Free Trial (No Card Needed)'}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{isAr ? 'معلمون ومعلمات أزهريون ومجازون' : 'Male & Female Azhari Tutors'}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{isAr ? 'تقارير أسبوعية تفصيلية لولي الأمر' : 'Weekly Parent Progress Reports'}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{isAr ? 'مرونة كاملة في تعويض المواعيد' : 'Flexible Rescheduling Anytime'}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-sky-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{isAr ? 'احجز حصتك المجانية الآن' : 'Book Free Trial Lesson'}</span>
              </button>

              <button
                onClick={() => setActiveView('courses')}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold text-base px-7 py-4 rounded-2xl border border-slate-200/80 shadow-sm transition flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-sky-600" />
                <span>{isAr ? 'استكشف الدورات والمناهج' : 'Explore Curricula'}</span>
              </button>
            </div>

            {/* Social proof stars */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                  alt="Student"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Student"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Student"
                />
              </div>

              <div className="text-start">
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-800 ms-1.5">4.98 / 5.0</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {isAr ? 'أكثر من 14,000 ساعة تدريسية لطلاب من 35 دولة' : 'Over 14,000 hours taught across 35 countries'}
                </p>
              </div>
            </div>
          </div>

          {/* Right / Visual Card Column */}
          <div className="lg:col-span-5 relative">
            {/* Visual Glassmorphic Showcase */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop&q=80"
                  alt="Quran Learning"
                  className="w-full h-[460px] object-cover opacity-85"
                />

                {/* Dark Gradient Overlay with Quranic Verse */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 mb-3">
                    <p className="font-quran text-lg md:text-xl text-amber-200 text-center leading-loose">
                      «وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا»
                    </p>
                    <p className="text-[11px] text-slate-300 text-center mt-1">
                      {isAr ? 'سورة المزمل • الآية 4' : 'Surah Al-Muzzammil • Ayah 4'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">
                          {isAr ? 'إجازة بالسند المتصل' : 'Authentic Sanad Ijazah'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {isAr ? 'مشيخة المقارئ المصرية' : 'Egyptian Maqari\''}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveView('reviews')}
                      className="text-xs text-sky-300 hover:text-white flex items-center gap-1 font-semibold underline underline-offset-4"
                    >
                      <span>{isAr ? 'شاهد تجارب الطلاب' : 'Watch Reviews'}</span>
                      <Play className="w-3 h-3 fill-sky-300" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Floating Micro Badges */}
              <div className="absolute -top-4 -start-4 bg-white/95 backdrop-blur-md border border-slate-200/80 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce [animation-duration:3s]">
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 block">1-on-1 Live</span>
                  <span className="text-[10px] text-slate-500">{isAr ? 'فصول تفاعلية خاصة' : 'Private Rooms'}</span>
                </div>
              </div>

              <div className="absolute -bottom-5 -end-4 bg-white/95 backdrop-blur-md border border-slate-200/80 p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 block">
                    {isAr ? 'معلمون أزهريون' : 'Al-Azhar Scholars'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {isAr ? 'إجازة بالقراءات العشر' : '10 Qira\'at Ijazah'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
