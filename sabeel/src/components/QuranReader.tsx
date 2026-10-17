import React, { useState } from 'react';
import { SURAHS, Surah, Ayah } from '../data/quranData';
import { speakArabicLetter } from '../utils/audioHelper';
import { Play, Pause, BookOpen, Eye, HelpCircle, Bookmark, Check } from 'lucide-react';

export const QuranReader: React.FC = () => {
  const [selectedSurah, setSelectedSurah] = useState<Surah>(SURAHS[0]);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [showWordBreakdown, setShowWordBreakdown] = useState<boolean>(false);
  const [activeAyahNum, setActiveAyahNum] = useState<number | null>(null);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<number[]>([]);

  const toggleBookmark = (num: number) => {
    if (bookmarkedAyahs.includes(num)) {
      setBookmarkedAyahs(bookmarkedAyahs.filter(n => n !== num));
    } else {
      setBookmarkedAyahs([...bookmarkedAyahs, num]);
    }
  };

  const playAyahAudio = (ayah: Ayah) => {
    if (activeAyahNum === ayah.number) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setActiveAyahNum(null);
      return;
    }
    setActiveAyahNum(ayah.number);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(ayah.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.75;
      utterance.pitch = 0.95;
      utterance.onend = () => setActiveAyahNum(null);
      utterance.onerror = () => setActiveAyahNum(null);
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback
      setTimeout(() => setActiveAyahNum(null), 3000);
    }
  };

  return (
    <section id="quran-reader" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            Scholarly Study & Tadabbur
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Interactive Quranic Reader & Linguistic Analysis
          </h2>
          <p className="text-sm text-stone-600">
            Engage with original Uthmani text, morphology roots, verse-by-verse recitation pacing, and classical translations.
          </p>
        </div>

        {/* Top Controls Bar */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 md:p-6 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Surah Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">Surah:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 w-full">
              {SURAHS.map((surah) => {
                const isSelected = selectedSurah.id === surah.id;
                return (
                  <button
                    key={surah.id}
                    onClick={() => {
                      setSelectedSurah(surah);
                      setActiveAyahNum(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-900 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {surah.number}. {surah.nameTransliterated} ({surah.nameArabic})
                  </button>
                );
              })}
            </div>
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-3 self-end md:self-auto text-xs font-medium text-stone-600">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showTransliteration}
                onChange={(e) => setShowTransliteration(e.target.checked)}
                className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-700 w-3.5 h-3.5"
              />
              <span>Phonetics</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showTranslation}
                onChange={(e) => setShowTranslation(e.target.checked)}
                className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-700 w-3.5 h-3.5"
              />
              <span>Translation</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showWordBreakdown}
                onChange={(e) => setShowWordBreakdown(e.target.checked)}
                className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-700 w-3.5 h-3.5"
              />
              <span>Root Analysis</span>
            </label>
          </div>
        </div>

        {/* Surah Banner */}
        <div className="bg-emerald-950 text-white rounded-2xl p-6 md:p-8 text-center relative overflow-hidden mb-6 shadow-sm">
          <div className="relative z-10 space-y-2">
            <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
              Surah {selectedSurah.number} · {selectedSurah.revelationType} Revelation · {selectedSurah.ayahsCount} Verses
            </div>
            <h3 className="font-arabic text-3xl sm:text-4xl font-bold tracking-wide text-amber-100">
              {selectedSurah.nameArabic}
            </h3>
            <p className="text-sm text-stone-300 max-w-lg mx-auto">
              {selectedSurah.nameEnglish} — {selectedSurah.description}
            </p>
          </div>
          {/* Subtle decorative arch background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        </div>

        {/* Ayahs List */}
        <div className="space-y-4">
          {selectedSurah.ayahs.map((ayah) => {
            const isPlaying = activeAyahNum === ayah.number;
            const isBookmarked = bookmarkedAyahs.includes(ayah.number);

            return (
              <div
                key={ayah.number}
                className={`bg-white border rounded-2xl p-6 transition-all ${
                  isPlaying
                    ? 'border-emerald-700 ring-2 ring-emerald-700/20 bg-emerald-50/20 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                {/* Header row of Ayah */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-[11px] tabular-nums">
                      {ayah.number}
                    </span>
                    <span className="font-medium text-stone-500">
                      Ayah {ayah.number} of {selectedSurah.ayahsCount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(ayah.number)}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark ayah'}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'border-amber-300 bg-amber-50 text-amber-700'
                          : 'border-stone-200 text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => playAyahAudio(ayah)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors text-xs font-semibold cursor-pointer ${
                        isPlaying
                          ? 'bg-emerald-900 text-white border-emerald-900'
                          : 'border-stone-200 text-stone-700 bg-stone-50 hover:bg-stone-100'
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3 h-3 text-amber-300" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 text-emerald-800" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Script */}
                <div className="py-5 text-right font-arabic text-2xl sm:text-3xl text-stone-900 leading-[2.2] select-text" dir="rtl">
                  {ayah.arabic}
                </div>

                {/* Transliteration */}
                {showTransliteration && (
                  <p className="text-xs sm:text-sm text-stone-500 italic pb-2">
                    {ayah.transliteration}
                  </p>
                )}

                {/* English Translation */}
                {showTranslation && (
                  <p className="text-sm sm:text-base text-stone-800 font-medium leading-relaxed pb-3">
                    {ayah.translation}
                  </p>
                )}

                {/* Word by word breakdown */}
                {showWordBreakdown && (
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide mb-2.5">
                      Vocabulary & Root Morphology
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {ayah.words.map((w, wi) => (
                        <div
                          key={wi}
                          onClick={() => speakArabicLetter(w.ar)}
                          className="p-2.5 bg-stone-50 border border-stone-200/80 rounded-xl hover:bg-emerald-50/50 hover:border-emerald-300 transition-colors cursor-pointer group text-center"
                        >
                          <div className="font-arabic text-lg font-bold text-stone-900 group-hover:text-emerald-950">
                            {w.ar}
                          </div>
                          <div className="text-[11px] text-stone-500 font-medium mt-0.5">{w.tr}</div>
                          <div className="text-xs font-semibold text-stone-800 mt-0.5">{w.en}</div>
                          {w.root && (
                            <div className="text-[10px] text-emerald-800 font-mono mt-1 pt-1 border-t border-stone-200/60">
                              Root: {w.root}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
