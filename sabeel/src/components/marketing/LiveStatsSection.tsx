import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Clock, Globe, Award, Star } from 'lucide-react';

export const LiveStatsSection: React.FC = () => {
  const { lang } = useApp();
  const isAr = lang === 'ar';

  const stats = [
    {
      icon: <Clock className="w-6 h-6 text-sky-500" />,
      value: '14,000+',
      labelAr: 'ساعة تدريسية مباشرة 1-on-1',
      labelEn: 'Live 1-on-1 Hours Taught',
    },
    {
      icon: <Globe className="w-6 h-6 text-amber-500" />,
      value: '35+',
      labelAr: 'دولة حول العالم نخدم طلابها',
      labelEn: 'Countries Served Worldwide',
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      value: '100%',
      labelAr: 'معلمون أزهريون ومجازون بالسند',
      labelEn: 'Azhari & Sanad Ijazah Tutors',
    },
    {
      icon: <Star className="w-6 h-6 text-amber-400 fill-amber-400" />,
      value: '4.98 / 5',
      labelAr: 'نسبة رضا أولياء الأمور والطلاب',
      labelEn: 'Average Parent Satisfaction',
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-14 border-y border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-800">
          {stats.map((st, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-1">
                {st.icon}
              </div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {st.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium max-w-[180px]">
                {isAr ? st.labelAr : st.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
