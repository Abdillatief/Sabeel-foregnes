import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { BlogPost } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/initialData';
import { Clock, Calendar, User, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, setIsBookingModalOpen } = useApp();
  const blogPosts: BlogPost[] = INITIAL_BLOG_POSTS;
  const isAr = lang === 'ar';

  const post = blogPosts.find((p) => p.slug === slug || p.id === slug) || blogPosts[0];

  return (
    <article className="py-10 lg:py-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet
        title={`${isAr ? post.titleAr : post.titleEn} | Sabeel Academy`}
        description={isAr ? post.excerptAr : post.excerptEn}
      />

      <Container size="narrow">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
          <Link to="/" className="hover:text-slate-950 dark:hover:text-white transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/blog" className="hover:text-slate-950 dark:hover:text-white transition-colors">
            {isAr ? 'المدونة' : 'Blog'}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">
            {isAr ? post.titleAr : post.titleEn}
          </span>
        </div>

        {/* Article Header */}
        <header className="text-start mb-8">
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-3">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight [text-wrap:balance]">
            {isAr ? post.titleAr : post.titleEn}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
              <User className="w-4 h-4 text-sky-500" />
              <span>{isAr ? post.authorAr : post.authorEn}</span>
            </div>
            <span aria-hidden="true">·</span>
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
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
          <img
            src={post.imageUrl || '/src/assets/images/sabeel_interactive_session_1792243649309.jpg'}
            alt={isAr ? post.titleAr : post.titleEn}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-start text-sm sm:text-base leading-relaxed space-y-6">
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
            {isAr ? post.excerptAr : post.excerptEn}
          </p>

          <div className="my-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border-s-4 border-amber-400">
            <p className="font-quran text-lg sm:text-xl text-amber-700 dark:text-amber-300 font-normal m-0 leading-loose">
              « وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا »
            </p>
            <span className="text-xs text-slate-500 mt-2 block">
              {isAr ? 'سورة المزمل' : 'Surah Al-Muzzammil'}
            </span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr ? post.contentAr : post.contentEn}
          </p>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'إن التأسيس المبكر بالصبر والحكمة، والاستعانة بمعلم مجاز يمتلك الرفق والمحبة، هو الركيزة الأساسية التي تنشئ علاقة وجدانية متينة بين الطفل وكتاب الله تستمر معه طوال حياته.'
              : 'Early foundation with patience, wisdom, and an authorized gentle mentor builds an enduring heartfelt bond between your child and Allah’s Book that lasts a lifetime.'}
          </p>
        </div>

        {/* Author Footer Card */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-start flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 font-bold">
            <User className="w-6 h-6 text-sky-600" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-950 dark:text-white block">
              {isAr ? post.authorAr : post.authorEn}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isAr ? 'هيئة التدريس والاستشارات الأكاديمية · الأزهر الشريف' : 'Faculty & Academic Advisory · Al-Azhar University'}
            </span>
          </div>
        </div>

        {/* Related Call to Action */}
        <div className="mt-12 p-8 rounded-2xl bg-slate-950 text-white text-center border border-slate-800">
          <h3 className="text-xl font-bold">
            {isAr ? 'ابدأ خطة طفلك القرآنية اليوم مع معلمين أزهريين' : 'Start Your Child’s Journey Today'}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {isAr ? 'احجز حصة استكشافية مجانية فردية 1-on-1 لمدة 30 دقيقة بدون أي التزام مالي.' : 'Book a free 30-minute 1-on-1 diagnostic lesson with our certified scholars.'}
          </p>
          <button
            type="button"
            onClick={() => setIsBookingModalOpen(true)}
            className="mt-6 px-6 py-3 text-xs sm:text-sm font-semibold rounded-xl text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>{isAr ? 'احجز الحصة التجريبية المجانية' : 'Book Free Trial Lesson'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

      </Container>
    </article>
  );
};
