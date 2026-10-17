import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types';
import { storageService } from '../../services/storageService';
import { BookOpen, Calendar, Clock, ArrowRight, User, Share2 } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const blogPosts = storageService.getBlogPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="py-16 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1.5"
          >
            ← {isAr ? 'العودة لجميع المقالات' : 'Back to all articles'}
          </button>

          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              {selectedPost.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {isAr ? selectedPost.titleAr : selectedPost.titleEn}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-4">
              <span>{isAr ? selectedPost.authorAr : selectedPost.authorEn}</span>
              <span>•</span>
              <span>{selectedPost.publishDate}</span>
              <span>•</span>
              <span>{selectedPost.readTimeMinutes} {isAr ? 'دقائق قراءة' : 'min read'}</span>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden aspect-video shadow-md">
            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.titleEn}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-semibold text-lg text-slate-900 leading-relaxed">
              {isAr ? selectedPost.excerptAr : selectedPost.excerptEn}
            </p>
            <p className="leading-loose">
              {isAr ? selectedPost.contentAr : selectedPost.contentEn}
            </p>
            <p className="leading-loose">
              {isAr
                ? 'إن ربط الأبناء بالقرآن الكريم هو الحصن المنيع في هذا العصر. ندعوكم في أكاديمية سبيل للاستفادة من الحصص التجريبية المجانية ومشاركة شيخ أزهري متخصص رحلة تعليم أبنائكم.'
                : 'Connecting our children with the Quran is our greatest responsibility. We welcome you to experience our certified Azhari tutors through a complimentary 100% free trial.'}
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-sky-50 p-6 rounded-3xl border border-sky-200 text-center space-y-3">
            <h3 className="font-extrabold text-base text-slate-900">
              {isAr ? 'هل تود تجربة حلقة قرآنية لطفلك مجاناً؟' : 'Ready to begin your child\'s Quran journey?'}
            </h3>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow"
            >
              {isAr ? 'احجز حصة تجريبية مجانية 100%' : 'Book Free Trial Lesson'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-sky-600 font-bold text-xs uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            {isAr ? 'مدونة سبيل التعليمية' : 'Sabeel Educational Blog'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            {isAr ? 'مقالات وتوجيهات قرآنية وتربوية' : 'Articles & Guides for Diaspora Muslim Families'}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {isAr
              ? 'نصائح لتعليم الأبناء في بلاد الغربة، أسرار إتقان التجويد، وطرق سهلة لحفظ القرآن وتثبيته.'
              : 'Actionable parenting insights, Tajweed breakdowns, and strategies for lifelong Quran retention.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-sky-300 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 start-3 px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-sky-800 shadow">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.publishDate}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTimeMinutes} {isAr ? 'دقائق قراءة' : 'min'}</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-sky-600 transition leading-snug">
                    {isAr ? post.titleAr : post.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {isAr ? post.excerptAr : post.excerptEn}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                <span>{isAr ? post.authorAr : post.authorEn}</span>
                <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition flex items-center gap-1">
                  <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
