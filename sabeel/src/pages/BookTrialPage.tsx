import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHelmet } from '../components/common/SEOHelmet';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { 
  ShieldCheck, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Users, 
  Calendar,
  MessageCircle
} from 'lucide-react';

export const BookTrialPage: React.FC = () => {
  const { lang, courses } = useApp();
  const isAr = lang === 'ar';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    courseId: courses[0]?.id || 'c1',
    studentName: '',
    studentAge: '8',
    teacherGender: 'any',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    preferredTimezone: 'Europe/London',
    preferredTimeSlot: 'evening',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEOHelmet />

      <Container size="narrow">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'حصة استكشافية مجانية 100% بدون أي التزام' : '100% Free Diagnostic Class · No Credit Card'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            {isAr ? 'احجز حصتك التجريبية الفردية 1-on-1' : 'Book Your Private 1-on-1 Free Trial'}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            {isAr
              ? '30 دقيقة تشخيصية خاصة مع شيخ أو معلمة من الأزهر الشريف لتحديد مستوى طفلك ووضع خطة دراسية ملائمة.'
              : 'A 30-minute private evaluation with an Azhari tutor to assess your child’s level and suggest a custom path.'}
          </p>

          {/* Progress Indicator */}
          {!submitted && (
            <div className="flex items-center justify-center gap-3 mt-8 text-xs font-semibold">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-sky-600 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>1</span>
                <span>{isAr ? 'المسار' : 'Track'}</span>
              </div>
              <span className="w-8 h-0.5 bg-slate-200 dark:bg-slate-800" />
              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-sky-600 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>2</span>
                <span>{isAr ? 'بيانات الطالب' : 'Student'}</span>
              </div>
              <span className="w-8 h-0.5 bg-slate-200 dark:bg-slate-800" />
              <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-sky-600 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>3</span>
                <span>{isAr ? 'الموعد' : 'Schedule'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <Card className="p-6 sm:p-10 shadow-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                {isAr ? 'تم استلام طلب الحصة التجريبية بنجاح!' : 'Your Trial Class Request is Confirmed!'}
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                {isAr
                  ? `أهلاً بك وبابنك ${formData.studentName || 'المبارك'}. سيتواصل معك مستشارنا الأكاديمي عبر واتساب على الرقم ${formData.parentPhone || ''} لتأكيد الموعد وإرسال رابط القاعة الافتراضية.`
                  : `Welcome! Our academic coordinator will reach out via WhatsApp at ${formData.parentPhone || ''} to confirm your appointment and provide your direct classroom link.`}
              </p>

              <div className="mt-8 p-5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-start text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">{isAr ? 'الطالب:' : 'Student:'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formData.studentName || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isAr ? 'المدة:' : 'Duration:'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">30 {isAr ? 'دقيقة مجانية' : 'Minutes Free'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{isAr ? 'المعلم:' : 'Faculty:'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formData.teacherGender === 'female' ? (isAr ? 'معلمة أزهرية' : 'Female Scholar') : (formData.teacherGender === 'male' ? (isAr ? 'شيخ أزهري' : 'Male Scholar') : (isAr ? 'حسب التوفر' : 'Best Match'))}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/201000000000?text=Assalamu%20Alaikum%20Confirmed%20Trial%20For%20${encodeURIComponent(formData.studentName)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'تواصل فوري عبر واتساب' : 'Chat via WhatsApp'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setStep(1); }}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-xl transition-colors"
                >
                  {isAr ? 'حجز طالب آخر من الأسرة' : 'Book for Another Sibling'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNext} className="space-y-6">
              
              {/* STEP 1: Track Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-950 dark:text-white text-start">
                    {isAr ? 'اختر المسار التعليمي المناسب لطفلك' : 'Select Desired Educational Track'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {courses.map((c) => (
                      <label
                        key={c.id}
                        className={`p-4 rounded-xl border text-start cursor-pointer transition-all ${
                          formData.courseId === c.id
                            ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 ring-1 ring-sky-500'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="courseId"
                          value={c.id}
                          checked={formData.courseId === c.id}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="text-sm font-bold text-slate-900 dark:text-white block">
                          {isAr ? c.titleAr : c.titleEn}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block line-clamp-2">
                          {isAr ? c.shortDescAr : c.shortDescEn}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Teacher Gender Preference */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-start">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {isAr ? 'تفضيل جنس المعلم:' : 'Teacher Preference:'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'any', labelAr: 'لا تفضيل محدد', labelEn: 'No Preference' },
                        { id: 'female', labelAr: 'معلمة أزهرية (للبنات)', labelEn: 'Female Tutor' },
                        { id: 'male', labelAr: 'شيخ أزهري (للبنين)', labelEn: 'Male Tutor' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, teacherGender: item.id }))}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                            formData.teacherGender === item.id
                              ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {isAr ? item.labelAr : item.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Student & Parent Info */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-950 dark:text-white text-start">
                    {isAr ? 'بيانات الطالب وولي الأمر' : 'Student & Parent Details'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={isAr ? 'اسم الطالب / الطالبة' : 'Student Name'}
                      name="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder={isAr ? 'مثال: يوسف أو مريم' : 'e.g. Yousef or Sarah'}
                    />

                    <Input
                      label={isAr ? 'عمر الطالب (سنوات)' : 'Student Age'}
                      name="studentAge"
                      type="number"
                      required
                      min={4}
                      max={80}
                      value={formData.studentAge}
                      onChange={handleChange}
                      placeholder="8"
                    />
                  </div>

                  <Input
                    label={isAr ? 'اسم ولي الأمر' : 'Parent Name'}
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder={isAr ? 'الاسم الكامل لولي الأمر' : 'Parent full name'}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={isAr ? 'رقم الواتساب (مع رمز الدولة)' : 'WhatsApp Phone (with Country Code)'}
                      name="parentPhone"
                      type="tel"
                      required
                      value={formData.parentPhone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      hint={isAr ? 'سنرسل تفاصيل القاعة ورابط الدخول عبر الواتساب' : 'We will send classroom link via WhatsApp'}
                    />

                    <Input
                      label={isAr ? 'البريد الإلكتروني' : 'Email Address'}
                      name="parentEmail"
                      type="email"
                      required
                      value={formData.parentEmail}
                      onChange={handleChange}
                      placeholder="parent@example.com"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Timezone & Timing */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-950 dark:text-white text-start">
                    {isAr ? 'التوقيت والملاحظات' : 'Timing & Notes'}
                  </h3>

                  <Select
                    label={isAr ? 'المنطقة الزمنية لإقامتكم' : 'Your Household Timezone'}
                    name="preferredTimezone"
                    value={formData.preferredTimezone}
                    onChange={handleChange}
                    options={[
                      { value: 'Europe/London', label: 'London, UK (GMT / BST)' },
                      { value: 'America/New_York', label: 'New York / Toronto (EST)' },
                      { value: 'America/Chicago', label: 'Chicago / Texas (CST)' },
                      { value: 'America/Los_Angeles', label: 'California / Vancouver (PST)' },
                      { value: 'Europe/Berlin', label: 'Berlin / Paris / Rome (CET)' },
                      { value: 'Asia/Riyadh', label: 'Saudi Arabia / Gulf (AST)' },
                      { value: 'Asia/Dubai', label: 'UAE / Dubai (GST)' },
                      { value: 'Australia/Sydney', label: 'Sydney / Melbourne (AEST)' },
                    ]}
                  />

                  <div className="text-start">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {isAr ? 'الوقت المفضل للحصة:' : 'Preferred Class Timing:'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'morning', labelAr: 'صباحاً (قبل الظهر)', labelEn: 'Morning' },
                        { id: 'afternoon', labelAr: 'ظهراً وعصراً', labelEn: 'Afternoon' },
                        { id: 'evening', labelAr: 'مساءً (بعد المدرسة)', labelEn: 'Evening' },
                      ].map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, preferredTimeSlot: slot.id }))}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                            formData.preferredTimeSlot === slot.id
                              ? 'bg-sky-600 text-white border-sky-600'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {isAr ? slot.labelAr : slot.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    label={isAr ? 'أي ملاحظات إضافية حول مستوى طفلك (اختياري)' : 'Additional Notes About Your Child (Optional)'}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={isAr ? 'مثال: يوسف حفظ جزء عم ويرغب في البدء بتعلم التجويد...' : 'e.g. Beginner in Arabic letters, eager to learn Tajweed...'}
                    rows={3}
                  />
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3)}
                    className="px-5 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-xl transition-colors"
                  >
                    {isAr ? 'السابق' : 'Back'}
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  className="px-7 py-3 text-xs sm:text-sm font-semibold rounded-xl text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{step === 3 ? (isAr ? 'تأكيد حجز الحصة المجانية' : 'Confirm Free Trial') : (isAr ? 'التالي' : 'Continue')}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

            </form>
          )}

        </Card>

      </Container>
    </div>
  );
};
