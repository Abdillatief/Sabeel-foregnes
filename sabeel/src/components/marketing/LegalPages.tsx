import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowLeft, RefreshCw, FileText } from 'lucide-react';

export const LegalPages: React.FC<{ type: 'privacy' | 'terms' | 'refund' }> = ({ type }) => {
  const { lang, setActiveView } = useApp();
  const isAr = lang === 'ar';

  const titles = {
    privacy: { ar: 'سياسة الخصوصية وأمان البيانات', en: 'Privacy Policy & Data Security' },
    terms: { ar: 'الشروط والأحكام العامة', en: 'Terms of Service' },
    refund: { ar: 'سياسة الاسترجاع وضمان الرضا 100%', en: 'Refund Policy & 100% Satisfaction Guarantee' },
  };

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <button
          onClick={() => setActiveView('home')}
          className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1.5"
        >
          ← {isAr ? 'العودة للرئيسية' : 'Back to Home'}
        </button>

        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
            Sabeel Academy Official Documents
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {isAr ? titles[type].ar : titles[type].en}
          </h1>
          <p className="text-xs text-slate-400">
            {isAr ? 'آخر تحديث: أكتوبر 2026' : 'Last Updated: October 2026'}
          </p>
        </div>

        {type === 'privacy' && (
          <div className="prose max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. حماية بيانات الأطفال والطلاب</h3>
            <p>
              تلتزم أكاديمية سبيل بأعلى معايير الخصوصية الدولية (COPPA & GDPR). نحن لا نقوم ببيع أو مشاركة أي بيانات شخصية أو تسجيلات حصص مع أي طرف ثالث لأي أغراض دعائية.
            </p>
            <h3 className="text-base font-bold text-slate-900">2. أمان القاعات الافتراضية</h3>
            <p>
              جميع الحصص المباشرة مشفرة بالكامل من طرف لطرف (End-to-End Encryption) وتتم عبر قاعات فردية خاصة ومحمية بكلمة مرور ورابط مشفر.
            </p>
            <h3 className="text-base font-bold text-slate-900">3. المدفوعات والبطاقات البنكية</h3>
            <p>
              تتم جميع المعاملات المالية عبر بوابات دفع مصرفية مشفرة خاضعة لمعايير PCI-DSS (Stripe & PayPal)، ولا يتم تخزين أي أرقام بطاقات ائتمانية على خوادم الأكاديمية.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="prose max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. مواعيد الحصص والالتزام</h3>
            <p>
              يحق للطالب أو ولي الأمر إعادة جدولة أي حصة بإشعار مسبق قبل موعدها بساعتين على الأقل عبر لوحة التحكم.
            </p>
            <h3 className="text-base font-bold text-slate-900">2. الإجازات والشهادات</h3>
            <p>
              تمنح الشهادات الرسمية والإجازات بالسند المتصل بعد إتمام المتطلبات واجتياز اختبار التقييم بنجاح تحت إشراف مشيخة المقارئ بالأكاديمية.
            </p>
          </div>
        )}

        {type === 'refund' && (
          <div className="prose max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. ضمان الرضا الكامل لمدة 14 يوماً</h3>
            <p>
              نحن على ثقة تامة بجودة معلمينا، ولهذا نقدم ضمان استرجاع كامل 100% خلال أول أسبوعين من الاشتراك في حال عدم الرضا عن مستوى التدريس لأي سبب.
            </p>
            <h3 className="text-base font-bold text-slate-900">2. الحصص غير المستخدمة</h3>
            <p>
              لا تضيع الحصص عند التغيب بعذر، بل يتم ترحيلها إلى رصيدك أو استبدالها بمرونة وفق سياسة الأكاديمية.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
