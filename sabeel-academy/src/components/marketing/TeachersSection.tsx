import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Teacher } from '../../types';
import { 
  Award, 
  Star, 
  GraduationCap, 
  Play, 
  Pause, 
  Globe, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const TeachersSection: React.FC = () => {
  const { lang, teachers, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const [playingTeacherId, setPlayingTeacherId] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');

  const filteredTeachers = teachers.filter(t => {
    if (genderFilter === 'all') return true;
    return t.gender === genderFilter;
  });

  const toggleAudio = (id: string) => {
    if (playingTeacherId === id) {
      setPlayingTeacherId(null);
    } else {
      setPlayingTeacherId(id);
    }
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {isAr ? 'الصفوة الأكاديمية' : 'World-Class Faculty'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            {isAr ? 'نخبة مشايخ وعلماء الأزهر الشريف' : 'Accredited Azhari Scholars & Hafizs'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'معلمون ومعلمات يحملون إجازات بالسند المتصل إلى النبي ﷺ، يتقنون الإنجليزية ويتميزون بالصبر والحكمة في تعليم الصغار والكبار.'
              : 'Scholars holding continuous Sanad Ijazah to the Prophet ﷺ, fluent in English, and renowned for gentle pedagogy with kids.'}
          </p>

          {/* Gender Filter Buttons */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setGenderFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                genderFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isAr ? 'جميع المعلمين' : 'All Tutors'}
            </button>
            <button
              onClick={() => setGenderFilter('male')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                genderFilter === 'male'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isAr ? 'المشايخ والمعلمون (رجال)' : 'Male Scholars'}
            </button>
            <button
              onClick={() => setGenderFilter('female')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                genderFilter === 'female'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isAr ? 'المعلمات الفضليات (سيدات)' : 'Female Scholars'}
            </button>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeachers.map(teacher => {
            const isPlaying = playingTeacherId === teacher.id;

            return (
              <div
                key={teacher.id}
                className="bg-slate-50/80 rounded-3xl border border-slate-200 overflow-hidden hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image & Audio trigger */}
                  <div className="relative aspect-square overflow-hidden bg-slate-200">
                    <img
                      src={teacher.photoUrl}
                      alt={teacher.nameEn}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-4">
                      {/* Audio Sample Button */}
                      {teacher.audioSampleUrl && (
                        <button
                          onClick={() => toggleAudio(teacher.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md transition shadow-md ${
                            isPlaying ? 'bg-amber-500' : 'bg-slate-900/80 hover:bg-slate-900'
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-white" />
                              <span>{isAr ? 'إيقاف التلاوة' : 'Pause'}</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>{isAr ? 'استمع للتلاوة' : 'Listen Sample'}</span>
                            </>
                          )}
                        </button>
                      )}

                      {/* Rating pill */}
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-black text-slate-900 shadow">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{teacher.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                        {isAr ? teacher.nameAr : teacher.nameEn}
                      </h3>
                      <p className="text-xs font-semibold text-sky-700 mt-1">
                        {isAr ? teacher.titleAr : teacher.titleEn}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {isAr ? teacher.bioAr : teacher.bioEn}
                    </p>

                    {/* Quick Badges */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        <span className="truncate">{teacher.yearsExperience} {isAr ? 'سنوات خبرة تعليمية' : 'Years Experience'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                        <span className="truncate">{teacher.languages.join(' • ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-4 bg-white border-t border-slate-200">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{isAr ? 'حجز حصة تجريبية معه' : 'Book Trial with Tutor'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
