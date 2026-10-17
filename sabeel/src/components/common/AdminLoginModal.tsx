import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ShieldCheck, X, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { lang, showAdminLoginModal, setShowAdminLoginModal, adminLogin } = useApp();
  const isAr = lang === 'ar';

  const [email, setEmail] = useState('tatahoda223456@gmail.com');
  const [password, setPassword] = useState('sabeel123');
  const [error, setError] = useState<string | null>(null);

  if (!showAdminLoginModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = adminLogin(email, password);
    if (!success) {
      setError(
        isAr
          ? 'بيانات الدخول غير صحيحة. يرجى التأكد من البريد وكلمة المرور.'
          : 'Invalid administrator credentials. Please check your email and password.'
      );
    }
  };

  const handleUseDemo = () => {
    setEmail('tatahoda223456@gmail.com');
    setPassword('sabeel123');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white relative">
          <button
            onClick={() => setShowAdminLoginModal(false)}
            className="absolute top-4 end-4 p-2 text-slate-400 hover:text-white rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-black text-white">
            {isAr ? 'تسجيل دخول الإدارة المركزية' : 'Administrator Sign In'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {isAr
              ? 'صلاحيات تعديل الدورات، الأسعار، الحجوزات، ونظام Sabeel Teacher'
              : 'Authorized access to edit courses, pricing, leads CRM, and system settings'}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-800 font-semibold">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'البريد الإلكتروني المعتمد للمشرف:' : 'Administrator Email:'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@sabeelacademy.com"
                  className="w-full border border-slate-200 rounded-xl ps-10 pe-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 font-medium"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {isAr ? 'كلمة المرور الأمنية:' : 'Security Password:'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full border border-slate-200 rounded-xl ps-10 pe-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 font-medium"
                  required
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute start-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs py-3 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'تسجيل الدخول كمدير' : 'Access Admin Dashboard'}</span>
            </button>
          </form>

          {/* Quick Demo Access Helper */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">
              {isAr ? 'حساب تجريبي سريع:' : 'Quick Demo Access:'}
            </span>
            <button
              type="button"
              onClick={handleUseDemo}
              className="font-bold text-sky-600 hover:underline text-[11px]"
            >
              {isAr ? 'ملء بيانات المشرف تلقائياً' : 'Auto-fill Demo Credentials'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
