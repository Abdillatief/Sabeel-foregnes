import React from 'react';

export interface SectionHeaderProps {
  kicker?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  quranicVerse?: {
    verseText: string;
    surahRef: string;
  };
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  kicker,
  title,
  subtitle,
  quranicVerse,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`mb-12 lg:mb-16 ${centered ? 'text-center mx-auto max-w-3xl' : 'text-start max-w-3xl'} ${className}`}>
      {/* Optional Quranic Verse in Amiri Calligraphy */}
      {quranicVerse && (
        <div className={`mb-5 inline-flex flex-col ${centered ? 'items-center' : 'items-start'} border-y border-amber-500/30 py-2 px-6`}>
          <p className="font-quran text-xl sm:text-2xl text-amber-600 dark:text-amber-300 font-normal tracking-wide">
            {quranicVerse.verseText}
          </p>
          <span className="text-[11px] text-amber-700/70 dark:text-amber-400/70 font-sans tracking-wider mt-0.5">
            {quranicVerse.surahRef}
          </span>
        </div>
      )}

      {/* Unboxed Kicker Metadata */}
      {kicker && (
        <p className="text-xs font-semibold text-sky-700 dark:text-sky-400 tracking-wider uppercase mb-3">
          {kicker}
        </p>
      )}

      {/* Display Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.25] [text-wrap:balance]">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed [text-wrap:balance]">
          {subtitle}
        </p>
      )}
    </div>
  );
};
