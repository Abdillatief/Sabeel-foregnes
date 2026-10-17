import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead } from '../../types';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { lang, addNewLead } = useApp();
  const isAr = lang === 'ar';

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;

    const lead: Lead = {
      id: `lead-contact-${Date.now()}`,
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim() || 'inquiry@domain.com',
      country: 'Global Inquiry',
      countryCode: 'GLOBAL',
      timezone: 'UTC',
      source: 'Website Form',
      interestedCourse: 'quran-reading',
      notes: message.trim() || 'Direct message from Contact Page.',
      status: 'New Lead',
      createdAt: new Date().toISOString(),
      dealValueUSD: 80,
    };

    addNewLead(lead);
    setIsSubmitted(true);
    setName('');
    setWhatsapp('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-sky-600 font-bold text-xs uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                {isAr ? 'تواصل معنا' : 'Get in Touch'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
                {isAr ? 'نحن هنا للإجابة عن جميع استفساراتكم' : 'We are Here to Guide Your Family'}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isAr
                  ? 'فريق القبول والتوجيه الأكاديمي متاح على مدار الساعة عبر الواتساب والبريد الإلكتروني للرد على أسئلتكم ومساعدتكم في اختيار المسار الأنسب.'
                  : 'Our academic guidance team is ready 24/7 on WhatsApp and email to assist you in choosing the ideal learning pathway.'}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <a
                href="https://wa.me/201000000000?text=Assalamu%20Alaikum%20Sabeel%20Academy"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">
                    {isAr ? 'محادثة فورية (الرد خلال 10 دقائق):' : 'Instant WhatsApp (Reply <10 mins):'}
                  </span>
                  <span className="text-sm font-bold text-slate-900" dir="ltr">+20 100 000 0000</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">
                    {isAr ? 'البريد الإلكتروني الرسمي:' : 'Official Email Address:'}
                  </span>
                  <span className="text-sm font-bold text-slate-900">support@sabeelacademy.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">
                    {isAr ? 'أوقات العمل والتنسيق:' : 'Operational Hours:'}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {isAr ? '24 ساعة / 7 أيام في الأسبوع' : '24/7 Global Timezones Coverage'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-xl text-slate-900 mb-2">
              {isAr ? 'أرسل استفسارك وسنتواصل معك فوراً' : 'Send us a Message'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {isAr ? 'سيتم تحويل رسالتك إلى المشرف الأكاديمي للتواصل معك.' : 'Your inquiry will be routed directly to an academic coordinator.'}
            </p>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-base text-emerald-900">
                  {isAr ? 'تم استلام رسالتك بنجاح!' : 'Message Received Successfully!'}
                </h4>
                <p className="text-xs text-emerald-700">
                  {isAr
                    ? 'بارك الله فيكم، سيتواصل معكم المشرف الأكاديمي عبر الواتساب في أقرب وقت.'
                    : 'Thank you! An advisor will reach out to you via WhatsApp shortly.'}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 text-xs text-emerald-800 font-bold underline"
                >
                  {isAr ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? 'الاسم بالكامل:' : 'Full Name:'}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder={isAr ? 'مثال: أبو عبد الله' : 'e.g. John / Abu Abdullah'}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? 'رقم الواتساب (مع كود الدولة):' : 'WhatsApp (with Country Code):'}
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      placeholder="+1 555-0199"
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? 'البريد الإلكتروني:' : 'Email Address:'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? 'نص الاستفسار أو الرسالة:' : 'Inquiry or Questions:'}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={isAr ? 'استفسار عن المواعيد، المعلمين، أو عروض العائلات...' : 'Ask about scheduling, family discounts, or placement...'}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 rtl:rotate-180" />
                  <span>{isAr ? 'إرسال الاستفسار الآن' : 'Send Message Now'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
