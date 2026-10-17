import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { SectionHeader } from '../components/ui/SectionHeader';
import { MessageCircle, Mail, Phone, Globe, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { lang } = useApp();
  const isAr = lang === 'ar';

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="py-12 lg:py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet />

      <Container size="default">
        {/* Header */}
        <SectionHeader
          kicker={isAr ? 'تواصل مع الإدارة والمستشارين' : 'Advisory & Admissions'}
          title={isAr ? 'نحن هنا لمساعدة أسرتك في كل خطوة' : 'We Are Here to Assist Your Family'}
          subtitle={isAr 
            ? 'سواء كنت ترغب في استشارة حول مستوى طفلك، أو ترتيب مواعيد خاصة، أو لديك أي استفسار أكاديمي.' 
            : 'Whether you need consultation regarding your child’s level, custom schedules, or academic guidance.'}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Direct Communication Channels (5 Cols) */}
          <div className="lg:col-span-5 text-start space-y-6">
            
            {/* WhatsApp Highlight Box */}
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">
                    {isAr ? 'المحادثة الفورية عبر واتساب' : 'Direct WhatsApp Chat'}
                  </h3>
                  <span className="text-xs text-emerald-700 dark:text-emerald-300">
                    {isAr ? 'الرد الأسرع خلال أقل من 15 دقيقة' : 'Fastest response within 15 minutes'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed mb-4">
                {isAr
                  ? 'تحدث مباشرة مع مستشار القبول والتسجيل للحصول على إجابات فورية أو ترتيب حصة تجريبية سريعة.'
                  : 'Chat directly with our admissions counselor for instant answers or scheduling priority trial classes.'}
              </p>
              <a
                href="https://wa.me/201000000000?text=Assalamu%20Alaikum%20Sabeel%20Academy%20Admissions"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>{isAr ? 'فتح المحادثة الآن' : 'Start WhatsApp Chat'}</span>
              </a>
            </div>

            {/* Contact Details Card */}
            <Card className="p-6 space-y-4">
              <div className="flex items-start gap-3 text-xs sm:text-sm">
                <Mail className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-xs">{isAr ? 'البريد الإلكتروني للأكاديمية' : 'Email Support'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">support@sabeelacademy.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm pt-3 border-t border-slate-100 dark:border-slate-800">
                <Clock className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-xs">{isAr ? 'ساعات العمل والمتابعة' : 'Support Availability'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {isAr ? 'على مدار 7 أيام في الأسبوع · 8:00 ص - 10:00 م (توقيت مكة / لندن)' : '7 Days a Week · 8:00 AM - 10:00 PM (GMT & EST)'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm pt-3 border-t border-slate-100 dark:border-slate-800">
                <Globe className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-xs">{isAr ? 'المناطق المغطاة' : 'Coverage'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {isAr ? 'أمريكا الشمالية، المملكة المتحدة، أوروبا، ودول الخليج العربي' : 'USA, Canada, UK, Europe, and GCC Countries'}
                  </span>
                </div>
              </div>
            </Card>

          </div>

          {/* Consultation Form (7 Cols) */}
          <div className="lg:col-span-7 text-start">
            <Card className="p-6 sm:p-10">
              {formSent ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                    {isAr ? 'تم إرسال رسالتك بنجاح' : 'Message Sent Successfully'}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                    {isAr
                      ? 'شكراً لتواصلك مع أكاديمية سبيل. سيقوم مستشارنا الأكاديمي بالرد على بريدك أو هاتفك خلال ساعات قليلة بإذن الله.'
                      : 'Thank you for reaching out. Our academic coordinator will respond to your inquiry shortly.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSent(false)}
                    className="mt-6 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl"
                  >
                    {isAr ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2">
                    {isAr ? 'نموذج الاستشارة الأكاديمية والاستفسارات' : 'Academic Inquiry & Consultation Form'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={isAr ? 'الاسم الكامل' : 'Full Name'}
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isAr ? 'اسم ولي الأمر' : 'Your name'}
                    />

                    <Input
                      label={isAr ? 'رقم الواتساب مع رمز الدولة' : 'WhatsApp Phone'}
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1..."
                    />
                  </div>

                  <Input
                    label={isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                  />

                  <Select
                    label={isAr ? 'موضوع الاستفسار' : 'Inquiry Subject'}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    options={[
                      { value: 'general', label: isAr ? 'استفسار عام عن الأكاديمية' : 'General Academy Inquiry' },
                      { value: 'trial', label: isAr ? 'استفسار عن الحصة التجريبية' : 'Trial Class Questions' },
                      { value: 'custom-schedule', label: isAr ? 'ترتيب جدول خاص أو عائلي' : 'Custom / Family Scheduling' },
                      { value: 'curriculum', label: isAr ? 'استشارة حول المسار الأنسب لطفلي' : 'Curriculum Recommendation' },
                    ]}
                  />

                  <Textarea
                    label={isAr ? 'تفاصيل رسالتك أو استفسارك' : 'Your Message / Inquiry'}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={isAr ? 'اكتب استفسارك هنا وسيقوم المستشار بالرد عليك...' : 'Describe your inquiry or child’s background...'}
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold rounded-xl text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all cursor-pointer"
                  >
                    {isAr ? 'إرسال الاستفسار إلى المستشار الأكاديمي' : 'Submit Inquiry to Advisor'}
                  </button>
                </form>
              )}
            </Card>
          </div>

        </div>
      </Container>
    </div>
  );
};
