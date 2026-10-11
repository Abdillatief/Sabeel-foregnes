import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const SEOHelmet: React.FC = () => {
  const { lang, activeView } = useApp();
  const isAr = lang === 'ar';

  useEffect(() => {
    // Dynamic Page Titles
    const titleMap: Record<string, { ar: string; en: string }> = {
      home: {
        ar: 'Sabeel Academy | أكاديمية سبيل لتعليم القرآن الكريم واللغة العربية',
        en: 'Sabeel Academy | World-Class Online Quran & Arabic Academy',
      },
      courses: {
        ar: 'الدورات والمناهج المعتمدة | Sabeel Academy',
        en: 'Accredited Curricula & Courses | Sabeel Academy',
      },
      teachers: {
        ar: 'نخبة علماء ومشايخ الأزهر الشريف | Sabeel Academy',
        en: 'Accredited Azhari Faculty & Reciters | Sabeel Academy',
      },
      pricing: {
        ar: 'الأسعار والباقات الشهرية | Sabeel Academy',
        en: 'Transparent Pricing & Monthly Plans | Sabeel Academy',
      },
      reviews: {
        ar: 'آراء وتقييمات الطلاب المسجلة | Sabeel Academy',
        en: 'Verified Student Reviews & Video Stories | Sabeel Academy',
      },
      blog: {
        ar: 'المدونة القرآنية والتربوية | Sabeel Academy',
        en: 'Quranic & Parenting Educational Blog | Sabeel Academy',
      },
      faq: {
        ar: 'الأسئلة الشائعة | Sabeel Academy',
        en: 'Frequently Asked Questions | Sabeel Academy',
      },
      contact: {
        ar: 'اتصل بنا وحجز الحصص | Sabeel Academy',
        en: 'Contact & Admissions | Sabeel Academy',
      },
      'student-portal': {
        ar: 'بوابة الطالب | Sabeel Academy Student Portal',
        en: 'Student Portal | Sabeel Academy',
      },
      'parent-portal': {
        ar: 'بوابة ولي الأمر | Sabeel Academy Parent Portal',
        en: 'Parent Portal | Sabeel Academy',
      },
      'teacher-portal': {
        ar: 'بوابة المعلم | Sabeel Teacher LMS',
        en: 'Teacher Portal | Sabeel Teacher LMS',
      },
      'admin-portal': {
        ar: 'لوحة الإدارة والـ CRM | Sabeel Admin Hub',
        en: 'Super Admin & CRM Hub | Sabeel Academy',
      },
    };

    const currentTitle = titleMap[activeView]
      ? (isAr ? titleMap[activeView].ar : titleMap[activeView].en)
      : 'Sabeel Academy';

    document.title = currentTitle;

    // Structured Data JSON-LD
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'EducationalOrganization',
          '@id': 'https://sabeelacademy.com/#organization',
          name: 'Sabeel Academy',
          alternateName: 'أكاديمية سبيل لتعليم القرآن الكريم',
          url: 'https://sabeelacademy.com',
          logo: 'https://sabeelacademy.com/favicon.ico',
          description:
            'Premier global online academy teaching the Holy Quran, Tajweed, Classical Arabic, and Islamic studies with Azhari scholars.',
          sameAs: [
            'https://www.facebook.com/sabeelacademy',
            'https://www.instagram.com/sabeelacademy',
            'https://www.youtube.com/@sabeelacademy',
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.98',
            reviewCount: '1240',
            bestRating: '5',
          },
        },
        {
          '@type': 'Course',
          name: 'Quran Memorization & Tajweed with Sanad',
          description: '1-on-1 private recitation and memorization with authorized Azhari scholars.',
          provider: {
            '@type': 'Organization',
            name: 'Sabeel Academy',
          },
        },
      ],
    };

    let scriptTag = document.getElementById('json-ld-sabeel');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-sabeel';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [activeView, lang, isAr]);

  return null;
};
