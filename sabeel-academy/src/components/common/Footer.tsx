import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Award, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, setActiveView, setIsBookingModalOpen } = useApp();
  const isAr = lang === 'ar';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-900 border-b border-sky-900/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
          <div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest block mb-1">
              {isAr ? 'ابدأ رحلتك المباركة اليوم' : 'Start Your Blessed Journey Today'}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              {isAr ? 'حصة تجريبية مجانية 100% مع نخبة علماء الأزهر' : '100% Free Trial Lesson with Accredited Azhari Scholars'}
            </h3>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-xl">
              {isAr
                ? 'تقييم فردي لمستوى التلاوة أو الحفظ، وتحديد خطة دراسية مخصصة تناسب وقتك دون أي التزام مالي.'
                : '1-on-1 personalized level evaluation & structured roadmap designed around your schedule without any financial commitment.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-slate-950 font-black text-sm px-7 py-3.5 rounded-2xl shadow-xl transition transform hover:scale-105 active:scale-95"
            >
              {isAr ? 'احجز حصتك التجريبية الآن' : 'Book Free Trial Lesson'}
            </button>
            <a
              href="https://wa.me/201000000000?text=Assalamu%20Alaikum%20Sabeel%20Academy"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight text-white">Sabeel</span>
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400 ms-1.5 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  Academy
                </span>
                <p className="text-xs text-slate-400">
                  {isAr ? 'أكاديمية سبيل لتعليم القرآن واللغة العربية' : 'Global Quran & Arabic Academy'}
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
              {isAr
                ? 'منصة عالمية معتمدة متخصصة في تعليم القرآن الكريم وتجويده وتحفيظه، واللغة العربية لغير الناطقين بها، واللهجة المصرية، والدراسات الإسلامية للمسلمين في جميع أنحاء العالم.'
                : 'Accredited international academy dedicated to teaching the Holy Quran, Tajweed, Quranic Arabic, Egyptian dialect, and Islamic studies to Muslim families worldwide.'}
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-300 font-semibold pt-2">
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'معلمون أزهريون مجازون' : 'Azhari Certified Tutors'}</span>
              </span>
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>{isAr ? 'إجازة بالسند المتصل' : 'Continuous Sanad Ijazah'}</span>
              </span>
            </div>
          </div>

          {/* Quick Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isAr ? 'المسارات التعليمية' : 'Curricula & Courses'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveView('courses')} className="hover:text-sky-400 transition">
                  {isAr ? 'تعلّم قراءة القرآن (النورانية)' : 'Learn Quran Reading'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('courses')} className="hover:text-sky-400 transition">
                  {isAr ? 'حفظ القرآن والإجازة' : 'Quran Memorization (Hifz)'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('courses')} className="hover:text-sky-400 transition">
                  {isAr ? 'علم التجويد العملي' : 'Tajweed Recitation Rules'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('courses')} className="hover:text-sky-400 transition">
                  {isAr ? 'العربية لغير الناطقين بها' : 'Arabic for Non-Natives'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('courses')} className="hover:text-sky-400 transition">
                  {isAr ? 'الدراسات الإسلامية للأطفال' : 'Islamic Studies for Youth'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('courses')} className="hover:text-sky-400 transition">
                  {isAr ? 'العامية المصرية' : 'Egyptian Colloquial Arabic'}
                </button>
              </li>
            </ul>
          </div>

          {/* Portals & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isAr ? 'البوابات والخدمات' : 'Portals & Platform'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveView('student-portal')} className="hover:text-sky-400 transition">
                  {isAr ? 'بوابة الطالب (Student Portal)' : 'Student Portal'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('parent-portal')} className="hover:text-sky-400 transition">
                  {isAr ? 'بوابة ولي الأمر (Parent Portal)' : 'Parent Portal'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('teacher-portal')} className="hover:text-sky-400 transition">
                  {isAr ? 'بوابة المعلم (Sabeel Teacher)' : 'Teacher Portal (Sabeel)'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('admin-portal')} className="hover:text-sky-400 transition">
                  {isAr ? 'لوحة الإدارة والـ CRM' : 'Admin CRM & Analytics'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('reviews')} className="hover:text-sky-400 transition">
                  {isAr ? 'فيديوهات وتجارب الطلاب' : 'Video Student Reviews'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('faq')} className="hover:text-sky-400 transition">
                  {isAr ? 'الأسئلة المتكررة' : 'Frequently Asked Questions'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isAr ? 'التواصل والاعتماد' : 'Contact & Support'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>support@sabeelacademy.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span dir="ltr">+1 (800) 722-3351</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Cairo, Egypt • International Online Hub</span>
              </li>
            </ul>

            {/* Payment Badges */}
            <div className="pt-3">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2 font-bold">
                {isAr ? 'بوابات الدفع الآمنة المعتمدة:' : 'Secured Payment Gateways:'}
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-300">
                <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">Stripe</span>
                <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">PayPal</span>
                <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">Visa</span>
                <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">Mastercard</span>
                <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">Apple Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Sabeel Academy. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActiveView('privacy')} className="hover:text-white transition">
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </button>
            <span>•</span>
            <button onClick={() => setActiveView('terms')} className="hover:text-white transition">
              {isAr ? 'الشروط والأحكام' : 'Terms of Service'}
            </button>
            <span>•</span>
            <button onClick={() => setActiveView('refund')} className="hover:text-white transition">
              {isAr ? 'سياسة الاسترجاع' : 'Refund Policy'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
