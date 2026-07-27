import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { fontDisplay, fontBody, fontHand, fontPixel } from '@/lib/fonts';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import Mascot from '@/components/Mascot';
import EasterEgg from '@/components/EasterEgg';
import ScrollProgressBar from '@/components/ScrollProgressBar';

export const metadata: Metadata = {
  metadataBase: new URL('https://karya.example.com'),
  title: {
    default: 'Karya — Mulai Sesuatu yang Berarti',
    template: '%s · Karya',
  },
  description:
    'Karya adalah ruang kerja kreatif yang hangat untuk menyimpan gagasan, mengerjakan tugas, dan melihatnya jadi nyata.',
  openGraph: {
    title: 'Karya',
    description: 'Ruang kerja kreatif yang hangat.',
    type: 'website',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontHand.variable} ${fontPixel.variable}`}
    >
      <body className="paper-texture min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          <ScrollProgressBar />
          <Navbar />
          <div className="relative z-10">{children}</div>
          <Mascot />
          <CustomCursor />
          <EasterEgg />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
