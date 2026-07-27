'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import Typewriter from './Typewriter';

// Task manager sengaja di-lazy-load dan baru di-mount setelah window "load",
// supaya tidak menambah beban JS pada render pertama hero (prioritas performa).
const TaskManager = dynamic(() => import('./TaskManager'), {
  ssr: false,
  loading: () => (
    <div className="h-[220px] w-full animate-pulse rounded-2xl bg-sage/10" aria-hidden="true" />
  ),
});

export default function Hero() {
  const t = useTranslations('hero');
  const [readyToLoadWidget, setReadyToLoadWidget] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setReadyToLoadWidget(true);
      return;
    }
    const onLoad = () => setReadyToLoadWidget(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <h1 className="text-4xl font-bold leading-tight text-charcoal md:text-[64px]">
        <Typewriter text={t('headline')} />
      </h1>
      <p className="mt-6 max-w-xl font-body text-base text-charcoal/70 md:text-lg">
        {t('subtext')}
      </p>

      <div className="mt-10">
        {readyToLoadWidget ? (
          <TaskManager />
        ) : (
          <div className="h-[220px] w-full animate-pulse rounded-2xl bg-sage/10" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
