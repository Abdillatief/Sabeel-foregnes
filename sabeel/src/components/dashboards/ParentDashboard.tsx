import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Award, 
  Receipt, 
  TrendingUp, 
  MessageSquare, 
  User, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const { lang, certificates, setSelectedCertificateForModal } = useApp();
  const isAr = lang === 'ar';

  const [activeChild, setActiveChild] = useState<'child-1' | 'child-2'>('child-1');

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Parent Portal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-rose-900/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-3 border border-rose-400/30">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>{isAr ? 'بوابة متابعة ولي الأمر • Parent Portal' : 'Parent Monitoring Portal'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                {isAr ? 'مرحباً، طارق المنصور (ولي الأمر)' : 'Welcome, Tariq Al-Mansoor (Guardian)'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {isAr
                  ? 'لوحة المتابعة الشاملة لمستوى أبنائك، الحضور، تقارير المعلم الأسبوعية، والفواتير.'
                  : 'Comprehensive dashboard to monitor your children\'s Quran progress, attendance, mentor notes, and billing.'}
              </p>
            </div>

            {/* Child Selector */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl flex items-center gap-2">
              <button
                onClick={() => setActiveChild('child-1')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeChild === 'child-1' ? 'bg-rose-500 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isAr ? 'يوسف (9 سنوات)' : 'Yousef (9 yo)'}
              </button>
              <button
                onClick={() => setActiveChild('child-2')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeChild === 'child-2' ? 'bg-rose-500 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isAr ? 'مريم (6 سنوات)' : 'Maryam (6 yo)'}
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-medium block">
              {isAr ? 'الحصة القادمة' : 'Next Scheduled Lesson'}
            </span>
            <span className="text-lg font-black text-slate-900 block mt-1">اليوم 05:30 PM</span>
            <span className="text-xs text-sky-600 font-semibold block mt-1">
              {isAr ? 'مع الشيخ أحمد الأزهري' : 'With Sheikh Ahmad'}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-medium block">
              {isAr ? 'حالة الحضور والانتظام' : 'Attendance Rate'}
            </span>
            <span className="text-2xl font-black text-emerald-600 block mt-1">100%</span>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
              {isAr ? '28 من 28 حصة مكتملة' : '28/28 sessions attended'}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-medium block">
              {isAr ? 'الاشتراك الحالي' : 'Active Plan'}
            </span>
            <span className="text-lg font-black text-slate-900 block mt-1">
              {isAr ? 'الباقة القياسية (8 حصص)' : 'Standard Plan (8 classes)'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">
              {isAr ? 'متبقي 4 حصص • تجديد تلقائي' : '4 classes remaining • Auto-renews'}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-medium block">
              {isAr ? 'الإنجاز القرآني' : 'Quran Milestones'}
            </span>
            <span className="text-lg font-black text-amber-500 block mt-1">
              {isAr ? 'جزء عمّ (مكتمل ومجاز)' : 'Juz Amma (Mastered)'}
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">
              {isAr ? 'بدأ في جزء تبارك' : 'Now in Juz Tabarak'}
            </span>
          </div>
        </div>

        {/* Main Grid: Weekly Teacher Reports & Direct Communication */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reports & Feedback */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-500" />
                <span>{isAr ? 'التقارير الأسبوعية وملاحظات المعلم' : 'Weekly Mentor Evaluation Reports'}</span>
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                {isAr ? 'آخر تحديث: قبل يومين' : 'Updated 2 days ago'}
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  date: 'أسبوع 4 أكتوبر 2026',
                  title: isAr ? 'تقرير إتقان سورة النبأ وأحكام الغنة' : 'Evaluation: Surah An-Naba & Ghunnah',
                  content: isAr
                    ? 'ما شاء الله تبارك الله، يوسف يظهر تقدماً رائعاً في ضبط مخارج الحروف لاسيما حرفي القاف والطاء. تم تسميع سورة النبأ كاملة غيباً بنسبة إتقان 98%. نوصي بالاستمرار على سماع المصحف المرتل بصوت الشيخ الحصري يومياً لمدة 10 دقائق.'
                    : 'MashaAllah, Yousef shows remarkable advancement in letter articulation, particularly Qaf and Taa. He recited full Surah An-Naba from memory with 98% accuracy. We recommend continuing daily 10-minute listening to Sheikh Al-Husary.',
                  score: '98 / 100',
                  attendance: isAr ? 'حضور ممتاز في الموعد' : 'Punctual & Attentive',
                },
                {
                  date: 'أسبوع 27 سبتمبر 2026',
                  title: isAr ? 'تقرير ختم جزء عمّ بنجاح' : 'Milestone: Successful Juz Amma Completion',
                  content: isAr
                    ? 'أتم يوسف بنجاح اختبار الجزء الثلاثين كاملاً بتقدير ممتاز مرتفع، وتم إصدار الشهادة الرسمية المعتمدة له. مبارك لكم ولوالده هذا الإنجاز المبارك!'
                    : 'Yousef has successfully passed the comprehensive examination for the 30th Juz with high honors. His verified certificate has been issued.',
                  score: '99 / 100',
                  attendance: isAr ? 'حضور ممتاز' : 'Attended',
                },
              ].map((report, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-rose-600 block">{report.date}</span>
                      <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">{report.title}</h4>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-black">
                      {report.score}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/80">
                    {report.content}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>{isAr ? 'المعلم: الشيخ أحمد الأزهري' : 'Tutor: Sheikh Ahmad'}</span>
                    <span className="text-emerald-600 font-semibold">{report.attendance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Direct Teacher Contact, Invoices & Certificate */}
          <div className="space-y-6">
            {/* Direct Mentor Contact Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isAr ? 'التواصل المباشر مع المعلم:' : 'Direct Tutor Communication:'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAr
                  ? 'يمكنك التنسيق مباشرة مع شيخ ابنك حول أوقات الحصص أو طلب مراجعة محددة عبر الواتساب.'
                  : 'Coordinate directly with your child\'s tutor for special revision requests or feedback.'}
              </p>
              <a
                href="https://wa.me/201000000000?text=Assalamu%20Alaikum%20Sheikh%20Ahmad%20regarding%20Yousef"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isAr ? 'مراسلة الشيخ عبر الواتساب' : 'WhatsApp Sheikh Ahmad'}</span>
              </a>
            </div>

            {/* Issued Certificates */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-3xl border border-amber-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-900">
                <Award className="w-5 h-5 text-amber-600" />
                <h4 className="font-extrabold text-sm">{isAr ? 'شهادة التخرج والإتقان' : 'Issued Certificate'}</h4>
              </div>
              <p className="text-xs text-slate-600">
                {isAr
                  ? 'شهادة إتمام جزء عم الصادرة ليوسف طارق المنصور مع رمز QR.'
                  : 'Accredited Juz Amma completion certificate for Yousef with verified QR code.'}
              </p>
              {certificates.length > 0 && (
                <button
                  onClick={() => setSelectedCertificateForModal(certificates[0])}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
                >
                  {isAr ? 'عرض الشهادة الرسمية' : 'View Official Certificate'}
                </button>
              )}
            </div>

            {/* Invoices & Subscription Billing */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isAr ? 'الفواتير والاشتراكات:' : 'Billing & Receipts:'}
                </h4>
                <Receipt className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-2">
                {[
                  { id: 'INV-2026-10', date: '01 Oct 2026', amount: '$76.00', status: 'Paid' },
                  { id: 'INV-2026-09', date: '01 Sep 2026', amount: '$76.00', status: 'Paid' },
                ].map(inv => (
                  <div key={inv.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-800 block">{inv.id}</span>
                      <span className="text-[10px] text-slate-400">{inv.date}</span>
                    </div>
                    <div className="text-end">
                      <span className="font-black text-slate-900 block">{inv.amount}</span>
                      <span className="text-[10px] text-emerald-600 font-bold">{inv.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
