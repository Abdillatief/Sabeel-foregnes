import React from 'react';
import { HeroSection } from '../components/marketing/HeroSection';
import { CoursesGrid } from '../components/marketing/CoursesGrid';
import { TeachersSection } from '../components/marketing/TeachersSection';
import { MethodologySection } from '../components/marketing/MethodologySection';
import { ReviewsSection } from '../components/marketing/ReviewsSection';
import { PricingSection } from '../components/marketing/PricingSection';
import { FAQSection } from '../components/marketing/FAQSection';
import { ConversionBanner } from '../components/marketing/ConversionBanner';
import { SEOHelmet } from '../components/common/SEOHelmet';

export const HomePage: React.FC = () => {
  return (
    <>
      <SEOHelmet />
      <HeroSection />
      <div id="courses">
        <CoursesGrid />
      </div>
      <div id="faculty">
        <TeachersSection />
      </div>
      <div id="methodology">
        <MethodologySection />
      </div>
      <div id="reviews">
        <ReviewsSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <ConversionBanner />
    </>
  );
};
