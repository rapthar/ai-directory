import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { locales } from "@/i18n/settings";
import { setRequestLocale } from 'next-intl/server';
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";

type Props = {
  children: ReactNode;
  params?: { locale?: string };
};

async function getMessages(locale: typeof locales[number]) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className="flex flex-col min-h-screen bg-grid-small-purple">
            <MainNav />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
