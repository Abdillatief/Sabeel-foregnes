import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Review } from '../../types';
import { 
  Star, 
  Play, 
  MapPin, 
  ShieldCheck, 
  ArrowLeft,
  ArrowRight,
  Quote
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { lang, reviews, setSelectedVideoForModal, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(0);

  // Curated prominent reviews
  const featuredReviews = reviews.slice(0, 6);
  const currentFeatured = featuredReviews[activeReviewIndex] || featuredReviews[0];

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl text-start">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide mb-2">
              <span>{isAr ? 'تجارب واقعية موثقة' : 'Verified Family Proof'}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>{isAr ? 'عائلات في 42 دولة' : '42+ Countries Worldwide'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight [text-wrap:balance]">
              {isAr ? 'أثر مبارك يلمسه أولياء الأمور في تلاوة وأخلاق أبنائهم' : 'Tangible Transformation in Children’s Recitation & Love for the Quran'}
            </h2>
            
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? 'شهادات حقيقية من آباء وأمهات في المهجر يشاركوننا فرحتهم بختم أبنائهم وتأسيسهم المتين في كتاب الله ولغته.'
                : 'Heartfelt experiences from Muslim families in the West sharing their children’s breakthroughs in fluency and retention.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveReviewIndex((prev) => (prev > 0 ? prev - 1 : featuredReviews.length - 1))}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              aria-label="Previous testimonial"
            >
              {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setActiveReviewIndex((prev) => (prev < featuredReviews.length - 1 ? prev + 1 : 0))}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              aria-label="Next testimonial"
            >
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Marquee Story Showcase with Authentic Family Photo */}
        <div className="mt-12 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Visual: Real photograph of multinational Muslim family */}
            <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto">
              <img
                src="/src/assets/images/sabeel_interactive_session_1792243649309.jpg"
                alt={isAr ? 'عائلة مسلمة تتابع حصة تفاعلية للقرآن الكريم' : 'Muslim family engaged in an interactive Quran lesson session'}
                className="w-full h-full object-cover min-h-[300px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 start-4 text-white lg:hidden text-xs">
                <span className="font-bold">{isAr ? 'جلسة أسرية تفاعلية' : 'Family Interactive Learning'}</span>
              </div>
            </div>

            {/* Testimonial Quote & Context */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between text-start">
              <div>
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center text-amber-500 gap-1">
                    {[...Array(currentFeatured?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ms-1.5 tabular-nums">5.0 / 5.0</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isAr ? 'تجربة موثقة' : 'Verified Family'}</span>
                  </div>
                </div>

                {/* Quote prose */}
                <div className="mt-6">
                  <Quote className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-3" />
                  <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                    «{isAr ? currentFeatured?.reviewTextAr : currentFeatured?.reviewTextEn}»
                  </p>
                </div>
              </div>

              {/* Author & Location Footer */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-base font-bold text-slate-950 dark:text-white block">
                    {currentFeatured?.studentName}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{currentFeatured?.country}</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentFeatured?.teacherName}</span>
                  </div>
                </div>

                {currentFeatured?.isVideo && (
                  <button
                    type="button"
                    onClick={() => setSelectedVideoForModal(currentFeatured)}
                    className="px-4 py-2 text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isAr ? 'مشاهدة الفيديو الموثق' : 'Watch Video'}</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* 3 Secondary Review Broadside Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
          {featuredReviews.slice(1, 4).map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center text-amber-500 gap-0.5 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-4">
                  «{isAr ? rev.reviewTextAr : rev.reviewTextEn}»
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {rev.studentName}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  {rev.country} · {rev.teacherName}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
