import { Currency } from '../types';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  symbolAr: string;
  nameEn: string;
  nameAr: string;
  rateFromUSD: number; // Conversion rate relative to 1 USD
  flag: string;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    symbolAr: '$',
    nameEn: 'US Dollar',
    nameAr: 'دولار أمريكي',
    rateFromUSD: 1.0,
    flag: '',
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR',
    symbolAr: 'ر.س',
    nameEn: 'Saudi Riyal',
    nameAr: 'ريال سعودي',
    rateFromUSD: 3.75,
    flag: '',
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    symbolAr: 'د.إ',
    nameEn: 'UAE Dirham',
    nameAr: 'درهم إماراتي',
    rateFromUSD: 3.67,
    flag: '',
  },
  QAR: {
    code: 'QAR',
    symbol: 'QAR',
    symbolAr: 'ر.ق',
    nameEn: 'Qatari Riyal',
    nameAr: 'ريال قطري',
    rateFromUSD: 3.64,
    flag: '',
  },
  KWD: {
    code: 'KWD',
    symbol: 'KWD',
    symbolAr: 'د.ك',
    nameEn: 'Kuwaiti Dinar',
    nameAr: 'دينار كويتي',
    rateFromUSD: 0.31,
    flag: '',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    symbolAr: '£',
    nameEn: 'British Pound',
    nameAr: 'جنيه إسترليني',
    rateFromUSD: 0.79,
    flag: '',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    symbolAr: '€',
    nameEn: 'Euro',
    nameAr: 'يورو',
    rateFromUSD: 0.92,
    flag: '',
  },
  EGP: {
    code: 'EGP',
    symbol: 'EGP',
    symbolAr: 'ج.م',
    nameEn: 'Egyptian Pound',
    nameAr: 'جنيه مصري',
    rateFromUSD: 49.5,
    flag: '',
  },
};

export function convertFromUSD(amountUSD: number, targetCurrency: Currency): number {
  const rate = CURRENCIES[targetCurrency]?.rateFromUSD || 1.0;
  return Math.round(amountUSD * rate);
}

export function formatPrice(amountUSD: number, currency: Currency, lang: 'ar' | 'en' = 'ar'): string {
  const converted = convertFromUSD(amountUSD, currency);
  const info = CURRENCIES[currency];
  if (lang === 'ar') {
    return `${converted.toLocaleString('ar-EG')} ${info.symbolAr}`;
  }
  return `${info.symbol}${converted.toLocaleString('en-US')}`;
}

export function detectUserCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
    if (tz.includes('riyadh') || tz.includes('saudi')) return 'SAR';
    if (tz.includes('dubai') || tz.includes('uae')) return 'AED';
    if (tz.includes('qatar') || tz.includes('doha')) return 'QAR';
    if (tz.includes('kuwait')) return 'KWD';
    if (tz.includes('cairo') || tz.includes('egypt')) return 'EGP';
    if (tz.includes('london')) return 'GBP';
    if (tz.includes('paris') || tz.includes('berlin') || tz.includes('madrid') || tz.includes('rome')) return 'EUR';
    return 'USD';
  } catch {
    return 'USD';
  }
}
