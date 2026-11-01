export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  currencySymbol: string;
  isRTL?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English (UK)', nativeName: 'English (UK)', currencySymbol: '£' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', currencySymbol: '€' },
  { code: 'fr', name: 'French', nativeName: 'Français', currencySymbol: '€' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', currencySymbol: '€' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', currencySymbol: '₹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', currencySymbol: '€' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', currencySymbol: '¥' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', currencySymbol: 'د.إ', isRTL: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', currencySymbol: '₨', isRTL: true },
];

export function getBrowserDefaultLanguage(): string {
  if (typeof window === 'undefined' || !navigator.language) {
    return 'en';
  }
  const primary = navigator.language.split('-')[0].toLowerCase();
  const match = SUPPORTED_LANGUAGES.find((lang) => lang.code === primary);
  return match ? match.code : 'en';
}

export function isLanguageRTL(langCode: string): boolean {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
  return Boolean(lang?.isRTL);
}

export function getCurrencyForLanguage(langCode: string): string {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
  return lang?.currencySymbol || '£';
}
