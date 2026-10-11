import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CertificateModal } from './components/common/CertificateModal';
import { VideoReviewModal } from './components/common/VideoReviewModal';
import { CourseDetailModal } from './components/common/CourseDetailModal';
import { BookingWizard } from './components/booking/BookingWizard';
import { SEOHelmet } from './components/common/SEOHelmet';
import { AdminLoginModal } from './components/common/AdminLoginModal';
import { FloatingTrialButton } from './components/common/FloatingTrialButton';

// Marketing Sections
import { HeroSection } from './components/marketing/HeroSection';
import { LiveStatsSection } from './components/marketing/LiveStatsSection';
import { WhySabeelSection } from './components/marketing/WhySabeelSection';
import { HowItWorksSection } from './components/marketing/HowItWorksSection';
import { CoursesGrid } from './components/marketing/CoursesGrid';
import { TeachersSection } from './components/marketing/TeachersSection';
import { PricingSection } from './components/marketing/PricingSection';
import { ReviewsSection } from './components/marketing/ReviewsSection';
import { BlogSection } from './components/marketing/BlogSection';
import { FAQSection } from './components/marketing/FAQSection';
import { ContactSection } from './components/marketing/ContactSection';
import { LegalPages } from './components/marketing/LegalPages';
import { VerifyCertificateView } from './components/marketing/VerifyCertificateView';
import { PaymentCheckout } from './components/payment/PaymentCheckout';

// Portals
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { ParentDashboard } from './components/dashboards/ParentDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';

const MainContent: React.FC = () => {
  const { 
    activeView, 
    selectedCourseForModal, 
    setSelectedCourseForModal,
    selectedCertificateForModal,
    setSelectedCertificateForModal,
    selectedVideoForModal,
    setSelectedVideoForModal,
    isBookingModalOpen,
    setIsBookingModalOpen,
  } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
          <>
            <HeroSection />
            <LiveStatsSection />
            <WhySabeelSection />
            <HowItWorksSection />
            <CoursesGrid />
            <TeachersSection />
            <PricingSection />
            <ReviewsSection />
            <BlogSection />
            <FAQSection />
            <ContactSection />
          </>
        );
      case 'courses':
        return (
          <div className="py-6">
            <CoursesGrid />
            <FAQSection />
          </div>
        );
      case 'teachers':
        return (
          <div className="py-6">
            <TeachersSection />
            <ReviewsSection />
          </div>
        );
      case 'pricing':
        return (
          <div className="py-6">
            <PricingSection />
            <FAQSection />
          </div>
        );
      case 'checkout':
        return <PaymentCheckout />;
      case 'reviews':
        return (
          <div className="py-6">
            <ReviewsSection />
          </div>
        );
      case 'blog':
        return (
          <div className="py-6">
            <BlogSection />
          </div>
        );
      case 'faq':
        return (
          <div className="py-6">
            <FAQSection />
            <ContactSection />
          </div>
        );
      case 'contact':
        return (
          <div className="py-6">
            <ContactSection />
          </div>
        );
      case 'student-portal':
        return <StudentDashboard />;
      case 'parent-portal':
        return <ParentDashboard />;
      case 'teacher-portal':
        return <TeacherDashboard />;
      case 'admin-portal':
        return <AdminDashboard />;
      case 'verify-cert':
        return <VerifyCertificateView />;
      case 'privacy':
        return <LegalPages type="privacy" />;
      case 'terms':
        return <LegalPages type="terms" />;
      case 'refund':
        return <LegalPages type="refund" />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <SEOHelmet />
      <Navbar />

      <main className="flex-1">
        {renderActiveView()}
      </main>

      <Footer />

      {/* Floating Free Trial Action Button */}
      <FloatingTrialButton />

      {/* Modals */}
      <BookingWizard
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <CourseDetailModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onBookTrial={(course) => {
          setSelectedCourseForModal(null);
          setIsBookingModalOpen(true);
        }}
      />

      <CertificateModal
        certificate={selectedCertificateForModal}
        onClose={() => setSelectedCertificateForModal(null)}
      />

      <VideoReviewModal
        review={selectedVideoForModal}
        onClose={() => setSelectedVideoForModal(null)}
      />

      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
