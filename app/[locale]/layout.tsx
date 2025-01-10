import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { locales } from "@/i18n/settings";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";

type Props = {
  children: ReactNode;
  params: { locale: typeof locales[number] };
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
  const messages = await getMessages(params.locale);

  // Validate the locale
  if (!locales.includes(params.locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <div className="flex flex-col min-h-screen bg-grid-small-purple">
        <MainNav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
