import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ReviewCard } from '../components/common/ReviewCard';
import { VideoReviewModal } from '../components/common/VideoReviewModal';
import { Review } from '../types';
import { Star, ShieldCheck, Play, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { lang, reviews, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const [selectedVideo, setSelectedVideo] = useState<Review | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'video' | 'written'>('all');

  const filteredReviews = reviews.filter((r) => {
    if (filterType === 'video') return r.isVideo;
    if (filterType === 'written') return !r.isVideo;
    return true;
  });

  return (
    <div className="py-12 lg:py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet />

      <Container size="default">
        {/* Header */}
        <SectionHeader
          kicker={isAr ? 'شهادات وتجارب أولياء الأمور' : 'Verified Family Stories'}
          title={isAr ? 'أصوات أسرنا المسلمة حول العالم' : 'Loved by Muslim Families Across 42+ Countries'}
          subtitle={isAr 
            ? 'تجارب حقيقية لأولياء أمور رأوا تحولاً ملموساً في حب أطفالهم للقرآن الكريم وانضباطهم في التلاوة والتجويد.' 
            : 'Authentic feedback and video stories from parents who witnessed real progress in their children’s Quran recitation.'}
        />

        {/* Aggregate Ratings Overview Strip */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 text-start">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tabular-nums tracking-tight">
              4.98
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'بناءً على 1,240+ تقييم موثق من أولياء الأمور' : 'Based on 1,240+ verified parent reviews'}
              </span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', labelAr: 'الكل', labelEn: 'All' },
              { id: 'video', labelAr: 'تجارب فيديو', labelEn: 'Video Stories' },
              { id: 'written', labelAr: 'شهادات مكتوبة', labelEn: 'Written Reviews' },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setFilterType(btn.id as 'all' | 'video' | 'written')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === btn.id
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isAr ? btn.labelAr : btn.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onOpenVideo={(r) => setSelectedVideo(r)}
            />
          ))}
        </div>

        {/* Video Modal */}
        <VideoReviewModal
          review={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />

        {/* Bottom CTA */}
        <div className="max-w-2xl mx-auto text-center border-t border-slate-200/80 dark:border-slate-800 pt-12">
          <h3 className="text-xl font-bold text-slate-950 dark:text-white">
            {isAr ? 'دع طفلك يكون قصة نجاحنا القادمة' : 'Let Your Child Be Our Next Success Story'}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {isAr
              ? 'احجز حصة تجريبية فردية مجانية الآن وتعرف بنفسك على أسلوبنا التربوي الأزهري.'
              : 'Schedule a free 1-on-1 private lesson today and experience our Azhari pedagogy first-hand.'}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="px-7 py-3.5 text-xs sm:text-sm font-semibold rounded-xl text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all flex items-center gap-2"
            >
              <span>{isAr ? 'احجز الحصة التجريبية المجانية' : 'Book Free Trial Lesson'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </Container>
    </div>
  );
};
