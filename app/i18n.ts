import { getRequestConfig } from 'next-intl/server';
import { locales } from './i18n/settings';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    throw new Error(`Locale ${locale} is not supported`);
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
