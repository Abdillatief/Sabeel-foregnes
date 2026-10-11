import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CURRENCIES } from '../../services/currencyService';
import { Currency, UserRole } from '../../types';
import { 
  BookOpen, 
  Globe, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  GraduationCap, 
  Users, 
  ShieldAlert, 
  PhoneCall, 
  Sparkles,
  Heart
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    lang, 
    setLang, 
    role, 
    setRole, 
    currency, 
    setCurrency, 
    activeView, 
    setActiveView, 
    setIsBookingModalOpen,
    isAdminLoggedIn,
    setShowAdminLoginModal,
    adminLogout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  const isAr = lang === 'ar';

  const navLinks = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'courses', labelAr: 'الدورات والمناهج', labelEn: 'Courses' },
    { id: 'teachers', labelAr: 'نخبة المعلمين', labelEn: 'Tutors' },
    { id: 'pricing', labelAr: 'الأسعار والباقات', labelEn: 'Pricing' },
    { id: 'reviews', labelAr: 'آراء الطلاب', labelEn: 'Reviews' },
    { id: 'blog', labelAr: 'المدونة', labelEn: 'Blog' },
    { id: 'faq', labelAr: 'الأسئلة الشائعة', labelEn: 'FAQ' },
    { id: 'contact', labelAr: 'اتصل بنا', labelEn: 'Contact' },
  ];

  const portalOptions: { role: UserRole; view: string; labelAr: string; labelEn: string; icon: React.ReactNode }[] = [
    { role: 'student', view: 'student-portal', labelAr: 'بوابة الطالب (Student)', labelEn: 'Student Portal', icon: <GraduationCap className="w-4 h-4 text-sky-500" /> },
    { role: 'parent', view: 'parent-portal', labelAr: 'بوابة ولي الأمر (Parent)', labelEn: 'Parent Portal', icon: <Heart className="w-4 h-4 text-rose-500" /> },
    { role: 'admin', view: 'admin-portal', labelAr: 'لوحة الإدارة والـ CRM (Admin)', labelEn: 'Admin CRM & Ops', icon: <ShieldAlert className="w-4 h-4 text-emerald-500" /> },
  ];

  const handlePortalSelect = (opt: typeof portalOptions[0]) => {
    if (opt.role === 'admin' && !isAdminLoggedIn) {
      setShowAdminLoginModal(true);
      setPortalDropdownOpen(false);
      return;
    }
    setRole(opt.role);
    setActiveView(opt.view);
    setPortalDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top micro bar: Fast Role Switcher & Announcement */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-slate-300 font-medium">
            {isAr 
              ? 'احجز حصتك التجريبية المجانية اليوم واحصل على تقييم مستوى فوري' 
              : 'Book your free trial today & get an instant personalized level assessment'}
          </span>
        </div>

        {/* Persona quick switch for easy demonstration */}
        <div className="flex items-center gap-3">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {isAr ? 'مشرف مسجل (Admin)' : 'Admin Active'}
              </span>
              <button
                onClick={adminLogout}
                className="text-[11px] text-slate-400 hover:text-white underline"
              >
                {isAr ? 'خروج' : 'Logout'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAdminLoginModal(true)}
              className="text-[11px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isAr ? 'دخول الإدارة' : 'Admin Login'}</span>
            </button>
          )}

          <span className="text-slate-600">|</span>

          <span className="text-slate-400 text-[11px]">
            {isAr ? 'عرض المنصة بصفتك:' : 'Demo View As:'}
          </span>
          <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => { setRole('guest'); setActiveView('home'); }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                role === 'guest' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isAr ? 'زائر' : 'Guest'}
            </button>
            <button
              onClick={() => { setRole('student'); setActiveView('student-portal'); }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                role === 'student' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isAr ? 'طالب' : 'Student'}
            </button>
            <button
              onClick={() => { setRole('parent'); setActiveView('parent-portal'); }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                role === 'parent' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isAr ? 'ولي أمر' : 'Parent'}
            </button>
            <button
              onClick={() => {
                if (!isAdminLoggedIn) {
                  setShowAdminLoginModal(true);
                } else {
                  setRole('admin');
                  setActiveView('admin-portal');
                }
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                role === 'admin' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isAr ? 'إدارة (CRM)' : 'Admin'}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-sky-950 flex items-center justify-center shadow-lg border border-sky-400/30 group-hover:scale-105 transition duration-300">
              <BookOpen className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                  Sabeel
                </span>
                <span className="text-xs uppercase font-bold tracking-widest text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                  Academy
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {isAr ? 'أكاديمية سبيل لتعليم القرآن والعربية' : 'Global Quran & Arabic Academy'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveView(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-sky-600 bg-sky-50 shadow-xs'
                      : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {isAr ? link.labelAr : link.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition"
              >
                <span className="font-mono font-bold text-sky-700">{currency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute top-full end-0 mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  {(Object.keys(CURRENCIES) as Currency[]).map(cur => (
                    <button
                      key={cur}
                      onClick={() => {
                        setCurrency(cur);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium hover:bg-sky-50 transition ${
                        currency === cur ? 'text-sky-600 bg-sky-50/50 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span className="font-mono font-bold">{cur}</span>
                      <span className="text-slate-400 text-[10px]">
                        {isAr ? CURRENCIES[cur].nameAr : CURRENCIES[cur].nameEn}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition"
              title={isAr ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-sky-600" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            {/* Portals Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 transition"
              >
                <User className="w-3.5 h-3.5 text-slate-600" />
                <span>{isAr ? 'بوابات المنظومة' : 'Portals'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {portalDropdownOpen && (
                <div className="absolute top-full end-0 mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                    {isAr ? 'اللوحات المتاحة' : 'Available Portals'}
                  </div>
                  {portalOptions.map(opt => (
                    <button
                      key={opt.role}
                      onClick={() => handlePortalSelect(opt)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition text-start ${
                        activeView === opt.view
                          ? 'bg-sky-50 text-sky-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt.icon}
                      <span>{isAr ? opt.labelAr : opt.labelEn}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Free Trial CTA */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="relative group overflow-hidden bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition duration-300 hover:shadow-sky-500/25 active:scale-95"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>{isAr ? 'احجز حصة مجانية' : 'Book Free Trial'}</span>
              </span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="p-2 text-xs font-bold text-slate-700 border border-slate-200 rounded-lg"
            >
              {isAr ? 'EN' : 'ع'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-sky-600 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveView(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-semibold text-start transition ${
                  activeView === link.id
                    ? 'bg-sky-50 text-sky-600 font-bold'
                    : 'text-slate-700 bg-slate-50'
                }`}
              >
                {isAr ? link.labelAr : link.labelEn}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <div className="text-[11px] font-bold text-slate-400 mb-2">
              {isAr ? 'الدخول إلى اللوحات:' : 'Switch to Portal:'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {portalOptions.map(opt => (
                <button
                  key={opt.role}
                  onClick={() => handlePortalSelect(opt)}
                  className="flex items-center gap-2 p-2 rounded-xl text-xs bg-slate-50 text-slate-700 hover:bg-sky-50 font-medium"
                >
                  {opt.icon}
                  <span className="truncate">{isAr ? opt.labelAr : opt.labelEn}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsBookingModalOpen(true);
            }}
            className="w-full bg-sky-500 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isAr ? 'احجز حصة تجريبية مجانية' : 'Book Free Trial Lesson'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
