import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/i18n/settings';
import { setRequestLocale } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const typedLocale = locale as typeof locales[number];
  if (!locales.includes(typedLocale)) {
    throw new Error(`Locale ${locale} is not supported`);
  }

  // Enable static rendering with setRequestLocale
  setRequestLocale(typedLocale);

  try {
    const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    return { messages: {} };
  }
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
