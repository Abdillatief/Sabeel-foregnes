import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQItem as FAQItemType } from '../../types';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQAccordionProps {
  items: FAQItemType[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const { lang } = useApp();
  const isAr = lang === 'ar';
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3.5 max-w-3xl mx-auto text-start">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all ${
              isOpen
                ? 'bg-white dark:bg-slate-900 border-sky-300 dark:border-sky-800 shadow-sm'
                : 'bg-white/60 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 text-start"
            >
              <span className="text-sm sm:text-base font-bold text-slate-950 dark:text-white leading-snug">
                {isAr ? item.questionAr : item.questionEn}
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen
                    ? 'rotate-180 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                    {isAr ? item.answerAr : item.answerEn}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
