import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle,
  Award,
  Users,
  Star
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/90 dark:border-slate-800 transition-colors duration-300">
      {/* Subtle luxury ambient gold and celestial blue glow */}
      <div 
        aria-hidden="true" 
        className="absolute -top-32 start-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute top-48 start-1/4 w-[400px] h-[300px] bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Quranic Verse Inscription - Amiri Calligraphic Type */}
        <div className="text-center mb-6">
          <div className="inline-flex flex-col items-center border-y border-amber-500/40 dark:border-amber-500/30 py-2.5 px-8 bg-amber-500/5 dark:bg-transparent rounded-lg">
            <p className="font-quran text-2xl sm:text-3xl lg:text-4xl text-amber-700 dark:text-amber-300 tracking-wide font-normal leading-relaxed">
              « وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا »
            </p>
            <span className="text-[11px] text-amber-700/80 dark:text-amber-400/70 font-sans tracking-widest mt-0.5">
              {isAr ? 'سورة المزمل · الآية 4' : 'Surah Al-Muzzammil · Verse 4'}
            </span>
          </div>
        </div>

        {/* Central Display Header with Balanced Typography */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] text-slate-950 dark:text-white [text-wrap:balance]">
            {isAr ? (
              <>
                ابدأ رحلة أطفالك المباركة مع القرآن الكريم <br className="hidden sm:inline" />
                <span className="text-amber-600 dark:text-amber-400">بإسناد أزهري متصل</span>
              </>
            ) : (
              <>
                Begin Your Family’s Sacred Quranic Journey <br className="hidden sm:inline" />
                <span className="text-amber-600 dark:text-amber-400">With Certified Azhari Scholars</span>
              </>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'أكاديمية تعليمية متخصصة تجمع بين أصالة السند النبوي المتصل، وأحدث أساليب التدريس التفاعلي الفردي 1-on-1 للأطفال والكبار حول العالم. نخبة مجازة من الأزهر الشريف بمواعيد تلائم جدولكم العائلي.'
              : 'A dedicated premier academy connecting families globally with certified Azhari tutors through personalized 1-on-1 live instruction. Experience authentic transmission and modern interactive pedagogy.'}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>{isAr ? 'احجز حصتك التجريبية المجانية الآن' : 'Book Free Trial Lesson'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <a
              href="https://wa.me/201000000000?text=Assalamu%20Alaikum%20Sabeel%20Academy"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white hover:bg-slate-100 dark:bg-slate-900/90 dark:hover:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700/80 shadow-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>{isAr ? 'تحدث مباشرة مع مستشار أكاديمي' : 'Speak with Academic Advisor'}</span>
            </a>
          </div>

          {/* Quiet Reassurance Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'مجانية تماماً وبدون بطاقة ائتمانية' : '100% Free · No Card Needed'}</span>
            </div>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700 hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{isAr ? 'حصة خاصة فردية 1-on-1 لمدة 30 دقيقة' : '30-Min Private 1-on-1 Class'}</span>
            </div>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700 hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{isAr ? 'تقييم شامل لمستوى التلاوة والتجويد' : 'Comprehensive Diagnostic Assessment'}</span>
            </div>
          </div>
        </div>

        {/* Visual Showcase: Authentic Photography + Live Lesson Preview */}
        <div className="mt-12 lg:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xl">
            
            {/* Aspect Ratio Container for Authentic Photograph */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/10] overflow-hidden">
              <img
                src="/src/assets/images/sabeel_hero_study_1792243648672.jpg"
                alt={isAr ? 'طالبة مسلمة تدرس القرآن الكريم عبر شاشة الحاسوب بإشراف شيخ أزهري' : 'Muslim student learning Quran online with certified Azhari scholar'}
                className="w-full h-full object-cover object-center brightness-95"
                referrerPolicy="no-referrer"
              />

              {/* Seamless Dark Gradient Vignette for readability of overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />

              {/* Floating Live Lesson Trust Card */}
              <div className="absolute bottom-4 sm:bottom-6 start-4 sm:start-6 end-4 sm:end-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/95 dark:bg-slate-950/85 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 sm:px-6 sm:py-3.5 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-amber-500/40 shrink-0">
                    <img 
                      src="/src/assets/images/sabeel_scholar_mentor_1792243648943.jpg" 
                      alt="الشيخ الأزهري"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-start">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-950 dark:text-white">
                        {isAr ? 'جلسة فردية مباشرة الآن' : 'Live 1-on-1 Lesson'}
                      </span>
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {isAr ? 'معلم أزهري مجاز بالقراءات العشر · تصحيح تلاوة وتجويد' : 'Certified Azhari Scholar · Real-time Tajweed Correction'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
                  <div className="hidden md:flex items-center gap-1.5 text-amber-600 dark:text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-semibold">4.98 / 5</span>
                    <span className="text-slate-500 dark:text-slate-400">({isAr ? 'أكثر من 1,200 ولي أمر' : '1,200+ Parents'})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(true)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {isAr ? 'احجز موعدك' : 'Reserve Slot'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Claim-to-Proof Quantitative Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200/90 dark:border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-start">
          
          <div className="text-start">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tabular-nums tracking-tight block">
              100%
            </span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 block">
              {isAr ? 'معلمون مجازون بالسند الأزهري المتصل' : 'Faculty with Verified Continuous Sanad'}
            </span>
          </div>

          <div className="text-start">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tabular-nums tracking-tight block">
              4.98 / 5.0
            </span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 block">
              {isAr ? 'متوسط تقييم أولياء الأمور والطلاب' : 'Average Family Satisfaction Score'}
            </span>
          </div>

          <div className="text-start">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tabular-nums tracking-tight block">
              42+
            </span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 block">
              {isAr ? 'دولة حول العالم يتعلم أبناؤها معنا' : 'Countries with Active Students'}
            </span>
          </div>

          <div className="text-start">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tabular-nums tracking-tight block">
              1-on-1
            </span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 block">
              {isAr ? 'حصص تفاعلية فردية خاصة 100%' : 'Strictly Private Live Classes'}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
