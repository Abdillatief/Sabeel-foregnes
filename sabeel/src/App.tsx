import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { FloatingTrialButton } from './components/common/FloatingTrialButton';
import { BookingWizard } from './components/booking/BookingWizard';
import { CourseDetailModal } from './components/common/CourseDetailModal';
import { VideoReviewModal } from './components/common/VideoReviewModal';

// Resilient Lazy Loader to prevent ChunkLoadError white screen on Cloudflare Pages
function lazyWithRetry<T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.warn('Initial chunk load failed, retrying once...', error);
      return await componentImport();
    }
  });
}

// Lazy Loaded Pages with Retry Protection
const HomePage = lazyWithRetry(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const CoursesPage = lazyWithRetry(() => import('./pages/CoursesPage').then(m => ({ default: m.CoursesPage })));
const CourseDetailsPage = lazyWithRetry(() => import('./pages/CourseDetailsPage').then(m => ({ default: m.CourseDetailsPage })));
const TeachersPage = lazyWithRetry(() => import('./pages/TeachersPage').then(m => ({ default: m.TeachersPage })));
const TeacherProfilePage = lazyWithRetry(() => import('./pages/TeacherProfilePage').then(m => ({ default: m.TeacherProfilePage })));
const PricingPage = lazyWithRetry(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const BookTrialPage = lazyWithRetry(() => import('./pages/BookTrialPage').then(m => ({ default: m.BookTrialPage })));
const ReviewsPage = lazyWithRetry(() => import('./pages/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const FAQPage = lazyWithRetry(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const BlogPage = lazyWithRetry(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazyWithRetry(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));

// Fallback Luxury Skeleton Spinner with Arabic and English indicator
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-slate-950">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wider">
        جاري تحميل أكاديمية سبيل...
      </span>
    </div>
  </div>
);

const AppLayout: React.FC = () => {
  const { 
    selectedCourseForModal, 
    setSelectedCourseForModal,
    selectedVideoForModal, 
    setSelectedVideoForModal,
    isBookingModalOpen, 
    setIsBookingModalOpen 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-amber-400 selection:text-slate-950">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:slug" element={<CourseDetailsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/teachers/:id" element={<TeacherProfilePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/book-trial" element={<BookTrialPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {/* Floating Free Trial Action Button */}
      <FloatingTrialButton />

      {/* Global Interactive Modals */}
      <BookingWizard
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <CourseDetailModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onBookTrial={() => {
          setSelectedCourseForModal(null);
          setIsBookingModalOpen(true);
        }}
      />

      <VideoReviewModal
        review={selectedVideoForModal}
        onClose={() => setSelectedVideoForModal(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
