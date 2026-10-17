import React, { useState, useEffect } from 'react';
import { POPULAR_CITIES, CityLocation, getPrayerTimes, PrayerTimeRecord, calculateQibla } from '../data/prayerTimes';
import { Compass, Clock, MapPin, Navigation2, Sun, Moon, Sunrise, Sunset } from 'lucide-react';

export const PrayerTimesWidget: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityLocation>(POPULAR_CITIES[0]); // London default
  const [prayerData, setPrayerData] = useState<PrayerTimeRecord>(() => getPrayerTimes(POPULAR_CITIES[0]));
  const [customLocName, setCustomLocName] = useState<string | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');

  // Update times on city change or every minute
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setPrayerData(getPrayerTimes(selectedCity, now));
      setCurrentTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  // Handle Geolocation
  const handleDetectLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const offsetHours = -new Date().getTimezoneOffset() / 60;
          const userCity: CityLocation = {
            id: 'my-location',
            name: 'Local Coordinates',
            country: `${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E`,
            lat,
            lng,
            timezoneOffsetHours: offsetHours
          };
          setCustomLocName('Detected Device Location');
          setSelectedCity(userCity);
        },
        (err) => {
          console.debug('Geolocation denied/unavailable:', err);
        }
      );
    }
  };

  const prayers = [
    { name: 'Fajr', ar: 'الفجر', time: prayerData.fajr, icon: Sunrise },
    { name: 'Sunrise', ar: 'الشروق', time: prayerData.sunrise, icon: Sun },
    { name: 'Dhuhr', ar: 'الظهر', time: prayerData.dhuhr, icon: Sun },
    { name: 'Asr', ar: 'العصر', time: prayerData.asr, icon: Sun },
    { name: 'Maghrib', ar: 'المغرب', time: prayerData.maghrib, icon: Sunset },
    { name: 'Isha', ar: 'العشاء', time: prayerData.isha, icon: Moon }
  ];

  const qiblaAngle = prayerData.qiblaDegrees;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 space-y-6">
      {/* Top Location Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Clock className="w-3.5 h-3.5" />
            <span>Local Time: {currentTimeStr || 'Calculating...'}</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 mt-1">
            Prayer Times & Qibla Compass
          </h3>
          <p className="text-xs text-stone-500">
            {customLocName ? customLocName : `${selectedCity.name}, ${selectedCity.country}`}
          </p>
        </div>

        {/* City Picker & Geolocation */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCity.id}
            onChange={(e) => {
              const c = POPULAR_CITIES.find(city => city.id === e.target.value);
              if (c) {
                setCustomLocName(null);
                setSelectedCity(c);
              }
            }}
            className="px-3 py-2 text-xs font-medium border border-stone-300 rounded-lg bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          >
            {POPULAR_CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.country})
              </option>
            ))}
          </select>
          <button
            onClick={handleDetectLocation}
            title="Detect GPS location"
            className="p-2 border border-stone-300 rounded-lg hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-emerald-800" />
          </button>
        </div>
      </div>

      {/* Next Prayer Countdown Callout */}
      <div className="p-4 bg-emerald-950 text-white rounded-xl flex items-center justify-between">
        <div>
          <span className="text-xs text-amber-300 uppercase tracking-wide font-medium">
            Next Upcoming Prayer
          </span>
          <div className="text-lg font-bold mt-0.5">
            {prayerData.nextPrayer.name} ({prayerData.nextPrayer.arabicName}) · {prayerData.nextPrayer.timeStr}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-300">Countdown</span>
          <div className="text-lg font-mono font-bold text-amber-300 tabular-nums">
            {Math.floor(prayerData.nextPrayer.minutesRemaining / 60)}h {prayerData.nextPrayer.minutesRemaining % 60}m
          </div>
        </div>
      </div>

      {/* 6 Prayer Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {prayers.map((p) => {
          const isNext = p.name === prayerData.nextPrayer.name;
          const Icon = p.icon;
          return (
            <div
              key={p.name}
              className={`p-3.5 rounded-xl border text-center transition-all ${
                isNext
                  ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-800'
                  : 'border-stone-200 bg-stone-50 text-stone-800'
              }`}
            >
              <div className="flex items-center justify-center mb-1 text-stone-500">
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-stone-900">{p.name}</div>
              <div className="font-arabic text-xs text-stone-500 mt-0.5">{p.ar}</div>
              <div className="text-sm font-semibold text-stone-800 mt-1.5 tabular-nums">
                {p.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Qibla Direction Visualizer */}
      <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-stone-600">
            <Navigation2 className="w-4 h-4 text-emerald-800" />
            <span>Qibla Direction from {selectedCity.name}</span>
          </div>
          <div className="text-2xl font-bold text-stone-900 tabular-nums">
            {qiblaAngle}° <span className="text-sm font-normal text-stone-500">True North</span>
          </div>
          <p className="text-xs text-stone-500 max-w-sm">
            Orient your prayer rug to {qiblaAngle} degrees relative to North towards the Holy Kaaba in Makkah al-Mukarramah.
          </p>
        </div>

        {/* Circular Compass Visual */}
        <div className="relative w-28 h-28 rounded-full border-2 border-stone-300 bg-white flex items-center justify-center shadow-xs shrink-0">
          {/* North Marker */}
          <span className="absolute top-1 font-bold text-[10px] text-stone-400">N</span>
          <span className="absolute bottom-1 font-bold text-[10px] text-stone-400">S</span>
          <span className="absolute right-1.5 font-bold text-[10px] text-stone-400">E</span>
          <span className="absolute left-1.5 font-bold text-[10px] text-stone-400">W</span>

          {/* Compass Needle */}
          <div
            className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700"
            style={{ transform: `rotate(${qiblaAngle}deg)` }}
          >
            <div className="w-1 h-12 bg-gradient-to-t from-transparent via-emerald-800 to-amber-500 rounded-full relative">
              <div className="w-3 h-3 bg-amber-500 rounded-full absolute -top-1 -left-1 ring-2 ring-white shadow-xs" />
            </div>
          </div>
          <div className="w-3 h-3 rounded-full bg-stone-900 z-10" />
        </div>
      </div>
    </div>
  );
};
