import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Mail, Phone, Globe, ArrowLeft, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4 text-start">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-transparent">
                <img
                  src="/src/assets/images/sabeel_brand_logo_1792261027598.jpg"
                  alt={isAr ? 'شعار أكاديمية سبيل' : 'Sabeel Academy Logo'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-white rounded-lg p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight">
                  {isAr ? 'أكاديمية سبيل العالمية' : 'Sabeel Academy Global'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isAr ? 'لتعليم القرآن الكريم واللغة العربية' : 'Quran & Classical Arabic Education'}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {isAr
                ? 'أكاديمية إسلامية عالمية تعنى بتعليم القرآن الكريم وأحكام التجويد، واللغة العربية للناطقين بغيرها، والدراسات الإسلامية للأجيال المسلمة حول العالم بإسناد أزهري متصل.'
                : 'An international Islamic academy dedicated to Quranic recitation, classical Arabic, and Islamic studies for diaspora Muslim families with authentic Azhari Sanad.'}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'معتمدون بالأسانيد المتصلة · مشيخة المقارئ المصرية' : 'Accredited with Continuous Sanad'}</span>
            </div>
          </div>

          {/* Nav: Courses */}
          <div className="text-start">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {isAr ? 'المسارات الدراسية' : 'Curricula'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/courses/quran-reading" className="hover:text-white transition-colors">
                  {isAr ? 'القاعدة النورانية والتأسيس' : 'Noorani Qaida'}
                </Link>
              </li>
              <li>
                <Link to="/courses/quran-memorization" className="hover:text-white transition-colors">
                  {isAr ? 'تحفيظ القرآن الكريم' : 'Quran Memorization (Hifz)'}
                </Link>
              </li>
              <li>
                <Link to="/courses/tajweed-mastery" className="hover:text-white transition-colors">
                  {isAr ? 'أحكام التجويد والإتقان' : 'Tajweed Mastery'}
                </Link>
              </li>
              <li>
                <Link to="/courses/arabic-non-native" className="hover:text-white transition-colors">
                  {isAr ? 'العربية للناطقين بغيرها' : 'Arabic for Non-Natives'}
                </Link>
              </li>
              <li>
                <Link to="/courses/islamic-studies" className="hover:text-white transition-colors">
                  {isAr ? 'الدراسات الإسلامية للأطفال' : 'Islamic Studies for Kids'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav: Quick Links */}
          <div className="text-start">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {isAr ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/teachers" className="hover:text-white transition-colors">
                  {isAr ? 'هيئة التدريس الأزهري' : 'Azhari Scholars'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {isAr ? 'عن الأكاديمية والاعتماد' : 'About & Sanad Heritage'}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  {isAr ? 'الأسعار والاشتراكات' : 'Tuition & Plans'}
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-white transition-colors">
                  {isAr ? 'تجارب أولياء الأمور' : 'Parent Reviews'}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  {isAr ? 'المدونة التربوية' : 'Educational Blog'}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav: Direct Advisory */}
          <div className="text-start">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {isAr ? 'التواصل الأكاديمي' : 'Advisory Support'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{isAr ? 'خدمة الطلاب في 42 دولة' : 'Serving 42+ Countries'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>support@sabeelacademy.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span dir="ltr">+20 10 0000 0000</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/book-trial"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>{isAr ? 'حجز حصة استكشافية' : 'Book Free Trial'}</span>
                  {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Terms */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {isAr ? 'أكاديمية سبيل لتعليم القرآن واللغة العربية. جميع الحقوق محفوظة.' : 'Sabeel Academy. All rights reserved.'}</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-300 transition-colors">
              {isAr ? 'عن الأكاديمية' : 'About'}
            </Link>
            <Link to="/faq" className="hover:text-slate-300 transition-colors">
              {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              {isAr ? 'تواصل معنا' : 'Contact'}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
