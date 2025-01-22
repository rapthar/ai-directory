import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n/settings';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true
});

// Only run middleware on navigation pages
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|.*\\..*).*)',
    // Optional: only run on root (/) URL
    '/'
  ]
};
