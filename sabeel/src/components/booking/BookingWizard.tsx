import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, CourseCategory } from '../../types';
import { 
  generateGoogleCalendarUrl, 
  generateOutlookCalendarUrl, 
  downloadAppleIcsFile 
} from '../../services/calendarService';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  Clock, 
  Globe, 
  User, 
  Phone, 
  Mail, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  CalendarPlus,
  Send
} from 'lucide-react';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseCategory?: CourseCategory;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({ 
  isOpen, 
  onClose, 
  preselectedCourseCategory 
}) => {
  const { lang, courses, teachers, addNewBooking } = useApp();
  const isAr = lang === 'ar';

  const [step, setStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Form State
  const [country, setCountry] = useState<string>('United States');
  const [timezone, setTimezone] = useState<string>(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return 'America/New_York';
    }
  });
  const [studentName, setStudentName] = useState<string>('');
  const [studentAge, setStudentAge] = useState<number>(10);
  const [guardianName, setGuardianName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [courseCategory, setCourseCategory] = useState<CourseCategory>(
    preselectedCourseCategory || 'quran-reading'
  );
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [preferredLanguage, setPreferredLanguage] = useState<'ar' | 'en'>('ar');
  const [preferredTeacherGender, setPreferredTeacherGender] = useState<'male' | 'female' | 'no-preference'>('no-preference');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('');
  
  // Tomorrow's date as default
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const [scheduledDate, setScheduledDate] = useState<string>(tomorrowStr);
  const [scheduledTime, setScheduledTime] = useState<string>('17:00');

  if (!isOpen) return null;

  const timeSlots = [
    '09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30', '20:00', '21:30'
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmitBooking();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmitBooking = () => {
    const bookingId = `bkg-${Date.now()}`;
    const meetingCode = Math.random().toString(36).substring(2, 8);
    const meetingLink = `https://meet.google.com/sbl-${meetingCode}`;

    const newBooking: Booking = {
      id: bookingId,
      studentName: studentName.trim() || (isAr ? 'طالب متميز' : 'New Student'),
      studentAge: Number(studentAge) || 10,
      guardianName: guardianName.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      country,
      timezone,
      courseCategory,
      level,
      preferredLanguage,
      preferredTeacherGender,
      selectedTeacherId: selectedTeacherId || undefined,
      scheduledDate,
      scheduledTime,
      meetingLink,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    addNewBooking(newBooking);
    setCreatedBooking(newBooking);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  const matchedCourse = courses.find(c => c.category === courseCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg">
                {isAr ? 'حجز حصة تجريبية مجانية 100%' : 'Book 100% Free Trial Lesson'}
              </h3>
              <p className="text-xs text-slate-300">
                {isAr ? '30 دقيقة فردية خاصة • بدون أي رسوم أو بطاقة بنكية' : '30-minute private 1-on-1 • No credit card required'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSuccess && (
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span className={`${step >= 1 ? 'text-sky-600 font-bold' : ''}`}>
              1. {isAr ? 'الموقع والدورة' : 'Location & Course'}
            </span>
            <span className="text-slate-300">•</span>
            <span className={`${step >= 2 ? 'text-sky-600 font-bold' : ''}`}>
              2. {isAr ? 'بيانات الطالب' : 'Student Info'}
            </span>
            <span className="text-slate-300">•</span>
            <span className={`${step >= 3 ? 'text-sky-600 font-bold' : ''}`}>
              3. {isAr ? 'الموعد والمعلم' : 'Schedule & Tutor'}
            </span>
            <span className="text-slate-300">•</span>
            <span className={`${step >= 4 ? 'text-sky-600 font-bold' : ''}`}>
              4. {isAr ? 'التأكيد والتواصل' : 'Confirmation'}
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {/* SUCCESS SCREEN */}
          {isSuccess && createdBooking ? (
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-4 border-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  {isAr ? 'مبارك! تم تأكيد موعد حصتك التجريبية' : 'Alhamdulillah! Your Free Trial is Confirmed'}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? `أهلاً بك يا ${createdBooking.studentName} في أكاديمية سبيل. تم إرسال تفاصيل الموعد ورابط القاعة إلى رقم الواتساب والبريد الإلكتروني.`
                    : `Welcome ${createdBooking.studentName} to Sabeel Academy! Meeting details and Google Meet link have been sent to your WhatsApp and email.`}
                </p>
              </div>

              {/* Booking Details Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-start space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
                  <span className="text-slate-500">{isAr ? 'الدورة المختارة:' : 'Course:'}</span>
                  <span className="font-bold text-slate-800">
                    {isAr ? matchedCourse?.titleAr : matchedCourse?.titleEn}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
                  <span className="text-slate-500">{isAr ? 'الموعد والتوقيت:' : 'Date & Time:'}</span>
                  <span className="font-bold text-sky-700">
                    {createdBooking.scheduledDate} • {createdBooking.scheduledTime} ({createdBooking.timezone})
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">{isAr ? 'رابط القاعة الافتراضية:' : 'Live Classroom:'}</span>
                  <a
                    href={createdBooking.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sky-600 hover:underline font-bold text-xs"
                  >
                    {createdBooking.meetingLink}
                  </a>
                </div>
              </div>

              {/* 1-Click Calendar Integrations */}
              <div className="space-y-2 max-w-lg mx-auto pt-2">
                <span className="text-xs font-bold text-slate-700 block">
                  {isAr ? 'أضف الحصة إلى تقويمك بضغطة واحدة لعدم نسيانها:' : 'Add to your calendar with 1-click:'}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={generateGoogleCalendarUrl({
                      title: `Sabeel Academy: Free Trial - ${createdBooking.studentName}`,
                      description: `Free trial Quran lesson at Sabeel Academy. Join via: ${createdBooking.meetingLink}`,
                      location: createdBooking.meetingLink,
                      startDate: createdBooking.scheduledDate,
                      startTime: createdBooking.scheduledTime,
                      durationMinutes: 30,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition"
                  >
                    <span>Google</span>
                  </a>
                  <a
                    href={generateOutlookCalendarUrl({
                      title: `Sabeel Academy: Free Trial - ${createdBooking.studentName}`,
                      description: `Free trial Quran lesson at Sabeel Academy. Join via: ${createdBooking.meetingLink}`,
                      location: createdBooking.meetingLink,
                      startDate: createdBooking.scheduledDate,
                      startTime: createdBooking.scheduledTime,
                      durationMinutes: 30,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition"
                  >
                    <span>Outlook</span>
                  </a>
                  <button
                    onClick={() => {
                      downloadAppleIcsFile({
                        title: `Sabeel Academy: Free Trial - ${createdBooking.studentName}`,
                        description: `Free trial Quran lesson at Sabeel Academy. Join via: ${createdBooking.meetingLink}`,
                        location: createdBooking.meetingLink,
                        startDate: createdBooking.scheduledDate,
                        startTime: createdBooking.scheduledTime,
                        durationMinutes: 30,
                      });
                    }}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition"
                  >
                    <span>Apple / iCal</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full max-w-sm mx-auto bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition"
              >
                {isAr ? 'تم، العودة للموقع' : 'Done & Return'}
              </button>
            </div>
          ) : (
            /* MULTI-STEP FORM */
            <div className="space-y-6">
              {/* STEP 1: Country & Course */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isAr ? 'اختر الدورة التعليمية المرغوبة:' : 'Select Desired Course:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {courses.map(c => {
                        const isSelected = courseCategory === c.category;
                        return (
                          <div
                            key={c.id}
                            onClick={() => setCourseCategory(c.category)}
                            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                              isSelected
                                ? 'border-sky-500 bg-sky-50/60 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 border-sky-500">
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-800">
                                {isAr ? c.titleAr : c.titleEn}
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {isAr ? c.shortDescAr : c.shortDescEn}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'الدولة المقيم بها:' : 'Country of Residence:'}
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="United States, UK, Saudi Arabia, etc."
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'المنطقة الزمنية (تلقائي):' : 'Timezone (Auto-detected):'}
                      </label>
                      <input
                        type="text"
                        value={timezone}
                        onChange={e => setTimezone(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs bg-slate-50 text-slate-700 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Student Details & Level */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'اسم الطالب (أو الطالبة):' : 'Student Name:'}
                      </label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={e => setStudentName(e.target.value)}
                        placeholder={isAr ? 'مثال: يوسف أحمد' : 'e.g. Yousef Ahmad'}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'عمر الطالب:' : 'Student Age:'}
                      </label>
                      <input
                        type="number"
                        min={4}
                        max={85}
                        value={studentAge}
                        onChange={e => setStudentAge(Number(e.target.value))}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? 'اسم ولي الأمر (إذا كان الطالب طفلاً):' : 'Parent / Guardian Name (if minor):'}
                    </label>
                    <input
                      type="text"
                      value={guardianName}
                      onChange={e => setGuardianName(e.target.value)}
                      placeholder={isAr ? 'مثال: أحمد عبد الله' : 'e.g. Ahmad Abdullah'}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'المستوى التقريبي الحالي:' : 'Estimated Current Level:'}
                      </label>
                      <select
                        value={level}
                        onChange={e => setLevel(e.target.value as any)}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                      >
                        <option value="beginner">
                          {isAr ? 'مبتدئ (يبدأ من الصفر / الحروف)' : 'Beginner (From alphabet/scratch)'}
                        </option>
                        <option value="intermediate">
                          {isAr ? 'متوسط (يقرأ ولكن يحتاج تصحيح تجويد)' : 'Intermediate (Reads with basic Tajweed)'}
                        </option>
                        <option value="advanced">
                          {isAr ? 'متقدم (حفظ متقدم / رغبة في الإجازة)' : 'Advanced (Hifz completion / Ijazah)'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'اللغة المفضلة للشرح والتواصل:' : 'Language of Instruction:'}
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPreferredLanguage('ar')}
                          className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold transition ${
                            preferredLanguage === 'ar'
                              ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          العربية (Arabic)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreferredLanguage('en')}
                          className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold transition ${
                            preferredLanguage === 'en'
                              ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          English (إنجليزية)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Teacher Preference & Schedule */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isAr ? 'تفضيل جنس المعلم:' : 'Tutor Gender Preference:'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPreferredTeacherGender('no-preference')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                          preferredTeacherGender === 'no-preference'
                            ? 'bg-sky-50 border-sky-500 text-sky-700'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {isAr ? 'لا تفضيل محدد' : 'Any Gender'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreferredTeacherGender('male')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                          preferredTeacherGender === 'male'
                            ? 'bg-sky-50 border-sky-500 text-sky-700'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {isAr ? 'شيخ / معلم رجل' : 'Male Sheikh'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreferredTeacherGender('female')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                          preferredTeacherGender === 'female'
                            ? 'bg-sky-50 border-sky-500 text-sky-700'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {isAr ? 'شيخة / معلمة سيدة' : 'Female Sheikha'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'اليوم المفضل للحصة التجريبية:' : 'Preferred Date:'}
                      </label>
                      <input
                        type="date"
                        value={scheduledDate}
                        min={tomorrowStr}
                        onChange={e => setScheduledDate(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'الوقت المفضل (بتوقيتك المحلي):' : 'Preferred Time (Local Time):'}
                      </label>
                      <select
                        value={scheduledTime}
                        onChange={e => setScheduledTime(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                      >
                        {timeSlots.map(t => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Contact & Final Confirmation */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 text-xs text-sky-900 leading-relaxed">
                    {isAr
                      ? 'سنرسل رابط القاعة وتأكيد الموعد مباشرة عبر الواتساب والبريد الإلكتروني قبل الحصة بـ 15 دقيقة.'
                      : 'We will send your Google Meet link and confirmation directly via WhatsApp and Email prior to your session.'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'رقم الواتساب (مع كود الدولة):' : 'WhatsApp Number (with country code):'}
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder="+1 555-0199 or +966 50..."
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
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
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1.5 text-slate-700">
                    <div className="font-bold text-slate-900 mb-1">
                      {isAr ? 'ملخص الحجز المجاني:' : 'Booking Summary:'}
                    </div>
                    <div>
                      • {isAr ? 'الدورة:' : 'Course:'} {isAr ? matchedCourse?.titleAr : matchedCourse?.titleEn}
                    </div>
                    <div>
                      • {isAr ? 'الطالب:' : 'Student:'} {studentName || (isAr ? 'لم يحدد بعد' : 'Not specified')} ({studentAge} سنة)
                    </div>
                    <div>
                      • {isAr ? 'الموعد:' : 'Date & Time:'} {scheduledDate} الساعة {scheduledTime}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!isSuccess && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{isAr ? 'السابق' : 'Back'}</span>
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <span>
                {step === 4
                  ? (isAr ? 'تأكيد وحجز الحصة المجانية' : 'Confirm & Book Free Trial')
                  : (isAr ? 'المتابعة' : 'Next Step')}
              </span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
