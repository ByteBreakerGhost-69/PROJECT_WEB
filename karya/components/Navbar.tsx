'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/local-auth';

export default function Navbar() {
  const t = useTranslations('nav');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(getCurrentUser()));
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/5 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold text-charcoal">
          Karya
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/blog" className="hand-underline font-body text-sm text-charcoal">
            {t('blog')}
          </Link>
          <Link
            href="/portfolio"
            className="hand-underline font-body text-sm text-charcoal"
          >
            {t('portfolio')}
          </Link>
          <Link
            href={loggedIn ? '/dashboard' : { pathname: '/', query: { auth: 'login' } }}
            className="hand-underline font-body text-sm text-charcoal"
          >
            {loggedIn ? t('dashboard') : t('login')}
          </Link>
        </div>

        <LanguageSwitcher />
      </nav>
    </header>
  );
}
