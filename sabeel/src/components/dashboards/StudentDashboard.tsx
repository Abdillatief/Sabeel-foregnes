import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Award, 
  Video, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Gift, 
  FileText, 
  TrendingUp, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { 
    lang, 
    certificates, 
    setSelectedCertificateForModal, 
    referral, 
    redeemReferralPoints,
    setIsBookingModalOpen 
  } = useApp();

  const isAr = lang === 'ar';
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'assignments' | 'referrals'>('overview');

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referral.referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRedeem = (points: number) => {
    const success = redeemReferralPoints(points);
    if (success) {
      alert(isAr ? 'تم استبدال النقاط بنجاح وإضافتها لرصيدك!' : 'Points redeemed successfully!');
    } else {
      alert(isAr ? 'عفواً، رصيد النقاط غير كافٍ.' : 'Insufficient points.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-sky-900/40 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold mb-3 border border-sky-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isAr ? 'حساب الطالب النشط • Sabeel Student' : 'Active Student Account • Sabeel Student'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                {isAr ? 'السلام عليكم، يوسف طارق المنصور' : 'Assalamu Alaikum, Yousef Tariq'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {isAr
                  ? 'مرحباً بك في بوابتك التعليمية. واصل رحلتك في حفظ وتجويد القرآن الكريم مع شيخك الأزهري.'
                  : 'Welcome to your learning portal. Continue your memorization and Tajweed with your Sheikh.'}
              </p>
            </div>

            {/* Quick Next Lesson Action */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-lg flex-shrink-0 animate-pulse">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-sky-200 font-bold uppercase tracking-wider block">
                  {isAr ? 'الحصة القادمة (اليوم)' : 'Next Lesson (Today)'}
                </span>
                <span className="text-sm font-extrabold text-white block">
                  05:30 PM (بتوقيتك)
                </span>
                <a
                  href="https://meet.google.com/sbl-lesson-41"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white underline"
                >
                  <span>{isAr ? 'دخول القاعة الآن (Google Meet)' : 'Join Google Meet Room'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'نظرة عامة والجدول' : 'Overview & Timetable'}
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'progress'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'سجل الحفظ والإتقان' : 'Memorization Tracker'}
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'assignments'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'الواجبات والتسجيلات' : 'Assignments & Voice'}
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'referrals'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'نظام الإحالة والمكافآت (Referral)' : 'Referrals & Rewards'}
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Schedule & Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick KPI stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">
                    {isAr ? 'الحصص المكتملة' : 'Completed Sessions'}
                  </span>
                  <span className="text-2xl font-black text-slate-900 block mt-1">28</span>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                    {isAr ? 'نسبة حضور 100%' : '100% Attendance'}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">
                    {isAr ? 'الرصيد المتبقي' : 'Remaining Balance'}
                  </span>
                  <span className="text-2xl font-black text-sky-600 block mt-1">
                    4 {isAr ? 'حصص' : 'Classes'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {isAr ? 'يتجدد في 1 نوفمبر' : 'Renews Nov 1st'}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">
                    {isAr ? 'تقييم التجويد' : 'Tajweed Mastery'}
                  </span>
                  <span className="text-2xl font-black text-amber-500 block mt-1">98%</span>
                  <span className="text-[10px] text-amber-700 font-semibold block mt-1">
                    {isAr ? 'ممتاز مرتفع' : 'High Distinction'}
                  </span>
                </div>
              </div>

              {/* Upcoming Lessons Table */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-sky-500" />
                    <span>{isAr ? 'جدول الحصص القادمة' : 'Upcoming Lessons Schedule'}</span>
                  </h3>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="text-xs font-bold text-sky-600 hover:underline"
                  >
                    {isAr ? '+ جدولة حصة إضافية' : '+ Schedule Extra'}
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { date: 'اليوم (الأحد)', time: '05:30 PM', sheikh: 'الشيخ أحمد عبد الرحمن', topic: 'تسميع سورة النبأ ومراجعة أحكام النون الساكنة' },
                    { date: 'الثلاثاء القادم', time: '05:30 PM', sheikh: 'الشيخ أحمد عبد الرحمن', topic: 'حفظ جديد: سورة النازعات (1 - 20)' },
                    { date: 'الخميس القادم', time: '05:30 PM', sheikh: 'الشيخ أحمد عبد الرحمن', topic: 'مراجعة تثبيت وتطبيق عملي على المدود' },
                  ].map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{lesson.date}</span>
                          <span className="text-[11px] font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                            {lesson.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">{lesson.topic}</p>
                        <span className="text-[11px] text-slate-400 block">
                          {isAr ? `المعلم: ${lesson.sheikh}` : `Mentor: ${lesson.sheikh}`}
                        </span>
                      </div>

                      <a
                        href="https://meet.google.com/sbl-lesson-41"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs text-center transition flex-shrink-0"
                      >
                        {isAr ? 'دخول القاعة' : 'Join Room'}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Certificates & Assigned Mentor */}
            <div className="space-y-6">
              {/* Assigned Tutor Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isAr ? 'معلمك الأزهري المعتمد:' : 'Your Dedicated Mentor:'}
                </h4>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                    alt="Sheikh Ahmad"
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-sky-100"
                  />
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">
                      {isAr ? 'الشيخ أحمد عبد الرحمن' : 'Sheikh Ahmad Abdul Rahman'}
                    </h5>
                    <p className="text-xs text-slate-500">
                      {isAr ? 'إجازة بالقراءات العشر من الأزهر' : 'Al-Azhar 10 Qira\'at Scholar'}
                    </p>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      {isAr ? 'متصل الآن' : 'Available Online'}
                    </span>
                  </div>
                </div>

                <a
                  href="https://wa.me/201000000000?text=Assalamu%20Alaikum%20Sheikh"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>{isAr ? 'مراسلة الشيخ عبر الواتساب' : 'Chat with Sheikh via WhatsApp'}</span>
                </a>
              </div>

              {/* Verified Certificates Box */}
              <div className="bg-gradient-to-br from-amber-50/70 to-white rounded-3xl border border-amber-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-amber-800">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h4 className="font-extrabold text-sm">
                    {isAr ? 'شهادات الإتمام المعتمدة' : 'Verified Certificates'}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'شهادتك الرسمية في إتمام جزء عم وتجويده موثقة برمز QR ورابط تحقق عام.'
                    : 'Your official certificate in Juz Amma with verified QR and public verification link.'}
                </p>

                {certificates.length > 0 && (
                  <button
                    onClick={() => setSelectedCertificateForModal(certificates[0])}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3 rounded-xl shadow transition flex items-center justify-center gap-2"
                  >
                    <span>{isAr ? 'عرض وتحميل الشهادة (PDF / QR)' : 'View & Download Certificate'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROGRESS TRACKER */}
        {activeTab === 'progress' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {isAr ? 'سجل متابعة حفظ القرآن الكريم' : 'Quran Memorization Progress'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr ? 'متابعة حية للسور المتقنة، قيد الحفظ، والمجدولة للمراجعة' : 'Live tracker of mastered and scheduled Surahs'}
                </p>
              </div>

              <div className="text-end">
                <span className="text-2xl font-black text-sky-600">37 / 114</span>
                <span className="text-xs text-slate-400 block">{isAr ? 'سورة محفوظة ومتقنة' : 'Surahs Mastered'}</span>
              </div>
            </div>

            {/* Surah List Tracker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-4">
              {[
                { name: 'سورة الفاتحة', status: 'mastered', juz: 1, score: '100%' },
                { name: 'سورة النبأ', status: 'mastered', juz: 30, score: '98%' },
                { name: 'سورة النازعات', status: 'in-progress', juz: 30, score: 'قيد الحفظ' },
                { name: 'سورة عبس', status: 'scheduled', juz: 30, score: 'مجدول' },
                { name: 'سورة التكوير', status: 'mastered', juz: 30, score: '96%' },
                { name: 'سورة الانفطار', status: 'mastered', juz: 30, score: '99%' },
                { name: 'سورة المطففين', status: 'scheduled', juz: 30, score: 'مجدول' },
                { name: 'سورة الانشقاق', status: 'mastered', juz: 30, score: '97%' },
                { name: 'سورة البروج', status: 'mastered', juz: 30, score: '98%' },
                { name: 'سورة الطارق', status: 'mastered', juz: 30, score: '100%' },
                { name: 'سورة الأعلى', status: 'mastered', juz: 30, score: '99%' },
                { name: 'سورة الغاشية', status: 'mastered', juz: 30, score: '98%' },
              ].map((surah, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                    surah.status === 'mastered'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : surah.status === 'in-progress'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <span className="font-bold">{surah.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-white/80 border border-current">
                    {surah.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
            <h3 className="text-lg font-black text-slate-900">
              {isAr ? 'الواجبات والتسجيلات الصوتية المطلوبة' : 'Voice Submissions & Homework'}
            </h3>

            <div className="space-y-4">
              {[
                {
                  title: isAr ? 'تسجيل سورة النبأ (الآيات 1 - 20)' : 'Recitation recording: Surah An-Naba (1-20)',
                  due: 'غداً قبل موعد الحصة',
                  status: isAr ? 'تم التسليم • بانتظار تصحيح الشيخ' : 'Submitted • Pending Evaluation',
                  grade: null,
                },
                {
                  title: isAr ? 'تطبيق أحكام الإخفاء الحقيقي على 5 آيات' : 'Ikhfaa Haqiqi practical application',
                  due: '10 أكتوبر 2026',
                  status: isAr ? 'تم التصحيح والتقييم' : 'Graded with Feedback',
                  grade: '98 / 100',
                  notes: isAr ? 'ممتاز يا يوسف! انتبه فقط لدرجة تفخيم الغنة عند حرف القاف.' : 'Excellent! Watch out for Ghunnah weight before Qaf.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                    {item.grade && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                        {item.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{isAr ? `تاريخ التسليم: ${item.due}` : `Due: ${item.due}`}</p>
                  {item.notes && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 italic">
                      {item.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REFERRAL SYSTEM */}
        {activeTab === 'referrals' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-8">
            <div className="max-w-2xl">
              <span className="text-sky-600 font-bold text-xs uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                {isAr ? 'برنامج سفراء سبيل' : 'Sabeel Ambassador Program'}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2 mb-2">
                {isAr ? 'شارك الخير واكسب حصصاً مجانية وخصومات' : 'Share the Blessing, Earn Free Lessons & Discounts'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isAr
                  ? 'لكل صديق أو قريب يشترك في الأكاديمية من خلال رابطك، يحصل على خصم 10% فوراً، وتحصل أنت على 150 نقطة وحصة مجانية مضافة لرصيدك!'
                  : 'For every friend who enrolls through your link, they receive a 10% instant discount, and you earn 150 points plus free lessons!'}
              </p>
            </div>

            {/* Referral Link Box */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-start">
                <span className="text-xs font-bold text-slate-700 block">
                  {isAr ? 'رابط الإحالة الخاص بك:' : 'Your Unique Referral Link:'}
                </span>
                <span className="font-mono text-xs text-sky-700 bg-white px-3 py-1 rounded-lg border border-slate-200 inline-block">
                  {referral.referralLink}
                </span>
              </div>

              <button
                onClick={handleCopyReferral}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedLink ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الرابط' : 'Copy Link')}</span>
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">{isAr ? 'إجمالي المدعوين' : 'Total Invited'}</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{referral.totalInvited}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">{isAr ? 'الاشتراكات الناجحة' : 'Subscribed'}</span>
                <span className="text-2xl font-black text-emerald-600 mt-1 block">{referral.successfulSubscriptions}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">{isAr ? 'نقاط المكافآت' : 'Points Balance'}</span>
                <span className="text-2xl font-black text-amber-500 mt-1 block">{referral.pointsEarned}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-400 block">{isAr ? 'حصص مجانية مكتسبة' : 'Free Lessons Earned'}</span>
                <span className="text-2xl font-black text-sky-600 mt-1 block">{referral.freeLessonsEarned}</span>
              </div>
            </div>

            {/* Redeem Actions */}
            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 mb-3">
                {isAr ? 'خيارات استبدال النقاط:' : 'Redeem Options:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {isAr ? 'استبدال 200 نقطة بحصة خاصة مجانية' : 'Redeem 200 pts for 1 Free Lesson'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isAr ? 'تضاف تلقائياً لرصيد حصصك' : 'Added directly to your balance'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRedeem(200)}
                    disabled={referral.pointsEarned < 200}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white transition"
                  >
                    {isAr ? 'استبدال' : 'Redeem'}
                  </button>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {isAr ? 'استبدال 100 نقطة بخصم 10$ على الفاتورة' : 'Redeem 100 pts for $10 Invoice Discount'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isAr ? 'يخصم من تجديد الشهر القادم' : 'Applied to next renewal'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRedeem(100)}
                    disabled={referral.pointsEarned < 100}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white transition"
                  >
                    {isAr ? 'استبدال' : 'Redeem'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
