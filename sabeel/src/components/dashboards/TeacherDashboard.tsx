import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Upload, 
  Video, 
  Search, 
  Sparkles, 
  MessageSquare,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { lang, leads, bookings } = useApp();
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'today' | 'students' | 'schedule' | 'upload'>('today');
  const [markedAttendance, setMarkedAttendance] = useState<Record<string, 'present' | 'absent' | 'excused'>>({});
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Homework upload form
  const [selectedStudent, setSelectedStudent] = useState('يوسف طارق المنصور');
  const [homeworkTitle, setHomeworkTitle] = useState('');
  const [homeworkNotes, setHomeworkNotes] = useState('');

  const todaySessions = [
    {
      id: 'sess-1',
      studentName: 'يوسف طارق المنصور',
      country: 'Canada (Toronto)',
      time: '05:30 PM',
      course: 'حفظ القرآن الكريم وتجويده',
      juzTarget: 'تسميع سورة النبأ ومراجعة أحكام الغنة',
      meetLink: 'https://meet.google.com/sbl-lesson-41',
      status: 'upcoming',
    },
    {
      id: 'sess-2',
      studentName: 'Sarah Jenkins',
      country: 'United Kingdom (London)',
      time: '07:00 PM',
      course: 'العربية لغير الناطقين بها',
      juzTarget: 'الدرس الرابع: الجمل الاسمية وحروف الجر',
      meetLink: 'https://meet.google.com/sbl-lesson-42',
      status: 'upcoming',
    },
    {
      id: 'sess-3',
      studentName: 'عبد الله السبيعي',
      country: 'السعودية (الرياض)',
      time: '08:30 PM',
      course: 'التجويد العملي والإجازة',
      juzTarget: 'عرض سورة الكهف وضبط مخارج حروف الحلق',
      meetLink: 'https://meet.google.com/sbl-lesson-43',
      status: 'upcoming',
    },
  ];

  const handleAttendance = (sessId: string, status: 'present' | 'absent' | 'excused') => {
    setMarkedAttendance(prev => ({ ...prev, [sessId]: status }));
  };

  const handleUploadHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeworkTitle.trim()) return;
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setHomeworkTitle('');
      setHomeworkNotes('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header with Sabeel Teacher Integration Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-900/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3 border border-amber-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {isAr ? 'متصل بنظام: Sabeel Teacher المعتمد' : 'Connected to: Sabeel Teacher Core LMS'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                {isAr ? 'بوابة المعلم • فضيلة الشيخ أحمد الأزهري' : 'Teacher Portal • Sheikh Ahmad Al-Azhari'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {isAr
                  ? 'رصد الحضور اليومي، رصد درجات الطلاب، إسناد الواجبات الصوتية، ومزامنة بيانات الحصص تلقائياً مع منظومة Sabeel Teacher.'
                  : 'Manage daily live classes, log attendance & grades, assign voice homework, and sync in real-time with Sabeel Teacher.'}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {isAr ? 'مزامنة السجلات المباشرة نشطة (Live)' : 'Live DB Sync Active'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'today' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'حصص اليوم وقاعات البث' : 'Today\'s Classes'}
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'students' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'قائمة الطلاب المتابعين (24)' : 'My Students Roster (24)'}
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'upload' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'رفع الواجبات والتقارير' : 'Upload Homework & Reports'}
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'schedule' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'إدارة المواعيد المتاحة' : 'Availability Settings'}
          </button>
        </div>

        {/* TAB 1: TODAY'S CLASSES */}
        {activeTab === 'today' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">
                {isAr ? 'جدول حصص اليوم (3 حصص مباشرة)' : 'Today\'s Scheduled Classes (3 Sessions)'}
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                {new Date().toDateString()}
              </span>
            </div>

            <div className="space-y-4">
              {todaySessions.map(sess => {
                const currentAttendance = markedAttendance[sess.id];

                return (
                  <div
                    key={sess.id}
                    className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-base text-slate-900">{sess.studentName}</span>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          {sess.country}
                        </span>
                        <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md">
                          {sess.time}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 font-medium">
                        {sess.course} • <span className="text-slate-500">{sess.juzTarget}</span>
                      </p>
                    </div>

                    {/* Attendance Marking & Room Join */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Attendance Buttons */}
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        <button
                          onClick={() => handleAttendance(sess.id, 'present')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            currentAttendance === 'present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-emerald-700'
                          }`}
                        >
                          {isAr ? 'حاضر' : 'Present'}
                        </button>
                        <button
                          onClick={() => handleAttendance(sess.id, 'absent')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            currentAttendance === 'absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-rose-700'
                          }`}
                        >
                          {isAr ? 'غائب' : 'Absent'}
                        </button>
                        <button
                          onClick={() => handleAttendance(sess.id, 'excused')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            currentAttendance === 'excused'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-amber-700'
                          }`}
                        >
                          {isAr ? 'معتذر' : 'Excused'}
                        </button>
                      </div>

                      <a
                        href={sess.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition flex items-center gap-1.5"
                      >
                        <Video className="w-4 h-4" />
                        <span>{isAr ? 'فتح الفصل الافتراضي' : 'Open Class'}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: STUDENTS ROSTER */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-base font-extrabold text-slate-900">
                {isAr ? 'قائمة الطلاب المتابعين وسجلات الحفظ' : 'Active Students Roster'}
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder={isAr ? 'بحث عن طالب...' : 'Search student...'}
                  className="w-64 border border-slate-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute end-3 top-2" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 text-start">{isAr ? 'اسم الطالب' : 'Student Name'}</th>
                    <th className="py-3 text-start">{isAr ? 'الدورة المسجل بها' : 'Enrolled Course'}</th>
                    <th className="py-3 text-start">{isAr ? 'الدولة' : 'Country'}</th>
                    <th className="py-3 text-start">{isAr ? 'المستوى القرآني' : 'Quran Level'}</th>
                    <th className="py-3 text-start">{isAr ? 'الحصص المتبقية' : 'Classes Left'}</th>
                    <th className="py-3 text-end">{isAr ? 'الإجراء' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'يوسف طارق المنصور', course: 'حفظ القرآن وتجويده', country: 'كندا', level: 'جزء عمّ (مكتمل)', left: 4 },
                    { name: 'Sarah Jenkins', course: 'العربية لغير الناطقين بها', country: 'بريطانيا', level: 'المستوى الثاني', left: 6 },
                    { name: 'عبد الله السبيعي', course: 'التجويد العملي والإسناد', country: 'السعودية', level: 'رواية حفص', left: 8 },
                    { name: 'عمر فاروق', course: 'حفظ القرآن الكريم', country: 'أمريكا', level: 'الجزء الأول', left: 2 },
                  ].map((st, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition">
                      <td className="py-3 font-bold text-slate-900">{st.name}</td>
                      <td className="py-3 text-slate-600">{st.course}</td>
                      <td className="py-3 text-slate-500">{st.country}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 font-semibold">
                          {st.level}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-slate-800">{st.left}</td>
                      <td className="py-3 text-end">
                        <button className="text-sky-600 hover:underline font-bold">
                          {isAr ? 'عرض الملف' : 'View Profile'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: UPLOAD HOMEWORK */}
        {activeTab === 'upload' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs max-w-2xl mx-auto space-y-6">
            <h3 className="text-lg font-black text-slate-900">
              {isAr ? 'إسناد واجب جديد أو تقرير شهري لطالب' : 'Assign Homework or Progress Report'}
            </h3>

            {uploadSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>
                  {isAr
                    ? 'تم إرسال الواجب بنجاح وإشعار ولي الأمر والطالب تلقائياً عبر الواتساب والبريد!'
                    : 'Homework assigned! Parent & student notified instantly.'}
                </span>
              </div>
            )}

            <form onSubmit={handleUploadHomework} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'اختر الطالب:' : 'Select Student:'}
                </label>
                <select
                  value={selectedStudent}
                  onChange={e => setSelectedStudent(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-white outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="يوسف طارق المنصور">يوسف طارق المنصور (كندا)</option>
                  <option value="Sarah Jenkins">Sarah Jenkins (UK)</option>
                  <option value="عبد الله السبيعي">عبد الله السبيعي (السعودية)</option>
                  <option value="عمر فاروق">Omar Farooq (USA)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'عنوان الواجب أو الآيات المطلوبة:' : 'Assignment Title / Target Verses:'}
                </label>
                <input
                  type="text"
                  value={homeworkTitle}
                  onChange={e => setHomeworkTitle(e.target.value)}
                  placeholder={isAr ? 'مثال: تسجيل صوتي لسورة النازعات الآيات 1 إلى 15' : 'e.g. Audio recitation of Surah An-Naziat 1-15'}
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isAr ? 'ملاحظات التجويد والتوجيهات:' : 'Tajweed Guidance & Notes:'}
                </label>
                <textarea
                  rows={4}
                  value={homeworkNotes}
                  onChange={e => setHomeworkNotes(e.target.value)}
                  placeholder={isAr ? 'التركيز على مد الصلة ومخرج حرف الراء...' : 'Focus on Madd rules and Raa articulation...'}
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs py-3 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>{isAr ? 'إرسال الواجب وحفظ التقرير' : 'Send Homework & Save Report'}</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              {isAr ? 'إدارة الساعات المتاحة ومناطق التوقيت الأسبوعية' : 'Teacher Availability & Working Hours'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'الساعات المحددة هنا تظهر تلقائياً للطلاب الجدد في معالج الحجز بنظام Sabeel Teacher.'
                : 'Working slots defined here sync directly with the global trial booking engine.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-900 block">{day}</span>
                  <span className="text-[11px] text-emerald-600 font-semibold block">03:00 PM – 10:00 PM UTC</span>
                  <span className="text-[10px] text-slate-400 block">{isAr ? 'متاح للحصص' : 'Available'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
