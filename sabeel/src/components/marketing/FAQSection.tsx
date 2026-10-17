import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, MessageCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qAr: 'كيف تجري الحصة التجريبية المجانية، وهل تتطلب أي بطاقة بنكية؟',
      qEn: 'How does the free trial lesson work, and is a credit card required?',
      aAr: 'الحصة التجريبية مجانية 100% ولا تتطلب أي بيانات بطاقة ائتمانية. مدتها 30 دقيقة فردية 1-on-1 مع شيخ أزهري، لتقييم مخارج الحروف وبناء خطة تناسب وقتك وأهدافك بدون أي التزام.',
      aEn: 'The trial lesson is 100% free with zero credit card needed. It is a private 30-minute 1-on-1 session with an Azhari tutor to evaluate your current phonetics and build a personalized roadmap.',
    },
    {
      qAr: 'هل يتوفر طاقم معلمات فضليات متخصصات لتعليم الأخوات والفتيات والأطفال الصغار؟',
      qEn: 'Are certified female teachers available for sisters and young children?',
      aAr: 'نعم بالتأكيد! لدينا قسم كامل ومتميز من المعلمات الفضليات المجازات بالأزهر الشريف والمتخصصات في تعليم الفتيات والأطفال من عمر 4 سنوات بالصبر والأسلوب التربوي المحبب.',
      aEn: 'Yes, absolutely! We have a dedicated faculty of certified female Azhari scholars specialized in teaching sisters and children aged 4+ with nurturing patience and care.',
    },
    {
      qAr: 'ماذا لو رغبت في تعويض أو تأجيل حصة بسبب ظروف طارئة أو مواعيد المدرسة؟',
      qEn: 'What happens if I need to reschedule a session due to an emergency?',
      aAr: 'تتميز أكاديميتنا بأقصى درجات المرونة؛ يمكنك إعادة جدولة أي حصة بإشعار مسبق قبل ساعتين من موعدها دون أي رسوم إضافية ودون أن تخصم من رصيدكم.',
      aEn: 'Our system offers maximum flexibility. You can reschedule any class with a 2-hour advance notice without penalty or forfeiting your credit.',
    },
    {
      qAr: 'أطفالي لا يتحدثون العربية مطلقاً، هل يمكنهم البدء معكم؟',
      qEn: 'My children do not speak any Arabic; can they still start?',
      aAr: 'نعم بكل تأكيد! أغلب طلابنا في أمريكا وبريطانيا وكندا وأستراليا يبدأون من الصفر. شيوخنا ومعلماتنا يتقنون الإنجليزية بطلاقة ويبدأون مع الطفل خطوة بخطوة عبر منهج تفاعلي شيق.',
      aEn: 'Yes! Most of our students in North America, Europe, and Australia start with zero Arabic. Our tutors are bilingual and guide them step-by-step using interactive methods.',
    },
    {
      qAr: 'ما هي طرق الدفع المعتمدة وما هي سياسة استرجاع الأموال؟',
      qEn: 'What payment methods are supported and what is your refund policy?',
      aAr: 'ندعم الدفع المشفر عبر Stripe و Visa و Mastercard و Apple Pay بجميع العملات العالمية. كما نضمن استرداد الرسوم 100% بعد أول حصة مدفوعة إن لم تكن راضياً تماماً.',
      aEn: 'We support 256-bit SSL encrypted payments via Stripe, Visa, Mastercard, and Apple Pay in all major currencies, backed by an unconditional 100% money-back guarantee.',
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-start pb-10 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wide mb-2">
            <span>{isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>{isAr ? 'إجابات واضحة' : 'Parent Clarifications'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight [text-wrap:balance]">
            {isAr ? 'إجابات وافية عن كل ما يشغل بال العائلة قبل الانطلاق' : 'Clear Answers to Everyday Family Questions'}
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isAr
              ? 'جمعنا لك أهم الاستفسارات التي يطرحها أولياء الأمور حول الحصص، المعلمين، والمواعيد.'
              : 'Direct answers to the most common inquiries regarding tutors, technology, and scheduling.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-8 divide-y divide-slate-200/80 dark:divide-slate-800/80">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div key={idx} className="py-5 text-start">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-start group py-1"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base font-bold transition-colors ${
                    isOpen ? 'text-sky-600 dark:text-sky-400' : 'text-slate-950 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300'
                  }`}>
                    {isAr ? faq.qAr : faq.qEn}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600 dark:text-sky-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                    {isAr ? faq.aAr : faq.aEn}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Footer Link */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
          <div>
            <span className="text-sm font-bold text-slate-950 dark:text-white block">
              {isAr ? 'لديك استفسار خاص بعائلتك أو جدول المواعيد؟' : 'Have a specific scheduling or family inquiry?'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
              {isAr ? 'فريق الدعم الأكاديمي متاح لمساعدتكم واختيار المعلم الأنسب.' : 'Our academic advisory team is available to assist you.'}
            </span>
          </div>

          <a
            href="https://wa.me/201000000000?text=Assalamu%20Alaikum%20Sabeel%20Academy"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isAr ? 'تواصل معنا عبر واتساب' : 'Chat on WhatsApp'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
