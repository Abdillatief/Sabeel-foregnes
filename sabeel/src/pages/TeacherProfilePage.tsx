import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { 
  Play, 
  Pause, 
  Award, 
  ShieldCheck, 
  Star, 
  Clock, 
  Globe, 
  Users, 
  ArrowLeft, 
  ArrowRight,
  BookOpen,
  Volume2
} from 'lucide-react';

export const TeacherProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lang, teachers, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const teacher = teachers.find((t) => t.id === id) || teachers[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => new Audio(teacher.audioSampleUrl || 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3'));

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  return (
    <div className="py-10 lg:py-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet
        title={`${isAr ? teacher.nameAr : teacher.nameEn} | Sabeel Academy`}
        description={isAr ? teacher.bioAr : teacher.bioEn}
      />

      <Container size="default">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
          <Link to="/" className="hover:text-slate-950 dark:hover:text-white transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/teachers" className="hover:text-slate-950 dark:hover:text-white transition-colors">
            {isAr ? 'هيئة التدريس' : 'Teachers'}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">
            {isAr ? teacher.nameAr : teacher.nameEn}
          </span>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Photo & Audio & Quick Booking */}
          <div className="lg:col-span-4 text-start">
            <Card className="p-6">
              <div className="relative rounded-2xl overflow-hidden aspect-square mb-5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                <img
                  src={teacher.photoUrl}
                  alt={isAr ? teacher.nameAr : teacher.nameEn}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Recitation Sample Player */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 mb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                    <Volume2 className="w-4 h-4 text-sky-500" />
                    <span>{isAr ? 'عينة التلاوة والتجويد' : 'Recitation Sample'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">سورة الفاتحة</span>
                </div>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>{isAr ? 'إيقاف التلاوة' : 'Pause Recitation'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>{isAr ? 'استمع إلى التلاوة' : 'Listen to Recitation'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Book with this teacher CTA */}
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold rounded-xl text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all flex items-center justify-center gap-2 mb-3"
              >
                <span>{isAr ? 'احجز حصة تجريبية مع المعلم' : 'Book Trial with Tutor'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span>{isAr ? 'سنوات الخبرة' : 'Experience'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{teacher.yearsExperience} {isAr ? 'سنوات' : 'years'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{isAr ? 'الحصص المنجزة' : 'Sessions Done'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{teacher.completedSessions}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{isAr ? 'التقييم العام' : 'Rating'}</span>
                  <span className="font-semibold text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {teacher.rating} / 5.0
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Detailed Credentials & Sanad */}
          <div className="lg:col-span-8 text-start space-y-8">
            
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'إسناد أزهري متصل إلى رسول الله ﷺ' : 'Continuous Prophetic Sanad via Al-Azhar'}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {isAr ? teacher.nameAr : teacher.nameEn}
              </h1>

              <p className="mt-2 text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300">
                {isAr ? teacher.titleAr : teacher.titleEn}
              </p>

              <p className="mt-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr ? teacher.bioAr : teacher.bioEn}
              </p>
            </div>

            {/* Sanad & Academic Degrees */}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{isAr ? 'الإجازات القرآنية والشهادات الأكاديمية' : 'Ijazah Certifications & Degrees'}</span>
              </h3>

              <div className="space-y-3">
                {(isAr ? teacher.degreesAr : teacher.degreesEn).map((deg, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="leading-snug">{deg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Philosophy */}
            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-3">
                {isAr ? 'المنهج التربوي والتعامل مع الأبناء' : 'Pedagogical Philosophy'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAr
                  ? 'يعتمد المعلم على أسلوب الاستماع المتأني، وتصحيح مخارج الحروف برفق وصبر، مع مراعاة الفروق الفردية للأطفال وتخصيص وقت في نهاية كل حصة للمراجعة الذهبية لتثبيت المحفوظ ومنع نسيانه.'
                  : 'Employs patient listening and gentle Tajweed correction, adapting to each student’s pace while dedicating the final segment of each session to structured retention revision.'}
              </p>
            </div>

          </div>

        </div>
      </Container>
    </div>
  );
};
