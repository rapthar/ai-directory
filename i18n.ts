import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './i18n/settings';
import { setRequestLocale } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  setRequestLocale(locale);
  return { messages };
});

export const i18n = {
  defaultLocale,
  locales,
  localeDetection: true
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
