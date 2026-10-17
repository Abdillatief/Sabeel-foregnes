import React from 'react';
import { Mail, ShieldCheck, Heart } from 'lucide-react';
import { SabeelLogo } from './SabeelLogo';

interface FooterProps {
  onOpenEnroll: () => void;
  onOpenPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnroll, onOpenPortal }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center p-0.5">
                <SabeelLogo size={32} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Sabeel Academy</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An international academic institution dedicated to classical Islamic sciences, Quranic recitation mastery, Arabic linguistics, and ethical youth leadership under the patronage of community endowments.
            </p>
            <div className="pt-2 text-xs text-stone-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Contact Admissions: sabeelacademy8@gmail.com</span>
            </div>
          </div>

          {/* Quick Curriculum Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Academic Curricula
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#tajweed-lab" className="hover:text-amber-300 transition-colors">Tajweed & Phonetics Lab</a></li>
              <li><a href="#curriculum" className="hover:text-amber-300 transition-colors">Classical Arabic Grammar (Nahw)</a></li>
              <li><a href="#quran-reader" className="hover:text-amber-300 transition-colors">Quranic Tadabbur & Morphology</a></li>
              <li><a href="#prayer-wird" className="hover:text-amber-300 transition-colors">Daily Prayer & Prophetic Dhikr</a></li>
              <li><a href="#assessment" className="hover:text-amber-300 transition-colors">Sanad Certification Exams</a></li>
            </ul>
          </div>

          {/* Institutional Governance */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Governance & Accreditation
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Instructional syllabi reviewed and approved by Sanad-linked scholars from Al-Azhar, Umm Al-Qura, and the Islamic University of Madinah.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={onOpenEnroll}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Apply for Admission
              </button>
              <button
                onClick={onOpenPortal}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Student Login
              </button>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Sabeel Academy. All educational rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-stone-500">
            <span>Waqf Endowment Foundation</span>
            <span aria-hidden="true">·</span>
            <span>Non-Profit Classical Education</span>
            <span aria-hidden="true">·</span>
            <span>Accredited Ijaza Records</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
