import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreCourses: () => void;
  onOpenLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCourses, onOpenLab }) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-16 md:pb-20 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vision & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 tracking-wide">
              <span>Sabeel Academy of Classical Sciences</span>
              <span aria-hidden="true">·</span>
              <span>Accredited Curriculum</span>
              <span aria-hidden="true">·</span>
              <span>Sanad-Linked Ijaza</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Illuminating the Path of Authentic Scholarship, Arabic Mastery & Character
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Immerse yourself in classical Islamic knowledge paired with modern interactive learning labs. From precise Quranic Tajweed articulation and classical grammar to prophetic ethics and youth STEM leadership.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCourses}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-950 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Browse Full Curriculum</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
              <button
                onClick={onOpenLab}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 hover:border-stone-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-emerald-800" />
                <span>Launch Tajweed & Phonetics Lab</span>
              </button>
            </div>

            {/* Arabic calligraphy quote */}
            <div className="pt-4 border-t border-stone-200/80">
              <p className="font-arabic text-xl sm:text-2xl text-stone-800 leading-relaxed text-right dir-rtl" dir="rtl">
                «مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»
              </p>
              <p className="text-xs text-stone-500 mt-1 italic">
                "Whoever treads a path seeking knowledge therein, Allah makes easy for them a path to Paradise." — Sahih Muslim
              </p>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 aspect-4/3 lg:aspect-auto lg:h-[420px]">
              <img
                src="/src/assets/images/hero_sabeel_academy_1792259827604.jpg"
                alt="Contemporary Islamic academy grand courtyard and library with scholars and students"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-semibold text-amber-300 tracking-wide uppercase">Academy Campus & Online Global Portal</p>
                <p className="text-sm font-medium text-stone-100">Live Interactive Virtual Classrooms & Scholarly Circles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-metric strip below hero */}
        <div className="mt-14 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-stone-900 tabular-nums">14,800+</div>
            <div className="text-xs font-medium text-stone-500 mt-1">Active Students Worldwide</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-stone-900 tabular-nums">42</div>
            <div className="text-xs font-medium text-stone-500 mt-1">Sanad-Ijaza Certified Instructors</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-emerald-800 tabular-nums">100%</div>
            <div className="text-xs font-medium text-stone-500 mt-1">Waqf Endowment Sponsored Access</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-stone-900 tabular-nums">4.96 / 5.0</div>
            <div className="text-xs font-medium text-stone-500 mt-1">Independent Academic Review</div>
          </div>
        </div>
      </div>
    </section>
  );
};
