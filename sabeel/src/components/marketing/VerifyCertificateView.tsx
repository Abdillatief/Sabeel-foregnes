import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Certificate } from '../../types';
import { ShieldCheck, Search, Award, CheckCircle2, XCircle } from 'lucide-react';

export const VerifyCertificateView: React.FC = () => {
  const { lang, certificates, setSelectedCertificateForModal } = useApp();
  const isAr = lang === 'ar';

  const [inputCode, setInputCode] = useState('SBL-QUR-2026-8941');
  const [searchedCert, setSearchedCert] = useState<Certificate | null>(certificates[0] || null);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputCode.trim().toUpperCase();
    const found = certificates.find(
      c => c.certificateNumber.toUpperCase() === query || c.verificationCode.toUpperCase() === query
    );
    setSearchedCert(found || null);
    setHasSearched(true);
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center border border-amber-200 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Official Academic Verification
          </span>
          <h1 className="text-3xl font-black text-slate-900">
            {isAr ? 'التحقق من صحة شهادات أكاديمية سبيل' : 'Verify Sabeel Academy Certificate'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            {isAr
              ? 'أدخل رقم الشهادة أو رمز التحقق الرقمي للتأكد من أصالتها وسجل الإتقان الخاص بالطالب.'
              : 'Enter certificate ID or digital verification code to verify authenticity and student record.'}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={inputCode}
            onChange={e => setInputCode(e.target.value)}
            placeholder="e.g. SBL-QUR-2026-8941"
            className="flex-1 bg-white border border-slate-300 rounded-2xl px-4 py-3 text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>{isAr ? 'تحقق' : 'Verify'}</span>
          </button>
        </form>

        {/* Verification Result Card */}
        {hasSearched && (
          searchedCert ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-lg space-y-6 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{isAr ? 'شهادة رسمية معتمدة وموثقة بنجاح' : 'Authentic Accredited Certificate'}</span>
                </div>
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  {searchedCert.certificateNumber}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">{isAr ? 'اسم الطالب:' : 'Student Name:'}</span>
                  <span className="text-base font-bold text-slate-900 block mt-0.5">
                    {isAr ? searchedCert.studentNameAr : searchedCert.studentNameEn}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">{isAr ? 'الدورة والمنهج:' : 'Course & Curriculum:'}</span>
                  <span className="text-base font-bold text-sky-700 block mt-0.5">
                    {isAr ? searchedCert.courseTitleAr : searchedCert.courseTitleEn}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">{isAr ? 'المعلم المشرف:' : 'Supervising Tutor:'}</span>
                  <span className="font-semibold text-slate-800 block mt-0.5">
                    {isAr ? searchedCert.teacherNameAr : searchedCert.teacherNameEn}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">{isAr ? 'التقدير والنسبة:' : 'Grade & Honors:'}</span>
                  <span className="font-semibold text-emerald-700 block mt-0.5">
                    {searchedCert.gradeTitleAr} ({searchedCert.gradePercentage}%)
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedCertificateForModal(searchedCert)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3 rounded-xl shadow transition flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>{isAr ? 'عرض الشهادة المطبوعة الكاملة مع رمز QR' : 'View Full Certificate with QR'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center space-y-2 text-rose-800 text-xs">
              <XCircle className="w-8 h-8 text-rose-500 mx-auto" />
              <h4 className="font-bold text-sm">{isAr ? 'لم يتم العثور على شهادة بهذا الرمز' : 'No certificate found with this code'}</h4>
              <p>{isAr ? 'يرجى التأكد من كتابة الرقم بدقة أو التواصل مع الإدارة.' : 'Please verify the ID or contact academic admissions.'}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
