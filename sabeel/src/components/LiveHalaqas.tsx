import React, { useState } from 'react';
import { Calendar, Video, Clock, Check, Users, Download } from 'lucide-react';

interface Seminar {
  id: string;
  title: string;
  arabicTitle: string;
  scholar: string;
  dateStr: string;
  timeStr: string;
  category: string;
  registeredCount: number;
}

export const LiveHalaqas: React.FC = () => {
  const [rsvpdIds, setRsvpdIds] = useState<string[]>([]);

  const seminars: Seminar[] = [
    {
      id: 'sem-1',
      title: 'Grammar of Surah Yusuf: Rhetorical Balaghah Gems',
      arabicTitle: 'إعراب وبلاغة سورة يوسف',
      scholar: 'Ustadha Fatima Al-Zahra',
      dateStr: 'Friday, Oct 23, 2026',
      timeStr: '6:30 PM – 8:00 PM GMT',
      category: 'Arabic Linguistics',
      registeredCount: 412
    },
    {
      id: 'sem-2',
      title: 'Tajweed Live Correction Circle: Reciting Surah Al-Mulk',
      arabicTitle: 'مقرأة تصحيح التلاوة لسورة الملك',
      scholar: 'Shaykh Dr. Ismail Al-Qasimi',
      dateStr: 'Saturday, Oct 24, 2026',
      timeStr: '5:00 PM – 6:30 PM GMT',
      category: 'Quranic Phonetics',
      registeredCount: 680
    },
    {
      id: 'sem-3',
      title: 'The Astrolabe & Medieval Muslim Observatories',
      arabicTitle: 'تاريخ الفلك والمراصد في الحضارة الإسلامية',
      scholar: 'Prof. Tariq Hashimi',
      dateStr: 'Sunday, Oct 25, 2026',
      timeStr: '4:00 PM – 5:30 PM GMT',
      category: 'Heritage & Youth STEM',
      registeredCount: 310
    }
  ];

  const toggleRsvp = (id: string) => {
    if (rsvpdIds.includes(id)) {
      setRsvpdIds(rsvpdIds.filter(i => i !== id));
    } else {
      setRsvpdIds([...rsvpdIds, id]);
    }
  };

  const downloadIcs = (seminar: Seminar) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sabeel Academy//Live Halaqa//EN
BEGIN:VEVENT
SUMMARY:${seminar.title} - Sabeel Academy
DESCRIPTION:Live scholarly webinar with ${seminar.scholar}. Category: ${seminar.category}.
DTSTART:20261023T183000Z
DTEND:20261023T200000Z
LOCATION:Sabeel Virtual Academy Studio
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${seminar.id}-sabeel-halaqa.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              Scholarly Assembly & Live Virtual Circles
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Upcoming Live Halaqas & Seminars
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Connect directly in open Q&A sessions and recitation circles with our senior fellows and guest professors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seminars.map((s) => {
            const isRsvpd = rsvpdIds.includes(s.id);
            return (
              <div
                key={s.id}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col justify-between hover:border-stone-300 transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-medium text-emerald-800">{s.category}</span>
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      {s.registeredCount + (isRsvpd ? 1 : 0)} attending
                    </span>
                  </div>

                  <div className="font-arabic text-sm text-stone-700 font-bold text-right" dir="rtl">
                    {s.arabicTitle}
                  </div>

                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {s.title}
                  </h3>

                  <div className="pt-2 border-t border-stone-200/80 text-xs text-stone-600 space-y-1.5">
                    <div className="font-medium text-stone-800">Lecturer: {s.scholar}</div>
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                      <span>{s.dateStr}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <Clock className="w-3.5 h-3.5 text-emerald-800" />
                      <span>{s.timeStr}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center gap-2">
                  <button
                    onClick={() => toggleRsvp(s.id)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                      isRsvpd
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-emerald-900 text-white hover:bg-emerald-950'
                    }`}
                  >
                    {isRsvpd ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Seat Reserved</span>
                      </>
                    ) : (
                      <>
                        <Video className="w-3.5 h-3.5 text-amber-300" />
                        <span>RSVP for Free</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => downloadIcs(s)}
                    title="Add to personal calendar (.ics)"
                    className="p-2 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
