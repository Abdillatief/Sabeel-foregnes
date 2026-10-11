import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qAr: 'كيف تجري الحصة التجريبية المجانية، وهل تتطلب أي بطاقة بنكية؟',
      qEn: 'How does the free trial lesson work, and is a credit card required?',
      aAr: 'الحصة التجريبية مجانية 100% ولا تتطلب أي بيانات بطاقة ائتمانية. مدتها 30 دقيقة فردية 1-on-1 مع شيخ أزهري، لتقييم المستوى وبناء خطة تناسب وقتك وأهدافك.',
      aEn: 'The trial lesson is 100% free with zero credit card needed. It is a private 30-minute 1-on-1 session with an Azhari tutor to evaluate your current level and establish a roadmap.',
    },
    {
      qAr: 'هل يتوفر معلمون ومعلمات متخصصون لتعليم السيدات والأطفال الصغار؟',
      qEn: 'Are female teachers available for sisters and young children?',
      aAr: 'نعم بالتأكيد! لدينا طاقم كامل ومتميز من المعلمات الفضليات المجازات بالأزهر الشريف ومتخصصات في تعليم الفتيات والأطفال من عمر 4 سنوات بأساليب محببة.',
      aEn: 'Yes, absolutely! We have a dedicated staff of qualified female scholars authorized by Al-Azhar, specialized in teaching women and young children with compassionate patience.',
    },
    {
      qAr: 'ماذا لو رغبت في تعويض أو تأجيل حصة بسبب ظروف طارئة؟',
      qEn: 'What if I need to reschedule a session due to an emergency?',
      aAr: 'تتميز أكاديميتنا بأقصى درجات المرونة؛ يمكنك إعادة جدولة أي حصة بإشعار مسبق قبل ساعتين من موعدها عبر لوحة الطالب دون أن تخصم من رصيدك.',
      aEn: 'Our system offers supreme flexibility. You can reschedule any class with a 2-hour advance notice directly from your Student Portal without forfeiting your session.',
    },
    {
      qAr: 'طفلي لا يتحدث العربية مطلقاً، هل يمكنه البدء معكم؟',
      qEn: 'My child does not speak Arabic at all; can they still start?',
      aAr: 'نعم! غالبية طلابنا في كندا وبريطانيا وأمريكا يبدأون من الصفر. معلمونا يتقنون الإنجليزية ويبدأون بالقاعدة النورانية بطريقة مبسطة وتفاعلية جداً.',
      aEn: 'Yes! Most of our students in the US, UK, and Canada begin with zero Arabic. Our tutors are fluent in English and guide children step-by-step using interactive Noorani Qaida phonetics.',
    },
    {
      qAr: 'كيف يتم الدفع وما هي العملات وبوابات الدفع المدعومة؟',
      qEn: 'How does payment work, and which currencies/methods are supported?',
      aAr: 'ندعم الدفع الآمن عبر Stripe, PayPal, Visa, Mastercard, Apple Pay بجميع العملات العالمية (USD, EUR, GBP, SAR, AED, QAR, KWD, EGP) مع ضمان استرجاع 100% خلال أول أسبوعين.',
      aEn: 'We support secured payments via Stripe, PayPal, Apple Pay, Visa, and Mastercard in USD, EUR, GBP, SAR, AED, QAR, KWD, and EGP, backed by a 14-day 100% money-back guarantee.',
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sky-600 font-bold text-xs uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            {isAr ? 'إجابات واضحة' : 'FAQ'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            {isAr ? 'الأسئلة الشائعة والأكثر تكراراً' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {isAr
              ? 'كل ما تود معرفته عن نظام الحصص، المناهج، المعلمين، وضمان الرضا.'
              : 'Everything you need to know about our classes, certified tutors, and satisfaction guarantee.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/60 transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-start font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-100/70 transition"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-sky-500 flex-shrink-0" />
                    <span>{isAr ? faq.qAr : faq.qEn}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/40 bg-white">
                    {isAr ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
          <span>{isAr ? 'هل لديك سؤال آخر؟' : 'Have another question?'} </span>
          <a
            href="https://wa.me/201000000000"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-600 font-bold hover:underline"
          >
            {isAr ? 'تحدث مباشرة مع فريق القبول عبر الواتساب' : 'Chat directly with our admissions team on WhatsApp'}
          </a>
        </div>
      </div>
    </section>
  );
};
