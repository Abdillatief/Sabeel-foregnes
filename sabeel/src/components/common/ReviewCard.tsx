import React from 'react';
import { useApp } from '../../context/AppContext';
import { Review } from '../../types';
import { Star, ShieldCheck, Play, MapPin, Quote } from 'lucide-react';
import { Card } from '../ui/Card';

export interface ReviewCardProps {
  review: Review;
  onOpenVideo?: (review: Review) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onOpenVideo,
}) => {
  const { lang, setSelectedVideoForModal } = useApp();
  const isAr = lang === 'ar';

  const handleVideo = () => {
    if (onOpenVideo) {
      onOpenVideo(review);
    } else {
      setSelectedVideoForModal(review);
    }
  };

  return (
    <Card className="flex flex-col justify-between text-start relative group">
      <div>
        {/* Top Header: Rating + Verification */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>

          {review.verified && (
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'ولي أمر موثق' : 'Verified Family'}</span>
            </div>
          )}
        </div>

        {/* Video Thumbnail if available */}
        {review.isVideo && review.videoThumbnail && (
          <div 
            onClick={handleVideo}
            className="relative rounded-xl overflow-hidden mb-4 aspect-video cursor-pointer group/vid border border-slate-200 dark:border-slate-800"
          >
            <img
              src={review.videoThumbnail}
              alt={review.studentName}
              className="w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-slate-950/40 hover:bg-slate-950/50 flex items-center justify-center transition-colors">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover/vid:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-slate-950 ms-0.5" />
              </div>
            </div>
            {review.videoDuration && (
              <span className="absolute bottom-2 end-2 bg-slate-950/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                {review.videoDuration}
              </span>
            )}
          </div>
        )}

        {/* Review Quote */}
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
          "{isAr ? review.reviewTextAr : review.reviewTextEn}"
        </p>
      </div>

      {/* Reviewer Details */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-sm font-bold text-slate-950 dark:text-white block">
            {review.studentName}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            <MapPin className="w-3 h-3 text-sky-500" />
            <span>{review.country}</span>
          </div>
        </div>

        {review.teacherName && (
          <div className="text-end text-[11px] text-slate-400 hidden sm:block">
            <span>{isAr ? 'المعلم:' : 'Tutor:'}</span>
            <span className="block font-medium text-slate-600 dark:text-slate-300 truncate max-w-[120px]">
              {review.teacherName}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};
