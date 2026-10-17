import React from 'react';
import { BookOpen, User } from 'lucide-react';

import { SabeelLogo } from './SabeelLogo';

interface NavbarProps {
  onOpenPortal: () => void;
  onOpenEnroll: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPortal, onOpenEnroll }) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Wordmark */}
        <a href="#hero" className="flex items-center gap-3 text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 group">
          <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-transparent">
            <img
              src="/src/assets/images/sabeel_brand_logo_1792261027598.jpg"
              alt="Sabeel Academy Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          <span className="tracking-tight">Sabeel Academy</span>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a href="#curriculum" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Curriculum
          </a>
          <a href="#tajweed-lab" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Tajweed Lab
          </a>
          <a href="#quran-reader" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Quran Reader
          </a>
          <a href="#prayer-wird" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Prayer & Wird
          </a>
          <a href="#assessment" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Knowledge Check
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPortal}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-200 rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-all whitespace-nowrap shrink-0 shadow-2xs"
          >
            <User className="w-3.5 h-3.5 text-emerald-800" />
            <span>Student Portal</span>
          </button>
          <button
            onClick={onOpenEnroll}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-950 transition-all whitespace-nowrap shrink-0 shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Enroll Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
