export interface CityLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  timezoneOffsetHours: number;
}

export const POPULAR_CITIES: CityLocation[] = [
  { id: 'london', name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezoneOffsetHours: 1 },
  { id: 'makkah', name: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, timezoneOffsetHours: 3 },
  { id: 'madinah', name: 'Madinah', country: 'Saudi Arabia', lat: 24.5247, lng: 39.5692, timezoneOffsetHours: 3 },
  { id: 'cairo', name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, timezoneOffsetHours: 3 },
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, timezoneOffsetHours: 3 },
  { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, timezoneOffsetHours: 4 },
  { id: 'new-york', name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, timezoneOffsetHours: -4 },
  { id: 'toronto', name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, timezoneOffsetHours: -4 },
  { id: 'kuala-lumpur', name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, timezoneOffsetHours: 8 }
];

export interface PrayerTimeRecord {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  nextPrayer: {
    name: string;
    arabicName: string;
    timeStr: string;
    minutesRemaining: number;
  };
  qiblaDegrees: number;
}

// Calculate Qibla bearing toward Kaaba (21.4225° N, 39.8262° E)
export function calculateQibla(lat: number, lng: number): number {
  const kaabaLat = (21.4225 * Math.PI) / 180;
  const kaabaLng = (39.8262 * Math.PI) / 180;
  const userLat = (lat * Math.PI) / 180;
  const userLng = (lng * Math.PI) / 180;

  const deltaLng = kaabaLng - userLng;
  const y = Math.sin(deltaLng);
  const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(deltaLng);
  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  if (qibla < 0) qibla += 360;
  return Math.round(qibla);
}

// Astronomical calculation approximations for daily prayers
export function getPrayerTimes(city: CityLocation, date: Date = new Date()): PrayerTimeRecord {
  // Approximate seasonal solar declination
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const declination = -23.44 * Math.cos(((360 / 365) * (dayOfYear + 10) * Math.PI) / 180);
  
  // Approximate solar noon around 12:00 PM adjusted for longitude vs timezone
  const solarNoonMinutes = 12 * 60 - (city.lng - city.timezoneOffsetHours * 15) * 4;
  
  // Angle adjustments
  const latRad = (city.lat * Math.PI) / 180;
  const decRad = (declination * Math.PI) / 180;
  
  // Sunrise/Sunset hour angle
  const cosH0 = (Math.sin((-0.833 * Math.PI) / 180) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
  const clampedCosH0 = Math.max(-1, Math.min(1, cosH0));
  const sunHalfDayMinutes = (Math.acos(clampedCosH0) * 180 / Math.PI) * 4;
  
  // Twilight 18 degrees (Fajr / Isha)
  const cosTw = (Math.sin((-18 * Math.PI) / 180) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
  const clampedTw = Math.max(-1, Math.min(1, cosTw));
  const twMinutes = (Math.acos(clampedTw) * 180 / Math.PI) * 4;

  // Asr (Shafi'i shadow ratio 1)
  const asrAlt = Math.atan(1 / (1 + Math.tan(Math.abs(latRad - decRad))));
  const cosAsr = (Math.sin(asrAlt) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
  const clampedAsr = Math.max(-1, Math.min(1, cosAsr));
  const asrMinutesOffset = (Math.acos(clampedAsr) * 180 / Math.PI) * 4;

  const sunriseMin = Math.round(solarNoonMinutes - sunHalfDayMinutes);
  const fajrMin = Math.round(solarNoonMinutes - twMinutes);
  const dhuhrMin = Math.round(solarNoonMinutes + 4); // 4 min zenith pass
  const asrMin = Math.round(solarNoonMinutes + asrMinutesOffset);
  const maghribMin = Math.round(solarNoonMinutes + sunHalfDayMinutes);
  const ishaMin = Math.round(solarNoonMinutes + twMinutes);

  const formatMin = (m: number) => {
    let norm = (m + 1440) % 1440;
    const h = Math.floor(norm / 60);
    const min = norm % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${period}`;
  };

  const currentTotalMin = date.getHours() * 60 + date.getMinutes();
  
  const prayerSchedule = [
    { name: 'Fajr', ar: 'الفجر', min: fajrMin },
    { name: 'Sunrise', ar: 'الشروق', min: sunriseMin },
    { name: 'Dhuhr', ar: 'الظهر', min: dhuhrMin },
    { name: 'Asr', ar: 'العصر', min: asrMin },
    { name: 'Maghrib', ar: 'المغرب', min: maghribMin },
    { name: 'Isha', ar: 'العشاء', min: ishaMin }
  ];

  let nextP = prayerSchedule.find(p => p.min > currentTotalMin);
  let minDiff = 0;
  if (!nextP) {
    // Next is tomorrow's Fajr
    nextP = prayerSchedule[0];
    minDiff = (1440 - currentTotalMin) + fajrMin;
  } else {
    minDiff = nextP.min - currentTotalMin;
  }

  return {
    fajr: formatMin(fajrMin),
    sunrise: formatMin(sunriseMin),
    dhuhr: formatMin(dhuhrMin),
    asr: formatMin(asrMin),
    maghrib: formatMin(maghribMin),
    isha: formatMin(ishaMin),
    nextPrayer: {
      name: nextP.name,
      arabicName: nextP.ar,
      timeStr: formatMin(nextP.min),
      minutesRemaining: minDiff
    },
    qiblaDegrees: calculateQibla(city.lat, city.lng)
  };
}
