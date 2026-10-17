import React, { useState, useEffect } from 'react';
import { DHIKR_LIST, DhikrItem } from '../data/dhikrData';
import { playTasbihClick, playChime } from '../utils/audioHelper';
import { RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

export const TasbihCounter: React.FC = () => {
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrItem>(DHIKR_LIST[0]);
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(DHIKR_LIST[0].defaultTarget);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [totalCompletedCycles, setTotalCompletedCycles] = useState<number>(0);

  useEffect(() => {
    setCount(0);
    setTarget(selectedDhikr.defaultTarget);
  }, [selectedDhikr]);

  const handleIncrement = () => {
    const next = count + 1;
    if (soundEnabled) {
      playTasbihClick();
    }
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }

    if (next >= target) {
      setCount(target);
      setTotalCompletedCycles(prev => prev + 1);
      if (soundEnabled) {
        playChime();
      }
    } else {
      setCount(next);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const isCompleted = count >= target;
  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            Spiritual Litany & Daily Wird
          </div>
          <h3 className="text-xl font-bold text-stone-900 mt-0.5">
            Digital Tasbih & Hadith Reflections
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute acoustic click' : 'Enable acoustic click'}
            className="p-2 border border-stone-300 rounded-lg hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-800" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>
          <button
            onClick={handleReset}
            title="Reset counter"
            className="p-2 border border-stone-300 rounded-lg hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Adhkar Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {DHIKR_LIST.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedDhikr(item)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedDhikr.id === item.id
                ? 'bg-emerald-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {item.transliteration}
          </button>
        ))}
      </div>

      {/* Arabic Display */}
      <div className="text-center py-4 bg-stone-50 border border-stone-100 rounded-xl px-4">
        <div className="font-arabic text-3xl sm:text-4xl font-bold text-stone-900 leading-relaxed" dir="rtl">
          {selectedDhikr.arabic}
        </div>
        <p className="text-xs font-medium text-emerald-900 mt-2">
          {selectedDhikr.transliteration}
        </p>
        <p className="text-xs text-stone-500 mt-0.5 max-w-md mx-auto italic">
          "{selectedDhikr.translation}"
        </p>
      </div>

      {/* Big Counter Button */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={handleIncrement}
          className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-md cursor-pointer select-none ${
            isCompleted
              ? 'border-amber-500 bg-amber-50 text-amber-900'
              : 'border-emerald-800 bg-emerald-900 text-white hover:bg-emerald-950'
          }`}
        >
          <span className="text-4xl font-mono font-bold tracking-tight tabular-nums">
            {count}
          </span>
          <span className="text-xs mt-1 text-emerald-100 opacity-80">
            / {target} target
          </span>
        </button>

        {/* Progress Bar */}
        <div className="w-full max-w-xs space-y-1">
          <div className="flex justify-between text-xs text-stone-500">
            <span>Progress: {progressPercent}%</span>
            <span>{totalCompletedCycles} Cycles Finished</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-700 transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Target Options */}
        <div className="flex items-center gap-2 pt-1 text-xs">
          <span className="text-stone-500 font-medium">Quick Goal:</span>
          {[33, 70, 100].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTarget(t);
                setCount(0);
              }}
              className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                target === t
                  ? 'border-emerald-800 bg-emerald-50 text-emerald-900 font-bold'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Hadith Benefit & Authenticity */}
      <div className="p-4 bg-emerald-50/50 border border-emerald-200/60 rounded-xl space-y-1 text-xs">
        <div className="font-semibold text-emerald-950">Virtue & Prophetic Context:</div>
        <p className="text-stone-700 leading-relaxed">{selectedDhikr.virtue}</p>
        <div className="text-[11px] font-mono text-emerald-800 pt-1">
          Source: {selectedDhikr.source}
        </div>
      </div>
    </div>
  );
};
