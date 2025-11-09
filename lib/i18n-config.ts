export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ar'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

// Language display names
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}
