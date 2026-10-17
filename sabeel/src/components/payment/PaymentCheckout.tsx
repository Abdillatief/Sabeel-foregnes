import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../services/currencyService';
import confetti from 'canvas-confetti';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Gift, 
  Sparkles, 
  ArrowLeft,
  Calendar,
  Award
} from 'lucide-react';

export const PaymentCheckout: React.FC = () => {
  const { lang, currency, setActiveView, setRole } = useApp();
  const isAr = lang === 'ar';

  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'standard' | 'intensive'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple_pay'>('card');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const plans = {
    starter: { nameAr: 'باقة البداية (4 حصص شهرياً)', nameEn: 'Starter Plan (4 classes)', baseUSD: 42 },
    standard: { nameAr: 'الباقة القياسية (8 حصص شهرياً)', nameEn: 'Standard Plan (8 classes)', baseUSD: 76 },
    intensive: { nameAr: 'باقة الحفظ المكثف (14 حصة)', nameEn: 'Intensive Hifz (14 classes)', baseUSD: 119 },
  };

  const rawUSD = plans[selectedPlan].baseUSD;
  const discountedUSD = discountPercent > 0 ? Math.round(rawUSD * (1 - discountPercent / 100)) : rawUSD;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'SABEEL20') {
      setDiscountPercent(20);
      setCouponMessage(isAr ? 'تم تطبيق خصم 20% بنجاح!' : '20% Discount applied!');
    } else if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponMessage(isAr ? 'تم تطبيق خصم 10% بنجاح!' : '10% Discount applied!');
    } else {
      setDiscountPercent(0);
      setCouponMessage(isAr ? 'كود الخصم غير صحيح أو منتهي' : 'Invalid coupon code');
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-emerald-200 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-4 border-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">
              {isAr ? 'تم تأكيد الاشتراك بنجاح!' : 'Payment Successful!'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isAr
                ? 'مبارك انضمامكم إلى أكاديمية سبيل. تم تفعيل رصيد الحصص في حسابك وإرسال الفاتورة الرسمية إلى بريدك الإلكتروني.'
                : 'Welcome to Sabeel Academy! Your class balance is now active, and the official receipt has been emailed.'}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-start font-medium text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">{isAr ? 'الباقة:' : 'Plan:'}</span>
              <span className="font-bold">{isAr ? plans[selectedPlan].nameAr : plans[selectedPlan].nameEn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isAr ? 'المبلغ المدفوع:' : 'Total Paid:'}</span>
              <span className="font-black text-emerald-600">{formatPrice(discountedUSD, currency, lang)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isAr ? 'حالة السداد:' : 'Status:'}</span>
              <span className="text-emerald-600 font-bold">Secured & Paid</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setRole('student');
                setActiveView('student-portal');
              }}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-3 rounded-xl shadow transition"
            >
              {isAr ? 'الانتقال إلى لوحة الطالب وجدولة الحصص' : 'Go to Student Portal & Schedule Classes'}
            </button>
            <button
              onClick={() => setActiveView('home')}
              className="text-xs text-slate-500 hover:underline"
            >
              {isAr ? 'العودة للرئيسية' : 'Return to Home'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <button
          onClick={() => setActiveView('pricing')}
          className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1.5"
        >
          ← {isAr ? 'العودة إلى صفحة الباقات' : 'Back to pricing plans'}
        </button>

        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            256-Bit SSL Encrypted Checkout
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            {isAr ? 'إتمام الاشتراك والدفع الآمن' : 'Secure Subscription Checkout'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            {/* Step 1: Choose plan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isAr ? '1. اختر باقة الاشتراك الشهرية:' : '1. Select Your Monthly Plan:'}
              </label>
              <div className="space-y-2">
                {(['starter', 'standard', 'intensive'] as const).map(pKey => {
                  const isSel = selectedPlan === pKey;
                  return (
                    <div
                      key={pKey}
                      onClick={() => setSelectedPlan(pKey)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                        isSel ? 'border-sky-500 bg-sky-50/50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-sky-500">
                          {isSel && <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />}
                        </div>
                        <span className="text-xs font-bold text-slate-900">
                          {isAr ? plans[pKey].nameAr : plans[pKey].nameEn}
                        </span>
                      </div>
                      <span className="font-mono text-sm font-black text-slate-900">
                        {formatPrice(plans[pKey].baseUSD, currency, lang)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Payment Gateway Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isAr ? '2. اختر طريقة الدفع الآمنة:' : '2. Select Payment Method:'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{isAr ? 'بطاقة بنكية' : 'Card / Stripe'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'paypal'
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-black text-blue-800 text-sm">PayPal</span>
                  <span>PayPal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'apple_pay'
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold">Apple / Google</span>
                  <span>Pay</span>
                </button>
              </div>
            </div>

            {/* Step 3: Card Fields */}
            {paymentMethod === 'card' && (
              <form onSubmit={handlePay} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? 'الاسم كما يظهر على البطاقة:' : 'Cardholder Name:'}
                  </label>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={e => setCardholderName(e.target.value)}
                    placeholder="John Doe / Tariq Al-Mansoor"
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? 'رقم البطاقة الائتمانية:' : 'Card Number:'}
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? 'تاريخ الانتهاء:' : 'Expiry Date:'}
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">CVC / CVV:</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={e => setCardCvc(e.target.value)}
                      placeholder="123"
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-slate-900 hover:bg-sky-600 disabled:opacity-50 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>
                    {isProcessing
                      ? (isAr ? 'جاري تأكيد السداد المشفر...' : 'Processing Payment...')
                      : (isAr ? `تأكيد الدفع المشفر (${formatPrice(discountedUSD, currency, lang)})` : `Pay Now (${formatPrice(discountedUSD, currency, lang)})`)}
                  </span>
                </button>
              </form>
            )}

            {paymentMethod !== 'card' && (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-4">
                <p className="text-xs text-slate-600">
                  {isAr
                    ? 'سيتم توجيهك بأمان لإتمام المعاملة بنقرة واحدة عبر حسابك الموثق.'
                    : 'You will complete your payment securely with 1-click via your authorized account.'}
                </p>
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-3.5 rounded-xl shadow"
                >
                  {isProcessing
                    ? (isAr ? 'جاري المعالجة...' : 'Processing...')
                    : (isAr ? `المتابعة للدفع (${formatPrice(discountedUSD, currency, lang)})` : `Continue to Pay (${formatPrice(discountedUSD, currency, lang)})`)}
                </button>
              </div>
            )}
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Order Summary Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3">
                {isAr ? 'ملخص الفاتورة الشهرية:' : 'Order Summary:'}
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>{isAr ? 'قيمة الباقة الأساسية:' : 'Base Plan Price:'}</span>
                  <span className="font-mono font-bold text-slate-900">{formatPrice(rawUSD, currency, lang)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>{isAr ? `خصم الكوبون (${discountPercent}%):` : `Coupon Discount (${discountPercent}%):`}</span>
                    <span>-{formatPrice(rawUSD - discountedUSD, currency, lang)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>{isAr ? 'رسوم التسجيل والكتب الرقمية:' : 'Registration & Digital Books:'}</span>
                  <span className="text-emerald-600 font-bold">{isAr ? 'مجاناً 100%' : '100% Free'}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-slate-900">
                  <span className="font-bold text-sm">{isAr ? 'الإجمالي النهائي:' : 'Final Total:'}</span>
                  <span className="font-black text-2xl text-sky-700">
                    {formatPrice(discountedUSD, currency, lang)}
                  </span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder={isAr ? 'كود الخصم (جرب SABEEL20)' : 'Coupon Code (Try SABEEL20)'}
                  className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase font-mono outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                >
                  {isAr ? 'تطبيق' : 'Apply'}
                </button>
              </form>

              {couponMessage && (
                <p className={`text-[11px] font-bold ${discountPercent > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {couponMessage}
                </p>
              )}
            </div>

            {/* 100% Guarantee Box */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-6 text-emerald-900 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-black text-sm text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{isAr ? 'ضمان استرداد 100% لمدة 14 يوماً' : '14-Day 100% Money-Back Guarantee'}</span>
              </div>
              <p className="leading-relaxed">
                {isAr
                  ? 'إذا لم تكن راضياً تماماً عن مستوى المعلم أو أسلوب التدريس خلال أول 14 يوماً، يمكنك استرداد الرسوم كاملة دون أي شروط.'
                  : 'If you are not delighted with your tutor or curriculum within 14 days, receive a complete 100% refund.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
