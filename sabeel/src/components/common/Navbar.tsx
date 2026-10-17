import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CURRENCIES } from '../../services/currencyService';
import { Currency } from '../../types';
import { 
  Globe, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Monitor, 
  ChevronDown,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    lang, 
    setLang, 
    currency, 
    setCurrency, 
    theme, 
    setTheme, 
    isDark,
    setIsBookingModalOpen 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const isAr = lang === 'ar';
  const location = useLocation();

  const navLinks = [
    { to: '/courses', labelAr: 'المسارات', labelEn: 'Courses' },
    { to: '/teachers', labelAr: 'هيئة التدريس', labelEn: 'Faculty' },
    { to: '/pricing', labelAr: 'الأسعار', labelEn: 'Tuition' },
    { to: '/about', labelAr: 'عن الأكاديمية', labelEn: 'About' },
    { to: '/reviews', labelAr: 'تجارب الأهالي', labelEn: 'Reviews' },
    { to: '/blog', labelAr: 'المدونة', labelEn: 'Blog' },
    { to: '/faq', labelAr: 'الأسئلة الشائعة', labelEn: 'FAQ' },
    { to: '/contact', labelAr: 'تواصل معنا', labelEn: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* Brand Wordmark with subtle Islamic Eight-Pointed Star Motif */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-transparent transition-transform group-hover:scale-105">
              <img
                src="/src/assets/images/sabeel_brand_logo_1792261027598.jpg"
                alt={isAr ? 'شعار أكاديمية سبيل' : 'Sabeel Academy Logo'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mix-blend-multiply dark:bg-white/90 dark:rounded-lg dark:p-0.5"
              />
            </div>
            <div className="flex flex-col text-start">
              <span className="text-lg font-bold tracking-tight text-slate-950 dark:text-white font-sans leading-none">
                {isAr ? 'أكاديمية سبيل' : 'Sabeel Academy'}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans tracking-wide mt-1">
                {isAr ? 'للتعليم القرآني واللغة العربية' : 'Quran & Classical Arabic'}
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors whitespace-nowrap shrink-0 py-1 ${
                    isActive
                      ? 'text-sky-600 dark:text-sky-400 font-bold border-b-2 border-sky-600 dark:border-sky-400'
                      : 'hover:text-slate-950 dark:hover:text-white'
                  }`
                }
              >
                {isAr ? link.labelAr : link.labelEn}
              </NavLink>
            ))}
          </nav>

          {/* Utilities & CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors whitespace-nowrap"
                aria-label="Select currency"
              >
                <span className="font-semibold">{currency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setCurrencyDropdownOpen(false)} 
                  />
                  <div className="absolute top-full mt-2 end-0 z-50 w-48 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-1.5 grid grid-cols-1 gap-0.5">
                    {(Object.keys(CURRENCIES) as Currency[]).map((cur) => (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => {
                          setCurrency(cur);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg transition-colors text-start ${
                          currency === cur 
                            ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 font-semibold' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-medium">{cur} ({CURRENCIES[cur].symbol})</span>
                        <span className="text-[11px] text-slate-400">
                          {isAr ? CURRENCIES[cur].nameAr : CURRENCIES[cur].nameEn}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Mode Direct Segmented Switcher */}
            <div className="flex items-center p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setTheme('light')}
                title={isAr ? 'الوضع النهاري (فاتح)' : 'Light Mode'}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  theme === 'light' 
                    ? 'bg-white dark:bg-slate-800 text-amber-500 shadow-xs' 
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                aria-label="Light mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                title={isAr ? 'الوضع الليلي (داكن)' : 'Dark Mode'}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-slate-800 text-sky-400 shadow-xs' 
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                aria-label="Dark mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme('system')}
                title={isAr ? 'تلقائي (حسب إعدادات النظام)' : 'System Mode'}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  theme === 'system' 
                    ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-xs' 
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                aria-label="System mode"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Primary Action Button */}
            <Link
              to="/book-trial"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <span>{isAr ? 'احجز حصتك التجريبية' : 'Book Free Trial'}</span>
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>

            {/* Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

        </div>
      </div>

      {/* Animated Slide-out Sidebar Drawer (Spans 1/4 of the page on desktop) */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop Overlay with Smooth Fade */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Sidebar Drawer Panel (Quarter Page Width: lg:w-[25vw]) */}
        <aside
          className={`fixed top-0 bottom-0 ${isAr ? 'right-0' : 'left-0'} h-full w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] min-w-[280px] max-w-[420px] bg-white dark:bg-slate-950 border-${isAr ? 'l' : 'r'} border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-out ${
            mobileMenuOpen
              ? 'translate-x-0'
              : isAr
              ? 'translate-x-full'
              : '-translate-x-full'
          }`}
        >
          {/* Sidebar Top Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-transparent flex items-center justify-center shrink-0">
                <img
                  src="/src/assets/images/sabeel_brand_logo_1792261027598.jpg"
                  alt="Sabeel Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain mix-blend-multiply dark:bg-white/90 dark:rounded-md dark:p-0.5"
                />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-sm font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
                  {isAr ? 'أكاديمية سبيل' : 'Sabeel Academy'}
                </span>
                <span className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">
                  {isAr ? 'مسار العلم والقرآن' : 'The Path of Knowledge'}
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Nav Links */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-start">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 px-3 uppercase tracking-wider block mb-2">
                {isAr ? 'الأقسام والمسارات' : 'Navigation Menu'}
              </span>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`
                  }
                >
                  <span>{isAr ? link.labelAr : link.labelEn}</span>
                  {isAr ? <ArrowLeft className="w-3.5 h-3.5 opacity-40" /> : <ArrowRight className="w-3.5 h-3.5 opacity-40" />}
                </NavLink>
              ))}
            </div>

            {/* Quick Language & Theme in Sidebar */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {isAr ? 'لغة الموقع:' : 'Language:'}
                </span>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setLang('ar')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                      lang === 'ar'
                        ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    العربية
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                      lang === 'en'
                        ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Theme Selector */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                  {isAr ? 'المظهر:' : 'Theme:'}
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs rounded-lg border transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isAr ? 'نهار' : 'Light'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs rounded-lg border transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-sky-500/15 border-sky-500/40 text-sky-600 dark:text-sky-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-sky-400" />
                    <span>{isAr ? 'ليل' : 'Dark'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('system')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs rounded-lg border transition-all cursor-pointer ${
                      theme === 'system'
                        ? 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isAr ? 'تلقائي' : 'Auto'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Bottom CTA Button */}
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-900/40">
            <Link
              to="/book-trial"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isAr ? 'احجز حصتك التجريبية' : 'Book Free Trial'}</span>
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
};
