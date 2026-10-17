import React, { useState } from 'react';
import { ARABIC_LETTERS, TAJWEED_RULES_EXPLAINED, ArabicLetterInfo } from '../data/tajweedData';
import { speakArabicLetter } from '../utils/audioHelper';
import { Volume2, Play, BookMarked, CheckCircle2, Info } from 'lucide-react';

export const TajweedLab: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetterInfo>(ARABIC_LETTERS[0]);
  const [activeTab, setActiveTab] = useState<'makharij' | 'rules'>('makharij');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const handlePlayLetter = (letterInfo: ArabicLetterInfo) => {
    setIsPlayingAudio(true);
    speakArabicLetter(letterInfo.letter, letterInfo.frequencyHz);
    setTimeout(() => setIsPlayingAudio(false), 600);
  };

  const makhrajGroups = [
    'All Articulations',
    'Throat (Al-Halq)',
    'Tongue (Al-Lisan)',
    'Lips (Ash-Shafatan)'
  ];
  const [groupFilter, setGroupFilter] = useState<string>('All Articulations');

  const filteredLetters = groupFilter === 'All Articulations'
    ? ARABIC_LETTERS
    : ARABIC_LETTERS.filter(l => l.makhrajGroup === groupFilter);

  return (
    <section id="tajweed-lab" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              Interactive Phonetics Laboratory
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Makharij & Tajweed Articulation Explorer
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Inspect vocal tract anatomy, acoustic resonance frequencies, and phonetic attributes (Sifat) for precise Quranic recitation.
            </p>
          </div>

          {/* Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setActiveTab('makharij')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'makharij'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Letter Articulation (Makharij)
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'rules'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Essential Rules (Ahkam)
            </button>
          </div>
        </div>

        {activeTab === 'makharij' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Zone: Letter Selector & Vocal Map */}
            <div className="lg:col-span-5 space-y-6">
              {/* Category Filter Pills (Functional Buttons) */}
              <div className="flex flex-wrap gap-2">
                {makhrajGroups.map((grp) => (
                  <button
                    key={grp}
                    onClick={() => setGroupFilter(grp)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      groupFilter === grp
                        ? 'bg-emerald-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {grp}
                  </button>
                ))}
              </div>

              {/* Grid of Arabic Letters */}
              <div className="grid grid-cols-5 gap-2.5">
                {filteredLetters.map((item) => {
                  const isSelected = selectedLetter.letter === item.letter;
                  return (
                    <button
                      key={item.letter}
                      onClick={() => {
                        setSelectedLetter(item);
                        handlePlayLetter(item);
                      }}
                      className={`h-16 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-800/20 shadow-xs'
                          : 'border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-stone-100 text-stone-800'
                      }`}
                    >
                      <span className="font-arabic text-2xl font-bold leading-none">{item.letter}</span>
                      <span className="text-[10px] font-medium text-stone-500 mt-1">{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Vocal Tract Anatomy Visualizer Card */}
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    Vocal Zone Focus
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">
                    {selectedLetter.makhrajGroup}
                  </span>
                </div>
                
                {/* Visual schematic bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>Chest & Deep Throat</span>
                    <span>Tongue & Palate</span>
                    <span>Lips</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-300 ${
                        selectedLetter.makhrajGroup.includes('Throat')
                          ? 'w-1/3 bg-emerald-700'
                          : selectedLetter.makhrajGroup.includes('Tongue')
                          ? 'w-2/3 bg-emerald-700'
                          : 'w-full bg-emerald-700'
                      }`}
                    />
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {selectedLetter.specificLocation}
                </p>
              </div>
            </div>

            {/* Right Zone: Letter Deep-Dive Interactive Deck */}
            <div className="lg:col-span-7 bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-8 space-y-6">
              {/* Header Letter Showcase */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-white rounded-2xl border border-stone-200 flex items-center justify-center shadow-xs">
                    <span className="font-arabic text-5xl font-bold text-stone-900 leading-none">
                      {selectedLetter.letter}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
                      <span>Letter {selectedLetter.name}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-800 font-mono">{selectedLetter.transliteration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                      {selectedLetter.name} ({selectedLetter.transliteration})
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {selectedLetter.makhrajGroup}
                    </p>
                  </div>
                </div>

                {/* Audio Pronunciation Button */}
                <button
                  onClick={() => handlePlayLetter(selectedLetter)}
                  disabled={isPlayingAudio}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-900 text-white rounded-lg hover:bg-emerald-950 transition-colors shadow-xs cursor-pointer text-xs font-semibold whitespace-nowrap self-start sm:self-auto"
                >
                  <Volume2 className={`w-4 h-4 text-amber-300 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                  <span>{isPlayingAudio ? 'Pronouncing...' : 'Hear Pronunciation'}</span>
                </button>
              </div>

              {/* Sifat & Phonetic Attributes */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  Phonetic Attributes (Sifāt al-Ḥarf)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLetter.attributes.map((attr, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white text-stone-800 border border-stone-200 rounded-md text-xs font-medium"
                    >
                      {attr}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contextual Sample Word with Harakat */}
              <div className="p-4 bg-white rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-medium text-stone-500">Sample Quranic Occurrence</div>
                  <div className="font-arabic text-3xl font-bold text-stone-900 mt-1">
                    {selectedLetter.sampleWordArabic}
                  </div>
                  <div className="text-xs text-stone-600 mt-1">
                    <span className="font-semibold text-stone-900">{selectedLetter.sampleWordTransliteration}</span> — {selectedLetter.sampleWordMeaning}
                  </div>
                </div>

                <button
                  onClick={() => speakArabicLetter(selectedLetter.sampleWordArabic, selectedLetter.frequencyHz)}
                  className="px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Recite Word</span>
                </button>
              </div>

              {/* Instructor Recitation Tip */}
              <div className="flex gap-3 p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong className="font-semibold text-amber-950">Mastery Cue: </strong>
                  {selectedLetter.tip}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tajweed Rules Tab */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TAJWEED_RULES_EXPLAINED.map((r, i) => (
              <div key={i} className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-4">
                <div className="font-arabic text-xl font-bold text-emerald-950">{r.arabic}</div>
                <h3 className="text-base font-bold text-stone-900">{r.rule}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{r.summary}</p>
                <div className="pt-3 border-t border-stone-200 text-xs font-mono text-stone-700 bg-white p-2.5 rounded-lg border border-stone-200/80">
                  {r.lettersExample}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
