import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { locales } from "@/i18n/settings";
import { setRequestLocale } from 'next-intl/server';
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

async function getMessages(locale: typeof locales[number]) {
  try {
    return (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = (params?.locale || 'en') as "en" | "fr" | "de" | "es" | "pt" | "ar" | "yo";
  // Enable static rendering
  setRequestLocale(locale);
  const messages = await getMessages(locale);

  // Validate the locale
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <div className="flex min-h-screen flex-col" dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
        <MainNav />
        <main className="flex-1" suppressHydrationWarning>
          {children}
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={locale === 'ar'}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </NextIntlClientProvider>
  );
}
