import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Review, CourseCategory } from '../../types';
import { 
  Star, 
  Play, 
  MapPin, 
  CheckCircle2, 
  MessageSquarePlus, 
  Video, 
  Sparkles,
  Award
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { lang, reviews, addReview, setSelectedVideoForModal } = useApp();
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'text'>('all');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  // Add review form state
  const [authorName, setAuthorName] = useState('');
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [courseCategory, setCourseCategory] = useState<CourseCategory>('quran-reading');

  const filteredReviews = reviews.filter(r => {
    if (activeTab === 'video') return r.isVideo;
    if (activeTab === 'text') return !r.isVideo;
    return true;
  });

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      studentName: authorName.trim(),
      country: country.trim() || (isAr ? 'الولايات المتحدة' : 'United States'),
      countryCode: 'US',
      courseCategory,
      rating,
      reviewTextAr: reviewText.trim(),
      reviewTextEn: reviewText.trim(),
      teacherName: isAr ? 'معلم أزهري معتمد' : 'Azhari Tutor',
      date: new Date().toISOString().slice(0, 10),
      verified: true,
      isVideo: false,
    };

    addReview(newRev);
    setShowAddReviewModal(false);
    setAuthorName('');
    setCountry('');
    setReviewText('');
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {isAr ? 'تجارب واقعية موثقة' : 'Verified Student Experiences'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            {isAr ? 'ماذا يقول أولياء الأمور والطلاب عنا؟' : 'Stories of Transformation from Our Global Family'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'شهادات حية ومسجلة بالفيديو من أولياء أمور في أمريكا وبريطانيا وكندا والخليج العربي وثّقوا تطور أطفالهم مع أكاديمية سبيل.'
              : 'Authentic recorded video testimonials and heartfelt reviews from diaspora families across 35+ countries.'}
          </p>

          {/* Filter and Add buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isAr ? 'جميع التقييمات' : 'All Reviews'}
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  activeTab === 'video' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-rose-500" />
                <span>{isAr ? 'فيديوهات مسجلة' : 'Video Stories'}</span>
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === 'text' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isAr ? 'تقييمات مكتوبة' : 'Written Reviews'}
              </button>
            </div>

            <button
              onClick={() => setShowAddReviewModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition flex items-center gap-1.5"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>{isAr ? 'شارك تجربتك معنا' : 'Write a Review'}</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredReviews.map(review => {
            return (
              <div
                key={review.id}
                className="bg-slate-50/70 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div className="space-y-4">
                  {/* Top Bar with rating & date */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'طالب موثق' : 'Verified Student'}</span>
                    </div>
                  </div>

                  {/* Video Thumbnail trigger if available */}
                  {review.isVideo && review.videoThumbnail && (
                    <div
                      onClick={() => setSelectedVideoForModal(review)}
                      className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 cursor-pointer group shadow-md"
                    >
                      <img
                        src={review.videoThumbnail}
                        alt={review.studentName}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition">
                          <Play className="w-6 h-6 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2.5 end-2.5 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                        {review.videoDuration || '01:30'}
                      </span>
                    </div>
                  )}

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{isAr ? review.reviewTextAr : review.reviewTextEn}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      {review.studentName}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-sky-500" />
                      <span>{review.country}</span>
                      {review.teacherName && (
                        <span>• {isAr ? `مع ${review.teacherName}` : `with ${review.teacherName}`}</span>
                      )}
                    </p>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {review.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <h3 className="font-extrabold text-lg text-slate-900 mb-1">
              {isAr ? 'أضف تقييمك ورأيك في الأكاديمية' : 'Submit Your Feedback'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {isAr ? 'رأيكم يهمنا ويساعد الأسر المسلمة في اختيار المنهج المناسب' : 'Your words inspire other diaspora families.'}
            </p>

            <form onSubmit={handleAddReviewSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'الاسم:' : 'Your Name:'}
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  placeholder="e.g. Tariq Al-Mansoor"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'الدولة / المدينة:' : 'Country / City:'}
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder="Canada, Toronto"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'التقييم:' : 'Rating:'}
                </label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1"
                    >
                      <Star className={`w-6 h-6 ${rating >= star ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'رأيك وتجربتك بالتفصيل:' : 'Your Review:'}
                </label>
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder={isAr ? 'اكتب تجربتك مع المعلم ومستوى تقدمك...' : 'Share your journey with your mentor...'}
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white shadow"
                >
                  {isAr ? 'إرسال التقييم' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
