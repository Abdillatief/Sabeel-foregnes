import React from 'react';
import { useApp } from '../../context/AppContext';
import { Certificate } from '../../types';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Share2 
} from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const { lang } = useApp();
  if (!certificate) return null;

  const isAr = lang === 'ar';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Controls Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">
              {isAr ? 'شهادة إتمام وتفوق رسمية معتمدة' : 'Official Verified Certificate'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'طباعة / حفظ PDF' : 'Download PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas / Display */}
        <div className="p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-amber-50/40 via-white to-sky-50/30 flex-1">
          <div className="relative border-8 border-double border-amber-600/30 rounded-2xl p-6 md:p-10 bg-white shadow-xl text-center">
            {/* Islamic Corner Filigrees */}
            <div className="absolute top-2 start-2 w-8 h-8 border-t-2 border-s-2 border-amber-500 rounded-tl-lg" />
            <div className="absolute top-2 end-2 w-8 h-8 border-t-2 border-e-2 border-amber-500 rounded-tr-lg" />
            <div className="absolute bottom-2 start-2 w-8 h-8 border-b-2 border-s-2 border-amber-500 rounded-bl-lg" />
            <div className="absolute bottom-2 end-2 w-8 h-8 border-b-2 border-e-2 border-amber-500 rounded-br-lg" />

            {/* Emblem */}
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg mb-4">
              <Award className="w-8 h-8" />
            </div>

            {/* Academy Title */}
            <h4 className="text-sm uppercase tracking-widest text-slate-500 font-bold">
              Sabeel Academy • أكاديمية سبيل العالمية
            </h4>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 mb-1">
              {isAr ? 'شهادة إتمام وإتقان' : 'Certificate of Achievement'}
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-6" />

            <p className="text-xs md:text-sm text-slate-600 mb-2">
              {isAr ? 'تشهد إدارة أكاديمية سبيل بأن الطالب/ـة المتميز/ة:' : 'This certifies that the student:'}
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-sky-700 my-3 font-serif">
              {isAr ? certificate.studentNameAr : certificate.studentNameEn}
            </h3>

            <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              {isAr
                ? `قد أتم/ت بنجاح متطلبات الدورة الدراسية المعتمدة: (${certificate.courseTitleAr}) بتقدير: ${certificate.gradeTitleAr} بنسبة ${certificate.gradePercentage}%، تحت إشراف فضيلة المعلم: ${certificate.teacherNameAr}.`
                : `Has successfully completed the accredited curriculum: (${certificate.courseTitleEn}) with grade: ${certificate.gradeTitleEn} (${certificate.gradePercentage}%), under the supervision of tutor: ${certificate.teacherNameEn}.`}
            </p>

            {/* Bottom Meta & QR Verification */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-start">
              {/* Left: Signatures */}
              <div className="space-y-1 text-center md:text-start">
                <span className="text-[11px] text-slate-400 font-medium block">
                  {isAr ? 'تاريخ الإصدار:' : 'Issue Date:'}
                </span>
                <span className="text-xs font-bold text-slate-800 block">{certificate.issueDate}</span>
                <span className="text-[10px] text-amber-600 font-semibold block mt-1">
                  {isAr ? 'محرر من مشيخة التعليم بالأكاديمية' : 'Approved by Academic Council'}
                </span>
              </div>

              {/* Center: QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <img
                    src={certificate.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://sabeelacademy.com/verify/${certificate.certificateNumber}`}
                    alt="QR Verification"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'شهادة أصلية موثقة' : 'Verified Original'}</span>
                </div>
              </div>

              {/* Right: Certificate ID */}
              <div className="text-center md:text-end space-y-1">
                <span className="text-[11px] text-slate-400 font-medium block">
                  {isAr ? 'رقم الشهادة المعتمد:' : 'Certificate ID:'}
                </span>
                <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md inline-block">
                  {certificate.certificateNumber}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {isAr ? 'رمز التحقق الرقمي:' : 'Digital Code:'} {certificate.verificationCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
