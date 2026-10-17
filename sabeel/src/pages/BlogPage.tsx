import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { BlogPost } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/initialData';
import { Clock, Calendar, ArrowLeft, ArrowRight, BookOpen, User } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { lang } = useApp();
  const blogPosts: BlogPost[] = INITIAL_BLOG_POSTS;
  const isAr = lang === 'ar';

  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = [
    { id: 'all', labelAr: 'جميع المقالات', labelEn: 'All Articles' },
    { id: 'parenting', labelAr: 'نصائح تربوية', labelEn: 'Parenting in the West' },
    { id: 'quran-sciences', labelAr: 'علوم القرآن والتجويد', labelEn: 'Quran & Tajweed' },
  ];

  return (
    <div className="py-12 lg:py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet />

      <Container size="default">
        {/* Header */}
        <SectionHeader
          kicker={isAr ? 'المدونة القرآنية والتربوية' : 'Insights & Parenting Guides'}
          title={isAr ? 'مقالات وإرشادات عملية لتربية جيل قرآني معتز بدينه' : 'Practical Guides for Nurturing a Confident Quranic Generation'}
          subtitle={isAr 
            ? 'دليل عملي للأسر المسلمة في الغرب ومختلف دول العالم حول أساليب التحفيظ، ضبط التجويد، وترسيخ اللغة العربية في وجدان الأبناء.' 
            : 'Evidence-based advice from certified Azhari scholars on Quran retention, Tajweed mastery, and Islamic parenting.'}
        />

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col justify-between text-start group overflow-hidden" noPadding>
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={post.imageUrl || '/src/assets/images/sabeel_interactive_session_1792243649309.jpg'}
                  alt={isAr ? post.titleAr : post.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 start-3 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {post.category}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.publishDate}</span>
                    </div>
                    <span aria-hidden="true">·</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTimeMinutes} {isAr ? 'دقائق قراءة' : 'min read'}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    <Link to={`/blog/${post.slug || post.id}`}>
                      {isAr ? post.titleAr : post.titleEn}
                    </Link>
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {isAr ? post.excerptAr : post.excerptEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <User className="w-3.5 h-3.5 text-sky-500" />
                    <span>{isAr ? post.authorAr : post.authorEn}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug || post.id}`}
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 flex items-center gap-1"
                  >
                    <span>{isAr ? 'اقرأ المقال كاملاً' : 'Read Article'}</span>
                    {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </Container>
    </div>
  );
};
