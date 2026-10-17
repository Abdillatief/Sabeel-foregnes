import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Review } from '../../types';
import { X, Play, Star, MapPin, Award } from 'lucide-react';

interface VideoReviewModalProps {
  review: Review | null;
  onClose: () => void;
}

export const VideoReviewModal: React.FC<VideoReviewModalProps> = ({ review, onClose }) => {
  const { lang } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!review) return null;
  const isAr = lang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-300">
              {review.studentName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Mockup / Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {!isPlaying ? (
            <div className="relative w-full h-full">
              <img
                src={review.videoThumbnail || '/src/assets/images/sabeel_interactive_session_1792243649309.jpg'}
                alt={review.studentName}
                className="w-full h-full object-cover opacity-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shadow-2xl transition transform hover:scale-110 mb-4 mx-auto"
                >
                  <Play className="w-7 h-7 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
                </button>
                <div className="text-center">
                  <span className="text-xs font-semibold text-sky-300 block mb-1">
                    {isAr ? 'تجربة حية مسجلة لطالب الأكاديمية' : 'Live Recorded Student Testimonial'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {review.videoDuration || '01:45'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center animate-pulse">
                <Play className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-200">
                {isAr
                  ? `جاري تشغيل شهادة الطالب: "${review.studentName}" وإشرافه مع المعلم ${review.teacherName || 'الأزهري'}.`
                  : `Playing video review by: "${review.studentName}" with mentor ${review.teacherName || 'Azhari Sheikh'}.`}
              </p>
              <button
                onClick={() => setIsPlaying(false)}
                className="text-xs text-sky-400 hover:underline"
              >
                {isAr ? 'إعادة العرض' : 'Replay'}
              </button>
            </div>
          )}
        </div>

        {/* Review Quote */}
        <div className="p-5 bg-slate-800/80 border-t border-slate-700/80">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
            "{isAr ? review.reviewTextAr : review.reviewTextEn}"
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{review.country}</span>
            </span>
            <span>{isAr ? 'تاريخ التقييم:' : 'Date:'} {review.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
