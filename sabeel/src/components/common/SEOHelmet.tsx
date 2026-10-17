import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export interface SEOProps {
  title?: string;
  description?: string;
}

export const SEOHelmet: React.FC<SEOProps> = ({ title, description }) => {
  const { lang } = useApp();
  const isAr = lang === 'ar';
  const location = useLocation();

  useEffect(() => {
    const routeTitles: Record<string, { title: { ar: string; en: string }; desc: { ar: string; en: string } }> = {
      '/': {
        title: {
          ar: 'Sabeel Academy | أكاديمية سبيل لتعليم القرآن الكريم واللغة العربية',
          en: 'Sabeel Academy | Premier Online Quran & Arabic Academy',
        },
        desc: {
          ar: 'أكاديمية تعليمية متخصصة تجمع بين أصالة السند النبوي المتصل وأحدث أساليب التدريس التفاعلي الفردي 1-on-1 للأطفال والكبار حول العالم.',
          en: 'A dedicated premier academy connecting families globally with certified Azhari tutors through personalized 1-on-1 live instruction.',
        },
      },
      '/about': {
        title: {
          ar: 'عن أكاديمية سبيل | إسناد أزهري متصل ومنهجية عالمية',
          en: 'About Sabeel Academy | Azhar Heritage & Pedagogy',
        },
        desc: {
          ar: 'تعرف على رسالة أكاديمية سبيل ومجلسها العلمي ومعايير اختيار نخبة معلمي ومعلمات الأزهر الشريف بالسند المتصل.',
          en: 'Discover Sabeel Academy’s mission, Azhari academic council, and rigorous teacher accreditation standards.',
        },
      },
      '/courses': {
        title: {
          ar: 'المسارات والمناهج التعليمية | Sabeel Academy',
          en: 'Curricula & Courses Catalog | Sabeel Academy',
        },
        desc: {
          ar: 'مسارات متخصصة في تلاوة القرآن الكريم، الحفظ والإجازة بالسند، التجويد النظري والتطبيقي، واللغة العربية لجميع الأعمار.',
          en: 'Specialized curricula in Quran reading, Hifz with Sanad, Tajweed, and Classical Arabic for all ages.',
        },
      },
      '/teachers': {
        title: {
          ar: 'نخبة مشايخ ومعلمات الأزهر الشريف | Sabeel Academy',
          en: 'Certified Azhari Faculty & Reciters | Sabeel Academy',
        },
        desc: {
          ar: 'تعرف على هيئتنا التعليمية من خريجي جامعة الأزهر الشريف والمجازين بالقراءات مع إمكانية الاستماع لعينة التلاوة وحجز حصة.',
          en: 'Meet our authorized Azhari tutors, listen to their live recitation samples, and book a diagnostic session.',
        },
      },
      '/pricing': {
        title: {
          ar: 'الرسوم والباقات التعليمية الشفافة | Sabeel Academy',
          en: 'Transparent Tuition & Plans | Sabeel Academy',
        },
        desc: {
          ar: 'باقات شهرية مرنة بدون اشتراكات إجبارية مع خصومات عائلية وضمان استرجاع كامل الرسوم بعد أول حصة.',
          en: 'Flexible monthly family plans with zero lock-in, sibling discounts, and 100% money-back guarantee.',
        },
      },
      '/book-trial': {
        title: {
          ar: 'احجز حصتك التجريبية المجانية | Sabeel Academy',
          en: 'Book Your Free 1-on-1 Trial Class | Sabeel Academy',
        },
        desc: {
          ar: 'احجز حصة استكشافية فردية 1-on-1 لمدة 30 دقيقة مع شيخ أزهري معتمد مجاناً وبدون بطاقة ائتمانية.',
          en: 'Schedule a free 30-minute private diagnostic lesson with a certified Azhari scholar. Zero credit card needed.',
        },
      },
      '/reviews': {
        title: {
          ar: 'تجارب وآراء أولياء الأمور والطلاب | Sabeel Academy',
          en: 'Parent & Student Reviews | Sabeel Academy',
        },
        desc: {
          ar: 'قصص وتجارب حقيقية لأسر مسلمة من أمريكا، بريطانيا، كندا، وأوروبا يتعلم أبناؤهم في أكاديمية سبيل.',
          en: 'Verified testimonials and experiences from Muslim families in the USA, UK, Canada, and Europe.',
        },
      },
      '/faq': {
        title: {
          ar: 'الأسئلة الشائعة وإجابات أولياء الأمور | Sabeel Academy',
          en: 'Frequently Asked Questions | Sabeel Academy',
        },
        desc: {
          ar: 'كل ما تحتاج معرفته عن الحصة التجريبية، المعلمات للإناث، الأوقات وجدول الحصص، وطرق الدفع والتعويض.',
          en: 'Everything you need to know about trial classes, female tutors, timezones, and flexible rescheduling.',
        },
      },
      '/contact': {
        title: {
          ar: 'تواصل مع المستشار الأكاديمي | Sabeel Academy',
          en: 'Contact & Academic Consultation | Sabeel Academy',
        },
        desc: {
          ar: 'تحدث مباشرة مع مستشارينا الأكاديميين عبر واتساب أو احجز استشارة مجانية لمناقشة خطة تعليم أطفالك.',
          en: 'Speak directly with our academic advisors on WhatsApp or submit an inquiry for custom guidance.',
        },
      },
      '/blog': {
        title: {
          ar: 'المدونة القرآنية والتربوية | Sabeel Academy',
          en: 'Quranic & Parenting Blog | Sabeel Academy',
        },
        desc: {
          ar: 'مقالات تربوية ودليل عملي للأسر المسلمة في الغرب حول تحفيظ الأبناء، ضبط التجويد، وترسيخ الهوية.',
          en: 'Educational articles and parenting guides on nurturing Quranic love and Islamic identity in children.',
        },
      },
    };

    const currentRouteConfig = routeTitles[location.pathname];

    const finalTitle = title || (currentRouteConfig ? (isAr ? currentRouteConfig.title.ar : currentRouteConfig.title.en) : 'Sabeel Academy');
    const finalDesc = description || (currentRouteConfig ? (isAr ? currentRouteConfig.desc.ar : currentRouteConfig.desc.en) : 'Global Islamic Online Academy for Quran, Tajweed, Arabic & Islamic Studies.');

    document.title = finalTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDesc);

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', finalDesc);

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
          description: finalDesc,
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
  }, [location.pathname, title, description, lang, isAr]);

  return null;
};
