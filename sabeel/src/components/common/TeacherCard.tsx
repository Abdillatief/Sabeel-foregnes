import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Teacher } from '../../types';
import { Award, Play, Pause, Star, Check, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';

export interface TeacherCardProps {
  teacher: Teacher;
  onBookTrial?: (teacher: Teacher) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  onBookTrial,
}) => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const toggleAudio = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!teacher.audioSampleUrl) return;

    if (isPlaying && audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      if (audioElement) {
        audioElement.play();
        setIsPlaying(true);
      } else {
        const audio = new Audio(teacher.audioSampleUrl);
        audio.onended = () => setIsPlaying(false);
        audio.play();
        setAudioElement(audio);
        setIsPlaying(true);
      }
    }
  };

  const handleBook = () => {
    if (onBookTrial) {
      onBookTrial(teacher);
    } else {
      setIsBookingModalOpen(true);
    }
  };

  return (
    <Card className="flex flex-col justify-between text-start group">
      <div>
        {/* Top Header: Photo + Names + Azhar Credential */}
        <div className="flex items-start gap-4">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shrink-0 bg-slate-100 dark:bg-slate-800">
            <img
              src={teacher.photoUrl}
              alt={isAr ? teacher.nameAr : teacher.nameEn}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            {teacher.audioSampleUrl && (
              <button
                type="button"
                onClick={toggleAudio}
                title={isAr ? 'استمع إلى عينة التلاوة' : 'Listen to Recitation Sample'}
                className="absolute inset-0 bg-slate-950/40 hover:bg-slate-950/60 flex items-center justify-center text-white transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-amber-300 animate-pulse" />
                ) : (
                  <Play className="w-5 h-5 text-amber-300 fill-amber-300 ms-0.5" />
                )}
              </button>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{isAr ? 'إسناد أزهري متصل' : 'Continuous Sanad'}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-tight truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              <Link to={`/teachers/${teacher.id}`}>
                {isAr ? teacher.nameAr : teacher.nameEn}
              </Link>
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
              {isAr ? teacher.titleAr : teacher.titleEn}
            </p>

            <div className="mt-2 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold tabular-nums">{teacher.rating}</span>
                <span className="text-[11px] text-slate-400">({teacher.reviewCount})</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {isAr ? `${teacher.yearsExperience} سنوات خبرة` : `${teacher.yearsExperience}y exp`}
              </span>
            </div>
          </div>
        </div>

        {/* Bio preview */}
        <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
          {isAr ? teacher.bioAr : teacher.bioEn}
        </p>

        {/* Degrees & Accreditation List */}
        <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          {(isAr ? teacher.degreesAr : teacher.degreesEn).slice(0, 2).map((deg, i) => (
            <div key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span className="leading-tight truncate">{deg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <Link
          to={`/teachers/${teacher.id}`}
          className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
        >
          {isAr ? 'الملف الأكاديمي' : 'Full Bio & Sanad'}
        </Link>

        <button
          type="button"
          onClick={handleBook}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>{isAr ? 'احجز معه حصة' : 'Book Session'}</span>
          {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </Card>
  );
};
